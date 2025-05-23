function updatePageScale() {
    const container = document.getElementById('horizontalPages');
    if (!container) return;

    // Update current section index for CSS if needed by other rules
    document.documentElement.style.setProperty('--current-section-index', window.currentSectionIndex || 0);
    
    // The main logic for button sizing and positioning is now in positionButtons(), 
    // which is called on resize and page changes.
    // We still need to trigger it here if window.innerWidth changes, 
    // as positionButtons relies on the SVG scale which depends on window size.
    if (typeof window.positionButtons === 'function') {
        requestAnimationFrame(window.positionButtons);
    }
}

// Make sure initHorizontalLanding and other functions correctly call positionButtons or updatePageScale
// For example, in initHorizontalLanding:
// if (typeof window.positionButtons === 'function') {
//     setTimeout(window.positionButtons, 100); // Or 150ms as in customPositioning.js
// }

// In scrollToSection, after a page becomes active:
// if (typeof window.positionButtons === 'function') {
//    setTimeout(window.positionButtons, 150); // Ensure buttons on new page are positioned
// }

// The window resize listener is already in customPositioning.js calling debouncedPositionButtons.
// The MutationObserver in customPositioning.js handles page changes. 