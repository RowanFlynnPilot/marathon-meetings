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
    """Find meetings in src/data/meetings.json that are agenda-only and have
    YouTube URLs. (BoardBook bb_ entries are handled separately by
    find_school_board_video_matches, since their recordings live on the
    district channel under a different video ID.)
    """
    import json as _json
    data_path = Path("./src/data/meetings.json")
    if not data_path.exists():
        print(f"Error: {data_path} not found")
        return []
    try:
        meetings = _json.loads(data_path.read_text(encoding="utf-8"))
    except _json.JSONDecodeError as e:
        print(f"Error: {data_path} is not valid JSON: {e}")
        return []

    results = []
    for m in meetings:
        if not isinstance(m, dict):
            continue
        if not m.get("isAgendaOnly"):
            continue
        url = m.get("url") or ""
        if "youtube.com" not in url and "youtu.be" not in url:
            continue
        results.append({
            "id":    m.get("id", ""),
            "title": m.get("title") or m.get("id", ""),
            "url":   url,
        })
    return results


def find_school_board_video_matches() -> list[dict]:
    """Match agenda-only school board (bb_) entries to recordings on the
    district's YouTube channel. CI can LIST the channel but YouTube blocks
    caption downloads from cloud IPs, so the actual fetch has to happen here
    on a residential IP. Returns [{'id': 'bb_x', 'fetch_id': ytid, 'title'}]
    where `id` names the transcript file (so CI's inject step targets the
    BoardBook meeting) and `fetch_id` is the YouTube video to pull from.
    """
    import json as _json
    from datetime import datetime as _dt
    data_path = Path("./src/data/meetings.json")
    if not data_path.exists():
        return []
    try:
        meetings = _json.loads(data_path.read_text(encoding="utf-8"))
    except _json.JSONDecodeError:
        return []

    bb = [m for m in meetings if isinstance(m, dict)
          and m.get("isAgendaOnly")
          and str(m.get("id", "")).startswith("bb_")
          and m.get("source") == "school_board"]
    if not bb:
        return []

    try:
        from marathon_meeting_summarizer import (
            fetch_channel_videos, _match_school_board_video,
        )
        videos = fetch_channel_videos("school_board")
    except Exception as e:
        print(f"  school board channel fetch failed: {str(e)[:120]}")
        return []

    state = {}
    sp = Path("./processed_meetings.json")
    if sp.exists():
        try:
            state = _json.loads(sp.read_text(encoding="utf-8")).get("processed", {})
        except _json.JSONDecodeError:
            pass

    out = []
    for m in bb:
        info = state.get(m["id"]) or {}
        if not info:
            # Not in local state (e.g. fresh checkout) — synthesize enough of
            # an info dict for the matcher from the displayed date.
            try:
                d = _dt.strptime(m.get("date", ""), "%B %d, %Y")
                info = {"title": f"{m.get('title', '')} - {d.strftime('%Y-%m-%d')}"}
            except ValueError:
                continue
        v = _match_school_board_video(info, videos)
        if v:
            out.append({"id": m["id"], "fetch_id": v["id"],
                        "title": m.get("title") or m["id"]})
    return out


def main():
    # Reconfigures stdout/stderr to UTF-8 — Task Scheduler consoles default to
    # cp1252, which crashes on the summarizer module's emoji output otherwise.
    from config import setup_logging
    setup_logging()
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

    # Each job: save (transcript filename / meeting ID) + fetch (YouTube video
    # ID). They differ for school board meetings, whose BoardBook bb_ IDs are
    # matched to recordings on the district channel.
    if args.all:
        meetings = find_agenda_only_meetings()
        jobs = [{"save": m["id"], "fetch": m["id"], "title": m["title"]}
                for m in meetings]
        sb = find_school_board_video_matches()
        jobs += [{"save": m["id"], "fetch": m["fetch_id"], "title": m["title"]}
                 for m in sb]
        if not jobs:
            print("No agenda-only meetings with available recordings found.")
            return
        print(f"Found {len(jobs)} agenda-only meeting(s) with recordings:\n")
        for j in jobs:
            via = f" (video {j['fetch']})" if j["fetch"] != j["save"] else ""
            print(f"  [{j['save']}] {j['title']}{via}")
    elif args.video_ids:
        jobs = [{"save": v, "fetch": v, "title": v} for v in args.video_ids]
    else:
        parser.print_help()
        return

    # Skip meetings that already have transcripts
    to_fetch = []
    for j in jobs:
        tpath = TRANSCRIPTS_DIR / f"{j['save']}.txt"
        if tpath.exists():
            print(f"\n[skip] {j['save']} — transcript already exists ({tpath})")
        else:
            to_fetch.append(j)

    if not to_fetch:
        print("\nAll transcripts already fetched. Nothing to do.")
        return

    # Fetch transcripts
    fetched = []
    failed = []
    for j in to_fetch:
        print(f"\n{'='*50}")
        print(f"Fetching: {j['save']}")
        print(f"  https://www.youtube.com/watch?v={j['fetch']}")

        text = fetch_transcript(j["fetch"])
        if text:
            tpath = TRANSCRIPTS_DIR / f"{j['save']}.txt"
            tpath.write_text(text, encoding="utf-8")
            print(f"  [OK] Saved: {tpath} ({len(text):,} chars)")
            fetched.append(j["save"])
        else:
            print(f"  [FAIL] No transcript available")
            failed.append(j["save"])

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
