"""Centralized configuration for the meeting-tracker pipeline.

All scalar constants and env-var-controlled toggles live here so each callsite
imports from one place. Add new tunables to one of the labelled sections so the
file stays scannable.

Override patterns:
    SUMMARIES_DIR=/tmp/summaries python marathon_meeting_summarizer.py
    USE_WHISPER_FALLBACK=true python marathon_meeting_summarizer.py
"""

from __future__ import annotations

import logging
import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path


def setup_logging(level: int = logging.INFO) -> None:
    """Configure the root logger once with a CI-friendly format.

    Calls after the first are no-ops, which makes it safe for each script's
    main() to invoke without worrying about double configuration. Stdout is
    reconfigured to UTF-8 so emoji and accented characters survive on Windows
    consoles (default cp1252).
    """
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except (AttributeError, OSError):
        pass

    root = logging.getLogger()
    if root.handlers:
        return  # already configured

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(
        logging.Formatter("%(asctime)s %(levelname)-7s %(name)s | %(message)s",
                          datefmt="%Y-%m-%d %H:%M:%S")
    )
    root.addHandler(handler)
    root.setLevel(level)

# ── Anthropic client ──────────────────────────────────────────────────────────
# Two-tier model strategy to control cost:
#   CLAUDE_MODEL        — full-transcript summaries (the flagship product).
#                         Sonnet handles meeting transcripts essentially as well
#                         as Opus at a fraction of the cost.
#   CLAUDE_MODEL_AGENDA — agenda-only / BoardBook summaries. These are short,
#                         low-stakes, scheduled-language fallbacks; Haiku is
#                         plenty and ~5x cheaper than Sonnet.
# Both are env-overridable, e.g. CLAUDE_MODEL=claude-opus-4-8 for a one-off run.
CLAUDE_MODEL              = os.environ.get("CLAUDE_MODEL", "claude-sonnet-4-6")
CLAUDE_MODEL_AGENDA       = os.environ.get("CLAUDE_MODEL_AGENDA", "claude-haiku-4-5-20251001")
ANTHROPIC_TIMEOUT_SECONDS = int(os.environ.get("ANTHROPIC_TIMEOUT_SECONDS", "180"))
ANTHROPIC_MAX_RETRIES     = int(os.environ.get("ANTHROPIC_MAX_RETRIES", "4"))

# Max characters of transcript to send to Claude in a single call.
MAX_TRANSCRIPT_CHARS = int(os.environ.get("MAX_TRANSCRIPT_CHARS", "90000"))


# ── Filesystem layout ─────────────────────────────────────────────────────────
SUMMARIES_DIR  = Path(os.environ.get("SUMMARIES_DIR",  "./summaries"))
STATE_FILE     = Path(os.environ.get("STATE_FILE",     "./processed_meetings.json"))
INJECTED_FILE  = Path(os.environ.get("INJECTED_FILE",  "./injected_meetings.json"))

# Where the React component reads its data from.
MEETINGS_JSON  = Path(os.environ.get("MEETINGS_JSON",  "./src/data/meetings.json"))
UPCOMING_JSON  = Path(os.environ.get("UPCOMING_JSON",  "./src/data/upcoming.json"))


# ── Pipeline behavior ─────────────────────────────────────────────────────────
# Only process meetings on or after this date (YYYYMMDD). Older meetings are
# silently excluded — useful for capping how far back the historical backfill
# reaches.
GLOBAL_DATE_CUTOFF = os.environ.get("MEETING_CUTOFF_DATE", "20260428")

# How many meetings to keep in the display list. Oldest beyond this are pruned
# by inject_meetings.py.
MAX_MEETINGS = int(os.environ.get("MAX_MEETINGS", "30"))

# Video IDs the summarizer should refuse to (re)process — typically duplicate
# parts of a meeting that have been merged into a single canonical entry.
SKIP_VIDEO_IDS = frozenset(
    s.strip() for s in os.environ.get(
        "SKIP_VIDEO_IDS",
        # Education Meeting Pt.2/3 merged into hNOP07iJjNY
        # Executive Committee Pt.2 merged into 47UbKS2Jqo4
        # bb_748411/bb_748413: East+West graduation ceremony quorum notices
        # (no Board action) — removed from display 2026-06-10
        "eIjwnwe6aBE,4IiT1PAaCHA,PkJesaGLD0Q,bb_748411,bb_748413",
    ).split(",") if s.strip()
)


# ── YouTube / yt-dlp ──────────────────────────────────────────────────────────
COOKIES_FILE = os.environ.get("YT_COOKIES_FILE", "")


# ── Whisper fallback (audio → text, local-only) ───────────────────────────────
USE_WHISPER_FALLBACK = os.environ.get("USE_WHISPER_FALLBACK", "true").lower() == "true"
WHISPER_MODEL        = os.environ.get("WHISPER_MODEL", "tiny")
WHISPER_SOURCES      = [
    s.strip() for s in os.environ.get("WHISPER_SOURCES", "marathon,wausau,weston").split(",")
    if s.strip()
]

# Only run Whisper on videos uploaded within the last N days (0 = no limit).
_wd = int(os.environ.get("WHISPER_DAYS", "0"))
WHISPER_CUTOFF = (
    (datetime.now(timezone.utc) - timedelta(days=_wd)).strftime("%Y%m%d")
    if _wd > 0 else ""
)


# ── BoardBook districts (BoardBook agendas + own YouTube channel) ──────────────
BOARDBOOK_BASE = os.environ.get("BOARDBOOK_BASE", "https://meetings.boardbook.org")
BOARDBOOK_ORG  = int(os.environ.get("BOARDBOOK_ORG", "1360"))  # Wausau (legacy default)

# Each district publishes agendas to a BoardBook org and posts meeting
# recordings to its own YouTube channel. Meetings are created agenda-only from
# BoardBook (bb_<meeting_id> IDs — disambiguated by the stored `source`, since
# BoardBook meeting IDs are globally unique), then the video-upgrade pass
# re-summarizes from the recording's transcript. `channel` keys into CHANNELS.
BOARDBOOK_DISTRICTS = {
    "school_board": {
        "org":     int(os.environ.get("BOARDBOOK_ORG", "1360")),
        "label":   "Wausau School District Board of Education",
        "channel": "school_board",
    },
    "dc_everest": {
        "org":     int(os.environ.get("DC_EVEREST_ORG", "1315")),
        "label":   "D.C. Everest Area School District Board of Education",
        "channel": "dc_everest",
    },
}

# Re-check agenda-only BoardBook entries for a posted recording this many days.
SCHOOL_BOARD_VIDEO_DAYS = int(os.environ.get("SCHOOL_BOARD_VIDEO_DAYS", "45"))


# ── Municode Meetings (Village of Kronenwetter) ───────────────────────────────
KRONENWETTER_BASE = os.environ.get(
    "KRONENWETTER_BASE", "https://kronenwetter-wi.municodemeetings.com")
# ADA HTML rendition of agendas — clean text without PDF parsing.
# ip=False → agenda, ip=True → full packet.
MUNICODE_ADA_URL = (
    "https://meetings.municode.com/adaHtmlDocument/index"
    "?cc=KRNWTRWI&me={guid}&ip=False")
# Re-check agenda-only Kronenwetter meetings for posted minutes this many days.
KRONENWETTER_MINUTES_DAYS = int(os.environ.get("KRONENWETTER_MINUTES_DAYS", "45"))


# ── Convenience ───────────────────────────────────────────────────────────────

def boardbook_org_url() -> str:
    return f"{BOARDBOOK_BASE}/Public/Organization/{BOARDBOOK_ORG}"


def boardbook_agenda_url(meeting_id: int | str) -> str:
    return f"{BOARDBOOK_BASE}/Public/Agenda/{BOARDBOOK_ORG}?meeting={meeting_id}"


def boardbook_packet_url(meeting_id: int | str) -> str:
    return f"{BOARDBOOK_BASE}/Public/DownloadAgenda/{BOARDBOOK_ORG}?meeting={meeting_id}"
