# Phase 6: GSAP Page Transitions & Advanced Animations

This guide implements **seamless page transitions** using Barba.js + GSAP and **advanced scroll-triggered animations** using ScrollTrigger. These features create a fluid, app-like experience with no page reloads or jarring jumps.

---

## Overview

**What it does:**
- **Page Transitions**: Smooth animated transitions between pages without full reload
- **Scroll Animations**: Elements animate into view as you scroll
- **Parallax Effects**: Background elements move at different speeds
- **Pinned Sections**: Sections stick while other content scrolls
- **Timeline Animations**: Complex sequential animation sequences

**User Experience:**
```
Click link → Current page fades out
         ↓
         New page content loads in background
         ↓
         New page animates in
         (No white flash, no page reload)

Scroll down → Elements fade/slide into view
           → Parallax backgrounds move
           → Counters animate
           → Images reveal
```

---

## 1. Dependencies

Ensure you have these (from Phase 1):

```html
<!-- GSAP + ScrollTrigger -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- Barba.js -->
<script src="https://unpkg.com/@barba/core"></script>
```

Or via NPM:

```bash
npm install gsap @barba/core
```

---

## 2. Page Transitions with Barba.js

### HTML Structure

Every page needs this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/transitions.css">
</head>
<body>

    <!-- Barba Wrapper (stays on every page) -->
    <div data-barba="wrapper">

        <!-- Navigation (persists across pages) -->
        <nav class="main-nav">
            <a href="/" class="logo">Portfolio</a>
            <ul>
                <li><a href="/work.html">Work</a></li>
                <li><a href="/about.html">About</a></li>
                <li><a href="/contact.html">Contact</a></li>
            </ul>
        </nav>

        <!-- Barba Container (this content changes per page) -->
        <div data-barba="container" data-barba-namespace="home">

            <!-- Your page content here -->
            <section class="hero">
                <h1>Welcome</h1>
            </section>

        </div>

    </div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://unpkg.com/@barba/core"></script>
    <script src="scripts/transitions.js"></script>
</body>
</html>
```

**Important:**
- `data-barba="wrapper"` wraps everything (only one per page)
- `data-barba="container"` wraps content that changes (only one per page)
- `data-barba-namespace="home"` identifies the page type (use different names for different page types)

### CSS Setup

Create `styles/transitions.css`:

```css
/* ============================================
   PAGE TRANSITION STYLES
   ============================================ */

/* Prevent flash of unstyled content during transition */
html.is-changing .transition-fade {
    transition: opacity 0.25s;
    opacity: 1;
}

html.is-animating .transition-fade {
    opacity: 0;
}

/* Transition overlay (optional) */
.page-transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-primary);
    z-index: 9999;
    pointer-events: none;
    transform: scaleY(0);
    transform-origin: bottom;
}

/* Loading indicator during transition */
.page-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
    opacity: 0;
    pointer-events: none;
}

.page-loading.active {
    opacity: 1;
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Prevent scroll during transition */
html.is-animating {
    overflow: hidden;
}
```

### JavaScript Implementation

Create `scripts/transitions.js`:

```javascript
// scripts/transitions.js

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize Barba.js
barba.init({
    // Enable debug mode (remove in production)
    debug: true,

    // Prevent default page caching behavior
    cacheIgnore: false,

    // Define transitions
    transitions: [
        {
            name: 'default-transition',

            // Before leaving current page
            async leave(data) {
                const done = this.async();

                // Fade out animation
                gsap.to(data.current.container, {
                    opacity: 0,
                    y: -50,
                    duration: 0.5,
                    ease: 'power2.in',
                    onComplete: done
                });
            },

            // After new page enters
            async enter(data) {
                const done = this.async();

                // Reset scroll position
                window.scrollTo(0, 0);

                // Fade in animation
                gsap.from(data.next.container, {
                    opacity: 0,
                    y: 50,
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: done
                });
            },

            // After transition completes
            after(data) {
                // Re-initialize any scripts needed for new page
                initScrollAnimations();
            }
        }
    ],

    // Views - run code when specific pages load
    views: [
        {
            namespace: 'home',
            beforeEnter() {
                console.log('Entering home page');
                // Home-specific initialization
            }
        },
        {
            namespace: 'work',
            beforeEnter() {
                console.log('Entering work page');
                // Work page-specific initialization
            }
        }
    ]
});

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    // Kill previous ScrollTriggers to avoid duplicates
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Fade in elements on scroll
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
}

// Initialize on first page load
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
});
```

---

## 3. Advanced Transition Effects

### Slide Transition

```javascript
{
    name: 'slide-transition',

    leave(data) {
        const done = this.async();
        gsap.to(data.current.container, {
            x: '-100%',
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: done
        });
    },

    enter(data) {
        const done = this.async();
        window.scrollTo(0, 0);

        gsap.from(data.next.container, {
            x: '100%',
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: done
        });
    }
}
```

### Overlay Wipe Transition

```javascript
{
    name: 'overlay-transition',

    async leave(data) {
        const done = this.async();

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);

        // Animate overlay in
        await gsap.to(overlay, {
            scaleY: 1,
            duration: 0.5,
            ease: 'power2.inOut'
        });

        done();
    },

    async enter(data) {
        const done = this.async();
        window.scrollTo(0, 0);

        const overlay = document.querySelector('.page-transition-overlay');

        // Fade in new content
        gsap.from(data.next.container, {
            opacity: 0,
            duration: 0.3
        });

        // Animate overlay out
        await gsap.to(overlay, {
            scaleY: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            transformOrigin: 'top',
            delay: 0.2
        });

        overlay.remove();
        done();
    }
}
```

### Scale & Fade Transition

```javascript
{
    name: 'scale-transition',

    leave(data) {
        const done = this.async();
        gsap.to(data.current.container, {
            scale: 0.9,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: done
        });
    },

    enter(data) {
        const done = this.async();
        window.scrollTo(0, 0);

        gsap.from(data.next.container, {
            scale: 1.1,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: done
        });
    }
}
```

---

## 4. Page-Specific Transitions

Use `once` for transitions that only apply between specific pages:

```javascript
transitions: [
    {
        name: 'home-to-work',
        from: { namespace: 'home' },
        to: { namespace: 'work' },

        leave(data) {
            // Special animation from home to work
        },
        enter(data) {
            // Special animation entering work
        }
    },
    {
        name: 'default',
        // Fallback for all other transitions
        leave(data) { /* ... */ },
        enter(data) { /* ... */ }
    }
]
```

---

## 5. Advanced ScrollTrigger Animations

### Parallax Effect

```javascript
// Parallax background
gsap.to('.parallax-bg', {
    y: 300,
    ease: 'none',
    scrollTrigger: {
        trigger: '.parallax-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true // Tied to scroll position
    }
});
```

### Pin Section While Scrolling

```javascript
ScrollTrigger.create({
    trigger: '.pinned-section',
    start: 'top top',
    end: '+=500', // Pin for 500px of scroll
    pin: true,
    pinSpacing: true
});
```

### Horizontal Scroll Section

```javascript
const sections = gsap.utils.toArray('.horizontal-section');

gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
        trigger: '.horizontal-container',
        pin: true,
        scrub: 1,
        end: () => '+=' + document.querySelector('.horizontal-container').offsetWidth
    }
});
```

### Stagger Animation on Scroll

```javascript
gsap.from('.project-card', {
    opacity: 0,
    y: 100,
    stagger: 0.2, // 0.2s delay between each card
    duration: 1,
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 70%'
    }
});
```

### Counter Animation

```javascript
function animateCounter(element, target) {
    const obj = { value: 0 };

    gsap.to(obj, {
        value: target,
        duration: 2,
        ease: 'power1.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 80%'
        },
        onUpdate: () => {
            element.textContent = Math.round(obj.value);
        }
    });
}

// Usage
animateCounter(document.querySelector('.counter-projects'), 150);
animateCounter(document.querySelector('.counter-clients'), 50);
```

### Text Reveal (Split by Lines)

```javascript
// Split text into lines (you may need SplitText plugin or manual split)
const lines = element.querySelectorAll('.line');

gsap.from(lines, {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.8,
    scrollTrigger: {
        trigger: element,
        start: 'top 75%'
    }
});
```

### Image Reveal with Mask

```javascript
gsap.from('.image-reveal img', {
    scale: 1.2,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.image-reveal',
        start: 'top 75%'
    }
});

gsap.from('.image-reveal .mask', {
    scaleX: 0,
    transformOrigin: 'left',
    duration: 1.2,
    ease: 'power2.inOut',
    scrollTrigger: {
        trigger: '.image-reveal',
        start: 'top 75%'
    }
});
```

---

## 6. Complete Example: Scroll Animations Suite

Add these classes to your HTML elements:

```javascript
// scripts/scroll-animations.js

function initAllScrollAnimations() {
    // Kill old triggers
    ScrollTrigger.getAll().forEach(t => t.kill());

    // 1. Fade in from bottom
    gsap.utils.toArray('.fade-in').forEach(el => {
        gsap.from(el, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // 2. Fade in from left
    gsap.utils.toArray('.fade-in-left').forEach(el => {
        gsap.from(el, {
            opacity: 0,
            x: -50,
            duration: 1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%'
            }
        });
    });

    // 3. Fade in from right
    gsap.utils.toArray('.fade-in-right').forEach(el => {
        gsap.from(el, {
            opacity: 0,
            x: 50,
            duration: 1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%'
            }
        });
    });

    // 4. Scale in
    gsap.utils.toArray('.scale-in').forEach(el => {
        gsap.from(el, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
                trigger: el,
                start: 'top 80%'
            }
        });
    });

    // 5. Rotate in
    gsap.utils.toArray('.rotate-in').forEach(el => {
        gsap.from(el, {
            rotation: 15,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%'
            }
        });
    });

    // 6. Stagger children
    gsap.utils.toArray('.stagger-children').forEach(container => {
        gsap.from(container.children, {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.8,
            scrollTrigger: {
                trigger: container,
                start: 'top 75%'
            }
        });
    });

    // 7. Progress bar on scroll
    gsap.utils.toArray('.progress-bar').forEach(bar => {
        const progress = bar.querySelector('.progress-fill');
        const percentage = bar.getAttribute('data-percentage') || 80;

        gsap.to(progress, {
            width: `${percentage}%`,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%'
            }
        });
    });

    // 8. Parallax backgrounds
    gsap.utils.toArray('.parallax').forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.5;

        gsap.to(el, {
            y: () => (1 - parseFloat(speed)) * ScrollTrigger.maxScroll(window),
            ease: 'none',
            scrollTrigger: {
                start: 0,
                end: 'max',
                invalidateOnRefresh: true,
                scrub: 0
            }
        });
    });

    ScrollTrigger.refresh();
}

// Call on load and after Barba transitions
document.addEventListener('DOMContentLoaded', initAllScrollAnimations);
```

---

## 7. HTML Usage Examples

```html
<!-- Fade in from bottom -->
<section class="fade-in">
    <h2>This fades in</h2>
</section>

<!-- Fade from sides -->
<div class="fade-in-left">
    <img src="image.jpg" alt="">
</div>

<div class="fade-in-right">
    <p>Content from right</p>
</div>

<!-- Scale animation -->
<div class="scale-in">
    <div class="card">Card content</div>
</div>

<!-- Stagger children -->
<div class="stagger-children projects-grid">
    <div class="project-card">Project 1</div>
    <div class="project-card">Project 2</div>
    <div class="project-card">Project 3</div>
</div>

<!-- Progress bar -->
<div class="progress-bar" data-percentage="75">
    <div class="progress-fill"></div>
</div>

<!-- Parallax -->
<div class="parallax" data-speed="0.5">
    <img src="background.jpg" alt="">
</div>
```

---

## 8. Accessibility: Reduced Motion

Respect user preferences:

```javascript
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
        // Disable complex animations
        gsap.globalTimeline.timeScale(100); // Speed up to nearly instant

        // Or disable entirely
        ScrollTrigger.getAll().forEach(trigger => {
            trigger.kill();
        });
    }
}

// Check on load
handleReducedMotion();

// Listen for changes
prefersReducedMotion.addEventListener('change', handleReducedMotion);
```

CSS approach:

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

---

## 9. Performance Optimization

### Use will-change wisely

```css
.element-that-animates {
    will-change: transform, opacity;
}

/* Remove after animation */
.element-that-animates.animated {
    will-change: auto;
}
```

### Use transforms instead of position

```javascript
// Good (GPU accelerated)
gsap.to(element, { x: 100, y: 50 });

// Bad (causes reflow)
gsap.to(element, { left: '100px', top: '50px' });
```

### Debounce scroll events

```javascript
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
```

---

## 10. Testing Checklist

- [ ] Page transitions work without white flash
- [ ] Scroll position resets to top on page change
- [ ] Navigation links trigger transitions correctly
- [ ] Browser back/forward buttons work
- [ ] ScrollTrigger animations fire at correct scroll positions
- [ ] Animations don't duplicate on multiple page visits
- [ ] Reduced motion preference is respected
- [ ] Mobile performance is acceptable (30+ FPS)
- [ ] Animations work in all target browsers
- [ ] Console shows no errors during transitions

---

## 11. Troubleshooting

**Issue**: Animations duplicate after navigating between pages
- Kill old ScrollTriggers before creating new ones
- Use `ScrollTrigger.getAll().forEach(t => t.kill())`

**Issue**: Page transition gets stuck
- Check browser console for errors
- Ensure `done()` is called in async transitions
- Add timeout fallback: `setTimeout(done, 1000)`

**Issue**: Scroll position doesn't reset
- Add `window.scrollTo(0, 0)` in enter transition
- Check for `overflow: hidden` on body

**Issue**: ScrollTrigger animations fire immediately
- Check `start` trigger position (should be `'top 80%'` or similar)
- Verify trigger element exists in DOM
- Call `ScrollTrigger.refresh()` after DOM changes

**Issue**: Barba doesn't intercept links
- Ensure links have no `target="_blank"`
- Check links are relative (not absolute external URLs)
- Verify `data-barba="wrapper"` wraps navigation

**Issue**: Janky/laggy animations
- Use `will-change: transform` in CSS
- Reduce number of animated elements
- Use simpler easing functions
- Lower `scrub` value in ScrollTrigger

---

## 12. Alternative: Swup.js (Lighter Option)

If Barba.js feels heavy, try Swup:

```html
<script src="https://unpkg.com/swup@latest/dist/swup.min.js"></script>

<script>
const swup = new Swup({
    plugins: []
});

swup.on('contentReplaced', () => {
    initScrollAnimations();
});
</script>
```

---

## 13. Next Steps

Phase 6 complete! Your portfolio now has:
- ✅ Seamless page transitions
- ✅ Advanced scroll animations
- ✅ Parallax effects
- ✅ Accessible motion

**Ready for:**
- **Phase 7**: Performance Optimization & Image Loading
- **Phase 8**: SEO, Analytics & Final Polish

---

**Pro tip**: Don't overdo animations. Subtle, purposeful motion enhances UX. Too much becomes distracting. Test with real users to find the right balance.
