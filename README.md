# Marathon Meetings

> Central Wisconsin government meeting tracker for [Wausau Pilot & Review](https://wausaupilotandreview.com).

**Live dashboard:** [rowanflynnpilot.github.io/marathon-meetings](https://rowanflynnpilot.github.io/marathon-meetings)

## What it does

Follows six Marathon County boards and councils: each agenda before the meeting, then a plain-language summary with the votes once the recording, audio or official minutes are available. Summaries are drafted by software from the public record, labeled as such, and linked to the record. Published free as an embeddable dashboard on the Wausau Pilot & Review site.

Summaries name officials. A resident who speaks at public comment is named only when the record states the name clearly, never with a home address; students are not named. Every summary carries a "Request a correction" link, and fixes are logged in `corrections.json`.

## Coverage

| Board or council        | Recordings                          | Agendas and minutes                              |
| ----------------------- | ----------------------------------- | ------------------------------------------------ |
| Marathon County         | YouTube `@marathoncountyboardmeetings` | marathoncounty.gov                            |
| City of Wausau          | YouTube `@CityofWausauMeetings`     | CivicClerk (wausauwi.portal.civicclerk.com)      |
| Village of Weston       | YouTube `@WestonWI`                 | AgendaCenter (westonwi.gov/agendacenter)         |
| Wausau School Board     | YouTube (district channel)          | BoardBook (meetings.boardbook.org, org 1360)     |
| Village of Kronenwetter | SoundCloud audio                    | Municode Meetings (kronenwetter-wi.municodemeetings.com) |
| D.C. Everest School Board | YouTube `@dceverestschoolboard2202` | BoardBook (meetings.boardbook.org, org 1315)   |
| Mosinee School Board    | none read (minutes instead)         | Diligent Community (mosineeschools.community.highbond.com) |
| City of Mosinee         | none read (minutes instead)         | Granicus IQM2 (mosineecitywi.iqm2.com)           |
| Village of Rothschild   | none posted (minutes instead)       | village website (rothschildwi.com)               |
| Village of Maine        | none posted (minutes instead)       | village website (villageofmaine.org), read from the residential machine |

## Architecture

Since Nov. 18, 2026 the tracker runs on the [Gavel](https://github.com/RowanFlynnPilot/gavel) engine: one `instance.json` describes the boards, their agenda platforms and video channels, the theme and the newsroom, and the `engine/` package does the rest.

```
YouTube + agenda platforms
        │
        ▼
  engine.pipeline  ─►  summaries/*.json  ─►  data/meetings.json, data/upcoming.json
        │
        ▼
  frontend/ (React, Vite; reads instance.json and data/ at runtime)
        │
        ▼
  GitHub Pages  ─►  WordPress iframe embed
```

GitHub Actions runs the whole pipeline every 4 hours (`.github/workflows/update-meetings.yml`), with manual dispatch. Recordings are transcribed from a residential machine (`scripts/refresh-transcripts.ps1`), because YouTube blocks cloud servers from captions.

## Local development

**Prerequisites:** Python 3.12+, Node.js 20+, an Anthropic API key.

```bash
git clone https://github.com/RowanFlynnPilot/marathon-meetings.git
cd marathon-meetings

# Python environment
python -m venv .venv
.venv\Scripts\activate            # Windows
# source .venv/bin/activate       # macOS/Linux
pip install -r requirements.txt

# Node environment
cd frontend && npm install && cd ..

# Anthropic API key
$env:ANTHROPIC_API_KEY = "sk-..."  # Windows PowerShell
# export ANTHROPIC_API_KEY=sk-...  # macOS/Linux
```

### Common commands

| Command                                              | What it does                                         |
| ---------------------------------------------------- | ---------------------------------------------------- |
| `npm run dev` (in `frontend/`)                       | Local dashboard with hot reload                      |
| `npm run build` (in `frontend/`)                     | Production build to `frontend/dist/`                 |
| `python -m engine.pipeline --days 14`                | Check for new meetings (incremental)                 |
| `python -m engine.pipeline --source wausau`          | One board only                                       |
| `python -m engine.pipeline --url <YouTube URL>`      | Process one specific video                           |
| `python -m engine.pipeline --publish-only`           | Rebuild `data/` from existing summaries; no scraping |
| `python -m engine.scrub --check`                     | Report residents' addresses and pending corrections  |
| `python -m engine.report --from 2027-01-01 --to 2027-06-30` | Funder report for a period                    |
| `python -m engine.tipsheet`                          | Reporter tip sheet (`data/tipsheet.md`)              |
| `python -m pytest tests`                             | Tests (no network, no API calls)                     |

See [`CLAUDE.md`](CLAUDE.md) for the full engine reference. [`docs/pre-cutover-CLAUDE.md`](docs/pre-cutover-CLAUDE.md) keeps this tracker's own notes from before the move (data sources, design system); its script names are the old ones. The last commit of the old scripts is tagged `legacy-final`.

## Project structure

```
.
├── .github/workflows/     # Scheduled pipeline + deploy, staleness sentinel
├── instance.json          # This deployment: boards, adapters, theme, newsroom
├── engine/                # Scrape, summarize, publish (Gavel)
├── frontend/              # React dashboard (Vite)
├── data/                  # Published meetings, upcoming calendar, cost ledger, tip sheet
├── summaries/             # Generated meeting summaries (JSON + markdown)
├── transcripts/           # Meeting transcripts from the residential fetcher
├── corrections.json       # Corrections and privacy fixes, re-applied every run
├── assets/                # Fonts, avatars, logo; rosters.json (exported from instance.json)
├── tests/                 # Unit tests
└── CLAUDE.md              # Engine architecture + conventions for AI agents
```

## Credits

Built by [Rowan Flynn](https://github.com/RowanFlynnPilot) for [Wausau Pilot & Review](https://wausaupilotandreview.com), a nonprofit local news outlet covering central Wisconsin and Marathon County.
