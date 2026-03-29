#!/usr/bin/env python3
"""
Central Wisconsin Meeting Summarizer
======================================
Monitors two YouTube channels for government meeting uploads:
  - Marathon County Board Meetings (@marathoncountyboardmeetings)
  - City of Wausau Meetings        (@CityofWausauMeetings)

Transcribes captions via yt-dlp, summarizes with Claude, and saves markdown files.

Usage:
  python marathon_meeting_summarizer.py                   # new meetings only (cron mode)
  python marathon_meeting_summarizer.py --url URL         # single video
  python marathon_meeting_summarizer.py --backfill        # all historical videos
  python marathon_meeting_summarizer.py --source wausau   # one channel only
  python marathon_meeting_summarizer.py --dry-run         # preview without processing

Requirements: pip install yt-dlp anthropic youtube-transcript-api
Environment:  ANTHROPIC_API_KEY, SUMMARIES_DIR (./summaries), STATE_FILE (./processed_meetings.json)
"""

import argparse, json, os, re, subprocess, sys, tempfile
from datetime import datetime, timezone
from pathlib import Path

import anthropic

# -- Channels ------------------------------------------------------------------

CHANNELS = {
    "marathon": {
        "label":       "Marathon County",
        "url":         "https://www.youtube.com/@marathoncountyboardmeetings/streams",
        "doc_pattern": r"https?://[^\s\r\n]*(?:marathoncounty\.gov/home/showpublisheddocument)[^\s\r\n]*",
    },
    "wausau": {
        "label":       "City of Wausau",
        "url":         "https://www.youtube.com/@CityofWausauMeetings/streams",
        "doc_pattern": r"https?://[^\s\r\n]*(?:wausauwi\.portal\.civicclerk\.com/event/\d+|wausauwi\.gov/home/showpublisheddocument)[^\s\r\n]*",
    },
    "weston": {
        "label":       "Village of Weston",
        "url":         "https://www.youtube.com/@WestonWI/videos",
        "doc_pattern": None,
    },
    "school_board": {
        "label":       "Wausau School Board",
        "url":         "https://www.youtube.com/@wausauschoolboard/videos",
        "doc_pattern": None,   # Docs scraped from BoardBook, not YouTube descriptions
        "boardbook_org": 1360, # BoardBook organization ID
    },
}

CLAUDE_MODEL        = "claude-opus-4-5"
MAX_TRANSCRIPT_CHARS = 90_000
SUMMARIES_DIR       = Path(os.environ.get("SUMMARIES_DIR", "./summaries"))
STATE_FILE          = Path(os.environ.get("STATE_FILE",    "./processed_meetings.json"))
# Only process meetings from this date onward (YYYYMMDD) — older meetings are excluded
GLOBAL_DATE_CUTOFF  = os.environ.get("MEETING_CUTOFF_DATE", "20260317")
# Video IDs to skip — duplicate parts that have been merged into a single entry
SKIP_VIDEO_IDS = {
    "eIjwnwe6aBE",  # Education Meeting Pt.2 (merged into hNOP07iJjNY)
    "4IiT1PAaCHA",  # Education Meeting Pt.3 (merged into hNOP07iJjNY)
    "PkJesaGLD0Q",  # Executive Committee Pt.2 (merged into 47UbKS2Jqo4)
}


# -- State ---------------------------------------------------------------------

def load_state():
    if STATE_FILE.exists():
        with open(STATE_FILE) as f:
            return json.load(f)
    return {"processed": {}}

def save_state(state):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

def mark_processed(state, video_id, title, source, summary_path, doc_url=None):
    state["processed"][video_id] = {
        "title":        title,
        "source":       source,
        "doc_url":      doc_url,
        "processed_at": datetime.now(timezone.utc).isoformat(),
        "summary_file": summary_path,
    }


# -- Channel scraping ----------------------------------------------------------

def _parse_date_from_title(title):
    """Parse YYYYMMDD from video title.
    Handles formats: 3/19/26, 3-19-26, 3/19/2026, 2026-01-26
    Returns empty string if no date found.
    """
    import re as _re
    # ISO format: 2026-01-26
    m = _re.search(r"(20\d{2})-(\d{2})-(\d{2})", title)
    if m:
        return m.group(1) + m.group(2) + m.group(3)
    # US format with slashes or dashes: 3/19/26, 3-19-26, 12-18-18
    m = _re.search(r"(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})", title)
    if m:
        mo = m.group(1).zfill(2)
        dy = m.group(2).zfill(2)
        yr = m.group(3)
        yr = "20" + yr if len(yr) == 2 else yr
        # Sanity check - reject obviously wrong dates
        if int(mo) > 12 or int(dy) > 31:
            return ""
        return yr + mo + dy
    return ""


def fetch_channel_videos(source_key, dateafter=""):
    """
    Fetch video list for a YouTube channel using flat-playlist.
    Dates are parsed from video titles since flat-playlist omits upload_date.
    dateafter (YYYYMMDD) filters videos client-side by parsed title date.
    """
    ch = CHANNELS[source_key]
    print(f"\U0001f4e1  Fetching {ch['label']} video list...")
    cmd = ["yt-dlp", "--no-check-certificate", "--flat-playlist", "--dump-json", ch["url"]]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
    if result.returncode != 0 and not result.stdout.strip():
        raise RuntimeError(f"yt-dlp failed:\n{result.stderr[-300:]}")

    videos = []
    for line in result.stdout.strip().splitlines():
        if not line.strip():
            continue
        try:
            d = json.loads(line)
            vid_id = d.get("id", "")
            title  = d.get("title", "Untitled")
            desc   = d.get("description") or ""
            if not vid_id:
                continue
            pattern     = ch.get("doc_pattern")
            doc_m       = re.search(pattern, desc) if pattern else None
            upload_date = d.get("upload_date") or _parse_date_from_title(title)
            videos.append({
                "id":          vid_id,
                "title":       title,
                "url":         f"https://www.youtube.com/watch?v={vid_id}",
                "source":      source_key,
                "doc_url":     doc_m.group(0) if doc_m else None,
                "upload_date": upload_date,
                "description": desc,
            })
        except json.JSONDecodeError:
            continue

    if dateafter:
        total = len(videos)
        videos = [v for v in videos
                  if v["upload_date"] and v["upload_date"] >= dateafter]
        print(f"   {total} total, {len(videos)} on or after {dateafter} (by title date)")

    print(f"   Returning {len(videos)} videos for {ch['label']}")
    return videos

def _vid_id_from_url(url: str) -> str | None:
    """Extract YouTube video ID from a URL."""
    m = re.search(r"(?:v=|youtu\.be/)([A-Za-z0-9_-]{11})", url)
    return m.group(1) if m else None


COOKIES_FILE    = os.environ.get("YT_COOKIES_FILE", "")
USE_WHISPER_FALLBACK = os.environ.get("USE_WHISPER_FALLBACK", "true").lower() == "true"
WHISPER_MODEL   = os.environ.get("WHISPER_MODEL", "tiny")
# Comma-separated sources that use Whisper (default: all video sources)
WHISPER_SOURCES = [s.strip() for s in os.environ.get("WHISPER_SOURCES", "marathon,wausau,weston").split(",")]
# Only run Whisper on videos uploaded within last N days (0 = no limit)
_wd = int(os.environ.get("WHISPER_DAYS", "0"))
WHISPER_CUTOFF = (
    (datetime.now(timezone.utc) - __import__("datetime").timedelta(days=_wd)).strftime("%Y%m%d")
    if _wd > 0 else ""
)


def fetch_transcript(url: str, source_key: str = "", upload_date: str = "") -> str:
    """
    Fetch transcript for a YouTube video.
    Method 1: youtube-transcript-api with cookie-injected session (fastest, most reliable)
    Method 2: yt-dlp with cookies (fallback)
    """
    vid_id = _vid_id_from_url(url)

    # -- Method 1: youtube-transcript-api with cookie session ------------------
    # Injecting the YouTube cookies into a requests.Session bypasses IP blocks
    # that affect cloud/CI environments, without needing yt-dlp or JS runtime.
    if vid_id:
        try:
            import requests as _req
            from http.cookiejar import MozillaCookieJar
            from youtube_transcript_api import YouTubeTranscriptApi

            session = _req.Session()
            session.headers.update({
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                              "AppleWebKit/537.36 (KHTML, like Gecko) "
                              "Chrome/122.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
            })

            if COOKIES_FILE and os.path.exists(COOKIES_FILE):
                jar = MozillaCookieJar(COOKIES_FILE)
                jar.load(ignore_discard=True, ignore_expires=True)
                session.cookies = jar
                print(f"     [fetch] Trying youtube-transcript-api with cookie session...")
            else:
                print(f"     [fetch] Trying youtube-transcript-api (no cookies)...")

            api = YouTubeTranscriptApi(http_client=session)
            result = api.fetch(vid_id, languages=["en", "en-US", "en-GB"])
            entries = list(result)
            text = " ".join(
                getattr(s, "text", "").strip() for s in entries
            ).strip()
            if len(text) > 200:
                print(f"     [ok]  Transcript via youtube-transcript-api ({len(text):,} chars)")
                return text
            else:
                print(f"     [warn]  Transcript too short ({len(text)} chars) - trying yt-dlp...")
        except Exception as e:
            print(f"     [warn]  youtube-transcript-api: {str(e)[:120]} - trying yt-dlp...")

    # -- Method 2: yt-dlp with cookies -----------------------------------------
    with tempfile.TemporaryDirectory() as tmpdir:
        out = os.path.join(tmpdir, "meeting")
        cmd = [
            "yt-dlp",
            "--no-check-certificate",
            "--write-sub",           # try manual captions first
            "--write-auto-sub",      # then auto-generated
            "--skip-download",
            "--sub-format", "vtt",
            "--sub-lang", "en,en-US,en-orig",  # try multiple English variants
            "--sleep-requests", "1",
            "-o", out,
        ]
        if COOKIES_FILE and os.path.exists(COOKIES_FILE):
            cmd += ["--cookies", COOKIES_FILE]
            print(f"     [fetch] yt-dlp with cookies...")
        else:
            print("     [warn]  No cookies file - transcripts may fail on CI IPs")
        cmd.append(url)

        r = subprocess.run(cmd, capture_output=True, text=True)
        combined = (r.stdout + r.stderr).lower()

        no_caption_signals = [
            "only images are available",
            "no subtitles found",
            "subtitles are disabled",
            "no captions",
            "there are no captions",
        ]
        if any(sig in combined for sig in no_caption_signals):
            print("     [fetch] No captions - trying Whisper before giving up...")
            whisper_text = fetch_transcript_whisper(url, source_key=source_key,
                                                    upload_date=upload_date)
            if whisper_text:
                return whisper_text
            raise FileNotFoundError("No captions available and Whisper unavailable - skipping.")

        if r.returncode == 0:
            vtt_files = [f for f in os.listdir(tmpdir) if f.endswith(".vtt")]
            if vtt_files:
                with open(os.path.join(tmpdir, vtt_files[0]), encoding="utf-8") as f:
                    text = _parse_vtt(f.read())
                    if len(text) > 200:
                        print(f"     [ok]  Transcript via yt-dlp ({len(text):,} chars)")
                        return text
        else:
            print(f"     [warn]  yt-dlp failed: {r.stderr.strip()[-150:]}")

    # -- Method 3: Whisper audio transcription ---------------------------------
    whisper_text = fetch_transcript_whisper(url, source_key=source_key,
                                            upload_date=upload_date)
    if whisper_text:
        return whisper_text

    raise FileNotFoundError(
        "Could not fetch transcript via captions or Whisper. "
        "Video may have no audio, or cookies may be expired."
    )

def _parse_vtt(raw):
    """Parse VTT captions, inserting timestamp markers every ~5 minutes."""
    seen, lines = set(), []
    last_ts_minute = -5  # track last inserted timestamp minute
    for line in raw.split("\n"):
        line = line.strip()
        if not line or line.startswith("WEBVTT") or line.startswith("Kind:") or line.startswith("Language:") or line == " ":
            continue
        # Extract timestamp from cue timing lines like "00:05:23.000 --> 00:05:26.000"
        if "-->" in line:
            ts_m = re.match(r"(\d{1,2}):(\d{2}):(\d{2})", line)
            if ts_m:
                h, m, s = int(ts_m.group(1)), int(ts_m.group(2)), int(ts_m.group(3))
                total_min = h * 60 + m
                # Insert a timestamp marker every ~5 minutes
                if total_min >= last_ts_minute + 5:
                    ts_str = f"{h}:{m:02d}:{s:02d}" if h > 0 else f"{m}:{s:02d}"
                    lines.append(f"[{ts_str}]")
                    last_ts_minute = total_min
            continue
        # Skip HTML-style tags
        if "<" in line and ">" in line and ":" in line:
            continue
        if line not in seen:
            seen.add(line)
            lines.append(line)
    return " ".join(lines)



# -- Whisper audio transcription (fallback for no-caption videos) -------------

def fetch_transcript_whisper(url: str, source_key: str = "",
                             upload_date: str = "") -> str | None:
    """
    Download audio from a YouTube video and transcribe it locally using
    faster-whisper. Used as a fallback when captions are unavailable.
    Only runs if:
      - USE_WHISPER_FALLBACK=true
      - source_key in WHISPER_SOURCES
      - upload_date >= WHISPER_CUTOFF (if WHISPER_DAYS is set)
    """
    if not USE_WHISPER_FALLBACK:
        return None
    if source_key and source_key not in WHISPER_SOURCES:
        return None
    if WHISPER_CUTOFF and upload_date and upload_date < WHISPER_CUTOFF:
        print(f"       Skipping Whisper - video too old ({upload_date} < {WHISPER_CUTOFF})")
        return None

    print("       Attempting Whisper audio transcription...")

    try:
        import faster_whisper
    except ImportError:
        print("       faster-whisper not installed - skipping Whisper fallback")
        return None

    with tempfile.TemporaryDirectory() as tmpdir:
        audio_out = os.path.join(tmpdir, "audio")

        # Download audio only (much smaller than video)
        # Use worst quality video - Whisper works on any media file
        # Avoids JS runtime issues with audio-only format selection
        node_path = None
        for p in ["/opt/hostedtoolcache/node/20.20.1/x64/bin/node",
                  "/usr/local/bin/node", "/usr/bin/node"]:
            if os.path.exists(p):
                node_path = p
                break

        # Format 18 = 360p mp4 with audio - legacy format that doesn't need
        # JS runtime decryption, always available on YouTube videos
        dl_cmd = [
            "yt-dlp",
            "--no-check-certificate",
            "-f", "18",
            "--no-playlist",
            "--max-filesize", "300m",
            "-o", audio_out + ".%(ext)s",
        ]
        if COOKIES_FILE and os.path.exists(COOKIES_FILE):
            dl_cmd += ["--cookies", COOKIES_FILE]
        dl_cmd.append(url)

        print("     [dl]  Downloading audio...")
        r = subprocess.run(dl_cmd, capture_output=True, text=True, timeout=300)
        if r.returncode != 0:
            print(f"       Audio download failed: {r.stderr.strip()[-150:]}")
            return None

        audio_files = [f for f in os.listdir(tmpdir)
                       if not f.endswith(".json") and not f.endswith(".part")
                       and os.path.getsize(os.path.join(tmpdir, f)) > 1000]
        if not audio_files:
            print("       No audio file found after download")
            print(f"     Files in tmpdir: {os.listdir(tmpdir)}")
            return None

        audio_path = os.path.join(tmpdir, audio_files[0])
        size_mb = os.path.getsize(audio_path) / 1024 / 1024
        print(f"       Audio: {size_mb:.0f} MB - transcribing with Whisper ({WHISPER_MODEL})...")

        # Transcribe
        import time
        t0 = time.time()
        model = faster_whisper.WhisperModel(
            WHISPER_MODEL, device="cpu", compute_type="int8"
        )
        segments, info = model.transcribe(
            audio_path,
            language="en",
            beam_size=1,           # faster, slight quality tradeoff
            vad_filter=True,       # skip silence
            vad_parameters={"min_silence_duration_ms": 500},
        )
        text = " ".join(seg.text.strip() for seg in segments).strip()
        elapsed = time.time() - t0
        print(f"       Whisper transcribed {len(text):,} chars in {elapsed/60:.1f} min")

        if len(text) < 100:
            print("       Whisper output too short - likely empty audio")
            return None

        return text


# -- CivicClerk vote/agenda fetching ------------------------------------------

def fetch_civicclerk_data(doc_url: str) -> dict | None:
    """
    Given a Wausau CivicClerk portal URL (e.g. /event/2311/overview or /event/156/...),
    extract the event ID, look up its agendaId, then fetch full agenda items,
    motions, votes, and attachments via the public OData API.
    Returns a dict with 'items' list, or None on failure.
    """
    import requests, re

    event_id_m = re.search(r"/event/(\d+)", doc_url)
    if not event_id_m:
        return None
    event_id = int(event_id_m.group(1))

    base = "https://wausauwi.api.civicclerk.com/v1"
    headers = {"Accept": "application/json",
               "User-Agent": "Mozilla/5.0"}
    try:
        # Step 1: get agendaId from Events endpoint
        r = requests.get(f"{base}/Events/{event_id}", headers=headers, timeout=10)
        if r.status_code != 200:
            return None
        event = r.json()
        agenda_id = event.get("agendaId")
        if not agenda_id:
            return None

        # Step 2: fetch full meeting items (agenda, votes, attachments)
        r2 = requests.get(f"{base}/Meetings/{agenda_id}", headers=headers, timeout=10)
        if r2.status_code != 200:
            return None
        meeting = r2.json()

        def parse_item(item):
            votes = []
            for v in item.get("minutesItemVotes", []):
                votes.append({
                    "motion":    v.get("motionName", ""),
                    "passed":    v.get("passFail") == 1,
                    "initiator": v.get("initiatedBy", ""),
                    "seconder":  v.get("secondedBy", ""),
                    "yes":       v.get("yesVotes", []),
                    "no":        v.get("noVotes", []),
                    "abstain":   v.get("abstainVotes", []),
                })
            docs = [
            {
                "name": a.get("fileName", ""),
                "url":  f"https://wausauwi.api.civicclerk.com/v1/Meetings/GetAttachmentFile(fileId={a['id']})"
                        if a.get("id") else None,
                "type": a.get("contentType", ""),
                "size": a.get("fileSize", 0),
            }
            for a in item.get("attachmentsList", []) if a.get("fileName")
        ]
            children = [parse_item(c) for c in item.get("childItems", [])]
            return {
                "number":   item.get("agendaObjectItemOutlineNumber", ""),
                "name":     item.get("agendaObjectItemName", ""),
                "desc":     item.get("agendaObjectItemDescription", "") or "",
                "votes":    votes,
                "docs":     docs,
                "children": children,
            }

        items = [parse_item(i) for i in meeting.get("items", [])]
        return {"event_id": event_id, "agenda_id": agenda_id, "items": items}

    except Exception as e:
        print(f"   [warn]  CivicClerk fetch failed: {e}")
        return None


# -- Weston AgendaCenter doc scraping -----------------------------------------

_weston_agenda_cache = None  # cache the page HTML for multiple lookups in one run

def _fetch_weston_agenda_page() -> str:
    """Fetch and cache the Weston AgendaCenter HTML."""
    global _weston_agenda_cache
    if _weston_agenda_cache is not None:
        return _weston_agenda_cache
    import requests
    try:
        r = requests.get(
            "https://www.westonwi.gov/agendacenter",
            headers={"User-Agent": "Mozilla/5.0"}, timeout=15
        )
        _weston_agenda_cache = r.text
        return _weston_agenda_cache
    except Exception as e:
        print(f"   [warn]  Weston AgendaCenter fetch failed: {e}")
        _weston_agenda_cache = ""
        return ""


def fetch_weston_doc_url(title: str) -> str | None:
    """
    Given a meeting title like 'Board of Trustees - 3/23/2026',
    scrape westonwi.gov/agendacenter to find the matching agenda PDF URL.
    Returns the full PDF URL or None.
    """
    import re

    # Parse date from title  e.g. "Board of Trustees - 3/23/2026"
    date_m = re.search(r"(\d{1,2})/(\d{1,2})/(\d{4})", title)
    if not date_m:
        return None
    mo, dy, yr = date_m.group(1).zfill(2), date_m.group(2).zfill(2), date_m.group(3)
    date_str = f"_{mo}{dy}{yr}"   # e.g. _03232026

    html = _fetch_weston_agenda_page()
    if not html:
        return None

    # Find all agenda paths matching the date
    matches = re.findall(
        rf'/AgendaCenter/ViewFile/Agenda/({re.escape(date_str)}-\d+)',
        html
    )
    if matches:
        unique = list(dict.fromkeys(matches))
        return f"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/{unique[0]}"
    return None


def fetch_weston_doc_url_by_date(date_str_mmddyyyy: str) -> str | None:
    """
    Given a date like '03232026', return the best agenda PDF URL for that date.
    Multiple committees may meet on the same date; returns the URL with the
    highest ID (typically the most recent/primary agenda posted for that date).
    """
    import re
    html = _fetch_weston_agenda_page()
    if not html:
        return None
    matches = re.findall(
        rf'/AgendaCenter/ViewFile/Agenda/(_{re.escape(date_str_mmddyyyy)}-(\d+))',
        html
    )
    if not matches:
        return None
    # Sort by ID (numeric) descending and return the highest
    unique = list(dict.fromkeys(m[0] for m in matches))
    unique.sort(key=lambda x: int(x.rsplit("-", 1)[1]), reverse=True)
    return f"https://www.westonwi.gov/AgendaCenter/ViewFile/Agenda/{unique[0]}"


# -- Summarization -------------------------------------------------------------

def summarize_meeting(transcript, title, url, source_key):
    client  = anthropic.Anthropic()
    ch      = CHANNELS[source_key]

    prompt = f"""You are a local government reporter covering the Wausau, Wisconsin area.

Meeting title: {title}
Organization: {ch['label']}
YouTube link:  {url}

Below is the auto-generated transcript of the ACTUAL meeting recording. Your job is to report what ACTUALLY HAPPENED - votes taken, decisions made, who said what, outcomes, not just what was planned.

Produce a JSON object with this exact structure and nothing else - no markdown, no preamble, just valid JSON:

{{
  "overview": "2-3 sentence summary of what actually happened at this meeting and its significance to residents - include key decisions or votes if any",
  "committee": "exact committee or board name",
  "presiding": "name and title of person who chaired the meeting if mentioned",
  "agenda": [
    {{"time": "0:00", "item": "agenda item description"}}
  ],
  "discussions": [
    {{
      "item": "agenda item title",
      "body": "2-4 sentences describing what ACTUALLY occurred: who spoke, what positions they took, how votes went, what was approved or rejected, any notable debate or public input. Be specific - name names, cite vote counts, quote key statements if clear in the transcript."
    }}
  ],
  "publicComment": "Describe actual public comment offered - who spoke, what they said, how many speakers. Or 'No public comment was offered.'",
  "actionItems": ["specific decisions made or next steps directed by the committee"]
}}

Rules:
- This is a transcript of a REAL meeting. Report outcomes, not plans.
- agenda: extract timestamps from transcript (format: "M:SS" or "H:MM:SS"). Include 5-10 items.
- discussions: focus on WHAT WAS DECIDED or DEBATED, not just what the topic was.
- Include vote results where mentioned (e.g. "Approved 5-2", "Passed unanimously").
- Name specific people who spoke or voted when identifiable from transcript.
- Note unclear audio as [inaudible] rather than guessing.
- Return ONLY the JSON object.

--- TRANSCRIPT ---
{transcript[:MAX_TRANSCRIPT_CHARS]}
--- END ---"""

    msg = client.messages.create(
        model=CLAUDE_MODEL, max_tokens=4096,
        messages=[{"role": "user", "content": prompt}]
    )
    raw = msg.content[0].text.strip()
    # Strip any accidental markdown fences
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        # Fallback if Claude returns non-JSON
        return {"overview": raw, "agenda": [], "discussions": [],
                "publicComment": "", "actionItems": [], "committee": ""}


# -- Output --------------------------------------------------------------------

def _slugify(text):
    text = re.sub(r"[^\w\s-]", "", text.lower())
    text = re.sub(r"[\s_-]+", "-", text).strip("-")
    return text[:80]

def save_summary(title, url, source_key, summary, doc_url=None, civic_data=None):
    ch    = CHANNELS[source_key]
    slug  = _slugify(f"{source_key}-{title}")
    path  = SUMMARIES_DIR / f"{slug}.md"
    SUMMARIES_DIR.mkdir(parents=True, exist_ok=True)

    # summary is now a dict from structured JSON output
    overview = summary.get("overview", "") if isinstance(summary, dict) else str(summary)

    with open(path, "w", encoding="utf-8") as f:
        f.write(f"# {title}\n\n")
        f.write(f"**Organization:** {ch['label']}  \n")
        f.write(f"**Source:** {url}  \n")
        if doc_url:
            f.write(f"**Documents:** {doc_url}  \n")
        f.write(f"**Summarized:** {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}\n\n")
        f.write("---\n\n")
        f.write(f"## Meeting Overview\n{overview}\n\n")
        if isinstance(summary, dict):
            if summary.get("discussions"):
                f.write("## Key Discussions\n")
                for d in summary["discussions"]:
                    f.write(f"### {d.get('item','')}\n{d.get('body','')}\n\n")
            if summary.get("publicComment"):
                f.write(f"## Public Comment\n{summary['publicComment']}\n\n")
            if summary.get("actionItems"):
                f.write("## Action Items\n")
                for a in summary["actionItems"]:
                    f.write(f"- {a}\n")

    # Save full structured summary as JSON sidecar
    summary_data = summary if isinstance(summary, dict) else {"overview": str(summary)}
    summary_data.update({
        "title": title, "url": url, "source": source_key,
        "doc_url": doc_url,
        "processed_at": datetime.now(timezone.utc).isoformat(),
    })
    json_path = str(path).replace(".md", "_summary.json")
    with open(json_path, "w", encoding="utf-8") as jf:
        json.dump(summary_data, jf, indent=2, ensure_ascii=False)

    # Save CivicClerk vote data as separate sidecar
    if civic_data:
        votes_path = str(path).replace(".md", "_votes.json")
        with open(votes_path, "w", encoding="utf-8") as jf:
            json.dump(civic_data, jf, indent=2)

    return str(path)


# -- Agenda text fallback (for videos with no captions) -----------------------

def fetch_agenda_text_wausau(doc_url: str) -> str | None:
    """
    For Wausau CivicClerk videos, fetch the agenda text via the CivicClerk
    published files API (blob URL method - no PDF parsing needed).
    Returns plain text of the agenda, or None on failure.
    """
    import requests as _req
    event_id_m = re.search(r"/event/(\d+)", doc_url)
    if not event_id_m:
        return None
    event_id = int(event_id_m.group(1))
    base = "https://wausauwi.api.civicclerk.com/v1"
    hdrs = {"Accept": "application/json", "User-Agent": "Mozilla/5.0"}
    try:
        # Step 1: event -> agendaId
        r = _req.get(f"{base}/Events/{event_id}", headers=hdrs, timeout=10)
        if r.status_code != 200:
            return None
        agenda_id = r.json().get("agendaId")
        if not agenda_id:
            return None
        # Step 2: meeting publishedFiles -> Agenda file
        r2 = _req.get(f"{base}/Meetings/{agenda_id}", headers=hdrs, verify=False, timeout=10)
        if r2.status_code != 200:
            return None
        pub_files = r2.json().get("publishedFiles", [])
        agenda_file = next(
            (f for f in pub_files if f.get("type", "").lower() == "agenda"),
            pub_files[0] if pub_files else None
        )
        if not agenda_file:
            return None
        file_id = agenda_file.get("fileId")
        if not file_id:
            return None
        # Step 3: get blob URL for plain text
        r3 = _req.get(
            f"{base}/Meetings/GetMeetingFile(fileId={file_id},plainText=true)",
            headers=hdrs, verify=False, timeout=10
        )
        if r3.status_code != 200:
            return None
        blob_url = r3.json().get("blobUri", "")
        if not blob_url:
            return None
        # Step 4: fetch the actual text
        r4 = _req.get(blob_url, timeout=15)
        if r4.status_code == 200 and len(r4.text) > 100:
            return r4.text.strip()
    except Exception as e:
        print(f"       Wausau agenda fetch failed: {e}")
    return None


def fetch_agenda_text_weston(doc_url: str) -> str | None:
    """
    Fetch Weston AgendaCenter agenda PDF and extract text via pdfplumber.
    """
    import requests as _req
    if not doc_url or "westonwi.gov" not in doc_url:
        return None
    try:
        import pdfplumber, io
        r = _req.get(doc_url, headers={"User-Agent": "Mozilla/5.0"}, timeout=15)
        if r.status_code != 200 or b"%PDF" not in r.content[:10]:
            return None
        with pdfplumber.open(io.BytesIO(r.content)) as pdf:
            text = "\n".join(page.extract_text() or "" for page in pdf.pages)
        return text.strip() if len(text) > 100 else None
    except Exception as e:
        print(f"       Weston agenda PDF fetch failed: {e}")
    return None


def fetch_agenda_text(source_key: str, doc_url: str | None, title: str,
                      description: str = "") -> str | None:
    """
    Try to get agenda text for a video that has no transcript.
    Returns agenda text string, or None if unavailable.
    """
    print("  [agenda]  Trying agenda document fallback...")

    if source_key == "wausau" and doc_url:
        text = fetch_agenda_text_wausau(doc_url)
        if text:
            print(f"       Agenda text from CivicClerk ({len(text)} chars)")
            return text

    if source_key == "weston":
        # First try the doc_url from description, then scrape AgendaCenter
        if doc_url and "westonwi.gov" in doc_url:
            text = fetch_agenda_text_weston(doc_url)
            if text:
                print(f"       Agenda text from AgendaCenter PDF ({len(text)} chars)")
                return text
        # Try scraping AgendaCenter by date
        scraped_url = fetch_weston_doc_url(title)
        if scraped_url:
            text = fetch_agenda_text_weston(scraped_url)
            if text:
                print(f"       Agenda text from AgendaCenter (scraped) ({len(text)} chars)")
                return text

    # Marathon County PDFs are server-blocked. Use title + description as context.
    if source_key == "marathon":
        if description and len(description) > 20:
            stub = f"Meeting: {title}\nOrganization: Marathon County\n\n{description}"
            print(f"       Marathon County PDF blocked - using title + description ({len(stub)} chars)")
            return stub
        print("       Marathon County PDF blocked and no description available")

    return None


def summarize_from_agenda(agenda_text: str, title: str, source_key: str,
                          url: str) -> dict:
    """
    Summarize a meeting from its agenda document rather than a transcript.
    Produces the same JSON structure as summarize_meeting().
    """
    client = anthropic.Anthropic()
    ch = CHANNELS[source_key]

    prompt = f"""You are a local government reporter covering the Wausau, Wisconsin area.

Meeting title: {title}
Organization: {ch['label']}
Source: Agenda document only (no video recording or transcript available)
YouTube: {url}

Below is the text of the official meeting agenda. Produce a JSON object with this exact structure - no markdown, no preamble, just valid JSON:

{{
  "overview": "2-3 sentence factual summary starting with 'Based on the published agenda,' describing what this meeting was scheduled to address and its significance to the community.",
  "committee": "exact committee or board name",
  "presiding": "",
  "agenda": [
    {{"time": "N/A", "item": "agenda item description"}}
  ],
  "discussions": [
    {{"item": "agenda item title", "body": "2-3 sentence description of what this item involves. Use tentative language: 'was scheduled to discuss', 'was expected to consider', 'was set to review' - NOT past tense like 'discussed' or 'approved'."}}
  ],
  "publicComment": "Note whether public comment was on the agenda, or 'Not indicated on agenda.'",
  "actionItems": ["expected action items based on agenda - use 'scheduled to vote on', 'expected to consider', etc."]
}}

Rules:
- CRITICAL: This is an AGENDA, not a transcript. You do NOT know what actually happened. Use tentative/scheduled language throughout.
- Do NOT say items were "approved", "discussed", or "decided" - say they were "scheduled for action", "set for discussion", etc.
- Base your response ONLY on what the agenda says - do not invent outcomes or votes
- Include all substantive agenda items in both agenda[] and discussions[]
- Skip purely procedural items (call to order, roll call, adjournment)
- NEVER use placeholder text like [AGENDA_ITEM_NAME], [TBD], [INSERT], etc.
- Return ONLY the JSON object

--- AGENDA ---
{agenda_text[:12000]}
--- END ---"""

    msg = client.messages.create(
        model=CLAUDE_MODEL, max_tokens=4096,
        messages=[{"role": "user", "content": prompt}]
    )
    raw = msg.content[0].text.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    try:
        result = json.loads(raw)
        result["_source"] = "agenda"   # flag so inject script can note it
        return result
    except json.JSONDecodeError:
        return {"overview": raw, "agenda": [], "discussions": [],
                "publicComment": "", "actionItems": [], "committee": "",
                "_source": "agenda"}


def _format_civic_votes_for_prompt(civic_data: dict) -> str:
    """Format CivicClerk vote data into text for inclusion in a prompt."""
    lines = []
    for item in civic_data.get("items", []):
        name = item.get("name", "").strip()
        if not name:
            continue
        number = item.get("number", "")
        prefix = f"{number}. " if number else ""
        lines.append(f"\n{prefix}{name}")
        for v in item.get("votes", []):
            motion = v.get("motion", "Unknown motion")
            passed = "PASSED" if v.get("passed") else "FAILED"
            yes = v.get("yes", [])
            no = v.get("no", [])
            abstain = v.get("abstain", [])
            initiator = v.get("initiator", "")
            seconder = v.get("seconder", "")
            vote_line = f"  Vote: {motion} — {passed}"
            if yes or no:
                vote_line += f" ({len(yes)}-{len(no)})"
            if initiator:
                vote_line += f" | Moved by {initiator}"
            if seconder:
                vote_line += f", seconded by {seconder}"
            lines.append(vote_line)
            if yes:
                lines.append(f"    Yes: {', '.join(yes)}")
            if no:
                lines.append(f"    No: {', '.join(no)}")
            if abstain:
                lines.append(f"    Abstain: {', '.join(abstain)}")
        for child in item.get("children", []):
            cname = child.get("name", "").strip()
            if cname:
                lines.append(f"  - {cname}")
                for cv in child.get("votes", []):
                    cpassed = "PASSED" if cv.get("passed") else "FAILED"
                    lines.append(f"    Vote: {cv.get('motion','')} — {cpassed}")
    return "\n".join(lines)


def summarize_from_agenda_with_votes(agenda_text: str, title: str,
                                      source_key: str, url: str,
                                      civic_data: dict) -> dict:
    """
    Summarize a meeting from its agenda document enriched with CivicClerk vote data.
    This produces much richer summaries than agenda-only since we know actual outcomes.
    """
    client = anthropic.Anthropic()
    ch = CHANNELS[source_key]
    vote_text = _format_civic_votes_for_prompt(civic_data)

    prompt = f"""You are a local government reporter covering the Wausau, Wisconsin area.

Meeting title: {title}
Organization: {ch['label']}
Source: Agenda document + official vote records from CivicClerk
YouTube: {url}

Below is the meeting agenda AND the official vote/action records. The vote records show what ACTUALLY HAPPENED — motions made, who voted yes/no, and whether items passed or failed. Use this to report actual outcomes.

Produce a JSON object with this exact structure - no markdown, no preamble, just valid JSON:

{{
  "overview": "2-3 sentence factual summary of actual outcomes. Report what was decided: items approved/denied, vote counts, key decisions. Start with the most significant action taken.",
  "committee": "exact committee or board name",
  "presiding": "",
  "agenda": [
    {{"time": "N/A", "item": "agenda item description"}}
  ],
  "discussions": [
    {{"item": "agenda item title", "body": "2-3 sentences reporting the ACTUAL OUTCOME: was it approved or denied? What was the vote count? Who moved/seconded? Include specific names and numbers from the vote records."}}
  ],
  "publicComment": "Note whether public comment was on the agenda, or 'Not indicated on agenda.'",
  "actionItems": ["specific decisions made and next steps based on actual vote outcomes"]
}}

Rules:
- Use the VOTE RECORDS to report actual outcomes — this is real data, not speculation
- Include vote counts (e.g. "Approved 7-0", "Failed 4-3") and names of movers/seconders
- For items with no vote record, note they were on the agenda but outcome is not recorded
- Include all substantive agenda items in both agenda[] and discussions[]
- Skip purely procedural items (call to order, roll call, adjournment)
- NEVER use placeholder text like [AGENDA_ITEM_NAME], [TBD], [INSERT], etc.
- Return ONLY the JSON object

--- AGENDA ---
{agenda_text[:10000]}
--- END AGENDA ---

--- VOTE RECORDS ---
{vote_text[:5000]}
--- END VOTE RECORDS ---"""

    msg = client.messages.create(
        model=CLAUDE_MODEL, max_tokens=4096,
        messages=[{"role": "user", "content": prompt}]
    )
    raw = msg.content[0].text.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    try:
        result = json.loads(raw)
        result["_source"] = "agenda_with_votes"
        return result
    except json.JSONDecodeError:
        return {"overview": raw, "agenda": [], "discussions": [],
                "publicComment": "", "actionItems": [], "committee": "",
                "_source": "agenda_with_votes"}


# -- Core processing -----------------------------------------------------------

def process_video(video):
    vid_id, title, url, source_key, doc_url = (
        video["id"], video["title"], video["url"],
        video["source"], video.get("doc_url")
    )
    description   = video.get("description", "")
    upload_date   = video.get("upload_date", "")
    ch = CHANNELS[source_key]
    print(f"\n{'-'*60}")
    print(f"[{ch['label']}] {title}")
    print(f"  {url}")
    if doc_url:
        print(f"   {doc_url}")

    transcript = None
    summary    = None

    # -- Try transcript first --------------------------------------------------
    try:
        print("  [dl]  Fetching transcript...")
        transcript = fetch_transcript(url, source_key=source_key, upload_date=upload_date)
        print(f"  [ok]  {len(transcript):,} characters")
        print("  [claude]  Summarizing from transcript...")
        summary = summarize_meeting(transcript, title, url, source_key)
    except FileNotFoundError as e:
        print(f"  [warn]  No transcript: {e}")
    except Exception as e:
        print(f"  [warn]  Transcript error: {e}")

    # -- Pre-fetch enrichment data (before agenda fallback) --------------------
    # For Weston, scrape the agenda PDF URL from their website
    if source_key == "weston" and not doc_url:
        print("    Looking up Weston agenda document...")
        doc_url = fetch_weston_doc_url(title)
        if doc_url:
            print(f"    Found: {doc_url}")

    # Fetch structured vote/agenda data for Wausau CivicClerk meetings
    civic_data = None
    if source_key == "wausau" and doc_url:
        print("    Fetching CivicClerk vote data...")
        civic_data = fetch_civicclerk_data(doc_url)
        if civic_data:
            print(f"  [ok]  Got {len(civic_data.get('items', []))} agenda items with votes")

    # -- Agenda fallback -------------------------------------------------------
    if summary is None:
        agenda_text = fetch_agenda_text(source_key, doc_url, title, description)
        if agenda_text:
            # If we have CivicClerk vote data, enrich the agenda summary with it
            if civic_data and civic_data.get("items"):
                print("  [claude]  Summarizing from agenda + CivicClerk vote data...")
                summary = summarize_from_agenda_with_votes(
                    agenda_text, title, source_key, url, civic_data)
            else:
                print("  [claude]  Summarizing from agenda document...")
                summary = summarize_from_agenda(agenda_text, title, source_key, url)
        else:
            print("  [err]  No transcript or agenda available - skipping.")
            return None

    path = save_summary(title, url, source_key, summary, doc_url, civic_data)
    print(f"  [save]  Saved  {path}")
    return path




# -- Upcoming meetings fetch ---------------------------------------------------

def fetch_wausau_upcoming() -> list[dict]:
    """
    Fetch upcoming City of Wausau meetings from CivicClerk API.
    Returns list of {date, time, name, url} dicts.
    Note: CivicClerk stores local Wausau times with a Z suffix (not true UTC).
    """
    import requests, re
    from datetime import date

    today = date.today().isoformat()
    url = (
        "https://wausauwi.api.civicclerk.com/v1/Events"
        f"?%24filter=eventDate%20ge%20{today}T00%3A00%3A00Z%20and%20isDeleted%20eq%20false"
        "&%24orderby=eventDate&%24top=20"
    )
    try:
        r = requests.get(url, headers={"Accept": "application/json",
                                       "User-Agent": "Mozilla/5.0"}, timeout=10)
        events = r.json().get("value", [])
        results = []
        for e in events:
            name = e.get("eventName", "")
            if "CANCEL" in name.upper() or "POSSIBLE QUORUM" in name.upper():
                continue
            raw = e.get("eventDate", "")
            # Strip Z - times are local (not UTC)
            dt_str = raw.replace("Z", "").replace("+00:00", "")
            date_part = dt_str[:10]
            if len(dt_str) > 10:
                h, m = int(dt_str[11:13]), int(dt_str[14:16])
                ap = "AM" if h < 12 else "PM"
                h12 = h % 12 or 12
                time_part = f"{h12}:{m:02d} {ap}"
            else:
                time_part = ""
            results.append({
                "date": date_part,
                "time": time_part,
                "name": name,
                "url": f"https://wausauwi.portal.civicclerk.com/event/{e['id']}/overview",
                "source": "wausau",
            })
        return results
    except Exception as ex:
        print(f"   [warn]  Wausau upcoming fetch failed: {ex}")
        return []


def update_upcoming_in_jsx(jsx_path: str, events: list[dict]):
    """Replace WAUSAU_UPCOMING in the JSX file with fresh data."""
    import re
    with open(jsx_path) as f:
        content = f.read()

    new_entries = "\n".join(
        f'  {{ date:"{e["date"]}", time:"{e["time"]}", '
        f'name:"{e["name"].replace(chr(34), chr(39))}", '
        f'url:"{e["url"]}", source:"wausau" }},'
        for e in events
    )
    new_block = "const WAUSAU_UPCOMING = [\n" + new_entries + "\n];"

    content = re.sub(
        r"const WAUSAU_UPCOMING = \[[\s\S]*?\];",
        new_block,
        content
    )
    with open(jsx_path, "w") as f:
        f.write(content)



# -- BoardBook agenda scraper (Wausau School Board) ---------------------------

BOARDBOOK_ORG = 1360
BOARDBOOK_BASE = "https://meetings.boardbook.org"


def scrape_boardbook_org_page() -> list[dict]:
    """
    Scrape the BoardBook organization page for all meetings.
    Returns list of {meeting_id, date, time, name, url}.
    """
    import requests, re
    from datetime import datetime, date as ddate

    r = requests.get(
        f"{BOARDBOOK_BASE}/Public/Organization/{BOARDBOOK_ORG}",
        headers={"User-Agent": "Mozilla/5.0"}, timeout=15
    )
    rows = re.findall(r"<tr[^>]*>(.*?)</tr>", r.text, re.DOTALL)
    meetings = []
    for row in rows:
        id_m = re.search(r"/Public/Agenda/\d+\?meeting=(\d+)", row)
        if not id_m:
            continue
        text = re.sub(r"&nbsp;", " ", row)
        text = re.sub(r"&[a-z]+;", " ", text)
        text = re.sub(r"<[^>]+>", " ", text)
        text = re.sub(r"\s+", " ", text).strip()
        dm = re.search(
            r"(\w+ \d+, \d{4}) at (\d+:\d+ [AP]M) - (.+?)(?:Meeting Type|$)", text
        )
        if not dm:
            continue
        date_str, time_str, name = dm.groups()
        name = re.sub(r"\s+Meeting Type.*$", "", name).strip().rstrip(" -")
        try:
            dt = datetime.strptime(date_str, "%B %d, %Y").date()
            meetings.append({
                "meeting_id": id_m.group(1),
                "date":       dt.isoformat(),
                "time":       time_str,
                "name":       name.strip(),
                "url":        f"{BOARDBOOK_BASE}/Public/Agenda/{BOARDBOOK_ORG}?meeting={id_m.group(1)}",
                "packet_url": f"{BOARDBOOK_BASE}/Public/DownloadAgenda/{BOARDBOOK_ORG}?meeting={id_m.group(1)}",
            })
        except ValueError:
            pass
    return sorted(meetings, key=lambda x: x["date"], reverse=True)


def scrape_boardbook_agenda(meeting_id: str) -> dict:
    """
    Scrape agenda items and descriptions from a BoardBook meeting page.
    Returns {title, items: [{number, text, attachments}], packet_url}.
    """
    import requests, re

    r = requests.get(
        f"{BOARDBOOK_BASE}/Public/Agenda/{BOARDBOOK_ORG}?meeting={meeting_id}",
        headers={"User-Agent": "Mozilla/5.0"}, timeout=15
    )

    # Page title
    title_m = re.search(r"<title>([^<]+)</title>", r.text)
    page_title = (title_m.group(1) if title_m else "").replace(
        " - BoardBook Premier", ""
    ).strip()

    # Parse table cells into agenda items
    cells = re.findall(r"<td[^>]*>(.*?)</td>", r.text, re.DOTALL)
    items = []
    for cell in cells:
        clean = re.sub(r"&nbsp;",   " ", cell)
        clean = re.sub(r"&amp;",    "&", clean)
        clean = re.sub(r"&eacute;", "", clean)
        clean = re.sub(r"&[a-z]+;", " ", clean)
        clean = re.sub(r"<[^>]+>",  " ", clean)
        clean = re.sub(r"\s+",      " ", clean).strip()
        if len(clean) > 5 and clean.lower() != "agenda":
            items.append(clean)

    return {
        "page_title": page_title,
        "items":      items,
        "meeting_id": meeting_id,
        "packet_url": f"{BOARDBOOK_BASE}/Public/DownloadAgenda/{BOARDBOOK_ORG}?meeting={meeting_id}",
        "agenda_url": f"{BOARDBOOK_BASE}/Public/Agenda/{BOARDBOOK_ORG}?meeting={meeting_id}",
    }


def summarize_from_boardbook(agenda: dict, title: str) -> dict:
    """
    Send the BoardBook agenda to Claude and get a structured JSON summary.
    """
    client = anthropic.Anthropic()
    items_text = "\n".join(f"  {item}" for item in agenda["items"])

    prompt = f"""You are a local government reporter for the Wausau Pilot & Review covering the Wausau School District Board of Education.

Meeting: {title}
BoardBook agenda page: {agenda['agenda_url']}
Full packet download: {agenda['packet_url']}

Below is the complete agenda scraped from BoardBook. Each line is one agenda item, including item descriptions where available.

--- AGENDA ---
{items_text}
--- END ---

Based solely on this agenda, produce a JSON object with this exact structure and nothing else:

{{
  "overview": "2-3 sentence factual summary of what this meeting covered and its significance for the Wausau School District",
  "committee": "the meeting type (e.g. Regular Meeting, Committee of the Whole, Special Meeting)",
  "agenda": [
    {{"time": "0:00", "item": "agenda item description"}}
  ],
  "discussions": [
    {{"item": "agenda item title", "body": "2-3 sentence description of what this item involved, based on the description text"}}
  ],
  "publicComment": "description of public comment if the agenda includes one, or 'No public comment period was included on this agenda.'",
  "actionItems": ["action item 1", "action item 2"]
}}

Rules:
- agenda: include ALL roman-numeral top-level items. Use estimated timestamps starting at 0:00 (2-5 min per item).
- discussions: only include items with substantive descriptions. Skip procedural items like Call to Order, Roll Call, Pledge.
- actionItems: items marked "(Action Requested)" plus motions implied by the agenda.
- Return ONLY the JSON. No markdown, no explanation.
"""

    msg = client.messages.create(
        model=CLAUDE_MODEL, max_tokens=4096,
        messages=[{"role": "user", "content": prompt}]
    )
    raw = msg.content[0].text.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return {"overview": raw, "agenda": [], "discussions": [],
                "publicComment": "", "actionItems": [], "committee": ""}


def process_school_board_meeting(bb_meeting: dict, state: dict) -> bool:
    """
    Process a single BoardBook meeting: scrape agenda, summarize with Claude,
    save outputs. Returns True if newly processed.
    """
    meeting_id = bb_meeting["meeting_id"]
    video_id   = f"bb_{meeting_id}"   # synthetic ID for BoardBook-only meetings

    if video_id in state.get("processed", {}):
        return False

    title = f"{bb_meeting['name']} - {bb_meeting['date']}"
    print(f"  [agenda]  Scraping BoardBook agenda for: {title}")

    agenda = scrape_boardbook_agenda(meeting_id)

    print(f"  [claude]  Summarizing {len(agenda['items'])} agenda items...")
    summary = summarize_from_boardbook(agenda, title)

    doc_url = bb_meeting.get("url", bb_meeting.get("agenda_url", ""))
    path = save_summary(title, f"https://www.youtube.com/@wausauschoolboard",
                        "school_board", summary, doc_url=doc_url)

    mark_processed(state, video_id, title, "school_board", path, doc_url=doc_url)
    print(f"  [ok]  Saved: {path}")
    return True


def fetch_school_board_new(state: dict, dry_run: bool = False) -> int:
    """
    Check BoardBook for any new school board meetings not yet processed.
    Only processes meetings that have already occurred (date <= today).
    Returns count of newly processed meetings.
    """
    from datetime import date as _date
    today = _date.today()

    print("[fetch]  Checking BoardBook for new Wausau School Board meetings...")
    meetings = scrape_boardbook_org_page()
    count = 0

    # Convert global cutoff (YYYYMMDD) to date for comparison
    cutoff_date = None
    if GLOBAL_DATE_CUTOFF:
        try:
            cutoff_date = _date(
                int(GLOBAL_DATE_CUTOFF[:4]),
                int(GLOBAL_DATE_CUTOFF[4:6]),
                int(GLOBAL_DATE_CUTOFF[6:8])
            )
        except Exception:
            pass

    for m in meetings[:20]:   # check 20 most recent
        # Skip future meetings - they belong in Upcoming, not Recent
        meeting_date_str = m.get("date", "")
        try:
            # BoardBook dates come as "YYYY-MM-DD"
            parts = meeting_date_str.split("-")
            meeting_date = _date(int(parts[0]), int(parts[1]), int(parts[2]))
            if meeting_date > today:
                print(f"  [skip] Future meeting skipped: {m['name']} on {meeting_date_str}")
                continue
            if cutoff_date and meeting_date < cutoff_date:
                continue  # before global cutoff
        except Exception:
            pass  # if we can't parse the date, proceed anyway

        video_id = f"bb_{m['meeting_id']}"
        if video_id in state.get("processed", {}):
            continue
        print(f"  [new]  New meeting: {m['name']} on {meeting_date_str}")
        if not dry_run:
            if process_school_board_meeting(m, state):
                count += 1
    return count


# -- CLI -----------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Central WI Meeting Summarizer")
    group  = parser.add_mutually_exclusive_group()
    group.add_argument("--url",      metavar="URL",  help="Process a single video URL")
    group.add_argument("--backfill", action="store_true", help="Process all historical videos")
    group.add_argument("--days",     type=int, metavar="N",  help="Process videos from the last N days only")
    parser.add_argument("--source",  choices=["marathon","wausau","weston","school_board","all"], default="all",
                        help="Which channel(s) to process (default: both)")
    parser.add_argument("--dry-run", action="store_true", help="Preview without processing")
    args = parser.parse_args()

    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("[err]  ANTHROPIC_API_KEY not set.")
        sys.exit(1)

    state      = load_state()
    # Save state immediately so the file exists even if nothing is processed
    save_state(state)
    print(f"   State file: {STATE_FILE.resolve()}")

    # Include school_board in "all" runs
    all_sources = list(CHANNELS.keys()) + ["school_board"]
    sources     = all_sources if args.source == "all" else [args.source]

    # -- Single URL ------------------------------------------------------------
    if args.url:
        url      = args.url
        vid_id_m = re.search(r"(?:v=|youtu\.be/)([A-Za-z0-9_-]{11})", url)
        if not vid_id_m:
            print(f"[err]  Could not parse video ID from: {url}"); sys.exit(1)
        vid_id = vid_id_m.group(1)

        if vid_id in state["processed"] and not args.dry_run:
            info = state["processed"][vid_id]
            print(f"  Already processed: {info['title']}\n   {info['summary_file']}")
            return

        # Detect source from URL or default marathon
        source_key = "wausau" if "CityofWausau" in url else "marathon"
        # Try to get title + doc_url from channel listing
        videos = fetch_channel_videos(source_key)
        match  = next((v for v in videos if v["id"] == vid_id), None)
        if match:
            video = match
        else:
            video = {"id": vid_id, "title": f"Meeting {vid_id}", "url": url,
                     "source": source_key, "doc_url": None}

        if args.dry_run:
            print(f"[DRY RUN] Would process: {video['title']}"); return

        path = process_video(video)
        if path:
            mark_processed(state, vid_id, video["title"], source_key, path, video.get("doc_url"))
            save_state(state)
        return

    # -- Channel mode ----------------------------------------------------------
    cutoff_date = None
    if args.days:
        from datetime import timedelta
        cutoff_date = (datetime.now(timezone.utc) - timedelta(days=args.days)).strftime("%Y%m%d")
        print(f"[date]  Limiting to videos uploaded on or after {cutoff_date} (last {args.days} days)")

    all_pending = []
    for src in sources:
        if src == "school_board":
            continue   # handled separately below
        # Pass cutoff_date as dateafter for accurate upload dates on recent fetches
        videos = fetch_channel_videos(src, dateafter=cutoff_date if cutoff_date else "")
        if args.backfill:
            pending = [v for v in videos if v["id"] not in state["processed"]]
        elif cutoff_date:
            # Only process videos uploaded on or after the global cutoff date
            pending = [
                v for v in videos
                if v["id"] not in state["processed"]
                and v["id"] not in SKIP_VIDEO_IDS
                and v.get("upload_date", "99999999") >= GLOBAL_DATE_CUTOFF
            ]
            print(f"   {src}: {len(videos)} in window, {len(pending)} on or after {GLOBAL_DATE_CUTOFF}")
            for v in videos[:3]:
                print(f"     {v.get('upload_date','?')} {v['id']} {v['title'][:60]}")
        else:
            # Backfill: skip old Marathon County full-board sessions (long, no captions,
            # blocked PDFs). Committee meetings are fine. New board meetings come through
            # the --days path automatically.
            # Skip Marathon County in backfill — historical videos lack captions
            # and have blocked agenda PDFs. New videos are captured via --days runs.
            if src == "marathon":
                print(f"   marathon: skipping historical backfill (use --days for recent videos)")
                pending = []
            else:
                pending = []
                for v in videos:
                    if v["id"] in state["processed"]:
                        break
                    pending.append(v)
        all_pending.extend(pending)

    # School board always handled by its own scraper
    for src in sources:
        if src == "school_board":
            sb_count = fetch_school_board_new(state, args.dry_run)
            print(f"   school_board: {sb_count} new meeting(s) processed")

    if not all_pending:
        print("[ok]  No new meetings to process."); return

    print(f"\n[agenda]  {len(all_pending)} meeting(s) to process:")
    for v in all_pending:
        ch = CHANNELS[v["source"]]
        print(f"   [{ch['label']}] {v['title']}")

    if args.dry_run:
        print("\n[DRY RUN] No files written."); return

    ok = 0
    for v in all_pending:
        path = process_video(v)
        if path:
            mark_processed(state, v["id"], v["title"], v["source"], path, v.get("doc_url"))
            save_state(state)
            ok += 1

    print(f"\n{'='*60}")
    print(f"[ok]  Done. {ok}/{len(all_pending)} processed.")
    print(f"   Summaries: {SUMMARIES_DIR.resolve()}")
    print(f"   State:     {STATE_FILE.resolve()}")

    # ── Agenda-only report ────────────────────────────────────────────────────
    # Scan summaries from this run and flag agenda-only meetings
    agenda_only = []
    transcript_based = []
    for vid, info in state.get("processed", {}).items():
        sf = info.get("summary_file", "")
        json_path = sf.replace(".md", "_summary.json") if sf else ""
        if json_path and Path(json_path).exists():
            try:
                s = json.loads(Path(json_path).read_text(encoding="utf-8"))
                src = s.get("_source", "transcript")
                entry = {"id": vid, "title": info["title"], "source": info["source"],
                         "url": info.get("doc_url") or f"https://www.youtube.com/watch?v={vid}",
                         "_source": src}
                if src in ("agenda", "agenda_with_votes"):
                    agenda_only.append(entry)
                else:
                    transcript_based.append(entry)
            except Exception:
                pass

    if agenda_only:
        print(f"\n{'='*60}")
        print(f"⚠️  AGENDA-ONLY MEETINGS ({len(agenda_only)}):")
        print(f"   These meetings lack transcripts — summaries are based on")
        print(f"   agenda documents only. Paste a transcript to improve them.")
        for m in agenda_only:
            label = CHANNELS.get(m["source"], {}).get("label", m["source"])
            vote_note = " (has vote data)" if m["_source"] == "agenda_with_votes" else ""
            print(f"   [{label}] {m['title']}{vote_note}")
            print(f"            {m['url']}")

        # Write report file for CI to create GitHub Issue
        report = {
            "agenda_only": agenda_only,
            "transcript_based": [{"id": m["id"], "title": m["title"], "source": m["source"]}
                                  for m in transcript_based],
            "total_processed": ok,
        }
        report_path = Path("./agenda_only_report.json")
        report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
        print(f"\n   Report saved: {report_path.resolve()}")
    else:
        print(f"\n✅  All {ok} meetings have transcripts — no agenda-only fallbacks.")

if __name__ == "__main__":
    main()
