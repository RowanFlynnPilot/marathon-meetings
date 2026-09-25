#!/usr/bin/env python3
"""
cost_ledger.py — Per-call Claude API cost ledger and spending alarm.

Every Claude call in this repo goes through
marathon_meeting_summarizer.call_anthropic_with_retry, which passes each
response's token usage to record(). In CI that appends to costs.json
(committed; last 120 days), the only per-call record of what the pipeline
spends. Before Sept 2026 spend was visible only on the monthly bill, which is
how June's re-summarization loop ran for weeks.

After each run the workflow calls `--check`: when the last 24 hours exceed a
threshold it opens one "💸 Unusual Claude API spend" issue, which closes itself
once spend is back to normal. A one-off recovery (a large transcript backlog)
is expected to trip it; a trip with no such event is the signature of a leak.

Usage:
  python cost_ledger.py --summary
  python cost_ledger.py --check --print-status --markdown spend_body.md
"""

import argparse
import json
import os
import sys
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path

# (input, output) USD per million tokens, matched by model-ID prefix so dated
# snapshot IDs resolve. Anthropic list prices as of Sept 2026.
PRICES = {
    "claude-sonnet-4-6": (3.00, 15.00),
    "claude-haiku-4-5":  (1.00, 5.00),
}
# Unknown models are priced at the most expensive known rate, so switching
# models can never make the alarm under-count.
_FALLBACK_PRICE = max(PRICES.values())

KEEP_DAYS = 120


def ledger_path() -> Path:
    # Only CI writes the committed ledger. Local runs share a working copy with
    # the residential fetcher, so they log to an ignored file rather than leave
    # local changes that collide with CI's commits.
    default = "costs.json" if os.environ.get("GITHUB_ACTIONS") else "logs/costs-local.json"
    return Path(os.environ.get("COST_LEDGER", default))


def _price(model: str) -> tuple[float, float]:
    for prefix, price in PRICES.items():
        if model.startswith(prefix):
            return price
    return _FALLBACK_PRICE


def _load(path: Path) -> list[dict]:
    if not path.exists():
        return []
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return []


def _save(path: Path, rows: list[dict]) -> None:
    # One entry per line keeps the committed file's diffs readable.
    body = ",\n".join(json.dumps(r, separators=(",", ":")) for r in rows)
    path.write_text("[\n" + body + "\n]\n", encoding="utf-8")


def record(model: str, usage, script: str | None = None) -> None:
    """Append one call to the ledger. Never raises: a ledger problem must not
    cost us a summary."""
    try:
        inp = getattr(usage, "input_tokens", 0) or 0
        out = getattr(usage, "output_tokens", 0) or 0
        price_in, price_out = _price(model)
        entry = {
            "ts": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "script": script or Path(sys.argv[0]).stem,
            "model": model,
            "input_tokens": inp,
            "output_tokens": out,
            "usd": round((inp * price_in + out * price_out) / 1e6, 5),
        }
        path = ledger_path()
        path.parent.mkdir(parents=True, exist_ok=True)
        cutoff = (datetime.now(timezone.utc) - timedelta(days=KEEP_DAYS)).isoformat()
        rows = [r for r in _load(path) if r.get("ts", "") >= cutoff]
        rows.append(entry)
        _save(path, rows)
    except Exception as e:  # noqa: BLE001
        print(f"  [warn] cost ledger: {e}", file=sys.stderr)


def _window(rows: list[dict], hours: int) -> list[dict]:
    cutoff = (datetime.now(timezone.utc) - timedelta(hours=hours)).isoformat()
    return [r for r in rows if r.get("ts", "") >= cutoff]


def _usd(rows: list[dict]) -> float:
    return sum(r.get("usd", 0) for r in rows)


def _breakdown(rows: list[dict]) -> list[tuple[str, str, int, float]]:
    agg = defaultdict(lambda: [0, 0.0])
    for r in rows:
        k = (r.get("script", "?"), r.get("model", "?"))
        agg[k][0] += 1
        agg[k][1] += r.get("usd", 0)
    return sorted(((s, m, n, v) for (s, m), (n, v) in agg.items()), key=lambda x: -x[3])


def render_markdown(day: list[dict], week: list[dict], max_usd: float, max_calls: int) -> str:
    lines = [
        f"The pipeline made **{len(day)} Claude call(s) costing ${_usd(day):.2f}** in the "
        f"last 24 hours (alarm thresholds: ${max_usd:.2f} or {max_calls} calls). "
        f"Normal is well under $1/day.",
        "",
        "| Script | Model | Calls | Cost |",
        "|---|---|---|---|",
    ]
    lines += [f"| {s} | {m} | {n} | ${v:.2f} |" for s, m, n, v in _breakdown(day)]
    top = sorted(day, key=lambda r: -r.get("usd", 0))[:5]
    lines += ["", "Costliest calls:", ""]
    lines += [f"- {r['ts']} {r.get('script')} {r.get('model')}: {r.get('input_tokens', 0):,} in / "
              f"{r.get('output_tokens', 0):,} out = ${r.get('usd', 0):.3f}" for r in top]
    lines += [
        "",
        f"Last 7 days: {len(week)} calls, ${_usd(week):.2f}.",
        "",
        "**Expected causes:** a recovery run ingesting a transcript backlog, or a backfill "
        "dispatch. **Leak signature:** the same meetings summarized run after run: look "
        "for repeated `Summarizing from transcript` lines for unchanged transcripts in the "
        "`Override agenda-only meetings with transcripts` step (June 2026's bug). "
        "Per-call detail is in `costs.json`. This issue closes itself once the last 24 "
        "hours are back under the thresholds.",
    ]
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description="Claude API cost ledger and spending alarm.")
    parser.add_argument("--summary", action="store_true", help="print 24h / 7d / 30d totals")
    parser.add_argument("--check", action="store_true", help="evaluate the spending alarm")
    parser.add_argument("--max-day-usd", type=float,
                        default=float(os.environ.get("SPEND_ALARM_DAY_USD", "2.00")))
    parser.add_argument("--max-day-calls", type=int,
                        default=int(os.environ.get("SPEND_ALARM_DAY_CALLS", "40")))
    parser.add_argument("--markdown", help="write an issue body here when the alarm trips")
    parser.add_argument("--print-status", action="store_true",
                        help="print 'TRIPPED <usd>' or 'OK <usd>' for the last 24h")
    args = parser.parse_args()

    rows = _load(ledger_path())
    day, week = _window(rows, 24), _window(rows, 24 * 7)

    if args.summary:
        for label, hours in (("24h", 24), ("7d", 24 * 7), ("30d", 24 * 30)):
            w = _window(rows, hours)
            print(f"{label:>4}: {len(w):4d} calls  ${_usd(w):.2f}", file=sys.stderr)
        for s, m, n, v in _breakdown(_window(rows, 24 * 30)):
            print(f"      {s:28s} {m:28s} {n:4d} calls  ${v:.2f}", file=sys.stderr)

    if args.check:
        tripped = _usd(day) > args.max_day_usd or len(day) > args.max_day_calls
        if tripped and args.markdown:
            Path(args.markdown).write_text(
                render_markdown(day, week, args.max_day_usd, args.max_day_calls), encoding="utf-8")
        if args.print_status:
            print(f"{'TRIPPED' if tripped else 'OK'} {_usd(day):.2f}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
