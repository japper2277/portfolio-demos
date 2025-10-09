// gallery.js - Gallery Command Bar Module
// Handles keyboard shortcut 'G' to open gallery command palette

export class Gallery {
    constructor(portfolioData, lightboxController) {
        this.portfolioData = portfolioData;
        this.lightboxController = lightboxController;
        this.isOpen = false;
        this.filteredResults = [];
        this.selectedIndex = 0;

        // DOM elements
        this.commandBar = null;
        this.searchInput = null;
        this.resultsList = null;
    }

    init() {
        this.createCommandBar();
        this.attachEventListeners();
    }

    createCommandBar() {
        // Create command bar element
        this.commandBar = document.createElement('div');
        this.commandBar.id = 'galleryCommandBar';
        this.commandBar.className = 'gallery-command-bar';
        this.commandBar.innerHTML = `
            <div class="command-bar-content">
                <div class="command-bar-header">
                    <input
                        type="text"
                        id="gallerySearch"
                        placeholder="Search artworks... (Type to filter)"
                        autocomplete="off"
                        aria-label="Search artworks"
                    >
                    <button class="command-bar-close" aria-label="Close gallery search">×</button>
                </div>
                <div class="command-bar-results" id="galleryResults"></div>
                <div class="command-bar-footer">
                    <span>↑↓ Navigate</span>
                    <span>↵ Select</span>
                    <span>ESC Close</span>
                </div>
            </div>
        `;

        document.body.appendChild(this.commandBar);

        this.searchInput = document.getElementById('gallerySearch');
        this.resultsList = document.getElementById('galleryResults');
    }

    attachEventListeners() {
        // Global keyboard shortcut
        document.addEventListener('keydown', (e) => {
            // 'G' key to open (but not when typing in inputs)
            if (e.key === 'g' && !this.isOpen &&
                !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                this.open();
            }

            // ESC to close
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Search input
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.search(e.target.value);
            });

            this.searchInput.addEventListener('keydown', (e) => {
                this.handleKeyNavigation(e);
            });
        }

        // Close button
        const closeBtn = this.commandBar.querySelector('.command-bar-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Click outside to close
        this.commandBar.addEventListener('click', (e) => {
            if (e.target === this.commandBar) {
                this.close();
            }
        });
    }

    open() {
        this.isOpen = true;
        this.filteredResults = [...this.portfolioData];
        this.selectedIndex = 0;

        this.commandBar.classList.add('active');
        this.renderResults();

        // Focus search input
        setTimeout(() => {
            if (this.searchInput) {
                this.searchInput.focus();
            }
        }, 100);

        if (window.announceToScreenReader) {
            window.announceToScreenReader('Gallery search opened. Type to filter artworks.');
        }
    }

    close() {
        this.isOpen = false;
        this.commandBar.classList.remove('active');

        // Clear search
        if (this.searchInput) {
            this.searchInput.value = '';
        }

        if (window.announceToScreenReader) {
            window.announceToScreenReader('Gallery search closed');
        }
    }

    search(query) {
        const term = query.toLowerCase().trim();

        if (!term) {
            this.filteredResults = [...this.portfolioData];
        } else {
            this.filteredResults = this.portfolioData.filter(work =>
                work.title.toLowerCase().includes(term) ||
                work.medium.toLowerCase().includes(term) ||
                work.year.toString().includes(term) ||
                (work.description && work.description.toLowerCase().includes(term))
            );
        }

        this.selectedIndex = 0;
        this.renderResults();

        if (window.announceToScreenReader) {
            window.announceToScreenReader(`${this.filteredResults.length} results found`);
        }
    }

    renderResults() {
        if (!this.resultsList) return;

        if (this.filteredResults.length === 0) {
            this.resultsList.innerHTML = '<div class="no-results">No artworks found</div>';
            return;
        }

        // Limit to first 50 results for performance
        const maxResults = 50;
        const displayResults = this.filteredResults.slice(0, maxResults);

        this.resultsList.innerHTML = displayResults.map((work, index) => `
            <div class="gallery-result-item ${index === this.selectedIndex ? 'selected' : ''}"
                 data-index="${index}">
                <img src="${work.thumbnail_url}" alt="${work.title}" loading="lazy">
                <div class="result-info">
                    <div class="result-title">${work.title}</div>
                    <div class="result-meta">${work.year} • ${work.medium}</div>
                </div>
            </div>
        `).join('');

        // Add click handlers to results
        const resultItems = this.resultsList.querySelectorAll('.gallery-result-item');
        resultItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.selectResult(index);
            });
        });

        // Scroll selected item into view
        this.scrollToSelected();
    }

    handleKeyNavigation(e) {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(
                    this.selectedIndex + 1,
                    this.filteredResults.length - 1
                );
                this.renderResults();
                break;

            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
                this.renderResults();
                break;

            case 'Enter':
                e.preventDefault();
                this.selectResult(this.selectedIndex);
                break;
        }
    }

    selectResult(index) {
        const work = this.filteredResults[index];
        if (!work) return;

        // Find the original index in the full portfolio data
        const originalIndex = this.portfolioData.findIndex(w =>
            w.image_url === work.image_url && w.title === work.title
        );

        // Close command bar
        this.close();

        // Open in lightbox
        if (this.lightboxController) {
            setTimeout(() => {
                this.lightboxController.open(work, originalIndex);
            }, 200);
        }
    }

    scrollToSelected() {
        const selectedItem = this.resultsList.querySelector('.gallery-result-item.selected');
        if (selectedItem) {
            selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }

    destroy() {
        if (this.commandBar) {
            this.commandBar.remove();
        }
    }
}
