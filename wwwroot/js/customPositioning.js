const VIEWBOX_WIDTH = 1619;
const VIEWBOX_HEIGHT = 894;

const buttonConfigs = {
    "home": { 
        selector: ".nav-btn-home",
        text: "Home"
    },
    "shop": { 
        selector: ".nav-btn-shop",
        text: "Shop"
    },
    "zone": { 
        selector: ".nav-btn-zone",
        text: "T.Zone"
    },
    "about": { 
        selector: ".nav-btn-about",
        text: ""
    }
};

function updateButtonsVisibility() {
    const activePage = document.querySelector('.page.active-page');
    if (!activePage) return;

    // Получаем размер viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Вычисляем пороговое значение для видимости текста
    const threshold = Math.min(viewportWidth, viewportHeight);
    const shouldShowText = threshold > 480;

    for (const buttonKey in buttonConfigs) {
        const config = buttonConfigs[buttonKey];
        const button = activePage.querySelector(config.selector);
        
        if (button) {
            // Управляем видимостью текста
            button.textContent = shouldShowText ? config.text : '';
            
            // Убеждаемся, что кнопка видима
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        }
    }
}

// Оптимизированная обработка resize
let resizeTimeout = null;
window.addEventListener('resize', () => {
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(updateButtonsVisibility, 150);
});

// Инициализация при загрузке
if (document.readyState === "loading") {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(updateButtonsVisibility, 250);
    });
} else {
    setTimeout(updateButtonsVisibility, 250);
}

// MutationObserver для отслеживания изменений страницы
const observerCallback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const targetElement = mutation.target;
            if (targetElement.classList.contains('page') && targetElement.classList.contains('active-page')) {
                setTimeout(updateButtonsVisibility, 250);
                break;
            }
        }
    }
};

const observer = new MutationObserver(observerCallback);
const pagesContainer = document.getElementById('horizontalPages');
if (pagesContainer) {
    observer.observe(pagesContainer, { subtree: true, attributes: true, attributeFilter: ['class'] });
} 