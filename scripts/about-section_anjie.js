/**
 * About Section - Interactive Expandable Sections
 * Handles accordion-style content reveal with smooth animations
 */

export function initAboutSection() {
    const toggleButtons = document.querySelectorAll('.section-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const contentId = button.getAttribute('aria-controls');
            const content = document.getElementById(contentId);

            if (!content) return;

            // Toggle state
            button.setAttribute('aria-expanded', !isExpanded);

            if (isExpanded) {
                // Collapse
                content.setAttribute('hidden', '');
            } else {
                // Expand
                content.removeAttribute('hidden');

                // Smooth scroll into view after expansion
                setTimeout(() => {
                    const offset = button.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
    });
}
