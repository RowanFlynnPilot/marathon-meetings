#!/usr/bin/env python3
"""
inject_meetings.py — Refresh src/data/meetings.json from processed summaries.
==============================================================================
Reads processed_meetings.json plus the *_summary.json / *_votes.json sidecars
produced by marathon_meeting_summarizer.py, then writes src/data/meetings.json.

Vite imports that file directly into the React component, so once it's written
the build just picks it up — no JSX mutation involved.

Usage:
    python inject_meetings.py [path/to/meetings.json]

Defaults to ./src/data/meetings.json.

Pipeline order (GitHub Actions):
    1. marathon_meeting_summarizer.py   → summaries/*.json
    2. inject_meetings.py               → src/data/meetings.json
    3. update_upcoming.py               → src/data/upcoming.json
    4. git commit && git push
    5. vite build → deploy
"""

import json, logging, re, sys, os
from datetime import datetime, date, timedelta, timezone
from pathlib import Path

logger = logging.getLogger(__name__)

# ── Config ────────────────────────────────────────────────────────────────────

from config import (
    MEETINGS_JSON,
    STATE_FILE,
    SUMMARIES_DIR,
    INJECTED_FILE,
    MAX_MEETINGS,
    BOARDBOOK_DISTRICTS,
)

DATA_PATH = Path(sys.argv[1]) if len(sys.argv) > 1 else MEETINGS_JSON

# ── Committee → source mapping ────────────────────────────────────────────────

COMMITTEE_MAP = {
    # Marathon County
    "executive committee":                     ("marathon", "Executive Committee"),
    "public safety committee":                 ("marathon", "Public Safety"),
    "environmental resources committee":       ("marathon", "Environmental Resources"),
    "health and human services committee":     ("marathon", "Health & Human Services"),
    "health & human services committee":       ("marathon", "Health & Human Services"),
    "infrastructure committee":                ("marathon", "Infrastructure"),
    "hr, finance & property":                  ("marathon", "HR, Finance & Property"),
    "human resources, finance & property":     ("marathon", "HR, Finance & Property"),
    "extension, education & econ":             ("marathon", "Extension & Economic Dev"),
    "county board":                            ("marathon", "County Board"),
    # City of Wausau
    "public health & safety":                  ("wausau", "Public Health & Safety"),
    "public health and safety":                ("wausau", "Public Health & Safety"),
    "board of public works":                   ("wausau", "Board of Public Works"),
    "common council":                          ("wausau", "City Council"),
    "infrastructure & facilities":             ("wausau", "Infrastructure & Facilities"),
    "wausau water works":                      ("wausau", "Water Works"),
    "wausau plan commission":                  ("wausau", "Plan Commission"),
    "wausau finance committee":                ("wausau", "Finance"),
    "wausau parks":                            ("wausau", "Parks & Recreation"),
    "wausau economic development":             ("wausau", "Economic Development"),
    # Village of Weston
    "board of trustees":                       ("weston", "Board of Trustees"),
    "finance and human resources committee":   ("weston", "Finance & Human Resources"),
    "finance & human resources committee":     ("weston", "Finance & Human Resources"),
    "public works committee":                  ("weston", "Public Works"),
    "public works & utility":                  ("weston", "Public Works"),
    "community life & public safety":          ("weston", "Community Life & Public Safety"),
    "community life and public safety":        ("weston", "Community Life & Public Safety"),
    "s.a.f.e.r":                               ("weston", "S.A.F.E.R. Board"),
    "mountain bay metro":                      ("weston", "Mountain Bay Metro Police"),
    # Wausau School Board
    "committee of the whole":                  ("school_board", "Committee of the Whole"),
    "audit of the bills":                      ("school_board", "Audit of the Bills"),
    # DC Everest School Board
    "regular school board":                    ("dc_everest", "Regular Meeting"),
    "special school board":                    ("dc_everest", "Special Meeting"),
    "board workshop":                          ("dc_everest", "Board Workshop"),
    "annual meeting":                          ("dc_everest", "Annual Meeting"),
    "budget hearing":                          ("dc_everest", "Annual Meeting"),
    # Village of Kronenwetter (Municode hub)
    "village board":                           ("kronenwetter", "Village Board"),
    "plan commission":                         ("kronenwetter", "Plan Commission"),
    "administrative policy":                   ("kronenwetter", "Administrative Policy"),
    "utility committee":                       ("kronenwetter", "Utility"),
    "clipp":                                   ("kronenwetter", "CLIPP"),
    "community life, infrastructure":          ("kronenwetter", "CLIPP"),
    "police & fire":                           ("kronenwetter", "Police & Fire Commission"),
    "redevelopment authority":                 ("kronenwetter", "Redevelopment Authority"),
    "board of review":                         ("kronenwetter", "Board of Review"),
}


def _boardbook_committee_from_title(title: str) -> str:
    """Derive the meeting-type committee for a BoardBook district from its
    title. The title reliably carries the meeting type ('Regular School Board
    Meeting', 'Board Workshop', ...); the summary's `committee` field does NOT
    for transcript-upgraded entries — Claude returns the board's name there
    instead of the meeting type. So title is authoritative for these sources.
    """
    t = title.lower()
    if "committee of the whole" in t:        return "Committee of the Whole"
    if "workshop" in t:                       return "Board Workshop"
    if "annual" in t or "budget hearing" in t: return "Annual Meeting"
    if "special" in t:                        return "Special Meeting"
    if "audit" in t:                          return "Audit of the Bills"
    if "regular" in t:                        return "Regular Meeting"
    if "public hearing" in t:                 return "Public Hearing"
    # Fallback: strip date suffix, keep the cleaned name.
    c = re.sub(r"\s*-\s*\d.*$", "", title).strip()
    return c or "Board Meeting"


def infer_source_and_committee(title: str, source_key: str, committee_from_json: str) -> tuple[str, str]:
    """Return (source, committee_display).
    source_key from processed_meetings.json is AUTHORITATIVE — never override it.
    COMMITTEE_MAP is only used to clean up the display committee name.
    """
    def normalize(s):
        return s.lower().replace(" and ", " & ").replace("  ", " ")

    # BoardBook districts: the meeting TYPE lives in the title, not the
    # summary's committee field (unreliable after transcript upgrade).
    if source_key in BOARDBOOK_DISTRICTS:
        return (source_key, _boardbook_committee_from_title(title))

    if committee_from_json and len(committee_from_json) > 3:
        lower = normalize(committee_from_json)
        for key, (map_source, map_committee) in COMMITTEE_MAP.items():
            if key in lower and map_source == source_key:
                return (source_key, map_committee)
        return (source_key, committee_from_json)

    lower = normalize(title)
    for key, (map_source, map_committee) in COMMITTEE_MAP.items():
        if key in lower and map_source == source_key:
            return (source_key, map_committee)

    clean = re.sub(r'\s*-\s*\d+.*$', '', title).strip()
    clean = re.sub(r'\s*-\s*20\d{2}-\d{2}-\d{2}$', '', clean).strip()
    return (source_key, clean)


# ── Date helpers ──────────────────────────────────────────────────────────────

def parse_date_from_title(title: str):
    """Handles 'Board of Trustees - 3/23/2026' and 'Special Meeting - 2026-01-26'."""
    m = re.search(r'(20\d{2})-(\d{2})-(\d{2})', title)
    if m:
        try:
            return datetime(int(m.group(1)), int(m.group(2)), int(m.group(3)))
        except ValueError:
            pass
    m = re.search(r'(\d{1,2})/(\d{1,2})/(\d{2,4})', title)
    if m:
        mo, dy, yr = m.groups()
        yr = "20" + yr if len(yr) == 2 else yr
        try:
            return datetime(int(yr), int(mo), int(dy))
        except ValueError:
            pass
    m = re.search(r'(\d{1,2})-(\d{1,2})-(\d{2,4})(?!\d)', title)
    if m:
        mo, dy, yr = m.groups()
        yr = "20" + yr if len(yr) == 2 else yr
        try:
            dt = datetime(int(yr), int(mo), int(dy))
            if dt.year >= 2010:
                return dt
        except ValueError:
            pass
    return None


def fmt_date(dt: datetime) -> str:
    return f"{dt.strftime('%B')} {dt.day}, {dt.year}"


def fmt_short_date(dt: datetime) -> str:
    return f"{dt.strftime('%b')} {dt.day}".upper()


def clean_committee(s: str) -> str:
    """Strip HTML tags and placeholder tokens that occasionally bleed in."""
    if not s:
        return ""
    s = re.sub(r'<[^>]+>', '', s)
    s = re.sub(r'\[+[A-Z_]+\]+', '', s)
    return s.strip()


# ── Build a meeting dict from a summary sidecar ───────────────────────────────

def build_meeting(
    video_id: str,
    info: dict,
    summary: dict,
    civic_data: dict | None,
    existing_date: str | None = None,
) -> dict | None:
    """existing_date is the date currently in meetings.json for this video, if
    any (formatted as 'Month D, YYYY'). It's used as a tie-breaker against the
    processed_at fallback so re-injecting an old meeting never makes its date
    drift to the day CI happened to run.
    """
    title      = info["title"]
    source_key = info["source"]
    doc_url    = info.get("doc_url")

    today = date.today()

    def _yyyymmdd_to_dt(s):
        if s and len(str(s)) == 8 and str(s).isdigit():
            try:
                return datetime(int(s[:4]), int(s[4:6]), int(s[6:8]))
            except ValueError:
                return None
        return None

    # 1. meeting_date is authoritative — it's the actual meeting date, not the
    #    YouTube upload date (which is typically the day after the meeting).
    dt = _yyyymmdd_to_dt(info.get("meeting_date"))

    # 2. Title may carry the date as a "- 5/11/2026" suffix.
    if dt is None:
        dt = parse_date_from_title(title)

    # 3. Fall back to upload_date (close-enough; off by ~1 day for some sources).
    if dt is None:
        dt = _yyyymmdd_to_dt(info.get("upload_date"))

    # If we already have a known-good date in meetings.json, use it. This
    # prevents re-injections from overwriting a real date with today's CI run.
    if dt is None and existing_date:
        try:
            dt = datetime.strptime(existing_date, "%B %d, %Y")
        except ValueError:
            dt = None

    # Last resort: processed_at. A meeting can't have happened today-or-later
    # while also having been processed, so if processed_at is today/future and
    # nothing better is available, clamp to yesterday — better to be one day
    # early than to show a "future" past meeting.
    if dt is None:
        processed_at = info.get("processed_at", "")
        if processed_at:
            try:
                dt = datetime.fromisoformat(processed_at.replace("Z", "+00:00"))
            except ValueError:
                dt = datetime.now()
        else:
            dt = datetime.now()
        if dt.date() >= today:
            logger.warning(
                "%s: no upload_date and processed_at resolves to %s; "
                "clamping to yesterday to avoid a future-dated past meeting",
                video_id, dt.date().isoformat(),
            )
            dt = datetime.combine(today - timedelta(days=1), datetime.min.time())

    source, committee = infer_source_and_committee(
        title, source_key, summary.get("committee", "")
    )
    committee = clean_committee(committee)

    # Synthetic IDs (BoardBook bb_, Kronenwetter kw_) have no YouTube watch
    # URL of their own — link the card to the recording when one was matched
    # (video_url), else the meeting page / agenda doc.
    is_synthetic = video_id.startswith(("bb_", "kw_"))
    if video_id.startswith("bb_"):
        yt_url = info.get("video_url") or doc_url \
            or "https://meetings.boardbook.org/Public/Organization/1360"
    elif video_id.startswith("kw_"):
        # video_url holds the Municode meeting detail page (agenda + packet
        # + minutes links live there).
        yt_url = info.get("video_url") or doc_url \
            or "https://kronenwetter-wi.municodemeetings.com"
    else:
        yt_url = f"https://www.youtube.com/watch?v={video_id}"

    clean_title = title
    clean_title = re.sub(r'\s*-\s*\d{4}-\d{2}-\d{2}$', '', clean_title).strip()
    clean_title = re.sub(r'\s*-\s*\d{1,2}/\d{1,2}/\d{2,4}$', '', clean_title).strip()
    clean_title = re.sub(r'\s*-\s*\d{1,2}-\d{1,2}-\d{2,4}$', '', clean_title).strip()
    # Strip the jurisdiction prefix — the source badge already tells the
    # reader which jurisdiction this belongs to.
    if source == "wausau":
        clean_title = re.sub(r'^(City of\s+)?Wausau\s+', '', clean_title, flags=re.IGNORECASE).strip()
    elif source == "marathon":
        clean_title = re.sub(r'^Marathon County\s+', '', clean_title, flags=re.IGNORECASE).strip()
    elif source == "weston":
        clean_title = re.sub(r'^(Village of\s+)?Weston\s+', '', clean_title, flags=re.IGNORECASE).strip()
    elif source == "school_board":
        clean_title = re.sub(r'^Wausau School (Board|District)\s+', '', clean_title, flags=re.IGNORECASE).strip()
    elif source == "dc_everest":
        clean_title = re.sub(r'^D\.?C\.?\s*Everest( Area)?( School)?( District)?\s+', '', clean_title, flags=re.IGNORECASE).strip()

    agenda_items = summary.get("agenda") or [{"time": "0:00", "item": "Meeting convened"}]
    # Synthetic entries are agenda-only by default, but upgrade passes can
    # re-summarize them from real outcomes: a recording transcript (bb_) or
    # official minutes (kw_). Both count as outcome-based, not agenda-only.
    is_agenda_only = (summary.get("_source") == "agenda") or \
                     (is_synthetic and summary.get("_source") not in ("transcript", "minutes"))

    # Duration from state (yt-dlp returns video length in seconds). Format as
    # "Hh Mm" / "Mm". For agenda-only meetings there's no recording, so leave
    # null — the JSX hides the chip when this is missing.
    def _fmt_duration_secs(secs):
        if not secs:
            return None
        try:
            secs = int(secs)
        except (TypeError, ValueError):
            return None
        if secs <= 0:
            return None
        h = secs // 3600
        m = (secs % 3600) // 60
        if h and m:
            return f"{h}h {m}m"
        if h:
            return f"{h}h"
        return f"{m}m"

    duration_secs = info.get("duration")
    duration_str  = None if is_agenda_only else _fmt_duration_secs(duration_secs)

    meeting = {
        "id":             video_id,
        "source":         source,
        "title":          clean_title,
        "date":           fmt_date(dt),
        "shortDate":      fmt_short_date(dt),
        "committee":      committee,
        "duration":       duration_str,
        "url":            yt_url,
        "docUrl":         doc_url,
        "isAgendaOnly":   bool(is_agenda_only),
        "badge":          "new",
        "overview":       summary.get("overview", ""),
        "agenda":         agenda_items,
        "discussions":    summary.get("discussions", []),
        "publicComment":  summary.get("publicComment", "No public comment was offered."),
        "actionItems":    summary.get("actionItems", []),
        "topics":         summary.get("topics", []),
        # Structured votes from transcript/minutes summaries (CivicClerk
        # sources get richer civicItems below; this covers everyone else).
        "votes":          summary.get("votes", []),
    }

    if civic_data and source == "wausau":
        items = civic_data.get("items", [])
        if items:
            meeting["civicItems"] = items

    return meeting


# ── Tracking helpers ──────────────────────────────────────────────────────────

def load_injected() -> set:
    if INJECTED_FILE.exists():
        try:
            return set(json.loads(INJECTED_FILE.read_text()).get("injected", []))
        except json.JSONDecodeError:
            return set()
    return set()


def save_injected(ids: set):
    INJECTED_FILE.write_text(json.dumps({"injected": sorted(ids)}, indent=2))


def load_meetings_json() -> list:
    if DATA_PATH.exists():
        try:
            data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
            return [m for m in data if isinstance(m, dict)]
        except json.JSONDecodeError:
            logger.warning("%s is malformed; starting fresh.", DATA_PATH)
            return []
    return []


def is_future(meeting: dict) -> bool:
    """Return True if the meeting's date is in the future."""
    date_str = meeting.get("date", "")
    if not date_str:
        return False
    try:
        d = datetime.strptime(date_str, "%B %d, %Y").date()
        return d > date.today()
    except ValueError:
        return False


def is_stub(meeting: dict) -> bool:
    """A stub is an entry with empty agenda and discussions — placeholder only."""
    return not meeting.get("agenda") and not meeting.get("discussions")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    from config import setup_logging
    setup_logging()
    print(f"\n💉  inject_meetings.py — target: {DATA_PATH}")
    print("=" * 60)

    if not STATE_FILE.exists():
        print("ℹ️   No state file found — nothing processed yet.")
        return

    state     = json.loads(STATE_FILE.read_text())
    processed = state.get("processed", {})
    injected  = load_injected()

    DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    existing  = load_meetings_json()
    existing_by_id = {m["id"]: m for m in existing}
    stub_ids = {m["id"] for m in existing if is_stub(m)}

    print(f"   Processed IDs in state:        {len(processed)}")
    print(f"   Already injected:              {len(injected)}")
    print(f"   Existing entries (loaded):     {len(existing)}")
    print(f"   Stubs awaiting full summary:   {len(stub_ids)}")

    # Pending = anything in state that hasn't been injected, OR a stub that now
    # has a summary available. Skip meetings with future dates in their titles.
    def _title_is_future(info):
        title = info.get("title", "")
        m = re.search(r"(20\d{2})-(\d{2})-(\d{2})", title)
        if m:
            try:
                return date(int(m.group(1)), int(m.group(2)), int(m.group(3))) > date.today()
            except ValueError:
                pass
        m = re.search(r"(\d{1,2})/(\d{1,2})/(\d{2,4})", title)
        if m:
            try:
                mo, dy, yr = int(m.group(1)), int(m.group(2)), int(m.group(3))
                yr = 2000 + yr if yr < 100 else yr
                return date(yr, mo, dy) > date.today()
            except ValueError:
                pass
        return False

    pending = {
        vid: info for vid, info in processed.items()
        if (vid not in injected or vid in stub_ids) and not _title_is_future(info)
    }

    if not pending:
        print("✅  No new meetings to inject.")
        # Still rewrite the file with the same data so the badge=null sweep
        # below runs and the file stays in canonical (newest-first) order.

    print(f"📋  {len(pending)} meeting(s) to inject:")
    for vid, info in pending.items():
        print(f"   [{info['source']}] {info['title']}")

    new_entries = []
    newly_injected = set()

    for video_id, info in sorted(
        pending.items(),
        key=lambda x: x[1].get("processed_at", ""),
        reverse=True,
    ):
        summary_path = info.get("summary_file", "")
        summary_json_path = summary_path.replace(".md", "_summary.json") if summary_path else ""
        if not summary_json_path or not Path(summary_json_path).exists():
            logger.warning("No summary JSON for %s, skipping", info["title"])
            continue

        summary = json.loads(Path(summary_json_path).read_text(encoding="utf-8"))

        votes_path = summary_path.replace(".md", "_votes.json") if summary_path else ""
        civic_data = None
        if votes_path and Path(votes_path).exists():
            try:
                civic_data = json.loads(Path(votes_path).read_text(encoding="utf-8"))
            except json.JSONDecodeError:
                civic_data = None

        prior = existing_by_id.get(video_id)
        prior_date = prior.get("date") if prior else None
        entry = build_meeting(video_id, info, summary, civic_data, existing_date=prior_date)
        if entry is None:
            continue
        new_entries.append(entry)
        newly_injected.add(video_id)
        print(f"   ✅  Built entry for: {info['title']}")

    # Combine: new entries first, then existing — with stubs being replaced
    # filtered out so we don't double-list. Also drop existing entries whose
    # id has been removed from state (e.g. force-reprocess via reprocess.py
    # cleared a wrong summary).
    state_ids = set(processed.keys())
    kept_existing = [m for m in existing
                     if m["id"] not in newly_injected and m["id"] in state_ids]
    dropped = len(existing) - len(kept_existing) - len([m for m in existing if m["id"] in newly_injected])
    if dropped > 0:
        print(f"   [prune] dropped {dropped} entry/entries no longer in state")

    # Carried-over entries don't pass through build_meeting (their summary
    # sidecar may have been pruned), so apply title-cleanup and the duration
    # normalization here so they pick up later improvements without needing a
    # full re-summarization.
    def _strip_prefix(title, source):
        if source == "wausau":
            return re.sub(r'^(City of\s+)?Wausau\s+', '', title, flags=re.IGNORECASE).strip()
        if source == "marathon":
            return re.sub(r'^Marathon County\s+', '', title, flags=re.IGNORECASE).strip()
        if source == "weston":
            return re.sub(r'^(Village of\s+)?Weston\s+', '', title, flags=re.IGNORECASE).strip()
        if source == "school_board":
            return re.sub(r'^Wausau School (Board|District)\s+', '', title, flags=re.IGNORECASE).strip()
        if source == "dc_everest":
            return re.sub(r'^D\.?C\.?\s*Everest( Area)?( School)?( District)?\s+', '', title, flags=re.IGNORECASE).strip()
        return title
    for m in kept_existing:
        m["title"] = _strip_prefix(m.get("title", ""), m.get("source", ""))
        # BoardBook districts: re-derive committee from the (authoritative)
        # title so transcript-upgraded entries that baked in the board's name
        # get corrected to the meeting type without a full re-summarization.
        if m.get("source") in BOARDBOOK_DISTRICTS:
            m["committee"] = _boardbook_committee_from_title(m.get("title", ""))
        # Replace the legacy placeholder duration with whatever's in state, or
        # null for agenda-only / unknown.
        if m.get("duration") in (None, "", "~1h"):
            info = processed.get(m["id"], {})
            secs = info.get("duration")
            new_dur = None
            if not m.get("isAgendaOnly") and secs:
                try:
                    secs = int(secs)
                    h, mins = secs // 3600, (secs % 3600) // 60
                    new_dur = f"{h}h {mins}m" if h and mins else (f"{h}h" if h else f"{mins}m")
                except (TypeError, ValueError):
                    new_dur = None
            m["duration"] = new_dur

    combined = new_entries + kept_existing

    # Drop future-dated entries (the title-level future check above only
    # covers what's in state; existing entries may have slipped through).
    before = len(combined)
    combined = [m for m in combined if not is_future(m)]
    if before - len(combined):
        print(f"   [prune] removed {before - len(combined)} future-dated entry/entries")

    # Sort newest-first by meeting date BEFORE pruning. Without this the list
    # is in injection order (processed_at), so the [:MAX_MEETINGS] cut below
    # can drop a recent meeting while keeping an older one.
    def _sort_key(m):
        try:
            return datetime.strptime(m.get("date", ""), "%B %d, %Y")
        except ValueError:
            return datetime.min
    combined.sort(key=_sort_key, reverse=True)

    # Prune to MAX_MEETINGS
    if len(combined) > MAX_MEETINGS:
        dropped = len(combined) - MAX_MEETINGS
        combined = combined[:MAX_MEETINGS]
        print(f"   🧹  Pruned {dropped} old meeting(s) (kept {MAX_MEETINGS})")

    # Badge sweep: only the entries we just injected keep badge=new; everything
    # else gets badge=null. (badge=null instead of missing key keeps the JSON
    # diff minimal between runs.)
    for m in combined:
        m["badge"] = "new" if m["id"] in newly_injected else None

    # Backfill Weston doc URLs by date if we can reach the summarizer module.
    try:
        from marathon_meeting_summarizer import fetch_weston_doc_url_by_date
        backfilled = 0
        for m in combined:
            if m.get("source") == "weston" and not m.get("docUrl"):
                try:
                    d = datetime.strptime(m["date"], "%B %d, %Y")
                    url = fetch_weston_doc_url_by_date(d.strftime("%m%d%Y"))
                    if url:
                        m["docUrl"] = url
                        backfilled += 1
                except (ValueError, KeyError):
                    pass
        if backfilled:
            print(f"   📎  Backfilled {backfilled} Weston doc URL(s)")
    except ImportError:
        pass

    # Write
    DATA_PATH.write_text(
        json.dumps(combined, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"\n💾  Wrote {len(combined)} meeting(s) to {DATA_PATH} ({len(new_entries)} new)")

    injected.update(newly_injected)
    save_injected(injected)

    print(f"✅  Done. Injected IDs recorded in {INJECTED_FILE}")
    print(f"\n   Summary:")
    print(f"   New meetings injected : {len(new_entries)}")
    print(f"   Total tracked IDs     : {len(injected)}")


if __name__ == "__main__":
    main()
