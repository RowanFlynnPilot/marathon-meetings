"""reel_candidates.py: only meetings that became transcript-built during the run,
and only city council / county board meetings.  python -m pytest test_reel_candidates.py"""

import json

from reel_candidates import new_candidates, reel_ready, wants_reel


def write(root, vid, title, source="transcript", transcript=True):
    (root / "summaries").mkdir(exist_ok=True)
    (root / "transcripts").mkdir(exist_ok=True)
    (root / "summaries" / f"{vid.lower()}_summary.json").write_text(
        json.dumps({"title": title, "url": f"https://www.youtube.com/watch?v={vid}", "_source": source}), encoding="utf-8")
    if transcript:
        (root / "transcripts" / f"{vid}.txt").write_text("transcript", encoding="utf-8")


def test_reel_ready_needs_a_transcript_built_summary_and_the_transcript(tmp_path):
    write(tmp_path, "7OLPXH8UYC8", "Wausau City council Meeting")
    write(tmp_path, "-GFcsOK1Wbs", "Marathon County Board Meeting", source="agenda")
    write(tmp_path, "AAAAAAAAAAA", "Wausau City Council Meeting", transcript=False)
    assert reel_ready(tmp_path) == {"7OLPXH8UYC8": "Wausau City council Meeting"}


def test_only_council_and_county_board_meetings_want_reels():
    assert wants_reel("Wausau City council Meeting - 10/13/26")
    assert wants_reel("Marathon County Board Regular Meeting")
    assert not wants_reel("Marathon County Board Educational Meeting")
    assert not wants_reel("Wausau Finance Committee Meeting")
    assert not wants_reel("Marathon County Public Safety Committee")
    # Real tracker titles: committees carry the council's name, and split meetings.
    assert not wants_reel("Wausau City Council Economic Development Committee Meeting - 10/6/26")
    assert not wants_reel("Wausau City Council Joint Human Resources Committee and Finance Committee Meeting Pt.1 - 9/14/26")
    assert not wants_reel("Wausau City Council Meeting Pt.2 - 8/18/26")
    assert not wants_reel("Marathon County Board Regular Meeting Pt.1 - 8/25/26")
    assert wants_reel("Marathon County Board Special Meeting - 10/1/26")


def test_a_missing_or_malformed_snapshot_prints_nothing(tmp_path):
    import subprocess, sys
    from pathlib import Path
    script = Path(__file__).resolve().parent / "reel_candidates.py"
    bad = tmp_path / "bad.json"
    bad.write_text('{"not": "a list"}', encoding="utf-8")
    for since in (tmp_path / "nope.json", bad):
        out = subprocess.run([sys.executable, str(script), "--since", str(since)], capture_output=True, text=True, check=True)
        assert out.stdout == ""


def test_only_meetings_that_flipped_this_run_are_new():
    now = {"OLDOLDOLD01": "Wausau City Council Meeting", "NEWNEWNEW01": "Wausau City Council Meeting",
           "NEWNEWNEW02": "Wausau Finance Committee Meeting"}
    assert new_candidates({"OLDOLDOLD01"}, now) == ["NEWNEWNEW01"]
