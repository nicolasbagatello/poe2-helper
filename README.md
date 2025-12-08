# Path of Exile 2 - Campaign Zone Guide

An interactive web-based guide for tracking your progress through Path of Exile 2's campaign zones. View zone layouts, boss information, suggested routes, step-by-step walkthroughs, and mark zones as completed as you progress through the game.

## 🌐 Live Demo

👉 **Use it now:** https://nicolasbagatello.github.io/poe2-helper/

**No installation required!** Just click the link above to start using the guide directly in your browser. All your progress is saved automatically in your browser's local storage.

---

## Features

### Core Functionality
- **Progress Tracking**: Mark zones as complete/incomplete with persistent localStorage
- **Visual Progress Bar**: Track overall and per-act completion percentage with confetti animation at 100%
- **Statistics Dashboard**: View detailed completion stats per act and Books of Specialisation collected
- **Personal Notes**: Add custom notes to each zone (saved to localStorage)
- **Export/Import**: Backup and restore your progress and notes across devices

### Zone Information
- **Zone Layouts**: View high-quality zone layout images with click-to-enlarge lightbox
- **Detailed Information**:
  - Boss names and rewards (with special highlighting for Books of Specialisation)
  - Suggested routes through each zone
  - Points of interest with location hints
  - Optional vs required content marking
  - Quest information
  - Layout confidence ratings

### Walkthrough Features (v1.2.0)
- **📋 Walkthrough Mode**: Step-by-step instructions with interactive checkboxes
  - Ordered progression (#1, #2, #3, OPT for optional)
  - Helpful tips for each step
  - Optional step marking
- **💡 Zone Tips**: CSV-derived strategy notes and important information
- **📍 Location Hints**: Specific directions for finding bosses and POIs
- **🏛️ Town Visits**: Ordered instructions for quest-related town returns
- **👁 Optional Content Toggle**: Show/hide optional POIs and content (perfect for speedruns)

### User Interface
- **Search Bar**: Real-time search across zones, bosses, and rewards
- **Filter Options**:
  - Show only undone zones
  - Filter by reward type (Books, Buffs, Skill Gems, Support Gems, Passive Points)
- **Act Tabs**: Quick navigation between acts with sticky header
- **Mark All**: Quickly mark all zones in an act as completed
- **Font Size Controls**: 4 size levels (small, normal, large, xlarge) with localStorage persistence
- **Back to Top Button**: Smooth scroll with fade-in animation
- **Dark PoE Theme**: Authentic Path of Exile aesthetic with browns, blacks, and gold accents
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Navigation**: Arrow keys and ESC for lightbox navigation

### User Preferences (All Saved to localStorage)
- Show/hide optional content
- Walkthrough mode on/off
- Filter settings
- Reward filter selection
- Active act tab
- Font size preference
- Zone completion state
- Personal notes per zone

## Live Demo

👉 **https://nicolasbagatello.github.io/poe2-helper/**

## Data Coverage

- **68 Total Zones** across all 4 acts (updated v1.2.0)
- **60+ Zones** with layout images
- **3 Zones** with multiple layout variants
- **Complete CSV Walkthrough Data**: All zones include step-by-step instructions, location hints, and tips
- **Acts**: Ogham, Vastiri, Vaal/Jungle, Karui Archipelago

## Usage

### Basic Navigation

1. **Browse Zones**: Use act tabs to switch between acts
2. **View Layouts**: Click on zone layout images to view full-size
3. **Track Progress**: Click "Mark as Done" to track completion
4. **Search**: Use the search bar to find specific zones, bosses, or rewards
5. **Filter**: Use reward filter dropdown or "Show Only Undone" button

### Walkthrough Mode

1. Click **"Show Walkthrough"** button to enable step-by-step mode
2. Follow numbered steps (#1, #2, #3) in order
3. Check off steps as you complete them
4. Optional steps marked with "OPT" badge
5. Read tips (💡) for helpful guidance

### Optional Content

- Click **"Hide Optional"** to hide all optional POIs and content
- Perfect for speedrunners focusing on required objectives
- Optional items marked with yellow "Optional" badge

### Export/Import Progress

1. **Export**: Click "Export Progress" to download JSON file
2. **Import**: Click "Import Progress" and select your JSON file
3. Sync progress across devices or backup your data

### Keyboard Shortcuts (Lightbox)

- `ESC` - Close lightbox
- `←` Left Arrow - Previous image
- `→` Right Arrow - Next image

## Local Development

> **Note:** This section is for developers and power users who want to run the guide locally. Most users should just use the [live demo](https://nicolasbagatello.github.io/poe2-helper/) instead.

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server - choose one:
  - **Python 3**: [Download from python.org](https://www.python.org/downloads/)
  - **Node.js** (includes npx): [Download from nodejs.org](https://nodejs.org/)
  - **PHP**: [Download from php.net](https://www.php.net/downloads)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/nicolasbagatello/poe2-helper.git
   cd poe2-helper
   ```

2. Start a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 8000

   # Using Node.js
   npx http-server -p 8000

   # Using PHP
   php -S localhost:8000
   ```

3. Open your browser to `http://localhost:8000`

### File Structure

```
poe2-helper/
├── index.html              # Main HTML structure
├── styles.css              # Dark PoE theme styling
├── script.js               # Application logic
├── favicon.svg             # Custom PoE2 favicon
├── data/
│   ├── zones.json          # Zone data with walkthrough integration
│   ├── update-zones.py     # CSV to JSON conversion script
│   ├── zones-updated-sample.json  # Sample with new structure
│   └── extra/              # CSV walkthrough data (Acts 1-4)
├── images/                 # Zone layout images (60+ total)
├── README.md               # This file
├── csv-comparison-analysis.md  # CSV integration analysis
├── ux-improvements.md      # Feature tracking and changelog
└── plan.md                 # Implementation plan
```

## Data Structure

Zone data is stored in `data/zones.json` with the following enhanced structure:

```json
{
  "zone_name": "Clearfell",
  "layout_image_name": ["Clearfell-Seed-1-Pilot.webp"],
  "layout_confidence": "Very High",
  "suggested_route": "Head to the North to kill the boss...",
  "notes": "Beira is always north/northeast. Mud Burrow can be skipped.",
  "points_of_interest": [
    {
      "name": "Boss: Beira of the Rotten Pack",
      "reward": "Permanent Buff: +10% Cold Resistance",
      "optional": false,
      "location_hint": "Always north/northeast of waypoint"
    }
  ],
  "walkthrough_steps": [
    {
      "order": 1,
      "action": "Kill Beira of the Rotten Pack",
      "optional": false,
      "tip": "Boss is always north/northeast of waypoint"
    }
  ],
  "town_visits": [
    {
      "after_zone": "The Red Vale",
      "instructions": "Go back to town, get runic tools from Renly",
      "order": 1
    }
  ],
  "quests": []
}
```

## Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript**: No frameworks or dependencies
- **LocalStorage API**: Progress and preferences persistence
- **GitHub Pages**: Free static hosting

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Areas for improvement:

- [ ] Add missing zone layout images (5 zones remaining)
- [ ] Update data for new game versions
- [ ] Add video guide links integration
- [ ] Add high contrast accessibility mode
- [ ] Add keyboard-only navigation improvements
- [ ] Multi-language support (i18n)

## Data Sources & Credits

### PoE2 Campaign Data
- **Zone Layout Images**: Compiled from [Mobalytics PoE2 Campaign Layouts](https://mobalytics.gg/poe-2/guides/campaign-layout-act-1)
- **Walkthrough Data**: [Community PoE2 Data Spreadsheet](https://docs.google.com/spreadsheets/d/17D5MKBapwQvYm4hmgvGTReQHdOWHzdrj-RgLPB8P09A/edit?gid=476541532#gid=476541532)
- **Data Version**: 0.3/0.4 with CSV Walkthrough Integration

### Related Projects
- **Path of Exile 1 Helper** by Nicolas Bagatello:
  - GitHub: [poe1-campaign-helper](https://github.com/nicolasbagatello/poe1-campaign-helper)
  - Live Demo: [nicolasbagatello.github.io/poe1-campaign-helper](https://nicolasbagatello.github.io/poe1-campaign-helper/)

## License

This project is for educational and informational purposes. Path of Exile 2 and all related content are property of Grinding Gear Games.

## Acknowledgments

- **Grinding Gear Games** for Path of Exile 2
- **Mobalytics** for zone layout guides and images
- **Community contributors** to the PoE2 data spreadsheet
- **PoE2 community members** who created and shared zone layouts
- Players who contribute to the PoE2 knowledge base

## Version History

- **v1.2.0** (2025-12-07) - CSV Walkthrough Data Integration
  - Complete walkthrough data for all 68 zones
  - Optional content toggle and walkthrough mode
  - Location hints for all POIs
  - Zone tips and town visit instructions
  - Enhanced data structure with CSV integration
  - All user preferences saved to localStorage

- **v1.1.0** (2025-12-06/07) - Major UX Update
  - Search functionality with real-time filtering
  - Statistics dashboard with per-act completion
  - Export/Import progress and notes
  - Personal notes per zone
  - Act tabs navigation
  - Font size controls (4 levels)
  - Reward type filtering
  - Mark all zones in act as done
  - Back to top button
  - 100% completion confetti animation
  - Custom PoE2 favicon and logo
  - Compact UI redesign

- **v1.0.0** (2025-12-06) - Initial Release
  - Full campaign zone tracking (Acts 1-4)
  - 60+ zones with layout images
  - Progress tracking with localStorage
  - Lightbox image viewer
  - Filter and reset functionality
  - Responsive dark theme design

## Contact

For issues, suggestions, or contributions, please open an issue on GitHub.

Repository: [github.com/nicolasbagatello/poe2-helper](https://github.com/nicolasbagatello/poe2-helper)

---

Happy hunting, Exile! 🎮
