# Phase 7: Performance Optimization & Image Loading

This guide covers **performance optimization** techniques to ensure your portfolio loads fast, ranks well in search engines, and provides an excellent user experience across all devices and connections.

---

## Overview

**Why performance matters:**
- **First impressions**: Users abandon sites that take > 3 seconds to load
- **SEO**: Google ranks faster sites higher
- **Conversions**: Every 100ms delay = ~1% drop in conversions
- **Mobile users**: Many visitors have slow connections
- **Professionalism**: Fast sites signal quality and attention to detail

**Target metrics (Core Web Vitals):**
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## 1. Image Optimization

Images are typically 50-90% of page weight. Optimizing them is the biggest performance win.

### Lazy Loading (Native)

Use the native `loading="lazy"` attribute:

```html
<img
    src="project-image.jpg"
    alt="Project description"
    loading="lazy"
    width="800"
    height="600"
>
```

**Benefits:**
- Defers loading images below the fold
- Saves bandwidth
- No JavaScript required

**Always specify width/height** to prevent layout shift!

### Lazy Loading (JavaScript - Advanced)

For more control, use Intersection Observer:

```javascript
// scripts/lazy-load.js

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.config = {
            rootMargin: '50px 0px', // Start loading 50px before entering viewport
            threshold: 0.01
        };

        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, self) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        self.unobserve(entry.target);
                    }
                });
            }, this.config);

            this.images.forEach(img => observer.observe(img));
        } else {
            // Fallback: load all images immediately
            this.images.forEach(img => this.loadImage(img));
        }
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        const srcset = img.getAttribute('data-srcset');

        if (!src) return;

        // Show loading placeholder
        img.classList.add('loading');

        // Create new image to preload
        const tempImg = new Image();

        tempImg.onload = () => {
            img.src = src;
            if (srcset) img.srcset = srcset;
            img.classList.remove('loading');
            img.classList.add('loaded');
        };

        tempImg.onerror = () => {
            img.classList.add('error');
        };

        tempImg.src = src;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new LazyLoader();
});
```

**HTML usage:**

```html
<img
    data-src="full-image.jpg"
    data-srcset="image-400w.jpg 400w, image-800w.jpg 800w"
    src="placeholder.jpg"
    alt="Description"
    class="lazy-image"
    width="800"
    height="600"
>
```

**CSS for loading states:**

```css
.lazy-image {
    opacity: 1;
    transition: opacity 0.3s;
}

.lazy-image.loading {
    opacity: 0.5;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

.lazy-image.loaded {
    opacity: 1;
}

@keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
```

### Responsive Images (srcset)

Serve different image sizes based on screen width:

```html
<img
    src="image-800w.jpg"
    srcset="
        image-400w.jpg 400w,
        image-800w.jpg 800w,
        image-1200w.jpg 1200w,
        image-1600w.jpg 1600w
    "
    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
    alt="Project image"
    loading="lazy"
>
```

**How it works:**
- Browser picks the best image based on screen width and pixel density
- Saves bandwidth on mobile devices

### Modern Image Formats (WebP/AVIF)

Use the `<picture>` element for format fallbacks:

```html
<picture>
    <!-- Modern formats (best compression) -->
    <source srcset="image.avif" type="image/avif">
    <source srcset="image.webp" type="image/webp">

    <!-- Fallback for older browsers -->
    <img
        src="image.jpg"
        alt="Project image"
        loading="lazy"
        width="800"
        height="600"
    >
</picture>
```

**Benefits:**
- WebP: 25-35% smaller than JPEG
- AVIF: 50% smaller than JPEG (newer format)

### Blur-up Technique (LQIP - Low Quality Image Placeholder)

Show a tiny blurred image while full image loads:

```html
<div class="image-wrapper">
    <img
        src="tiny-blur.jpg"
        class="placeholder"
        aria-hidden="true"
    >
    <img
        data-src="full-image.jpg"
        alt="Project"
        class="full-image lazy-image"
        loading="lazy"
    >
</div>
```

```css
.image-wrapper {
    position: relative;
    overflow: hidden;
}

.placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(20px);
    transform: scale(1.1);
    transition: opacity 0.3s;
}

.full-image.loaded ~ .placeholder {
    opacity: 0;
}

.full-image {
    position: relative;
    z-index: 1;
}
```

### Image Compression Tools

**Command-line:**
```bash
# Install imagemagick
brew install imagemagick

# Convert to WebP
magick input.jpg -quality 85 output.webp

# Batch convert
magick mogrify -format webp -quality 85 *.jpg
```

**Online tools:**
- **TinyPNG**: Excellent lossy compression
- **Squoosh**: Google's web app with format conversion
- **ImageOptim**: Mac app for batch optimization

**Build tools:**
```bash
npm install imagemin imagemin-webp imagemin-mozjpeg
```

---

## 2. Critical CSS

Inline critical CSS in `<head>` to eliminate render-blocking:

```html
<head>
    <!-- Inline critical CSS -->
    <style>
        /* Only the CSS needed for above-the-fold content */
        body { margin: 0; font-family: sans-serif; }
        .hero { min-height: 100vh; }
        .nav { position: fixed; top: 0; }
    </style>

    <!-- Load full CSS asynchronously -->
    <link rel="preload" href="styles/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="styles/main.css"></noscript>
</head>
```

**Extract critical CSS:**
```bash
npm install critical

# Generate critical CSS
npx critical index.html --base . --inline --minify
```

---

## 3. Font Loading Optimization

### Use font-display

```css
@font-face {
    font-family: 'CustomFont';
    src: url('font.woff2') format('woff2');
    font-display: swap; /* Show fallback font immediately */
    font-weight: normal;
}
```

**font-display options:**
- `swap`: Show fallback immediately, swap when custom font loads
- `optional`: Use custom font only if it loads very quickly
- `fallback`: Brief block period, then swap

### Preload Critical Fonts

```html
<link
    rel="preload"
    href="fonts/custom-font.woff2"
    as="font"
    type="font/woff2"
    crossorigin
>
```

### System Font Stack (Fastest)

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                 Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}
```

### Variable Fonts

Use variable fonts to reduce the number of font files:

```css
@font-face {
    font-family: 'InterVariable';
    src: url('Inter-Variable.woff2') format('woff2');
    font-weight: 100 900; /* All weights in one file */
    font-display: swap;
}
```

---

## 4. Resource Hints

### Preconnect to External Domains

```html
<head>
    <!-- Connect to CDNs early -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
</head>
```

### Prefetch Next Page

```html
<!-- Prefetch the work page when hovering over link -->
<script>
    document.querySelector('a[href="/work.html"]').addEventListener('mouseenter', () => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = '/work.html';
        document.head.appendChild(link);
    }, { once: true });
</script>
```

### DNS Prefetch

```html
<link rel="dns-prefetch" href="https://analytics.google.com">
```

---

## 5. JavaScript Optimization

### Defer Non-Critical Scripts

```html
<!-- Defer execution until after page load -->
<script src="non-critical.js" defer></script>

<!-- Or async for independent scripts -->
<script src="analytics.js" async></script>
```

**Difference:**
- `defer`: Executes in order after HTML parsing
- `async`: Executes as soon as downloaded (order not guaranteed)

### Code Splitting

Only load JavaScript needed for current page:

```javascript
// Dynamic imports
button.addEventListener('click', async () => {
    const module = await import('./heavy-feature.js');
    module.init();
});
```

### Minification

```bash
# Install terser
npm install terser -g

# Minify JavaScript
terser input.js -o output.min.js -c -m
```

---

## 6. Service Worker (Offline Caching)

Basic service worker for caching assets:

```javascript
// service-worker.js

const CACHE_NAME = 'portfolio-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/styles/main.css',
    '/scripts/main.js',
    '/images/logo.svg'
];

// Install - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
});

// Fetch - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// Activate - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
});
```

**Register service worker:**

```javascript
// In your main.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker registered'))
        .catch(err => console.log('Service Worker error:', err));
}
```

---

## 7. Core Web Vitals Optimization

### LCP (Largest Contentful Paint) - Target: < 2.5s

**Optimize:**
- Preload hero image: `<link rel="preload" as="image" href="hero.jpg">`
- Use CDN for images
- Reduce server response time
- Eliminate render-blocking resources

### FID (First Input Delay) - Target: < 100ms

**Optimize:**
- Minimize JavaScript execution time
- Break up long tasks
- Use web workers for heavy computation
- Defer non-critical JavaScript

### CLS (Cumulative Layout Shift) - Target: < 0.1

**Prevent:**
- Always set width/height on images
- Reserve space for ads/embeds
- Avoid inserting content above existing content
- Use CSS `aspect-ratio` for responsive elements

```css
.image-container {
    aspect-ratio: 16 / 9;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

---

## 8. Mobile Optimization

### Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Touch Target Size

```css
/* Minimum 44x44px touch targets */
button, a {
    min-width: 44px;
    min-height: 44px;
    padding: 12px;
}
```

### Reduce Animations on Mobile

```javascript
const isMobile = window.innerWidth < 768;

if (isMobile) {
    // Simplify or disable heavy animations
    gsap.globalTimeline.timeScale(2); // Speed up
}
```

### Optimize for 3G/4G

Test your site on slower connections:

```javascript
// Detect connection speed
if ('connection' in navigator) {
    const connection = navigator.connection;

    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        // Load lower quality images
        document.body.classList.add('slow-connection');
    }
}
```

---

## 9. Build Tools & Bundling

### Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true // Remove console.logs in production
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': ['gsap', 'three'],
                    'utils': ['./src/utils']
                }
            }
        }
    }
});
```

### Asset Versioning

Add hash to filenames for cache busting:

```javascript
// vite.config.js
export default {
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name].[hash].js',
                chunkFileNames: 'assets/[name].[hash].js',
                assetFileNames: 'assets/[name].[hash].[ext]'
            }
        }
    }
};
```

---

## 10. CDN & Hosting

### Recommended Static Hosts

1. **Vercel**: Automatic CDN, instant deploys
2. **Netlify**: Great for static sites, built-in forms
3. **Cloudflare Pages**: Fast global CDN
4. **GitHub Pages**: Free for public repos
5. **Render**: Easy setup, generous free tier

### CDN for Images

Use image CDN for automatic optimization:

```html
<!-- Using Cloudinary -->
<img src="https://res.cloudinary.com/demo/image/upload/w_800,f_auto,q_auto/sample.jpg">
```

**Benefits:**
- Automatic format conversion (WebP/AVIF)
- Automatic compression
- Responsive images
- Global CDN

---

## 11. Performance Testing Tools

### Lighthouse

```bash
# Install
npm install -g lighthouse

# Run audit
lighthouse https://yoursite.com --view
```

Or use Chrome DevTools → Lighthouse tab.

### WebPageTest

https://www.webpagetest.org

- Test from multiple locations
- Visual comparison
- Filmstrip view

### Chrome DevTools Performance

1. Open DevTools → Performance tab
2. Click Record
3. Interact with page
4. Stop recording
5. Analyze bottlenecks

### Core Web Vitals Check

https://pagespeed.web.dev

Enter your URL for instant analysis.

---

## 12. Performance Checklist

**Images:**
- [ ] All images have width/height attributes
- [ ] Images use loading="lazy"
- [ ] Responsive images with srcset
- [ ] Modern formats (WebP/AVIF) with fallbacks
- [ ] Images compressed to < 200KB each
- [ ] Hero image preloaded

**CSS:**
- [ ] Critical CSS inlined
- [ ] Non-critical CSS loaded asynchronously
- [ ] CSS minified
- [ ] Unused CSS removed

**JavaScript:**
- [ ] Scripts have defer/async attributes
- [ ] JavaScript minified
- [ ] Code splitting implemented
- [ ] Third-party scripts loaded asynchronously

**Fonts:**
- [ ] Fonts use font-display: swap
- [ ] Critical fonts preloaded
- [ ] WOFF2 format used
- [ ] Consider system fonts

**General:**
- [ ] Service worker caching static assets
- [ ] Gzip/Brotli compression enabled
- [ ] Resource hints (preconnect) added
- [ ] HTTP/2 or HTTP/3 enabled
- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

---

## 13. Real-World Example

Complete optimized image setup:

```html
<picture>
    <source
        type="image/avif"
        srcset="
            project-400w.avif 400w,
            project-800w.avif 800w,
            project-1200w.avif 1200w
        "
        sizes="(max-width: 768px) 100vw, 800px"
    >
    <source
        type="image/webp"
        srcset="
            project-400w.webp 400w,
            project-800w.webp 800w,
            project-1200w.webp 1200w
        "
        sizes="(max-width: 768px) 100vw, 800px"
    >
    <img
        src="project-800w.jpg"
        srcset="
            project-400w.jpg 400w,
            project-800w.jpg 800w,
            project-1200w.jpg 1200w
        "
        sizes="(max-width: 768px) 100vw, 800px"
        alt="Project showcase"
        loading="lazy"
        width="800"
        height="600"
        decoding="async"
    >
</picture>
```

---

## 14. Monitoring Performance

### Setup Performance Monitoring

```javascript
// Track Core Web Vitals
import {getCLS, getFID, getLCP} from 'web-vitals';

function sendToAnalytics({name, value, id}) {
    // Send to your analytics provider
    gtag('event', name, {
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        event_label: id,
        non_interaction: true,
    });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

### Performance Budget

Set budgets to prevent regressions:

```json
{
    "budgets": [
        {
            "resourceSizes": [
                { "resourceType": "script", "budget": 300 },
                { "resourceType": "image", "budget": 500 },
                { "resourceType": "stylesheet", "budget": 100 }
            ],
            "timings": [
                { "metric": "first-contentful-paint", "budget": 2000 },
                { "metric": "interactive", "budget": 5000 }
            ]
        }
    ]
}
```

---

## 15. Next Steps

Phase 7 complete! Your portfolio is now optimized for speed.

**Ready for:**
- **Phase 8**: SEO, Accessibility & Final Polish

**Key takeaways:**
- Images are your biggest optimization opportunity
- Lazy loading saves bandwidth and improves LCP
- Always test on real devices and slow connections
- Performance is an ongoing process, not a one-time fix

---

**Pro tip**: Performance optimization has diminishing returns. Get the basics right (image optimization, lazy loading, minification) before obsessing over micro-optimizations. Real users won't notice the difference between a 0.9s and 0.8s load time.
