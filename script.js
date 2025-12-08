// ===================================
// PATH OF EXILE 2 - ZONE GUIDE JAVASCRIPT
// ===================================

// ===================================
// Global State
// ===================================
let zonesData = null;
let completionState = {};
let currentLightboxImages = [];
let currentLightboxIndex = 0;
let filterActive = false;
let searchQuery = '';
let rewardFilter = 'all';
let activeActNumber = 1;
let showOptional = true;
let walkthroughMode = false;

// ===================================
// Constants
// ===================================
const STORAGE_KEY = 'poe2-zone-progress';
const NOTES_STORAGE_KEY = 'poe2-zone-notes';
const FONT_SIZE_KEY = 'poe2-font-size';
const PREFERENCES_KEY = 'poe2-user-preferences';
const DATA_PATH = 'data/zones.json';
const IMAGES_PATH = 'images/';

// ===================================
// Initialization
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    try {
        // Load user preferences first
        loadUserPreferences();

        // Load completion state from localStorage
        loadCompletionState();

        // Load and apply font size preference
        loadFontSize();

        // Fetch zones data
        await fetchZonesData();

        // Render act tabs
        renderActTabs();

        // Render all acts and zones
        renderActs();

        // Update progress
        updateProgress();

        // Initialize event listeners
        initEventListeners();

        // Apply saved preferences to UI
        applyPreferencesToUI();

    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Failed to load zone data. Please refresh the page.');
    }
}

function applyPreferencesToUI() {
    // Update optional button UI
    const optionalBtn = document.getElementById('optionalBtn');
    if (optionalBtn) {
        if (showOptional) {
            optionalBtn.classList.add('active');
            optionalBtn.innerHTML = '<span class="btn-icon">👁</span> Hide Optional';
        } else {
            optionalBtn.classList.remove('active');
            optionalBtn.innerHTML = '<span class="btn-icon">👁</span> Show Optional';
        }
    }

    // Update walkthrough button UI
    const walkthroughBtn = document.getElementById('walkthroughBtn');
    if (walkthroughBtn) {
        if (walkthroughMode) {
            walkthroughBtn.classList.add('active');
            walkthroughBtn.innerHTML = '<span class="btn-icon">📋</span> Hide Walkthrough';
        } else {
            walkthroughBtn.classList.remove('active');
            walkthroughBtn.innerHTML = '<span class="btn-icon">📋</span> Show Walkthrough';
        }
    }

    // Update filter button UI
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        if (filterActive) {
            filterBtn.classList.add('active');
            filterBtn.innerHTML = '<span class="btn-icon">&#9776;</span> Show All Zones';
        } else {
            filterBtn.classList.remove('active');
            filterBtn.innerHTML = '<span class="btn-icon">&#9776;</span> Show Only Undone';
        }
    }

    // Update reward filter dropdown
    const rewardFilterSelect = document.getElementById('rewardFilter');
    if (rewardFilterSelect) {
        rewardFilterSelect.value = rewardFilter;
    }

    // Apply filters based on loaded preferences
    applyFilters();
}

// ===================================
// Data Loading
// ===================================
async function fetchZonesData() {
    try {
        const response = await fetch(DATA_PATH);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        zonesData = data;
    } catch (error) {
        console.error('Error fetching zones data:', error);
        throw error;
    }
}

// ===================================
// Local Storage Functions
// ===================================
function loadCompletionState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            completionState = JSON.parse(saved);
        } catch (error) {
            console.error('Error parsing saved state:', error);
            completionState = {};
        }
    }
}

function saveCompletionState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(completionState));
    } catch (error) {
        console.error('Error saving state:', error);
    }
}

// ===================================
// User Preferences Functions
// ===================================
function loadUserPreferences() {
    try {
        const saved = localStorage.getItem(PREFERENCES_KEY);
        if (saved) {
            const prefs = JSON.parse(saved);
            // Apply preferences with defaults
            showOptional = prefs.showOptional !== undefined ? prefs.showOptional : true;
            walkthroughMode = prefs.walkthroughMode !== undefined ? prefs.walkthroughMode : true;
            filterActive = prefs.filterActive !== undefined ? prefs.filterActive : false;
            rewardFilter = prefs.rewardFilter || 'all';
            activeActNumber = prefs.activeActNumber || 1;
        } else {
            // Default preferences for first time users
            showOptional = true;
            walkthroughMode = true;
            filterActive = false;
            rewardFilter = 'all';
            activeActNumber = 1;
        }
    } catch (error) {
        console.error('Error loading preferences:', error);
        // Use defaults on error
        showOptional = true;
        walkthroughMode = true;
        filterActive = false;
        rewardFilter = 'all';
        activeActNumber = 1;
    }
}

function saveUserPreferences() {
    try {
        const prefs = {
            showOptional,
            walkthroughMode,
            filterActive,
            rewardFilter,
            activeActNumber
        };
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
    } catch (error) {
        console.error('Error saving preferences:', error);
    }
}

// ===================================
// Zone Notes Functions
// ===================================
function loadZoneNote(zoneId) {
    try {
        const notesData = localStorage.getItem(NOTES_STORAGE_KEY);
        if (!notesData) return '';

        const notes = JSON.parse(notesData);
        return notes[zoneId] || '';
    } catch (error) {
        console.error('Error loading zone note:', error);
        return '';
    }
}

function saveZoneNote(zoneId, noteText) {
    try {
        const notesData = localStorage.getItem(NOTES_STORAGE_KEY);
        const notes = notesData ? JSON.parse(notesData) : {};

        if (noteText.trim() === '') {
            delete notes[zoneId];
        } else {
            notes[zoneId] = noteText;
        }

        localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
        console.error('Error saving zone note:', error);
    }
}

// ===================================
// Font Size Controls
// ===================================
function loadFontSize() {
    try {
        const savedSize = localStorage.getItem(FONT_SIZE_KEY);
        if (savedSize) {
            applyFontSize(savedSize);
        } else {
            // Default to normal if no saved preference
            applyFontSize('normal');
        }
    } catch (error) {
        console.error('Error loading font size:', error);
        applyFontSize('normal');
    }
}

function saveFontSize(size) {
    try {
        localStorage.setItem(FONT_SIZE_KEY, size);
    } catch (error) {
        console.error('Error saving font size:', error);
    }
}

function applyFontSize(size) {
    const htmlElement = document.documentElement;

    // Remove all font size classes
    htmlElement.classList.remove('font-size-small', 'font-size-normal', 'font-size-large', 'font-size-xlarge');

    // Add the new size class
    htmlElement.classList.add(`font-size-${size}`);

    // Update the label to show current size
    updateFontSizeLabel(size);
}

function updateFontSizeLabel(size) {
    const label = document.querySelector('.font-size-label');
    if (label) {
        label.textContent = `Font Size: ${size.charAt(0).toUpperCase() + size.slice(1)}`;
    }
}

function increaseFontSize() {
    const htmlElement = document.documentElement;
    let currentSize = 'normal';

    // Detect current size from class
    if (htmlElement.classList.contains('font-size-small')) {
        currentSize = 'small';
    } else if (htmlElement.classList.contains('font-size-normal')) {
        currentSize = 'normal';
    } else if (htmlElement.classList.contains('font-size-large')) {
        currentSize = 'large';
    } else if (htmlElement.classList.contains('font-size-xlarge')) {
        currentSize = 'xlarge';
    }

    let newSize;
    if (currentSize === 'small') {
        newSize = 'normal';
    } else if (currentSize === 'normal') {
        newSize = 'large';
    } else if (currentSize === 'large') {
        newSize = 'xlarge';
    } else {
        return; // Already at maximum
    }

    applyFontSize(newSize);
    saveFontSize(newSize);
}

function decreaseFontSize() {
    const htmlElement = document.documentElement;
    let currentSize = 'normal';

    // Detect current size from class
    if (htmlElement.classList.contains('font-size-small')) {
        currentSize = 'small';
    } else if (htmlElement.classList.contains('font-size-normal')) {
        currentSize = 'normal';
    } else if (htmlElement.classList.contains('font-size-large')) {
        currentSize = 'large';
    } else if (htmlElement.classList.contains('font-size-xlarge')) {
        currentSize = 'xlarge';
    }

    let newSize;
    if (currentSize === 'xlarge') {
        newSize = 'large';
    } else if (currentSize === 'large') {
        newSize = 'normal';
    } else if (currentSize === 'normal') {
        newSize = 'small';
    } else {
        return; // Already at minimum
    }

    applyFontSize(newSize);
    saveFontSize(newSize);
}

// ===================================
// Back to Top Button Functions
// ===================================
function toggleBackToTopButton() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    // Show button when scrolled down 300px from the top
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

function scrollToTop() {
    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===================================
// Confetti Animation
// ===================================
function triggerConfetti() {
    const colors = ['#c9a961', '#8b7355', '#d4af37', '#ffd700', '#ff8c00', '#dc3545'];
    const confettiCount = 100;
    const duration = 3000; // 3 seconds

    for (let i = 0; i < confettiCount; i++) {
        createConfettiPiece(colors, duration, i);
    }

    // Show congratulations message
    setTimeout(() => {
        showSuccessMessage('🎉 Congratulations! All zones completed! 🎉');
    }, 500);
}

function createConfettiPiece(colors, duration, index) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';

    // Random properties
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100; // Random horizontal position (%)
    const animationDelay = Math.random() * 200; // Stagger the animations
    const size = Math.random() * 8 + 4; // Random size between 4-12px
    const rotation = Math.random() * 360; // Random rotation
    const drift = (Math.random() - 0.5) * 200; // Random horizontal drift

    confetti.style.cssText = `
        position: fixed;
        top: -20px;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        opacity: 1;
        z-index: 9999;
        pointer-events: none;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        animation: confetti-fall ${duration}ms ease-in-out ${animationDelay}ms forwards;
        --drift: ${drift}px;
        --rotation: ${rotation}deg;
    `;

    document.body.appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, duration + animationDelay + 100);
}

// ===================================
// Export/Import Progress Functions
// ===================================
function exportProgress() {
    try {
        // Get notes data
        const notesData = localStorage.getItem(NOTES_STORAGE_KEY);
        const notes = notesData ? JSON.parse(notesData) : {};

        const exportData = {
            version: '1.1.0',
            exportDate: new Date().toISOString(),
            completionState: completionState,
            notes: notes
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `poe2-progress-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showSuccessMessage('Progress exported successfully!');
    } catch (error) {
        console.error('Error exporting progress:', error);
        showError('Failed to export progress. Please try again.');
    }
}

function importProgress() {
    const fileInput = document.getElementById('importFile');
    fileInput.click();
}

function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importData = JSON.parse(e.target.result);

            // Validate the imported data
            if (!importData.completionState) {
                throw new Error('Invalid progress file format');
            }

            // Confirm with user before overwriting
            if (Object.keys(completionState).length > 0) {
                const confirmed = confirm(
                    'This will overwrite your current progress. Are you sure you want to continue?'
                );
                if (!confirmed) {
                    event.target.value = ''; // Reset file input
                    return;
                }
            }

            // Import the completion state
            completionState = importData.completionState;
            saveCompletionState();

            // Import notes if available
            if (importData.notes) {
                localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(importData.notes));
            }

            // Re-render the UI
            renderActs();
            updateProgress();

            showSuccessMessage('Progress and notes imported successfully!');
        } catch (error) {
            console.error('Error importing progress:', error);
            showError('Failed to import progress. Please make sure the file is valid.');
        } finally {
            event.target.value = ''; // Reset file input
        }
    };

    reader.onerror = function() {
        showError('Failed to read file. Please try again.');
        event.target.value = ''; // Reset file input
    };

    reader.readAsText(file);
}

function getZoneId(actNumber, zoneName) {
    return `act${actNumber}-${zoneName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function isZoneCompleted(actNumber, zoneName) {
    const zoneId = getZoneId(actNumber, zoneName);
    return completionState[zoneId] === true;
}

function toggleZoneCompletion(actNumber, zoneName) {
    const zoneId = getZoneId(actNumber, zoneName);
    completionState[zoneId] = !completionState[zoneId];
    saveCompletionState();
    updateProgress();
    updateZoneCardUI(actNumber, zoneName);
    updateActProgress(actNumber);
    applyFilters();
}

// Collapse functionality removed - no longer used
// function toggleZoneCollapse(card) {
//     const content = card.querySelector('.zone-collapsible-content');
//     const collapseBtn = card.querySelector('.collapse-toggle');
//     if (!content || !collapseBtn) return;
//     card.classList.toggle('collapsed');
//     if (card.classList.contains('collapsed')) {
//         collapseBtn.innerHTML = '&#9654;'; // Right arrow
//         content.style.maxHeight = '0';
//     } else {
//         collapseBtn.innerHTML = '&#9660;'; // Down arrow
//         content.style.maxHeight = content.scrollHeight + 'px';
//     }
// }

function markAllZonesInAct(actNumber, zones) {
    const actName = `Act ${actNumber}`;
    const confirmed = confirm(`Mark all ${zones.length} zones in ${actName} as completed?`);

    if (!confirmed) return;

    let markedCount = 0;
    zones.forEach(zone => {
        const zoneId = getZoneId(actNumber, zone.zone_name);
        if (!completionState[zoneId]) {
            completionState[zoneId] = true;
            markedCount++;
            // Update individual zone card UI
            updateZoneCardUI(actNumber, zone.zone_name);
        }
    });

    if (markedCount > 0) {
        saveCompletionState();
        updateProgress();
        updateActProgress(actNumber);
        applyFilters();
        showSuccessMessage(`✓ Marked ${markedCount} zone${markedCount !== 1 ? 's' : ''} as completed in ${actName}!`);
    } else {
        showSuccessMessage(`All zones in ${actName} are already completed!`);
    }
}

function resetAllProgress() {
    const confirmed = confirm('Are you sure you want to reset all progress? This cannot be undone.');
    if (confirmed) {
        completionState = {};
        saveCompletionState();
        updateProgress();

        // Update all zone cards
        document.querySelectorAll('.zone-card').forEach(card => {
            card.classList.remove('completed');
            const toggle = card.querySelector('.completion-toggle');
            if (toggle) {
                toggle.textContent = 'Mark as Done';
            }
        });

        // Update all act progress
        if (zonesData && zonesData.acts) {
            zonesData.acts.forEach(act => {
                updateActProgress(act.act_number);
            });
        }
    }
}

// ===================================
// Rendering Functions
// ===================================
function renderActTabs() {
    const tabsContainer = document.getElementById('actTabs');
    if (!tabsContainer || !zonesData) return;

    tabsContainer.innerHTML = '';

    zonesData.acts.forEach(act => {
        const tab = document.createElement('button');
        tab.className = 'act-tab';
        tab.dataset.actNumber = act.act_number;
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', `act-${act.act_number}`);
        tab.setAttribute('aria-selected', act.act_number === activeActNumber ? 'true' : 'false');

        if (act.act_number === activeActNumber) {
            tab.classList.add('active');
        }

        const actName = document.createElement('span');
        actName.textContent = `Act ${act.act_number}`;

        const actLabel = document.createElement('span');
        actLabel.className = 'act-tab-label';
        actLabel.textContent = act.act_name;

        tab.appendChild(actName);
        tab.appendChild(actLabel);

        tab.addEventListener('click', () => switchToAct(act.act_number));

        tabsContainer.appendChild(tab);
    });
}

function renderActs() {
    const container = document.getElementById('actsContainer');
    if (!container || !zonesData) return;

    container.innerHTML = '';

    zonesData.acts.forEach(act => {
        const actElement = createActElement(act);
        container.appendChild(actElement);
    });

    // Show only active act
    showActiveAct();
}

function createActElement(act) {
    const actSection = document.createElement('div');
    actSection.className = 'act-section';
    actSection.id = `act-${act.act_number}`;

    // Act header
    const actHeader = document.createElement('div');
    actHeader.className = 'act-header';

    const actTitle = document.createElement('h2');
    actTitle.className = 'act-title';
    actTitle.textContent = `Act ${act.act_number}: ${act.act_name}`;

    const actProgress = document.createElement('div');
    actProgress.className = 'act-progress';
    actProgress.id = `act-progress-${act.act_number}`;

    // Quick action: Mark all zones in act as done
    const markAllBtn = document.createElement('button');
    markAllBtn.className = 'btn btn-mark-all-act';
    markAllBtn.innerHTML = '<span class="btn-icon">✓</span>Mark All as Done';
    markAllBtn.title = `Mark all zones in Act ${act.act_number} as completed`;
    markAllBtn.addEventListener('click', () => markAllZonesInAct(act.act_number, act.zones));

    actHeader.appendChild(actTitle);
    actHeader.appendChild(actProgress);
    actHeader.appendChild(markAllBtn);

    // Zones grid
    const zonesGrid = document.createElement('div');
    zonesGrid.className = 'zones-grid';

    act.zones.forEach(zone => {
        const zoneCard = createZoneCard(zone, act.act_number);
        zonesGrid.appendChild(zoneCard);
    });

    actSection.appendChild(actHeader);
    actSection.appendChild(zonesGrid);

    // Update act progress
    updateActProgress(act.act_number);

    return actSection;
}

function createZoneCard(zone, actNumber) {
    const card = document.createElement('div');
    card.className = 'zone-card';
    card.dataset.actNumber = actNumber;
    card.dataset.zoneName = zone.zone_name;

    // Check if completed
    if (isZoneCompleted(actNumber, zone.zone_name)) {
        card.classList.add('completed');
    }

    // Zone header
    const header = document.createElement('div');
    header.className = 'zone-header';

    const titleGroup = document.createElement('div');
    titleGroup.className = 'zone-title-group';

    const zoneName = document.createElement('h3');
    zoneName.className = 'zone-name';
    zoneName.textContent = zone.zone_name;

    titleGroup.appendChild(zoneName);

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'completion-toggle';
    toggleBtn.textContent = isZoneCompleted(actNumber, zone.zone_name) ? 'Mark as Undone' : 'Mark as Done';
    toggleBtn.addEventListener('click', () => toggleZoneCompletion(actNumber, zone.zone_name));

    header.appendChild(titleGroup);
    header.appendChild(toggleBtn);

    // Images section
    const imagesSection = createImagesSection(zone.layout_image_name);

    // Suggested route
    const routeSection = createRouteSection(zone.suggested_route);

    // Rewards (extracted from POIs)
    const rewardsSection = createRewardsSection(zone.points_of_interest);

    // Points of interest
    const poiSection = createPOISection(zone.points_of_interest);

    // Quests
    const questsSection = createQuestsSection(zone.quests);

    // Zone notes from JSON (if exists)
    const zoneNotesSection = createZoneNotesFromJSON(zone.notes);

    // Walkthrough steps (if walkthrough mode enabled)
    const walkthroughSection = createWalkthroughSection(zone.walkthrough_steps, actNumber, zone.zone_name);

    // Town visits
    const townVisitsSection = createTownVisitsSection(zone.town_visits);

    // Personal notes section
    const personalNotesSection = createNotesSection(actNumber, zone.zone_name);

    // Append all sections
    card.appendChild(header);
    if (imagesSection) card.appendChild(imagesSection);
    if (routeSection) card.appendChild(routeSection);
    if (rewardsSection) card.appendChild(rewardsSection);
    if (poiSection) card.appendChild(poiSection);
    if (questsSection) card.appendChild(questsSection);
    if (zoneNotesSection) card.appendChild(zoneNotesSection);
    if (walkthroughSection) card.appendChild(walkthroughSection);
    if (townVisitsSection) card.appendChild(townVisitsSection);
    if (personalNotesSection) card.appendChild(personalNotesSection);

    return card;
}

function createImagesSection(imageNames) {
    const section = document.createElement('div');
    section.className = 'zone-images';

    if (!imageNames) {
        const noImage = document.createElement('div');
        noImage.className = 'zone-no-image';
        noImage.textContent = 'No layout image available';
        section.appendChild(noImage);
        return section;
    }

    const grid = document.createElement('div');
    grid.className = 'zone-images-grid';

    const images = Array.isArray(imageNames) ? imageNames : [imageNames];

    images.forEach((imageName, index) => {
        const img = document.createElement('img');
        img.className = 'zone-image-thumbnail';
        if (images.length === 1) {
            img.classList.add('zone-image-single');
        }
        img.src = IMAGES_PATH + imageName;
        img.alt = `Zone layout ${index + 1}`;
        img.loading = 'lazy';

        // Add click event for lightbox
        img.addEventListener('click', () => openLightbox(images, index));

        // Error handling
        img.addEventListener('error', () => {
            img.style.display = 'none';
            console.error(`Failed to load image: ${imageName}`);
        });

        grid.appendChild(img);
    });

    section.appendChild(grid);
    return section;
}

function createRouteSection(route) {
    if (!route) return null;

    const section = document.createElement('div');
    section.className = 'zone-section';

    const title = document.createElement('h4');
    title.className = 'zone-section-title';
    title.textContent = 'Suggested Route';

    const routeText = document.createElement('div');
    routeText.className = 'zone-route';
    routeText.textContent = route;

    section.appendChild(title);
    section.appendChild(routeText);

    return section;
}

function createRewardsSection(pointsOfInterest) {
    if (!pointsOfInterest || pointsOfInterest.length === 0) return null;

    // Extract rewards from POIs
    const rewards = pointsOfInterest.filter(poi => poi.reward);
    if (rewards.length === 0) return null;

    const section = document.createElement('div');
    section.className = 'zone-section zone-rewards';

    const title = document.createElement('h4');
    title.className = 'zone-section-title';
    title.textContent = 'Rewards';

    const list = document.createElement('ul');
    list.className = 'rewards-list';

    rewards.forEach(poi => {
        const item = document.createElement('li');
        item.className = 'reward-item';

        // Check reward type for special styling
        const isBookOfSpec = poi.reward && poi.reward.includes('Book of Specialisation');
        const isPermanentBuff = poi.reward && poi.reward.includes('Permanent Buff');

        // Add special classes for important rewards
        if (isBookOfSpec) {
            item.classList.add('reward-book-of-spec');
        } else if (isPermanentBuff) {
            item.classList.add('reward-permanent-buff');
        }

        const name = document.createElement('div');
        name.className = 'reward-name';

        // Add Book of Specialisation icon (red)
        if (isBookOfSpec) {
            const icon = document.createElement('span');
            icon.className = 'reward-icon reward-icon-book';
            icon.textContent = '📖';
            name.appendChild(icon);
        }

        // Add Permanent Buff icon (orange/yellow)
        if (isPermanentBuff) {
            const icon = document.createElement('span');
            icon.className = 'reward-icon reward-icon-buff';
            icon.textContent = '⚡';
            name.appendChild(icon);
        }

        const nameText = document.createTextNode(poi.name);
        name.appendChild(nameText);

        const details = document.createElement('div');
        details.className = 'reward-details';
        details.textContent = poi.reward;

        item.appendChild(name);
        item.appendChild(details);

        list.appendChild(item);
    });

    section.appendChild(title);
    section.appendChild(list);

    return section;
}

function createPOISection(pointsOfInterest) {
    if (!pointsOfInterest || pointsOfInterest.length === 0) return null;

    const section = document.createElement('div');
    section.className = 'zone-section';

    const title = document.createElement('h4');
    title.className = 'zone-section-title';
    title.textContent = 'Points of Interest';

    const list = document.createElement('ul');
    list.className = 'poi-list';

    pointsOfInterest.forEach(poi => {
        // Skip optional POIs if showOptional is false
        if (!showOptional && poi.optional) {
            return;
        }

        const item = document.createElement('li');
        item.className = 'poi-item';

        // Add optional class for styling
        if (poi.optional) {
            item.classList.add('poi-optional');
        }

        const name = document.createElement('div');
        name.className = 'poi-name';

        // Add optional badge
        if (poi.optional) {
            const optionalBadge = document.createElement('span');
            optionalBadge.className = 'poi-optional-badge';
            optionalBadge.textContent = 'Optional';
            name.appendChild(optionalBadge);
        }

        const nameText = document.createTextNode(poi.name);
        name.appendChild(nameText);

        item.appendChild(name);

        // Add location hint if available
        if (poi.location_hint) {
            const locationHint = document.createElement('div');
            locationHint.className = 'poi-location-hint';
            locationHint.textContent = `📍 ${poi.location_hint}`;
            item.appendChild(locationHint);
        }

        list.appendChild(item);
    });

    // Don't show section if all POIs were filtered out
    if (list.children.length === 0) {
        return null;
    }

    section.appendChild(title);
    section.appendChild(list);

    return section;
}

function createQuestsSection(quests) {
    if (!quests || quests.length === 0) return null;

    const section = document.createElement('div');
    section.className = 'zone-section';

    const title = document.createElement('h4');
    title.className = 'zone-section-title';
    title.textContent = 'Quests';

    quests.forEach(quest => {
        const questItem = document.createElement('div');
        questItem.className = 'quest-item';

        const questName = document.createElement('div');
        questName.className = 'quest-name';
        questName.textContent = quest.name;

        questItem.appendChild(questName);

        if (quest.description) {
            const questDesc = document.createElement('div');
            questDesc.className = 'quest-description';
            questDesc.textContent = quest.description;
            questItem.appendChild(questDesc);
        }

        section.appendChild(questItem);
    });

    return section;
}

function createZoneNotesFromJSON(notes) {
    if (!notes) return null;

    const section = document.createElement('div');
    section.className = 'zone-section zone-tips';

    const title = document.createElement('h4');
    title.className = 'zone-section-title';
    title.textContent = '💡 Tips & Notes';

    const notesText = document.createElement('div');
    notesText.className = 'zone-tips-text';
    notesText.textContent = notes;

    section.appendChild(title);
    section.appendChild(notesText);

    return section;
}

function createWalkthroughSection(walkthroughSteps, actNumber, zoneName) {
    if (!walkthroughSteps || walkthroughSteps.length === 0 || !walkthroughMode) return null;

    const section = document.createElement('div');
    section.className = 'zone-section zone-walkthrough';

    const title = document.createElement('h4');
    title.className = 'zone-section-title';
    title.textContent = '📋 Walkthrough Steps';

    const stepsList = document.createElement('div');
    stepsList.className = 'walkthrough-steps-list';

    walkthroughSteps.forEach((step, index) => {
        const stepItem = document.createElement('div');
        stepItem.className = 'walkthrough-step';
        if (step.optional) {
            stepItem.classList.add('optional');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `walkthrough-${getZoneId(actNumber, zoneName)}-step-${index}`;
        checkbox.className = 'walkthrough-checkbox';

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.className = 'walkthrough-label';

        const orderBadge = document.createElement('span');
        orderBadge.className = 'walkthrough-order';
        orderBadge.textContent = step.order === 'opt' ? 'OPT' : `#${step.order}`;
        if (step.order === 'opt') {
            orderBadge.classList.add('optional-badge');
        }

        const actionText = document.createElement('span');
        actionText.className = 'walkthrough-action';
        actionText.textContent = step.action;

        label.appendChild(orderBadge);
        label.appendChild(actionText);

        stepItem.appendChild(checkbox);
        stepItem.appendChild(label);

        if (step.tip) {
            const tip = document.createElement('div');
            tip.className = 'walkthrough-tip';
            tip.textContent = `💡 ${step.tip}`;
            stepItem.appendChild(tip);
        }

        stepsList.appendChild(stepItem);
    });

    section.appendChild(title);
    section.appendChild(stepsList);

    return section;
}

function createTownVisitsSection(townVisits) {
    if (!townVisits || townVisits.length === 0) return null;

    const section = document.createElement('div');
    section.className = 'zone-section zone-town-visits';

    const title = document.createElement('h4');
    title.className = 'zone-section-title';
    title.textContent = '🏛️ Town Visits';

    const visitsList = document.createElement('div');
    visitsList.className = 'town-visits-list';

    townVisits.forEach((visit, index) => {
        const visitItem = document.createElement('div');
        visitItem.className = 'town-visit-item';

        const orderBadge = document.createElement('span');
        orderBadge.className = 'town-visit-order';
        orderBadge.textContent = `#${visit.order}`;

        const instructions = document.createElement('span');
        instructions.className = 'town-visit-instructions';
        instructions.textContent = visit.instructions;

        visitItem.appendChild(orderBadge);
        visitItem.appendChild(instructions);

        visitsList.appendChild(visitItem);
    });

    section.appendChild(title);
    section.appendChild(visitsList);

    return section;
}

function createNotesSection(actNumber, zoneName) {
    const section = document.createElement('div');
    section.className = 'zone-section zone-notes';

    const header = document.createElement('div');
    header.className = 'zone-notes-header';

    const title = document.createElement('h4');
    title.className = 'zone-section-title';
    title.textContent = 'Personal Notes';

    header.appendChild(title);

    const textarea = document.createElement('textarea');
    textarea.className = 'zone-notes-textarea';
    textarea.placeholder = 'Add your personal notes for this zone...';
    textarea.setAttribute('aria-label', `Notes for ${zoneName}`);

    // Load existing note
    const zoneId = getZoneId(actNumber, zoneName);
    const savedNote = loadZoneNote(zoneId);
    if (savedNote) {
        textarea.value = savedNote;
    }

    // Save note on input (with debounce)
    let saveTimeout;
    textarea.addEventListener('input', () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            saveZoneNote(zoneId, textarea.value);
        }, 500);
    });

    section.appendChild(header);
    section.appendChild(textarea);

    return section;
}

// ===================================
// Statistics Dashboard
// ===================================
function toggleStatsDashboard() {
    const dashboard = document.getElementById('statsDashboard');
    const toggle = document.getElementById('statsToggle');

    if (!dashboard || !toggle) return;

    dashboard.classList.toggle('hidden');

    if (dashboard.classList.contains('hidden')) {
        toggle.textContent = '📊 Show Statistics';
    } else {
        toggle.textContent = '📊 Hide Statistics';
        updateStatsDashboard();
    }
}

function updateStatsDashboard() {
    if (!zonesData) return;

    // Calculate total zones completed
    const totalZones = zonesData.acts.reduce((sum, act) => sum + act.zones.length, 0);
    const completedZones = Object.values(completionState).filter(Boolean).length;

    document.getElementById('statTotalZones').textContent = `${completedZones} / ${totalZones}`;

    // Calculate per-act completion
    zonesData.acts.forEach(act => {
        const actZones = act.zones.length;
        const actCompleted = act.zones.filter(zone =>
            isZoneCompleted(act.act_number, zone.zone_name)
        ).length;

        const statElement = document.getElementById(`statAct${act.act_number}`);
        if (statElement) {
            statElement.textContent = `${actCompleted} / ${actZones}`;
        }
    });

    // Calculate Books of Specialisation collected
    const bookZones = [
        { act: 1, zone: 'Hunting Grounds' },
        { act: 1, zone: 'Ogham Farmlands' },
        { act: 2, zone: 'Keth' },
        { act: 2, zone: 'Deshar' },
        { act: 3, zone: 'Jungle Ruins' },
        { act: 3, zone: 'Aggorat' },
        { act: 4, zone: 'Isle of Kin' },
        { act: 4, zone: "Journey's End" },
        { act: 4, zone: 'Trial of the Ancestors' }
    ];

    const booksCollected = bookZones.filter(bz =>
        isZoneCompleted(bz.act, bz.zone)
    ).length;

    document.getElementById('statBooks').textContent = `${booksCollected} / 9`;
}

// ===================================
// Progress Functions
// ===================================
function updateProgress() {
    if (!zonesData) return;

    let totalZones = 0;
    let completedZones = 0;

    zonesData.acts.forEach(act => {
        act.zones.forEach(zone => {
            totalZones++;
            if (isZoneCompleted(act.act_number, zone.zone_name)) {
                completedZones++;
            }
        });
    });

    const percentage = totalZones > 0 ? Math.round((completedZones / totalZones) * 100) : 0;

    // Update progress text
    const progressText = document.getElementById('progressText');
    if (progressText) {
        progressText.textContent = `${completedZones} / ${totalZones} zones completed (${percentage}%)`;
    }

    // Update progress bar
    const progressBar = document.getElementById('progressBarFill');
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }

    // Trigger confetti animation at 100% completion
    if (percentage === 100 && completedZones === totalZones) {
        // Check if confetti has been shown for this session
        const confettiShown = sessionStorage.getItem('confettiShown');
        if (!confettiShown) {
            triggerConfetti();
            sessionStorage.setItem('confettiShown', 'true');
        }
    } else {
        // Reset confetti flag if not at 100% (user unmarked zones)
        sessionStorage.removeItem('confettiShown');
    }

    // Update statistics dashboard if visible
    const statsDashboard = document.getElementById('statsDashboard');
    if (statsDashboard && !statsDashboard.classList.contains('hidden')) {
        updateStatsDashboard();
    }
}

function updateActProgress(actNumber) {
    const act = zonesData?.acts.find(a => a.act_number === actNumber);
    if (!act) return;

    let totalZones = act.zones.length;
    let completedZones = 0;

    act.zones.forEach(zone => {
        if (isZoneCompleted(actNumber, zone.zone_name)) {
            completedZones++;
        }
    });

    const progressElement = document.getElementById(`act-progress-${actNumber}`);
    if (progressElement) {
        progressElement.textContent = `Progress: ${completedZones} / ${totalZones} zones`;
    }
}

function updateZoneCardUI(actNumber, zoneName) {
    const card = document.querySelector(`.zone-card[data-act-number="${actNumber}"][data-zone-name="${zoneName}"]`);
    if (!card) return;

    const isCompleted = isZoneCompleted(actNumber, zoneName);
    const toggle = card.querySelector('.completion-toggle');

    if (isCompleted) {
        card.classList.add('completed');
        if (toggle) toggle.textContent = 'Mark as Undone';
    } else {
        card.classList.remove('completed');
        if (toggle) toggle.textContent = 'Mark as Done';
    }
}

// ===================================
// Lightbox Functions
// ===================================
function openLightbox(images, startIndex = 0) {
    currentLightboxImages = images.map(img => IMAGES_PATH + img);
    currentLightboxIndex = startIndex;

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    if (!lightbox || !lightboxImage) return;

    // Show lightbox
    lightbox.classList.add('active');
    document.body.classList.add('lightbox-open');

    // Update image and controls
    updateLightboxImage();

    // Hide nav buttons if only one image
    if (currentLightboxImages.length === 1) {
        prevBtn?.classList.add('hidden');
        nextBtn?.classList.add('hidden');
    } else {
        prevBtn?.classList.remove('hidden');
        nextBtn?.classList.remove('hidden');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.classList.remove('lightbox-open');
    }
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');

    if (lightboxImage && currentLightboxImages.length > 0) {
        lightboxImage.src = currentLightboxImages[currentLightboxIndex];
        lightboxImage.alt = `Zone layout ${currentLightboxIndex + 1} of ${currentLightboxImages.length}`;
    }

    if (counter) {
        counter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxImages.length}`;
    }
}

function showPreviousImage() {
    if (currentLightboxImages.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
    updateLightboxImage();
}

function showNextImage() {
    if (currentLightboxImages.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
    updateLightboxImage();
}

// ===================================
// Search Functions
// ===================================
function handleSearch(query) {
    searchQuery = query.toLowerCase().trim();
    const clearBtn = document.getElementById('clearSearch');

    // Show/hide clear button
    if (clearBtn) {
        if (searchQuery) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    }

    applyFilters();
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
        handleSearch('');
        searchInput.focus();
    }
}

function matchesSearch(card) {
    if (!searchQuery) return true;

    const zoneName = card.dataset.zoneName?.toLowerCase() || '';
    const actNumber = card.dataset.actNumber || '';

    // Get all text content from the card for searching
    const cardText = card.textContent?.toLowerCase() || '';

    // Search in zone name, act, bosses, rewards, POIs, etc.
    return zoneName.includes(searchQuery) ||
           cardText.includes(searchQuery) ||
           `act ${actNumber}`.includes(searchQuery);
}

// ===================================
// Filter Functions
// ===================================
function toggleFilter() {
    filterActive = !filterActive;
    const filterBtn = document.getElementById('filterBtn');

    if (filterBtn) {
        if (filterActive) {
            filterBtn.classList.add('active');
            filterBtn.innerHTML = '<span class="btn-icon">&#9776;</span> Show All Zones';
        } else {
            filterBtn.classList.remove('active');
            filterBtn.innerHTML = '<span class="btn-icon">&#9776;</span> Show Only Undone';
        }
    }

    // Save preference
    saveUserPreferences();

    applyFilters();
}

function matchesRewardFilter(card) {
    if (rewardFilter === 'all') {
        return true;
    }

    const actNumber = parseInt(card.dataset.actNumber);
    const zoneName = card.dataset.zoneName;

    // Find the zone data
    const act = zonesData?.acts.find(a => a.act_number === actNumber);
    const zone = act?.zones.find(z => z.zone_name === zoneName);

    if (!zone || !zone.points_of_interest) {
        return false;
    }

    // Check if any POI has a reward matching the filter
    return zone.points_of_interest.some(poi => {
        if (!poi.reward) return false;

        const rewardLower = poi.reward.toLowerCase();

        switch (rewardFilter) {
            case 'book-of-spec':
                return rewardLower.includes('book of specialisation');
            case 'permanent-buff':
                return rewardLower.includes('permanent buff');
            case 'skill-gem':
                return rewardLower.includes('skill gem') && !rewardLower.includes('support gem');
            case 'support-gem':
                return rewardLower.includes('support gem');
            case 'passive-point':
                return rewardLower.includes('passive skill point');
            default:
                return true;
        }
    });
}

function applyFilters() {
    const zoneCards = document.querySelectorAll('.zone-card');
    const actSections = document.querySelectorAll('.act-section');

    zoneCards.forEach(card => {
        let shouldShow = true;

        // Apply completion filter
        if (filterActive && card.classList.contains('completed')) {
            shouldShow = false;
        }

        // Apply search filter
        if (shouldShow && !matchesSearch(card)) {
            shouldShow = false;
        }

        // Apply reward filter
        if (shouldShow && !matchesRewardFilter(card)) {
            shouldShow = false;
        }

        // Show/hide card
        if (shouldShow) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    // Hide acts that have no visible zones
    actSections.forEach(actSection => {
        const visibleZones = actSection.querySelectorAll('.zone-card:not(.hidden)');
        if (visibleZones.length === 0) {
            actSection.classList.add('hidden');
        } else {
            actSection.classList.remove('hidden');
        }
    });
}

// Deprecated - replaced by applyFilters
function applyFilter() {
    applyFilters();
}

// ===================================
// Optional Content Toggle
// ===================================
function toggleOptionalContent() {
    showOptional = !showOptional;
    const optionalBtn = document.getElementById('optionalBtn');

    if (optionalBtn) {
        if (showOptional) {
            optionalBtn.classList.add('active');
            optionalBtn.innerHTML = '<span class="btn-icon">👁</span> Hide Optional';
        } else {
            optionalBtn.classList.remove('active');
            optionalBtn.innerHTML = '<span class="btn-icon">👁</span> Show Optional';
        }
    }

    // Save preference
    saveUserPreferences();

    // Re-render to update POI visibility
    renderActs();
    applyFilters();
}

// ===================================
// Walkthrough Mode Toggle
// ===================================
function toggleWalkthroughMode() {
    walkthroughMode = !walkthroughMode;
    const walkthroughBtn = document.getElementById('walkthroughBtn');

    if (walkthroughBtn) {
        if (walkthroughMode) {
            walkthroughBtn.classList.add('active');
            walkthroughBtn.innerHTML = '<span class="btn-icon">📋</span> Hide Walkthrough';
        } else {
            walkthroughBtn.classList.remove('active');
            walkthroughBtn.innerHTML = '<span class="btn-icon">📋</span> Show Walkthrough';
        }
    }

    // Save preference
    saveUserPreferences();

    // Re-render to show/hide walkthrough steps
    renderActs();
    applyFilters();
}

// ===================================
// Act Tab Functions
// ===================================
function switchToAct(actNumber) {
    activeActNumber = actNumber;

    // Update tab states
    const tabs = document.querySelectorAll('.act-tab');
    tabs.forEach(tab => {
        const tabActNumber = parseInt(tab.dataset.actNumber);
        if (tabActNumber === actNumber) {
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
        } else {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        }
    });

    // Save preference
    saveUserPreferences();

    // Show/hide acts
    showActiveAct();

    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showActiveAct() {
    const actSections = document.querySelectorAll('.act-section');
    actSections.forEach(section => {
        const sectionActNumber = parseInt(section.id.replace('act-', ''));
        if (sectionActNumber === activeActNumber) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// ===================================
// Event Listeners
// ===================================
function initEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    }

    // Clear search button
    const clearSearchBtn = document.getElementById('clearSearch');
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', clearSearch);
    }

    // Filter button
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', toggleFilter);
    }

    // Optional content toggle button
    const optionalBtn = document.getElementById('optionalBtn');
    if (optionalBtn) {
        optionalBtn.addEventListener('click', toggleOptionalContent);
    }

    // Walkthrough mode toggle button
    const walkthroughBtn = document.getElementById('walkthroughBtn');
    if (walkthroughBtn) {
        walkthroughBtn.addEventListener('click', toggleWalkthroughMode);
    }

    // Reward filter dropdown
    const rewardFilterSelect = document.getElementById('rewardFilter');
    if (rewardFilterSelect) {
        rewardFilterSelect.addEventListener('change', (e) => {
            rewardFilter = e.target.value;
            saveUserPreferences();
            applyFilters();
        });
    }

    // Reset button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAllProgress);
    }

    // Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportProgress);
    }

    // Import button
    const importBtn = document.getElementById('importBtn');
    if (importBtn) {
        importBtn.addEventListener('click', importProgress);
    }

    // Import file input
    const importFile = document.getElementById('importFile');
    if (importFile) {
        importFile.addEventListener('change', handleImportFile);
    }

    // Stats toggle
    const statsToggle = document.getElementById('statsToggle');
    if (statsToggle) {
        statsToggle.addEventListener('click', toggleStatsDashboard);
    }

    // Font size controls
    const fontIncreaseBtn = document.getElementById('fontIncreaseBtn');
    if (fontIncreaseBtn) {
        fontIncreaseBtn.addEventListener('click', increaseFontSize);
    }

    const fontDecreaseBtn = document.getElementById('fontDecreaseBtn');
    if (fontDecreaseBtn) {
        fontDecreaseBtn.addEventListener('click', decreaseFontSize);
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }

    // Show/hide back to top button on scroll
    window.addEventListener('scroll', toggleBackToTopButton);

    // Lightbox controls
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPreviousImage);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
}

// ===================================
// Error Handling
// ===================================
function showError(message) {
    const container = document.getElementById('actsContainer');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--color-danger);">
                <h2>Error</h2>
                <p>${message}</p>
            </div>
        `;
    }
}

function showSuccessMessage(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification success';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}
