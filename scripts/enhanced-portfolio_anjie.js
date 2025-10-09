// ====================================
// Enhanced Portfolio Data Structure
// ====================================
const portfolioData = [
    {
        id: 'celestial-drift',
        title: 'Celestial Drift',
        year: 2024,
        medium: 'Oil on linen',
        dimensions: '36" × 48"',
        image_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&fm=webp',
        description: 'A piece exploring the cosmic ballet of nebulae and nascent stars.',
        isForSale: true,
        print_url: null
    },
    {
        id: 'crimson-bloom',
        title: 'Crimson Bloom',
        year: 2024,
        medium: 'Acrylic on canvas',
        dimensions: '24" × 24"',
        image_url: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=600&fm=webp',
        description: 'An exploration of botanical forms at the edge of abstraction.',
        isForSale: false,
        print_url: '/shop/crimson-bloom'
    },
    {
        id: 'urban-symphony',
        title: 'Urban Symphony',
        year: 2024,
        medium: 'Mixed media on board',
        dimensions: '30" × 40"',
        image_url: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=600&fm=webp',
        description: 'Capturing the rhythm and chaos of city life.',
        isForSale: true,
        print_url: null
    },
    {
        id: 'ethereal-waves',
        title: 'Ethereal Waves',
        year: 2023,
        medium: 'Watercolor on paper',
        dimensions: '18" × 24"',
        image_url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=600&fm=webp',
        description: 'Fluid forms inspired by ocean movements.',
        isForSale: false,
        print_url: '/shop/ethereal-waves'
    },
    {
        id: 'golden-hour',
        title: 'Golden Hour',
        year: 2023,
        medium: 'Oil on canvas',
        dimensions: '48" × 60"',
        image_url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=600&fm=webp',
        description: 'Light and shadow interplay during the magic hour.',
        isForSale: true,
        print_url: null
    },
    {
        id: 'abstract-mind',
        title: 'Abstract Mind',
        year: 2023,
        medium: 'Digital painting',
        dimensions: '40" × 30"',
        image_url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=600&fm=webp',
        description: 'An exploration of consciousness and perception.',
        isForSale: false,
        print_url: '/shop/abstract-mind'
    }
];

// ====================================
// Global State Management
// ====================================
let currentIndex = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;
let threshold = 100;
let isTransitioning = false;

// Dual-layer background elements for crossfade
const bg1 = document.getElementById('bgImage1');
const bg2 = document.getElementById('bgImage2');
let currentBg = bg1;
let nextBg = bg2;

// DOM Elements
const container = document.getElementById('container');
const imgTitle = document.getElementById('imgTitle');
const imgMeta = document.getElementById('imgMeta');
const inquireBtn = document.getElementById('inquireBtn');
const prevPreview = document.getElementById('prevPreview');
const nextPreview = document.getElementById('nextPreview');
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingBlur = document.getElementById('loadingBlur');
const errorMessage = document.getElementById('errorMessage');
const announcer = document.getElementById('announcer');
const commandBar = document.getElementById('commandBar');
const thumbnailGrid = document.getElementById('thumbnailGrid');
const portfolioGrid = document.getElementById('portfolioGrid');

// ====================================
// Portfolio Grid Builder
// ====================================
function buildPortfolioGrid() {
    portfolioGrid.innerHTML = '';

    portfolioData.forEach((piece, index) => {
        const gridItem = document.createElement('article');
        gridItem.className = 'grid-item';

        const link = document.createElement('a');
        link.href = '#home';
        link.dataset.index = index;
        link.setAttribute('aria-label', `View ${piece.title} in full screen`);

        link.innerHTML = `
            <img src="${piece.thumbnail_url}" alt="${piece.title}" loading="lazy">
            <div class="grid-item-overlay">
                <h3>${piece.title}</h3>
                <p>${piece.year}</p>
            </div>
        `;

        link.addEventListener('click', (event) => {
            event.preventDefault();
            const imageIndex = parseInt(event.currentTarget.dataset.index, 10);

            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Wait a bit for scroll, then load image
            setTimeout(() => {
                loadImage(imageIndex);
            }, 300);
        });

        gridItem.appendChild(link);
        portfolioGrid.appendChild(gridItem);
    });
}

// ====================================
// Main Image Loading with Crossfade
// ====================================
function loadImage(index, direction = 'none') {
    if (isTransitioning || index < 0 || index >= portfolioData.length) {
        return;
    }

    isTransitioning = true;
    currentIndex = index;
    const piece = portfolioData[currentIndex];

    // Update text content
    imgTitle.textContent = piece.title;
    imgMeta.textContent = `${piece.medium}, ${piece.dimensions}, ${piece.year}`;

    // Update inquire button
    if (piece.isForSale) {
        inquireBtn.textContent = 'INQUIRE ABOUT ORIGINAL';
        inquireBtn.style.display = 'inline-block';
        inquireBtn.onclick = () => {
            window.location.href = `#contact`;
        };
    } else if (piece.print_url) {
        inquireBtn.textContent = 'PURCHASE PRINT';
        inquireBtn.style.display = 'inline-block';
        inquireBtn.onclick = () => {
            window.location.href = piece.print_url;
        };
    } else {
        inquireBtn.style.display = 'none';
    }

    // Crossfade transition
    const img = new Image();
    img.onload = () => {
        // Set the image on the hidden background div
        nextBg.style.backgroundImage = `url('${piece.image_url}')`;

        // Fade in the new image and fade out the old one
        currentBg.classList.remove('visible');
        nextBg.classList.add('visible');

        // Swap the roles of the background divs for the next transition
        [currentBg, nextBg] = [nextBg, currentBg];

        // Update aria labels
        currentBg.setAttribute('aria-label', `${piece.title} - ${piece.year}`);

        // Hide loading overlay if it's the first load
        if (loadingOverlay.classList.contains('hidden') === false) {
            loadingOverlay.classList.add('hidden');
        }

        // Update previews
        updatePreviews();

        // Update command bar if open
        if (commandBar.classList.contains('show')) {
            updateThumbnailGrid();
        }

        // Announce to screen readers
        announcer.textContent = `Now viewing ${piece.title}, ${piece.year}`;

        isTransitioning = false;
    };

    img.onerror = () => {
        console.error(`Failed to load image: ${piece.image_url}`);
        showError();
        isTransitioning = false;
    };

    img.src = piece.image_url;
}

// ====================================
// Preview Images Update
// ====================================
function updatePreviews() {
    const prevIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    const nextIndex = (currentIndex + 1) % portfolioData.length;

    prevPreview.style.backgroundImage = `url('${portfolioData[prevIndex].image_url}')`;
    nextPreview.style.backgroundImage = `url('${portfolioData[nextIndex].image_url}')`;
}

// ====================================
// Navigation Functions
// ====================================
function showNextImage() {
    const nextIndex = (currentIndex + 1) % portfolioData.length;
    loadImage(nextIndex, 'next');
}

function showPrevImage() {
    const prevIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    loadImage(prevIndex, 'prev');
}

// ====================================
// Drag/Swipe Navigation
// ====================================
function handleDragStart(e) {
    if (isTransitioning) return;

    isDragging = true;
    container.classList.add('dragging');
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    currentX = startX;
}

function handleDragMove(e) {
    if (!isDragging) return;

    e.preventDefault();
    currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const deltaX = currentX - startX;

    // Update preview positions
    prevPreview.style.transform = `translateX(calc(-100% + ${deltaX}px))`;
    nextPreview.style.transform = `translateX(calc(100% + ${deltaX}px))`;

    // Fade current background based on drag distance
    const opacity = 1 - Math.abs(deltaX) / (window.innerWidth / 2);
    currentBg.style.opacity = Math.max(0.3, opacity);
}

function handleDragEnd(e) {
    if (!isDragging) return;

    isDragging = false;
    container.classList.remove('dragging');

    const deltaX = currentX - startX;

    prevPreview.classList.add('snapping');
    nextPreview.classList.add('snapping');

    if (deltaX > threshold) {
        showPrevImage();
    } else if (deltaX < -threshold) {
        showNextImage();
    } else {
        // Restore opacity
        currentBg.style.opacity = 1;
    }

    // Reset preview positions
    setTimeout(() => {
        prevPreview.style.transform = 'translateX(-100%)';
        nextPreview.style.transform = 'translateX(100%)';
        prevPreview.classList.remove('snapping');
        nextPreview.classList.remove('snapping');
    }, 250);
}

// ====================================
// Command Bar (Gallery Overview)
// ====================================
function buildThumbnailGrid() {
    thumbnailGrid.innerHTML = '';

    portfolioData.forEach((piece, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail-item';
        thumbnail.setAttribute('role', 'gridcell');
        thumbnail.setAttribute('tabindex', '0');
        thumbnail.setAttribute('aria-label', `${piece.title}, ${piece.year}`);

        if (index === currentIndex) {
            thumbnail.classList.add('current');
        }

        thumbnail.innerHTML = `
            <img src="${piece.thumbnail_url}" alt="${piece.title}">
            <div class="thumbnail-info">
                <div>${piece.title}</div>
                <div>${piece.year}</div>
            </div>
        `;

        thumbnail.addEventListener('click', () => {
            loadImage(index);
            closeCommandBar();
        });

        thumbnail.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                loadImage(index);
                closeCommandBar();
            }
        });

        thumbnailGrid.appendChild(thumbnail);
    });
}

function updateThumbnailGrid() {
    const thumbnails = thumbnailGrid.querySelectorAll('.thumbnail-item');
    thumbnails.forEach((thumb, index) => {
        if (index === currentIndex) {
            thumb.classList.add('current');
        } else {
            thumb.classList.remove('current');
        }
    });
}

function openCommandBar() {
    commandBar.classList.add('show');
    updateThumbnailGrid();

    // Focus first thumbnail
    const firstThumbnail = thumbnailGrid.querySelector('.thumbnail-item');
    if (firstThumbnail) {
        setTimeout(() => firstThumbnail.focus(), 100);
    }
}

function closeCommandBar() {
    commandBar.classList.remove('show');
}

function toggleCommandBar() {
    if (commandBar.classList.contains('show')) {
        closeCommandBar();
    } else {
        openCommandBar();
    }
}

// ====================================
// Error Handling
// ====================================
function showError() {
    errorMessage.classList.add('show');
}

function hideError() {
    errorMessage.classList.remove('show');
}

// ====================================
// Toast Notifications
// ====================================
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ====================================
// Keyboard Navigation
// ====================================
document.addEventListener('keydown', (e) => {
    // Don't trigger if command bar is open and user is navigating thumbnails
    if (commandBar.classList.contains('show')) {
        if (e.key === 'Escape' || e.key === 'g' || e.key === 'G') {
            e.preventDefault();
            closeCommandBar();
        }
        return;
    }

    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            showPrevImage();
            break;
        case 'ArrowRight':
            e.preventDefault();
            showNextImage();
            break;
        case 'g':
        case 'G':
            e.preventDefault();
            toggleCommandBar();
            break;
        case 'Escape':
            closeCommandBar();
            break;
    }
});

// ====================================
// Button Event Listeners
// ====================================
document.querySelector('.carousel-nav .prev').addEventListener('click', showPrevImage);
document.querySelector('.carousel-nav .next').addEventListener('click', showNextImage);
document.getElementById('galleryHint').addEventListener('click', toggleCommandBar);
document.getElementById('errorRetry').addEventListener('click', () => {
    hideError();
    loadImage(currentIndex);
});

// Close command bar when clicking overlay
commandBar.addEventListener('click', (e) => {
    if (e.target === commandBar) {
        closeCommandBar();
    }
});

// ====================================
// Drag Event Listeners
// ====================================
container.addEventListener('mousedown', handleDragStart);
container.addEventListener('mousemove', handleDragMove);
container.addEventListener('mouseup', handleDragEnd);
container.addEventListener('mouseleave', handleDragEnd);

container.addEventListener('touchstart', handleDragStart, { passive: true });
container.addEventListener('touchmove', handleDragMove, { passive: false });
container.addEventListener('touchend', handleDragEnd);

// ====================================
// Contextual Tips
// ====================================
function showContextualTip() {
    const tip = document.getElementById('contextualTip');
    tip.classList.add('show');

    setTimeout(() => {
        tip.classList.remove('show');
    }, 5000);
}

document.getElementById('contextualTipClose').addEventListener('click', () => {
    document.getElementById('contextualTip').classList.remove('show');
});

// ====================================
// Initialization
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    // Set loading blur to first image
    loadingBlur.style.backgroundImage = `url('${portfolioData[0].thumbnail_url}')`;

    // Build portfolio grid
    buildPortfolioGrid();

    // Build thumbnail grid
    buildThumbnailGrid();

    // Load first image
    loadImage(0);

    // Show contextual tip after a delay
    setTimeout(() => {
        showContextualTip();
    }, 2000);

    // Show toast hint after a longer delay
    setTimeout(() => {
        if (!sessionStorage.getItem('toastShown')) {
            showToast('Pro Tip: Press G to view the full gallery.', 4000);
            sessionStorage.setItem('toastShown', 'true');
        }
    }, 5000);
});

// ====================================
// Smooth Scroll for Navigation Links
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for grid items or title links
        if (href === '#home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(href);
        if (target && href !== '#home') {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ====================================
// Preload Images for Better Performance
// ====================================
function preloadImages() {
    portfolioData.forEach((piece) => {
        const img = new Image();
        img.src = piece.image_url;
    });
}

// Preload images after initial load
setTimeout(preloadImages, 2000);
