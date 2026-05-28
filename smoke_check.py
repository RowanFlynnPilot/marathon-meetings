#!/usr/bin/env python3
"""Smoke test for the upstream data sources.

Runs in CI before the real scraper so schema breakage (CivicClerk renaming a
field, BoardBook restructuring HTML, Weston moving AgendaCenter, etc.) surfaces
immediately instead of after a silent zero-result run.

Each check is small: one HTTP request per source, with the minimum assertion
that proves the contract we depend on still holds. Failures print a clear
message and the script exits non-zero so CI fails loudly.

Run locally:
    python smoke_check.py

Run in CI:
    python smoke_check.py --strict   # fail on any source error
    python smoke_check.py            # warn-only (default)
"""

import argparse
import logging
import re
import sys
from datetime import date, timedelta

import requests

from config import setup_logging

logger = logging.getLogger(__name__)


HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; marathon-meetings-smoke/1.0)",
    "Accept": "application/json, text/html, */*",
}


class CheckResult:
    def __init__(self, name: str):
        self.name = name
        self.ok = True
        self.detail = ""
        self.errors: list[str] = []

    def fail(self, msg: str):
        self.ok = False
        self.errors.append(msg)

    def __str__(self):
        status = "OK  " if self.ok else "FAIL"
        head = f"  [{status}] {self.name}"
        if self.detail:
            head += f" — {self.detail}"
        if self.errors:
            head += "\n        " + "\n        ".join(self.errors)
        return head


# ── Source checks ────────────────────────────────────────────────────────────

def check_wausau_civicclerk() -> CheckResult:
    """CivicClerk OData API returns events with the fields update_upcoming.py uses."""
    r = CheckResult("Wausau · CivicClerk OData API")
    today = date.today()
    end   = today + timedelta(days=30)
    url = (
        "https://wausauwi.api.civicclerk.com/v1/Events"
        f"?%24filter=eventDate%20ge%20{today}T00%3A00%3A00Z"
        f"%20and%20eventDate%20le%20{end}T23%3A59%3A59Z"
        "%20and%20isDeleted%20eq%20false&%24top=5"
    )
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
    except requests.RequestException as e:
        r.fail(f"network error: {e}")
        return r
    if resp.status_code != 200:
        r.fail(f"HTTP {resp.status_code}")
        return r
    try:
        data = resp.json()
    except ValueError:
        r.fail("response not JSON")
        return r
    events = data.get("value") or []
    if not events:
        r.fail("zero events returned in 30-day window (API change or off-hours)")
        return r
    # Each event must have eventDate, eventName, id (the fields we read)
    missing = [f for f in ("eventDate", "eventName", "id") if f not in events[0]]
    if missing:
        r.fail(f"event missing required field(s): {missing}")
        return r
    r.detail = f"{len(events)} events; fields look right"
    return r


def check_weston_agendacenter() -> CheckResult:
    """AgendaCenter HTML still has <h2> committee headings and ViewFile/Agenda links."""
    r = CheckResult("Weston · westonwi.gov AgendaCenter")
    try:
        resp = requests.get(
            "https://www.westonwi.gov/agendacenter",
            headers=HEADERS, timeout=15,
        )
    except requests.RequestException as e:
        r.fail(f"network error: {e}")
        return r
    if resp.status_code != 200:
        r.fail(f"HTTP {resp.status_code}")
        return r
    if "<h2" not in resp.text.lower():
        r.fail("no <h2> tags found (AgendaCenter HTML structure changed?)")
        return r
    agenda_links = re.findall(r'/AgendaCenter/ViewFile/Agenda/_\d+', resp.text)
    r.detail = f"page loaded; {len(agenda_links)} agenda link(s) visible"
    if not agenda_links:
        # Not strictly a failure — between meeting cycles there may be no posted
        # future agendas — but it's worth surfacing.
        r.detail += " (no posted agendas; will fall back to rule-based schedule)"
    return r


def check_boardbook_org() -> CheckResult:
    """BoardBook org page still serves meeting rows with the date/name pattern."""
    r = CheckResult("School Board · meetings.boardbook.org")
    try:
        resp = requests.get(
            "https://meetings.boardbook.org/Public/Organization/1360",
            headers=HEADERS, timeout=15,
        )
    except requests.RequestException as e:
        r.fail(f"network error: {e}")
        return r
    if resp.status_code != 200:
        r.fail(f"HTTP {resp.status_code}")
        return r
    if "/Public/Agenda/" not in resp.text:
        r.fail("no /Public/Agenda/ links (BoardBook HTML may have changed)")
        return r
    rows = re.findall(r"<tr[^>]*>(.*?)</tr>", resp.text, re.DOTALL)
    r.detail = f"{len(rows)} <tr> rows; agenda links present"
    return r


# Marathon County is intentionally not checked: marathoncounty.gov blocks
# server IPs (returns 403 to anything that doesn't look like a residential
# browser). The pipeline never scrapes it — Marathon's upcoming meetings come
# from a rule-based schedule and the calendar URL is just a destination link
# in the UI footer. A failed reachability check here would always be a false
# positive.


def check_anthropic_key_present() -> CheckResult:
    """ANTHROPIC_API_KEY is set; the summarizer can't run without it."""
    import os
    r = CheckResult("Secret · ANTHROPIC_API_KEY")
    if not os.environ.get("ANTHROPIC_API_KEY"):
        r.fail("env var not set (summarizer will error)")
        return r
    r.detail = "set"
    return r


# ── Driver ────────────────────────────────────────────────────────────────────

CHECKS = [
    check_wausau_civicclerk,
    check_weston_agendacenter,
    check_boardbook_org,
    check_anthropic_key_present,
]


def main():
    setup_logging()
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--strict", action="store_true",
                        help="Exit non-zero on any failure (default: warn only).")
    parser.add_argument("--skip-secret", action="store_true",
                        help="Skip the ANTHROPIC_API_KEY check (useful locally).")
    args = parser.parse_args()

    print("\nSmoke test — upstream data sources")
    print("=" * 60)

    results: list[CheckResult] = []
    for check in CHECKS:
        if args.skip_secret and check is check_anthropic_key_present:
            continue
        results.append(check())
        print(results[-1])

    failed = [r for r in results if not r.ok]
    print()
    print("=" * 60)
    if not failed:
        print(f"All {len(results)} checks passed.")
        return 0

    print(f"{len(failed)} check(s) failed:")
    for r in failed:
        print(f"  - {r.name}")
    if args.strict:
        return 1
    print("(non-strict mode; exiting 0 — pass --strict in CI to fail builds)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
