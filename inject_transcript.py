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

import argparse, json, logging, os, re, sys
from pathlib import Path
from datetime import datetime, timezone

logger = logging.getLogger(__name__)


def main():
    from config import setup_logging
    setup_logging()
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
    parser.add_argument("--data", type=str, default="./src/data/meetings.json",
                        help="Path to the meetings JSON (default: ./src/data/meetings.json)")
    # Back-compat shim — older callers pass --jsx but we no longer read JSX.
    parser.add_argument("--jsx", type=str, default=None,
                        help=argparse.SUPPRESS)
    args = parser.parse_args()

    # ── Check if already transcript-based (skip unless --force) ──────────────
    vid_id = args.video_id
    summaries_dir = Path(os.environ.get("SUMMARIES_DIR", "./summaries"))

    # Compute a hash of the transcript to detect content changes
    import hashlib
    transcript_hash = None
    if args.transcript and Path(args.transcript).exists():
        try:
            transcript_hash = hashlib.sha256(Path(args.transcript).read_bytes()).hexdigest()[:16]
        except Exception:
            pass

    existing_summaries = list(summaries_dir.glob(f"*{vid_id.lower()}*_summary.json")) if summaries_dir.exists() else []
    if existing_summaries and not args.force:
        for sp in existing_summaries:
            try:
                s = json.loads(sp.read_text(encoding="utf-8"))
                source = s.get("_source")
                stored_hash = s.get("_transcript_hash")
                if source not in ("agenda", "agenda_with_votes", None):
                    # Already has a transcript-based summary
                    if transcript_hash and stored_hash and transcript_hash == stored_hash:
                        print(f"[skip] {vid_id} already summarized (transcript unchanged, saves API call)")
                        return
                    elif transcript_hash and stored_hash and transcript_hash != stored_hash:
                        print(f"[update] {vid_id} transcript changed — re-summarizing")
                        break
                    else:
                        # Old summary without hash — keep it, don't re-process
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
            # Strip any accumulated date suffixes (e.g. "Title - 3/24/2026 - 3/24/2026")
            title = re.sub(r'(\s*-\s*\d{1,2}/\d{1,2}/\d{2,4})+$', '', title).strip()
            source_key = source_key or info.get("source")
            doc_url = info.get("doc_url")
            print(f"[ok]  Found in state: [{source_key}] {title}")
        else:
            print(f"[warn] Video {vid_id} not in processed_meetings.json")

    meeting_date_from_json = None
    if not source_key or title == vid_id:
        # Fall back to the rendered meetings.json (built from prior runs).
        data_path = Path(args.data)
        if data_path.exists():
            try:
                meetings_list = json.loads(data_path.read_text(encoding="utf-8"))
            except json.JSONDecodeError:
                meetings_list = []
            entry = next((m for m in meetings_list if isinstance(m, dict) and m.get("id") == vid_id), None)
            if entry:
                if not source_key and entry.get("source"):
                    source_key = entry["source"]
                    print(f"[ok]  Detected source from {data_path.name}: {source_key}")
                if title == vid_id and entry.get("title"):
                    title = re.sub(r'(\s*-\s*\d{1,2}/\d{1,2}/\d{2,4})+$', '', entry["title"]).strip()
                    print(f"[ok]  Detected title from {data_path.name}: {title}")
                if entry.get("date"):
                    meeting_date_from_json = entry["date"]
                    print(f"[ok]  Detected date from {data_path.name}: {meeting_date_from_json}")
                if not doc_url and entry.get("docUrl"):
                    doc_url = entry["docUrl"]
                    print(f"[ok]  Detected docUrl from {data_path.name}: {doc_url}")

    # ── Fetch authoritative title and upload_date from YouTube ──────────────
    # The summarizer normally captures upload_date during ingestion, but a
    # transcript override may be applied later (or to a video the summarizer
    # never saw), so refresh it here.
    upload_date = None
    if state_file.exists():
        try:
            _existing = json.loads(state_file.read_text(encoding="utf-8")).get("processed", {}).get(vid_id, {})
            upload_date = _existing.get("upload_date")
        except json.JSONDecodeError:
            pass

    if not vid_id.startswith("bb_"):
        print(f"[fetch] Querying YouTube for authoritative title and date...")
        try:
            import subprocess
            r = subprocess.run(
                [sys.executable, "-m", "yt_dlp", "--no-check-certificate",
                 "--dump-json", "--skip-download", url],
                capture_output=True, text=True, timeout=30,
            )
            if r.returncode == 0:
                meta = json.loads(r.stdout)
                yt_title = meta.get("title", "")
                yt_upload_date = meta.get("upload_date", "")
                if yt_upload_date and len(yt_upload_date) == 8 and yt_upload_date.isdigit():
                    upload_date = yt_upload_date

                if yt_title and title == vid_id:
                    cleaned = re.sub(r'\s*-\s*\d{1,2}/\d{1,2}/\d{2,4}$', '', yt_title).strip()
                    cleaned = re.sub(r'\s*-\s*\d{4}-\d{2}-\d{2}$', '', cleaned).strip()
                    cleaned = re.sub(r'\s+Pt\.\d+$', '', cleaned).strip()
                    title = cleaned
                    print(f"[ok]  Title from YouTube: {title}")
                if upload_date:
                    print(f"       upload_date: {upload_date}")

                if not source_key:
                    ch_lower = meta.get("channel", "").lower()
                    if "wausau" in ch_lower:
                        source_key = "wausau"
                    elif "marathon" in ch_lower:
                        source_key = "marathon"
                    elif "weston" in ch_lower:
                        source_key = "weston"
        except Exception as e:
            print(f"[warn] Could not fetch from YouTube: {e}")

    # Final fallback: derive upload_date from the meetings.json date if neither
    # state nor YouTube gave us one.
    if not upload_date and meeting_date_from_json:
        try:
            from datetime import datetime as _dt
            d = _dt.strptime(meeting_date_from_json, "%B %d, %Y")
            if d.date() != datetime.now().date():
                upload_date = d.strftime("%Y%m%d")
        except (ValueError, TypeError):
            pass

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
    # Tag the summary with the transcript hash so future runs can skip if unchanged
    if transcript_hash:
        summary["_transcript_hash"] = transcript_hash
    path = save_summary(title, url, source_key, summary, doc_url, civic_data)
    print(f"[save] Saved: {path}")

    # ── Update processed_meetings.json ───────────────────────────────────────
    # Date now lives in its own upload_date field; no more title-suffix hacks.
    if state_file.exists():
        state = json.loads(state_file.read_text(encoding="utf-8"))
    else:
        state = {"processed": {}}

    state["processed"][vid_id] = {
        "title":        title,
        "source":       source_key,
        "doc_url":      doc_url,
        "upload_date":  upload_date,
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
        [sys.executable, "inject_meetings.py", args.data],
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
