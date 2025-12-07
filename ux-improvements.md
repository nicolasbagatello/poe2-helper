# UX/Design Improvements & New Features

## Document Purpose
Track planned improvements, new features, and design changes for the PoE2 Campaign Zone Guide.

**Last Updated:** 2025-12-07 (v1.2.0 features completed - CSV Walkthrough Integration)

---

## Priority Legend
- 🔴 **High Priority** - Critical UX issues or highly requested features
- 🟡 **Medium Priority** - Nice-to-have improvements
- 🟢 **Low Priority** - Polish and minor enhancements

---

## 1. Visual & Design Improvements

### Header & Branding
- [x] 🟡 Add PoE2 logo/icon to header (2025-12-07 - custom SVG with gold borders and "PoE2" text, inline with title)
- [x] 🟢 Create favicon for browser tab (2025-12-07 - matching SVG favicon displaying "PoE2" in URL bar)
- [ ] 🟢 Add subtle background pattern/texture
- [ ] 🟡 Improve header gradient animation

### Progress Bar Enhancements
- [x] 🟡 Show completion confetti animation at 100% (2025-12-07 - 100 colorful particles with physics)

### Zone Card Improvements
- [x] 🟡 Add "mark all in act as done" quick action (2025-12-07 - green button in act header)
- [ ] 🟡 Add "individual turn on / off greyout for each quest in each zone"
- [x] 🔴 Add tabs per each Act to make the view more compact (2025-12-06)
- [x] 🔴 Make font smaller to make each card more compact (2025-12-06 - reduced all fonts by ~15%)
- [x] 🔴 Change reward section so it is easy to identify from the quest (2025-12-06 - separate gold-background section)
- [x] 🔴 Create a specific icon for Book of Specialisation rewards (2025-12-06 - added 📖 icon)
- [x] ~~🟡 Collapsible sections toggle~~ (2025-12-06 - REMOVED for cleaner UI)
- [x] 🔴 Compact all zone card sections (2025-12-06 - reduced padding, margins, font sizes in route/rewards/POI/notes sections by ~25-30%)
- [x] 🔴 Highlight important rewards with color coding (2025-12-06 - Book of Specialisation in RED with 📖, Permanent Buffs in ORANGE with ⚡, both with subtle pulse animations)

### Image & Lightbox
- [ ] 🟢 Add lazy loading optimization for images

---

## 2. User Experience Enhancements

### Navigation & Search
- [x] 🔴 Add search bar (search by zone name, boss, reward) (2025-12-06 - real-time filtering in header)
- [x] 🟡 Add "jump to act" quick navigation menu (2025-12-06 - implemented as sticky tabs)
- [x] 🟡 Add "back to top" floating button (2025-12-07 - smooth scroll with fade-in animation)
- [ ] 🟡 Add breadcrumb navigation
- [ ] 🟢 Add keyboard shortcuts panel (press '?' to view)
- [ ] 🟡 Add "previous/next zone" navigation buttons

### Filtering & Sorting
- [x] 🟡 Add filter by reward type (skill gems, support gems, etc.) (2025-12-07 - dropdown with 6 reward categories)
- [ ] 🟡 Add multi-select filters (combine multiple filters)


---

## 3. New Features

### Content Additions
- [ ] 🟢 Add video guide links integration


### Accessibility
- [ ] 🔴 Add screen reader support improvements
- [ ] 🔴 Add keyboard-only navigation guide
- [ ] 🟡 Add high contrast mode
- [x] 🟡 Add font size controls (2025-12-06 - A-/A+ buttons with 4 size levels, saved to localStorage)

---

## 4. Technical Improvements

### Performance
- [ ] 🟡 Implement virtual scrolling for large zone lists
- [ ] 🟡 Optimize JavaScript bundle size

### Data & Storage
- [x] 🟢 localStorage persistence for user data (2025-12-06 - progress, notes, and font size preference all saved)
- [ ] 🟡 Create JSON API endpoint structure
- [ ] 🟢 Add data versioning system
- [ ] 🟢 Create data schema validator

### Developer Experience
- [ ] 🟢 Add build/bundling system (webpack/vite)
- [ ] 🟢 Add TypeScript support
- [ ] 🟢 Add automated testing (unit/e2e)
- [ ] 🟢 Add linting and formatting (ESLint, Prettier)
- [ ] 🟢 Add CI/CD pipeline

---

## 5. Content Updates

### Data Completeness
- [ ] 🔴 Add missing zone images (5 zones: Mud Burrow, Venom Crypts, Molten Vault, Kingsmarch, Abandoned Prison, Trial of Ancestors)
- [ ] 🟡 Update data for latest game version
- [ ] 🟡 Add alternative layout variations where applicable
- [x] 🟡 Verify all Book of Specialisation rewards (9/9 verified - 2025-12-06)
- [ ] 🟡 Verify all boss names and rewards accuracy
- [ ] 🟢 Add community-submitted layout screenshots

### Documentation
- [ ] 🟡 Create user guide/tutorial

---

## 7. Quick Wins (Easy Implementations)

### Low-Hanging Fruit
- [x] 🟢 Add "last updated" timestamp in footer (2025-12-06 - added to footer with dynamic date)
- [x] 🟢 Add GitHub star button (2025-12-06 - added styled button in footer)
- [x] 🟢 Add version number display (2025-12-06 - shows v1.1.0 in footer)
- [ ] 🟢 Add "new features" changelog modal
- [x] 🟢 Add tooltips to all buttons (2025-12-06 - added title attributes with helpful descriptions)
- [ ] 🟢 Add print stylesheet for printing guides

---

## 8. Long-Term Vision

### Future Expansions
- [ ] 🟢 Add endgame atlas/mapping guide
- [ ] 🟢 Add item crafting calculator
- [ ] 🟢 Add skill tree planner integration
- [ ] 🟢 Add build guide integration
- [ ] 🟢 Add trade market price tracker
- [ ] 🟢 Multi-language support (i18n)

---

## Priority Queue (Next to Implement)

Based on impact vs. effort, prioritize in this order:

1. ✅ ~~🔴 **Search functionality**~~ - High impact, medium effort (COMPLETED 2025-12-06)
2. ✅ ~~🔴 **Export/Import progress**~~ - High impact, low effort (COMPLETED 2025-12-06)
3. 🔴 **Missing zone images** - High impact, low effort (if images available)
4. ❌ ~~🟡 **Collapsible POI sections**~~ - REMOVED 2025-12-06 (cleaner UI without collapse)
5. ✅ ~~🟡 **Statistics dashboard**~~ - Medium impact, medium effort (COMPLETED 2025-12-06)
6. ✅ ~~🟡 **Jump to act navigation**~~ - Medium impact, low effort (COMPLETED 2025-12-06)
7. ✅ ~~🟡 **Notes per zone**~~ - Medium impact, medium effort (COMPLETED 2025-12-06)
8. 🟡 **Mobile touch improvements** - High impact on mobile, medium effort

---

## Changelog

### Version History
- **v1.2.0** - CSV Walkthrough Data Integration (2025-12-07)
  - 📊 **Complete Data Integration**: Integrated CSV walkthrough data for all 68 zones across Acts 1-4
  - ✅ **Optional Content Toggle**: Added "Hide Optional" button to show/hide optional POIs and content
  - 📋 **Walkthrough Mode**: New "Show Walkthrough" button displays step-by-step walkthrough instructions with checkboxes
  - 📍 **Location Hints**: POIs now show specific location hints (e.g., "Always north/northeast of waypoint")
  - 🎯 **Optional POI Badges**: Optional POIs marked with "Optional" badge and lighter styling
  - 💡 **Zone Tips**: Display CSV-derived tips and notes for each zone in a dedicated section
  - 🏛️ **Town Visits**: Show ordered town visit instructions for quest sequences
  - ✨ **Enhanced Data**: All zones now include `notes`, `optional` flags, `location_hint`, `walkthrough_steps`, and `town_visits` fields
  - 🎨 **Walkthrough Styling**: Custom checkbox styles, order badges (#1, #2, OPT), and helpful tips for each step
  - 🔄 **Dynamic UI**: Walkthrough sections appear/hide based on mode toggle, optional POIs filter based on visibility setting

- **v1.1.0** - Major UX update (2025-12-06/07)
  - ✨ **Quick Wins**: Added tooltips to all buttons, version number display, last updated timestamp, and GitHub star button
  - 🔍 **Search**: Real-time search filtering in header for zones, bosses, and rewards
  - 📊 **Statistics Dashboard**: Collapsible dashboard showing completion stats per act and Books of Specialisation collected
  - 💾 **Export/Import**: Export progress and notes as JSON file, import on any device
  - 📝 **Notes Per Zone**: Add personal notes to each zone with auto-save to localStorage (persists across sessions)
  - 📑 **Act Tabs**: Sticky tab navigation to quickly switch between acts
  - 🎨 **UI Polish**: Reduced font sizes by ~15%, separate gold-background rewards section, Book of Specialisation icon (📖)
  - ♿ **Accessibility**: Font size controls (A-/A+) with 4 size levels (small, normal, large, xlarge), preference saved to localStorage
  - 🧹 **UI Cleanup**: Removed collapse toggle and layout confidence display for cleaner, simpler zone cards
  - 📦 **Compact Sections**: Reduced padding, margins, and font sizes in all zone card sections (route, rewards, POI, notes) by ~25-30% for smaller cards
  - 🎨 **Reward Highlighting**: Color-coded important rewards - Book of Specialisation (RED 📖) and Permanent Buffs (ORANGE ⚡) with subtle pulse animations and glowing borders
  - 📚 **Attribution**: Added sources & credits section in footer linking to Mobalytics and Community Spreadsheet
  - ⬆️ **Back to Top**: Floating button with smooth scroll appears after scrolling 300px, golden gradient with hover animation (2025-12-07)
  - 🎉 **Confetti Celebration**: 100 colorful particles rain down when reaching 100% completion with congratulations message (2025-12-07)
  - ✓ **Mark All as Done**: Quick action button in each act header to mark all zones in that act as completed with confirmation (2025-12-07)
  - 🔍 **Reward Type Filter**: Dropdown filter to show only zones containing specific rewards - Books, Buffs, Skill Gems, Support Gems, or Passive Points (2025-12-07)
  - 📐 **Compact UI**: Reduced header, progress bar, statistics, controls, act tabs, and act headers by ~30-40% - smaller fonts, tighter spacing, merged stats with progress section (2025-12-07)
  - 🎨 **Custom Branding**: Created custom SVG favicon and header logo displaying "PoE2" with gold/bronze color scheme, decorative corners, positioned inline with title (2025-12-07)
  - 📏 **Act Header Redesign**: Compacted act headers with title and "Mark All as Done" button inline, progress text on second line, closer to zone cards (2025-12-07)

- **v1.0.0** - Initial release (2025-12-06)
  - Core features: zone tracking, progress bar, lightbox, filter, reset
  - 65 zones across 4 acts
  - 60 zones with images

---

## How to Use This Document

1. **Review** the sections above
2. **Check boxes** `[ ]` → `[x]` as you complete items
3. **Add new ideas** under appropriate sections
4. **Update priority** labels as needed
5. **Document changes** in the Changelog section
6. **Keep it updated** after each implementation sprint

---

*This is a living document - update regularly as the project evolves!*
