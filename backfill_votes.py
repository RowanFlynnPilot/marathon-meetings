#!/usr/bin/env python3
"""
backfill_votes.py — Extract structured votes for meetings that predate the field.
==================================================================================
New transcript/minutes summaries emit a structured votes[] array. Older
outcome-based meetings have vote information only in prose (discussions /
action items); this script extracts it with batched Haiku calls and patches
both the summary sidecars and src/data/meetings.json.

Skips: agenda-only meetings (no outcomes), CivicClerk meetings (already have
richer civicItems), and anything already carrying votes — so steady-state
cost is zero API calls. Capped per run via MAX_BACKFILL.

Usage:
    python backfill_votes.py [--dry-run]
"""

import argparse
import json
import os
import re
from pathlib import Path

from config import MEETINGS_JSON, STATE_FILE, CLAUDE_MODEL_AGENDA

BATCH_SIZE   = 6           # vote extraction needs more context per meeting
MAX_BACKFILL = int(os.environ.get("MAX_BACKFILL", "60"))


def _summary_sidecar(state: dict, meeting_id: str) -> Path | None:
    info = state.get("processed", {}).get(meeting_id) or {}
    sf = info.get("summary_file", "")
    if not sf:
        return None
    p = Path(sf.replace(".md", "_summary.json"))
    return p if p.exists() else None


def extract_batch(client, batch: list[dict]) -> dict:
    """One Haiku call extracting votes from a batch. Returns {id: [votes]}."""
    from marathon_meeting_summarizer import call_anthropic_with_retry

    blocks = []
    for m in batch:
        disc = "\n".join(
            f"  - {d.get('item','')}: {d.get('body','')}"
            for d in (m.get("discussions") or [])[:8])
        acts = "; ".join((m.get("actionItems") or [])[:6])
        blocks.append(
            f"ID: {m['id']}\n"
            f"Meeting: {m.get('committee','')} — {m.get('title','')} ({m.get('date','')})\n"
            f"Overview: {(m.get('overview') or '')[:400]}\n"
            f"Discussions:\n{disc[:1800]}\n"
            f"Actions: {acts[:500]}\n")

    prompt = f"""You are extracting formal votes from local-government meeting summaries.

For EACH meeting below, list every formal vote the text describes. Structure:
{{"item": "what was voted on, concisely", "motion": "motion text if stated, else null", "mover": "name or null", "second": "name or null", "outcome": "Approved | Failed | Tabled", "tally": "e.g. 6-0, Unanimous, or null"}}

STRICT RULES:
- ONLY votes the text explicitly describes as taken (approved, passed, carried, failed, denied, tabled). Not scheduled items, not discussion without a vote.
- NEVER invent movers, seconders, or tallies — null when not stated.
- A meeting with no described votes gets an empty array.

--- MEETINGS ---
{chr(10).join(blocks)}
--- END ---

Return ONLY a JSON object mapping each ID to its votes array, e.g.:
{{"abc123": [{{"item": "...", "motion": null, "mover": null, "second": null, "outcome": "Approved", "tally": "6-0"}}], "bb_99": []}}"""

    msg = call_anthropic_with_retry(
        client, model=CLAUDE_MODEL_AGENDA, max_tokens=4096,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = msg.content[0].text.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    try:
        out = json.loads(raw)
        return {k: v for k, v in out.items() if isinstance(v, list)}
    except json.JSONDecodeError:
        print(f"  [warn] batch returned non-JSON; skipping {len(batch)} meeting(s)")
        return {}


def main():
    ap = argparse.ArgumentParser(description="Backfill structured votes on existing meetings.")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    meetings = json.loads(Path(MEETINGS_JSON).read_text(encoding="utf-8"))
    state = (json.loads(Path(STATE_FILE).read_text(encoding="utf-8"))
             if Path(STATE_FILE).exists() else {"processed": {}})

    # Eligible: outcome-based, not CivicClerk-structured, and lacking a
    # "votes" key entirely. New entries from build_meeting always carry the
    # key (possibly []), and this script writes one back even when empty —
    # so presence of the key means "already processed" and reruns are free.
    todo = [m for m in meetings
            if not m.get("isAgendaOnly") and not m.get("civicItems")
            and "votes" not in m]

    if not todo:
        print("[votes] all eligible meetings already processed — nothing to do.")
        return
    if len(todo) > MAX_BACKFILL:
        print(f"[votes] capping run at {MAX_BACKFILL} of {len(todo)}")
        todo = todo[:MAX_BACKFILL]

    print(f"[votes] {len(todo)} outcome-based meeting(s) need vote extraction")
    if args.dry_run:
        for m in todo:
            print(f"   {m['id']}  {m['date']:>15}  {m['source']:<13} {m['title'][:40]}")
        return

    from marathon_meeting_summarizer import anthropic as _anthropic
    client = _anthropic.Anthropic()

    extracted = {}
    for i in range(0, len(todo), BATCH_SIZE):
        batch = todo[i:i + BATCH_SIZE]
        print(f"  [claude] extracting batch {i // BATCH_SIZE + 1} ({len(batch)} meetings)...")
        extracted.update(extract_batch(client, batch))

    if not extracted:
        print("[votes] nothing extracted — leaving files untouched.")
        return

    patched = votes_found = 0
    for m in meetings:
        if m["id"] in extracted:
            m["votes"] = extracted[m["id"]]   # empty list marks "checked, none found"
            patched += 1
            votes_found += len(extracted[m["id"]])
    Path(MEETINGS_JSON).write_text(
        json.dumps(meetings, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    sidecars = 0
    for mid, votes in extracted.items():
        sp = _summary_sidecar(state, mid)
        if not sp:
            continue
        try:
            s = json.loads(sp.read_text(encoding="utf-8"))
            if not s.get("votes"):
                s["votes"] = votes
                sp.write_text(json.dumps(s, indent=2, ensure_ascii=False), encoding="utf-8")
                sidecars += 1
        except (json.JSONDecodeError, OSError):
            pass

    print(f"[votes] processed {patched} meeting(s), {votes_found} vote(s) extracted, "
          f"{sidecars} sidecar(s) updated.")


if __name__ == "__main__":
    main()
