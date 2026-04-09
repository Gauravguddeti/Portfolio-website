# 🚀 Deployment Guide

Your award-worthy portfolio is ready to go live! Here are the best deployment options:

## Option 1: Vercel (Recommended) ⭐

Vercel is made by the Next.js team and offers the best performance.

### Method A: GitHub Integration (Easiest)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Gaurav Guddeti Portfolio"
   git branch -M main
   git remote add origin https://github.com/Gauravguddeti/portfolio.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

3. **Automatic Deployments**:
   - Every push to main branch auto-deploys
   - Preview deployments for pull requests
   - Custom domain support

### Method B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Your site will be live at: `https://your-project.vercel.app`

### Custom Domain (Optional):

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `gauravguddeti.com`
3. Update DNS records as shown
4. SSL certificate auto-configured

## Option 2: Netlify

Great alternative with similar features.

### Deploy Steps:

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

Or use GitHub integration like Vercel.

### Configuration:

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Option 3: GitHub Pages (Free)

For static export only.

### Setup:

1. **Update `next.config.mjs`**:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   
   export default nextConfig
   ```

2. **Build and export**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   # Install gh-pages
   npm i -D gh-pages
   
   # Add to package.json scripts:
   "deploy": "gh-pages -d out"
   
   # Deploy
   npm run deploy
   ```

Your site will be at: `https://gauravguddeti.github.io/portfolio`

⚠️ **Note**: Some features might not work with static export (like API routes).

## Option 4: AWS Amplify

Enterprise-grade with AWS integration.

### Steps:

1. Push code to GitHub
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
3. Connect your repository
4. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
5. Deploy

## Option 5: Your Own Server

For full control.

### Requirements:
- Node.js 18+ installed
- Process manager (PM2)
- Nginx (optional)

### Setup:

1. **Transfer files to server**:
   ```bash
   scp -r ./* user@yourserver:/var/www/portfolio
   ```

2. **Install dependencies**:
   ```bash
   ssh user@yourserver
   cd /var/www/portfolio
   npm install
   npm run build
   ```

3. **Run with PM2**:
   ```bash
   npm i -g pm2
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

4. **Nginx reverse proxy** (optional):
   ```nginx
   server {
       listen 80;
       server_name gauravguddeti.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Performance Optimization

### Before Deploying:

1. **Optimize images**:
   ```bash
   # Install sharp for image optimization
   npm install sharp
   ```

2. **Check bundle size**:
   ```bash
   npm run build
   # Look for bundle size warnings
   ```

3. **Update environment variables** (if any):
   - Create `.env.production`
   - Add to deployment platform

### After Deploying:

1. **Test Lighthouse Score**:
   - Open DevTools
   - Go to Lighthouse tab
   - Run audit
   - Target: 90+ score

2. **Check Core Web Vitals**:
   - LCP (Largest Contentful Paint): < 2.5s
   - FID (First Input Delay): < 100ms
   - CLS (Cumulative Layout Shift): < 0.1

## Domain Setup

### Buy a Domain:
- Namecheap: `gauravguddeti.com`
- Google Domains
- GoDaddy

### Configure DNS:

For Vercel/Netlify:
```
Type: A
Name: @
Value: [Platform IP]

Type: CNAME
Name: www
Value: [Platform domain]
```

## Analytics Setup

### Vercel Analytics (Already included):
```typescript
// app/layout.tsx (already added)
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Google Analytics (Optional):

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get measurement ID (G-XXXXXXXXXX)
3. Add to your site:

```typescript
// app/layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

## Environment Variables

If you add API integrations later:

### Vercel:
1. Settings → Environment Variables
2. Add key-value pairs
3. Redeploy

### Access in code:
```typescript
const apiKey = process.env.NEXT_PUBLIC_API_KEY
```

## Monitoring

### Vercel Dashboard:
- Analytics
- Web Vitals
- Deployments
- Logs

### Setup Alerts:
- Email notifications for failed deployments
- Performance degradation alerts

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All images display
- [ ] Interactive hero works
- [ ] All links functional
- [ ] Mobile responsive
- [ ] Forms work (if any)
- [ ] Analytics tracking
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Lighthouse score 90+
- [ ] Shared on LinkedIn/Twitter

## SEO Setup

Add `robots.txt`:
```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://gauravguddeti.com/sitemap.xml
```

Add `sitemap.xml`:
```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gauravguddeti.com</loc>
    <lastmod>2026-02-27</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

Update meta tags in `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: "Gaurav Guddeti - AI Engineer & Full-Stack Developer",
  description: "Portfolio showcasing AI/ML projects, full-stack development...",
  keywords: ["AI Engineer", "Machine Learning", "Full-Stack Developer", ...],
  openGraph: {
    title: "Gaurav Guddeti - AI Engineer",
    description: "Building intelligent solutions...",
    url: "https://gauravguddeti.com",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Guddeti - AI Engineer",
    description: "Building intelligent solutions...",
  },
}
```

## Cost Estimates

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| **Vercel** | Unlimited personal projects | $20/mo Pro |
| **Netlify** | 100GB bandwidth/mo | $19/mo Pro |
| **AWS Amplify** | 12 months free tier | Pay per use |
| **GitHub Pages** | Free forever | Free |
| **VPS** | N/A | $5-50/mo |

## Recommendation

**For your portfolio**: Use **Vercel**
- ✅ Free for personal projects
- ✅ Best Next.js performance
- ✅ Automatic optimizations
- ✅ Easy custom domain
- ✅ Analytics included
- ✅ Zero configuration

**Simple deployment**:
```bash
# One command
vercel --prod
```

Your portfolio will be live in 2 minutes! 🚀

---

**Questions?** Check the main README.md or reach out!

**Ready to launch?** Follow Option 1 above! 🎉
