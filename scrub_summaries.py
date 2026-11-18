#!/usr/bin/env python3
"""
scrub_summaries.py — Keep residents' home addresses out of published
summaries, and apply logged corrections.

Two jobs, both idempotent, run in CI after every summarization and before
inject_meetings.py:

1. Address scrub. Summaries name officials; a private resident's home address
   never belongs in one (WP&R's published rule, and a Herb Kohl grant
   commitment). The prompts carry the rule (RESIDENT_PRIVACY_RULES in
   marathon_meeting_summarizer.py); this is the backstop for when the model
   slips, and the one-time cleanup of everything published before the rule.
   It removes an address attached to a person ("Jane Doe (123 Elm St)",
   "Jane Doe of 123 Elm Street, Wausau", "a neighbor at 123 Elm St") and
   leaves an address that is the subject of business (a rezoning at 123 Elm
   St).

2. Corrections. corrections.json is the public log of fixes readers or the
   editor asked for: [{"id", "find", "replace", "date", "kind", "note"}].
   Each is re-applied here every run, so re-summarizing a meeting can't undo
   a fix. kind is "correction" (an error fixed; these are the count the grant
   reports ask for) or "privacy" (a name or detail withheld under the
   residents rule).

Targets: summaries/*_summary.json and their .md mirrors, src/data/meetings.json,
and the static pages in public/meetings/ (archive pages are never re-rendered,
so they are edited in place).

Usage:
  python scrub_summaries.py            # apply
  python scrub_summaries.py --check    # report what would change, write nothing
"""

import argparse
import html
import json
import re
import sys
from pathlib import Path

SUMMARIES = Path("summaries")
MEETINGS = Path("src/data/meetings.json")
PAGES = Path("public/meetings")
CORRECTIONS = Path("corrections.json")

# ── Address grammar ──────────────────────────────────────────────────────────
_SUFFIX = (r"(?:St(?:reet)?|Ave(?:nue)?|Rd|Road|Dr(?:ive)?|Ln|Lane|Ct|Court|Blvd|Boulevard|"
           r"Way|Cir(?:cle)?|Trail|Pl(?:ace)?|Pkwy|Parkway|Terrace|Row)\b\.?")
_DIR = r"(?:(?:[NSEW]\.?|North|South|East|West)\s+)?"
_STREET_WORD = r"(?:\d{1,3}(?:st|nd|rd|th)|[A-Z][A-Za-z'’]+)"
_HIGHWAY = (r"(?:(?:State|County|U\.?S\.?)\s+)?(?:Highway|Hwy\.?|Trunk\s+Highway|Road)\s+"
            r"[A-Z0-9]{1,3}\b")
# Rural Marathon County addresses have five- or six-digit house numbers and
# often no street suffix ("236617 County Road W", "167949 Sunny Lane Rd").
_RURAL = r"\d{5,6}\s+[A-Z][A-Za-z'’]*\.?(?:\s+[A-Z0-9][A-Za-z0-9'’]*\.?){0,3}"
ADDR = (r"(?:\d{1,5}(?:-\d{1,4})?[A-Z]?\s+" + _DIR +
        r"(?:(?:" + _STREET_WORD + r"\s+){1,4}" + _SUFFIX + r"|" + _HIGHWAY + r")"
        r"(?:\s+(?:Apt|Unit|#)\s*\w+)?|" + _RURAL + r")")
_PLACES = (r"Wausau|Weston|Mosinee|Brokaw|Kronenwetter|Rothschild|Schofield|Rib Mountain|"
           r"Ringle|Marathon(?: City)?|Hatley|Maine|Stettin|Texas|Wien|Easton|Bergen|Knowlton|"
           r"Guenther|Reid|Elderon|Edgar|Athens|Stratford|Spencer|Colby|Abbotsford|Merrill")
CITY = (r"(?:,\s*(?:(?:Town|Village|City)\s+of\s+)?(?:" + _PLACES + r")\b)?"
        r"(?:,\s*(?:WI|Wisconsin)\b)?")

# A person's name: 1-3 capitalized words, optional title and quotes.
NAME = (r"(?:(?:Dr|Mr|Mrs|Ms)\.?\s+)?['\"‘“]?[A-Z][a-zA-Z'’\-]+"
        r"(?:\s+(?:[A-Z]\.|[A-Z][a-zA-Z'’\-]+)){0,2}['\"’”]?")

# Capitalized words that mark a business, place or body, not a person: an
# address after one of these is the subject of business and stays.
_NOT_A_PERSON = re.compile(
    r"\b(?:LLC|Inc|Corp|Company|Co|Church|School|Park|Station|Trip|Bank|Hospital|Center|"
    r"Centre|Club|Association|Authority|District|Village|City|County|Town|Department|"
    r"Committee|Commission|Board|Council|Street|Avenue|Road|Drive|Lane|Court|Boulevard|"
    r"Parcel|Lot|Property|Properties|Building|Plaza|Mall|Apartments|Estates|Addition|"
    r"Subdivision|Resolution|Ordinance|Motion|Item|Phase|Project|Lodge|Hall|Library|"
    r"Hotel|Motel|Restaurant|Bar|Tavern|Store|Market|Clinic|Office|Garage|Farm|Farms|"
    r"Storage|Steakhouse|Electric|Bakery|Baseball|Deli|Motors|Auto|Automotive|Homes|"
    r"Builders|Construction|Realty|Rentals|Holdings|Enterprises|Group|Partners|Ventures|"
    r"Investments|Services|Supply|Foods|Brewing|Brewery|Cafe|Coffee|Pizza|Grill|Pub|Salon|"
    r"Fitness|Dental|Health|Care|Pharmacy|Foundation|Society|League|Habitat|Humanity|"
    r"Ministries|Lutheran|Catholic|Baptist|Methodist|University|College|Academy|"
    r"Elementary|Airport|Landfill|Cemetery|Tower|Towers|Lofts|Villas|Manor|"
    # action nouns that start a sentence about a property ("Rezoning of 123 Elm St")
    r"Sale|Purchase|Rezoning|Zoning|Discussion|Approval|Appeal|Acquisition|Demolition|"
    r"Vacation|Annexation|Development|Redevelopment|Review|Consideration|Owner|Owners|"
    r"Tenant|Tenants|Applicant|Request|Permit|License|Hearing|Update|Status|Site|Plan|"
    r"Plat|Survey|Map|Lease|Easement|Transfer|Conveyance|Dedication|Inspection|Razing|"
    r"Abatement|Enforcement|Cleanup|Complaint|Repair|Renovation|Reconstruction|"
    r"Improvement|Expansion|Extension|Variance|Exception|Use)\b\.?",
    re.IGNORECASE)
# All-caps tokens (USM, LNS), possessives (Tommy's) and digits mark a business.
_BUSINESS_SHAPE = re.compile(r"\b[A-Z]{2,}\b|['’]s\b|\d")

_RESIDENT_NOUN = (r"(?:neighbors?|residents?|homeowners?|speakers?|attendees?|citizens?|"
                  r"woman|man|couple|family)")


# In public comment a capitalized name followed by an address is a speaker,
# even when the transcript garbled it ("Mary CL"), so only the word list
# applies there. scrub_text sets this per field.
_IN_PUBLIC_COMMENT = False


def _is_person(name: str) -> bool:
    if _NOT_A_PERSON.search(name):
        return False
    return _IN_PUBLIC_COMMENT or not _BUSINESS_SHAPE.search(name)


_ADDR_IN_PAREN = re.compile(
    r"(?:(?:address given as|both of|of|at|from|resides at|lives at|residing at)\s+)?"
    + ADDR + CITY)


def _paren(m: re.Match) -> str:
    """Jane Doe (123 Elm St) -> Jane Doe; Jane Doe (applicant, 123 Elm St) ->
    Jane Doe (applicant). Parentheticals with no address are left alone."""
    name, inner = m.group("name"), m.group("inner")
    if not _is_person(name) or not _ADDR_IN_PAREN.search(inner):
        return m.group(0)
    rest = _ADDR_IN_PAREN.sub("", inner)
    rest = re.sub(r"\s*,\s*,+", ",", rest).strip(" ,;")
    return f"{name} ({rest})" if rest else name


def _keep_name(m: re.Match) -> str:
    return m.group("name") if _is_person(m.group("name")) else m.group(0)


def _keep_name_space(m: re.Match) -> str:
    return m.group("name") + " " if _is_person(m.group("name")) else m.group(0)


# Applied to every text field.
_RULES_ALL = [
    # Jane Doe (123 Elm St[, Wausau][, anything else])
    (re.compile(r"(?P<name>" + NAME + r")\s*\((?P<inner>[^()]*)\)"), _paren),
    # Jane Doe[,] of 123 Elm Street[, Wausau]
    (re.compile(r"(?P<name>" + NAME + r"),?\s+of\s+" + ADDR + CITY), _keep_name),
    # Jane Doe, 123 Elm Street[, Wausau][,]
    (re.compile(r"(?P<name>" + NAME + r"),\s+" + ADDR + CITY + r",?\s*"), _keep_name_space),
    # a neighbor at / a resident of 123 Elm Street
    (re.compile(r"(?P<name>\b" + _RESIDENT_NOUN + r")\s+(?:at|of|from|living at|who lives at|"
                r"who resides at|residing at)\s+" + ADDR + CITY, re.IGNORECASE),
     lambda m: m.group("name")),
]
# Applied only to public comment, where a name followed by "at/from <address>"
# is a speaker's home, not a business location.
_RULES_COMMENT = [
    (re.compile(r"(?P<name>" + NAME + r")\s+(?:from|at|who lives at|who resides at|residing at|"
                r"living at)\s+" + ADDR + CITY), _keep_name),
]
_TIDY = [
    (re.compile(r"[ \t]{2,}"), " "),
    (re.compile(r"\s+([,.;:)])"), r"\1"),
    (re.compile(r"\(\s+"), "("),
]


def scrub_text(text: str, public_comment: bool = False) -> str:
    global _IN_PUBLIC_COMMENT
    _IN_PUBLIC_COMMENT = public_comment
    out = text
    for pat, repl in _RULES_ALL + (_RULES_COMMENT if public_comment else []):
        out = pat.sub(repl, out)
    if out != text:
        for pat, repl in _TIDY:
            out = pat.sub(repl, out)
    return out


# "item", "title" and "motion" are the government's own wording (agenda item
# titles, motions): a permit applicant's address there is public agenda data.
_SKIP_KEYS = {"id", "url", "docUrl", "doc_url", "video_url", "source", "_source", "date",
              "shortDate", "time", "item", "title", "motion"}


def scrub_obj(obj, key: str = ""):
    """Recursively scrub every string in a summary/meeting record."""
    if isinstance(obj, str):
        return obj if key in _SKIP_KEYS else scrub_text(obj, public_comment=(key == "publicComment"))
    if isinstance(obj, list):
        return [scrub_obj(x, key) for x in obj]
    if isinstance(obj, dict):
        return {k: scrub_obj(v, k) for k, v in obj.items()}
    return obj


# Corrections reach every text field, including item titles; only ids, links
# and dates are off limits.
_NEVER_EDIT_KEYS = {"id", "url", "docUrl", "doc_url", "video_url", "source", "_source",
                    "date", "shortDate"}


def replace_in_obj(obj, find: str, replace: str, key: str = ""):
    if isinstance(obj, str):
        return obj if key in _NEVER_EDIT_KEYS else obj.replace(find, replace)
    if isinstance(obj, list):
        return [replace_in_obj(x, find, replace, key) for x in obj]
    if isinstance(obj, dict):
        return {k: replace_in_obj(v, find, replace, k) for k, v in obj.items()}
    return obj


def load_corrections() -> list[dict]:
    if not CORRECTIONS.exists():
        return []
    rows = json.loads(CORRECTIONS.read_text(encoding="utf-8"))
    for r in rows:
        if not (r.get("id") and r.get("find") and "replace" in r):
            raise SystemExit(f"corrections.json: every entry needs id, find, replace — got {r}")
    return rows


def _summary_id(path: Path, state: dict) -> str | None:
    """Meeting ID for a summary file, via processed_meetings.json."""
    stem = str(path).replace("\\", "/").replace("_summary.json", "")
    for vid, info in state.items():
        sf = (info.get("summary_file") or "").replace("\\", "/").replace(".md", "")
        if sf and (sf == stem or sf.endswith("/" + Path(stem).name)):
            return vid
    return None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--check", action="store_true", help="report only; write nothing")
    args = parser.parse_args()

    corrections = load_corrections()
    by_id: dict[str, list[dict]] = {}
    for c in corrections:
        by_id.setdefault(c["id"], []).append(c)

    state = {}
    sp = Path("processed_meetings.json")
    if sp.exists():
        state = json.loads(sp.read_text(encoding="utf-8")).get("processed", {})

    changed = {"summaries": 0, "mirrors": 0, "meetings": 0, "pages": 0}

    def fix(record, mid):
        out = scrub_obj(record)
        for c in by_id.get(mid or "", []):
            out = replace_in_obj(out, c["find"], c["replace"])
        return out

    def fix_text(text, mid, is_html=False, addresses=True):
        out = scrub_text(text, public_comment=False) if addresses else text
        for c in by_id.get(mid or "", []):
            out = out.replace(c["find"], c["replace"])
            if is_html:  # pages escape quotes and ampersands
                out = out.replace(html.escape(c["find"]), html.escape(c["replace"]))
        return out

    # 1. Summary sidecars and their markdown mirrors
    for path in sorted(SUMMARIES.glob("*_summary.json")):
        mid = _summary_id(path, state)
        try:
            rec = json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            continue
        new = fix(rec, mid)
        if new != rec:
            changed["summaries"] += 1
            if not args.check:
                path.write_text(json.dumps(new, indent=2, ensure_ascii=False), encoding="utf-8")
        md = Path(str(path).replace("_summary.json", ".md"))
        if md.exists():
            text = md.read_text(encoding="utf-8")
            new_text = fix_text(text, mid)
            if new_text != text:
                changed["mirrors"] += 1
                if not args.check:
                    md.write_text(new_text, encoding="utf-8")

    # 2. The displayed data file (carried-over cards never pass back through
    #    the summaries, so it is scrubbed directly)
    if MEETINGS.exists():
        meetings = json.loads(MEETINGS.read_text(encoding="utf-8"))
        new_meetings = [fix(m, m.get("id")) for m in meetings]
        changed["meetings"] = sum(1 for a, b in zip(meetings, new_meetings) if a != b)
        if changed["meetings"] and not args.check:
            MEETINGS.write_text(json.dumps(new_meetings, indent=2, ensure_ascii=False) + "\n",
                                encoding="utf-8")

    # 3. Static pages. Pages for displayed meetings are re-rendered from the
    #    data file every run, so they only need corrections; the address
    #    scrub is for archive pages, which are never re-rendered. (Raw HTML
    #    has no field names, so scrubbing a displayed page would also touch
    #    the agenda item titles the data-file pass deliberately leaves alone.)
    displayed = set()
    if MEETINGS.exists():
        displayed = {m.get("id") for m in json.loads(MEETINGS.read_text(encoding="utf-8"))}
    if PAGES.exists():
        for page in sorted(PAGES.glob("*/index.html")):
            page_html = page.read_text(encoding="utf-8")
            mid = page.parent.name
            new_html = fix_text(page_html, mid, is_html=True, addresses=mid not in displayed)
            if new_html != page_html:
                changed["pages"] += 1
                if not args.check:
                    page.write_text(new_html, encoding="utf-8")

    verb = "would change" if args.check else "changed"
    print(f"[scrub] {verb}: {changed['summaries']} summaries, {changed['mirrors']} mirrors, "
          f"{changed['meetings']} displayed meetings, {changed['pages']} pages; "
          f"{len(corrections)} correction(s) on file")
    return 0


if __name__ == "__main__":
    sys.exit(main())
