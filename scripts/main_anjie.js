// scripts/main.js

// GSAP Setup
gsap.registerPlugin(ScrollTrigger);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized');

    // Hero animation
    initHeroAnimation();

    // Other initializations will go here:
    // - initConstellation()
    // - initPageTransitions()
});

/**
 * Animate hero section elements on load
 */
function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1
    }, '-=0.5'); // Start 0.5s before previous animation ends
}

/**
 * Utility: Fetch JSON data
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Export for use in other modules (if using ES modules)
export { fetchData };
