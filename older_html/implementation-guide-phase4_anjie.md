# Phase 4: 3D Portfolio Constellation

This guide implements the **3D Portfolio Constellation** - an interactive Three.js visualization that displays your projects as a force-directed graph in 3D space, creating an immersive "galaxy" of work.

---

## Overview

**What it does:**
- Renders projects as 3D nodes with thumbnail textures
- Uses force-directed physics for organic, constellation-like layout
- Draws connection lines between related projects
- Interactive camera controls (orbit, zoom, pan)
- Click on nodes to navigate to project details
- Hover effects with project info
- Smooth animations and transitions

**User Experience:**
```
[3D Space with floating project nodes]
    ○ ──── ○
   /│\    /│\
  ○ ○ ○──○ ○ ○

[User orbits camera, clicks node → navigates to project]
```

---

## 1. Dependencies

Ensure you have these libraries (from Phase 1):

```html
<!-- Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- OrbitControls (camera interaction) -->
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>

<!-- d3-force-3d (force-directed layout) -->
<script src="https://unpkg.com/d3-force-3d@3"></script>

<!-- GSAP (optional, for animations) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

Or via NPM:

```bash
npm install three d3-force-3d
```

---

## 2. HTML Structure

Add to your `index.html`:

```html
<!-- 3D Constellation Section -->
<section id="constellation" class="constellation-section">

    <!-- Canvas Container -->
    <div class="constellation-container">
        <canvas id="constellationCanvas"></canvas>

        <!-- Loading State -->
        <div id="constellationLoader" class="constellation-loader">
            <div class="loader-spinner"></div>
            <p>Loading constellation...</p>
        </div>

        <!-- Instructions Overlay -->
        <div class="constellation-instructions">
            <p>🖱️ Drag to rotate • Scroll to zoom • Click nodes to explore</p>
        </div>

        <!-- Project Info Tooltip (on hover) -->
        <div id="constellationTooltip" class="constellation-tooltip">
            <h4 class="tooltip-title"></h4>
            <p class="tooltip-category"></p>
        </div>
    </div>

    <!-- Optional: Legend/Filter -->
    <div class="constellation-legend">
        <h4>Project Categories</h4>
        <div class="legend-items">
            <button class="legend-item" data-category="all">
                <span class="legend-color" style="background: #667eea;"></span>
                All Projects
            </button>
            <button class="legend-item" data-category="web">
                <span class="legend-color" style="background: #f093fb;"></span>
                Web Design
            </button>
            <button class="legend-item" data-category="3d">
                <span class="legend-color" style="background: #4facfe;"></span>
                3D Art
            </button>
        </div>
    </div>

</section>
```

---

## 3. CSS Styling

Create `styles/constellation.css`:

```css
/* ============================================
   CONSTELLATION SECTION
   ============================================ */

.constellation-section {
    position: relative;
    min-height: 100vh;
    background: linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%);
    overflow: hidden;
}

.constellation-container {
    position: relative;
    width: 100%;
    height: 100vh;
}

#constellationCanvas {
    display: block;
    width: 100%;
    height: 100%;
    cursor: grab;
}

#constellationCanvas:active {
    cursor: grabbing;
}

/* ============================================
   LOADING STATE
   ============================================ */

.constellation-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 10;
    transition: opacity 0.3s ease;
}

.constellation-loader.hidden {
    opacity: 0;
    pointer-events: none;
}

.loader-spinner {
    width: 50px;
    height: 50px;
    margin: 0 auto 1rem;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* ============================================
   INSTRUCTIONS
   ============================================ */

.constellation-instructions {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 0.75rem 1.5rem;
    border-radius: 24px;
    color: white;
    font-size: 0.875rem;
    z-index: 5;
    pointer-events: none;
}

/* ============================================
   HOVER TOOLTIP
   ============================================ */

.constellation-tooltip {
    position: absolute;
    background: white;
    padding: 1rem 1.25rem;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    pointer-events: none;
    z-index: 20;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    max-width: 250px;
}

.constellation-tooltip.visible {
    opacity: 1;
    visibility: visible;
}

.tooltip-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: var(--color-primary);
}

.tooltip-category {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    margin: 0;
}

/* ============================================
   LEGEND / FILTERS
   ============================================ */

.constellation-legend {
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    z-index: 10;
    min-width: 200px;
}

.constellation-legend h4 {
    margin: 0 0 1rem 0;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
}

.legend-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    text-align: left;
}

.legend-item:hover {
    background: rgba(0, 0, 0, 0.05);
}

.legend-item.active {
    background: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
}

.legend-color {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
    .constellation-legend {
        top: auto;
        bottom: 5rem;
        right: 1rem;
        left: 1rem;
        padding: 1rem;
    }

    .legend-items {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .legend-item {
        flex: 1 1 45%;
        font-size: 0.75rem;
    }

    .constellation-instructions {
        bottom: 1rem;
        font-size: 0.75rem;
        padding: 0.5rem 1rem;
    }
}
```

Import in HTML:

```html
<link rel="stylesheet" href="styles/constellation.css">
```

---

## 4. Data Structure

Create `data/portfolio-graph.json`:

```json
{
    "nodes": [
        {
            "id": "project-1",
            "title": "E-commerce Redesign",
            "category": "web",
            "thumbnail": "assets/images/projects/project-1.jpg",
            "url": "case-study.html?project=project-1",
            "color": "#667eea"
        },
        {
            "id": "project-2",
            "title": "3D Product Visualization",
            "category": "3d",
            "thumbnail": "assets/images/projects/project-2.jpg",
            "url": "case-study.html?project=project-2",
            "color": "#4facfe"
        },
        {
            "id": "project-3",
            "title": "Brand Identity System",
            "category": "branding",
            "thumbnail": "assets/images/projects/project-3.jpg",
            "url": "case-study.html?project=project-3",
            "color": "#f093fb"
        },
        {
            "id": "project-4",
            "title": "Mobile App UI/UX",
            "category": "mobile",
            "thumbnail": "assets/images/projects/project-4.jpg",
            "url": "case-study.html?project=project-4",
            "color": "#43e97b"
        }
    ],
    "links": [
        {
            "source": "project-1",
            "target": "project-2",
            "relationship": "Similar aesthetic"
        },
        {
            "source": "project-1",
            "target": "project-4",
            "relationship": "Same client"
        },
        {
            "source": "project-2",
            "target": "project-3",
            "relationship": "Shared color palette"
        }
    ]
}
```

---

## 5. JavaScript Implementation

Create `scripts/constellation.js`:

```javascript
// scripts/constellation.js

class PortfolioConstellation {
    constructor(canvasId, dataUrl) {
        this.canvas = document.getElementById(canvasId);
        this.dataUrl = dataUrl;
        this.loader = document.getElementById('constellationLoader');
        this.tooltip = document.getElementById('constellationTooltip');

        // Three.js components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;

        // Data
        this.graphData = null;
        this.nodeMeshes = [];
        this.linkLines = [];
        this.hoveredNode = null;

        // Raycasting for interaction
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.init();
    }

    async init() {
        await this.loadData();
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupLights();

        await this.createNodes();
        this.createLinks();
        this.applyForceLayout();

        this.setupInteraction();
        this.animate();

        // Hide loader
        this.loader.classList.add('hidden');
    }

    /**
     * Load graph data from JSON
     */
    async loadData() {
        try {
            const response = await fetch(this.dataUrl);
            if (!response.ok) throw new Error('Failed to load graph data');
            this.graphData = await response.json();
        } catch (error) {
            console.error('Error loading constellation data:', error);
            this.graphData = this.getDemoData();
        }
    }

    /**
     * Setup Three.js scene
     */
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0e27);

        // Optional: Add fog for depth
        this.scene.fog = new THREE.FogExp2(0x0a0e27, 0.002);

        // Add stars background
        this.createStarfield();
    }

    /**
     * Create starfield background
     */
    createStarfield() {
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 2,
            transparent: true,
            opacity: 0.8
        });

        const starsVertices = [];
        for (let i = 0; i < 1000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starsVertices.push(x, y, z);
        }

        starsGeometry.setAttribute('position',
            new THREE.Float32BufferAttribute(starsVertices, 3)
        );

        const stars = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(stars);
    }

    /**
     * Setup camera
     */
    setupCamera() {
        const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        this.camera.position.z = 100;
    }

    /**
     * Setup WebGL renderer
     */
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });

        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    /**
     * Setup orbit controls
     */
    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.rotateSpeed = 0.5;
        this.controls.zoomSpeed = 0.8;
        this.controls.minDistance = 30;
        this.controls.maxDistance = 300;
    }

    /**
     * Setup scene lighting
     */
    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        this.scene.add(directionalLight);

        // Point light for dramatic effect
        const pointLight = new THREE.PointLight(0x667eea, 1, 200);
        pointLight.position.set(0, 50, 50);
        this.scene.add(pointLight);
    }

    /**
     * Create 3D nodes from project data
     */
    async createNodes() {
        const textureLoader = new THREE.TextureLoader();

        for (const node of this.graphData.nodes) {
            // Load thumbnail texture
            let texture;
            try {
                texture = await this.loadTexture(textureLoader, node.thumbnail);
            } catch (error) {
                console.warn(`Failed to load texture for ${node.id}`, error);
                texture = this.createPlaceholderTexture();
            }

            // Create plane geometry with texture
            const geometry = new THREE.PlaneGeometry(15, 15);
            const material = new THREE.MeshStandardMaterial({
                map: texture,
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide
            });

            const mesh = new THREE.Mesh(geometry, material);

            // Store node data on mesh for later reference
            mesh.userData = {
                id: node.id,
                title: node.title,
                category: node.category,
                url: node.url,
                color: node.color
            };

            // Random initial position (will be updated by force layout)
            mesh.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );

            this.scene.add(mesh);
            this.nodeMeshes.push(mesh);

            // Add glow effect
            this.addGlowToNode(mesh, node.color);
        }
    }

    /**
     * Load texture as Promise
     */
    loadTexture(loader, url) {
        return new Promise((resolve, reject) => {
            loader.load(
                url,
                (texture) => resolve(texture),
                undefined,
                (error) => reject(error)
            );
        });
    }

    /**
     * Create placeholder texture if image fails
     */
    createPlaceholderTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');

        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, 256, 256);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);

        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }

    /**
     * Add glow effect around node
     */
    addGlowToNode(mesh, color) {
        const glowGeometry = new THREE.PlaneGeometry(18, 18);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: color || 0x667eea,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
        });

        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.z = -0.5;
        mesh.add(glow);
        mesh.userData.glow = glow;
    }

    /**
     * Create connection lines between linked nodes
     */
    createLinks() {
        this.graphData.links.forEach(link => {
            const sourceMesh = this.nodeMeshes.find(m => m.userData.id === link.source);
            const targetMesh = this.nodeMeshes.find(m => m.userData.id === link.target);

            if (!sourceMesh || !targetMesh) return;

            const material = new THREE.LineBasicMaterial({
                color: 0x667eea,
                transparent: true,
                opacity: 0.3
            });

            const geometry = new THREE.BufferGeometry().setFromPoints([
                sourceMesh.position,
                targetMesh.position
            ]);

            const line = new THREE.Line(geometry, material);
            line.userData = { source: sourceMesh, target: targetMesh };

            this.scene.add(line);
            this.linkLines.push(line);
        });
    }

    /**
     * Apply force-directed layout using d3-force-3d
     */
    applyForceLayout() {
        // Prepare data for d3-force-3d
        const nodes = this.graphData.nodes.map(n => ({ id: n.id }));
        const links = this.graphData.links.map(l => ({
            source: l.source,
            target: l.target
        }));

        // Create force simulation
        const simulation = d3.forceSimulation3d(nodes)
            .force('link', d3.forceLink3d(links).id(d => d.id).distance(50))
            .force('charge', d3.forceManyBody3d().strength(-200))
            .force('center', d3.forceCenter3d(0, 0, 0))
            .force('collision', d3.forceCollide3d().radius(20));

        // Run simulation
        for (let i = 0; i < 100; i++) {
            simulation.tick();
        }

        // Update mesh positions
        nodes.forEach(node => {
            const mesh = this.nodeMeshes.find(m => m.userData.id === node.id);
            if (mesh && node.x !== undefined) {
                mesh.position.set(node.x, node.y, node.z);
            }
        });

        // Update link line positions
        this.linkLines.forEach(line => {
            const positions = line.geometry.attributes.position.array;
            positions[0] = line.userData.source.position.x;
            positions[1] = line.userData.source.position.y;
            positions[2] = line.userData.source.position.z;
            positions[3] = line.userData.target.position.x;
            positions[4] = line.userData.target.position.y;
            positions[5] = line.userData.target.position.z;
            line.geometry.attributes.position.needsUpdate = true;
        });
    }

    /**
     * Setup mouse interaction
     */
    setupInteraction() {
        // Mouse move for hover detection
        this.canvas.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        });

        // Click for navigation
        this.canvas.addEventListener('click', () => {
            if (this.hoveredNode) {
                window.location.href = this.hoveredNode.userData.url;
            }
        });
    }

    /**
     * Handle mouse move for raycasting
     */
    onMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Raycast to detect hovered node
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.nodeMeshes);

        if (intersects.length > 0) {
            const hoveredMesh = intersects[0].object;

            if (this.hoveredNode !== hoveredMesh) {
                // Reset previous hovered node
                if (this.hoveredNode) {
                    this.hoveredNode.material.opacity = 0.9;
                    this.hoveredNode.userData.glow.material.opacity = 0.2;
                }

                // Highlight new hovered node
                this.hoveredNode = hoveredMesh;
                this.hoveredNode.material.opacity = 1;
                this.hoveredNode.userData.glow.material.opacity = 0.5;

                // Show tooltip
                this.showTooltip(hoveredMesh.userData, event);
                this.canvas.style.cursor = 'pointer';
            }
        } else {
            // No hover
            if (this.hoveredNode) {
                this.hoveredNode.material.opacity = 0.9;
                this.hoveredNode.userData.glow.material.opacity = 0.2;
                this.hoveredNode = null;
                this.hideTooltip();
                this.canvas.style.cursor = 'grab';
            }
        }
    }

    /**
     * Show tooltip on hover
     */
    showTooltip(nodeData, event) {
        this.tooltip.querySelector('.tooltip-title').textContent = nodeData.title;
        this.tooltip.querySelector('.tooltip-category').textContent = nodeData.category;

        this.tooltip.style.left = `${event.clientX + 15}px`;
        this.tooltip.style.top = `${event.clientY + 15}px`;
        this.tooltip.classList.add('visible');
    }

    /**
     * Hide tooltip
     */
    hideTooltip() {
        this.tooltip.classList.remove('visible');
    }

    /**
     * Animation loop
     */
    animate() {
        requestAnimationFrame(() => this.animate());

        // Update controls
        this.controls.update();

        // Make nodes face camera (billboard effect)
        this.nodeMeshes.forEach(mesh => {
            mesh.lookAt(this.camera.position);
        });

        // Render scene
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Handle window resize
     */
    onWindowResize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    /**
     * Demo data fallback
     */
    getDemoData() {
        return {
            nodes: [
                { id: "p1", title: "Project Alpha", category: "Web", thumbnail: "", url: "#", color: "#667eea" },
                { id: "p2", title: "Project Beta", category: "3D", thumbnail: "", url: "#", color: "#4facfe" },
                { id: "p3", title: "Project Gamma", category: "Brand", thumbnail: "", url: "#", color: "#f093fb" },
                { id: "p4", title: "Project Delta", category: "Mobile", thumbnail: "", url: "#", color: "#43e97b" }
            ],
            links: [
                { source: "p1", target: "p2" },
                { source: "p2", target: "p3" },
                { source: "p3", target: "p4" },
                { source: "p1", target: "p4" }
            ]
        };
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const constellation = new PortfolioConstellation(
            'constellationCanvas',
            'data/portfolio-graph.json'
        );
    });
} else {
    const constellation = new PortfolioConstellation(
        'constellationCanvas',
        'data/portfolio-graph.json'
    );
}

export default PortfolioConstellation;
```

---

## 6. Testing Checklist

- [ ] Canvas renders without errors
- [ ] Nodes appear in 3D space
- [ ] Thumbnails load correctly on nodes
- [ ] Connection lines draw between linked nodes
- [ ] Camera controls work (drag to rotate, scroll to zoom)
- [ ] Hover over node shows tooltip
- [ ] Click on node navigates to project URL
- [ ] Starfield background visible
- [ ] Nodes face camera (billboard effect)
- [ ] Window resize updates canvas
- [ ] Loading spinner shows then hides
- [ ] Performance acceptable (30+ FPS)

---

## 7. Troubleshooting

**Issue**: Canvas is black/nothing renders
- Check browser console for Three.js errors
- Verify WebGL is supported (visit `get.webgl.org`)
- Check that scene, camera, renderer are initialized

**Issue**: Nodes don't appear
- Verify thumbnail image paths are correct
- Check camera position (`camera.position.z` should be > 0)
- Ensure lighting is added to scene

**Issue**: OrbitControls not working
- Verify OrbitControls script is loaded before constellation.js
- Check that `controls.update()` is called in animation loop
- Make sure canvas has proper event listeners

**Issue**: Raycasting/clicks not detecting nodes
- Verify `raycaster.setFromCamera()` called on mousemove
- Check that `nodeMeshes` array is populated
- Ensure camera and mouse coordinates are correct

**Issue**: Poor performance/laggy
- Reduce number of stars in starfield
- Lower `renderer.setPixelRatio(1)` instead of device pixel ratio
- Use simpler geometries (fewer faces)
- Consider Level of Detail (LOD) for many nodes

**Issue**: Force layout looks clustered
- Adjust force strengths in `applyForceLayout()`
- Increase `.distance()` in link force
- Increase collision radius

---

## 8. Performance Optimization

### Mobile Fallback

For mobile devices, consider showing a 2D version:

```javascript
// In init()
if (window.innerWidth < 768) {
    this.render2DFallback();
    return;
}
```

### Instanced Rendering

For many nodes (50+), use `THREE.InstancedMesh`:

```javascript
const geometry = new THREE.PlaneGeometry(15, 15);
const material = new THREE.MeshStandardMaterial();
const instancedMesh = new THREE.InstancedMesh(geometry, material, nodeCount);

// Set individual transforms
nodes.forEach((node, i) => {
    const matrix = new THREE.Matrix4();
    matrix.setPosition(node.x, node.y, node.z);
    instancedMesh.setMatrixAt(i, matrix);
});
```

### Level of Detail (LOD)

Reduce quality when far from camera:

```javascript
const lod = new THREE.LOD();
lod.addLevel(highDetailMesh, 0);   // Close
lod.addLevel(mediumDetailMesh, 50); // Medium
lod.addLevel(lowDetailMesh, 100);   // Far
scene.add(lod);
```

---

## 9. Advanced Enhancements

### Category Filtering

Add category filter functionality:

```javascript
filterByCategory(category) {
    this.nodeMeshes.forEach(mesh => {
        if (category === 'all' || mesh.userData.category === category) {
            gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.5 });
            gsap.to(mesh.material, { opacity: 0.9, duration: 0.5 });
        } else {
            gsap.to(mesh.scale, { x: 0.3, y: 0.3, z: 0.3, duration: 0.5 });
            gsap.to(mesh.material, { opacity: 0.2, duration: 0.5 });
        }
    });
}
```

Hook up to legend buttons:

```javascript
document.querySelectorAll('.legend-item').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        constellation.filterByCategory(category);
    });
});
```

### Animated Camera Tours

Create automatic camera movement:

```javascript
startCameraTour() {
    const positions = [
        { x: 100, y: 50, z: 100 },
        { x: -100, y: 50, z: 100 },
        { x: 0, y: 100, z: 50 }
    ];

    let index = 0;
    setInterval(() => {
        const pos = positions[index % positions.length];
        gsap.to(this.camera.position, {
            x: pos.x,
            y: pos.y,
            z: pos.z,
            duration: 3,
            ease: 'power2.inOut'
        });
        index++;
    }, 5000);
}
```

### Particle Effects

Add particles when hovering nodes:

```javascript
createHoverParticles(position) {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({ color: 0x667eea, size: 2 });

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(
            position.x + (Math.random() - 0.5) * 10,
            position.y + (Math.random() - 0.5) * 10,
            position.z + (Math.random() - 0.5) * 10
        );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(particles, 3));
    const particleSystem = new THREE.Points(geometry, material);
    this.scene.add(particleSystem);

    // Animate and remove
    setTimeout(() => this.scene.remove(particleSystem), 1000);
}
```

---

## 10. Next Steps

Phase 4 complete! Your portfolio now has an immersive 3D exploration experience.

**Ready for:**
- **Phase 5**: AR Viewer Integration (model-viewer)
- **Phase 6**: GSAP Page Transitions (Barba.js/Swup)
- **Phase 7**: Performance Optimization & Polish

---

**Pro tip**: Start with 5-10 projects in the constellation. Too many can be overwhelming. Focus on meaningful connections that tell a story about your work evolution.
