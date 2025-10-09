# Phase 5: AR Viewer Integration

This guide implements **Augmented Reality (AR) viewing** for your portfolio using Google's `<model-viewer>` web component. This allows users to view 3D models of your work in their real-world environment using their phone's camera.

---

## Overview

**What it does:**
- Displays interactive 3D models directly in the browser
- "View in AR" button for compatible mobile devices (iOS/Android)
- Camera controls (rotate, zoom, pan)
- Auto-rotate when idle
- Customizable lighting and environment
- Annotation hotspots on 3D models
- Works without additional apps (uses built-in AR capabilities)

**User Experience:**
```
[3D Model Viewer]
    Rotate • Zoom • Pan
    [View in Your Space] ← Launches AR on mobile

    On mobile → Points camera at floor
             → 3D model appears in real world
             → Can walk around and view from all angles
```

**Supported Platforms:**
- iOS: Quick Look (Safari)
- Android: Scene Viewer (Chrome, Samsung Internet)
- Desktop: Interactive 3D viewer (all modern browsers)

---

## 1. Prerequisites

### 3D Model Requirements

You need 3D models in `.glb` (recommended) or `.gltf` format:

- **GLB** (GL Transmission Format Binary): Single file containing model, textures, materials
- **GLTF** (JSON format): Multiple files (better for debugging)

**Recommended specs:**
- File size: < 5MB (ideally < 2MB)
- Polygon count: < 100k triangles
- Textures: 2048x2048 or smaller
- PBR materials (Physically Based Rendering)

### Creating/Exporting 3D Models

**Tools:**
- **Blender** (free): File → Export → glTF 2.0 (.glb)
- **Cinema 4D**: File → Export → glTF
- **Maya**: Babylon.js exporter
- **SketchUp**: SketchUp Viewer for Web
- **Adobe Dimension**: Export as GLB

**Quick conversion:**
- Use online converters: `gltf.report`, `blackthread.io/gltf-converter`
- Optimize with: `gltf-pipeline` (npm package)

---

## 2. Installation

### Option A: CDN (Recommended)

Add to your HTML `<head>`:

```html
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"></script>
```

### Option B: NPM

```bash
npm install @google/model-viewer
```

Then import in your JavaScript:

```javascript
import '@google/model-viewer';
```

---

## 3. HTML Structure

### Basic Implementation

Add to your case study page:

```html
<!-- AR Viewer Section -->
<section class="ar-viewer-section">
    <div class="ar-viewer-container">

        <h3>View in 3D / AR</h3>
        <p>Interact with the 3D model or view it in your space using AR</p>

        <!-- Model Viewer -->
        <model-viewer
            id="modelViewer"
            src="assets/models/project-model.glb"
            alt="3D model of project"
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            auto-rotate
            shadow-intensity="1"
            environment-image="neutral"
            poster="assets/images/projects/model-poster.jpg"
            loading="eager"
            reveal="auto"
        >
            <!-- Loading Progress -->
            <div class="progress-bar" slot="progress-bar">
                <div class="update-bar"></div>
            </div>

            <!-- AR Button (appears on compatible devices) -->
            <button slot="ar-button" class="ar-button">
                👋 View in Your Space
            </button>

            <!-- Annotation Hotspots -->
            <button class="hotspot" slot="hotspot-1" data-position="0.5m 0.2m 0.3m" data-normal="0 1 0">
                <div class="hotspot-annotation">
                    Premium Materials
                </div>
            </button>

            <button class="hotspot" slot="hotspot-2" data-position="-0.3m 0.5m 0.2m" data-normal="0 1 0">
                <div class="hotspot-annotation">
                    Custom Engraving
                </div>
            </button>

            <!-- Camera Orbit Presets -->
            <div class="camera-controls" slot="default">
                <button data-orbit="0deg 75deg 1.5m" class="preset-btn">Front</button>
                <button data-orbit="90deg 75deg 1.5m" class="preset-btn">Side</button>
                <button data-orbit="180deg 75deg 1.5m" class="preset-btn">Back</button>
            </div>
        </model-viewer>

        <!-- Instructions -->
        <div class="viewer-instructions">
            <div class="instruction-item">
                <span class="icon">🖱️</span>
                <span>Drag to rotate</span>
            </div>
            <div class="instruction-item">
                <span class="icon">🔍</span>
                <span>Scroll to zoom</span>
            </div>
            <div class="instruction-item">
                <span class="icon">📱</span>
                <span>Tap "View in Your Space" for AR</span>
            </div>
        </div>

    </div>
</section>
```

---

## 4. CSS Styling

Create `styles/ar-viewer.css`:

```css
/* ============================================
   AR VIEWER SECTION
   ============================================ */

.ar-viewer-section {
    padding: var(--spacing-xl) var(--spacing-md);
    background: var(--color-surface);
}

.ar-viewer-container {
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
}

.ar-viewer-container h3 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-sm);
}

.ar-viewer-container p {
    color: var(--color-text-muted);
    margin-bottom: var(--spacing-lg);
}

/* ============================================
   MODEL VIEWER
   ============================================ */

model-viewer {
    width: 100%;
    height: 600px;
    background-color: #f5f5f5;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    --progress-bar-color: var(--color-accent);
    --progress-bar-height: 4px;
}

/* ============================================
   LOADING PROGRESS BAR
   ============================================ */

.progress-bar {
    display: block;
    width: 100%;
    height: 4px;
    max-width: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    overflow: hidden;
}

.update-bar {
    background: var(--color-accent);
    width: 0%;
    height: 100%;
    border-radius: 2px;
    transition: width 0.3s ease;
}

/* Hide progress bar when loaded */
model-viewer[loaded] .progress-bar {
    display: none;
}

/* ============================================
   AR BUTTON
   ============================================ */

.ar-button {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-accent);
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 32px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transition: all var(--transition-fast);
    z-index: 10;
}

.ar-button:hover {
    background: var(--color-primary);
    transform: translateX(-50%) translateY(-2px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.ar-button:active {
    transform: translateX(-50%) translateY(0);
}

/* Hide AR button if AR not available */
model-viewer:not([ar-status="not-presenting"]) .ar-button {
    display: none;
}

/* ============================================
   HOTSPOT ANNOTATIONS
   ============================================ */

.hotspot {
    background: white;
    border: 2px solid var(--color-accent);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: all var(--transition-fast);
    position: relative;
}

.hotspot:hover {
    transform: scale(1.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.hotspot::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: var(--color-accent);
    border-radius: 50%;
}

/* Pulse animation */
.hotspot::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border: 2px solid var(--color-accent);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 2s infinite;
    opacity: 0;
}

@keyframes pulse {
    0% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
    }
}

/* Hotspot Annotation Tooltip */
.hotspot-annotation {
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 8px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    font-size: 0.875rem;
    font-weight: 500;
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--transition-fast);
}

.hotspot-annotation::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid white;
}

.hotspot:hover .hotspot-annotation {
    opacity: 1;
}

/* ============================================
   CAMERA PRESET BUTTONS
   ============================================ */

.camera-controls {
    position: absolute;
    top: 24px;
    right: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.preset-btn {
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.preset-btn:hover {
    background: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
}

/* ============================================
   VIEWER INSTRUCTIONS
   ============================================ */

.viewer-instructions {
    display: flex;
    justify-content: center;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
    flex-wrap: wrap;
}

.instruction-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
}

.instruction-item .icon {
    font-size: 1.5rem;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
    model-viewer {
        height: 400px;
    }

    .ar-button {
        bottom: 16px;
        padding: 12px 24px;
        font-size: 0.875rem;
    }

    .camera-controls {
        top: 16px;
        right: 16px;
        gap: 6px;
    }

    .preset-btn {
        padding: 6px 12px;
        font-size: 0.75rem;
    }

    .viewer-instructions {
        flex-direction: column;
        gap: var(--spacing-sm);
    }
}

/* ============================================
   DARK MODE SUPPORT
   ============================================ */

@media (prefers-color-scheme: dark) {
    model-viewer {
        background-color: #1a1a1a;
    }

    .hotspot {
        background: #2a2a2a;
        border-color: var(--color-accent);
    }

    .hotspot-annotation {
        background: #2a2a2a;
        color: white;
    }

    .hotspot-annotation::after {
        border-top-color: #2a2a2a;
    }

    .preset-btn {
        background: #2a2a2a;
        color: white;
        border-color: rgba(255, 255, 255, 0.1);
    }
}
```

Import in HTML:

```html
<link rel="stylesheet" href="styles/ar-viewer.css">
```

---

## 5. JavaScript Integration

Create `scripts/ar-viewer.js`:

```javascript
// scripts/ar-viewer.js

class ARViewer {
    constructor(viewerId) {
        this.viewer = document.getElementById(viewerId);
        if (!this.viewer) {
            console.error('Model viewer not found');
            return;
        }

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupProgressBar();
        this.setupCameraPresets();
        this.checkARSupport();
    }

    /**
     * Setup event listeners for model-viewer events
     */
    setupEventListeners() {
        // Model loaded
        this.viewer.addEventListener('load', () => {
            console.log('Model loaded successfully');
            this.onModelLoad();
        });

        // Loading progress
        this.viewer.addEventListener('progress', (event) => {
            this.updateProgress(event.detail.totalProgress);
        });

        // AR session started
        this.viewer.addEventListener('ar-status', (event) => {
            if (event.detail.status === 'session-started') {
                console.log('AR session started');
            }
        });

        // Camera change
        this.viewer.addEventListener('camera-change', () => {
            // console.log('Camera moved');
        });

        // Error handling
        this.viewer.addEventListener('error', (event) => {
            console.error('Model viewer error:', event.detail);
            this.showError('Failed to load 3D model. Please try again.');
        });
    }

    /**
     * Setup loading progress bar
     */
    setupProgressBar() {
        const progressBar = this.viewer.querySelector('.progress-bar');
        const updateBar = progressBar?.querySelector('.update-bar');

        if (updateBar) {
            this.progressBar = updateBar;
        }
    }

    /**
     * Update loading progress
     */
    updateProgress(progress) {
        if (this.progressBar) {
            this.progressBar.style.width = `${progress * 100}%`;
        }
    }

    /**
     * Called when model finishes loading
     */
    onModelLoad() {
        // Auto-rotate after 3 seconds of inactivity
        setTimeout(() => {
            if (this.viewer) {
                this.viewer.setAttribute('auto-rotate', '');
            }
        }, 3000);

        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('modelLoaded', {
            detail: { viewer: this.viewer }
        }));
    }

    /**
     * Setup camera preset buttons
     */
    setupCameraPresets() {
        const presetButtons = this.viewer.querySelectorAll('.preset-btn');

        presetButtons.forEach(button => {
            button.addEventListener('click', () => {
                const orbit = button.getAttribute('data-orbit');
                if (orbit) {
                    this.viewer.cameraOrbit = orbit;
                    this.viewer.fieldOfView = '45deg';
                }
            });
        });
    }

    /**
     * Check AR support and update UI
     */
    async checkARSupport() {
        // model-viewer handles this internally, but we can check
        if ('xr' in navigator) {
            const isSupported = await navigator.xr?.isSessionSupported('immersive-ar');
            if (isSupported) {
                console.log('AR is supported on this device');
            }
        }
    }

    /**
     * Programmatically activate AR
     */
    activateAR() {
        if (this.viewer) {
            this.viewer.activateAR();
        }
    }

    /**
     * Change model dynamically
     */
    changeModel(modelUrl, posterUrl = null) {
        if (this.viewer) {
            this.viewer.src = modelUrl;
            if (posterUrl) {
                this.viewer.poster = posterUrl;
            }
        }
    }

    /**
     * Add hotspot programmatically
     */
    addHotspot(id, position, normal, text) {
        const hotspot = document.createElement('button');
        hotspot.className = 'hotspot';
        hotspot.slot = `hotspot-${id}`;
        hotspot.setAttribute('data-position', position);
        hotspot.setAttribute('data-normal', normal);

        const annotation = document.createElement('div');
        annotation.className = 'hotspot-annotation';
        annotation.textContent = text;

        hotspot.appendChild(annotation);
        this.viewer.appendChild(hotspot);
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'viewer-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 0, 0, 0.1);
            color: red;
            padding: 1rem 2rem;
            border-radius: 8px;
            text-align: center;
        `;
        this.viewer.appendChild(errorDiv);
    }

    /**
     * Get current camera position
     */
    getCameraOrbit() {
        return this.viewer.getCameraOrbit();
    }

    /**
     * Get current field of view
     */
    getFieldOfView() {
        return this.viewer.getFieldOfView();
    }

    /**
     * Take screenshot of current view
     */
    async takeScreenshot() {
        const blob = await this.viewer.toBlob({ idealAspect: true });
        const url = URL.createObjectURL(blob);

        // Download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'model-screenshot.png';
        a.click();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const arViewer = new ARViewer('modelViewer');

        // Make available globally for debugging
        window.arViewer = arViewer;
    });
} else {
    const arViewer = new ARViewer('modelViewer');
    window.arViewer = arViewer;
}

export default ARViewer;
```

---

## 6. Dynamic Model Loading

Load models based on project data:

```javascript
// In your main.js or project page script

async function loadProjectModel(projectId) {
    // Fetch project data
    const response = await fetch(`data/projects/${projectId}.json`);
    const project = await response.json();

    // Check if project has 3D model
    if (project.model_url) {
        // Show AR viewer section
        document.querySelector('.ar-viewer-section').style.display = 'block';

        // Load model
        const viewer = document.getElementById('modelViewer');
        viewer.src = project.model_url;
        viewer.poster = project.model_poster || project.thumbnail;
        viewer.alt = `3D model of ${project.title}`;

        // Add project-specific hotspots
        if (project.hotspots) {
            project.hotspots.forEach((hotspot, index) => {
                window.arViewer.addHotspot(
                    index + 1,
                    hotspot.position,
                    hotspot.normal,
                    hotspot.text
                );
            });
        }
    } else {
        // Hide AR viewer if no model
        document.querySelector('.ar-viewer-section').style.display = 'none';
    }
}

// Load based on URL parameter
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('project');
if (projectId) {
    loadProjectModel(projectId);
}
```

Update `data/projects.json`:

```json
{
    "id": "project-1",
    "title": "Product Design",
    "model_url": "assets/models/product-design.glb",
    "model_poster": "assets/images/projects/product-poster.jpg",
    "hotspots": [
        {
            "position": "0.5m 0.2m 0.3m",
            "normal": "0 1 0",
            "text": "Premium aluminum finish"
        },
        {
            "position": "-0.3m 0.5m 0.2m",
            "normal": "0 1 0",
            "text": "Ergonomic grip design"
        }
    ]
}
```

---

## 7. Model Optimization

### Using gltf-pipeline (CLI tool)

```bash
# Install
npm install -g gltf-pipeline

# Optimize model
gltf-pipeline -i model.glb -o model-optimized.glb --draco.compressionLevel 10

# This can reduce file size by 80%+
```

### Using Blender

1. File → Export → glTF 2.0
2. Enable "Draco mesh compression"
3. Set compression level to 10
4. Uncheck "Apply Modifiers" if not needed
5. Reduce texture resolution in Shader Editor

### Online Tools

- **gltf.report**: Upload model, get optimization suggestions
- **glTF-Transform**: Web-based optimization tool

---

## 8. Advanced Features

### Custom Environment Lighting

Add custom HDR environment:

```html
<model-viewer
    src="model.glb"
    environment-image="https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr"
    skybox-image="https://modelviewer.dev/shared-assets/environments/aircraft_workshop_01_1k.hdr"
>
</model-viewer>
```

### Variants (Material Swapping)

If your model has material variants:

```html
<model-viewer src="model.glb">
    <select id="variant-selector" slot="default">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
    </select>
</model-viewer>

<script>
    const select = document.getElementById('variant-selector');
    select.addEventListener('change', (e) => {
        viewer.variantName = e.target.value;
    });
</script>
```

### Animation Control

If model has animations:

```javascript
// Play animation
viewer.play();

// Pause
viewer.pause();

// Set animation time
viewer.currentTime = 2; // seconds

// Loop animation
viewer.setAttribute('autoplay', '');
```

### QR Code for AR

Generate QR code linking directly to AR view:

```html
<div class="qr-code">
    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://yoursite.com/model.html" alt="Scan to view in AR">
    <p>Scan with your phone to view in AR</p>
</div>
```

---

## 9. Testing Checklist

- [ ] Model loads without errors on desktop
- [ ] Camera controls work (drag, zoom, pan)
- [ ] Auto-rotate activates
- [ ] Loading progress bar displays
- [ ] AR button appears on compatible mobile devices
- [ ] Tap AR button launches AR session (test on iOS/Android)
- [ ] Hotspots visible and interactive
- [ ] Camera presets work
- [ ] Model displays correctly in AR (proper scale/orientation)
- [ ] Textures load correctly
- [ ] Performance acceptable (30 FPS+)
- [ ] Error handling works if model fails to load

---

## 10. Troubleshooting

**Issue**: Model not loading
- Check file path is correct
- Verify .glb file is not corrupted (test in Blender)
- Check browser console for CORS errors
- Ensure server serves .glb with correct MIME type

**Issue**: AR button doesn't appear
- Test on actual mobile device (not simulator)
- Ensure `ar` and `ar-modes` attributes are set
- Check device AR compatibility (iOS 12+, Android 8+)
- Verify HTTPS (AR requires secure context)

**Issue**: Model appears too large/small in AR
- Adjust model scale in Blender before export
- Use `scale` attribute: `<model-viewer scale="0.5 0.5 0.5">`
- Check model units (meters recommended)

**Issue**: Textures missing or incorrect
- Ensure textures are embedded in .glb (not external files)
- Check texture paths in GLTF if using separate files
- Verify texture formats (JPG/PNG)

**Issue**: Poor performance
- Reduce polygon count (< 100k triangles)
- Compress textures (use 1024x1024 or smaller)
- Enable Draco compression
- Use simpler materials

**Issue**: Model lighting looks wrong
- Add `environment-image` for better lighting
- Adjust `shadow-intensity`
- Check model materials use PBR workflow

---

## 11. Creating 3D Models - Quick Guide

### From Scratch (Blender)

1. Model your object
2. UV unwrap
3. Apply PBR materials (Principled BSDF)
4. File → Export → glTF 2.0 (.glb)
5. Enable Draco compression
6. Export

### From Photos (Photogrammetry)

Tools:
- **Polycam** (iOS/Android): Scan with phone camera
- **Meshroom** (free desktop): Process photos
- **RealityCapture**: Professional option

Workflow:
1. Take 50-100 photos around object
2. Upload to photogrammetry software
3. Generate 3D mesh
4. Clean up in Blender
5. Export as .glb

### From CAD Software

Most CAD tools can export to OBJ/FBX:
1. Export from CAD software
2. Import to Blender
3. Retopologize if needed
4. Add materials
5. Export as .glb

---

## 12. Best Practices

1. **Optimize file size** - Aim for < 2MB for fast loading
2. **Test on real devices** - AR experience varies by device
3. **Provide poster image** - Shows before model loads
4. **Use HTTPS** - Required for AR features
5. **Add loading state** - Users should see progress
6. **Consider scale** - Real-world scale matters in AR
7. **Limit hotspots** - 3-5 max per model
8. **Provide fallback** - Static image if WebGL not supported

---

## 13. Next Steps

Phase 5 complete! Your portfolio now has cutting-edge AR capabilities.

**Ready for:**
- **Phase 6**: GSAP Page Transitions (Barba.js/Swup)
- **Phase 7**: Performance Optimization & Accessibility
- **Phase 8**: Analytics & SEO

---

**Pro tip**: Not every project needs a 3D model. Reserve AR viewing for physical products, architecture, 3D art, or prototypes where seeing it in space adds real value.
