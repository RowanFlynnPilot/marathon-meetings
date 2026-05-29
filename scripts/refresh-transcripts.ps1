<#
.SYNOPSIS
    Fetch transcripts for any agenda-only YouTube meetings, commit, and push.

.DESCRIPTION
    Runs from your residential IP (which YouTube trusts), uses fetch_transcript.py
    to pull captions for every meeting currently stuck in agenda-only state, then
    drops the .txt files into transcripts/, commits, and pushes. The CI workflow
    will pick them up on its next run (every 4 hours) and re-summarize from real
    transcripts.

    Intended to be run by Windows Task Scheduler twice a day so freshly-uploaded
    meetings get real summaries on the next CI cycle.

.PARAMETER NoPush
    Fetch transcripts but don't commit or push. Useful for dry-runs.

.PARAMETER Verbose
    PowerShell's built-in -Verbose switch; passed through to subprocess output.

.EXAMPLE
    .\scripts\refresh-transcripts.ps1

.EXAMPLE
    .\scripts\refresh-transcripts.ps1 -NoPush
#>

[CmdletBinding()]
param(
    [switch]$NoPush
)

$ErrorActionPreference = "Stop"

# --Locate the project root regardless of where Task Scheduler invokes us ──────
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

Write-Host ""
Write-Host "--refresh-transcripts.ps1 ------------------------------------------" -ForegroundColor Cyan
Write-Host "Project: $ProjectRoot"
Write-Host "Started: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Host ""

# --Sanity check that the venv + fetch script exist ---------------------──────
# fetch_transcript.py doesn't call Anthropic — it just downloads .vtt captions
# and writes them to transcripts/. CI handles the re-summarization later, using
# its own ANTHROPIC_API_KEY secret. So no API key needed locally.

$Python = ".\.venv\Scripts\python.exe"
if (-not (Test-Path $Python)) {
    Write-Host "[error] Python venv not found at $Python" -ForegroundColor Red
    exit 2
}
if (-not (Test-Path .\fetch_transcript.py)) {
    Write-Host "[error] fetch_transcript.py not found in $ProjectRoot" -ForegroundColor Red
    exit 2
}

# --Make sure we're up to date with origin before fetching ---------------------
# Note: git writes informational messages to stderr; redirecting 2>&1 in
# PowerShell would surface them as ErrorRecords. We let them flow to stderr.
Write-Host "[git] Pulling latest from origin/main..." -ForegroundColor DarkGray
git pull --rebase origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[warn] Could not pull cleanly. Proceeding anyway." -ForegroundColor Yellow
}

# --Snapshot transcripts/ so we can tell what's new after fetching -------──────
$BeforeFiles = @()
if (Test-Path .\transcripts) {
    $BeforeFiles = Get-ChildItem .\transcripts -Filter *.txt | ForEach-Object { $_.Name }
}

# --Fetch all stuck agenda-only meetings -----------------------------------────
Write-Host ""
Write-Host "[fetch] Running fetch_transcript.py --all" -ForegroundColor Cyan
& $Python .\fetch_transcript.py --all
$fetchExit = $LASTEXITCODE

# --See what landed --------------------------------------------------------────
$AfterFiles = @()
if (Test-Path .\transcripts) {
    $AfterFiles = Get-ChildItem .\transcripts -Filter *.txt | ForEach-Object { $_.Name }
}
$NewFiles = $AfterFiles | Where-Object { $BeforeFiles -notcontains $_ }

Write-Host ""
if ($NewFiles.Count -eq 0) {
    Write-Host "[done] No new transcripts fetched." -ForegroundColor Green
    Write-Host ""
    exit 0
}

Write-Host "[ok] $($NewFiles.Count) new transcript(s):" -ForegroundColor Green
$NewFiles | ForEach-Object { Write-Host "       transcripts/$_" }

if ($NoPush) {
    Write-Host ""
    Write-Host "[skip] -NoPush set; not committing." -ForegroundColor Yellow
    exit 0
}

# --Commit + push --------------------------------------------------------──────
Write-Host ""
Write-Host "[git] Committing and pushing..." -ForegroundColor Cyan
git add transcripts/
$commitMsg = "chore: fetch transcripts for $($NewFiles.Count) stuck meeting(s) [skip ci]`n`n" + ($NewFiles -join "`n")
git commit -m $commitMsg
if ($LASTEXITCODE -ne 0) {
    Write-Host "[warn] git commit failed or nothing to commit." -ForegroundColor Yellow
    exit 0
}
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[error] git push failed." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "[done] Pushed. CI will pick these up on its next run." -ForegroundColor Green
Write-Host "       https://github.com/RowanFlynnPilot/marathon-meetings/actions"
Write-Host ""
exit 0
