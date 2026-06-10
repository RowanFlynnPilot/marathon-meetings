# CLAUDE.md — Central Wisconsin Meeting Tracker

## Project Overview
Local government meeting tracker for Wausau Pilot & Review (wausaupilotandreview.com), a nonprofit newsroom covering central Wisconsin and Marathon County. Scrapes YouTube channels and agenda platforms for government meetings, generates AI summaries via the Anthropic API, and publishes a React dashboard to GitHub Pages at `rowanflynnpilot.github.io/marathon-meetings`.

## Tech Stack
- **Frontend:** React (Vite), deployed to GitHub Pages
- **Scrapers:** Python 3.12 (yt-dlp, requests, beautifulsoup4, anthropic SDK)
- **CI/CD:** GitHub Actions — runs every 4 hours (00:00, 04:00, 08:00, 12:00, 16:00, 20:00 UTC), also manual dispatch with backfill option
- **Data flow:** Python scrapers → JSON summaries → inject into JSX → Vite build → deploy

## Commands
- `npm install` — install Node dependencies
- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`
- `python marathon_meeting_summarizer.py` — check for new meetings (incremental)
- `python marathon_meeting_summarizer.py --backfill` — process all historical meetings
- `python marathon_meeting_summarizer.py --source wausau` — single source only
- `python marathon_meeting_summarizer.py --url URL` — process a specific YouTube video
- `python inject_meetings.py` — read summaries and inject into the MEETINGS array in JSX
- `python update_upcoming.py` — refresh upcoming meeting schedules in JSX

## GitHub Actions Pipeline Order
1. `marathon_meeting_summarizer.py` → `summaries/*.json` + `summaries/*_summary.json` + `summaries/*_votes.json`
2. `inject_transcript.py` (per file in `transcripts/`) → overrides agenda-only summaries with full-transcript ones
3. `inject_meetings.py` → writes `src/data/meetings.json` (pruned to MAX_MEETINGS, newest first)
4. `update_upcoming.py` → writes `src/data/upcoming.json` (keyed by source)
5. `npm run build` → `dist/`
6. Commit updated data files, deploy to Pages

## Data Sources (4 jurisdictions)

| Source | Key | YouTube Channel | Agenda Platform |
|---|---|---|---|
| Marathon County | `marathon` | `@marathoncountyboardmeetings` | marathoncounty.gov |
| City of Wausau | `wausau` | `@CityofWausauMeetings` | CivicClerk (wausauwi.portal.civicclerk.com) |
| Village of Weston | `weston` | `@WestonWI` | AgendaCenter (westonwi.gov/agendacenter) |
| Wausau School Board | `school_board` | channel `UCw63l8UWL_hpDtUy9IBIVvw` ("Wausau School District Board of Education" — NOT the empty `@wausauschoolboard`) | BoardBook (meetings.boardbook.org, org 1360) |

School board meetings are created from BoardBook (`bb_` IDs, agenda-only). The district posts recordings to YouTube days-to-weeks later; the `[sb-video]` upgrade pass in `marathon_meeting_summarizer.py` matches recordings to BoardBook entries by date + meeting type and re-summarizes from the transcript (window: `SCHOOL_BOARD_VIDEO_DAYS`, default 45).

## Upcoming Meeting Schedule Logic
- **Marathon County:** Rule-based (committee schedules follow nth-weekday patterns)
- **City of Wausau:** CivicClerk OData API for real posted meetings
- **Village of Weston:** AgendaCenter HTML scrape + rule-based fallback
- **School Board:** BoardBook scrape + rule-based (2nd Monday = Regular, 4th Monday = Ed/Op Committee)

## Key Architecture Notes
- YouTube audio downloads are blocked from cloud IPs (GitHub Actions); the most reliable fallback is pasting transcripts from the YouTube app directly or using yt-dlp for transcript extraction (not audio)
- `src/data/meetings.json` is the single source of truth for displayed past meetings; `inject_meetings.py` rewrites it newest-first, pruned to MAX_MEETINGS (30). The JSX imports it directly via `import MEETINGS from "./src/data/meetings.json"`
- `src/data/upcoming.json` holds upcoming meetings keyed by source (`marathon`, `wausau`, `weston`, `school_board`). `update_upcoming.py` rewrites the whole file each run
- State files: `processed_meetings.json` (scraper state — what's been summarized) and `injected_meetings.json` (which summaries have already been injected into JSX). Both files persist between CI runs and are committed back to the repo by the workflow.
- Summaries stored in `summaries/` directory as `{video_id}_summary.json` and `{video_id}_votes.json` sidecars

## WPR Design System (must follow)
- **Brand teal:** `#3e847a` (dark), `#4aaba7` (primary, used as TEAL constant in JSX), `#3e9e9a` (alt)
- **Display / impact text:** Bebas Neue (uppercase labels, badges, section heads — the dominant display face)
- **Headlines:** Playfair Display (long-form titles and the masthead wordmark)
- **Body text:** Lora (running prose in meeting overviews and discussion blocks)
- **Data / timestamps / agenda code:** plain `monospace` stack (system mono — Consolas, Menlo, etc.)
- **Palette:** Cream (`#F7F3EC`) / ink black (`#1A1209`) newspaper aesthetic
- **Divider rules:** `#E0D8CC`
- **WPR logo:** Circular badge JPEG (despite .png extension) — served as a static file from `/public/`

## Committee Color Map
Committees have assigned badge colors for visual differentiation. Existing assignments live in COMMITTEE_STYLES in the JSX. When adding new committees, pick a dark, muted tone that contrasts with white text and doesn't duplicate existing colors.

## Source Accent Colors
- Marathon County: teal (`#4aaba7`)
- City of Wausau: red (`#C0392B`)
- Village of Weston: forest green (`#3A6B43`)
- Wausau School Board: plum (`#6B2D5C`)

## Conventions
- All Python scripts use `argparse` and support `--source` and `--dry-run` flags where applicable
- Secrets: `ANTHROPIC_API_KEY` stored as GitHub repo secret
- JSX uses inline styles, not CSS modules or Tailwind
- Keep the React component as a single file (`marathon-meetings.jsx` in `src/`)
- Commit messages from Actions use format: `chore: update meetings data [skip ci]`
- Dates in MEETINGS entries use human-readable format ("March 12, 2026") plus machine-sortable `shortDate` ("MAR 12")

## Common Tasks
- **Add a new jurisdiction:** Add a channel/scrape config to the summarizer, create an UPCOMING array in JSX, add fetch logic to `update_upcoming.py`, add a SOURCE_CONFIG entry in the frontend
- **Fix a broken scraper:** Check if the upstream site changed HTML structure; CivicClerk and BoardBook APIs are more stable than HTML scraping
- **Update committee colors:** Edit COMMITTEE_STYLES object in the JSX
- **Manual meeting processing:** Use `--url` flag with a specific YouTube URL
