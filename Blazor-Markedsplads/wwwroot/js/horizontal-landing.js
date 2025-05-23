// Make sure we have the window object before doing anything
(function() {
    if (typeof window === 'undefined') {
        console.error("Window object not available");
        return;
    }
    
    // Flag to track initialization
    window._horizontalLandingInitialized = false;
    
    // Initialization function
    window.initHorizontalLanding = function () {
        // Prevent double initialization
        if (window._horizontalLandingInitialized) {
            console.log("Horizontal landing already initialized");
            return;
        }
        
        console.log("Initializing horizontal landing page");
        
        // Check if container exists
        const container = document.getElementById('horizontalPages');
        if (!container) {
            console.error("Horizontal container 'horizontalPages' not found by initHorizontalLanding!");
            return;
        }
        
        // Set up wheel event listener for horizontal scrolling
        document.addEventListener('wheel', preventDefaultScroll, { passive: false });
        
        // Set up keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                navigateToNextSection();
            } else if (e.key === 'ArrowLeft') {
                navigateToPreviousSection();
            }
        });
        
        // Mark as initialized
        window._horizontalLandingInitialized = true;
        
        // Initial positioning of buttons using customPositioning
        if (typeof window.positionButtons === 'function') {
            setTimeout(window.positionButtons, 100);
        }
        
        attachNavButtonHandlers();
        
        // Add initial scale calculation
        updatePageScale();
        
        console.log("Horizontal landing page initialized");
    };

    // Prevent default scroll behavior
    function preventDefaultScroll(e) {
        e.preventDefault();
        
        // Detect scroll direction
        if (e.deltaY > 0 || e.deltaX > 0) {
            // Scrolling down/right
            navigateToNextSection();
        } else {
            // Scrolling up/left
            navigateToPreviousSection();
        }
    }

    // Navigate to previous section
    function navigateToPreviousSection() {
        if (window.currentSectionIndex > 0) {
            window.scrollToSection(window.currentSectionIndex - 1);
        }
    }

    // Navigate to next section
    function navigateToNextSection() {
        const sectionCount = document.querySelectorAll('.page').length;
        if (window.currentSectionIndex < sectionCount - 1) {
            window.scrollToSection(window.currentSectionIndex + 1);
        }
    }

    // Scroll to specific section
    window.scrollToSection = function (sectionIndex) {
        console.log("scrollToSection called with index:", sectionIndex);
        
        const container = document.getElementById('horizontalPages');
        if (!container) {
            console.error("Container 'horizontalPages' not found by scrollToSection!");
            return;
        }
        
        // Get all pages
        const pages = document.querySelectorAll('.page');
        if (!pages.length) {
            console.error("No pages found!");
            return;
        }
        
        console.log("Found", pages.length, "pages");
        
        if (sectionIndex < 0 || sectionIndex >= pages.length) {
            console.error("Invalid section index:", sectionIndex);
            return;
        }
        
        // Add transition class to About button before the transition starts
        const aboutButtons = document.querySelectorAll('.nav-btn-about');
        aboutButtons.forEach(btn => {
            btn.classList.add('scrolling');
            // Remove the class after animation completes
            setTimeout(() => {
                btn.classList.remove('scrolling');
            }, 1500); // Duration matches CSS animation (1.5s)
        });
        
        // Update current section index
        window.currentSectionIndex = sectionIndex;
        
        // Update scale and transform
        updatePageScale();
        
        // Calculate transform value
        const translateX = -100 * sectionIndex;
        container.style.transform = `translateX(${translateX}vw)`;
        
        console.log("Applied transform:", container.style.transform);
        
        // Update active page class
        pages.forEach(function(page, idx) {
            if (idx === sectionIndex) {
                page.classList.add('active-page');
                console.log("Set active page:", idx);
            } else {
                page.classList.remove('active-page');
            }
        });
        
        // Update URL hash
        const sectionIds = ['home', 'shop', 'tzone', 'about'];
        if (sectionIds[sectionIndex]) {
            window.history.replaceState(null, null, `#${sectionIds[sectionIndex]}`);
            console.log("Updated URL hash to:", sectionIds[sectionIndex]);
        }
        
        // Update Blazor component if available
        if (typeof window.updateBlazorComponent === 'function') {
            window.updateBlazorComponent(sectionIndex);
        }
        
        // Trigger button repositioning
        if (typeof window.positionButtons === 'function') {
            setTimeout(window.positionButtons, 100);
        }
        
        console.log("Section navigation complete");
    };

    // Initialization on DOM content loaded
    function init() {
        console.log("DOM content loaded, initializing horizontal landing");
        
        setTimeout(() => {
            window.initHorizontalLanding();
            
            // Check hash and navigate
            const hash = window.location.hash.substring(1);
            const sectionIds = ['home', 'shop', 'tzone', 'about'];
            const index = sectionIds.indexOf(hash);
            
            if (index !== -1) {
                window.scrollToSection(index);
            } else {
                window.scrollToSection(0);
            }
        }, 300);
    }

    // Handle DOM content loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Also handle window load event
    window.addEventListener('load', function() {
        console.log("Window loaded");
        if (!window._horizontalLandingInitialized) {
            console.log("Not initialized yet, initializing now");
            init();
        }
    });
})();

// Horizontal navigation
window.onload = function() {
    initNavigation();
};

function initNavigation() {
    // Add wheel event listener for horizontal scrolling
    document.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        // Get current page
        var currentPage = window.currentPage || 0;
        
        // Detect scroll direction
        if (e.deltaY > 0 || e.deltaX > 0) {
            // Next page
            moveToPage(Math.min(currentPage + 1, 3));
        } else {
            // Previous page
            moveToPage(Math.max(currentPage - 1, 0));
        }
    }, { passive: false });
    
    // Set initial page
    window.currentPage = 0;
    
    // Add click handlers to buttons directly
    document.querySelectorAll('.nav-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var pageId = this.id.replace('btn', '').toLowerCase();
            var pageIndex = 0;
            
            if (pageId === 'home') pageIndex = 0;
            else if (pageId === 'shop') pageIndex = 1;
            else if (pageId === 'zone') pageIndex = 2;
            else if (pageId === 'about') pageIndex = 3;
            
            moveToPage(pageIndex);
        });
    });
}

// Blazor component registration
window.registerBlazorComponent = function(componentName, dotnetRef) {
    window[`${componentName}DotNetRef`] = dotnetRef;
};

// Function to move to a specific page
window.moveToPage = function(pageIndex) {
    window.scrollToSection(pageIndex);
};

// Debug function
window.debugNav = function() {
    console.log("Current page:", window.currentPage);
    console.log("Container:", document.getElementById('horizontalPages'));
    console.log("Blazor ref:", window.homeDotNetRef);
    console.log("Nav buttons:", document.querySelectorAll('.nav-btn'));
};

// Run debug after load
setTimeout(window.debugNav, 1000);

function attachNavButtonHandlers() {
    console.log("Attaching navigation button handlers");
    
    // Get all navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Navigation button clicked:", this.id);
            
            // Determine which section to navigate to based on button class
            let sectionIndex = 0;
            if (this.classList.contains('nav-btn-home')) sectionIndex = 0;
            else if (this.classList.contains('nav-btn-shop')) sectionIndex = 1;
            else if (this.classList.contains('nav-btn-zone')) sectionIndex = 2;
            else if (this.classList.contains('nav-btn-about')) sectionIndex = 3;
            
            console.log("Navigating to section:", sectionIndex);
            window.scrollToSection(sectionIndex);
        });
    });
}

// Ensure handlers are attached after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Initializing navigation");
    attachNavButtonHandlers();
});

// Also attach handlers when the page changes
window.addEventListener('load', function() {
    console.log("Window Loaded - Initializing navigation");
    attachNavButtonHandlers();
});

// Re-attach handlers after any dynamic content updates
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
            console.log("DOM mutation detected - Re-attaching handlers");
            attachNavButtonHandlers();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Добавляем функцию для расчета и применения масштаба
function updatePageScale() {
    const container = document.getElementById('horizontalPages');
    if (!container) return;

    const minWidth = 1200; // Минимальная ширина контейнера
    const windowWidth = window.innerWidth;
    
    if (windowWidth < minWidth) {
        const scale = windowWidth / minWidth;
        document.documentElement.style.setProperty('--page-scale', scale);
        document.documentElement.style.setProperty('--current-section-index', window.currentSectionIndex || 0);
    } else {
        document.documentElement.style.setProperty('--page-scale', 1);
        document.documentElement.style.setProperty('--current-section-index', window.currentSectionIndex || 0);
    }
}

// Обновляем обработчик изменения размера окна
window.addEventListener('resize', () => {
    console.log("[Window Resize] Event triggered.");
    updatePageScale();
    debouncedPositionButtons();
});

// Добавляем вызов updatePageScale при инициализации
window.initHorizontalLanding = function () {
    // ... existing initialization code ...
    
    // Add initial scale calculation
    updatePageScale();
    
    // ... rest of the initialization code ...
}; 