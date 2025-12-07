# Path of Exile 2 - Campaign Zone Guide

A interactive web-based guide for tracking your progress through Path of Exile 2's campaign zones. View zone layouts, boss information, suggested routes, and mark zones as completed as you progress through the game.

## Features

- **Progress Tracking**: Mark zones as complete/incomplete with persistent localStorage
- **Visual Progress Bar**: Track overall and per-act completion percentage
- **Zone Layouts**: View high-quality zone layout images with click-to-enlarge lightbox
- **Detailed Information**:
  - Boss names and rewards
  - Suggested routes through each zone
  - Points of interest and rewards
  - Quest information
  - Layout confidence ratings
- **Dark PoE Theme**: Authentic Path of Exile aesthetic with browns, blacks, and gold accents
- **Filter Options**: Show only undone zones to focus on remaining content
- **Reset Progress**: Clear all progress with confirmation dialog
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Navigation**: Arrow keys and ESC for lightbox navigation

## Live Demo

👉 https://nicolasbagatello.github.io/poe2-helper/

## Data Coverage

- **65 Total Zones** across all 4 acts
- **60 Zones** with layout images
- **3 Zones** with multiple layout variants
- Acts: Ogham, Vastiri, Vaal/Jungle, Karui Archipelago

## Usage

### Navigation

1. Scroll through acts and zones
2. Click on zone layout images to view full-size
3. Click "Mark as Done" to track completion
4. Use "Show Only Undone" to filter completed zones
5. Use "Reset All Progress" to start over

### Keyboard Shortcuts (Lightbox)

- `ESC` - Close lightbox
- `←` Left Arrow - Previous image
- `→` Right Arrow - Next image

## Local Development

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/poe2-helper.git
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
├── index.html          # Main HTML structure
├── styles.css          # Dark PoE theme styling
├── script.js           # Application logic
├── data/
│   └── zones.json      # Zone data with image mappings
├── images/             # Zone layout images (65 total)
├── README.md           # This file
├── plan.md             # Implementation plan
└── image-mapping.md    # Image to zone mapping reference
```

## Data Structure

Zone data is stored in `data/zones.json` with the following structure:

```json
{
  "game": "Path of Exile 2",
  "version": "0.3/0.4 (skeleton)",
  "acts": [
    {
      "act_number": 1,
      "act_name": "Ogham",
      "zones": [
        {
          "zone_name": "Clearfell",
          "layout_image_name": ["Clearfell-Seed-1-Pilot.webp", "Clearfell-Seed-2-Pilot.webp"],
          "layout_confidence": "Very High",
          "suggested_route": "...",
          "points_of_interest": [...],
          "quests": [...]
        }
      ]
    }
  ]
}
```

## Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript**: No frameworks or dependencies
- **LocalStorage API**: Progress persistence
- **GitHub Pages**: Free static hosting

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Areas for improvement:

- [ ] Add missing zone layout images
- [ ] Update data for new game versions
- [ ] Add export/import progress functionality
- [ ] Add statistics (completion time, etc.)
- [ ] Add search functionality
- [ ] Add zone sorting options

## Data Sources

- Zone layout images compiled from community sources
- Data version: 0.3/0.4 (skeleton)
- Layout images sourced from community guides and player contributions

## License

This project is for educational and informational purposes. Path of Exile 2 and all related content are property of Grinding Gear Games.

## Acknowledgments

- Grinding Gear Games for Path of Exile 2
- Community members who created and shared zone layouts
- Players who contribute to the PoE2 knowledge base

## Version History

- **v1.0.0** (Initial Release)
  - Full campaign zone tracking (Acts 1-4)
  - 60 zones with layout images
  - Progress tracking with localStorage
  - Lightbox image viewer
  - Filter and reset functionality
  - Responsive dark theme design

## Contact

For issues, suggestions, or contributions, please open an issue on GitHub.

---

Happy hunting, Exile! 🎮
