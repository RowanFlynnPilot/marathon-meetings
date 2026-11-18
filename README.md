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

## Architecture

Standard WPR widget pattern: Python scraper → static JSON → React/Vite → GitHub Pages → WordPress iframe.

```
YouTube + agenda APIs
        │
        ▼
  Python scrapers  ─►  summaries/*.json
        │
        ▼
  inject_meetings.py  ─►  MEETINGS array in JSX
        │
        ▼
  Vite build  ─►  GitHub Pages  ─►  WordPress iframe embed
```

GitHub Actions runs the full pipeline every 4 hours, with manual dispatch and a `--backfill` option for historical processing.

## Local development

**Prerequisites:** Python 3.12, Node.js 20+, an Anthropic API key.

```bash
git clone https://github.com/RowanFlynnPilot/marathon-meetings.git
cd marathon-meetings

# Python environment
python -m venv .venv
.venv\Scripts\activate            # Windows
# source .venv/bin/activate       # macOS/Linux
pip install -r requirements.txt

# Node environment
npm install

# Anthropic API key
$env:ANTHROPIC_API_KEY = "sk-..."  # Windows PowerShell
# export ANTHROPIC_API_KEY=sk-...  # macOS/Linux
```

### Common commands

| Command                                                       | What it does                              |
| ------------------------------------------------------------- | ----------------------------------------- |
| `npm run dev`                                                 | Local dashboard with hot reload           |
| `npm run build`                                               | Production build to `dist/`               |
| `python marathon_meeting_summarizer.py`                       | Check for new meetings (incremental)      |
| `python marathon_meeting_summarizer.py --backfill`            | Process all historical meetings           |
| `python marathon_meeting_summarizer.py --source wausau`       | Single source only                        |
| `python marathon_meeting_summarizer.py --url <YouTube URL>`   | Process one specific video                |
| `python inject_meetings.py`                                   | Inject summaries into the MEETINGS array  |
| `python update_upcoming.py`                                   | Refresh upcoming meeting schedules        |

See [`CLAUDE.md`](CLAUDE.md) for the full architecture reference, data flow, design system, and conventions.

## Project structure

```
.
├── .github/workflows/                # Scheduled scrape + deploy pipeline
├── src/                              # React frontend (Vite)
├── summaries/                        # Generated meeting summaries (JSON)
├── transcripts/                      # Cached YouTube transcripts
├── marathon_meeting_summarizer.py    # Main scraper + AI summarization
├── inject_meetings.py                # Merge summaries → JSX MEETINGS array
├── inject_transcript.py              # Inject manually-pasted transcripts
├── update_upcoming.py                # Refresh upcoming-meeting arrays
├── reprocess.py                      # Re-run summarization on existing data
├── fetch_transcript.py               # Pull YouTube transcripts (yt-dlp)
└── CLAUDE.md                         # Architecture + conventions for AI agents
```

## Credits

Built by [Rowan Flynn](https://github.com/RowanFlynnPilot) for [Wausau Pilot & Review](https://wausaupilotandreview.com), a nonprofit local news outlet covering central Wisconsin and Marathon County.
