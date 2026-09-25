#!/usr/bin/env python3
"""
check_overdue.py — Find displayed meetings still agenda-only past their
source's normal recording lag.

Agenda-only is the normal first state for most meetings: the recording, audio,
or minutes that upgrade a summary arrive hours to weeks later. What matters is
an upgrade that is *late*. Kronenwetter's SoundCloud audio usually posts within
a day, so a Kronenwetter meeting still agenda-only after 5 days means the
matcher or the residential fetcher is broken (Sept 2026: a SoundCloud title
format change stranded seven meetings for four weeks, unnoticed, because the
old standing issue listed every agenda-only meeting and so signaled nothing).

The workflow turns a nonzero count into a single self-closing GitHub issue.

Usage:
  python check_overdue.py                           # summary to stderr
  python check_overdue.py --print-count             # just the count on stdout
  python check_overdue.py --markdown overdue.md     # issue body (when overdue)
  python check_overdue.py --today 2026-09-25 --source kronenwetter
"""

import argparse
import json
import re
import sys
from datetime import date, datetime
from pathlib import Path

# Days a meeting may reasonably stay agenda-only before its upgrade is late.
EXPECTED_LAG_DAYS = {
    "kronenwetter": 5,    # SoundCloud audio → local Whisper (minutes arrive later still)
    "dc_everest":   7,    # district posts recordings promptly
    "school_board": 21,   # Wausau district posts days-to-weeks later
    "marathon":     3,    # YouTube → residential caption sweep
    "wausau":       3,
    "weston":       3,
}
DEFAULT_LAG_DAYS = 7

WHERE_TO_LOOK = {
    "kronenwetter": "SoundCloud match → `find_kronenwetter_audio_matches` in fetch_transcript.py",
    "dc_everest":   "district YouTube match → `find_school_board_video_matches`",
    "school_board": "district YouTube match → `find_school_board_video_matches`",
}
DEFAULT_WHERE = "residential caption sweep (`fetch_transcript.py --all`)"

# Closed sessions are never recorded, so they can't be upgraded.
_CLOSED = re.compile(r"\bclosed\b", re.IGNORECASE)


def find_overdue(meetings: list[dict], today: date, source: str | None = None) -> list[dict]:
    overdue = []
    for m in meetings:
        if not isinstance(m, dict) or not m.get("isAgendaOnly"):
            continue
        if source and m.get("source") != source:
            continue
        if _CLOSED.search(m.get("title", "")):
            continue
        try:
            held = datetime.strptime(m.get("date", ""), "%B %d, %Y").date()
        except ValueError:
            continue
        waited = (today - held).days
        lag = EXPECTED_LAG_DAYS.get(m.get("source", ""), DEFAULT_LAG_DAYS)
        if waited > lag:
            overdue.append({**m, "_waited": waited, "_lag": lag})
    return sorted(overdue, key=lambda m: -m["_waited"])


def render_markdown(overdue: list[dict], today: date) -> str:
    lines = [
        f"These meetings are still summarized from the **agenda only**, past the point "
        f"where a recording, audio, or minutes normally arrive (checked {today.isoformat()}). "
        f"Readers see what was scheduled, not what happened.",
        "",
        "| Meeting | Source | Held | Waiting | Normally within | Where to look |",
        "|---|---|---|---|---|---|",
    ]
    for m in overdue:
        src = m.get("source", "")
        lines.append(
            f"| {m.get('title', m.get('id'))} | {src} | {m.get('date')} | "
            f"{m['_waited']} days | {m['_lag']} days | {WHERE_TO_LOOK.get(src, DEFAULT_WHERE)} |"
        )
    lines += [
        "",
        "Several overdue meetings from one source usually means a matcher broke (an "
        "upstream title or format change). A single one usually means the recording "
        "doesn't exist; it drops off this list when the meeting scrolls off the tracker. "
        "This issue closes itself when nothing is overdue.",
    ]
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--data", default="src/data/meetings.json")
    parser.add_argument("--today", help="evaluate as of YYYY-MM-DD (default: today)")
    parser.add_argument("--source", help="only check one source key")
    parser.add_argument("--markdown", help="write an issue body here when anything is overdue")
    parser.add_argument("--print-count", action="store_true",
                        help="print only the overdue count on stdout")
    args = parser.parse_args()

    today = date.fromisoformat(args.today) if args.today else date.today()
    meetings = json.loads(Path(args.data).read_text(encoding="utf-8"))
    overdue = find_overdue(meetings, today, args.source)

    for m in overdue:
        print(f"  overdue: {m['_waited']:3d}d (lag {m['_lag']}d)  {m.get('source', ''):12s} "
              f"{m.get('title', '')[:60]}", file=sys.stderr)
    print(f"{len(overdue)} overdue agenda-only meeting(s)", file=sys.stderr)

    if args.markdown and overdue:
        Path(args.markdown).write_text(render_markdown(overdue, today), encoding="utf-8")
    if args.print_count:
        print(len(overdue))
    return 0


if __name__ == "__main__":
    sys.exit(main())
