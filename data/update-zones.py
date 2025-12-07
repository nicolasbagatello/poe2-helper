#!/usr/bin/env python3
"""
Update zones.json with CSV walkthrough data
Preserves existing suggested_route and adds:
- notes field
- optional flags for POIs
- location_hint for POIs
- walkthrough_steps array
- town_visits array
"""

import json
import csv

# CSV data mapping for Act 1
act1_data = {
    "Clearfell": {
        "notes": "Beira is always north/northeast of waypoint. Mud Burrow and the worm boss can be skipped.",
        "pois": {
            "Boss: Beira of the Rotten Pack": {"optional": False, "location_hint": "Always north/northeast of waypoint"},
            "Mysterious Campsite (Abandoned Stash)": {"optional": True, "location_hint": "Spawns to left or right of starting zone"},
            "Mud Burrow Entrance / Waypoint": {"optional": True, "location_hint": "Can be skipped - worm boss is not required"}
        },
        "walkthrough_steps": [
            {"order": 1, "action": "Kill Beira of the Rotten Pack", "optional": False, "tip": "Boss is always north/northeast of waypoint"},
            {"order": 2, "action": "Find exit to Grelwood", "optional": False, "tip": "Use checkpoint from Beira to return if you find exit first"},
            {"order": "opt", "action": "Find the Mysterious Campsite", "optional": True, "tip": "Uncut support gem reward"}
        ]
    },
    "The Grelwood": {
        "notes": "Find waypoint first (somewhat in center). Enter zones to take their waypoints, then backtrack to Grelwood.",
        "pois": {
            "Boss: The Brambleghast": {"optional": True, "location_hint": "Usually in same quadrant as Red Vale entrance"},
            "Aregane's Hut (Witch Hut)": {"optional": True, "location_hint": "Look for the Cauldron encounter - free medium life/mana flask"},
            "Tree of Souls + Waypoint": {"optional": False, "location_hint": "Somewhat in center of zone"},
            "Grim Tangle Entrance": {"optional": False, "location_hint": "Enter zone, take waypoint, backtrack"},
            "The Red Vale Entrance": {"optional": False, "location_hint": "Enter zone, take waypoint, backtrack"}
        },
        "walkthrough_steps": [
            {"order": 1, "action": "Find waypoint and talk to quest NPC", "optional": False, "tip": "Waypoint is somewhat in center of zone"},
            {"order": 2, "action": "Find exit to Grim Tangle", "optional": False, "tip": "Enter zone, take waypoint, backtrack to Grelwood"},
            {"order": 2, "action": "Find exit to Red Vale", "optional": False, "tip": "Enter zone, take waypoint, backtrack to Grelwood"},
            {"order": 3, "action": "Go to Red Vale", "optional": False, "tip": "Via waypoint or checkpoint"},
            {"order": "opt", "action": "Find and kill Brambleghast", "optional": True, "tip": "Level 1 uncut skill gem reward"},
            {"order": "opt", "action": "Find the Cauldron in the Witch Hut", "optional": True, "tip": "Free medium mana/life flask"}
        ],
        "town_visits": [
            {"after_zone": "The Red Vale", "instructions": "Go back to town, get runic tools from Renly", "order": 1},
            {"after_zone": "The Red Vale", "instructions": "Go to Grelwood waypoint, click the three runes, talk to Una", "order": 2},
            {"after_zone": "The Red Vale", "instructions": "Go back to town, talk to Una", "order": 3}
        ]
    }
}

print("CSV to zones.json update script")
print("This would update zones.json with walkthrough data from CSVs")
print("Run this after manual review of the data structure")
