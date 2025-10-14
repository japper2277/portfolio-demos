// grid.js - Portfolio Grid Module
// Handles portfolio grid rendering, filtering, and pagination

import { debounce } from './utils_anjie.js';

export class Grid {
    constructor(portfolioData) {
        this.portfolioData = portfolioData;
        this.filteredData = [...portfolioData];
        this.currentFilter = 'all';
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.gridContainer = null;
        this.filterBar = null;
        this.filterButtons = null;
        this.searchInput = null;
        this.paginationContainer = null;
    }

    init() {
        this.cacheElements();
        // If filter buttons are missing, generate them from data
        if ((!this.filterButtons || this.filterButtons.length === 0) && this.filterBar) {
            this.renderFilterButtonsFromData();
            this.filterButtons = this.filterBar.querySelectorAll('.filter-btn');
        }
        this.renderGrid();
        this.attachEventListeners();
        this.enableKeyboardGridNavigation();
        this.updateFilterButtons();
    }

    cacheElements() {
        this.gridContainer = document.getElementById('portfolioGrid');
        this.filterBar = document.getElementById('filterBar');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.searchInput = document.getElementById('searchInput');
        this.paginationContainer = document.getElementById('paginationNumbers');
    }

    renderFilterButtonsFromData() {
        if (!this.filterBar) return;

        const years = Array.from(new Set(this.portfolioData.map(w => w.year))).sort((a, b) => b - a);
        const fragment = document.createDocumentFragment();

        const allBtn = document.createElement('button');
        allBtn.className = 'filter-btn active';
        allBtn.dataset.year = 'all';
        allBtn.setAttribute('aria-pressed', 'true');
        allBtn.textContent = 'All';
        fragment.appendChild(allBtn);

        years.forEach(year => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.year = String(year);
            btn.setAttribute('aria-pressed', 'false');
            btn.textContent = String(year);
            fragment.appendChild(btn);
        });

        this.filterBar.innerHTML = '';
        this.filterBar.appendChild(fragment);
    }

    attachEventListeners() {
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.year;
                console.log('Filter clicked:', filter);
                this.filterPortfolio(filter);
            });
        });

        // Search input with debouncing
        if (this.searchInput) {
            const debouncedSearch = debounce((value) => {
                this.searchPortfolio(value);
            }, 300);

            this.searchInput.addEventListener('input', (e) => {
                debouncedSearch(e.target.value);
            });
        }
    }

    enableKeyboardGridNavigation() {
        if (!this.gridContainer) return;

        // Delegate key handling from the grid container
        this.gridContainer.addEventListener('keydown', (e) => {
            const target = e.target;
            if (!(target instanceof HTMLElement)) return;
            if (target.tagName.toLowerCase() !== 'a') return;

            const items = Array.from(this.gridContainer.querySelectorAll('a'));
            const index = items.indexOf(target);
            if (index === -1) return;

            // Determine current columns from computed grid styles
            const columns = this.getComputedGridColumns();

            let nextIndex = null;
            switch (e.key) {
                case 'ArrowRight':
                    nextIndex = Math.min(index + 1, items.length - 1);
                    break;
                case 'ArrowLeft':
                    nextIndex = Math.max(index - 1, 0);
                    break;
                case 'ArrowDown':
                    nextIndex = Math.min(index + columns, items.length - 1);
                    break;
                case 'ArrowUp':
                    nextIndex = Math.max(index - columns, 0);
                    break;
                default:
                    return; // Ignore other keys
            }

            if (nextIndex !== null && nextIndex !== index) {
                e.preventDefault();
                items[nextIndex].focus();
            }
        });
    }

    getComputedGridColumns() {
        // Fallback to 3 columns if unable to compute
        let columns = 3;
        try {
            const styles = window.getComputedStyle(this.gridContainer);
            const template = styles.getPropertyValue('grid-template-columns');
            if (template) {
                // Count columns by splitting on space-separated track definitions
                const count = template.split(' ').filter(Boolean).length;
                if (count > 0) columns = count;
            }
        } catch (err) {
            // Ignore and use fallback
        }
        return columns;
    }

    filterPortfolio(filter) {
        this.currentFilter = filter;
        this.currentPage = 1;

        if (filter === 'all') {
            this.filteredData = [...this.portfolioData];
        } else {
            this.filteredData = this.portfolioData.filter(work =>
                work.year.toString() === filter.toString()
            );
        }

        this.renderGridWithAnimation();
        this.updateFilterButtons();
        this.announceFilterChange(filter);
    }

    searchPortfolio(searchTerm) {
        const term = searchTerm.toLowerCase().trim();

        if (!term) {
            this.filteredData = this.currentFilter === 'all'
                ? [...this.portfolioData]
                : this.portfolioData.filter(work =>
                    work.year.toString() === this.currentFilter.toString()
                );
        } else {
            const baseData = this.currentFilter === 'all'
                ? this.portfolioData
                : this.portfolioData.filter(work =>
                    work.year.toString() === this.currentFilter.toString()
                );

            this.filteredData = baseData.filter(work =>
                work.title.toLowerCase().includes(term) ||
                work.medium.toLowerCase().includes(term) ||
                work.year.toString().includes(term) ||
                (work.description && work.description.toLowerCase().includes(term))
            );
        }

        this.currentPage = 1;
        this.renderGrid();
        this.announceSearchResults(this.filteredData.length);
    }

    renderGrid() {
        if (!this.gridContainer) {
            console.error('Grid: portfolioGrid element not found');
            return;
        }

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedData = this.filteredData.slice(startIndex, endIndex);

        console.log('Grid: Rendering', paginatedData.length, 'items');

        // Clear grid
        this.gridContainer.innerHTML = '';

        // Render portfolio items
        paginatedData.forEach((work, index) => {
            const item = this.createGridItem(work, startIndex + index);
            this.gridContainer.appendChild(item);
        });

        // Render pagination
        this.renderPagination();

        // Trigger animations if available
        if (window.AnimationController) {
            window.AnimationController.refreshAnimations();
        }
    }

    renderGridWithAnimation() {
        if (!this.gridContainer) {
            console.error('Grid: portfolioGrid element not found');
            return;
        }

        // Kill any existing animations on the grid to prevent race conditions
        if (typeof gsap !== 'undefined') {
            gsap.killTweensOf(this.gridContainer.children);
        }

        const oldItems = Array.from(this.gridContainer.children);

        if (oldItems.length === 0) {
            // First render, no animation needed
            this.renderGrid();
            return;
        }

        // Check if gsap is available
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded, falling back to instant render');
            this.renderGrid();
            return;
        }

        // Animate old items out
        gsap.to(oldItems, {
            opacity: 0,
            scale: 0.9,
            y: 20,
            duration: 0.3,
            stagger: 0.03,
            ease: 'power2.in',
            onComplete: () => {
                // Prepare new data
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                const paginatedData = this.filteredData.slice(startIndex, endIndex);

                // Clear and rebuild grid
                this.gridContainer.innerHTML = '';
                paginatedData.forEach((work, index) => {
                    const item = this.createGridItem(work, startIndex + index);
                    this.gridContainer.appendChild(item);
                });

                // Render pagination
                this.renderPagination();

                // Animate new items in
                const newItems = Array.from(this.gridContainer.children);
                gsap.fromTo(newItems,
                    {
                        opacity: 0,
                        scale: 0.9,
                        y: 20
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: 'power2.out'
                    }
                );

                // Scroll to portfolio section smoothly
                const portfolioSection = document.getElementById('portfolio');
                if (portfolioSection && this.currentPage === 1) {
                    portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    createGridItem(work, index) {
        const gridItem = document.createElement('article');
        gridItem.className = 'grid-item';

        const link = document.createElement('a');
        link.href = '#home';
        link.dataset.id = work.id;
        link.dataset.index = index;
        link.setAttribute('aria-label', `View ${work.title} in full screen`);

        const imgSrc = work.thumbnail_url;
        const srcset = `
            ${imgSrc}&w=400 400w,
            ${imgSrc}&w=600 600w,
            ${imgSrc}&w=800 800w
        `.trim();

        // Create availability badge
        const availability = work.availability || (work.isForSale ? 'Available' : 'Sold');
        const badgeClass = this.getAvailabilityBadgeClass(availability);
        const badgeHTML = availability ? `<div class="availability-badge ${badgeClass}">${availability}</div>` : '';

        link.innerHTML = `
            <img
                src="${imgSrc}"
                srcset="${srcset}"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="${work.title} - ${work.medium || 'artwork'} by Anjelina Villalobos"
                loading="lazy"
                width="400"
                height="400">
            ${badgeHTML}
            <div class="grid-item-overlay">
                <h3>${work.title}</h3>
                <p>${work.year}</p>
            </div>
        `;

        // Click handler to open lightbox
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all grid items
            document.querySelectorAll('.grid-item').forEach(item => item.classList.remove('active'));

            // Add active class to clicked item
            gridItem.classList.add('active');

            if (window.LightboxController) {
                // Pass the filtered data so lightbox navigates within current filter
                window.LightboxController.open(work, index, this.filteredData);
            }
        });

        gridItem.appendChild(link);
        return gridItem;
    }

    getAvailabilityBadgeClass(availability) {
        const lowerAvail = (availability || '').toLowerCase();
        if (lowerAvail === 'available') return 'badge-available';
        if (lowerAvail === 'sold') return 'badge-sold';
        if (lowerAvail === 'prints available') return 'badge-prints';
        if (lowerAvail === 'private collection') return 'badge-private';
        return '';
    }

    renderPagination() {
        if (!this.paginationContainer) return;

        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);

        if (totalPages <= 1) {
            this.paginationContainer.innerHTML = '';
            return;
        }

        this.paginationContainer.innerHTML = '';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn';
        prevBtn.innerHTML = '&larr; Previous';
        prevBtn.disabled = this.currentPage === 1;
        prevBtn.addEventListener('click', () => this.goToPage(this.currentPage - 1));
        this.paginationContainer.appendChild(prevBtn);

        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            const firstBtn = document.createElement('button');
            firstBtn.className = 'pagination-btn';
            firstBtn.textContent = '1';
            firstBtn.addEventListener('click', () => this.goToPage(1));
            this.paginationContainer.appendChild(firstBtn);

            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                ellipsis.className = 'pagination-ellipsis';
                this.paginationContainer.appendChild(ellipsis);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `pagination-btn ${i === this.currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => this.goToPage(i));
            this.paginationContainer.appendChild(pageBtn);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                ellipsis.className = 'pagination-ellipsis';
                this.paginationContainer.appendChild(ellipsis);
            }

            const lastBtn = document.createElement('button');
            lastBtn.className = 'pagination-btn';
            lastBtn.textContent = totalPages;
            lastBtn.addEventListener('click', () => this.goToPage(totalPages));
            this.paginationContainer.appendChild(lastBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn';
        nextBtn.innerHTML = 'Next &rarr;';
        nextBtn.disabled = this.currentPage === totalPages;
        nextBtn.addEventListener('click', () => this.goToPage(this.currentPage + 1));
        this.paginationContainer.appendChild(nextBtn);
    }

    goToPage(page) {
        const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        if (page < 1 || page > totalPages) return;

        this.currentPage = page;
        this.renderGridWithAnimation();

        // Scroll to top of grid
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    updateFilterButtons() {
        this.filterButtons.forEach(btn => {
            if (btn.dataset.year === this.currentFilter) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    }

    announceFilterChange(filter) {
        const announcement = filter === 'all'
            ? `Showing all ${this.filteredData.length} artworks`
            : `Filtered to ${filter}. Showing ${this.filteredData.length} artworks`;

        if (window.announceToScreenReader) {
            window.announceToScreenReader(announcement);
        }
    }

    announceSearchResults(count) {
        const announcement = count === 0
            ? 'No artworks found matching your search'
            : `Found ${count} artwork${count === 1 ? '' : 's'}`;

        if (window.announceToScreenReader) {
            window.announceToScreenReader(announcement);
        }
    }

    getFilteredData() {
        return this.filteredData;
    }

    refresh() {
        this.renderGrid();
    }
}
