#!/usr/bin/env python3
"""
generate_ics.py — Emit a subscribable iCalendar feed of upcoming meetings.
===========================================================================
Reads src/data/upcoming.json and writes public/meetings.ics, so readers can
subscribe once (webcal) and see all six governments' meetings in their phone
or desktop calendar.

Design notes:
  - Pure stdlib, no API calls; runs every CI cycle.
  - Deterministic output: UIDs hash from (source, date, name) and DTSTAMP
    derives from the event date — the file only changes when the data does,
    keeping CI commits quiet.
  - Times are local (America/Chicago) with a proper VTIMEZONE block so DST
    is handled by the subscriber's client. Events without a posted time are
    all-day events.

Usage:
    python generate_ics.py [--out public/meetings.ics] [--days N]
"""

import argparse
import hashlib
import json
from datetime import date, datetime, timedelta
from pathlib import Path

from config import UPCOMING_JSON

SOURCE_LABELS = {
    "marathon":     "Marathon County",
    "wausau":       "City of Wausau",
    "weston":       "Village of Weston",
    "school_board": "Wausau School Board",
    "kronenwetter": "Village of Kronenwetter",
    "dc_everest":   "DC Everest School Board",
}

DEFAULT_DURATION_MIN = 90

# Standard America/Chicago VTIMEZONE (CST/CDT, current US DST rules).
VTIMEZONE = """BEGIN:VTIMEZONE
TZID:America/Chicago
BEGIN:DAYLIGHT
TZOFFSETFROM:-0600
TZOFFSETTO:-0500
TZNAME:CDT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:-0500
TZOFFSETTO:-0600
TZNAME:CST
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE"""


def _escape(s: str) -> str:
    """RFC 5545 text escaping."""
    return (s.replace("\\", "\\\\").replace(";", "\\;")
             .replace(",", "\\,").replace("\n", "\\n"))


def _fold(line: str) -> str:
    """Fold lines >75 octets per RFC 5545 (simple char-based fold)."""
    if len(line) <= 75:
        return line
    out, cur = [], line
    while len(cur) > 75:
        out.append(cur[:75])
        cur = " " + cur[75:]
    out.append(cur)
    return "\r\n".join(out)


def build_events(days_ahead: int):
    data = json.loads(Path(UPCOMING_JSON).read_text(encoding="utf-8"))
    today = date.today()
    end = today + timedelta(days=days_ahead)
    events = []
    for src, evs in data.items():
        label = SOURCE_LABELS.get(src, src)
        for e in evs:
            try:
                d = datetime.strptime(e.get("date", ""), "%Y-%m-%d").date()
            except ValueError:
                continue
            if not (today <= d <= end):
                continue
            name = (e.get("name") or "Meeting").strip()
            if "CANCEL" in name.upper():
                continue
            uid_src = f"{src}|{e.get('date')}|{name.lower()}"
            uid = hashlib.sha1(uid_src.encode()).hexdigest()[:20] + "@marathon-meetings"
            start_dt = None
            if e.get("time"):
                try:
                    t = datetime.strptime(e["time"].strip(), "%I:%M %p").time()
                    start_dt = datetime.combine(d, t)
                except ValueError:
                    pass
            events.append({
                "uid": uid, "date": d, "start": start_dt,
                "summary": f"{label}: {name}",
                "url": e.get("url") or "",
            })
    events.sort(key=lambda x: (x["date"], x["start"] or datetime.min))
    return events


def render(events) -> str:
    lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Wausau Pilot & Review//Central Wisconsin Meeting Tracker//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "X-WR-CALNAME:Central Wisconsin Government Meetings",
        "X-WR-CALDESC:Upcoming public meetings for Marathon County\\, Wausau\\, "
        "Weston\\, Kronenwetter\\, and area school boards - from the Wausau "
        "Pilot & Review Meeting Tracker.",
        "X-WR-TIMEZONE:America/Chicago",
        "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
    ]
    lines.extend(VTIMEZONE.split("\n"))
    for ev in events:
        lines.append("BEGIN:VEVENT")
        lines.append(f"UID:{ev['uid']}")
        # Deterministic DTSTAMP (event date at midnight UTC) keeps the file
        # byte-identical between runs when nothing changed.
        lines.append(f"DTSTAMP:{ev['date'].strftime('%Y%m%d')}T000000Z")
        if ev["start"]:
            dtend = ev["start"] + timedelta(minutes=DEFAULT_DURATION_MIN)
            lines.append(f"DTSTART;TZID=America/Chicago:{ev['start'].strftime('%Y%m%dT%H%M%S')}")
            lines.append(f"DTEND;TZID=America/Chicago:{dtend.strftime('%Y%m%dT%H%M%S')}")
        else:
            lines.append(f"DTSTART;VALUE=DATE:{ev['date'].strftime('%Y%m%d')}")
        lines.append(f"SUMMARY:{_escape(ev['summary'])}")
        if ev["url"]:
            lines.append(f"URL:{_escape(ev['url'])}")
        lines.append(
            "DESCRIPTION:Agendas\\, documents and meeting summaries: "
            "https://wausaupilotandreview.com/central-wisconsin-meeting-tracker/")
        lines.append("END:VEVENT")
    lines.append("END:VCALENDAR")
    # Fold every line >75 octets at output time (RFC 5545 §3.1).
    return "\r\n".join(_fold(l) for l in lines) + "\r\n"


def main():
    ap = argparse.ArgumentParser(description="Render the meetings .ics feed.")
    ap.add_argument("--out", default="public/meetings.ics")
    ap.add_argument("--days", type=int, default=60)
    args = ap.parse_args()

    events = build_events(args.days)
    Path(args.out).write_text(render(events), encoding="utf-8", newline="")
    print(f"[ics] wrote {args.out} — {len(events)} event(s), next {args.days} days")


if __name__ == "__main__":
    main()
