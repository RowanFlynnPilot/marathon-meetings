#!/usr/bin/env python3
"""
inject_meetings.py — Injects newly summarised meetings into the JSX MEETINGS array.
=====================================================================================
Reads processed_meetings.json and the corresponding *_summary.json + *_votes.json
sidecars produced by marathon_meeting_summarizer.py, then prepends new entries to
the MEETINGS array in the React JSX file.

Usage:
    python inject_meetings.py [path/to/marathon-meetings.jsx]

Defaults to ./marathon-meetings.jsx if no path given.

Run order in GitHub Actions:
    1. marathon_meeting_summarizer.py   → summaries/*.json
    2. inject_meetings.py               → updates MEETINGS array in JSX
    3. update_upcoming.py               → updates UPCOMING arrays in JSX
    4. git commit && git push
"""

import json, re, sys, os
from datetime import datetime, timezone
from pathlib import Path

# ── Config ────────────────────────────────────────────────────────────────────

JSX_PATH      = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("./marathon-meetings.jsx")
STATE_FILE    = Path(os.environ.get("STATE_FILE",    "./processed_meetings.json"))
SUMMARIES_DIR = Path(os.environ.get("SUMMARIES_DIR", "./summaries"))
INJECTED_FILE = Path("./injected_meetings.json")   # tracks what's been injected

# How many meetings to keep in the MEETINGS array (oldest get pruned)
MAX_MEETINGS = 30

# ── Committee → source mapping ────────────────────────────────────────────────

COMMITTEE_MAP = {
    # Marathon County
    "executive committee":                    ("marathon", "Executive Committee"),
    "public safety committee":                ("marathon", "Public Safety"),
    "environmental resources committee":      ("marathon", "Environmental Resources"),
    "health and human services committee":    ("marathon", "Health & Human Services"),
    "health & human services committee":      ("marathon", "Health & Human Services"),
    "infrastructure committee":               ("marathon", "Infrastructure"),
    "hr, finance & property committee":       ("marathon", "HR, Finance & Property"),
    "human resources, finance":               ("marathon", "HR, Finance & Property"),
    "extension, education":                   ("marathon", "Extension & Economic Dev"),
    "county board":                           ("marathon", "County Board"),
    # City of Wausau
    "public health & safety":                 ("wausau", "Public Health & Safety"),
    "public health and safety":               ("wausau", "Public Health & Safety"),
    "economic development":                   ("wausau", "Economic Development"),
    "parks & recreation":                     ("wausau", "Parks & Recreation"),
    "parks and recreation":                   ("wausau", "Parks & Recreation"),
    "board of public works":                  ("wausau", "Board of Public Works"),
    "common council":                         ("wausau", "City Council"),
    "finance committee":                      ("wausau", "Finance"),
    "infrastructure & facilities":            ("wausau", "Infrastructure"),
    "plan commission":                        ("wausau", "Plan Commission"),
    # Village of Weston
    "board of trustees":                      ("weston", "Board of Trustees"),
    "finance & human resources":              ("weston", "Finance & Human Resources"),
    "public works committee":                 ("weston", "Public Works"),
    "community life":                         ("weston", "Community Life & Public Safety"),
    "parks committee":                        ("weston", "Parks"),
}

def infer_source_and_committee(title: str, source_key: str, committee_from_json: str) -> tuple[str, str]:
    """Return (source, committee_display) from available metadata."""
    # If the JSON summary already has a good committee name, use it
    if committee_from_json and len(committee_from_json) > 3:
        lower = committee_from_json.lower()
        for key, val in COMMITTEE_MAP.items():
            if key in lower:
                return val
        return (source_key, committee_from_json)

    # Fall back to title matching
    lower = title.lower()
    for key, val in COMMITTEE_MAP.items():
        if key in lower:
            return val

    return (source_key, re.sub(r'\s*-\s*\d+.*$', '', title).strip())


# ── Date helpers ──────────────────────────────────────────────────────────────

def parse_date_from_title(title: str):
    """Extract date from title.
    Handles: 'Board of Trustees - 3/23/2026', 'Special Meeting - 2026-01-26'
    """
    # ISO format: 2026-01-26
    m = re.search(r'(20\d{2})-(\d{2})-(\d{2})', title)
    if m:
        try:
            return datetime(int(m.group(1)), int(m.group(2)), int(m.group(3)))
        except ValueError:
            pass
    # US format: 3/23/2026 or 3/23/26
    m = re.search(r'(\d{1,2})/(\d{1,2})/(\d{2,4})', title)
    if m:
        mo, dy, yr = m.groups()
        yr = "20" + yr if len(yr) == 2 else yr
        try:
            return datetime(int(yr), int(mo), int(dy))
        except ValueError:
            pass
    # Dash format: 12-18-18 or 3-23-26
    m = re.search(r'(\d{1,2})-(\d{1,2})-(\d{2,4})(?!\d)', title)
    if m:
        mo, dy, yr = m.groups()
        yr = "20" + yr if len(yr) == 2 else yr
        try:
            dt = datetime(int(yr), int(mo), int(dy))
            # Sanity: reject if date is before 2010 (likely mis-parsed)
            if dt.year >= 2010:
                return dt
        except ValueError:
            pass
    return None


def fmt_date(dt: datetime) -> str:
    return dt.strftime("%B %-d, %Y")   # "March 23, 2026"


def fmt_short_date(dt: datetime) -> str:
    return dt.strftime("%b %-d").upper()  # "MAR 23"


# ── JSX string builder ────────────────────────────────────────────────────────

def _esc(s: str) -> str:
    """Escape a string for inclusion in a JSX attribute value."""
    return (s or "")               \
        .replace("\\", "\\\\")    \
        .replace('"',  '\\"')     \
        .replace("\n", " ")       \
        .replace("\r", "")        \
        .replace("/",   "\\/")       # prevent esbuild misreading / as regex

def build_meeting_jsx(
    video_id:    str,
    source:      str,
    title:       str,
    date_str:    str,
    short_date:  str,
    committee:   str,
    duration:    str,
    url:         str,
    doc_url:     str | None,
    summary:     dict,
    civic_data:  dict | None,
) -> str:
    """Return a JSX object literal string for one meeting entry."""

    overview      = _esc(summary.get("overview", ""))
    public_comment = _esc(summary.get("publicComment", "No public comment was offered."))

    # ── Agenda ────────────────────────────────────────────────────────────────
    agenda_items = summary.get("agenda", [])
    if not agenda_items:
        agenda_items = [{"time": "0:00", "item": "Meeting convened"}]
    agenda_lines = []
    for a in agenda_items:
        t = _esc(a.get("time", "0:00"))
        i = _esc(a.get("item", ""))
        agenda_lines.append(f'      {{ time:"{t}", item:"{i}" }},')
    agenda_jsx = "\n".join(agenda_lines)

    # ── Discussions ───────────────────────────────────────────────────────────
    discussions = summary.get("discussions", [])
    disc_lines = []
    for d in discussions:
        item = _esc(d.get("item", ""))
        body = _esc(d.get("body", ""))
        disc_lines.append(f'      {{ item:"{item}", body:"{body}" }},')
    disc_jsx = "\n".join(disc_lines)

    # ── Action items ──────────────────────────────────────────────────────────
    actions = summary.get("actionItems", [])
    action_lines = [f'      "{_esc(a)}",' for a in actions]
    actions_jsx = "\n".join(action_lines)

    # ── Doc URL ───────────────────────────────────────────────────────────────
    doc_jsx = f'"{doc_url}"' if doc_url else "null"

    # ── Civic items (Wausau only) ──────────────────────────────────────────────
    civic_jsx = ""
    if civic_data and source == "wausau":
        items = civic_data.get("items", [])
        civic_jsx = "\n    civicItems: " + build_civic_items_jsx(items) + ","

    is_bb = video_id.startswith("bb_")
    return f"""  {{
    id: "{video_id}", source: "{source}",
    title: "{_esc(title)}",
    date: "{date_str}", shortDate: "{short_date}",
    committee: "{_esc(committee)}", duration: "{duration}",
    url: "{url}",
    docUrl: {doc_jsx},
    isAgendaOnly: {"true" if is_bb else "false"},
    badge: "new",
    overview: "{overview}",
    agenda: [
{agenda_jsx}
    ],
    discussions: [
{disc_jsx}
    ],
    publicComment: "{public_comment}",
    actionItems: [
{actions_jsx}
    ],{civic_jsx}
  }}"""


def build_civic_items_jsx(items: list) -> str:
    """Recursively build civicItems JSX from CivicClerk data."""
    if not items:
        return "[]"
    lines = ["["]
    for item in items:
        number   = _esc(item.get("number", ""))
        name     = _esc(item.get("name", ""))
        votes    = item.get("votes", [])
        docs     = item.get("docs", [])
        children = item.get("children", [])

        votes_jsx    = build_votes_jsx(votes)
        docs_jsx     = build_docs_jsx(docs)
        children_jsx = build_civic_items_jsx(children)

        lines.append(
            f'      {{ number:"{number}", name:"{name}", '
            f'votes:{votes_jsx}, docs:{docs_jsx}, children:{children_jsx} }},'
        )
    lines.append("    ]")
    return "\n".join(lines)


def build_votes_jsx(votes: list) -> str:
    if not votes:
        return "[]"
    parts = []
    for v in votes:
        motion   = _esc(v.get("motion", ""))
        passed   = "true" if v.get("passed") else "false"
        initiator = _esc(v.get("initiator", ""))
        seconder  = _esc(v.get("seconder", ""))
        yes       = json.dumps(v.get("yes", []))
        no        = json.dumps(v.get("no", []))
        abstain   = json.dumps(v.get("abstain", []))
        parts.append(
            f'{{ motion:"{motion}", passed:{passed}, initiator:"{initiator}", '
            f'seconder:"{seconder}", yes:{yes}, no:{no}, abstain:{abstain} }}'
        )
    return "[" + ", ".join(parts) + "]"


def build_docs_jsx(docs: list) -> str:
    if not docs:
        return "[]"
    parts = []
    for d in docs:
        if isinstance(d, dict):
            name = _esc(d.get("name", ""))
            url  = d.get("url") or ""
            parts.append(f'{{ name:"{name}", url:"{url}" }}')
        else:
            parts.append(f'"{_esc(str(d))}"')
    return "[" + ", ".join(parts) + "]"


# ── Duration from yt-dlp metadata ─────────────────────────────────────────────

def fmt_duration(seconds: int | None) -> str:
    if not seconds:
        return "~1h"
    h = seconds // 3600
    m = (seconds % 3600) // 60
    if h:
        return f"{h}h {m}m" if m else f"{h}h"
    return f"{m}m"


# ── Main injection logic ───────────────────────────────────────────────────────

def load_injected() -> set:
    if INJECTED_FILE.exists():
        return set(json.loads(INJECTED_FILE.read_text()).get("injected", []))
    return set()


def save_injected(ids: set):
    INJECTED_FILE.write_text(json.dumps({"injected": sorted(ids)}, indent=2))


def main():
    print(f"\n💉  inject_meetings.py — target: {JSX_PATH}")
    print("=" * 60)

    if not JSX_PATH.exists():
        print(f"❌  JSX file not found: {JSX_PATH}")
        sys.exit(1)

    if not STATE_FILE.exists():
        print("ℹ️   No state file found — nothing processed yet.")
        return

    state    = json.loads(STATE_FILE.read_text())
    processed = state.get("processed", {})
    injected  = load_injected()

    # Find video IDs that have been summarized but not yet injected into JSX
    # Also include stubs already in MEETINGS but with empty agenda/discussions
    jsx_content = JSX_PATH.read_text(encoding="utf-8")
    # Find all IDs where the entry has empty agenda array
    stub_ids = set()
    # Split into individual meeting blocks and check each
    blocks = re.split(r'(?=  \{\n    id:)', jsx_content)
    for block in blocks:
        id_m = re.search(r'id:\s*"([^"]+)"', block)
        if id_m and 'agenda: []' in block and 'discussions: []' in block:
            stub_ids.add(id_m.group(1))

    print(f"   Processed IDs in state: {len(processed)}")
    print(f"   Already injected:       {len(injected)}")
    print(f"   Stubs in MEETINGS:      {len(stub_ids)}")

    # IDs in processed state
    processed_ids = set(processed.keys())
    # IDs that are stubs but not in processed (manually-created stubs)
    orphan_stubs  = stub_ids - processed_ids
    if orphan_stubs:
        print(f"   Orphan stubs (no processed entry): {orphan_stubs}")

    pending = {
        vid: info for vid, info in processed.items()
        if vid not in injected or vid in stub_ids
    }

    if not pending and not stub_ids:
        print("\u2705  No new meetings to inject.")
        return

    if not pending:
        print("\u2705  No processed meetings to inject (stubs exist but no summaries found).")
        return

    stubs_to_update = [v for v in pending if v in stub_ids]
    if stubs_to_update:
        print(f"\U0001f4dd  Will update {len(stubs_to_update)} stub(s) with full summary data")

    print(f"📋  {len(pending)} meeting(s) to inject:")
    for vid, info in pending.items():
        print(f"   [{info['source']}] {info['title']}")

    # Read JSX
    jsx = JSX_PATH.read_text(encoding="utf-8")

    new_entries = []
    newly_injected = set()

    for video_id, info in sorted(
        pending.items(),
        key=lambda x: x[1].get("processed_at", ""),
        reverse=True   # newest first
    ):
        title      = info["title"]
        source_key = info["source"]
        doc_url    = info.get("doc_url")
        summary_path = info.get("summary_file", "")

        # Load _summary.json sidecar
        summary_json_path = summary_path.replace(".md", "_summary.json") if summary_path else ""
        if not summary_json_path or not Path(summary_json_path).exists():
            print(f"   ⚠️  No summary JSON for {title}, skipping")
            continue

        summary = json.loads(Path(summary_json_path).read_text(encoding="utf-8"))

        # Load _votes.json sidecar if available
        votes_path = summary_path.replace(".md", "_votes.json") if summary_path else ""
        civic_data = None
        if votes_path and Path(votes_path).exists():
            civic_data = json.loads(Path(votes_path).read_text(encoding="utf-8"))

        # Parse date from title
        dt = parse_date_from_title(title)
        if not dt:
            # Fall back to processed_at date
            processed_at = info.get("processed_at", "")
            dt = datetime.fromisoformat(processed_at.replace("Z", "+00:00")) if processed_at else datetime.now()

        date_str   = fmt_date(dt)
        short_date = fmt_short_date(dt)

        # Infer source and committee
        source, committee = infer_source_and_committee(
            title, source_key, summary.get("committee", "")
        )

        # Build video URL — BoardBook meetings use bb_ prefix, not real YouTube IDs
        is_boardbook = video_id.startswith("bb_")
        if is_boardbook:
            # Use the BoardBook agenda URL as the primary link
            yt_url = doc_url or f"https://meetings.boardbook.org/Public/Organization/1360"
        else:
            yt_url = f"https://www.youtube.com/watch?v={video_id}"

        # Clean title — strip date suffixes in multiple formats
        clean_title = title
        clean_title = re.sub(r'\s*-\s*\d{4}-\d{2}-\d{2}$', '', clean_title).strip()  # 2026-01-26
        clean_title = re.sub(r'\s*-\s*\d{1,2}/\d{1,2}/\d{2,4}$', '', clean_title).strip()  # 3/9/26
        clean_title = re.sub(r'\s*-\s*\d{1,2}-\d{1,2}-\d{2,4}$', '', clean_title).strip()  # 12-18-18

        # Build JSX entry
        entry = build_meeting_jsx(
            video_id    = video_id,
            source      = source,
            title       = clean_title,
            date_str    = date_str,
            short_date  = short_date,
            committee   = committee,
            duration    = summary.get("duration", "~1h"),
            url         = yt_url,
            doc_url     = doc_url,
            summary     = summary,
            civic_data  = civic_data,
        )

        new_entries.append(entry)
        newly_injected.add(video_id)
        print(f"   ✅  Built entry for: {title}")

    if not new_entries:
        print("⚠️   No entries built — check summary JSON files.")
        return

    # ── Inject into JSX ───────────────────────────────────────────────────────
    # Remove existing stub entries for IDs we are about to inject
    # (avoids duplicates when updating stubs with full data)
    new_jsx = jsx
    for vid in newly_injected:
        new_jsx = re.sub(
            rf'  \{{[\s\S]{{0,50}}?id:\s*"{re.escape(vid)}"[\s\S]*?\n  \}},?\n',
            '', new_jsx, count=1
        )

    # Prepend new full entries at top of MEETINGS array
    new_entries_str = ",\n".join(new_entries)
    pattern = r'(const MEETINGS = \[\n)(  // ──|  \{|\];)'
    def replacer(m):
        sep = "," if m.group(2) != "];\n" and m.group(2) != "];" else ""
        return m.group(1) + new_entries_str + ",\n" + m.group(2)

    new_jsx, n_subs = re.subn(pattern, replacer, new_jsx, count=1)

    if n_subs == 0:
        print("❌  Could not find MEETINGS array insertion point in JSX.")
        print("    Looking for: const MEETINGS = [")
        sys.exit(1)

    # ── Prune old entries (keep MAX_MEETINGS) ─────────────────────────────────
    # Count entries and remove oldest if over limit
    all_ids = re.findall(r'id:\s*"([A-Za-z0-9_-]{11})"', new_jsx)
    if len(all_ids) > MAX_MEETINGS:
        to_remove = all_ids[MAX_MEETINGS:]
        for old_id in to_remove:
            # Remove that meeting's object literal from the array
            new_jsx = re.sub(
                rf'  \{{[\s\S]*?id:\s*"{re.escape(old_id)}"[\s\S]*?\n  \}},?\n',
                '', new_jsx, count=1
            )
        print(f"   🧹  Pruned {len(to_remove)} old meeting(s) (kept {MAX_MEETINGS})")

    # ── Remove "new" badge from older entries ─────────────────────────────────
    # Only the entries we just injected keep badge:"new"
    # All others get badge:null
    for old_id in (set(all_ids) - newly_injected):
        new_jsx = re.sub(
            rf'(id:\s*"{re.escape(old_id)}"[\s\S]{{0,200}}?)badge:\s*"new"',
            r'\1badge: null',
            new_jsx, count=1
        )

    # Write back
    JSX_PATH.write_text(new_jsx, encoding="utf-8")
    print(f"\n💾  Wrote {len(new_entries)} new meeting(s) to {JSX_PATH}")

    # Update injected tracking
    injected.update(newly_injected)
    save_injected(injected)

    print(f"✅  Done. Injected IDs recorded in {INJECTED_FILE}")
    print(f"\n   Summary:")
    print(f"   New meetings injected : {len(new_entries)}")
    print(f"   Total tracked IDs     : {len(injected)}")


if __name__ == "__main__":
    main()
