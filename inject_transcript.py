#!/usr/bin/env python3
"""
inject_transcript.py — Manually inject a transcript for an agenda-only meeting.
================================================================================
When a meeting has no YouTube captions and falls back to agenda-only
summarization, you can grab the transcript from the YouTube app (or a
live recording) and use this script to re-summarize it from the real
transcript and update the JSX.

Usage:
  # From a text file:
  python inject_transcript.py --video-id rQcjCEY36e4 --transcript transcript.txt

  # From clipboard / stdin:
  pbpaste | python inject_transcript.py --video-id rQcjCEY36e4 --stdin

  # Specify source explicitly (auto-detected from processed_meetings.json if available):
  python inject_transcript.py --video-id rQcjCEY36e4 --source wausau --transcript transcript.txt

  # Dry run (summarize but don't inject):
  python inject_transcript.py --video-id rQcjCEY36e4 --transcript transcript.txt --dry-run

After running, the meeting's summary is updated from the transcript and
re-injected into the JSX. Run `npm run build` to rebuild the site.
"""

import argparse, json, os, re, sys
from pathlib import Path
from datetime import datetime, timezone


def main():
    parser = argparse.ArgumentParser(
        description="Re-summarize an agenda-only meeting from a pasted transcript."
    )
    parser.add_argument("--video-id", required=True,
                        help="YouTube video ID or BoardBook ID (e.g., rQcjCEY36e4 or bb_719203)")
    parser.add_argument("--transcript", type=str, default=None,
                        help="Path to a text file containing the transcript")
    parser.add_argument("--stdin", action="store_true",
                        help="Read transcript from stdin instead of a file")
    parser.add_argument("--source", type=str, default=None,
                        choices=["marathon", "wausau", "weston", "school_board"],
                        help="Source jurisdiction (auto-detected if in processed_meetings.json)")
    parser.add_argument("--dry-run", action="store_true",
                        help="Summarize but don't update files")
    parser.add_argument("--force", action="store_true",
                        help="Re-summarize even if a transcript-based summary already exists")
    parser.add_argument("--jsx", type=str, default="./marathon-meetings.jsx",
                        help="Path to the JSX file (default: ./marathon-meetings.jsx)")
    args = parser.parse_args()

    # ── Check if already transcript-based (skip unless --force) ──────────────
    vid_id = args.video_id
    summaries_dir = Path(os.environ.get("SUMMARIES_DIR", "./summaries"))
    existing_summaries = list(summaries_dir.glob(f"*{vid_id.lower()}*_summary.json")) if summaries_dir.exists() else []
    if existing_summaries and not args.force:
        for sp in existing_summaries:
            try:
                s = json.loads(sp.read_text(encoding="utf-8"))
                if s.get("_source") not in ("agenda", "agenda_with_votes", None):
                    # Already has a transcript-based summary
                    print(f"[skip] {vid_id} already has a transcript-based summary ({sp.name})")
                    print(f"       Use --force to re-summarize.")
                    return
            except Exception:
                pass

    # ── Read transcript ──────────────────────────────────────────────────────
    if args.stdin:
        print("[read] Reading transcript from stdin...")
        transcript = sys.stdin.read()
    elif args.transcript:
        print(f"[read] Reading transcript from {args.transcript}...")
        transcript = Path(args.transcript).read_text(encoding="utf-8")
    else:
        print("Error: Provide --transcript FILE or --stdin")
        sys.exit(1)

    transcript = transcript.strip()
    if len(transcript) < 100:
        print(f"Error: Transcript too short ({len(transcript)} chars). Need at least 100.")
        sys.exit(1)

    print(f"[ok]  Transcript: {len(transcript):,} characters")

    # ── Look up meeting metadata ─────────────────────────────────────────────
    vid_id = args.video_id
    state_file = Path(os.environ.get("STATE_FILE", "./processed_meetings.json"))
    summaries_dir = Path(os.environ.get("SUMMARIES_DIR", "./summaries"))

    title = vid_id
    source_key = args.source
    doc_url = None
    url = f"https://www.youtube.com/watch?v={vid_id}"

    if state_file.exists():
        state = json.loads(state_file.read_text(encoding="utf-8"))
        info = state.get("processed", {}).get(vid_id)
        if info:
            title = info.get("title", title)
            source_key = source_key or info.get("source")
            doc_url = info.get("doc_url")
            print(f"[ok]  Found in state: [{source_key}] {title}")
        else:
            print(f"[warn] Video {vid_id} not in processed_meetings.json")

    if not source_key:
        # Try to detect from existing MEETINGS in JSX
        jsx_path = Path(args.jsx)
        if jsx_path.exists():
            jsx = jsx_path.read_text(encoding="utf-8")
            m = re.search(rf'id:\s*"{re.escape(vid_id)}"[^}}]*?source:\s*"([^"]+)"', jsx)
            if m:
                source_key = m.group(1)
                print(f"[ok]  Detected source from JSX: {source_key}")

    if not source_key:
        print("Error: Cannot detect source. Use --source marathon|wausau|weston|school_board")
        sys.exit(1)

    # ── Summarize with Claude ────────────────────────────────────────────────
    # Import the summarizer's function
    sys.path.insert(0, str(Path(__file__).parent))
    from marathon_meeting_summarizer import summarize_meeting, CHANNELS, save_summary
    from marathon_meeting_summarizer import fetch_civicclerk_data

    print(f"\n[claude] Summarizing from transcript ({len(transcript):,} chars)...")
    summary = summarize_meeting(transcript, title, url, source_key)

    if not summary:
        print("Error: Claude returned no summary.")
        sys.exit(1)

    print(f"[ok]  Summary generated:")
    print(f"       Overview: {summary.get('overview', '')[:120]}...")
    print(f"       Discussions: {len(summary.get('discussions', []))} items")
    print(f"       Action items: {len(summary.get('actionItems', []))}")

    # ── Fetch CivicClerk vote data for Wausau ────────────────────────────────
    civic_data = None
    if source_key == "wausau" and doc_url:
        print(f"[fetch] Getting CivicClerk vote data...")
        civic_data = fetch_civicclerk_data(doc_url)
        if civic_data:
            print(f"[ok]  Got {len(civic_data.get('items', []))} agenda items with votes")

    if args.dry_run:
        print("\n[DRY RUN] Would save summary and re-inject. Exiting.")
        print(json.dumps(summary, indent=2)[:2000])
        return

    # ── Save summary ─────────────────────────────────────────────────────────
    path = save_summary(title, url, source_key, summary, doc_url, civic_data)
    print(f"[save] Saved: {path}")

    # ── Update processed_meetings.json ───────────────────────────────────────
    if state_file.exists():
        state = json.loads(state_file.read_text(encoding="utf-8"))
    else:
        state = {"processed": {}}
    state["processed"][vid_id] = {
        "title": title,
        "source": source_key,
        "doc_url": doc_url,
        "processed_at": datetime.now(timezone.utc).isoformat(),
        "summary_file": str(path),
    }
    state_file.write_text(json.dumps(state, indent=2), encoding="utf-8")
    print(f"[save] Updated {state_file}")

    # ── Re-inject into JSX ───────────────────────────────────────────────────
    # Reset injected tracking so inject_meetings.py picks up the new summary
    injected_file = Path("./injected_meetings.json")
    if injected_file.exists():
        injected = json.loads(injected_file.read_text(encoding="utf-8"))
        ids = set(injected.get("injected", []))
        ids.discard(vid_id)  # Remove so it gets re-injected
        injected_file.write_text(json.dumps({"injected": sorted(ids)}, indent=2), encoding="utf-8")

    print(f"\n[inject] Running inject_meetings.py...")
    import subprocess
    result = subprocess.run(
        [sys.executable, "inject_meetings.py", args.jsx],
        capture_output=True, text=True
    )
    print(result.stdout)
    if result.stderr:
        print(result.stderr)

    if result.returncode == 0:
        print(f"\n✅  Done! Meeting {vid_id} re-summarized from transcript.")
        print(f"   Run 'npm run build' to rebuild the site.")
    else:
        print(f"\n❌  inject_meetings.py failed (exit {result.returncode})")
        sys.exit(1)


if __name__ == "__main__":
    main()
