// utils.js - Utility Functions and Helpers
// Debouncing, throttling, accessibility announcements, and other helpers

/**
 * Debounce function - delays execution until after wait milliseconds
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function - limits execution to once per wait milliseconds
 * @param {Function} func - Function to throttle
 * @param {number} wait - Milliseconds to wait between executions
 * @returns {Function} Throttled function
 */
export function throttle(func, wait = 300) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, wait);
        }
    };
}

/**
 * Announce message to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export function announceToScreenReader(message, priority = 'polite') {
    const announcer = getOrCreateAnnouncer();
    announcer.setAttribute('aria-live', priority);
    announcer.textContent = message;

    // Clear after a delay to allow re-announcing the same message
    setTimeout(() => {
        announcer.textContent = '';
    }, 1000);
}

/**
 * Get or create the ARIA live region for announcements
 * @returns {HTMLElement} The announcer element
 */
function getOrCreateAnnouncer() {
    let announcer = document.getElementById('aria-announcer');

    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'aria-announcer';
        announcer.className = 'sr-only';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        document.body.appendChild(announcer);
    }

    return announcer;
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if in viewport
 */
export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 * @param {string|HTMLElement} target - Element or selector to scroll to
 * @param {number} offset - Offset from top in pixels
 */
export function smoothScrollTo(target, offset = 0) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;

    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/**
 * Lazy load images
 * @param {string} selector - Selector for images to lazy load
 */
export function lazyLoadImages(selector = 'img[loading="lazy"]') {
    const images = document.querySelectorAll(selector);

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }
}

/**
 * Get scroll progress (0-1)
 * @returns {number} Scroll progress from 0 to 1
 */
export function getScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const trackLength = documentHeight - windowHeight;
    return Math.min(scrollTop / trackLength, 1);
}

/**
 * Trap focus within an element (for modals, etc.)
 * @param {HTMLElement} element - Element to trap focus within
 * @returns {Function} Cleanup function to remove trap
 */
export function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    };

    element.addEventListener('keydown', handleTabKey);

    // Return cleanup function
    return () => {
        element.removeEventListener('keydown', handleTabKey);
    };
}

/**
 * Generate unique ID
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID
 */
export function generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if user prefers reduced motion
 */
export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Wait for specified milliseconds
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after ms
 */
export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Make announceToScreenReader available globally for other modules
if (typeof window !== 'undefined') {
    window.announceToScreenReader = announceToScreenReader;
}
