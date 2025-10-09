// ====================================
// Enhanced Portfolio Data Structure
// Featured works appear in hero carousel
// ====================================
const portfolioData = [
    // 2024 Works
    {
        id: 'celestial-drift',
        title: 'Celestial Drift',
        year: 2024,
        medium: 'Oil on linen',
        dimensions: '36" × 48"',
        image_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&fm=webp',
        description: 'A piece exploring the cosmic ballet of nebulae and nascent stars.',
        artist_statement: 'I wanted to capture the feeling of floating through space, suspended between gravity and weightlessness. The layered oil washes create depth that mirrors the vastness of the cosmos, while the color palette evokes both the warmth of distant stars and the cold emptiness between them.',
        isForSale: true,
        print_url: null,
        featured: true
    },
    {
        id: 'crimson-bloom',
        title: 'Crimson Bloom',
        year: 2024,
        medium: 'Acrylic on canvas',
        dimensions: '24" × 24"',
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&fm=webp',
        description: 'An exploration of botanical forms at the edge of abstraction.',
        artist_statement: 'This piece emerged from early morning walks through my neighborhood. I became obsessed with how flowers look in that golden hour light—simultaneously sharp and soft. The painting hovers intentionally between representation and pure color field, inviting viewers to find their own relationship with the form.',
        isForSale: false,
        print_url: '/shop/crimson-bloom',
        featured: true
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
        artist_statement: 'Living in New York, you become attuned to the city's pulse. This piece uses collaged newspaper fragments, spray paint, and gestural marks to mirror the sensory overload of urban existence—the construction noise, the neon signs, the endless movement. It's chaotic, but there's a harmony underneath.',
        isForSale: true,
        print_url: null,
        featured: true
    },
    {
        id: 'neon-dreams',
        title: 'Neon Dreams',
        year: 2024,
        medium: 'Acrylic on canvas',
        dimensions: '40" × 30"',
        image_url: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=600&fm=webp',
        description: 'Electric colors dance across the urban landscape.',
        isForSale: true,
        print_url: null,
        featured: false
    },
    {
        id: 'whispers-of-autumn',
        title: 'Whispers of Autumn',
        year: 2024,
        medium: 'Oil on canvas',
        dimensions: '36" × 48"',
        image_url: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=600&fm=webp',
        description: 'Capturing the fleeting beauty of fall.',
        isForSale: false,
        print_url: '/shop/whispers-autumn',
        featured: false
    },
    {
        id: 'midnight-garden',
        title: 'Midnight Garden',
        year: 2024,
        medium: 'Mixed media',
        dimensions: '24" × 36"',
        image_url: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?q=80&w=600&fm=webp',
        description: 'Nocturnal blooms in a surreal landscape.',
        isForSale: true,
        print_url: null,
        featured: false
    },
    {
        id: 'digital-horizons',
        title: 'Digital Horizons',
        year: 2024,
        medium: 'Digital art print',
        dimensions: '30" × 40"',
        image_url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=600&fm=webp',
        description: 'Where technology meets nature.',
        isForSale: true,
        print_url: null,
        featured: false
    },
    {
        id: 'fragments-of-memory',
        title: 'Fragments of Memory',
        year: 2024,
        medium: 'Collage on board',
        dimensions: '20" × 24"',
        image_url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600&fm=webp',
        description: 'Piecing together moments from the past.',
        isForSale: false,
        print_url: '/shop/fragments-memory',
        featured: false
    },
    {
        id: 'ocean-depths',
        title: 'Ocean Depths',
        year: 2024,
        medium: 'Oil on canvas',
        dimensions: '48" × 36"',
        image_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=600&fm=webp',
        description: 'Exploring the mystery beneath the waves.',
        isForSale: true,
        print_url: null,
        featured: false
    },
    {
        id: 'crystal-clarity',
        title: 'Crystal Clarity',
        year: 2024,
        medium: 'Acrylic on canvas',
        dimensions: '30" × 30"',
        image_url: 'https://images.unsplash.com/photo-1551732998-c91d86d39a7e?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1551732998-c91d86d39a7e?q=80&w=600&fm=webp',
        description: 'Geometric patterns in vibrant hues.',
        isForSale: true,
        print_url: null,
        featured: false
    },

    // 2023 Works
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
        print_url: '/shop/ethereal-waves',
        featured: true
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
        print_url: null,
        featured: true
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
        print_url: '/shop/abstract-mind',
        featured: true
    },
    {
        id: 'desert-mirage',
        title: 'Desert Mirage',
        year: 2023,
        medium: 'Oil on linen',
        dimensions: '36" × 48"',
        image_url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=600&fm=webp',
        description: 'Heat waves dance across the arid landscape.',
        isForSale: true,
        print_url: null,
        featured: false
    },
    {
        id: 'winter-solstice',
        title: 'Winter Solstice',
        year: 2023,
        medium: 'Acrylic on canvas',
        dimensions: '30" × 40"',
        image_url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=600&fm=webp',
        description: 'The stillness of the longest night.',
        isForSale: false,
        print_url: '/shop/winter-solstice',
        featured: false
    },
    {
        id: 'urban-jungle',
        title: 'Urban Jungle',
        year: 2023,
        medium: 'Mixed media',
        dimensions: '40" × 30"',
        image_url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=600&fm=webp',
        description: 'Nature reclaims the cityscape.',
        isForSale: true,
        print_url: null,
        featured: false
    },
    {
        id: 'reflections',
        title: 'Reflections',
        year: 2023,
        medium: 'Oil on canvas',
        dimensions: '24" × 36"',
        image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&fm=webp',
        description: 'Mirror images of reality and imagination.',
        isForSale: true,
        print_url: null,
        featured: false
    },
    {
        id: 'chromatic-burst',
        title: 'Chromatic Burst',
        year: 2023,
        medium: 'Acrylic on canvas',
        dimensions: '36" × 36"',
        image_url: 'https://images.unsplash.com/photo-1506259091721-347e791bab0f?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1506259091721-347e791bab0f?q=80&w=600&fm=webp',
        description: 'An explosion of color and energy.',
        isForSale: false,
        print_url: '/shop/chromatic-burst',
        featured: false
    },
    {
        id: 'serenity-now',
        title: 'Serenity Now',
        year: 2023,
        medium: 'Watercolor',
        dimensions: '18" × 24"',
        image_url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=600&fm=webp',
        description: 'Finding peace in the chaos.',
        isForSale: true,
        print_url: null,
        featured: false
    },
    {
        id: 'temporal-flux',
        title: 'Temporal Flux',
        year: 2023,
        medium: 'Digital art',
        dimensions: '30" × 40"',
        image_url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&fm=webp',
        description: 'Time bends and warps in this visual exploration.',
        isForSale: false,
        print_url: '/shop/temporal-flux',
        featured: false
    },

    // 2022 Works
    {
        id: 'mountain-majesty',
        title: 'Mountain Majesty',
        year: 2022,
        medium: 'Oil on canvas',
        dimensions: '48" × 60"',
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&fm=webp',
        description: 'The grandeur of alpine landscapes.',
        isForSale: true,
        print_url: null,
        featured: true
    },
    {
        id: 'electric-soul',
        title: 'Electric Soul',
        year: 2022,
        medium: 'Acrylic on canvas',
        dimensions: '30" × 40"',
        image_url: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=600&fm=webp',
        description: 'Energy flows through every brushstroke.',
        isForSale: false,
        print_url: '/shop/electric-soul',
        featured: false
    },
    {
        id: 'forest-whispers',
        title: 'Forest Whispers',
        year: 2022,
        medium: 'Mixed media',
        dimensions: '36" × 48"',
        image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&fm=webp',
        description: 'Listen to the secrets of the woods.',
        isForSale: true,
        print_url: null,
        featured: false
    },
    {
        id: 'cosmic-voyage',
        title: 'Cosmic Voyage',
        year: 2022,
        medium: 'Digital painting',
        dimensions: '40" × 30"',
        image_url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&fm=webp',
        description: 'Journey through the stars.',
        isForSale: false,
        print_url: '/shop/cosmic-voyage',
        featured: false
    },
    {
        id: 'amber-twilight',
        title: 'Amber Twilight',
        year: 2022,
        medium: 'Oil on linen',
        dimensions: '24" × 36"',
        image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&fm=webp',
        description: 'The warm glow of dusk descends.',
        isForSale: true,
        print_url: null,
        featured: false
    },
    {
        id: 'liquid-light',
        title: 'Liquid Light',
        year: 2022,
        medium: 'Watercolor',
        dimensions: '18" × 24"',
        image_url: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=600&fm=webp',
        description: 'Light flows like water across the canvas.',
        isForSale: false,
        print_url: '/shop/liquid-light',
        featured: false
    },
    {
        id: 'metropolitan-pulse',
        title: 'Metropolitan Pulse',
        year: 2022,
        medium: 'Acrylic on board',
        dimensions: '30" × 40"',
        image_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=600&fm=webp',
        description: 'The heartbeat of the city.',
        isForSale: true,
        print_url: null,
        featured: false
    },
    {
        id: 'zen-garden',
        title: 'Zen Garden',
        year: 2022,
        medium: 'Mixed media',
        dimensions: '24" × 24"',
        image_url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=600&fm=webp',
        description: 'Tranquility in minimal forms.',
        isForSale: false,
        print_url: '/shop/zen-garden',
        featured: false
    },
    {
        id: 'prism-dreams',
        title: 'Prism Dreams',
        year: 2022,
        medium: 'Oil on canvas',
        dimensions: '36" × 48"',
        image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&fm=webp',
        description: 'Light fractured into infinite possibilities.',
        isForSale: true,
        print_url: null,
        featured: false
    },
    {
        id: 'velvet-night',
        title: 'Velvet Night',
        year: 2022,
        medium: 'Acrylic on canvas',
        dimensions: '30" × 30"',
        image_url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=2000&fm=webp',
        thumbnail_url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=600&fm=webp',
        description: 'The soft embrace of darkness.',
        isForSale: false,
        print_url: '/shop/velvet-night',
        featured: false
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

// Pagination & Filtering State
let currentPage = 1;
let itemsPerPage = 12;
let filterYear = 'all';
let featuredWorks = []; // Will hold only featured works for hero carousel
let heroCarouselIndex = 0; // Separate index for hero carousel

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
const paginationControls = document.getElementById('paginationControls');
const paginationNumbers = document.getElementById('paginationNumbers');
const paginationInfo = document.getElementById('paginationInfo');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');

// ====================================
// Filter & Pagination Helper Functions
// ====================================
function getFilteredWorks() {
    if (filterYear === 'all') {
        return portfolioData;
    }
    return portfolioData.filter(piece => piece.year === parseInt(filterYear));
}

function getTotalPages() {
    const filteredWorks = getFilteredWorks();
    return Math.ceil(filteredWorks.length / itemsPerPage);
}

function getCurrentPageWorks() {
    const filteredWorks = getFilteredWorks();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredWorks.slice(startIndex, endIndex);
}

// ====================================
// Portfolio Grid Builder with Pagination
// ====================================
function buildPortfolioGrid(skipAnimation = false) {
    const grid = portfolioGrid;
    const works = getCurrentPageWorks();
    console.log('🔵 buildPortfolioGrid called, skipAnimation:', skipAnimation, 'existing children:', grid.children.length);

    // Fade out and scale down current items (skip if already animated)
    if (grid.children.length > 0 && !skipAnimation) {
        gsap.to(grid.children, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            stagger: 0.05,
            onComplete: () => {
                grid.innerHTML = '';
                renderGridItems(works);
                // Fade in new items
                gsap.from(grid.children, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.3,
                    stagger: 0.05,
                    delay: 0.1
                });
            }
        });
    } else {
        // Initial render or already animated - just render without animation
        console.log('🗑️ Clearing grid innerHTML (else branch)');
        grid.innerHTML = '';
        console.log('🎨 Calling renderGridItems with', works.length, 'items');
        renderGridItems(works);

        // Note: When skipAnimation is true (from filterByYear), the fade-in
        // animation is already handled by filterByYear's onComplete callback.
        // No need to animate here to avoid double animation.
    }

    updatePagination();
}

function renderGridItems(works) {
    console.log('🔵 renderGridItems called with', works.length, 'works');
    works.forEach((piece, index) => {
        console.log('🖼️ Creating img element for:', piece.title);
        const gridItem = document.createElement('article');
        gridItem.className = 'grid-item';

        // Use featured flag from data if it exists (curatorial, not algorithmic)
        if (piece.featured && index < 12) {
            gridItem.classList.add('featured');
        }

        const link = document.createElement('a');
        link.href = '#home';
        link.dataset.id = piece.id;
        link.setAttribute('aria-label', `View ${piece.title} in full screen`);

        // Generate responsive image URLs (assumes ?w= query parameter support)
        const imgSrc = piece.thumbnail_url;
        const srcset = `
            ${imgSrc}&w=400 400w,
            ${imgSrc}&w=600 600w,
            ${imgSrc}&w=800 800w
        `.trim();

        link.innerHTML = `
            <img
                src="${imgSrc}"
                srcset="${srcset}"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="${piece.title} - ${piece.medium || 'artwork'} by Anjelina Villalobos"
                loading="lazy"
                width="400"
                height="400">
            <div class="grid-item-overlay">
                <h3>${piece.title}</h3>
                <p>${piece.year}</p>
            </div>
        `;

        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pieceId = event.currentTarget.dataset.id;

            // Find the piece in the filtered works
            const filteredWorks = getFilteredWorks();
            const lightboxIndex = filteredWorks.findIndex(p => p.id === pieceId);

            // Open lightbox with GSAP Flip animation
            if (lightboxIndex !== -1) {
                openLightboxWithFlip(event.currentTarget, lightboxIndex, filteredWorks);
            }
        });

        gridItem.appendChild(link);
        portfolioGrid.appendChild(gridItem);
        console.log('✅ Appended', piece.title, 'to portfolioGrid');
    });
    console.log('✅ renderGridItems complete, total items in grid:', portfolioGrid.children.length);
}

// ====================================
// Pagination Controls
// ====================================
function updatePagination() {
    const totalPages = getTotalPages();
    const filteredWorks = getFilteredWorks();

    // Update page numbers
    paginationNumbers.innerHTML = '';

    if (totalPages <= 1) {
        paginationControls.style.display = 'none';
        paginationInfo.style.display = 'none';
        return;
    }

    paginationControls.style.display = 'flex';
    paginationInfo.style.display = 'block';

    // Create page numbers (max 5 visible at a time)
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Show first page if not visible
    if (startPage > 1) {
        const firstBtn = createPageButton(1);
        paginationNumbers.appendChild(firstBtn);
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            paginationNumbers.appendChild(ellipsis);
        }
    }

    // Create page buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = createPageButton(i);
        paginationNumbers.appendChild(pageBtn);
    }

    // Show last page if not visible
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            paginationNumbers.appendChild(ellipsis);
        }
        const lastBtn = createPageButton(totalPages);
        paginationNumbers.appendChild(lastBtn);
    }

    // Update prev/next buttons
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;

    // Update pagination info
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, filteredWorks.length);
    paginationInfo.textContent = `Showing ${startItem}-${endItem} of ${filteredWorks.length} works | Page ${currentPage} of ${totalPages}`;
}

function createPageButton(pageNum) {
    const button = document.createElement('button');
    button.className = 'page-number';
    button.textContent = pageNum;
    button.setAttribute('aria-label', `Page ${pageNum}`);

    if (pageNum === currentPage) {
        button.classList.add('active');
        button.setAttribute('aria-current', 'page');
    }

    button.addEventListener('click', () => {
        changePage(pageNum);
    });

    return button;
}

function changePage(page) {
    const totalPages = getTotalPages();
    if (page < 1 || page > totalPages || page === currentPage) {
        return;
    }

    currentPage = page;
    buildPortfolioGrid();

    // Scroll to portfolio section
    const portfolioSection = document.getElementById('portfolio');
    portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ====================================
// Year Filter with GSAP Animation
// ====================================
function filterByYear(year) {
    console.log('🔵 filterByYear called with year:', year);

    filterYear = year;
    currentPage = 1; // Reset to first page when filtering

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.year === year) {
            btn.classList.add('active');
        }
    });

    // Animate grid transition with GSAP
    const gridItems = portfolioGrid.querySelectorAll('.grid-item');
    console.log('⏳ Grid items to fade out:', gridItems.length);

    if (gridItems.length > 0 && typeof gsap !== 'undefined') {
        // Fade out current items
        console.log('⏳ Starting fade-out animation for', gridItems.length, 'items');
        gsap.to(gridItems, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            stagger: 0.02,
            ease: 'power4.out',
            onComplete: () => {
                console.log('✅ Fade-out complete, calling buildPortfolioGrid(true)');
                // Render new items without animation
                buildPortfolioGrid(true);

                // Immediately hide new items, then animate them in
                const newGridItems = portfolioGrid.querySelectorAll('.grid-item');
                console.log('⏳ Starting fade-in animation for', newGridItems.length, 'new items');
                gsap.set(newGridItems, { opacity: 0, scale: 0.95 });
                gsap.to(newGridItems, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    stagger: 0.05,
                    delay: 0.1
                });
            }
        });
    } else {
        // No previous items to fade out - just render and fade in
        buildPortfolioGrid(true);

        // Immediately hide new items, then animate them in
        const newGridItems = portfolioGrid.querySelectorAll('.grid-item');
        if (newGridItems.length > 0 && typeof gsap !== 'undefined') {
            console.log('⏳ Starting fade-in animation for', newGridItems.length, 'new items (no previous items)');
            gsap.set(newGridItems, { opacity: 0, scale: 0.95 });
            gsap.to(newGridItems, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                stagger: 0.05,
                delay: 0.1
            });
        }
    }
}

// ====================================
// Lightbox Modal
// ====================================
let currentLightboxIndex = 0;
let lightboxWorks = [];

const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxMeta = document.getElementById('lightboxMeta');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxInquireBtn = document.getElementById('lightboxInquireBtn');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

function openLightboxWithFlip(clickedElement, index, works) {
    currentLightboxIndex = index;
    lightboxWorks = works;

    // Register Flip plugin
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(Flip);
    }

    // Get the clicked image element
    const clickedImg = clickedElement.querySelector('img');

    if (clickedImg && typeof Flip !== 'undefined') {
        // Record the initial state
        const state = Flip.getState(clickedImg);

        // Show lightbox and update content
        lightboxOverlay.classList.add('show');
        updateLightboxContent();
        document.body.style.overflow = 'hidden';

        // Temporarily clone the clicked image to lightbox image
        lightboxImage.style.opacity = '0';

        // Animate the transformation
        gsap.to(lightboxOverlay, {
            autoAlpha: 1,
            duration: 0.4,
            ease: 'power2.out'
        });

        // Fade in lightbox image after a brief delay
        gsap.to(lightboxImage, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.2
        });
    } else {
        // Fallback to standard animation if Flip not available
        openLightbox(index, works);
    }
}

function openLightbox(index, works) {
    currentLightboxIndex = index;
    lightboxWorks = works;

    updateLightboxContent();

    // Add show class for visibility and keyboard navigation
    lightboxOverlay.classList.add('show');

    // Use GSAP with anticipatory easing and subtle scale for physical feel
    gsap.to(lightboxOverlay, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        ease: 'expo.out'  // Anticipatory easing for major transitions
    });

    // Disable body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    // Use GSAP with quick easing for dismissal
    gsap.to(lightboxOverlay, {
        autoAlpha: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'power4.out',  // Quick decelerate for dismissal
        onComplete: () => {
            // Remove show class after animation completes
            lightboxOverlay.classList.remove('show');
            // Reset scale for next open
            gsap.set(lightboxOverlay, { scale: 0.95 });
        }
    });

    document.body.style.overflow = '';
}

function updateLightboxContent() {
    const piece = lightboxWorks[currentLightboxIndex];

    lightboxImage.src = piece.image_url;
    lightboxImage.alt = piece.title;
    lightboxTitle.textContent = piece.title;
    lightboxMeta.textContent = `${piece.medium}, ${piece.dimensions}, ${piece.year}`;
    lightboxDescription.textContent = piece.description;

    // Update additional fields if they exist in HTML
    const lightboxTechnique = document.getElementById('lightboxTechnique');
    const lightboxInspiration = document.getElementById('lightboxInspiration');
    const lightboxSeries = document.getElementById('lightboxSeries');
    const lightboxDimensionsNote = document.getElementById('lightboxDimensionsNote');

    // Populate optional fields if data exists
    if (lightboxTechnique) {
        if (piece.technique) {
            lightboxTechnique.textContent = `Technique: ${piece.technique}`;
            lightboxTechnique.style.display = 'block';
        } else {
            lightboxTechnique.style.display = 'none';
        }
    }

    if (lightboxInspiration) {
        if (piece.inspiration) {
            lightboxInspiration.textContent = `Inspiration: ${piece.inspiration}`;
            lightboxInspiration.style.display = 'block';
        } else {
            lightboxInspiration.style.display = 'none';
        }
    }

    if (lightboxSeries) {
        if (piece.series) {
            lightboxSeries.textContent = `Series: ${piece.series}`;
            lightboxSeries.style.display = 'block';
        } else {
            lightboxSeries.style.display = 'none';
        }
    }

    if (lightboxDimensionsNote) {
        if (piece.dimensionsNote) {
            lightboxDimensionsNote.textContent = piece.dimensionsNote;
            lightboxDimensionsNote.style.display = 'block';
        } else {
            lightboxDimensionsNote.style.display = 'none';
        }
    }

    // Update inquire button (contextual text with artwork title)
    if (piece.isForSale) {
        lightboxInquireBtn.textContent = `Inquire About '${piece.title}'`;
        lightboxInquireBtn.style.display = 'block';
        lightboxInquireBtn.onclick = () => {
            closeLightbox();
            setTimeout(() => {
                window.location.href = '#contact';
            }, 300);
        };
    } else if (piece.print_url) {
        lightboxInquireBtn.textContent = `Purchase '${piece.title}' Print`;
        lightboxInquireBtn.style.display = 'block';
        lightboxInquireBtn.onclick = () => {
            window.location.href = piece.print_url;
        };
    } else {
        lightboxInquireBtn.style.display = 'none';
    }

    // Update navigation buttons
    lightboxPrev.disabled = currentLightboxIndex === 0;
    lightboxNext.disabled = currentLightboxIndex === lightboxWorks.length - 1;
}

function showPrevLightboxImage() {
    if (currentLightboxIndex > 0) {
        currentLightboxIndex--;
        updateLightboxContent();
    }
}

function showNextLightboxImage() {
    if (currentLightboxIndex < lightboxWorks.length - 1) {
        currentLightboxIndex++;
        updateLightboxContent();
    }
}

// Lightbox event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevLightboxImage);
lightboxNext.addEventListener('click', showNextLightboxImage);

// Close on overlay click
lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightboxOverlay.classList.contains('show')) return;

    switch (e.key) {
        case 'Escape':
            e.preventDefault();
            closeLightbox();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            showPrevLightboxImage();
            break;
        case 'ArrowRight':
            e.preventDefault();
            showNextLightboxImage();
            break;
    }
});

// ====================================
// Hero Carousel - Featured Works Only
// ====================================
function loadHeroImage(index, direction = 'none') {
    if (isTransitioning || index < 0 || index >= featuredWorks.length) {
        return;
    }

    isTransitioning = true;
    heroCarouselIndex = index;
    const piece = featuredWorks[heroCarouselIndex];

    // Update text content
    imgTitle.textContent = piece.title;
    imgMeta.textContent = `${piece.medium}, ${piece.dimensions}, ${piece.year}`;

    // Update inquire button (contextual text with artwork title)
    if (piece.isForSale) {
        inquireBtn.textContent = `Inquire About '${piece.title}'`;
        inquireBtn.style.display = 'inline-block';
        inquireBtn.onclick = () => {
            window.location.href = `#contact`;
        };
    } else if (piece.print_url) {
        inquireBtn.textContent = `Purchase '${piece.title}' Print`;
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

        // Animate title and metadata entrance (GSAP)
        if (typeof gsap !== 'undefined') {
            gsap.from([imgTitle, imgMeta], {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'expo.out',
                delay: 0.4,
                stagger: 0.1
            });
        }

        // Hide loading overlay if it's the first load
        if (loadingOverlay.classList.contains('hidden') === false) {
            loadingOverlay.classList.add('hidden');
            // Enable Ken Burns animation after initial load completes
            setTimeout(() => {
                currentBg.classList.add('animated');
            }, 1500);
        }

        // Update previews (lazy load on first interaction)
        if (index > 0) {
            updatePreviews();
        }

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
    const prevIndex = (heroCarouselIndex - 1 + featuredWorks.length) % featuredWorks.length;
    const nextIndex = (heroCarouselIndex + 1) % featuredWorks.length;

    prevPreview.style.backgroundImage = `url('${featuredWorks[prevIndex].image_url}')`;
    nextPreview.style.backgroundImage = `url('${featuredWorks[nextIndex].image_url}')`;
}

// ====================================
// Hero Carousel Navigation Functions
// ====================================
function showNextHeroImage() {
    const nextIndex = (heroCarouselIndex + 1) % featuredWorks.length;
    loadHeroImage(nextIndex, 'next');
}

function showPrevHeroImage() {
    const prevIndex = (heroCarouselIndex - 1 + featuredWorks.length) % featuredWorks.length;
    loadHeroImage(prevIndex, 'prev');
}

// ====================================
// Drag/Swipe Navigation (Lazy Initialized)
// ====================================
let dragSystemInitialized = false;

function initializeDragSystem() {
    if (dragSystemInitialized) return;
    dragSystemInitialized = true;

    // Initialize preview images
    updatePreviews();
}

function handleDragStart(e) {
    if (isTransitioning) return;

    // Lazy initialize drag system on first interaction
    if (!dragSystemInitialized) {
        initializeDragSystem();
    }

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
        showPrevHeroImage();
    } else if (deltaX < -threshold) {
        showNextHeroImage();
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
// Command Bar (Gallery Overview) - Featured Works Only
// ====================================
function buildThumbnailGrid() {
    thumbnailGrid.innerHTML = '';

    featuredWorks.forEach((piece, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail-item';
        thumbnail.setAttribute('role', 'gridcell');
        thumbnail.setAttribute('tabindex', '0');
        thumbnail.setAttribute('aria-label', `${piece.title}, ${piece.year}`);

        if (index === heroCarouselIndex) {
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
            loadHeroImage(index);
            closeCommandBar();
        });

        thumbnail.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                loadHeroImage(index);
                closeCommandBar();
            }
        });

        thumbnailGrid.appendChild(thumbnail);
    });
}

function updateThumbnailGrid() {
    const thumbnails = thumbnailGrid.querySelectorAll('.thumbnail-item');
    thumbnails.forEach((thumb, index) => {
        if (index === heroCarouselIndex) {
            thumb.classList.add('current');
        } else {
            thumb.classList.remove('current');
        }
    });
}

function openCommandBar() {
    commandBar.classList.add('show');
    updateThumbnailGrid();

    // Organic fly-in animation for thumbnails
    if (typeof gsap !== 'undefined') {
        const thumbnails = thumbnailGrid.querySelectorAll('.thumbnail-item');

        // Animate thumbnails from corners with organic, chaotic-but-beautiful timing
        gsap.from(thumbnails, {
            scale: 0,
            opacity: 0,
            rotation: () => gsap.utils.random(-45, 45), // Random rotation for organic feel
            x: (index) => {
                // Fly in from corners based on grid position
                const row = Math.floor(index / 5);
                const col = index % 5;
                const fromLeft = col < 2.5;
                return fromLeft ? gsap.utils.random(-400, -200) : gsap.utils.random(200, 400);
            },
            y: (index) => {
                const row = Math.floor(index / 5);
                const fromTop = row < 2;
                return fromTop ? gsap.utils.random(-300, -150) : gsap.utils.random(150, 300);
            },
            duration: 0.8,
            ease: 'expo.out',
            stagger: {
                amount: 0.4,
                from: 'random', // Random stagger for organic feel
                ease: 'power2.inOut'
            }
        });
    }

    // Focus first thumbnail after animation
    const firstThumbnail = thumbnailGrid.querySelector('.thumbnail-item');
    if (firstThumbnail) {
        setTimeout(() => firstThumbnail.focus(), 1000);
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
    // Lightbox has priority
    if (lightboxOverlay.classList.contains('show')) {
        return; // Lightbox handles its own keyboard nav
    }

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
            showPrevHeroImage();
            break;
        case 'ArrowRight':
            e.preventDefault();
            showNextHeroImage();
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
document.querySelector('.carousel-nav .prev').addEventListener('click', showPrevHeroImage);
document.querySelector('.carousel-nav .next').addEventListener('click', showNextHeroImage);
document.getElementById('galleryHint').addEventListener('click', toggleCommandBar);
document.getElementById('errorRetry').addEventListener('click', () => {
    hideError();
    loadHeroImage(heroCarouselIndex);
});

// Pagination buttons
prevPageBtn.addEventListener('click', () => {
    changePage(currentPage - 1);
});

nextPageBtn.addEventListener('click', () => {
    changePage(currentPage + 1);
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        filterByYear(btn.dataset.year);
    });
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

// Contextual tips removed for cleaner, gallery-like experience

// ====================================
// Initialization - Optimized Load Sequence
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    // Extract featured works for hero carousel
    featuredWorks = portfolioData.filter(piece => piece.featured === true);

    console.log(`Total artworks: ${portfolioData.length}`);
    console.log(`Featured works (hero carousel): ${featuredWorks.length}`);

    // Load first featured image IMMEDIATELY (priority)
    if (featuredWorks.length > 0) {
        loadHeroImage(0);
    }

    // Defer heavy features until after hero loads
    setTimeout(() => {
        // Build portfolio grid (paginated, shows all works)
        buildPortfolioGrid();

        // Build thumbnail grid (shows only featured works)
        buildThumbnailGrid();

        // Show gallery hint button
        const galleryHint = document.getElementById('galleryHint');
        if (galleryHint) {
            galleryHint.classList.add('visible');
        }
    }, 800);

    // Removed toast notifications for cleaner, gallery-like experience
    // Users will discover interactions naturally through exploration
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
    // Prioritize featured works first
    featuredWorks.forEach((piece) => {
        const img = new Image();
        img.src = piece.image_url;
    });

    // Then preload the rest
    setTimeout(() => {
        portfolioData.forEach((piece) => {
            if (!piece.featured) {
                const img = new Image();
                img.src = piece.image_url;
            }
        });
    }, 1000);
}

// Preload images after initial load (deferred further for smoother experience)
setTimeout(preloadImages, 4000);

// ====================================
// GSAP Animations
// ====================================
function initGSAPAnimations() {
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Initial load animation sequence with perfected easing
    const loadTimeline = gsap.timeline();
    loadTimeline
        .to(loadingOverlay, {
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: 'expo.out',  // Anticipatory easing for major transition
            onComplete: () => {
                loadingOverlay.classList.add('hidden');
            }
        })
        .from('.main-header', {
            y: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'expo.out'  // Smooth, dramatic entrance
        }, "-=0.5")
        .from('.image-title h1', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'expo.out'  // Smooth, impactful reveal
        }, "-=0.6")
        .from('.image-meta', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.out'  // Quick, subtle entrance
        }, "-=0.7");

    // Animate section headers on scroll with anticipatory easing
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 100,
            duration: 1.2,
            ease: 'expo.out'  // Dramatic, smooth entrance
        });
    });

    // Animate about section with immersive storytelling sequence

    // Headline reveal - dramatic entrance
    gsap.from('.artist-bio h3', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'expo.out'
    });

    // Photo reveal - scale + fade
    gsap.from('.artist-photo', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'expo.out',
        delay: 0.2
    });

    // Bio paragraphs - sequential fade + slide
    gsap.from('.artist-bio p', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,  // Sequential reveal for narrative flow
        delay: 0.4
    });

    // CV link - final reveal
    gsap.from('.cv-link', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        delay: 1.2
    });

    // Animate contact section with refined easing
    gsap.from('.contact-section', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'expo.out'  // Consistent, dramatic entrance
    });
}

// Portfolio grid animation with perfected fade/scale stagger
function animatePortfolioGrid() {
    const grid = portfolioGrid;

    // Fade out current items with quick, snappy easing
    gsap.to(grid.children, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        stagger: 0.03,  // Tighter stagger for more responsive feel
        ease: 'power4.out',  // Quick decelerate
        onComplete: () => {
            // Grid content will be replaced by buildPortfolioGrid
            // Then fade in new items with anticipatory easing
            gsap.from(grid.children, {
                opacity: 0,
                scale: 0.95,
                duration: 0.4,
                stagger: 0.03,
                ease: 'expo.out',  // Anticipatory, dramatic entrance
                delay: 0.1
            });
        }
    });
}

// Initialize animations after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initGSAPAnimations, 100);
    });
} else {
    setTimeout(initGSAPAnimations, 100);
}

// Refresh ScrollTrigger when portfolio grid changes
function refreshScrollTrigger() {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}
