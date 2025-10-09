// zoom-viewer.js - Zoom and Pan Module for Lightbox
// Handles zoom functionality for detailed artwork viewing

export class ZoomViewer {
    constructor() {
        this.isZoomed = false;
        this.scale = 1;
        this.minScale = 1;
        this.maxScale = 3;
        this.translateX = 0;
        this.translateY = 0;
        this.startX = 0;
        this.startY = 0;
        this.isDragging = false;
        this.zoomContainer = null;
        this.zoomImage = null;
        this.zoomHint = null;
        this.zoomControls = null;
        this.initialTouchDistance = 0;
        this.initialScale = 1;
    }

    init(lightboxImage, lightboxContainer) {
        this.zoomImage = lightboxImage;
        this.zoomContainer = lightboxContainer;
        
        if (!this.zoomImage || !this.zoomContainer) return;

        this.createZoomElements();
        this.attachEventListeners();
        this.setupZoomHint();
    }

    createZoomElements() {
        // Create zoom hint overlay
        this.zoomHint = document.createElement('div');
        this.zoomHint.className = 'zoom-hint';
        this.zoomHint.innerHTML = `
            <div class="zoom-hint-content">
                <span class="zoom-hint-icon">🔍</span>
                <span class="zoom-hint-text">Click to zoom</span>
            </div>
        `;
        this.zoomContainer.appendChild(this.zoomHint);

        // Create zoom controls
        this.zoomControls = document.createElement('div');
        this.zoomControls.className = 'zoom-controls';
        this.zoomControls.innerHTML = `
            <button class="zoom-reset" aria-label="Reset zoom">Reset</button>
            <button class="zoom-close" aria-label="Exit zoom">×</button>
        `;
        this.zoomContainer.appendChild(this.zoomControls);

        // Add zoom styles
        this.addZoomStyles();
    }

    addZoomStyles() {
        if (document.getElementById('zoom-styles')) return;

        const style = document.createElement('style');
        style.id = 'zoom-styles';
        style.textContent = `
            .zoom-hint {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 4px;
                z-index: 10;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }

            .zoom-hint.show {
                opacity: 1;
            }

            .zoom-hint-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
                font-weight: 600;
            }

            .zoom-controls {
                position: absolute;
                top: 1rem;
                right: 1rem;
                display: flex;
                gap: 0.5rem;
                z-index: 10;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }

            .zoom-controls.show {
                opacity: 1;
                pointer-events: auto;
            }

            .zoom-controls button {
                background: rgba(0, 0, 0, 0.8);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: background 0.3s ease;
            }

            .zoom-controls button:hover {
                background: rgba(0, 0, 0, 0.9);
            }

            .lightbox-image-container.zoomed {
                cursor: grab;
                overflow: hidden;
            }

            .lightbox-image-container.zoomed:active {
                cursor: grabbing;
            }

            .lightbox-image-container.zoomed img {
                transform-origin: center;
                transition: transform 0.3s ease;
            }

            @media (prefers-reduced-motion: reduce) {
                .lightbox-image-container.zoomed img {
                    transition: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    attachEventListeners() {
        if (!this.zoomImage) return;

        // Click to zoom
        this.zoomImage.addEventListener('click', (e) => {
            if (!this.isZoomed) {
                e.preventDefault();
                this.enterZoom();
            }
        });

        // Double click to toggle
        this.zoomImage.addEventListener('dblclick', (e) => {
            e.preventDefault();
            if (this.isZoomed) {
                this.exitZoom();
            } else {
                this.enterZoom();
            }
        });

        // Mouse wheel zoom
        this.zoomImage.addEventListener('wheel', (e) => {
            if (!this.isZoomed) return;
            e.preventDefault();
            
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.scale + delta));
            this.updateTransform();
        });

        // Mouse drag
        this.zoomImage.addEventListener('mousedown', (e) => {
            if (!this.isZoomed) return;
            e.preventDefault();
            this.isDragging = true;
            this.startX = e.clientX - this.translateX;
            this.startY = e.clientY - this.translateY;
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging || !this.isZoomed) return;
            e.preventDefault();
            this.translateX = e.clientX - this.startX;
            this.translateY = e.clientY - this.startY;
            this.updateTransform();
        });

        document.addEventListener('mouseup', () => {
            this.isDragging = false;
        });

        // Touch events for mobile
        this.zoomImage.addEventListener('touchstart', (e) => {
            if (!this.isZoomed) return;
            e.preventDefault();
            
            if (e.touches.length === 1) {
                // Single touch - drag
                this.isDragging = true;
                this.startX = e.touches[0].clientX - this.translateX;
                this.startY = e.touches[0].clientY - this.translateY;
            } else if (e.touches.length === 2) {
                // Two finger pinch
                this.isDragging = false;
                this.initialTouchDistance = this.getTouchDistance(e.touches);
                this.initialScale = this.scale;
            }
        });

        this.zoomImage.addEventListener('touchmove', (e) => {
            if (!this.isZoomed) return;
            e.preventDefault();
            
            if (e.touches.length === 1 && this.isDragging) {
                // Single touch drag
                this.translateX = e.touches[0].clientX - this.startX;
                this.translateY = e.touches[0].clientY - this.startY;
                this.updateTransform();
            } else if (e.touches.length === 2) {
                // Two finger pinch zoom
                const currentDistance = this.getTouchDistance(e.touches);
                const scaleChange = currentDistance / this.initialTouchDistance;
                this.scale = Math.max(this.minScale, Math.min(this.maxScale, this.initialScale * scaleChange));
                this.updateTransform();
            }
        });

        this.zoomImage.addEventListener('touchend', () => {
            this.isDragging = false;
        });

        // Control buttons
        if (this.zoomControls) {
            const resetBtn = this.zoomControls.querySelector('.zoom-reset');
            const closeBtn = this.zoomControls.querySelector('.zoom-close');
            
            if (resetBtn) {
                resetBtn.addEventListener('click', () => this.resetZoom());
            }
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.exitZoom());
            }
        }

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.isZoomed) return;
            
            switch (e.key) {
                case 'Escape':
                    this.exitZoom();
                    break;
                case '+':
                case '=':
                    this.scale = Math.min(this.maxScale, this.scale + 0.2);
                    this.updateTransform();
                    break;
                case '-':
                    this.scale = Math.max(this.minScale, this.scale - 0.2);
                    this.updateTransform();
                    break;
                case '0':
                    this.resetZoom();
                    break;
            }
        });
    }

    setupZoomHint() {
        if (!this.zoomHint) return;

        // Show hint after a delay
        setTimeout(() => {
            if (!this.isZoomed) {
                this.zoomHint.classList.add('show');
                setTimeout(() => {
                    this.zoomHint.classList.remove('show');
                }, 3000);
            }
        }, 1000);
    }

    enterZoom() {
        if (this.isZoomed) return;

        this.isZoomed = true;
        this.scale = 1.5; // Start at 1.5x zoom
        this.translateX = 0;
        this.translateY = 0;

        this.zoomImage.parentElement.classList.add('zoomed');
        this.zoomControls.classList.add('show');
        this.zoomHint.classList.remove('show');

        this.updateTransform();

        // Announce to screen readers
        if (window.announceToScreenReader) {
            window.announceToScreenReader('Zoom activated. Use mouse wheel to zoom, drag to pan, or press Escape to exit.');
        }
    }

    exitZoom() {
        if (!this.isZoomed) return;

        this.isZoomed = false;
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;

        this.zoomImage.parentElement.classList.remove('zoomed');
        this.zoomControls.classList.remove('show');

        this.updateTransform();

        // Announce to screen readers
        if (window.announceToScreenReader) {
            window.announceToScreenReader('Zoom deactivated');
        }
    }

    resetZoom() {
        this.scale = 1.5;
        this.translateX = 0;
        this.translateY = 0;
        this.updateTransform();
    }

    updateTransform() {
        if (!this.zoomImage) return;

        const transform = `scale(${this.scale}) translate(${this.translateX / this.scale}px, ${this.translateY / this.scale}px)`;
        this.zoomImage.style.transform = transform;
    }

    getTouchDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    destroy() {
        if (this.isZoomed) {
            this.exitZoom();
        }
        
        if (this.zoomHint) {
            this.zoomHint.remove();
        }
        if (this.zoomControls) {
            this.zoomControls.remove();
        }
    }
}
