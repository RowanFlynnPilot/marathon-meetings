#!/usr/bin/env python3
"""
generate_pages.py — Static, indexable HTML pages for every meeting summary.
=============================================================================
The tracker is a JS app inside an iframe, which search engines can't index.
This emits a lightweight static page per meeting at

    public/meetings/<id>/index.html

plus public/sitemap.xml and public/robots.txt, so searches like
"kronenwetter village board june 8 2026" can land on tracker content.

Pages are WRITTEN for currently-displayed meetings and NEVER deleted — once
a card rotates off the 50-meeting dashboard its page remains, so the pages
directory becomes the permanent archive. The sitemap covers everything on
disk, not just the current window.

Pure stdlib; no API calls; deterministic output. Base URL is env-overridable
(PAGES_BASE_URL) for a future custom domain.

Usage:
    python generate_pages.py
"""

import html
import json
import os
import re
from datetime import datetime
from pathlib import Path

from config import MEETINGS_JSON

BASE_URL    = os.environ.get(
    "PAGES_BASE_URL", "https://rowanflynnpilot.github.io/marathon-meetings").rstrip("/")
TRACKER_URL = "https://wausaupilotandreview.com/central-wisconsin-meeting-tracker/"
OUT_DIR     = Path("public/meetings")

SOURCE_META = {
    "marathon":     ("Marathon County",         "#4aaba7"),
    "wausau":       ("City of Wausau",           "#C0392B"),
    "weston":       ("Village of Weston",        "#3A6B43"),
    "school_board": ("Wausau School Board",      "#6B2D5C"),
    "kronenwetter": ("Village of Kronenwetter",  "#8B6914"),
    "dc_everest":   ("DC Everest School Board",  "#1F6F6B"),
}

E = html.escape


def render_page(m: dict) -> str:
    label, accent = SOURCE_META.get(m["source"], (m["source"], "#3e847a"))
    title = f"{m['title']} — {label} — {m['date']}"
    desc = (m.get("overview") or "")[:300]
    page_url = f"{BASE_URL}/meetings/{m['id']}/"
    app_url = f"{BASE_URL}/#{m['id']}"

    topics = "".join(
        f'<span class="tag">{E(t)}</span>' for t in (m.get("topics") or []))

    disc = "".join(
        f"<h3>{E(d.get('item',''))}</h3><p>{E(d.get('body',''))}</p>"
        for d in (m.get("discussions") or []))

    votes_rows = ""
    for v in (m.get("votes") or []):
        who = " · ".join(x for x in [
            f"Moved by {v['mover']}" if v.get("mover") else "",
            f"Seconded by {v['second']}" if v.get("second") else ""] if x)
        votes_rows += (
            f"<li><strong>{E(v.get('item',''))}</strong> — "
            f"{E(v.get('outcome',''))}{(' ' + E(v['tally'])) if v.get('tally') else ''}"
            f"{('<br><em>' + E(who) + '</em>') if who else ''}</li>")
    votes_html = f"<h2>Votes</h2><ul>{votes_rows}</ul>" if votes_rows else ""

    actions = "".join(f"<li>{E(a)}</li>" for a in (m.get("actionItems") or []))
    actions_html = f"<h2>Action items</h2><ul>{actions}</ul>" if actions else ""

    provenance = ("Summary based on the published agenda — outcomes were not yet "
                  "available when this was written." if m.get("isAgendaOnly") else
                  "Summary generated from the meeting recording or official minutes.")

    # Schema.org Event + Article hybrid keeps it simple: use Article.
    ld = json.dumps({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": desc,
        "datePublished": _iso(m.get("date")),
        "publisher": {"@type": "Organization", "name": "Wausau Pilot & Review",
                       "url": "https://wausaupilotandreview.com"},
        "mainEntityOfPage": page_url,
    }, ensure_ascii=False)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{E(title)}</title>
<meta name="description" content="{E(desc)}">
<link rel="canonical" href="{page_url}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Wausau Pilot &amp; Review">
<meta property="og:title" content="{E(title)}">
<meta property="og:description" content="{E(desc)}">
<meta property="og:url" content="{page_url}">
<script type="application/ld+json">{ld}</script>
<style>
  body {{ margin:0; font-family: Georgia, 'Times New Roman', serif; background:#F7F3EC; color:#1A1209; line-height:1.6; }}
  .wrap {{ max-width: 720px; margin: 0 auto; padding: 0 18px 48px; }}
  header.site {{ background:#3e847a; padding:14px 18px; }}
  header.site a {{ color:#fff; text-decoration:none; font-family: Arial, Helvetica, sans-serif; font-weight:bold; letter-spacing:0.08em; font-size:14px; }}
  .kicker {{ font-family: Arial, Helvetica, sans-serif; font-size:12px; letter-spacing:0.14em; color:{accent}; text-transform:uppercase; margin:26px 0 6px; font-weight:bold; }}
  h1 {{ font-size:28px; line-height:1.2; margin:0 0 4px; }}
  .date {{ color:#6b6156; font-size:14px; margin-bottom:14px; }}
  .tag {{ display:inline-block; border:1px solid {accent}; color:{accent}; border-radius:999px; padding:2px 10px; font-size:11px; font-family: Arial, Helvetica, sans-serif; letter-spacing:0.08em; margin:0 6px 6px 0; text-transform:uppercase; }}
  h2 {{ font-size:18px; border-bottom:1px solid #E0D8CC; padding-bottom:4px; margin-top:28px; }}
  h3 {{ font-size:15px; margin:18px 0 4px; }}
  .prov {{ font-size:12.5px; color:#6b6156; border-left:3px solid #E0D8CC; padding-left:10px; margin:18px 0; }}
  .cta {{ display:inline-block; background:{accent}; color:#fff; text-decoration:none; padding:9px 16px; font-family: Arial, Helvetica, sans-serif; font-size:13px; font-weight:bold; letter-spacing:0.06em; margin:8px 12px 0 0; }}
  .cta.alt {{ background:#fff; color:{accent}; border:1px solid {accent}; }}
  footer {{ margin-top:40px; font-size:12px; color:#6b6156; border-top:1px solid #E0D8CC; padding-top:12px; }}
</style>
</head>
<body>
<header class="site"><a href="{TRACKER_URL}">WAUSAU PILOT &amp; REVIEW — CENTRAL WISCONSIN MEETING TRACKER</a></header>
<div class="wrap">
  <div class="kicker">{E(label)} · {E(m.get('committee',''))}</div>
  <h1>{E(m['title'])}</h1>
  <div class="date">{E(m['date'])}{(' · ' + E(m['duration'])) if m.get('duration') else ''}</div>
  <div>{topics}</div>
  <p>{E(m.get('overview',''))}</p>
  <p>
    <a class="cta" href="{TRACKER_URL}">Open the interactive tracker</a>
    {f'<a class="cta alt" href="{E(m.get("url",""))}">Watch / source</a>' if m.get('url') else ''}
    {f'<a class="cta alt" href="{E(m.get("docUrl",""))}">Agenda &amp; documents</a>' if m.get('docUrl') else ''}
  </p>
  <div class="prov">{provenance} These AI-assisted summaries review the public record and are not a substitute for official minutes.</div>
  {votes_html}
  <h2>Discussion</h2>
  {disc or '<p><em>No detailed discussion summary available.</em></p>'}
  {actions_html}
  <footer>Published by <a href="https://wausaupilotandreview.com">Wausau Pilot &amp; Review</a> · <a href="{app_url}">Permalink in the tracker</a></footer>
</div>
</body>
</html>
"""


def _iso(date_str):
    try:
        return datetime.strptime(date_str, "%B %d, %Y").date().isoformat()
    except (ValueError, TypeError):
        return None


def main():
    meetings = json.loads(Path(MEETINGS_JSON).read_text(encoding="utf-8"))
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    written = 0
    for m in meetings:
        mid = m.get("id", "")
        if not re.fullmatch(r"[A-Za-z0-9_-]+", mid):
            continue   # ids are filesystem/URL-safe; skip anything odd
        d = OUT_DIR / mid
        d.mkdir(exist_ok=True)
        (d / "index.html").write_text(render_page(m), encoding="utf-8")
        written += 1

    # Sitemap over EVERYTHING on disk (old pages persist as the archive).
    all_pages = sorted(p.parent.name for p in OUT_DIR.glob("*/index.html"))
    urls = [f"{BASE_URL}/"] + [f"{BASE_URL}/meetings/{pid}/" for pid in all_pages]
    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in urls:
        sm.append(f"  <url><loc>{html.escape(u)}</loc></url>")
    sm.append("</urlset>")
    Path("public/sitemap.xml").write_text("\n".join(sm) + "\n", encoding="utf-8")

    Path("public/robots.txt").write_text(
        f"User-agent: *\nAllow: /\nSitemap: {BASE_URL}/sitemap.xml\n", encoding="utf-8")

    print(f"[pages] wrote {written} meeting page(s); sitemap covers "
          f"{len(all_pages)} page(s) total (archive included).")


if __name__ == "__main__":
    main()
