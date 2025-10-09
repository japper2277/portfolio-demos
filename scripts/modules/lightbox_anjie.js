// lightbox.js - Lightbox Modal Module
// Handles fullscreen artwork viewing with navigation and focus management

export class Lightbox {
    constructor(portfolioData) {
        this.portfolioData = portfolioData;
        this.currentWorks = portfolioData; // Currently displayed works (can be filtered)
        this.currentIndex = 0;
        this.isOpen = false;
        this.focusableElements = [];
        this.previousFocusElement = null;

        // DOM elements
        this.lightbox = null;
        this.lightboxImage = null;
        this.lightboxImage2 = null;
        this.currentLightboxImage = null;
        this.nextLightboxImage = null;
        this.lightboxTitle = null;
        this.lightboxYear = null;
        this.lightboxMedium = null;
        this.lightboxDescription = null;
        this.lightboxTechnique = null;
        this.lightboxInspiration = null;
        this.lightboxSeries = null;
        this.lightboxDimensionsNote = null;
        this.closeBtn = null;
        this.prevBtn = null;
        this.nextBtn = null;

        // New UI elements
        this.lightboxLoading = null;
        this.lightboxBottomBar = null;
        this.lightboxBottomTitle = null;
        this.lightboxBottomMeta = null;
        this.lightboxCounter = null;
        this.lightboxInfoToggle = null;
        this.lightboxExpandedInfo = null;
        this.lightboxExpandedClose = null;
        this.lightboxExpandedTitle = null;
        this.lightboxExpandedMeta = null;
        this.lightboxExpandedDescription = null;
        this.lightboxExpandedTechnique = null;
        this.lightboxExpandedInspiration = null;
        this.lightboxExpandedSeries = null;
        this.lightboxExpandedDimensionsNote = null;
        this.lightboxExpandedInquireBtn = null;
    }

    init() {
        this.cacheElements();
        this.attachEventListeners();
    }

    cacheElements() {
        this.lightbox = document.getElementById('lightboxOverlay');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.lightboxImage2 = document.getElementById('lightboxImage2');
        this.currentLightboxImage = this.lightboxImage;
        this.nextLightboxImage = this.lightboxImage2;
        this.lightboxTitle = document.getElementById('lightboxTitle');
        this.lightboxMeta = document.getElementById('lightboxMeta');
        this.lightboxDescription = document.getElementById('lightboxDescription');
        this.lightboxTechnique = document.getElementById('lightboxTechnique');
        this.lightboxInspiration = document.getElementById('lightboxInspiration');
        this.lightboxSeries = document.getElementById('lightboxSeries');
        this.lightboxDimensionsNote = document.getElementById('lightboxDimensionsNote');
        this.lightboxInquireBtn = document.getElementById('lightboxInquireBtn');
        this.closeBtn = document.getElementById('lightboxClose');
        this.prevBtn = document.getElementById('lightboxPrev');
        this.nextBtn = document.getElementById('lightboxNext');

        // New UI elements
        this.lightboxLoading = document.getElementById('lightboxLoading');
        this.lightboxBottomBar = document.getElementById('lightboxBottomBar');
        this.lightboxBottomTitle = document.getElementById('lightboxBottomTitle');
        this.lightboxBottomMeta = document.getElementById('lightboxBottomMeta');
        this.lightboxCounter = document.getElementById('lightboxCounter');
        this.lightboxInfoToggle = document.getElementById('lightboxInfoToggle');
        this.lightboxExpandedInfo = document.getElementById('lightboxExpandedInfo');
        this.lightboxExpandedClose = document.getElementById('lightboxExpandedClose');
        this.lightboxExpandedTitle = document.getElementById('lightboxExpandedTitle');
        this.lightboxExpandedMeta = document.getElementById('lightboxExpandedMeta');
        this.lightboxExpandedDescription = document.getElementById('lightboxExpandedDescription');
        this.lightboxExpandedTechnique = document.getElementById('lightboxExpandedTechnique');
        this.lightboxExpandedInspiration = document.getElementById('lightboxExpandedInspiration');
        this.lightboxExpandedSeries = document.getElementById('lightboxExpandedSeries');
        this.lightboxExpandedDimensionsNote = document.getElementById('lightboxExpandedDimensionsNote');
        this.lightboxExpandedInquireBtn = document.getElementById('lightboxExpandedInquireBtn');
    }

    attachEventListeners() {
        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Navigation buttons
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.showPrevious());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.showNext());
        }

        // Click outside to close
        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.close();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            switch (e.key) {
                case 'Escape':
                    // Close expanded info if open, otherwise close lightbox
                    if (this.lightboxExpandedInfo && this.lightboxExpandedInfo.classList.contains('show')) {
                        this.toggleExpandedInfo();
                    } else {
                        this.close();
                    }
                    break;
                case 'ArrowLeft':
                    this.showPrevious();
                    break;
                case 'ArrowRight':
                    this.showNext();
                    break;
                case 'Tab':
                    this.handleTabKey(e);
                    break;
            }
        });

        // Info toggle button
        if (this.lightboxInfoToggle) {
            this.lightboxInfoToggle.addEventListener('click', () => this.toggleExpandedInfo());
        }

        // Expanded info close button
        if (this.lightboxExpandedClose) {
            this.lightboxExpandedClose.addEventListener('click', () => this.toggleExpandedInfo());
        }
    }

    open(work, index, worksArray = null) {
        if (!this.lightbox) return;

        this.currentIndex = index;
        this.currentWorks = worksArray || this.portfolioData; // Use filtered works if provided
        this.isOpen = true;

        // Store the element that had focus
        this.previousFocusElement = document.activeElement;

        // Show loading state
        if (this.lightboxLoading) {
            this.lightboxLoading.classList.remove('hidden');
        }

        // Update lightbox content
        if (this.lightboxImage) {
            // Handle image loading
            const img = new Image();
            img.onload = () => {
                this.currentLightboxImage.src = work.image_url;
                this.currentLightboxImage.alt = work.title;
                this.currentLightboxImage.classList.add('visible');
                if (this.lightboxLoading) {
                    this.lightboxLoading.classList.add('hidden');
                }
            };
            img.onerror = () => {
                if (this.lightboxLoading) {
                    this.lightboxLoading.classList.add('hidden');
                }
            };
            img.src = work.image_url;
        }

        // Update bottom bar
        if (this.lightboxBottomTitle) this.lightboxBottomTitle.textContent = work.title;
        if (this.lightboxBottomMeta) this.lightboxBottomMeta.textContent = `${work.year} • ${work.medium}`;
        if (this.lightboxCounter) {
            const currentPosition = index + 1;
            const total = this.currentWorks.length;
            this.lightboxCounter.textContent = `${currentPosition} / ${total}`;
        }

        // Update expanded info panel (museum placard structure)
        if (this.lightboxExpandedTitle) this.lightboxExpandedTitle.textContent = work.title;
        if (this.lightboxExpandedMeta) this.lightboxExpandedMeta.textContent = `${work.year} • ${work.medium}${work.dimensions ? ' • ' + work.dimensions : ''}`;

        // Artist Statement Section
        const artistStatementSection = document.getElementById('artistStatementSection');
        const artistStatementElement = document.getElementById('lightboxArtistStatement');
        if (work.artist_statement && artistStatementSection && artistStatementElement) {
            artistStatementElement.textContent = work.artist_statement;
            artistStatementSection.style.display = 'block';
        } else if (artistStatementSection) {
            artistStatementSection.style.display = 'none';
        }

        if (this.lightboxExpandedDescription) this.setOrHide(this.lightboxExpandedDescription, work.description, '');
        if (this.lightboxExpandedTechnique) this.setOrHide(this.lightboxExpandedTechnique, work.technique, 'Technique: ');
        if (this.lightboxExpandedInspiration) this.setOrHide(this.lightboxExpandedInspiration, work.inspiration, 'Inspiration: ');
        if (this.lightboxExpandedSeries) this.setOrHide(this.lightboxExpandedSeries, work.series, 'Series: ');
        if (this.lightboxExpandedDimensionsNote) this.setOrHide(this.lightboxExpandedDimensionsNote, work.dimensions_note, '');

        // Update old info panel (kept for compatibility)
        if (this.lightboxTitle) this.lightboxTitle.textContent = work.title;
        if (this.lightboxMeta) this.lightboxMeta.textContent = `${work.year} • ${work.medium}${work.dimensions ? ' • ' + work.dimensions : ''}`;
        if (this.lightboxDescription) this.setOrHide(this.lightboxDescription, work.description, '');
        if (this.lightboxTechnique) this.setOrHide(this.lightboxTechnique, work.technique, 'Technique: ');
        if (this.lightboxInspiration) this.setOrHide(this.lightboxInspiration, work.inspiration, 'Inspiration: ');
        if (this.lightboxSeries) this.setOrHide(this.lightboxSeries, work.series, 'Series: ');
        if (this.lightboxDimensionsNote) this.setOrHide(this.lightboxDimensionsNote, work.dimensions_note, '');

        // Update inquiry buttons
        this.updateInquireButton(work);
        this.updateExpandedInquireButton(work);

        // Show lightbox with GSAP animation
        this.lightbox.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Check if GSAP is available
        if (typeof gsap !== 'undefined') {
            // Animate lightbox entrance
            gsap.fromTo(this.lightbox,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );

            // Animate image
            const lightboxImage = this.lightbox.querySelector('.lightbox-image-container');
            if (lightboxImage) {
                gsap.fromTo(lightboxImage,
                    { opacity: 0, scale: 0.95 },
                    { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', delay: 0.1 }
                );
            }
        }

        // Set up focus trap
        this.setupFocusTrap();

        // Focus on close button
        setTimeout(() => {
            if (this.closeBtn) this.closeBtn.focus();
        }, 400);

        // Show first-time keyboard hint toast
        this.showLightboxHint();

        // Announce to screen readers
        if (window.announceToScreenReader) {
            window.announceToScreenReader(`Viewing ${work.title}. Use arrow keys to navigate, escape to close.`);
        }
    }

    showLightboxHint() {
        const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        const lastSeenTimestamp = localStorage.getItem('lightboxHintTimestamp');
        const now = Date.now();

        // Show hint if never seen or if 30 days have passed
        if (!lastSeenTimestamp || (now - parseInt(lastSeenTimestamp)) > THIRTY_DAYS) {
            const toast = document.getElementById('lightboxToast');

            if (!toast) return;

            // Show the toast
            toast.classList.add('show');

            // Hide it after 5 seconds and set the timestamp
            setTimeout(() => {
                toast.classList.remove('show');
                localStorage.setItem('lightboxHintTimestamp', now.toString());
            }, 5000);
        }
    }

    setOrHide(element, value, prefix = '') {
        if (!element) return;
        if (value && String(value).trim().length > 0) {
            element.style.display = '';
            element.textContent = `${prefix}${value}`;
        } else {
            element.style.display = 'none';
            element.textContent = '';
        }
    }

    close() {
        if (!this.lightbox || !this.isOpen) return;

        this.isOpen = false;

        // Animate lightbox exit with GSAP
        if (typeof gsap !== 'undefined') {
            gsap.to(this.lightbox, {
                opacity: 0,
                duration: 0.25,
                ease: 'power2.in',
                onComplete: () => {
                    this.lightbox.classList.remove('show');
                    document.body.style.overflow = ''; // Restore scrolling

                    // Return focus to the element that opened the lightbox
                    if (this.previousFocusElement) {
                        this.previousFocusElement.focus();
                    }
                }
            });
        } else {
            this.lightbox.classList.remove('show');
            document.body.style.overflow = '';
            if (this.previousFocusElement) {
                this.previousFocusElement.focus();
            }
        }

        if (window.announceToScreenReader) {
            window.announceToScreenReader('Lightbox closed');
        }
    }

    showNext() {
        const nextIndex = (this.currentIndex + 1) % this.currentWorks.length;
        const nextWork = this.currentWorks[nextIndex];
        this.navigateToWork(nextWork, nextIndex);
    }

    showPrevious() {
        const prevIndex = (this.currentIndex - 1 + this.currentWorks.length) % this.currentWorks.length;
        const prevWork = this.currentWorks[prevIndex];
        this.navigateToWork(prevWork, prevIndex);
    }

    navigateToWork(work, index) {
        if (!this.isOpen) return;

        this.currentIndex = index;

        // Show loading state briefly
        if (this.lightboxLoading) {
            this.lightboxLoading.classList.remove('hidden');
        }

        // Preload the next image
        const img = new Image();
        img.onload = () => {
            // Set the image on the hidden layer
            this.nextLightboxImage.src = work.image_url;
            this.nextLightboxImage.alt = work.title;

            // Crossfade: hide current, show next
            this.currentLightboxImage.classList.remove('visible');
            this.nextLightboxImage.classList.add('visible');

            // Swap the roles for next transition
            [this.currentLightboxImage, this.nextLightboxImage] = [this.nextLightboxImage, this.currentLightboxImage];

            // Hide loading
            if (this.lightboxLoading) {
                this.lightboxLoading.classList.add('hidden');
            }

            // Update text content with fade
            this.updateLightboxInfo(work);
        };

        img.onerror = () => {
            if (this.lightboxLoading) {
                this.lightboxLoading.classList.add('hidden');
            }
        };

        img.src = work.image_url;
    }

    updateLightboxInfo(work) {
        // Fade out bottom bar content
        if (this.lightboxBottomBar && typeof gsap !== 'undefined') {
            gsap.to([this.lightboxBottomTitle, this.lightboxBottomMeta, this.lightboxCounter], {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    // Update content
                    if (this.lightboxBottomTitle) this.lightboxBottomTitle.textContent = work.title;
                    if (this.lightboxBottomMeta) this.lightboxBottomMeta.textContent = `${work.year} • ${work.medium}`;
                    if (this.lightboxCounter) {
                        const currentPosition = this.currentIndex + 1;
                        const total = this.currentWorks.length;
                        this.lightboxCounter.textContent = `${currentPosition} / ${total}`;
                    }

                    // Fade back in
                    gsap.to([this.lightboxBottomTitle, this.lightboxBottomMeta, this.lightboxCounter], {
                        opacity: 1,
                        duration: 0.5,
                        delay: 0.2
                    });
                }
            });
        } else {
            // Fallback without animation
            if (this.lightboxBottomTitle) this.lightboxBottomTitle.textContent = work.title;
            if (this.lightboxBottomMeta) this.lightboxBottomMeta.textContent = `${work.year} • ${work.medium}`;
            if (this.lightboxCounter) {
                const currentPosition = this.currentIndex + 1;
                const total = this.currentWorks.length;
                this.lightboxCounter.textContent = `${currentPosition} / ${total}`;
            }
        }

        // Update expanded info panel
        if (this.lightboxExpandedTitle) this.lightboxExpandedTitle.textContent = work.title;
        if (this.lightboxExpandedMeta) this.lightboxExpandedMeta.textContent = `${work.year} • ${work.medium}${work.dimensions ? ' • ' + work.dimensions : ''}`;

        // Artist Statement Section
        const artistStatementSection = document.getElementById('artistStatementSection');
        const artistStatementElement = document.getElementById('lightboxArtistStatement');
        if (work.artist_statement && artistStatementSection && artistStatementElement) {
            artistStatementElement.textContent = work.artist_statement;
            artistStatementSection.style.display = 'block';
        } else if (artistStatementSection) {
            artistStatementSection.style.display = 'none';
        }

        if (this.lightboxExpandedDescription) this.setOrHide(this.lightboxExpandedDescription, work.description, '');
        if (this.lightboxExpandedTechnique) this.setOrHide(this.lightboxExpandedTechnique, work.technique, 'Technique: ');
        if (this.lightboxExpandedInspiration) this.setOrHide(this.lightboxExpandedInspiration, work.inspiration, 'Inspiration: ');
        if (this.lightboxExpandedSeries) this.setOrHide(this.lightboxExpandedSeries, work.series, 'Series: ');
        if (this.lightboxExpandedDimensionsNote) this.setOrHide(this.lightboxExpandedDimensionsNote, work.dimensions_note, '');

        // Update inquire buttons
        this.updateInquireButton(work);
        this.updateExpandedInquireButton(work);
    }

    setupFocusTrap() {
        // Get all focusable elements in the lightbox
        this.focusableElements = Array.from(
            this.lightbox.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        ).filter(el => !el.disabled && el.offsetParent !== null);
    }

    handleTabKey(e) {
        if (this.focusableElements.length === 0) return;

        const firstElement = this.focusableElements[0];
        const lastElement = this.focusableElements[this.focusableElements.length - 1];

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }

    updateInquireButton(work) {
        if (!this.lightboxInquireBtn) return;

        const availability = work.availability || (work.isForSale ? 'Available' : 'Sold');

        // Determine button text and action based on availability (generic gallery-style text)
        if (availability === 'Available' || work.isForSale) {
            this.lightboxInquireBtn.textContent = 'INQUIRE ABOUT ORIGINAL';
            this.lightboxInquireBtn.style.display = 'block';

            // Create mailto link with pre-filled subject and body
            this.lightboxInquireBtn.onclick = () => {
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
            this.lightboxInquireBtn.textContent = `Purchase '${work.title}' Print`;
            this.lightboxInquireBtn.style.display = 'block';
            this.lightboxInquireBtn.onclick = () => {
                window.location.href = work.printUrl;
            };
        } else if (availability === 'Sold' || availability === 'Private Collection') {
            // Show status but don't make it clickable
            this.lightboxInquireBtn.textContent = availability.toUpperCase();
            this.lightboxInquireBtn.style.display = 'block';
            this.lightboxInquireBtn.style.opacity = '0.5';
            this.lightboxInquireBtn.style.cursor = 'default';
            this.lightboxInquireBtn.onclick = null;
        } else {
            this.lightboxInquireBtn.style.display = 'none';
        }
    }

    toggleExpandedInfo() {
        if (!this.lightboxExpandedInfo) return;

        const isOpen = this.lightboxExpandedInfo.classList.contains('show');

        if (isOpen) {
            this.lightboxExpandedInfo.classList.remove('show');
            // Show bottom bar again
            if (this.lightboxBottomBar) {
                this.lightboxBottomBar.classList.remove('hidden');
            }
        } else {
            this.lightboxExpandedInfo.classList.add('show');
            // Hide bottom bar when expanded info is open
            if (this.lightboxBottomBar) {
                this.lightboxBottomBar.classList.add('hidden');
            }
        }
    }

    updateExpandedInquireButton(work) {
        if (!this.lightboxExpandedInquireBtn) return;

        const availability = work.availability || (work.isForSale ? 'Available' : 'Sold');

        // Determine button text and action based on availability (generic gallery-style text)
        if (availability === 'Available' || work.isForSale) {
            this.lightboxExpandedInquireBtn.textContent = 'INQUIRE ABOUT ORIGINAL';
            this.lightboxExpandedInquireBtn.style.display = 'block';

            // Create mailto link with pre-filled subject and body
            this.lightboxExpandedInquireBtn.onclick = () => {
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
            this.lightboxExpandedInquireBtn.textContent = `Purchase '${work.title}' Print`;
            this.lightboxExpandedInquireBtn.style.display = 'block';
            this.lightboxExpandedInquireBtn.onclick = () => {
                window.location.href = work.printUrl;
            };
        } else if (availability === 'Sold' || availability === 'Private Collection') {
            // Show status but don't make it clickable
            this.lightboxExpandedInquireBtn.textContent = availability.toUpperCase();
            this.lightboxExpandedInquireBtn.style.display = 'block';
            this.lightboxExpandedInquireBtn.style.opacity = '0.5';
            this.lightboxExpandedInquireBtn.style.cursor = 'default';
            this.lightboxExpandedInquireBtn.onclick = null;
        } else {
            this.lightboxExpandedInquireBtn.style.display = 'none';
        }
    }

    destroy() {
        if (this.isOpen) {
            this.close();
        }
    }
}
