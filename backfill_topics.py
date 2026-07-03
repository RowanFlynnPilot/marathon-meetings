#!/usr/bin/env python3
"""
backfill_topics.py — Generate topic tags for meetings that predate the field.
==============================================================================
New summaries get 3-5 "topics" tags from the summarization prompts. Meetings
summarized before that field existed lack tags; this script fills them in with
cheap batched Haiku calls (several meetings per call), then patches BOTH the
summary sidecars (so future rebuilds keep them) and src/data/meetings.json
(the displayed entries, which carry over without rebuilding).

Safe by design:
  - Skips every meeting that already has topics → zero API calls at steady state.
  - Caps how many meetings one run will tag (MAX_BACKFILL, default 60).
  - continue-on-error in CI: a failure never blocks the deploy.

Usage:
    python backfill_topics.py [--dry-run]
"""

import argparse
import json
import os
import re
from pathlib import Path

from config import MEETINGS_JSON, STATE_FILE, CLAUDE_MODEL_AGENDA

BATCH_SIZE   = 12
MAX_BACKFILL = int(os.environ.get("MAX_BACKFILL", "60"))


def _summary_sidecar(state: dict, meeting_id: str) -> Path | None:
    info = state.get("processed", {}).get(meeting_id) or {}
    sf = info.get("summary_file", "")
    if not sf:
        return None
    p = Path(sf.replace(".md", "_summary.json"))
    return p if p.exists() else None


def tag_batch(client, batch: list[dict]) -> dict:
    """One Haiku call tagging a batch of meetings. Returns {id: [topics]}."""
    from marathon_meeting_summarizer import call_anthropic_with_retry

    lines = []
    for m in batch:
        discussions = "; ".join(
            d.get("item", "") for d in (m.get("discussions") or [])[:6])
        lines.append(
            f"ID: {m['id']}\n"
            f"Body: {m.get('source','')} — {m.get('committee','')} — {m.get('title','')}\n"
            f"Overview: {(m.get('overview') or '')[:500]}\n"
            f"Items: {discussions[:400]}\n")

    prompt = f"""You are tagging local-government meeting summaries for a news site's topic index.

For EACH meeting below, produce 3-5 short Title Case topic tags: recurring civic themes (Budget, Roads, Public Safety, Zoning, Staffing, Parks, Utilities, Development, Curriculum, Facilities) plus any specific named projects, places, or programs mentioned (e.g. Highway J Extension, Riverlife District). Prefer reusing the same tag wording across meetings for the same theme.

--- MEETINGS ---
{chr(10).join(lines)}
--- END ---

Return ONLY a JSON object mapping each ID to its tag list, e.g.:
{{"abc123": ["Budget", "Roads"], "bb_99": ["Curriculum", "Staffing"]}}"""

    msg = call_anthropic_with_retry(
        client, model=CLAUDE_MODEL_AGENDA, max_tokens=2048,
        messages=[{"role": "user", "content": prompt}],
    )
    raw = msg.content[0].text.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    try:
        out = json.loads(raw)
        return {k: v for k, v in out.items()
                if isinstance(v, list) and all(isinstance(t, str) for t in v)}
    except json.JSONDecodeError:
        print(f"  [warn] batch returned non-JSON; skipping {len(batch)} meeting(s)")
        return {}


def main():
    ap = argparse.ArgumentParser(description="Backfill topic tags on existing meetings.")
    ap.add_argument("--dry-run", action="store_true", help="List candidates, no API calls")
    args = ap.parse_args()

    meetings = json.loads(Path(MEETINGS_JSON).read_text(encoding="utf-8"))
    state = (json.loads(Path(STATE_FILE).read_text(encoding="utf-8"))
             if Path(STATE_FILE).exists() else {"processed": {}})

    todo = [m for m in meetings if not m.get("topics")]
    if not todo:
        print("[topics] all displayed meetings already tagged — nothing to do.")
        return
    if len(todo) > MAX_BACKFILL:
        print(f"[topics] capping run at {MAX_BACKFILL} of {len(todo)} untagged meeting(s)")
        todo = todo[:MAX_BACKFILL]

    print(f"[topics] {len(todo)} meeting(s) need tags")
    if args.dry_run:
        for m in todo:
            print(f"   {m['id']}  {m['date']:>15}  {m['source']:<13} {m['title'][:40]}")
        return

    import anthropic  # noqa: F401 — imported via summarizer's client below
    from marathon_meeting_summarizer import anthropic as _anthropic
    client = _anthropic.Anthropic()

    tagged = {}
    for i in range(0, len(todo), BATCH_SIZE):
        batch = todo[i:i + BATCH_SIZE]
        print(f"  [claude] tagging batch {i // BATCH_SIZE + 1} ({len(batch)} meetings)...")
        tagged.update(tag_batch(client, batch))

    if not tagged:
        print("[topics] no tags produced — leaving files untouched.")
        return

    # Patch displayed entries
    patched = 0
    for m in meetings:
        if m["id"] in tagged and not m.get("topics"):
            m["topics"] = tagged[m["id"]][:5]
            patched += 1
    Path(MEETINGS_JSON).write_text(
        json.dumps(meetings, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    # Patch summary sidecars so future rebuilds keep the tags
    sidecars = 0
    for mid, topics in tagged.items():
        sp = _summary_sidecar(state, mid)
        if not sp:
            continue
        try:
            s = json.loads(sp.read_text(encoding="utf-8"))
            if not s.get("topics"):
                s["topics"] = topics[:5]
                sp.write_text(json.dumps(s, indent=2, ensure_ascii=False), encoding="utf-8")
                sidecars += 1
        except (json.JSONDecodeError, OSError):
            pass

    print(f"[topics] tagged {patched} displayed meeting(s), {sidecars} sidecar(s) updated.")


if __name__ == "__main__":
    main()
