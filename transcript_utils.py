"""Shared transcript helpers.

Consolidates two utilities that previously existed in multiple copies across
the scraper scripts:

  - `parse_vtt(raw)` — turn raw WebVTT text into plain text with periodic
    `[H:MM:SS]` timestamp markers. Dedupes *consecutive* duplicate lines only
    (an earlier version used a global `seen` set, which clobbered legitimate
    repeats like "yes" during roll calls).

  - `fetch_via_youtube_transcript_api(video_id, cookies_file=None)` — wrapper
    around the `youtube-transcript-api` package that tolerates both the v0.6
    classmethod API and the v1.x instance API.
"""

from __future__ import annotations

import os
import re
from typing import Optional


__all__ = ["parse_vtt", "fetch_via_youtube_transcript_api"]


_VTT_TS_RE = re.compile(r"(\d{1,2}):(\d{2}):(\d{2})")
_HTML_TAG_RE = re.compile(r"<[^>]+>")


def parse_vtt(raw: str) -> str:
    """Convert raw WebVTT into a flat transcript with ~5-minute timestamps.

    Only consecutive duplicate lines are dropped; repeated words across a
    transcript (e.g. "yes", "all in favor") survive intact.
    """
    lines: list[str] = []
    last_ts_minute = -5
    for line in raw.splitlines():
        line = line.strip()
        if (not line
                or line.startswith("WEBVTT")
                or line.startswith("Kind:")
                or line.startswith("Language:")):
            continue
        # Cue-timing line: "00:05:23.000 --> 00:05:26.000"
        if "-->" in line:
            ts_m = _VTT_TS_RE.match(line)
            if ts_m:
                h, m, s = (int(ts_m.group(i)) for i in (1, 2, 3))
                total_min = h * 60 + m
                if total_min >= last_ts_minute + 5:
                    ts_str = f"{h}:{m:02d}:{s:02d}" if h > 0 else f"{m}:{s:02d}"
                    lines.append(f"[{ts_str}]")
                    last_ts_minute = total_min
            continue
        line = _HTML_TAG_RE.sub("", line)
        if not line:
            continue
        if lines and line == lines[-1]:
            continue
        lines.append(line)
    return " ".join(lines)


def fetch_via_youtube_transcript_api(
    video_id: str,
    cookies_file: Optional[str] = None,
    languages: tuple[str, ...] = ("en", "en-US", "en-GB", "en-orig"),
) -> Optional[str]:
    """Try `youtube-transcript-api`, honoring a Netscape cookies file if given.

    Returns plain text on success, None on failure. Tolerates both the v1.x
    instance API (`YouTubeTranscriptApi(http_client=…).fetch(…)`) and the v0.6
    classmethod (`YouTubeTranscriptApi.get_transcript(…)`).
    """
    try:
        from youtube_transcript_api import YouTubeTranscriptApi  # type: ignore
    except ImportError:
        return None

    # Prefer the v1.x instance API with an optional cookied session.
    try:
        import requests
        from http.cookiejar import MozillaCookieJar

        session = requests.Session()
        session.headers.update({
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/122.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
        })
        if cookies_file and os.path.exists(cookies_file):
            jar = MozillaCookieJar(cookies_file)
            jar.load(ignore_discard=True, ignore_expires=True)
            session.cookies = jar

        api = YouTubeTranscriptApi(http_client=session)
        result = api.fetch(video_id, languages=list(languages))
        entries = list(result)
        text = " ".join(getattr(s, "text", "").strip() for s in entries).strip()
        if text and len(text) > 200:
            return text
    except TypeError:
        # v0.6 doesn't accept http_client= — fall through.
        pass
    except Exception:
        pass

    # Legacy classmethod fallback (v0.6).
    try:
        get_transcript = getattr(YouTubeTranscriptApi, "get_transcript", None)
        if get_transcript:
            entries = get_transcript(video_id, languages=list(languages))
            text = " ".join(e["text"] for e in entries).strip()
            if len(text) > 200:
                return text
    except Exception:
        pass

    return None
