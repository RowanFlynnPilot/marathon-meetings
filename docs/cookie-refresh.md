# YouTube Cookie Refresh — Runbook

**Status (Sept 2026): cookies are currently NOT needed.** On Aug 30, 2026
a fresh export was tested from GitHub Actions and YouTube still refused
caption *and* per-video metadata fetches ("Only images are available") —
the block is on cloud IP ranges, not on the session. The workflow now sets
`CAPTION_FETCH=false`, so CI never attempts YouTube fetches, and the
**residential machine is the transcript path** (the
`MarathonMeetings-RefreshTranscripts` task, 7 AM / 7 PM, which needs no
cookies at all). The `YOUTUBE_COOKIES` secret is retained in case YouTube's
posture relaxes: flip `CAPTION_FETCH` to `"true"` in the workflow and CI
will use cookies again, at which point the rest of this runbook applies.

If CI caption fetching is re-enabled: exports last roughly **4–8 weeks**
(observed: mid-June 2026 set died ~Aug 1). You don't need to refresh on a
schedule — when a run hits the bot-block signature it opens/updates a
**"🍪 YouTube cookies expired"** issue (auto-closed once fetches succeed
again). GitHub's notification email is the reminder.

**Stakes while expired:** low. Meetings are NOT lost — the residential
gap sweep fetches every missing transcript from a residential IP, so
YouTube-sourced meetings (Marathon County, Wausau, Weston) just lag by up
to ~12 hours. If the residential path itself stops, CI opens a
**"🏠 Residential transcript fetcher may be down"** issue after a video
sits unprocessed for 36 hours.

## Refresh steps (~3 minutes)

1. **Open a fresh incognito window** in Chrome (Ctrl+Shift+N).
   Incognito matters: YouTube rotates cookies in active sessions, but an
   incognito session closed *without logging out* freezes them, so the
   export lasts much longer.
2. **Sign in to youtube.com** in that window.
3. **Export cookies** with the "Get cookies.txt LOCALLY" extension:
   click its icon on youtube.com → **Export** → saves a Netscape-format
   `www.youtube.com_cookies.txt` to Downloads.
   - If the extension icon is missing in incognito: `chrome://extensions`
     → the extension's **Details** → enable **Allow in Incognito**, then
     reload the YouTube tab.
4. **Close the incognito window without logging out** (logging out
   invalidates the exported cookies).
5. **Load the file into the repo secret(s)** — works from any directory:

   ```powershell
   gh secret set YOUTUBE_COOKIES --repo RowanFlynnPilot/marathon-meetings < "C:\Users\rpfly\Downloads\www.youtube.com_cookies.txt"
   gh secret set YOUTUBE_COOKIES --repo RowanFlynnPilot/gavel < "C:\Users\rpfly\Downloads\www.youtube.com_cookies.txt"
   ```

6. **Delete the file from Downloads** — once it's in the secret store
   there's no reason to keep a plaintext copy on disk:

   ```powershell
   Remove-Item "C:\Users\rpfly\Downloads\www.youtube.com_cookies.txt"
   ```

7. Done. The next scheduled run (every 4 hours) uses the new cookies; the
   cookie-expiry issue auto-closes when a caption fetch succeeds.

## Why not automate the re-pull?

Considered and rejected (Aug 2026): scripting a Google login to harvest
cookies means storing Google credentials and risks bot-flagging the
account, and extracting from a live Chrome profile doesn't work either —
Chrome's app-bound cookie encryption on Windows blocks third-party
extraction, and live-session cookies rotate constantly so snapshots go
stale faster than incognito exports. A 3-minute manual export triggered
by an accurate alarm beats a fragile automation.
