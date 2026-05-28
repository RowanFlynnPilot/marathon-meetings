#!/usr/bin/env python3
"""
fetch_transcript.py — Fetch YouTube transcripts locally and queue for CI.
=========================================================================
Runs on YOUR machine (not blocked by YouTube like CI is) to grab transcripts
for meetings that fell back to agenda-only. Saves them to transcripts/ so
the next CI run automatically re-summarizes with the real transcript.

Usage:
  # Fetch transcript for one video:
  python fetch_transcript.py D7R7a0G0WTA

  # Fetch and auto-push to trigger CI:
  python fetch_transcript.py D7R7a0G0WTA --push

  # Fetch transcripts for ALL agenda-only meetings at once:
  python fetch_transcript.py --all

  # Fetch all and push:
  python fetch_transcript.py --all --push

Requirements: pip install yt-dlp youtube-transcript-api
"""

import argparse, json, os, re, subprocess, sys, tempfile
from pathlib import Path


TRANSCRIPTS_DIR = Path("./transcripts")


def fetch_transcript_ytapi(video_id: str) -> str | None:
    """Method 1: youtube-transcript-api (fastest)."""
    from transcript_utils import fetch_via_youtube_transcript_api
    try:
        return fetch_via_youtube_transcript_api(video_id)
    except Exception as e:
        print(f"  youtube-transcript-api: {str(e)[:100]}")
        return None


def _ytdlp_cmd():
    """Return the yt-dlp command as a list (handles both PATH and module installs)."""
    try:
        subprocess.run(["yt-dlp", "--version"], capture_output=True, timeout=5)
        return ["yt-dlp"]
    except FileNotFoundError:
        pass
    try:
        subprocess.run([sys.executable, "-m", "yt_dlp", "--version"],
                       capture_output=True, timeout=5)
        return [sys.executable, "-m", "yt_dlp"]
    except Exception:
        pass
    return None


def fetch_transcript_ytdlp(video_id: str) -> str | None:
    """Method 2: yt-dlp caption download (requires yt-dlp installed)."""
    ytdlp = _ytdlp_cmd()
    if not ytdlp:
        print(f"  yt-dlp: not installed (pip install yt-dlp)")
        return None

    url = f"https://www.youtube.com/watch?v={video_id}"
    with tempfile.TemporaryDirectory() as tmpdir:
        out = os.path.join(tmpdir, "meeting")
        cmd = [
            *ytdlp,
            "--no-check-certificate",
            "--write-sub",
            "--write-auto-sub",
            "--skip-download",
            "--sub-format", "vtt",
            "--sub-lang", "en,en-US,en-orig",
            "-o", out,
            url,
        ]
        try:
            r = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
        except subprocess.TimeoutExpired:
            print(f"  yt-dlp: timed out (180s) — video may be very long, try again later")
            return None

        no_caption_signals = [
            "only images are available", "no subtitles found",
            "subtitles are disabled", "no captions", "there are no captions",
        ]
        combined = (r.stdout + r.stderr).lower()
        if any(sig in combined for sig in no_caption_signals):
            print(f"  yt-dlp: no captions available")
            return None

        if r.returncode == 0:
            vtt_files = [f for f in os.listdir(tmpdir) if f.endswith(".vtt")]
            if vtt_files:
                with open(os.path.join(tmpdir, vtt_files[0]), encoding="utf-8") as f:
                    text = _parse_vtt(f.read())
                    if len(text) > 200:
                        return text
        else:
            print(f"  yt-dlp failed: {r.stderr.strip()[-100:]}")
    return None


from transcript_utils import parse_vtt as _parse_vtt


def fetch_transcript(video_id: str) -> str | None:
    """Try all methods to get a transcript."""
    print(f"  Trying youtube-transcript-api...")
    text = fetch_transcript_ytapi(video_id)
    if text:
        return text

    print(f"  Trying yt-dlp...")
    text = fetch_transcript_ytdlp(video_id)
    if text:
        return text

    return None


def find_agenda_only_meetings() -> list[dict]:
    """Find meetings in the JSX that are agenda-only and have YouTube URLs."""
    jsx_path = Path("./marathon-meetings.jsx")
    if not jsx_path.exists():
        print("Error: marathon-meetings.jsx not found")
        return []

    jsx = jsx_path.read_text(encoding="utf-8")

    # Find meetings block
    m = re.search(r'const MEETINGS = \[\n(.*?)\n\];', jsx, re.DOTALL)
    if not m:
        return []

    entries = re.split(r'(?=  \{\n    id:)', m.group(1))
    results = []
    for entry in entries:
        if not entry.strip():
            continue
        if "isAgendaOnly: true" not in entry:
            continue
        # Only YouTube videos (not BoardBook)
        url_m = re.search(r'url:\s*"(https://www\.youtube\.com[^"]+)"', entry)
        if not url_m:
            continue
        id_m = re.search(r'id:\s*"([^"]+)"', entry)
        title_m = re.search(r'title:\s*"([^"]+)"', entry)
        if id_m:
            results.append({
                "id": id_m.group(1),
                "title": title_m.group(1) if title_m else id_m.group(1),
                "url": url_m.group(1),
            })
    return results


def main():
    parser = argparse.ArgumentParser(
        description="Fetch YouTube transcripts locally for agenda-only meetings."
    )
    parser.add_argument("video_ids", nargs="*",
                        help="YouTube video IDs to fetch transcripts for")
    parser.add_argument("--all", action="store_true",
                        help="Fetch transcripts for ALL agenda-only meetings with YouTube URLs")
    parser.add_argument("--push", action="store_true",
                        help="Git commit and push after fetching, then trigger CI workflow")
    args = parser.parse_args()

    TRANSCRIPTS_DIR.mkdir(exist_ok=True)

    if args.all:
        meetings = find_agenda_only_meetings()
        if not meetings:
            print("No agenda-only YouTube meetings found.")
            return
        print(f"Found {len(meetings)} agenda-only meeting(s) with YouTube URLs:\n")
        for m in meetings:
            print(f"  [{m['id']}] {m['title']}")
        video_ids = [m["id"] for m in meetings]
    elif args.video_ids:
        video_ids = args.video_ids
    else:
        parser.print_help()
        return

    # Skip videos that already have transcripts
    to_fetch = []
    for vid in video_ids:
        tpath = TRANSCRIPTS_DIR / f"{vid}.txt"
        if tpath.exists():
            print(f"\n[skip] {vid} — transcript already exists ({tpath})")
        else:
            to_fetch.append(vid)

    if not to_fetch:
        print("\nAll transcripts already fetched. Nothing to do.")
        return

    # Fetch transcripts
    fetched = []
    failed = []
    for vid in to_fetch:
        print(f"\n{'='*50}")
        print(f"Fetching: {vid}")
        print(f"  https://www.youtube.com/watch?v={vid}")

        text = fetch_transcript(vid)
        if text:
            tpath = TRANSCRIPTS_DIR / f"{vid}.txt"
            tpath.write_text(text, encoding="utf-8")
            print(f"  [OK] Saved: {tpath} ({len(text):,} chars)")
            fetched.append(vid)
        else:
            print(f"  [FAIL] No transcript available")
            failed.append(vid)

    # Summary
    print(f"\n{'='*50}")
    print(f"Results: {len(fetched)} fetched, {len(failed)} failed")
    if fetched:
        print(f"  Saved to: {TRANSCRIPTS_DIR}/")
        for vid in fetched:
            print(f"    {vid}.txt")
    if failed:
        print(f"  Failed (no captions):")
        for vid in failed:
            print(f"    {vid}")

    # Git push if requested
    if args.push and fetched:
        print(f"\nPushing to GitHub...")
        files = [str(TRANSCRIPTS_DIR / f"{vid}.txt") for vid in fetched]
        subprocess.run(["git", "add"] + files, check=True)
        msg = f"chore: add {len(fetched)} transcript(s) for re-summarization"
        subprocess.run(["git", "commit", "-m", msg], check=True)

        # Push, with auto-retry on rejection (pull-rebase if remote moved)
        push_result = subprocess.run(
            ["git", "push"], capture_output=True, text=True
        )
        if push_result.returncode != 0:
            stderr_text = push_result.stderr or ""
            if "rejected" in stderr_text or "fetch first" in stderr_text:
                print("  Remote has new commits — pulling and rebasing...")
                rebase_result = subprocess.run(
                    ["git", "pull", "--rebase"], capture_output=True, text=True
                )
                if rebase_result.returncode != 0:
                    print(f"  Rebase failed:\n{rebase_result.stderr}")
                    print(f"  Resolve conflicts manually and run 'git push'.")
                    return
                print("  Rebase complete. Retrying push...")
                push_result = subprocess.run(
                    ["git", "push"], capture_output=True, text=True
                )
            if push_result.returncode != 0:
                print(f"  Push failed:\n{push_result.stderr}")
                return
        print(f"[OK] Pushed. The next CI run will auto-summarize from these transcripts.")

        # Optionally trigger workflow
        try:
            subprocess.run(
                ["gh", "workflow", "run", "update-meetings.yml"],
                check=True, capture_output=True
            )
            print("[OK] Triggered CI workflow.")
        except Exception:
            print("   (Install 'gh' CLI to auto-trigger the workflow)")


if __name__ == "__main__":
    main()
