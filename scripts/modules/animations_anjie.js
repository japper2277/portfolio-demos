// animations.js - GSAP Scroll Animations Module
// Handles scroll-triggered animations for portfolio elements

export class Animations {
    constructor() {
        this.scrollTriggers = [];
        this.isGSAPLoaded = false;
    }

    init() {
        // Check if GSAP and ScrollTrigger are loaded
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP or ScrollTrigger not loaded. Animations disabled.');
            return;
        }

        this.isGSAPLoaded = true;
        gsap.registerPlugin(ScrollTrigger);

        this.setupAnimations();
    }

    setupAnimations() {
        // Initial page load sequence
        this.animateInitialLoad();

        // Scroll-triggered animations
        this.animateSections();
        this.animatePortfolioItems();
        this.animateFilterButtons();
        this.animateAboutSection();
        this.animateContactSection();
        this.animateStats();

        // Subtle parallax for hero background
        this.enableParallax();
    }

    animateInitialLoad() {
        // Create master timeline for page entrance
        const tl = gsap.timeline({ delay: 0.2 });

        // Loading overlay fade out
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            tl.to(loadingOverlay, {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.inOut',
                onComplete: () => {
                    loadingOverlay.style.display = 'none';
                }
            });
        }

        // Header slide down + fade in
        const header = document.querySelector('.main-header');
        if (header) {
            tl.from(header, {
                y: -60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.3'); // Overlap with loading fade
        }

        // Hero title and meta slide up + fade in
        const imgTitle = document.getElementById('imgTitle');
        const imgMeta = document.getElementById('imgMeta');
        const inquireBtn = document.getElementById('inquireBtn');

        if (imgTitle) {
            tl.from(imgTitle, {
                y: 40,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out'
            }, '-=0.5');
        }

        if (imgMeta) {
            tl.from(imgMeta, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.7');
        }

        if (inquireBtn) {
            tl.from(inquireBtn, {
                y: 20,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out'
            }, '-=0.6');
        }

        // Gallery hint button
        const galleryHint = document.querySelector('.gallery-hint');
        if (galleryHint) {
            tl.from(galleryHint, {
                x: 60,
                opacity: 0,
                duration: 0.7,
                ease: 'back.out(1.7)'
            }, '-=0.5');
        }

        // Navigation arrows
        const carouselNav = document.querySelector('.carousel-nav');
        if (carouselNav) {
            tl.from(carouselNav.children, {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            }, '-=0.4');
        }
    }

    animateSections() {
        // Animate section headers
        const sectionHeaders = document.querySelectorAll('.section-header');

        sectionHeaders.forEach(header => {
            gsap.from(header.children, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                stagger: 0.15,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
    }

    animateAboutSection() {
        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection) return;

        // Animate artist photo
        const artistPhoto = aboutSection.querySelector('.artist-photo');
        if (artistPhoto) {
            gsap.from(artistPhoto, {
                scrollTrigger: {
                    trigger: aboutSection,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                },
                x: -60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }

        // Animate bio content
        const artistBio = aboutSection.querySelector('.artist-bio');
        if (artistBio) {
            gsap.from(artistBio.children, {
                scrollTrigger: {
                    trigger: aboutSection,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                },
                x: 60,
                opacity: 0,
                stagger: 0.15,
                duration: 0.9,
                ease: 'power3.out'
            });
        }
    }

    animateContactSection() {
        const contactSection = document.querySelector('.contact-section');
        if (!contactSection) return;

        // Animate section title
        const sectionTitle = contactSection.querySelector('.section-title');
        if (sectionTitle) {
            gsap.from(sectionTitle, {
                scrollTrigger: {
                    trigger: contactSection,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                ease: 'back.out(1.7)'
            });
        }

        // Animate contact intro
        const contactIntro = contactSection.querySelector('.contact-intro');
        if (contactIntro) {
            gsap.from(contactIntro, {
                scrollTrigger: {
                    trigger: contactSection,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.2,
                ease: 'power3.out'
            });
        }

        // Animate email link
        const emailLink = contactSection.querySelector('.email-link');
        if (emailLink) {
            gsap.from(emailLink, {
                scrollTrigger: {
                    trigger: contactSection,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                delay: 0.4,
                ease: 'power3.out'
            });
        }

        // Animate social links
        const socialLinks = contactSection.querySelectorAll('.social-links a');
        if (socialLinks.length > 0) {
            gsap.from(socialLinks, {
                scrollTrigger: {
                    trigger: contactSection,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.7,
                delay: 0.6,
                ease: 'power3.out'
            });
        }
    }

    animatePortfolioItems() {
        const portfolioItems = document.querySelectorAll('.grid-item');

        if (portfolioItems.length === 0) return;

        gsap.from(portfolioItems, {
            scrollTrigger: {
                trigger: '#portfolioGrid',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            scale: 0.95,
            y: 30,
            stagger: {
                amount: 0.6,
                from: 'start',
                ease: 'power2.inOut'
            },
            duration: 0.7,
            ease: 'power3.out'
        });
    }

    animateFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        if (filterButtons.length === 0) return;

        gsap.from(filterButtons, {
            scrollTrigger: {
                trigger: '.filter-bar',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 20,
            stagger: 0.05,
            duration: 0.5,
            ease: 'power2.out'
        });
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const endValue = parseInt(stat.textContent);

            const trigger = ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(stat, {
                        textContent: endValue,
                        duration: 2,
                        ease: 'power1.out',
                        snap: { textContent: 1 },
                        onUpdate: function() {
                            stat.textContent = Math.ceil(this.targets()[0].textContent);
                        }
                    });
                }
            });

            this.scrollTriggers.push(trigger);
        });
    }

    enableParallax() {
        const container = document.getElementById('container');
        const bg1 = document.getElementById('bgImage1');
        const bg2 = document.getElementById('bgImage2');
        if (!container || !bg1 || !bg2) return;

        let rafId = null;
        const maxTranslate = 10; // px

        const onMouseMove = (e) => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const rect = container.getBoundingClientRect();
                const relX = (e.clientX - rect.left) / rect.width - 0.5;
                const relY = (e.clientY - rect.top) / rect.height - 0.5;
                const tx = -(relX * maxTranslate);
                const ty = -(relY * maxTranslate);

                // Apply a very subtle translation for depth
                const transform = `translate(${tx}px, ${ty}px)`;
                bg1.style.transform = transform;
                bg2.style.transform = transform;
            });
        };

        const onMouseLeave = () => {
            bg1.style.transform = 'translate(0, 0)';
            bg2.style.transform = 'translate(0, 0)';
        };

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseLeave);

        // Respect reduced motion
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const disableIfReduced = () => {
            if (mediaQuery.matches) {
                container.removeEventListener('mousemove', onMouseMove);
                container.removeEventListener('mouseleave', onMouseLeave);
                onMouseLeave();
            }
        };
        mediaQuery.addEventListener('change', disableIfReduced);
        disableIfReduced();
    }

    refreshAnimations() {
        if (!this.isGSAPLoaded) return;

        // Reinitialize portfolio item animations after content change
        setTimeout(() => {
            ScrollTrigger.refresh();
            this.animatePortfolioItems();
        }, 100);
    }

    destroy() {
        if (!this.isGSAPLoaded) return;

        this.scrollTriggers.forEach(trigger => {
            if (trigger && trigger.scrollTrigger) {
                trigger.scrollTrigger.kill();
            }
        });
        this.scrollTriggers = [];
    }
}
