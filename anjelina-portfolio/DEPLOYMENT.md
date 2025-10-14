# Deployment Guide - Anjie Portfolio

## ✅ Build Status

**Production build successful!**

All pages are pre-rendered and ready for deployment:
- Homepage: 111 KB First Load JS
- About page: 110 KB First Load JS
- Contact page: 105 KB First Load JS

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd /Users/jaredapper/Desktop/Anjie/anjelina-portfolio
vercel

# Follow prompts:
# ? Set up and deploy? Yes
# ? Which scope? [Your account]
# ? Link to existing project? No
# ? What's your project's name? anjelina-portfolio
# ? In which directory is your code? ./
# ? Want to modify settings? No

# Deploy to production
vercel --prod
```

### Option 2: Deploy via GitHub + Vercel Dashboard

1. **Push to GitHub:**
   ```bash
   cd /Users/jaredapper/Desktop/Anjie/anjelina-portfolio
   git init (if not already initialized)
   git add .
   git commit -m "Portfolio ready for deployment"
   git remote add origin https://github.com/YOUR_USERNAME/anjelina-portfolio.git
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard:**
   - Go to https://vercel.com/dashboard
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

### Configure Environment Variables (Optional - for Sanity CMS)

When you have real Sanity credentials, add them in Vercel:

1. Go to your project in Vercel Dashboard
2. Settings → Environment Variables
3. Add these variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=your_read_token
   ```

## Deploy to Other Platforms

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Custom Server (VPS/AWS/DigitalOcean)

```bash
# Build the app
npm run build

# Start production server
npm run start

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "portfolio" -- start
pm2 save
pm2 startup
```

## Custom Domain Setup

### On Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., jaredapper.com)
3. Update DNS records at your domain registrar:
   - Add A record: `76.76.21.21`
   - Add CNAME record: `cname.vercel-dns.com`
4. Wait for DNS propagation (5-60 minutes)

## Performance Optimization Checklist

- ✅ Static page generation enabled
- ✅ Image optimization configured (Next.js Image component)
- ✅ CSS bundled and minified
- ✅ JavaScript code-split by route
- ✅ First Load JS under 150KB per page
- ⚠️ Unsplash images will 404 (replace with real Sanity images)

## Post-Deployment Tasks

1. **Test all pages:**
   - Homepage with filmstrip viewer
   - About page with bio
   - Contact page with email/social links
   - Navigation between pages

2. **Run Lighthouse audit:**
   - Open DevTools → Lighthouse
   - Target scores: 90+ in all categories

3. **Test on mobile devices:**
   - Responsive design
   - Touch interactions on filmstrip

4. **Connect real Sanity CMS:**
   - Get Sanity Project ID and API Token
   - Update environment variables
   - Redeploy

5. **Update content:**
   - Upload real artwork images to Sanity Studio
   - Update artist bio and contact info
   - Test CMS changes reflect on site

## Troubleshooting

### Build fails on Vercel
- Check build logs for specific errors
- Ensure all environment variables are set
- Verify `package.json` has correct dependencies

### Images not loading
- Check `next.config.ts` has correct image domains
- Verify Sanity CDN hostname is allowed
- Check environment variables are correct

### Slow page loads
- Optimize images in Sanity (use smaller sizes)
- Check network tab in DevTools
- Verify CDN caching is working

## Next Steps

1. **Connect Sanity CMS** - Replace mock data with real content
2. **Upload artwork** - Add real images to Sanity Studio
3. **SEO optimization** - Add meta tags, sitemap, robots.txt
4. **Analytics** - Add Vercel Analytics or Google Analytics
5. **Newsletter** - Add email signup form

---

**Current Status:** Ready for production deployment! 🚀

**Demo:** http://localhost:3000 (local build)

**Last Updated:** 2025-10-13
