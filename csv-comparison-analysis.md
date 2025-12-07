# CSV Walkthrough vs Current zones.json - Comparison Analysis

**Date:** 2025-12-07

## Overview

The CSV files in `data/extra/` contain detailed leveling walkthrough data. This document compares that information with the current `zones.json` to identify valuable additions.

---

## Current zones.json Structure

```json
{
  "zone_name": "Clearfell",
  "layout_image_name": ["image1.webp", "image2.webp"],
  "layout_confidence": "Very High",
  "suggested_route": "Brief general description",
  "points_of_interest": [
    {
      "name": "Boss: Name",
      "reward": "Description"
    }
  ],
  "quests": []
}
```

**Strengths:**
- Visual layout images
- Boss and POI information
- Reward tracking
- Clean, organized structure

**Gaps:**
- No step-by-step instructions
- No location hints/tips
- No optional vs required distinction
- No town visit instructions
- No zone progression order

---

## CSV Walkthrough Structure

```csv
Zone,Order,Steps,Notes,Rewards
Clearfell,,Kill Boss, enter town,,
,,Find exit to grelwood,use checkpoint from beira to come back here if you find the exit first,
,Opt,Find the Mysterious Campsite,,uncut support gem
```

**Strengths:**
- Detailed step-by-step instructions
- Order/sequence tracking (1, 2, 3, Opt)
- Specific location hints
- Town visit instructions
- Clear optional vs required marking

**Gaps:**
- No layout images
- Less organized structure
- Harder to parse programmatically

---

## Recommended Additions to zones.json

### 1. **Optional POI Marking** (HIGH PRIORITY)
Add `optional: true/false` flag to points_of_interest

```json
{
  "name": "Mysterious Campsite (Abandoned Stash)",
  "reward": "Uncut Skill Gem (Level 1)",
  "optional": true,
  "priority": "first-character"
}
```

**Implementation:**
- Add new field: `optional` (boolean)
- Add new field: `priority` ("required", "first-character", "speedrun-skip")
- Visual indicator in UI (gray out optional, or use icons)

### 2. **Location Hints** (MEDIUM PRIORITY)
Add specific location guidance to POIs

```json
{
  "name": "Boss: Beira of the Rotten Pack",
  "reward": "Permanent Buff: +10% Cold Resistance",
  "optional": false,
  "location_hint": "Always north/northeast of waypoint"
}
```

**Implementation:**
- Add new field: `location_hint` (string)
- Display as tooltip or small text under POI name

### 3. **Step-by-Step Walkthrough** (MEDIUM PRIORITY)
Add ordered steps for each zone

```json
{
  "zone_name": "Clearfell",
  "walkthrough_steps": [
    {
      "order": 1,
      "action": "Kill Beira of the Rotten Pack",
      "optional": false,
      "tip": "Boss is always north/northeast of waypoint"
    },
    {
      "order": 2,
      "action": "Find exit to Grelwood",
      "optional": false,
      "tip": "Use checkpoint from Beira to come back if you find exit first"
    },
    {
      "order": "opt",
      "action": "Find the Mysterious Campsite",
      "optional": true,
      "tip": "Spawns to the left or right of starting zone"
    }
  ]
}
```

**Implementation:**
- Add new section: `walkthrough_steps` (array)
- Each step has: order, action, optional, tip
- Display as collapsible checklist in zone card

### 4. **Zone Sequence/Progression** (LOW PRIORITY)
Add recommended zone order at act level

```json
{
  "act_number": 1,
  "act_name": "Ogham",
  "zone_sequence": [
    "Riverbank",
    "Clearfell",
    "The Grelwood",
    {"zone": "The Red Vale", "from": "The Grelwood"},
    {"zone": "The Grim Tangle", "from": "The Grelwood"}
  ]
}
```

### 5. **Town Visit Instructions** (LOW PRIORITY)
Add intermediate town visit steps

```json
{
  "zone_name": "Cemetery of the Eternals",
  "town_visits": [
    {
      "after_step": 2,
      "instructions": "Go back to town, get runic tools from Renly"
    }
  ]
}
```

---

## Specific Data Enrichments from CSV

### Act 1 Examples

#### Clearfell
**Current:**
```json
"suggested_route": "Head to the North to kill the boss..."
```

**Enhanced with CSV data:**
```json
"suggested_route": "Kill Beira (always north/northeast of waypoint), then find exit to Grelwood. Mud Burrow and worm boss can be skipped.",
"points_of_interest": [
  {
    "name": "Boss: Beira of the Rotten Pack",
    "reward": "Permanent Buff: +10% Cold Resistance",
    "optional": false,
    "location_hint": "Always north/northeast of waypoint"
  },
  {
    "name": "Mysterious Campsite (Abandoned Stash)",
    "reward": "Uncut Skill Gem (Level 1)",
    "optional": true,
    "location_hint": "Spawns to left or right of starting zone"
  },
  {
    "name": "Mud Burrow Entrance",
    "reward": null,
    "optional": true,
    "skip_note": "Can be skipped by speedrunners"
  }
]
```

#### The Grelwood
**CSV adds:**
- Order: "Find waypoint → Find exit to grim tangle → Find exit to red vale → Go to red vale"
- Location hints: "waypoint somewhat in center of zone"
- Tips: "enter zone, take waypoint, backtrack to grelwood"

#### Hunting Grounds
**CSV adds:**
- Priority order: Kill Crowbell first (required), then find exits
- Town return instructions: "via townportal+waypoint if it isn't the last you have found"

---

## UI/UX Enhancements Enabled by CSV Data

### 1. **Optional Content Toggle**
Add filter button: "Show Optional Content" (on/off)
- When off: Hide all optional POIs
- When on: Show with visual distinction (lighter color, dashed border)

### 2. **Walkthrough Checklist Mode**
New display mode showing step-by-step progression:
```
□ Step 1: Kill Beira of the Rotten Pack
  💡 Always north/northeast of waypoint
□ Step 2: Find exit to Grelwood
  💡 Use checkpoint from Beira to return if you find exit first
□ Optional: Find Mysterious Campsite
  💡 Spawns left or right of starting zone
```

### 3. **Location Hints Tooltips**
Show location hints on hover or as small info icon

### 4. **Priority Badges**
- 🔴 Required
- 🟡 First Character Recommended
- ⚪ Optional/Speedrun Skip

---

## Implementation Priority

### Phase 1 (Quick Wins - 30 minutes)
1. ✅ Add `optional` boolean field to existing POIs in zones.json
2. ✅ Add visual indicator in UI (lighter opacity for optional items)
3. ✅ Add "Show Optional" filter toggle

### Phase 2 (Medium Effort - 2 hours)
1. Add `location_hint` field to POIs
2. Display location hints as tooltips or sub-text
3. Update zones.json with location hints from CSV

### Phase 3 (Larger Effort - 4+ hours)
1. Add `walkthrough_steps` array to zones
2. Create new "Walkthrough Mode" view
3. Add step completion tracking (checkboxes)

### Phase 4 (Future Enhancement)
1. Add town visit instructions
2. Add zone sequence/progression indicators
3. Create interactive zone map/flowchart

---

## Data Quality Notes

**CSV Coverage:**
- ✅ Act 1: Complete
- ✅ Act 2: Complete
- ✅ Act 3: Complete
- ⚠️ Act 4: WIP (Work In Progress)

**CSV Strengths:**
- Very detailed location hints
- Clear optional vs required distinction
- Excellent for first-time players
- League-specific notes (first character)

**CSV Challenges:**
- Requires parsing and normalization
- Some abbreviations and informal language
- Mix of strategic and tactical information

---

## Recommendation

**Start with Phase 1 + Phase 2** to get immediate value:

1. **Add optional flags** to existing POIs (mark 30-40% as optional based on CSV)
2. **Add location hints** from CSV to POIs (huge UX improvement)
3. **Add filter toggle** for optional content
4. **Update visual design** to distinguish optional items

This provides:
- Better navigation for first-time players
- Flexibility for speedrunners (hide optional)
- Enhanced value without major restructuring

**Later:** Consider Phase 3 if users request more detailed walkthrough functionality.
