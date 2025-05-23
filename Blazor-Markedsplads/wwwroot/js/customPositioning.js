"use strict";

const VIEWBOX_WIDTH = 1619; // Ширина viewBox вашего SVG
const VIEWBOX_HEIGHT = 894;  // Высота viewBox вашего SVG

// ВАЖНО: Замените значения svgLeft, svgTop, svgWidth, svgHeight 
// на реальные процентные координаты и размеры из вашего SVG.
// selector теперь использует класс кнопки, а не ID.
const buttonConfigs = {
    // Селектор для кнопки "Home" на ЛЮБОЙ странице
    "home": { 
        selector: ".nav-btn-home", 
        svgLeft: 25.9,     // % от VIEWBOX_WIDTH
        svgTop: -3,      // % от VIEWBOX_HEIGHT
        svgWidth: 15,   // % от VIEWBOX_WIDTH
    },
    // Селектор для кнопки "Shop" на ЛЮБОЙ странице
    "shop": { 
        selector: ".nav-btn-shop", 
        svgLeft: 55.5,    // % от VIEWBOX_WIDTH
        svgTop: -3,      // % от VIEWBOX_HEIGHT
        svgWidth: 15,   // % от VIEWBOX_WIDTH
    },
    // Селектор для кнопки "T.Zone" на ЛЮБОЙ странице
    "zone": { 
        selector: ".nav-btn-zone", 
        svgLeft: 84.8,    // % от VIEWBOX_WIDTH
        svgTop: -3,      // % от VIEWBOX_HEIGHT
        svgWidth: 15,   // % от VIEWBOX_WIDTH
    },
    // Селектор для кнопки "About" на ЛЮБОЙ странице
    "about": { 
        selector: ".nav-btn-about", 
        svgLeft: 1,    // % от VIEWBOX_WIDTH
        svgTop: -3,      // % от VIEWBOX_HEIGHT
        svgWidth: 8,    // % от VIEWBOX_WIDTH
    }
};


function positionButtons() {
    console.log("[positionButtons] Called"); 
    
    // Find active page
    const activePage = document.querySelector('.page.active-page');
    if (!activePage) {
        console.warn("[positionButtons] No active page found.");
        return;
    }

    // Get SVG background image
    const svgImage = activePage.querySelector('.background-svg-img');
    if (!svgImage) {
        console.warn(`[positionButtons] SVG background image not found on page: ${activePage.id}`);
        return;
    }

    // Get SVG dimensions
    const svgRect = svgImage.getBoundingClientRect();
    const pageRect = activePage.getBoundingClientRect();

    // Calculate scaling factors
    const scaleX = svgRect.width / VIEWBOX_WIDTH;
    const scaleY = svgRect.height / VIEWBOX_HEIGHT;
    const scale = Math.min(scaleX, scaleY);

    // Calculate offset to center the SVG
    const offsetX = (pageRect.width - (VIEWBOX_WIDTH * scale)) / 2;
    const offsetY = (pageRect.height - (VIEWBOX_HEIGHT * scale)) / 2;

    // Position each button
    for (const buttonKey in buttonConfigs) {
        const config = buttonConfigs[buttonKey];
        const button = activePage.querySelector(config.selector);
        
        if (button) {
            // Calculate absolute position based on SVG coordinates
            const btnX = (config.svgLeft / 100) * VIEWBOX_WIDTH * scale + offsetX;
            const btnY = (config.svgTop / 100) * VIEWBOX_HEIGHT * scale + offsetY;
            const btnWidth = (config.svgWidth / 100) * VIEWBOX_WIDTH * scale;

            // Apply position and size
            button.style.left = `${btnX}px`;
            button.style.top = `${btnY}px`;
            button.style.width = `${btnWidth}px`;
            
            // Ensure button is visible
            button.style.opacity = '1';
            button.style.visibility = 'visible';
            
            console.log(`[positionButtons] Positioned ${buttonKey} button:`, {
                left: button.style.left,
                top: button.style.top,
                width: button.style.width
            });
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const debouncedPositionButtons = debounce(positionButtons, 150);


if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', () => {
        console.log("[DOMContentLoaded] Fired. Initial positionButtons call soon.");
        setTimeout(positionButtons, 200); 
    });
} else {
     console.log("[DOMContentLoaded] Already complete. Initial positionButtons call soon.");
     setTimeout(positionButtons, 200); 
}

window.addEventListener('resize', () => {
    console.log("[Window Resize] Event triggered.");
    debouncedPositionButtons();
});

const observerCallback = (mutationsList, observer) => {
    console.log("[MutationObserver] observerCallback triggered."); // ОТЛАДКА
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const targetElement = mutation.target;
            console.log(`[MutationObserver] Class attribute changed on:`, targetElement);
            if (targetElement.classList.contains('page') && targetElement.classList.contains('active-page')) {
                 console.log('[MutationObserver] Active page changed to:', targetElement.id, '. Re-positioning buttons.');
                 setTimeout(positionButtons, 250);
                 break; 
            }
        }
    }
};

const pageChangeObserver = new MutationObserver(observerCallback);

function startObservingPageChanges() {
    console.log("[startObservingPageChanges] Called"); // ОТЛАДКА
    const pagesContainer = document.getElementById('horizontalPages');
    if (pagesContainer) {
        const pageElements = pagesContainer.querySelectorAll('.page');
        if (pageElements.length > 0) {
            pageElements.forEach(page => {
                pageChangeObserver.observe(page, { 
                    attributes: true, 
                    attributeFilter: ['class'] 
                });
            });
            console.log("[startObservingPageChanges] MutationObserver started for", pageElements.length, ".page elements.");
        } else {
            console.warn("[startObservingPageChanges] No .page elements found to observe.");
        }
    } else {
        console.error("[startObservingPageChanges] Pages container 'horizontalPages' not found.");
    }
}

if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', startObservingPageChanges);
} else {
    startObservingPageChanges(); 
}

window.notifyPageChanged = () => {
    console.log("[notifyPageChanged] Blazor explicitly notified page changed. Positioning buttons.");
    setTimeout(positionButtons, 50); 
}; 