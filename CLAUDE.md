# CLAUDE.md — Central Wisconsin Meeting Tracker

## Project Overview
Local government meeting tracker for Wausau Pilot & Review (wausaupilotandreview.com), a nonprofit newsroom covering central Wisconsin and Marathon County. Scrapes YouTube channels and agenda platforms for government meetings, generates AI summaries via the Anthropic API, and publishes a React dashboard to GitHub Pages at `rowanflynnpilot.github.io/marathon-meetings`.

## Tech Stack
- **Frontend:** React (Vite), deployed to GitHub Pages
- **Scrapers:** Python 3.12 (yt-dlp, requests, beautifulsoup4, anthropic SDK)
- **CI/CD:** GitHub Actions — runs every 4 hours, also manual dispatch with backfill option
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
1. `marathon_meeting_summarizer.py` → `summaries/*.json`
2. `inject_meetings.py` → updates MEETINGS array in JSX
3. `update_upcoming.py` → updates UPCOMING arrays in JSX
4. `npm run build`
5. Commit updated data files, deploy to Pages

## Data Sources (4 jurisdictions)

| Source | Key | YouTube Channel | Agenda Platform |
|---|---|---|---|
| Marathon County | `marathon` | `@marathoncountyboardmeetings` | marathoncounty.gov |
| City of Wausau | `wausau` | `@CityofWausauMeetings` | CivicClerk (wausauwi.portal.civicclerk.com) |
| Village of Weston | `weston` | — | AgendaCenter (westonwi.gov/agendacenter) |
| Wausau School Board | `school_board` | — | BoardBook (meetings.boardbook.org, org 1360) |

## Upcoming Meeting Schedule Logic
- **Marathon County:** Rule-based (committee schedules follow nth-weekday patterns)
- **City of Wausau:** CivicClerk OData API for real posted meetings
- **Village of Weston:** AgendaCenter HTML scrape + rule-based fallback
- **School Board:** BoardBook scrape + rule-based (2nd Monday = Regular, 4th Monday = Ed/Op Committee)

## Key Architecture Notes
- YouTube audio downloads are blocked from cloud IPs (GitHub Actions); the most reliable fallback is pasting transcripts from the YouTube app directly or using yt-dlp for transcript extraction (not audio)
- The MEETINGS array in the JSX file is the single source of truth for displayed past meetings; `inject_meetings.py` prepends new entries and prunes to MAX_MEETINGS (30)
- Upcoming meetings are stored in separate arrays per source: `WAUSAU_UPCOMING`, `WESTON_UPCOMING`, `MARATHON_UPCOMING`, `SCHOOL_BOARD_UPCOMING`
- State files: `processed_meetings.json` (scraper state), `injected_meetings.json` (injection tracking)
- Summaries stored in `summaries/` directory as `{video_id}_summary.json` and `{video_id}_votes.json` sidecars

## WPR Design System (must follow)
- **Brand teal:** `#3e847a` (dark), `#4aaba7` (primary), `#3e9e9a` (alt)
- **Headlines:** Playfair Display
- **Body text:** Source Sans 3
- **Data/code:** JetBrains Mono
- **Palette:** Cream (`#F7F3EC`) / ink black (`#1A1209`) newspaper aesthetic
- **Divider rules:** `#E0D8CC`
- **WPR logo:** Circular badge JPEG (despite .png extension) — embed as base64 data URI

## Committee Color Map
Committees have assigned badge colors for visual differentiation. Existing assignments live in COMMITTEE_STYLES in the JSX. When adding new committees, pick a dark, muted tone that contrasts with white text and doesn't duplicate existing colors.

## Source Accent Colors
- Marathon County: teal (`#4aaba7`)
- City of Wausau: red (`#C0392B`)
- Village of Weston: use a distinct accent (not yet assigned — suggest dark blue or forest green)
- School Board: use a distinct accent (not yet assigned — suggest warm gold or plum)

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
