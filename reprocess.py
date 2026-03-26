"""
reprocess.py - Remove specific video IDs from processed_meetings.json
so they get re-summarized on the next run.
Usage: REPROCESS_IDS="id1,id2,id3" python reprocess.py
"""
import json, os, sys

ids_str = os.environ.get("REPROCESS_IDS", "").strip()
if not ids_str:
    print("No REPROCESS_IDS set - nothing to do")
    sys.exit(0)

ids = [i.strip() for i in ids_str.split(",") if i.strip()]
state_file = "./processed_meetings.json"

if not os.path.exists(state_file):
    print("No state file found - nothing to reprocess")
    sys.exit(0)

with open(state_file) as f:
    state = json.load(f)

removed = 0
for vid_id in ids:
    if vid_id in state.get("processed", {}):
        del state["processed"][vid_id]
        print(f"Removed {vid_id} from state - will reprocess")
        removed += 1
    else:
        print(f"{vid_id} not found in state (may not have been processed yet)")

with open(state_file, "w") as f:
    json.dump(state, f, indent=2)

print(f"Done - {removed} video(s) queued for reprocessing")
