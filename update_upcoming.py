#!/usr/bin/env python3
"""
Central Wisconsin Meeting Tracker — Upcoming Events Updater
============================================================
Refreshes src/data/upcoming.json with live data from each source. The React
component imports that JSON file directly.

Sources:
  - City of Wausau   : CivicClerk OData API (live, exact dates/times)
  - Village of Weston: westonwi.gov AgendaCenter (scrape future PDFs +
                       rule-based schedule for unposted months)
  - Marathon County  : Rule-based schedule derived from observed YouTube
                       upload patterns (website blocks server IPs)
  - School Board     : BoardBook scrape + rule-based fill

Usage:
  python update_upcoming.py [path/to/upcoming.json]

Defaults to ./src/data/upcoming.json.
"""

import json, logging, re, sys
import requests
from datetime import date, datetime, timedelta
from calendar import monthrange
from pathlib import Path

logger = logging.getLogger(__name__)


from config import UPCOMING_JSON
DATA_PATH = Path(sys.argv[1]) if len(sys.argv) > 1 else UPCOMING_JSON


# ── Helpers ───────────────────────────────────────────────────────────────────

def nth_weekday(year: int, month: int, weekday: int, n: int) -> date | None:
    """Return the nth occurrence of weekday (0=Mon) in the given month."""
    first = date(year, month, 1)
    first_match = first + timedelta(days=(weekday - first.weekday()) % 7)
    result = first_match + timedelta(weeks=n - 1)
    return result if result.month == month else None


def last_weekday(year: int, month: int, weekday: int) -> date:
    """Return the last occurrence of weekday in the given month."""
    last = date(year, month, monthrange(year, month)[1])
    return last - timedelta(days=(last.weekday() - weekday) % 7)


def _months_between(start: date, end: date):
    d = start.replace(day=1)
    seen = set()
    while d <= end:
        seen.add((d.year, d.month))
        if d.month == 12:
            d = d.replace(year=d.year + 1, month=1)
        else:
            d = d.replace(month=d.month + 1)
    return sorted(seen)


# ── City of Wausau — CivicClerk API ──────────────────────────────────────────

def fetch_wausau_upcoming(days_ahead: int = 45) -> list[dict]:
    today = date.today()
    end   = today + timedelta(days=days_ahead)

    url = (
        "https://wausauwi.api.civicclerk.com/v1/Events"
        f"?%24filter=eventDate%20ge%20{today}T00%3A00%3A00Z"
        f"%20and%20eventDate%20le%20{end}T23%3A59%3A59Z"
        "%20and%20isDeleted%20eq%20false"
        "&%24orderby=eventDate&%24top=30"
    )
    try:
        r = requests.get(
            url,
            headers={"Accept": "application/json", "User-Agent": "Mozilla/5.0"},
            timeout=10,
        )
        events = r.json().get("value", [])
    except Exception as e:
        logger.warning("Wausau CivicClerk fetch failed: %s", e)
        return []

    results = []
    for e in events:
        name = e.get("eventName", "")
        if "CANCEL" in name.upper() or "POSSIBLE QUORUM" in name.upper():
            continue

        raw = e.get("eventDate", "")
        date_part = raw[:10]
        time_part = ""
        if "T" in raw:
            h, m = int(raw[11:13]), int(raw[14:16])
            ap = "AM" if h < 12 else "PM"
            h12 = h % 12 or 12
            time_part = f"{h12}:{m:02d} {ap}"

        results.append({
            "date":   date_part,
            "time":   time_part,
            "name":   name,
            "url":    f"https://wausauwi.portal.civicclerk.com/event/{e['id']}/overview",
            "source": "wausau",
        })
    print(f"  ✅  Wausau: {len(results)} upcoming events from CivicClerk")
    return results


# ── Village of Weston — AgendaCenter scrape + rule-based ─────────────────────

WESTON_SCHEDULE = [
    ("Plan Commission",                          0, 2, "6:00 PM"),
    ("Public Works Committee",                   0, 2, "6:00 PM"),
    ("Community Life & Public Safety Committee", 0, 1, "6:00 PM"),
    ("Finance & Human Resources Committee",      0, 3, "5:30 PM"),
    ("Parks & Recreation Committee",             0, 4, "6:00 PM"),
    ("Board of Trustees",                        0, 3, "6:00 PM"),
    ("S.A.F.E.R. Board of Directors",            1, 2, "6:00 PM"),
    ("Mountain Bay Metro Police Oversight",      3, 3, "6:00 PM"),
]

WESTON_CALENDAR_BASE = "https://www.westonwi.gov"


def fetch_weston_upcoming(days_ahead: int = 60) -> list[dict]:
    today     = date.today()
    end_date  = today + timedelta(days=days_ahead)
    results   = {}

    try:
        r = requests.get(
            f"{WESTON_CALENDAR_BASE}/agendacenter",
            headers={"User-Agent": "Mozilla/5.0"},
            timeout=10,
        )
        section_pattern = r'<h2[^>]*>([^<]+)</h2>(.*?)(?=<h2|$)'
        sections = re.findall(section_pattern, r.text, re.DOTALL)

        for committee_raw, body in sections:
            committee = re.sub(r'\s+', ' ', committee_raw).strip()
            if not committee or len(committee) < 3:
                continue
            links = re.findall(
                r'href="(/AgendaCenter/ViewFile/Agenda/(_(\d{2})(\d{2})(\d{4})-(\d+)))"',
                body
            )
            for full_path, _path_id, mo, dy, yr, _num in links:
                try:
                    d = date(int(yr), int(mo), int(dy))
                    if today <= d <= end_date:
                        key = (d.isoformat(), committee)
                        results[key] = {
                            "date":   d.isoformat(),
                            "time":   "",
                            "name":   committee,
                            "url":    f"{WESTON_CALENDAR_BASE}{full_path}",
                            "source": "weston",
                        }
                except ValueError:
                    pass
        print(f"  📄  Weston AgendaCenter: {len(results)} posted future agendas")
    except Exception as e:
        logger.warning("Weston AgendaCenter scrape failed: %s", e)

    rule_added = 0
    for yr, mo in _months_between(today, end_date):
        for committee, weekday, nth, time_str in WESTON_SCHEDULE:
            meeting_date = nth_weekday(yr, mo, weekday, nth)
            if meeting_date is None or not (today <= meeting_date <= end_date):
                continue
            key = (meeting_date.isoformat(), committee)
            if key not in results:
                results[key] = {
                    "date":   meeting_date.isoformat(),
                    "time":   time_str,
                    "name":   committee,
                    "url":    f"{WESTON_CALENDAR_BASE}/agendacenter",
                    "source": "weston",
                }
                rule_added += 1

    print(f"  📅  Weston rule-based: {rule_added} additional meetings projected")
    return sorted(results.values(), key=lambda x: (x["date"], x["time"]))


# ── Marathon County — Rule-based schedule ────────────────────────────────────

MARATHON_SCHEDULE = [
    ("Public Safety Committee",                   1, 2, "5:00 PM",
     "https://www.marathoncounty.gov/about-us/county-calendar"),
    ("Environmental Resources Committee",         1, 4, "5:00 PM",
     "https://www.marathoncounty.gov/about-us/county-calendar"),
    ("Health & Human Services Committee",         3, 1, "5:00 PM",
     "https://www.marathoncounty.gov/about-us/county-calendar"),
    ("Infrastructure Committee",                  3, 2, "5:00 PM",
     "https://www.marathoncounty.gov/about-us/county-calendar"),
    ("HR, Finance & Property Committee",          3, 3, "5:00 PM",
     "https://www.marathoncounty.gov/about-us/county-calendar"),
    ("Extension, Education & Econ Dev Committee", 2, 2, "5:00 PM",
     "https://www.marathoncounty.gov/about-us/county-calendar"),
    ("Executive Committee",                       3, 2, "3:00 PM",
     "https://www.marathoncounty.gov/about-us/county-calendar"),
    ("County Board Meeting",                      1, 4, "7:00 PM",
     "https://www.marathoncounty.gov/about-us/county-calendar"),
]

MARATHON_YOUTUBE = "https://www.youtube.com/@marathoncountyboardmeetings"


def fetch_marathon_upcoming(days_ahead: int = 60) -> list[dict]:
    today    = date.today()
    end_date = today + timedelta(days=days_ahead)
    results  = {}

    # YouTube channel scan for explicit next-meeting dates mentioned in
    # descriptions of recently uploaded videos.
    try:
        import subprocess
        out = subprocess.run(
            ["yt-dlp", "--no-check-certificate", "--flat-playlist",
             "--dump-json", f"{MARATHON_YOUTUBE}/videos"],
            capture_output=True, text=True, timeout=30
        )
        for line in out.stdout.strip().splitlines()[:20]:
            d = json.loads(line)
            title = d.get("title", "")
            desc  = d.get("description", "") or ""
            date_mentions = re.findall(
                r'(?:next meeting|upcoming)[^\n]{0,60}(\d{1,2}/\d{1,2}/\d{2,4})',
                desc, re.IGNORECASE,
            )
            for dm in date_mentions:
                parts = dm.split("/")
                if len(parts) == 3:
                    mo, dy, yr = parts
                    yr = "20" + yr if len(yr) == 2 else yr
                    try:
                        md = date(int(yr), int(mo), int(dy))
                        if today <= md <= end_date:
                            comm = re.sub(r'\s*-\s*\d+.*$', '', title).strip()
                            key  = (md.isoformat(), comm)
                            results[key] = {
                                "date":   md.isoformat(),
                                "time":   "",
                                "name":   comm,
                                "url":    f"https://www.youtube.com/watch?v={d['id']}",
                                "source": "marathon",
                            }
                    except ValueError:
                        pass
    except Exception as e:
        logger.warning("Marathon YouTube scan failed: %s", e)

    rule_added = 0
    for yr, mo in _months_between(today, end_date):
        for committee, weekday, nth, time_str, cal_url in MARATHON_SCHEDULE:
            meeting_date = nth_weekday(yr, mo, weekday, nth)
            if meeting_date is None or not (today <= meeting_date <= end_date):
                continue
            key = (meeting_date.isoformat(), committee)
            if key not in results:
                results[key] = {
                    "date":   meeting_date.isoformat(),
                    "time":   time_str,
                    "name":   committee,
                    "url":    cal_url,
                    "source": "marathon",
                }
                rule_added += 1

    print(f"  📅  Marathon County rule-based: {rule_added} meetings projected")
    return sorted(results.values(), key=lambda x: (x["date"], x["time"]))


# ── Wausau School Board — BoardBook + rule-based ─────────────────────────────

from config import BOARDBOOK_BASE, BOARDBOOK_ORG

SCHOOL_BOARD_SCHEDULE = [
    ("Regular Board Meeting",            0, 2, "5:00 PM"),
    ("Education & Operations Committee", 0, 4, "5:00 PM"),
]


def fetch_school_board_upcoming(days_ahead: int = 60) -> list[dict]:
    today    = date.today()
    end_date = today + timedelta(days=days_ahead)
    results  = {}

    try:
        r = requests.get(
            f"{BOARDBOOK_BASE}/Public/Organization/{BOARDBOOK_ORG}",
            headers={"User-Agent": "Mozilla/5.0"}, timeout=15,
        )
        rows = re.findall(r"<tr[^>]*>(.*?)</tr>", r.text, re.DOTALL)
        for row in rows:
            id_m = re.search(r"/Public/Agenda/\d+\?meeting=(\d+)", row)
            if not id_m:
                continue
            text = re.sub(r"&[a-z]+;", " ", row)
            text = re.sub(r"<[^>]+>",  " ", text)
            text = re.sub(r"\s+",      " ", text).strip()
            dm = re.search(
                r"(\w+ \d+, \d{4}) at (\d+:\d+ [AP]M) - (.+?)(?:Meeting Type|$)", text
            )
            if not dm:
                continue
            date_str, time_str, name = dm.groups()
            name = name.strip().rstrip(" -")
            try:
                dt = datetime.strptime(date_str, "%B %d, %Y").date()
                if today <= dt <= end_date:
                    mid = id_m.group(1)
                    key = (dt.isoformat(), name[:30])
                    results[key] = {
                        "date":   dt.isoformat(),
                        "time":   time_str,
                        "name":   name,
                        "url":    f"{BOARDBOOK_BASE}/Public/Agenda/{BOARDBOOK_ORG}?meeting={mid}",
                        "source": "school_board",
                    }
            except ValueError:
                pass
        print(f"  📄  School Board BoardBook: {len(results)} posted future meetings")
    except Exception as e:
        logger.warning("BoardBook scrape failed: %s", e)

    rule_added = 0
    for yr, mo in _months_between(today, end_date):
        for name, weekday, nth, time_str in SCHOOL_BOARD_SCHEDULE:
            meeting_date = nth_weekday(yr, mo, weekday, nth)
            if not meeting_date or not (today <= meeting_date <= end_date):
                continue
            key = (meeting_date.isoformat(), name[:30])
            if key not in results:
                results[key] = {
                    "date":   meeting_date.isoformat(),
                    "time":   time_str,
                    "name":   name,
                    "url":    f"{BOARDBOOK_BASE}/Public/Organization/{BOARDBOOK_ORG}",
                    "source": "school_board",
                }
                rule_added += 1

    print(f"  📅  School Board rule-based: {rule_added} additional meetings projected")
    return sorted(results.values(), key=lambda x: (x["date"], x["time"]))


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    from config import setup_logging
    setup_logging()
    print(f"\n🔄  Updating upcoming meetings → {DATA_PATH}")
    print("=" * 60)

    print("\n📡  City of Wausau (CivicClerk API)…")
    wausau = fetch_wausau_upcoming(days_ahead=45)

    print("\n🏘️   Village of Weston (AgendaCenter + rules)…")
    weston = fetch_weston_upcoming(days_ahead=60)

    print("\n🏛️   Marathon County (rule-based schedule)…")
    marathon = fetch_marathon_upcoming(days_ahead=60)

    print("\n🏫  Wausau School Board (BoardBook + rules)…")
    school = fetch_school_board_upcoming(days_ahead=60)

    payload = {
        "marathon":     marathon,
        "wausau":       wausau,
        "weston":       weston,
        "school_board": school,
    }

    DATA_PATH.parent.mkdir(parents=True, exist_ok=True)
    DATA_PATH.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    print(f"\n✅  Wrote {DATA_PATH}")
    print(f"    Marathon:     {len(marathon)}")
    print(f"    Wausau:       {len(wausau)}")
    print(f"    Weston:       {len(weston)}")
    print(f"    School Board: {len(school)}")
    print(f"    Total:        {len(marathon) + len(wausau) + len(weston) + len(school)}")


if __name__ == "__main__":
    main()
