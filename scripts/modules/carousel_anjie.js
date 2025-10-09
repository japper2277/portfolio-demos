// carousel.js - Featured Works Hero Carousel Module
// Handles hero image slideshow with crossfade transitions

export class Carousel {
    constructor(portfolioData) {
        this.portfolioData = portfolioData;
        this.featuredWorks = portfolioData.filter(work => work.featured);
        console.log('Carousel: Found', this.featuredWorks.length, 'featured works');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isTransitioning = false;

        // DOM elements
        this.heroImage = null;
        this.heroTitle = null;
        this.heroYear = null;
        this.heroMedium = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.indicators = null;
    }

    init() {
        this.cacheElements();
        this.loadFeaturedImage(0);
        this.startAutoPlay();
        this.attachEventListeners();
        this.hideLoadingScreen();
    }

    cacheElements() {
        this.bg1 = document.getElementById('bgImage1');
        this.bg2 = document.getElementById('bgImage2');
        this.imgTitle = document.getElementById('imgTitle');
        this.imgMeta = document.getElementById('imgMeta');
        this.inquireBtn = document.getElementById('inquireBtn');
        this.prevBtn = document.querySelector('.carousel-nav .prev');
        this.nextBtn = document.querySelector('.carousel-nav .next');
        this.currentBg = 1; // Track which background is active

        console.log('Carousel elements:', {
            bg1: !!this.bg1,
            bg2: !!this.bg2,
            imgTitle: !!this.imgTitle,
            imgMeta: !!this.imgMeta,
            inquireBtn: !!this.inquireBtn,
            prevBtn: !!this.prevBtn,
            nextBtn: !!this.nextBtn
        });
    }

    attachEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevImage());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextImage());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevImage();
            if (e.key === 'ArrowRight') this.nextImage();
        });

        // Pause autoplay on hover (don't restart on leave)
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => this.stopAutoPlay());
            // Don't restart autoplay on mouseleave - once stopped, stay stopped
        }

        // Touch swipe support
        this.addTouchSupport();
    }

    addTouchSupport() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        let touchStartX = 0;
        let touchEndX = 0;

        heroSection.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        heroSection.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) this.nextImage();
            if (touchEndX > touchStartX + 50) this.prevImage();
        };

        this.handleSwipe = handleSwipe;
    }

    loadFeaturedImage(index) {
        const work = this.featuredWorks[index];
        if (!work) {
            console.error('Carousel: No work found at index', index);
            return;
        }

        console.log('Carousel: Loading image', index, work.title, work.image_url);

        // First load (index 0) - initialize first background
        if (index === 0 && this.currentIndex === 0 && !this.bg1.style.backgroundImage) {
            console.log('Carousel: Initial load of first image');
            this.bg1.style.backgroundImage = `url('${work.image_url}')`;
            this.bg1.setAttribute('aria-label', work.title);
            this.bg1.classList.add('visible');
            // Enable Ken Burns animation on the active background layer
            this.bg1.classList.add('animated');

            if (this.imgTitle) {
                this.imgTitle.textContent = work.title;
                this.imgTitle.classList.add('visible');
                console.log('Carousel: Set title to', work.title);
            }
            if (this.imgMeta) {
                this.imgMeta.textContent = `${work.year} • ${work.medium}`;
                this.imgMeta.classList.add('visible');
                console.log('Carousel: Set meta to', `${work.year} • ${work.medium}`);
            }

            // Update inquiry button
            this.updateInquireButton(work);

            this.currentIndex = index;
            return;
        }

        if (this.isTransitioning) return;
        this.isTransitioning = true;

        // Determine which background to update (crossfade between bg1 and bg2)
        const activeBg = this.currentBg === 1 ? this.bg1 : this.bg2;
        const nextBg = this.currentBg === 1 ? this.bg2 : this.bg1;

        // Load new image in the inactive background
        nextBg.style.backgroundImage = `url('${work.image_url}')`;
        nextBg.setAttribute('aria-label', work.title);

        // Fade in the new background
        setTimeout(() => {
            nextBg.classList.add('visible');
            // Toggle Ken Burns animation class between layers
            nextBg.classList.add('animated');
            activeBg.classList.remove('animated');
            activeBg.classList.remove('visible');
            this.currentBg = this.currentBg === 1 ? 2 : 1;

            // Update text content
            if (this.imgTitle) {
                this.imgTitle.textContent = work.title;
                this.imgTitle.classList.add('visible');
            }
            if (this.imgMeta) {
                this.imgMeta.textContent = `${work.year} • ${work.medium}`;
                this.imgMeta.classList.add('visible');
            }

            // Update inquiry button
            this.updateInquireButton(work);

            this.isTransitioning = false;
        }, 50);

        this.currentIndex = index;
    }


    nextImage() {
        this.stopAutoPlay();
        const nextIndex = (this.currentIndex + 1) % this.featuredWorks.length;
        this.loadFeaturedImage(nextIndex);
        // Don't restart autoplay after manual navigation
    }

    prevImage() {
        this.stopAutoPlay();
        const prevIndex = (this.currentIndex - 1 + this.featuredWorks.length) % this.featuredWorks.length;
        this.loadFeaturedImage(prevIndex);
        // Don't restart autoplay after manual navigation
    }

    startAutoPlay() {
        this.stopAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextImage();
        }, 5000); // Change image every 5 seconds
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    hideLoadingScreen() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }, 100);
        }
    }

    updateInquireButton(work) {
        if (!this.inquireBtn) return;

        const availability = work.availability || (work.isForSale ? 'Available' : 'Sold');

        // Determine button text and action based on availability
        if (availability === 'Available' || work.isForSale) {
            this.inquireBtn.textContent = 'INQUIRE ABOUT ORIGINAL';
            this.inquireBtn.style.display = 'inline-block';
            this.inquireBtn.style.opacity = '1';
            this.inquireBtn.style.cursor = 'pointer';

            // Create mailto link with pre-filled subject and body
            this.inquireBtn.onclick = () => {
                const subject = encodeURIComponent(`Inquiry: ${work.title}`);
                const body = encodeURIComponent(
                    `Hi,\n\nI'm interested in learning more about "${work.title}" (${work.year}).\n\n` +
                    `Details:\n` +
                    `• Medium: ${work.medium}\n` +
                    `• Dimensions: ${work.dimensions}\n\n` +
                    `Please let me know about pricing and availability.\n\nThank you!`
                );
                window.location.href = `mailto:contact@anjelinavillalobos.com?subject=${subject}&body=${body}`;
            };
        } else if (work.printUrl) {
            this.inquireBtn.textContent = 'PURCHASE PRINT';
            this.inquireBtn.style.display = 'inline-block';
            this.inquireBtn.style.opacity = '1';
            this.inquireBtn.style.cursor = 'pointer';
            this.inquireBtn.onclick = () => {
                window.location.href = work.printUrl;
            };
        } else if (availability === 'Sold' || availability === 'Private Collection') {
            // Show status but don't make it clickable
            this.inquireBtn.textContent = availability.toUpperCase();
            this.inquireBtn.style.display = 'inline-block';
            this.inquireBtn.style.opacity = '0.5';
            this.inquireBtn.style.cursor = 'default';
            this.inquireBtn.onclick = null;
        } else {
            this.inquireBtn.style.display = 'none';
        }
    }

    destroy() {
        this.stopAutoPlay();
        // Remove event listeners would go here if needed
    }
}
