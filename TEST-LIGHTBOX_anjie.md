# Portfolio Lightbox Testing Guide

## The Problem
Portfolio grid items are not opening the lightbox when clicked.

## Root Cause
The portfolio uses **ES6 modules** which require a web server to work. Opening the HTML file directly (file://) will cause module loading errors.

## Solution: Use a Local Server

### Start the Server
```bash
cd /Users/jaredapper/Desktop/Work\ projects
python3 -m http.server 8000
```

### Access the Site
Open your browser and go to:
```
http://localhost:8000/ultimate-portfolio.html
```

**DO NOT** open the HTML file directly by double-clicking it!

## How to Verify It's Working

1. **Open Chrome DevTools** (Cmd+Option+I or F12)
2. **Check the Console** - you should see:
   ```
   Loaded portfolio data: X items
   Portfolio app initialized successfully
   ```
3. **Click any portfolio grid item** - the lightbox should smoothly expand

## If Still Not Working

Check browser console for errors:
- ❌ "Failed to load module" → Server not running
- ❌ "Failed to fetch" → Data file path issue
- ✅ "Portfolio app initialized" → Everything is working!

## Alternative: Use Python or Node

### Python (any version)
```bash
python3 -m http.server 8000
# or
python -m SimpleHTTPServer 8000
```

### Node.js (if installed)
```bash
npx http-server -p 8000
```

### VS Code Live Server
If using VS Code:
1. Install "Live Server" extension
2. Right-click `ultimate-portfolio.html`
3. Select "Open with Live Server"

---

**Current Server Status:** Running on port 8000
**Test URL:** http://localhost:8000/ultimate-portfolio.html
