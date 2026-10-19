"""Which meetings just became reel-ready, for wpr-reels' auto-drafter.

A meeting is reel-ready once its summary is built from the full transcript
(`_source: "transcript"`), which is exactly what wpr-reels' drafter requires.
The workflow snapshots the reel-ready set at the start of a run and compares
at the end; only meetings that flipped during the run are new. (The
injected_meetings.json ledger can't say this: inject_transcript.py clears a
video from it on every run so inject_meetings.py rebuilds it.)

Only full city council and county board meetings get reels. Committees don't,
though the tracker titles some "Wausau City Council ... Committee Meeting", and
neither do educational sessions. A meeting split into parts ("Pt.1", "Pt.2")
isn't auto-drafted either: each part alone would miss the other's votes, so a
person drafts it with /reel and picks the part that carries them.

  python reel_candidates.py --snapshot /tmp/reel_ready.json
  python reel_candidates.py --since /tmp/reel_ready.json   # prints new IDs, one per line
"""

import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
VIDEO_ID = re.compile(r"(?:[?&]v=|youtu\.be/)([A-Za-z0-9_-]{11})")
BODIES = re.compile(r"\bcity council\b|\bcounty board\b", re.I)
NOT_A_MEETING = re.compile(r"committee|commission|educational|workshop|training|orientation|listening session", re.I)
SPLIT = re.compile(r"\bpt\.?\s*\d|\bpart\s*\d", re.I)


def reel_ready(root: Path = ROOT) -> dict[str, str]:
    """{video_id: title} for every meeting with a transcript-built summary and its transcript file."""
    ready = {}
    for path in sorted((root / "summaries").glob("*_summary.json")):
        try:
            summary = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            continue
        m = VIDEO_ID.search(summary.get("url") or "")
        if summary.get("_source") == "transcript" and m and (root / "transcripts" / f"{m.group(1)}.txt").exists():
            ready[m.group(1)] = summary.get("title") or ""
    return ready


def wants_reel(title: str) -> bool:
    return bool(BODIES.search(title)) and not NOT_A_MEETING.search(title) and not SPLIT.search(title)


def new_candidates(before: set[str], now: dict[str, str]) -> list[str]:
    return sorted(vid for vid, title in now.items() if vid not in before and wants_reel(title))


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    group = ap.add_mutually_exclusive_group(required=True)
    group.add_argument("--snapshot", type=Path, help="write the current reel-ready IDs here")
    group.add_argument("--since", type=Path, help="print reel candidates that weren't in this snapshot")
    args = ap.parse_args()
    if args.snapshot:
        args.snapshot.write_text(json.dumps(sorted(reel_ready())), encoding="utf-8")
        return
    # No usable snapshot means no baseline: never treat the whole archive as new.
    try:
        before = json.loads(args.since.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return
    if not isinstance(before, list):
        return
    for vid in new_candidates(set(before), reel_ready()):
        print(vid)


if __name__ == "__main__":
    main()
