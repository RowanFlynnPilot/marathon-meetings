#!/usr/bin/env python3
"""
generate_digest.py — Render a shareable "this week's meetings" PNG.
====================================================================
Produces digest.png, a newsletter-ready image of upcoming government
meetings for the next 7 days, grouped by day, styled in the WPR design
system. Modeled on the Brewers-tracker digest.

Data source: src/data/upcoming.json (written by update_upcoming.py).
Output:      digest.png (repo root) — copied into dist/ by CI for Pages.

Usage:
    python generate_digest.py [--days N] [--out PATH] [--date YYYY-MM-DD]

--date overrides "today" (useful for testing a specific week).

Pure Pillow (already a dependency) — no headless browser needed. Text is
supersampled 2x and downscaled with LANCZOS for crisp edges.
"""

import argparse
import json
import os
from datetime import date, datetime, timedelta
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

# ── Paths ─────────────────────────────────────────────────────────────────────
ROOT       = Path(__file__).parent
UPCOMING   = ROOT / "src" / "data" / "upcoming.json"
FONT_DIR   = ROOT / "assets" / "fonts"
PUBLIC_DIR = ROOT / "public"

# ── Palette (WPR design system) ───────────────────────────────────────────────
INK      = (26, 18, 9)
CREAM    = (247, 243, 236)
WHITE    = (255, 255, 255)
TEAL_DK  = (62, 132, 122)      # #3e847a — header band
GOLD     = (168, 132, 46)      # section labels + top rule (newsletter house style)
DIVIDER  = (224, 216, 204)     # #E0D8CC
MUTED    = (122, 112, 96)
NAME_INK = (38, 30, 20)

# source_key → (display label, accent color, avatar filename)
SOURCES = {
    "marathon":     ("Marathon County",         (74, 171, 167),  "marathon-avatar.jpg"),
    "wausau":       ("City of Wausau",           (192, 57, 43),   "wausau-avatar.jpg"),
    "weston":       ("Village of Weston",        (58, 107, 67),   "weston-avatar.jpg"),
    "school_board": ("Wausau School Board",      (107, 45, 92),   "school-avatar.jpg"),
    "kronenwetter": ("Village of Kronenwetter",  (139, 105, 20),  "kronenwetter-avatar.jpg"),
    "dc_everest":   ("DC Everest School Board",  (31, 111, 107),  "dc-everest-avatar.jpg"),
}

SCALE  = 2           # supersample factor for crisp text
WIDTH  = 840         # final width (px)
MARGIN = 40

# ── Font helpers ──────────────────────────────────────────────────────────────
def _f(path, size, weight=None):
    fnt = ImageFont.truetype(str(FONT_DIR / path), size * SCALE)
    if weight is not None:
        try:
            fnt.set_variation_by_axes([weight])
        except Exception:
            pass
    return fnt

def bebas(size):            return _f("BebasNeue-Regular.ttf", size)
def lora(size, w=400):      return _f("Lora-VF.ttf", size, w)
def playfair(size, w=700):  return _f("PlayfairDisplay-VF.ttf", size, w)

# ── Drawing helpers ───────────────────────────────────────────────────────────
def _tracked_text(draw, xy, text, font, fill, tracking=0, anchor_left=True):
    """Draw text with letter-spacing (tracking in final px). Returns end x (1x)."""
    x, y = xy[0] * SCALE, xy[1] * SCALE
    tr = tracking * SCALE
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tr
    return x / SCALE

def _text_w(draw, text, font, tracking=0):
    w = sum(draw.textlength(ch, font=font) for ch in text) + tracking * SCALE * max(len(text) - 1, 0)
    return w / SCALE

def _truncate(draw, text, font, max_w):
    if _text_w(draw, text, font) <= max_w:
        return text
    ell = "…"
    while text and _text_w(draw, text + ell, font) > max_w:
        text = text[:-1]
    return (text.rstrip() + ell) if text else ell

def _wrap_lines(draw, text, font, max_w, max_lines=2):
    """Greedy word-wrap into up to max_lines that each fit max_w. If the text
    still overflows, the last line is ellipsized. Returns a list of lines."""
    words = text.split()
    lines, cur, wi = [], "", 0
    while wi < len(words) and len(lines) < max_lines:
        w = words[wi]
        trial = (cur + " " + w).strip()
        if not cur or _text_w(draw, trial, font) <= max_w:
            cur, wi = trial, wi + 1
        else:
            lines.append(cur); cur = ""
    if cur and len(lines) < max_lines:
        lines.append(cur); cur = ""
    if wi < len(words):  # ran out of lines — ellipsize the last one with the rest
        last = lines[-1] if lines else ""
        rest = (last + " " + " ".join(words[wi:])).strip()
        lines[-1:] = [_truncate(draw, rest, font, max_w)]
    return lines or [""]

def _circle_avatar(path, d):
    """Return a circular RGBA avatar of diameter d (1x)."""
    dd = d * SCALE
    try:
        img = Image.open(path).convert("RGBA").resize((dd, dd), Image.LANCZOS)
    except Exception:
        img = Image.new("RGBA", (dd, dd), (230, 226, 218, 255))
    mask = Image.new("L", (dd, dd), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, dd - 1, dd - 1), fill=255)
    img.putalpha(mask)
    return img

# ── Data ──────────────────────────────────────────────────────────────────────
def load_week(today, days=7):
    """Return ordered list of (date, [events]) for days with meetings in window."""
    data = json.loads(UPCOMING.read_text(encoding="utf-8"))
    end = today + timedelta(days=days)
    by_day = {}
    for src, evs in data.items():
        if src not in SOURCES:
            continue
        for e in evs:
            try:
                d = datetime.strptime(e.get("date", ""), "%Y-%m-%d").date()
            except ValueError:
                continue
            if not (today <= d <= end):
                continue
            name = (e.get("name") or "").strip()
            if "CANCEL" in name.upper():
                continue
            by_day.setdefault(d, []).append({
                "source": src, "time": e.get("time", "").strip(), "name": name,
            })
    out = []
    for d in sorted(by_day):
        evs = sorted(by_day[d], key=lambda x: _time_key(x["time"]))
        out.append((d, evs))
    return out

def _time_key(t):
    try:
        return datetime.strptime(t, "%I:%M %p").time()
    except ValueError:
        return datetime.strptime("11:59 PM", "%I:%M %p").time()

# ── Render ────────────────────────────────────────────────────────────────────
def render(today, days=7, out="digest.png"):
    week = load_week(today, days)

    # -- layout constants ------------------------------------------------------
    TOP_RULE   = 5
    HEADER_H   = 74
    SECTION_H  = 46
    DAY_H      = 40
    FOOTER_H   = 62
    GROUP_GAP  = 10
    ROW_TOP    = 26      # name baseline offset within a row
    LINE_H     = 22      # per name line
    ROW_BOT    = 10      # padding below the name block

    # -- pre-pass: wrap each meeting name to <=2 lines & size its row ----------
    _mdraw = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    _nfont = lora(18, 500)
    _tfont = bebas(19)
    _text_x = MARGIN + 38 + 14   # after the 38px avatar
    for _d, evs in week:
        for ev in evs:
            ev["_time_txt"] = ev["time"] or "TIME TBD"
            ev["_time_w"] = _text_w(_mdraw, ev["_time_txt"], _tfont, tracking=1)
            name_max = (WIDTH - MARGIN - ev["_time_w"] - 18) - _text_x
            ev["_lines"] = _wrap_lines(_mdraw, ev["name"], _nfont, name_max, max_lines=2)
            ev["_row_h"] = ROW_TOP + len(ev["_lines"]) * LINE_H + ROW_BOT

    body_h = 0
    for _d, evs in week:
        body_h += DAY_H + sum(ev["_row_h"] for ev in evs) + GROUP_GAP
    if not week:
        body_h = 90
    height = TOP_RULE + HEADER_H + SECTION_H + body_h + FOOTER_H + 18

    W, H = WIDTH * SCALE, height * SCALE
    img = Image.new("RGB", (W, H), WHITE)
    d = ImageDraw.Draw(img)

    def rect(x0, y0, x1, y1, fill):
        d.rectangle([x0 * SCALE, y0 * SCALE, x1 * SCALE, y1 * SCALE], fill=fill)

    # -- gold top rule + header band ------------------------------------------
    rect(0, 0, WIDTH, TOP_RULE, GOLD)
    rect(0, TOP_RULE, WIDTH, TOP_RULE + HEADER_H, TEAL_DK)

    # WPR logo (left) in the band
    band_cy = TOP_RULE + HEADER_H / 2
    logo_d = 46
    logo = _circle_avatar(PUBLIC_DIR / "wpr-logo.jpg", logo_d)
    img.paste(logo, (int(MARGIN * SCALE), int((band_cy - logo_d / 2) * SCALE)), logo)

    # centered title
    title = "CENTRAL WISCONSIN MEETING TRACKER"
    tf = bebas(30)
    tw = _text_w(d, title, tf, tracking=3)
    _tracked_text(d, ((WIDTH - tw) / 2, band_cy - 16), title, tf, WHITE, tracking=3)

    # -- section label: date range --------------------------------------------
    y = TOP_RULE + HEADER_H + 26
    start_lbl = today.strftime("%b %-d") if os.name != "nt" else today.strftime("%b %d").replace(" 0", " ")
    end_d = week[-1][0] if week else today + timedelta(days=days)
    end_lbl = end_d.strftime("%b %d").replace(" 0", " ")
    section = f"MEETINGS THIS WEEK  ·  {start_lbl.upper()} – {end_lbl.upper()}"
    _tracked_text(d, (MARGIN, y), section, bebas(17), GOLD, tracking=2)
    y = TOP_RULE + HEADER_H + SECTION_H

    # -- day groups ------------------------------------------------------------
    if not week:
        _msg = "No public meetings scheduled in the week ahead."
        d.text((MARGIN * SCALE, y * SCALE), _msg, font=lora(18, 400), fill=MUTED)

    for gi, (day, evs) in enumerate(week):
        # divider above each day group (except the first)
        if gi > 0:
            rect(MARGIN, y + 2, WIDTH - MARGIN, y + 2 + 1, DIVIDER)
        # day header
        day_lbl = day.strftime("%A  ·  %B %d").replace(" 0", " ").upper()
        _tracked_text(d, (MARGIN, y + 14), day_lbl, bebas(16), INK, tracking=1.5)
        y += DAY_H

        for ev in evs:
            label, accent, avatar_file = SOURCES[ev["source"]]
            row_h  = ev["_row_h"]
            row_cy = y + row_h / 2

            # avatar (vertically centered in the row)
            av_d = 38
            av = _circle_avatar(PUBLIC_DIR / avatar_file, av_d)
            img.paste(av, (int(MARGIN * SCALE), int((row_cy - av_d / 2) * SCALE)), av)

            text_x = MARGIN + av_d + 14

            # time (right-aligned, centered on the row)
            tfont = bebas(19)
            _tracked_text(d, (WIDTH - MARGIN - ev["_time_w"], row_cy - 11), ev["_time_txt"],
                          tfont, TEAL_DK, tracking=1)

            # entity label (source color, small caps)
            _tracked_text(d, (text_x, y + 9), label.upper(), bebas(12), accent, tracking=1.2)

            # meeting name (serif) — up to two wrapped lines, full title shown
            nfont = lora(18, 500)
            for i, line in enumerate(ev["_lines"]):
                d.text((text_x * SCALE, (y + ROW_TOP + i * LINE_H) * SCALE),
                       line, font=nfont, fill=NAME_INK)

            y += row_h
        y += GROUP_GAP

    # -- footer ----------------------------------------------------------------
    fy = height - FOOTER_H
    rect(MARGIN, fy, WIDTH - MARGIN, fy + 1, DIVIDER)
    _tracked_text(d, (MARGIN, fy + 16), "WAUSAUPILOTANDREVIEW.COM", bebas(14), GOLD, tracking=1.5)
    sub = "Central Wisconsin Meeting Tracker"
    d.text((MARGIN * SCALE, (fy + 34) * SCALE), sub, font=lora(12, 400), fill=MUTED)
    upd = f"UPDATED {today.strftime('%b %d').replace(' 0', ' ').upper()}"
    uw = _text_w(d, upd, bebas(13), tracking=1)
    _tracked_text(d, (WIDTH - MARGIN - uw, fy + 17), upd, bebas(13), MUTED, tracking=1)

    # -- subtle outer card border ---------------------------------------------
    d.rectangle([0, 0, W - SCALE, H - SCALE], outline=DIVIDER, width=SCALE)

    # -- downscale for crisp anti-aliased output -------------------------------
    final = img.resize((WIDTH, height), Image.LANCZOS)
    final.save(out, "PNG")
    print(f"[digest] wrote {out}  ({WIDTH}x{height})  {sum(len(e) for _,e in week)} meetings / {len(week)} day(s)")
    return out


def main():
    ap = argparse.ArgumentParser(description="Render the weekly meetings digest PNG.")
    ap.add_argument("--days", type=int, default=7)
    ap.add_argument("--out", default="digest.png")
    ap.add_argument("--date", default=None, help="Override today (YYYY-MM-DD) for testing")
    args = ap.parse_args()
    today = datetime.strptime(args.date, "%Y-%m-%d").date() if args.date else date.today()
    render(today, days=args.days, out=args.out)


if __name__ == "__main__":
    main()
