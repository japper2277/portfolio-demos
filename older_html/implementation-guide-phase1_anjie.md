# Phase 1: Project Setup - Advanced Portfolio Implementation

This guide covers the foundational setup for implementing the advanced portfolio features from `v2_plan.txt`.

---

## 1. Dependencies Installation

### Option A: NPM Installation (Recommended for production)

```bash
# Initialize package.json if you haven't already
npm init -y

# Core animation and interaction libraries
npm install gsap
npm install three
npm install barba.js
npm install swup

# Optional: 3D force-directed graph (for constellation feature)
npm install d3-force-3d

# Optional: AR viewer (Google's model-viewer)
npm install @google/model-viewer

# Development dependencies
npm install -D vite  # Modern build tool with hot reload
```

### Option B: CDN Links (Quick testing)

Add these to your HTML `<head>`:

```html
<!-- GSAP Core + Plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Observer.min.js"></script>

<!-- Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- Barba.js (Page transitions) -->
<script src="https://unpkg.com/@barba/core"></script>

<!-- Model Viewer (AR) -->
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
```

---

## 2. Recommended Folder Structure

```
work-projects/
├── index.html                 # Main portfolio page
├── case-study.html           # Template for project pages
├── assets/
│   ├── images/
│   │   ├── projects/         # Project thumbnails
│   │   ├── genesis/          # Artwork timeline images
│   │   └── portraits/        # Profile photos
│   ├── models/               # 3D models (.glb, .gltf)
│   └── videos/               # Demo videos
├── scripts/
│   ├── main.js               # Entry point
│   ├── genesis-viewer.js     # Interactive Genesis feature
│   ├── constellation.js      # 3D portfolio constellation
│   ├── annotations.js        # Director's cut annotations
│   ├── transitions.js        # Page transitions setup
│   └── utils.js              # Helper functions
├── styles/
│   ├── main.css              # Global styles
│   ├── variables.css         # CSS custom properties
│   ├── genesis.css           # Genesis viewer styles
│   ├── constellation.css     # 3D constellation styles
│   └── annotations.css       # Annotation styles
└── data/
├── projects.json         # Portfolio project data
├── genesis-timeline.json # Artwork evolution data
└── annotations.json      # Commentary data
```

**Create the structure:**

```bash
mkdir -p assets/{images/{projects,genesis,portraits},models,videos}
mkdir -p scripts styles data
```

---

## 3. Base HTML Template

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Creative portfolio showcasing immersive digital experiences">

<title>Your Name - Creative Portfolio</title>

<!-- Preload critical assets -->
<link rel="preload" as="script" href="scripts/main.js">

<!-- Styles -->
<link rel="stylesheet" href="styles/variables.css">
<link rel="stylesheet" href="styles/main.css">

<!-- GSAP (CDN for now) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
<!-- Barba.js wrapper for smooth page transitions -->
<div data-barba="wrapper">
    <div data-barba="container" data-barba-namespace="home">

        <!-- Navigation -->
        <nav class="main-nav">
            <a href="/" class="logo">Your Name</a>
            <ul class="nav-links">
                <li><a href="#work">Work</a></li>
                <li><a href="#genesis">Genesis</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </nav>

        <!-- Hero Section -->
        <section class="hero">
            <h1 class="hero-title">Creative Developer</h1>
            <p class="hero-subtitle">Crafting immersive digital experiences</p>
        </section>

        <!-- Portfolio Grid (placeholder) -->
        <section id="work" class="portfolio-grid">
            <!-- Projects will be loaded here -->
        </section>

        <!-- Interactive Genesis Section (placeholder) -->
        <section id="genesis" class="genesis-viewer">
            <!-- Timeline will be loaded here -->
        </section>

        <!-- 3D Constellation (placeholder) -->
        <section id="constellation" class="constellation-container">
            <canvas id="constellation-canvas"></canvas>
        </section>

    </div>
</div>

<!-- Scripts -->
<script type="module" src="scripts/main.js"></script>
</body>
</html>
```

---

## 4. CSS Variables Setup

Create `styles/variables.css`:

```css
:root {
/* Colors */
--color-primary: #000000;
--color-secondary: #ffffff;
--color-accent: #0066ff;
--color-text: #1a1a1a;
--color-text-muted: #666666;
--color-bg: #ffffff;
--color-surface: #f5f5f5;

/* Typography */
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Inter', sans-serif; /* or your preferred font */

--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.25rem;
--font-size-xl: 1.5rem;
--font-size-2xl: 2rem;
--font-size-3xl: 3rem;

/* Spacing */
--spacing-xs: 0.5rem;
--spacing-sm: 1rem;
--spacing-md: 2rem;
--spacing-lg: 4rem;
--spacing-xl: 6rem;

/* Layout */
--container-max-width: 1400px;
--grid-gap: 2rem;

/* Animation */
--transition-fast: 0.2s ease;
--transition-base: 0.4s ease;
--transition-slow: 0.6s ease;

/* Z-index layers */
--z-nav: 100;
--z-modal: 200;
--z-overlay: 300;
}

/* Dark mode (optional) */
@media (prefers-color-scheme: dark) {
:root {
    --color-primary: #ffffff;
    --color-secondary: #000000;
    --color-text: #e0e0e0;
    --color-text-muted: #999999;
    --color-bg: #0a0a0a;
    --color-surface: #1a1a1a;
}
}
```

---

## 5. Base CSS Styles

Create `styles/main.css`:

```css
/* Reset & Base Styles */
*, *::before, *::after {
box-sizing: border-box;
margin: 0;
padding: 0;
}

html {
scroll-behavior: smooth;
}

body {
font-family: var(--font-primary);
font-size: var(--font-size-base);
line-height: 1.6;
color: var(--color-text);
background-color: var(--color-bg);
overflow-x: hidden;
}

/* Navigation */
.main-nav {
position: fixed;
top: 0;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
padding: var(--spacing-sm) var(--spacing-md);
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(10px);
z-index: var(--z-nav);
border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.logo {
font-weight: 600;
font-size: var(--font-size-lg);
text-decoration: none;
color: var(--color-primary);
}

.nav-links {
display: flex;
gap: var(--spacing-md);
list-style: none;
}

.nav-links a {
text-decoration: none;
color: var(--color-text);
transition: color var(--transition-fast);
}

.nav-links a:hover {
color: var(--color-accent);
}

/* Hero Section */
.hero {
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: 0 var(--spacing-md);
}

.hero-title {
font-size: var(--font-size-3xl);
font-weight: 700;
margin-bottom: var(--spacing-sm);
opacity: 0; /* Will animate in with GSAP */
}

.hero-subtitle {
font-size: var(--font-size-xl);
color: var(--color-text-muted);
opacity: 0; /* Will animate in with GSAP */
}

/* Portfolio Grid (basic setup) */
.portfolio-grid {
max-width: var(--container-max-width);
margin: var(--spacing-xl) auto;
padding: 0 var(--spacing-md);
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: var(--grid-gap);
}

/* Placeholder sections */
.genesis-viewer,
.constellation-container {
min-height: 100vh;
padding: var(--spacing-xl) var(--spacing-md);
}

.constellation-container {
position: relative;
}

#constellation-canvas {
width: 100%;
height: 100vh;
}

/* Responsive */
@media (max-width: 768px) {
.hero-title {
    font-size: var(--font-size-2xl);
}

.hero-subtitle {
    font-size: var(--font-size-lg);
}

.nav-links {
    gap: var(--spacing-sm);
}
}
```

---

## 6. JavaScript Module Setup

Create `scripts/main.js`:

```javascript
// scripts/main.js

// GSAP Setup
gsap.registerPlugin(ScrollTrigger);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
console.log('Portfolio initialized');

// Hero animation
initHeroAnimation();

// Other initializations will go here:
// - initGenesisViewer()
// - initConstellation()
// - initAnnotations()
// - initPageTransitions()
});

/**
 * Animate hero section elements on load
 */
function initHeroAnimation() {
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

tl.to('.hero-title', {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.5
})
.to('.hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 1
}, '-=0.5'); // Start 0.5s before previous animation ends
}

/**
 * Utility: Fetch JSON data
 */
async function fetchData(url) {
try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
} catch (error) {
    console.error('Error fetching data:', error);
    return null;
}
}

// Export for use in other modules (if using ES modules)
export { fetchData };
```

---

## 7. Sample Data Structure

Create `data/projects.json`:

```json
{
"projects": [
    {
        "id": "project-1",
        "title": "Project Title",
        "category": "Web Design",
        "thumbnail": "assets/images/projects/project-1.jpg",
        "description": "Brief project description",
        "tags": ["UI/UX", "Interactive"],
        "year": 2024,
        "link": "case-study.html?project=project-1",
        "featured": true
    }
]
}
```

Create `data/genesis-timeline.json`:

```json
{
"timeline": [
    {
        "id": "genesis-1",
        "title": "Initial Concept",
        "date": "2023-01",
        "image": "assets/images/genesis/concept-1.jpg",
        "description": "The first sketch and conceptual exploration",
        "iterations": 3,
        "techniques": ["Pencil sketching", "Digital painting"]
    }
]
}
```

---

## 8. Verification Checklist

Before moving to Phase 2, ensure:

- [ ] All dependencies installed (npm or CDN links working)
- [ ] Folder structure created
- [ ] `index.html` loads without errors
- [ ] CSS variables defined in `variables.css`
- [ ] Base styles rendering correctly
- [ ] Console shows "Portfolio initialized" message
- [ ] Hero animation works (title and subtitle fade in)
- [ ] Navigation is fixed at top
- [ ] Responsive design works on mobile (test with DevTools)

---

## 9. Quick Test

Start a local server:

```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node.js (if you have it)
npx serve

# Option 3: VS Code Live Server extension
# Right-click index.html > "Open with Live Server"
```

Visit `http://localhost:8000` and verify everything loads correctly.

---

## Next Steps

Once Phase 1 is complete, you'll be ready for:
- **Phase 2**: Interactive Genesis (Artwork Timeline)
- **Phase 3**: Director's Cut Annotations
- **Phase 4**: 3D Portfolio Constellation

---

## Troubleshooting

**Issue**: GSAP animations not working
- Check browser console for errors
- Verify GSAP script loads before main.js
- Ensure elements have initial opacity: 0 in CSS

**Issue**: Styles not applying
- Clear browser cache
- Check CSS file paths
- Verify variables.css loads before main.css

**Issue**: Module import errors
- If using ES modules, add `type="module"` to script tag
- Check file paths are correct
- Use a local server (not file://)

---

**Ready to proceed?** Once this foundation is solid, we can implement the advanced features!
