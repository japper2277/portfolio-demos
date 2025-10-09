// ========================================
// CONFIGURATION & GALLERY DATA
// ========================================

const gallery = [
    { year: 2024, image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1920&fm=webp', title: 'down (iteration 3)', medium: 'Acrylic on Loose Canvas, 11.5 x 16 inches', thumb: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=300&fm=webp' },
    { year: 2024, image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1920&fm=webp', title: 'Urban Dreams', medium: 'Oil on Canvas, 30 x 40 inches', thumb: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=300&fm=webp' },
    { year: 2024, image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1920&fm=webp', title: 'Abstract Motion', medium: 'Mixed Media on Panel, 24 x 36 inches', thumb: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=300&fm=webp' },
    { year: 2023, image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1920&fm=webp', title: 'Neon Nights', medium: 'Acrylic on Canvas, 48 x 60 inches', thumb: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=300&fm=webp' },
    { year: 2023, image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1920&fm=webp', title: 'Chromatic Study', medium: 'Watercolor on Paper, 18 x 24 inches', thumb: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=300&fm=webp' },
    { year: 2023, image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1920&fm=webp', title: 'Celestial Forms', medium: 'Oil on Linen, 36 x 48 inches', thumb: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=300&fm=webp' },
    { year: 2023, image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1920&fm=webp', title: 'Digital Landscape', medium: 'Acrylic on Wood Panel, 20 x 30 inches', thumb: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=300&fm=webp' },
    { year: 2022, image: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?q=80&w=1920&fm=webp', title: 'Infinite Horizon', medium: 'Oil on Canvas, 40 x 60 inches', thumb: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?q=80&w=300&fm=webp' },
    { year: 2022, image: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?q=80&w=1920&fm=webp', title: 'Gradient Space', medium: 'Mixed Media on Canvas, 32 x 44 inches', thumb: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?q=80&w=300&fm=webp' },
    { year: 2022, image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1920&fm=webp', title: 'Prismatic Vision', medium: 'Acrylic and Ink on Paper, 22 x 28 inches', thumb: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=300&fm=webp' },
    { year: 2022, image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?q=80&w=1920&fm=webp', title: 'Color Field', medium: 'Oil on Canvas, 36 x 36 inches', thumb: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?q=80&w=300&fm=webp' },
    { year: 2022, image: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=1920&fm=webp', title: 'Radiant Bloom', medium: 'Acrylic on Stretched Canvas, 24 x 32 inches', thumb: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=300&fm=webp' }
];

// Drag configuration constants
const DRAG_THRESHOLD = 100; // px to trigger image change
const FLICK_VELOCITY = 0.5; // px/ms for flick detection


// ========================================
// DOM ELEMENT REFERENCES
// ========================================

const leftZone = document.querySelector('.hover-zone.left');
const rightZone = document.querySelector('.hover-zone.right');
const prevButton = document.querySelector('.carousel-nav .prev');
const nextButton = document.querySelector('.carousel-nav .next');
const backgroundImage = document.getElementById('backgroundImage');
const prevPreview = document.getElementById('prevPreview');
const nextPreview = document.getElementById('nextPreview');
const imgTitle = document.getElementById('imgTitle');
const imgMeta = document.getElementById('imgMeta');
const loadingOverlay = document.getElementById('loadingOverlay');
const errorMessage = document.getElementById('errorMessage');
const errorRetry = document.getElementById('errorRetry');
const announcer = document.getElementById('announcer');
const container = document.getElementById('container');
const contextualTip = document.getElementById('contextualTip');
const contextualTipClose = document.getElementById('contextualTipClose');
const commandBar = document.getElementById('commandBar');
const thumbnailGrid = document.getElementById('thumbnailGrid');
const toast = document.getElementById('toast');
const galleryHint = document.getElementById('galleryHint');


// ========================================
// STATE MANAGEMENT
// ========================================

let currentIndex = 0;
let isTransitioning = false;
let touchStartX = 0;
let touchEndX = 0;
let imageViewCount = 0;
let hasSeenTip = localStorage.getItem('hasSeenTip') === 'true';
let isCommandBarOpen = false;
let thumbnailsGenerated = false;

// Drag state
let isDragging = false;
let dragStartX = 0;
let dragCurrentX = 0;
let dragStartTime = 0;
let dragVelocity = 0;


// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Announces a message to screen readers
 * @param {string} message - Message to announce
 */
function announce(message) {
    announcer.textContent = message;
    setTimeout(() => announcer.textContent = '', 1000);
}

/**
 * Shows a contextual tip to the user (once)
 * @param {string} message - Tip message to display
 */
function showContextualTip(message) {
    if (hasSeenTip) return;
    const tipText = document.getElementById('contextualTipText');
    tipText.textContent = message;
    contextualTip.classList.add('show');
    setTimeout(() => {
        contextualTip.classList.remove('show');
        hasSeenTip = true;
        localStorage.setItem('hasSeenTip', 'true');
    }, 5000);
}

/**
 * Updates the URL with the current image index
 */
function updateURL() {
    const params = new URLSearchParams(window.location.search);
    params.set('image', currentIndex);
    const newURL = `${window.location.pathname}?${params.toString()}`;
    history.pushState({ index: currentIndex }, '', newURL);
}



// ========================================
// IMAGE LOADING & NAVIGATION
// ========================================

/**
 * Preloads the first 3 images immediately, then the rest after a delay
 */
function preloadImages() {
    const priorityImages = gallery.slice(0, 3);
    priorityImages.forEach((item, index) => {
        const img = new Image();
        if (index === 0) img.fetchPriority = 'high';
        img.src = item.image;
    });

    setTimeout(() => {
        gallery.slice(3).forEach(item => {
            const img = new Image();
            img.src = item.image;
        });
    }, 2000);
}

/**
 * Preloads adjacent images for smooth drag experience
 */
function preloadAdjacentImages() {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : gallery.length - 1;
    const nextIndex = currentIndex < gallery.length - 1 ? currentIndex + 1 : 0;

    const prevImg = new Image();
    prevImg.src = gallery[prevIndex].image;

    const nextImg = new Image();
    nextImg.src = gallery[nextIndex].image;
}

/**
 * Updates the preview images shown during drag
 */
function updatePreviewImages() {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : gallery.length - 1;
    const nextIndex = currentIndex < gallery.length - 1 ? currentIndex + 1 : 0;

    const prevItem = gallery[prevIndex];
    prevPreview.style.backgroundImage = `url('${prevItem.image}')`;
    prevPreview.style.display = 'block';

    const nextItem = gallery[nextIndex];
    nextPreview.style.backgroundImage = `url('${nextItem.image}')`;
    nextPreview.style.display = 'block';
}

/**
 * Updates the displayed image
 * @param {number} index - Index of the image to display
 * @param {boolean} animate - Whether to animate the transition
 */
function updateImage(index, animate = true) {
    if (isTransitioning || index < 0 || index >= gallery.length) return;

    isTransitioning = true;
    currentIndex = index;
    const item = gallery[currentIndex];

    imageViewCount++;
    if (imageViewCount === 3) {
        showContextualTip('Press ← → to navigate images');
    }

    imgTitle.classList.remove('visible');
    imgMeta.classList.remove('visible');
    errorMessage.classList.remove('show');

    if (animate) {
        backgroundImage.classList.add('fade-out');
    }

    const tempImg = new Image();
    const loadTimeout = setTimeout(() => {
        errorMessage.classList.add('show');
        isTransitioning = false;
    }, 10000);

    tempImg.onload = () => {
        clearTimeout(loadTimeout);
        setTimeout(() => {
            backgroundImage.style.backgroundImage = `url('${item.image}')`;
            backgroundImage.setAttribute('aria-label', `${item.title} - ${item.medium}, ${item.year}`);

            if (animate) {
                backgroundImage.classList.remove('fade-out');
            }
            backgroundImage.classList.add('loaded');

            imgTitle.textContent = item.title;
            imgMeta.innerHTML = `${item.year} · ${item.medium}`;

            setTimeout(() => {
                imgTitle.classList.add('visible');
                imgMeta.classList.add('visible');
            }, 100);

            updateURL();
            updatePreviewImages();
            preloadAdjacentImages();
            announce(`Viewing ${item.title}, image ${currentIndex + 1} of ${gallery.length}`);

            isTransitioning = false;
        }, animate ? 400 : 0);
    };

    tempImg.onerror = () => {
        clearTimeout(loadTimeout);
        errorMessage.classList.add('show');
        isTransitioning = false;
    };

    tempImg.src = item.image;
}

/**
 * Navigates to the next or previous image with wrap-around
 * @param {number} direction - Direction to navigate (-1 for prev, 1 for next)
 */
function navigate(direction) {
    let newIndex = currentIndex + direction;

    // Wrap around: if at end, go to start; if at start, go to end
    if (newIndex >= gallery.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = gallery.length - 1;
    }

    updateImage(newIndex);
}


// ========================================
// DRAG & TOUCH HANDLERS
// ========================================

/**
 * Handles the start of a drag gesture
 * @param {number} clientX - X coordinate of the drag start
 */
function handleDragStart(clientX) {
    if (isTransitioning) return;
    isDragging = true;
    dragStartX = clientX;
    dragCurrentX = clientX;
    dragStartTime = Date.now();
    backgroundImage.classList.add('dragging');
    container.classList.add('dragging');
    updatePreviewImages();
}

/**
 * Handles drag movement
 * @param {number} clientX - Current X coordinate during drag
 */
function handleDragMove(clientX) {
    if (!isDragging) return;

    dragCurrentX = clientX;
    const deltaX = dragCurrentX - dragStartX;
    const deltaTime = Date.now() - dragStartTime;
    dragVelocity = deltaX / (deltaTime || 1);

    // Apply transform to current image
    backgroundImage.style.transform = `scale(1) translateX(${deltaX}px)`;

    // Move preview images in sync
    if (deltaX > 0) {
        // Dragging right - show previous image
        prevPreview.style.transform = `translateX(calc(-100% + ${deltaX}px))`;
    } else if (deltaX < 0) {
        // Dragging left - show next image
        nextPreview.style.transform = `translateX(calc(100% + ${deltaX}px))`;
    }
}

/**
 * Handles the end of a drag gesture (Instagram-style swipe)
 */
function handleDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    backgroundImage.classList.remove('dragging');
    container.classList.remove('dragging');

    const deltaX = dragCurrentX - dragStartX;
    const absVelocity = Math.abs(dragVelocity);

    // Determine if we should change image
    let shouldChange = false;
    let direction = 0;

    // Flick gesture detection
    if (absVelocity > FLICK_VELOCITY) {
        shouldChange = true;
        direction = dragVelocity > 0 ? -1 : 1;
    }
    // Threshold detection
    else if (Math.abs(deltaX) > DRAG_THRESHOLD) {
        shouldChange = true;
        direction = deltaX > 0 ? -1 : 1;
    }

    // Execute change or snap back
    if (shouldChange) {
        // Instagram-style: smooth snap completion with wrap-around
        let newIndex = currentIndex + direction;

        // Wrap around
        if (newIndex >= gallery.length) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = gallery.length - 1;
        }

        const newItem = gallery[newIndex];

        // Animate both images completing the swipe
        backgroundImage.classList.add('animating');
        const finalTransform = direction === 1 ? '-100%' : '100%';
        backgroundImage.style.transform = `translateX(${finalTransform})`;

        // Animate the preview into position
        if (direction === 1) {
            nextPreview.classList.add('snapping');
            nextPreview.style.transform = 'translateX(0)';
        } else {
            prevPreview.classList.add('snapping');
            prevPreview.style.transform = 'translateX(0)';
        }

        // After animation completes, swap the actual images
        setTimeout(() => {
            // Instantly swap - no visible change since preview is already in place
            backgroundImage.classList.remove('animating');
            backgroundImage.style.transition = 'none';
            backgroundImage.style.transform = 'translateX(0)';
            backgroundImage.style.backgroundImage = `url('${newItem.image}')`;
            backgroundImage.setAttribute('aria-label', `${newItem.title} - ${newItem.medium}, ${newItem.year}`);

            // Update UI
            currentIndex = newIndex;
            imgTitle.textContent = newItem.title;
            imgMeta.innerHTML = `${newItem.year} · ${newItem.medium}`;

            // Reset previews without animation
            prevPreview.classList.remove('snapping');
            nextPreview.classList.remove('snapping');
            prevPreview.style.transition = 'none';
            nextPreview.style.transition = 'none';
            prevPreview.style.transform = 'translateX(-100%)';
            nextPreview.style.transform = 'translateX(100%)';

            // Update everything else
            updateURL();
            updatePreviewImages();
            preloadAdjacentImages();
            announce(`Viewing ${newItem.title}, image ${currentIndex + 1} of ${gallery.length}`);

            // Re-enable transitions after a frame
            requestAnimationFrame(() => {
                backgroundImage.style.transition = '';
                prevPreview.style.transition = '';
                nextPreview.style.transition = '';
            });
        }, 250);
    } else {
        // Snap back with animation
        backgroundImage.classList.add('animating');
        backgroundImage.style.transform = 'translateX(0)';

        // Animate previews back too
        if (deltaX > 0) {
            prevPreview.classList.add('snapping');
            prevPreview.style.transform = 'translateX(-100%)';
        } else if (deltaX < 0) {
            nextPreview.classList.add('snapping');
            nextPreview.style.transform = 'translateX(100%)';
        }

        setTimeout(() => {
            backgroundImage.classList.remove('animating');
            prevPreview.classList.remove('snapping');
            nextPreview.classList.remove('snapping');
        }, 250);
    }
}

// Touch event handlers
function handleTouchStart(e) {
    const touch = e.changedTouches[0];
    handleDragStart(touch.clientX);
}

function handleTouchMove(e) {
    if (isDragging) {
        e.preventDefault(); // Prevent scrolling while dragging
        const touch = e.changedTouches[0];
        handleDragMove(touch.clientX);
    }
}

function handleTouchEnd(e) {
    handleDragEnd();
}

// Mouse event handlers
function handleMouseDown(e) {
    // Ignore if clicking on buttons, links, or interactive elements
    if (e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('.year-filter') ||
        e.target.closest('.main-header')) {
        return;
    }

    e.preventDefault();
    handleDragStart(e.clientX);
}

function handleMouseMove(e) {
    if (isDragging) {
        e.preventDefault();
        handleDragMove(e.clientX);
    }
}

function handleMouseUp(e) {
    if (isDragging) {
        e.preventDefault();
        handleDragEnd();
    }
}

function handleMouseLeave(e) {
    if (isDragging) {
        handleDragEnd();
    }
}


// ========================================
// COMMAND BAR / GALLERY GRID
// ========================================

/**
 * Generates thumbnail grid for gallery overview
 */
function generateThumbnails() {
    if (thumbnailsGenerated) return;

    thumbnailGrid.innerHTML = '';
    gallery.forEach((item, index) => {
        const thumbItem = document.createElement('div');
        thumbItem.className = 'thumbnail-item';
        thumbItem.setAttribute('role', 'gridcell');
        thumbItem.setAttribute('tabindex', index === currentIndex ? '0' : '-1');
        thumbItem.dataset.index = index;

        if (index === currentIndex) {
            thumbItem.classList.add('current');
        }

        const img = document.createElement('img');
        img.src = item.thumb;
        img.alt = item.title;
        img.loading = 'lazy';

        const info = document.createElement('div');
        info.className = 'thumbnail-info';
        info.textContent = item.title;

        thumbItem.appendChild(img);
        thumbItem.appendChild(info);
        thumbnailGrid.appendChild(thumbItem);

        // Click handler
        thumbItem.addEventListener('click', () => {
            selectThumbnail(index);
        });

        // Keyboard navigation
        thumbItem.addEventListener('keydown', (e) => {
            handleThumbnailKeydown(e, index);
        });
    });

    thumbnailsGenerated = true;
}

/**
 * Selects a thumbnail and closes the command bar
 * @param {number} index - Index of the selected thumbnail
 */
function selectThumbnail(index) {
    closeCommandBar();
    updateImage(index);
}

/**
 * Updates the visual selection state of thumbnails
 */
function updateThumbnailSelection() {
    const thumbnails = thumbnailGrid.querySelectorAll('.thumbnail-item');
    thumbnails.forEach((thumb, index) => {
        if (index === currentIndex) {
            thumb.classList.add('current');
            thumb.setAttribute('tabindex', '0');
        } else {
            thumb.classList.remove('current');
            thumb.setAttribute('tabindex', '-1');
        }
    });
}

/**
 * Opens the command bar gallery overview
 */
function openCommandBar() {
    if (isCommandBarOpen) return;
    isCommandBarOpen = true;
    generateThumbnails();
    updateThumbnailSelection();
    commandBar.classList.add('show');

    // Focus current thumbnail
    setTimeout(() => {
        const currentThumb = thumbnailGrid.querySelector('.thumbnail-item.current');
        if (currentThumb) currentThumb.focus();
    }, 100);

    announce('Gallery overview opened');
}

/**
 * Closes the command bar gallery overview
 */
function closeCommandBar() {
    if (!isCommandBarOpen) return;
    isCommandBarOpen = false;
    commandBar.classList.remove('show');

    // Remove focus from thumbnails so G key works from document level
    if (document.activeElement && document.activeElement.classList.contains('thumbnail-item')) {
        document.activeElement.blur();
    }

    announce('Gallery overview closed');
}

/**
 * Toggles the command bar open/closed
 */
function toggleCommandBar() {
    if (isCommandBarOpen) {
        closeCommandBar();
    } else {
        openCommandBar();
    }
}

/**
 * Handles keyboard navigation within thumbnail grid
 * @param {KeyboardEvent} e - Keyboard event
 * @param {number} index - Current thumbnail index
 */
function handleThumbnailKeydown(e, index) {
    const thumbnails = Array.from(thumbnailGrid.querySelectorAll('.thumbnail-item'));
    const cols = Math.floor(thumbnailGrid.offsetWidth / 200); // Approximate columns
    let newIndex = index;

    switch(e.key) {
        case 'ArrowRight':
            e.preventDefault();
            newIndex = Math.min(index + 1, thumbnails.length - 1);
            break;
        case 'ArrowLeft':
            e.preventDefault();
            newIndex = Math.max(index - 1, 0);
            break;
        case 'ArrowDown':
            e.preventDefault();
            newIndex = Math.min(index + cols, thumbnails.length - 1);
            break;
        case 'ArrowUp':
            e.preventDefault();
            newIndex = Math.max(index - cols, 0);
            break;
        case 'Enter':
            e.preventDefault();
            selectThumbnail(index);
            return;
        case 'Escape':
        case 'g':
        case 'G':
            e.preventDefault();
            e.stopPropagation();
            closeCommandBar();
            return;
    }

    if (newIndex !== index) {
        thumbnails[newIndex].focus();
    }
}


// ========================================
// TOAST NOTIFICATION
// ========================================

/**
 * Shows the toast notification on first visit after 3 seconds of inactivity
 */
function showToast() {
    if (!localStorage.getItem('hasSeenGalleryToast')) {
        let activityTimer;
        let hasShown = false;

        const resetTimer = () => {
            clearTimeout(activityTimer);
            if (!hasShown) {
                activityTimer = setTimeout(() => {
                    if (toast && !hasShown) {
                        toast.classList.add('show');
                        hasShown = true;

                        setTimeout(() => {
                            if (toast) {
                                toast.classList.remove('show');
                            }
                            localStorage.setItem('hasSeenGalleryToast', 'true');
                        }, 5000);

                        // Remove event listeners after showing
                        document.removeEventListener('keydown', resetTimer);
                        document.removeEventListener('mousemove', resetTimer);
                        document.removeEventListener('click', resetTimer);
                    }
                }, 3000);
            }
        };

        // Start the timer on any user activity
        document.addEventListener('keydown', resetTimer, { once: false });
        document.addEventListener('mousemove', resetTimer, { once: false });
        document.addEventListener('click', resetTimer, { once: false });

        // Initial timer start
        resetTimer();
    }
}


// ========================================
// INITIALIZATION
// ========================================

/**
 * Initializes the portfolio from URL parameters
 */
function initFromURL() {
    const params = new URLSearchParams(window.location.search);
    const imageParam = parseInt(params.get('image')) || 0;
    currentIndex = Math.min(imageParam, gallery.length - 1);
}

/**
 * Main initialization function
 */
function init() {
    initFromURL();
    preloadImages();
    updateImage(currentIndex, false);
    setTimeout(() => loadingOverlay.classList.add('hidden'), 500);
}


// ========================================
// EVENT LISTENERS
// ========================================

// Navigation buttons
if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => navigate(-1));
    nextButton.addEventListener('click', () => navigate(1));
}

// Error retry
errorRetry.addEventListener('click', () => {
    errorMessage.classList.remove('show');
    updateImage(currentIndex);
});

// Contextual tip close
contextualTipClose.addEventListener('click', () => {
    contextualTip.classList.remove('show');
    hasSeenTip = true;
    localStorage.setItem('hasSeenTip', 'true');
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Handle 'G' key even when command bar is open
    if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        toggleCommandBar();
        return;
    }

    // Don't interfere with other keys if command bar is open
    if (isCommandBarOpen) return;

    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate(-1);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigate(1);
    } else if (e.key === ' ') {
        e.preventDefault();
        navigate(1);
    }
});

// Close command bar on overlay click
commandBar.addEventListener('click', (e) => {
    if (e.target === commandBar) {
        closeCommandBar();
    }
});

// Gallery hint button click
if (galleryHint) {
    galleryHint.addEventListener('click', (e) => {
        e.preventDefault();
        toggleCommandBar();
    });
}

// Touch events for drag
container.addEventListener('touchstart', handleTouchStart, { passive: true });
container.addEventListener('touchmove', handleTouchMove, { passive: false });
container.addEventListener('touchend', handleTouchEnd, { passive: true });
container.addEventListener('touchcancel', handleTouchEnd, { passive: true });

// Mouse events for drag
container.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mouseleave', handleMouseLeave);

// Browser navigation (back/forward)
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.index !== undefined) {
        updateImage(e.state.index, false);
    }
});

// Initialize the app
init();
showToast();
