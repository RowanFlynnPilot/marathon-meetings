#!/usr/bin/env python3
"""
generate_roundup.py — Draft the weekly "local government" newsletter blurb.
============================================================================
One Sonnet call over the past week's meeting summaries (plus the coming
week's schedule) produces a paste-ready roundup for the newsletter:

  public/roundup.txt   — plain text
  public/roundup.html  — simple inline-styled HTML block

Runs on Monday CI cycles (and on demand via workflow_dispatch) so the
weekly cost is a handful of Sonnet calls per month. Marked clearly as a
DRAFT for editorial review — it summarizes AI-assisted summaries, so a
human read-through before sending is expected.

Usage:
    python generate_roundup.py [--days-back 7] [--dry-run]
"""

import argparse
import json
import re
from datetime import date, datetime, timedelta
from pathlib import Path

from config import MEETINGS_JSON, UPCOMING_JSON, CLAUDE_MODEL

TRACKER_URL = "https://wausaupilotandreview.com/central-wisconsin-meeting-tracker/"

SOURCE_LABELS = {
    "marathon":     "Marathon County",
    "wausau":       "City of Wausau",
    "weston":       "Village of Weston",
    "school_board": "Wausau School Board",
    "kronenwetter": "Village of Kronenwetter",
    "dc_everest":   "DC Everest School Board",
}


def collect(days_back: int):
    meetings = json.loads(Path(MEETINGS_JSON).read_text(encoding="utf-8"))
    upcoming = json.loads(Path(UPCOMING_JSON).read_text(encoding="utf-8"))
    today = date.today()
    start = today - timedelta(days=days_back)

    recent = []
    for m in meetings:
        try:
            d = datetime.strptime(m.get("date", ""), "%B %d, %Y").date()
        except ValueError:
            continue
        if start <= d <= today:
            recent.append((d, m))
    recent.sort(key=lambda x: x[0], reverse=True)

    week_ahead = []
    end = today + timedelta(days=7)
    for src, evs in upcoming.items():
        for e in evs:
            try:
                d = datetime.strptime(e.get("date", ""), "%Y-%m-%d").date()
            except ValueError:
                continue
            if today <= d <= end and "CANCEL" not in (e.get("name", "").upper()):
                week_ahead.append((d, src, e))
    week_ahead.sort(key=lambda x: x[0])
    return recent, week_ahead


def build_prompt(recent, week_ahead):
    blocks = []
    for d, m in recent:
        actions = "; ".join((m.get("actionItems") or [])[:4])
        kind = ("agenda only — outcomes not yet known" if m.get("isAgendaOnly")
                else "outcome-based summary")
        blocks.append(
            f"[{SOURCE_LABELS.get(m['source'], m['source'])}] {m['title']} — {m['date']} ({kind})\n"
            f"Overview: {(m.get('overview') or '')[:600]}\n"
            f"Actions: {actions[:400]}\n")

    ahead = "\n".join(
        f"- {d.strftime('%A %b %d')}: {SOURCE_LABELS.get(src, src)} — {e.get('name','')}"
        f"{(' at ' + e['time']) if e.get('time') else ''}"
        for d, src, e in week_ahead[:14])

    return f"""You are drafting the weekly local-government roundup for the Wausau Pilot & Review newsletter. Audience: central Wisconsin residents. Voice: tight, factual, neighborly — no hype, no editorializing.

Below are this week's meeting summaries from the newsroom's meeting tracker, then the coming week's schedule.

--- THIS WEEK'S MEETINGS ---
{chr(10).join(blocks) if blocks else "(no meetings in the window)"}
--- COMING UP ---
{ahead if ahead else "(nothing posted yet)"}
--- END ---

Write the roundup as JSON with this exact structure and nothing else:

{{
  "headline": "short newsletter section headline, e.g. 'This week in local government'",
  "lede": "1-2 sentence overview of the week's most consequential local-government news",
  "items": [
    {{"body": "one tight sentence (max ~30 words) on a notable decision or development, naming the jurisdiction"}}
  ],
  "coming_up": "1-2 sentences flagging the most notable meetings in the week ahead, with days"
}}

Rules:
- items: 3-6 bullets, most consequential first. Real outcomes over scheduled items; only cite agenda-only meetings with 'is set to' language.
- Never invent facts not in the summaries. Include vote results when given.
- Return ONLY the JSON."""


def render_outputs(data: dict):
    stamp = date.today().strftime("%B %d, %Y").replace(" 0", " ")
    items = data.get("items", [])

    txt = [f"{data.get('headline', 'This week in local government').upper()}",
           f"(DRAFT — auto-generated {stamp}; review before publishing)", "",
           data.get("lede", ""), ""]
    for it in items:
        txt.append(f"• {it.get('body', '')}")
    txt += ["", f"Coming up: {data.get('coming_up', '')}", "",
            f"Full summaries: {TRACKER_URL}"]
    Path("public/roundup.txt").write_text("\n".join(txt), encoding="utf-8")

    lis = "\n".join(
        f'    <li style="margin:0 0 8px;">{it.get("body","")}</li>' for it in items)
    html = f"""<!-- DRAFT — auto-generated {stamp}; review before publishing -->
<div style="max-width:600px;font-family:Georgia,'Times New Roman',serif;color:#1a1209;line-height:1.55;">
  <h2 style="font-family:Arial,Helvetica,sans-serif;font-size:15px;letter-spacing:0.12em;color:#3e847a;margin:0 0 10px;">{data.get('headline','THIS WEEK IN LOCAL GOVERNMENT').upper()}</h2>
  <p style="margin:0 0 12px;">{data.get('lede','')}</p>
  <ul style="margin:0 0 14px;padding-left:20px;">
{lis}
  </ul>
  <p style="margin:0 0 12px;"><em>Coming up:</em> {data.get('coming_up','')}</p>
  <p style="margin:0;"><a href="{TRACKER_URL}" style="color:#3e847a;font-weight:bold;">Full summaries on the Meeting Tracker &rarr;</a></p>
</div>"""
    Path("public/roundup.html").write_text(html, encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description="Draft the weekly newsletter roundup.")
    ap.add_argument("--days-back", type=int, default=7)
    ap.add_argument("--dry-run", action="store_true",
                    help="Show what would be summarized; no API call")
    args = ap.parse_args()

    recent, week_ahead = collect(args.days_back)
    print(f"[roundup] {len(recent)} meeting(s) in past {args.days_back} days, "
          f"{len(week_ahead)} upcoming in next 7")
    if args.dry_run:
        for d, m in recent:
            print(f"   {d} {m['source']:<13} {m['title'][:45]}")
        return
    if not recent:
        print("[roundup] no recent meetings — skipping generation.")
        return

    from marathon_meeting_summarizer import call_anthropic_with_retry, anthropic
    client = anthropic.Anthropic()
    msg = call_anthropic_with_retry(
        client, model=CLAUDE_MODEL, max_tokens=1500,
        messages=[{"role": "user", "content": build_prompt(recent, week_ahead)}],
    )
    raw = msg.content[0].text.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    data = json.loads(raw)
    render_outputs(data)
    print(f"[roundup] wrote public/roundup.txt and public/roundup.html "
          f"({len(data.get('items', []))} items)")


if __name__ == "__main__":
    main()
