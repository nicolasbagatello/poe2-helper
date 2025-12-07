# Path of Exile 2 Zone Guide - Implementation Plan

## Project Overview
A static web application to guide players through PoE2 campaign zones with progress tracking, hosted on GitHub Pages.

## Features
- Dark theme with PoE aesthetic (browns, blacks, gold accents)
- Zone cards grouped by Act with all data displayed
- Image thumbnails with click-to-enlarge lightbox
- Progress tracking with localStorage
- Filter to show only undone zones
- Reset all progress functionality
- Fully static (HTML, CSS, JavaScript) for GitHub Pages

---

## Implementation Steps

### Step 1: Data Preparation
- [x] Analyze all 65 images in the `/images` folder
- [x] Map image filenames to zone names
- [x] Create image mappings for zones with multiple images
- [x] Update `zones.json`: replace `layout_image_url` with `layout_image_name` (string or array)
- [x] Verify all zones have corresponding images

### Step 2: HTML Structure
- [x] Create `index.html` with semantic structure
- [x] Add header section with title
- [x] Add progress bar container (visual bar + text counter)
- [x] Add controls section (filter toggle + reset button)
- [x] Create main content container for acts
- [x] Add lightbox modal structure (overlay, image container, controls)
- [x] Include meta tags and favicon reference

### Step 3: CSS Styling - Dark PoE Theme
- [x] Set up dark color palette (browns, blacks, gold accents)
- [x] Style header and title
- [x] Style progress bar with gradient fill
- [x] Style control buttons (filter toggle, reset)
- [x] Style act headers and sections
- [x] Create zone card layout and styling
  - [x] Card borders and shadows
  - [x] Completed state styling (opacity, checkmark)
  - [x] Hover effects
- [x] Style image thumbnail grid (horizontal flex layout, fixed height)
- [x] Style lightbox modal
  - [x] Overlay backdrop
  - [x] Enlarged image display
  - [x] Navigation buttons (prev/next, close)
  - [x] Image counter display
- [x] Implement responsive design (mobile-first)
  - [x] Mobile layout (single column cards)
  - [x] Tablet layout (2 column grid)
  - [x] Desktop layout (3+ column grid)

### Step 4: JavaScript - Core Functionality
- [x] Fetch and parse `zones.json`
- [x] Create function to generate act sections dynamically
- [x] Create function to generate zone cards with all data
  - [x] Zone name and layout confidence badge
  - [x] Image thumbnail grid (single or multiple)
  - [x] Boss information and rewards
  - [x] Suggested route
  - [x] Points of interest list
  - [x] Quests section (if applicable)
  - [x] Completion toggle button
- [x] Handle missing/broken images gracefully
- [x] Initialize app on page load

### Step 5: JavaScript - Progress Tracking
- [x] Create localStorage key structure (`poe2-zone-progress`)
- [x] Load saved progress on page load
- [x] Apply completed state to cards based on saved data
- [x] Toggle individual zone completion (done/undone)
- [x] Save state to localStorage on each toggle
- [x] Calculate total progress (completed/total zones)
- [x] Calculate per-act progress
- [x] Update progress bar visual and text
- [x] Update progress display in real-time

### Step 6: JavaScript - Image Lightbox
- [x] Implement click handler for image thumbnails
- [x] Open lightbox modal with clicked image
- [x] Display full-size image
- [x] Add close button functionality (click + ESC key)
- [x] Add prev/next navigation for multi-image zones
- [x] Add keyboard navigation (arrow keys)
- [x] Display image counter (e.g., "2 / 3")
- [x] Handle single-image zones (no prev/next needed)
- [x] Prevent body scroll when lightbox is open

### Step 7: JavaScript - Filter & Reset
- [x] Implement "Show Only Undone" filter toggle
- [x] Hide/show completed zones based on filter state
- [x] Update button state/styling when filter is active
- [x] Implement "Reset All Progress" functionality
- [x] Add confirmation dialog before reset
- [x] Clear localStorage on reset
- [x] Update all cards to undone state
- [x] Update progress bar to 0%

### Step 8: Polish & Optimization
- [x] Add loading state while fetching JSON
- [x] Add error handling for failed JSON fetch
- [ ] Optimize images if needed (compression)
- [x] Add smooth scroll behavior
- [x] Add transitions for state changes
- [x] Test accessibility (keyboard navigation, screen readers)
- [x] Add comments to code for maintainability

### Step 9: Testing & Deployment
- [x] Test on Chrome/Firefox/Safari
- [x] Test on mobile devices (iOS/Android)
- [x] Test localStorage persistence across sessions
- [x] Test all filter combinations
- [x] Test reset functionality
- [x] Test lightbox on all zones (single/multiple images)
- [x] Verify all relative paths work for GitHub Pages
- [ ] Test with disabled JavaScript (graceful degradation)
- [x] Create README.md with project description
- [ ] Deploy to GitHub Pages
- [ ] Verify deployed version works correctly

---

## File Structure
```
poe2-helper/
├── index.html
├── styles.css
├── script.js
├── data/
│   └── zones.json (updated with image mappings)
├── images/
│   └── (65 zone layout images)
└── README.md
```

---

## Technical Decisions
- **No carousel**: Display all images as thumbnails side-by-side
- **Click-to-enlarge**: Lightbox modal for detailed image viewing
- **Act grouping**: Zones organized under act headers, not tabs
- **All data visible**: No expandable/collapsible cards, everything shown
- **localStorage key**: `poe2-zone-progress` storing object with zone IDs as keys
- **Dark theme**: PoE-inspired color scheme (browns, blacks, golds)
- **Progress tracking**: Both global and per-act progress displayed

---

## Notes
- All paths must be relative for GitHub Pages compatibility
- Images will be referenced as `images/[filename]` from JSON
- Zone completion tracked by unique identifier (act_number + zone_name)
- Lightbox supports keyboard navigation (ESC, arrows)
- Filter is client-side only (no URL parameters needed)
