# RainWatch.in - Deployment Guide

Complete step-by-step guide to deploy RainWatch.in to Vercel with Cloudflare DNS.

## Prerequisites

- GitHub account with repository access
- Vercel account (free tier available)
- Cloudflare account for DNS management
- Domain: rainwatch.in (or your domain)

## Step 1: Prepare Repository

### 1.1 Create GitHub Repository

\`\`\`bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: RainWatch.in MVP"

# Create repository on GitHub
# Then push:
git remote add origin https://github.com/yourusername/rainwatch-in.git
git branch -M main
git push -u origin main
\`\`\`

### 1.2 Add Environment Variables

Create `.env.local` for local development:

\`\`\`env
ADMIN_API_KEY=dev-key-change-in-production
\`\`\`

## Step 2: Deploy to Vercel

### 2.1 Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your `rainwatch-in` repository
5. Click "Import"

### 2.2 Configure Project Settings

**Framework**: Next.js (auto-detected)

**Build Settings**:
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm ci`

**Environment Variables**:
- Add `ADMIN_API_KEY` with a strong value
- Add any other required variables

### 2.3 Deploy

Click "Deploy" and wait for build to complete.

**Vercel will provide:**
- Deployment URL: `https://rainwatch-in.vercel.app`
- Production URL: (after domain setup)

## Step 3: Setup Custom Domain

### 3.1 Add Domain to Vercel

1. Go to Vercel Dashboard → Project Settings → Domains
2. Click "Add Domain"
3. Enter `rainwatch.in`
4. Vercel will show nameserver instructions

### 3.2 Update Cloudflare DNS

1. Go to [cloudflare.com](https://cloudflare.com)
2. Add your domain (if not already added)
3. Go to DNS settings
4. Update nameservers to Vercel's:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

### 3.3 Verify Domain

- Wait 24-48 hours for DNS propagation
- Vercel will automatically verify and issue SSL certificate
- Your site will be live at `https://rainwatch.in`

## Step 4: Configure Cloudflare

### 4.1 SSL/TLS Settings

1. Go to Cloudflare Dashboard → SSL/TLS
2. Set SSL/TLS encryption mode to "Full (strict)"
3. Enable "Always Use HTTPS"

### 4.2 Performance Settings

1. Go to Caching → Configuration
2. Set Browser Cache TTL to "1 month"
3. Enable "Automatic HTTPS Rewrites"

### 4.3 Security Settings

1. Go to Security → WAF
2. Enable "Web Application Firewall"
3. Set Security Level to "Medium"

### 4.4 Page Rules

Create page rules for optimization:

**Rule 1: Cache API Responses**
- URL: `rainwatch.in/api/*`
- Cache Level: Cache Everything
- Browser Cache TTL: 10 minutes

**Rule 2: Bypass Cache for Admin**
- URL: `rainwatch.in/api/generate-article`
- Cache Level: Bypass

## Step 5: Setup Monitoring

### 5.1 Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://rainwatch.in`
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://rainwatch.in/sitemap.xml`

### 5.2 Google Analytics 4

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create new property for `rainwatch.in`
3. Get Measurement ID
4. Add to environment variables: `NEXT_PUBLIC_GA_ID`

### 5.3 Sentry Error Tracking

1. Go to [sentry.io](https://sentry.io)
2. Create new project (Next.js)
3. Get DSN
4. Add to environment variables: `SENTRY_DSN`

## Step 6: Setup CI/CD

### 6.1 GitHub Actions

Workflows are already configured in `.github/workflows/`

**Deploy workflow** (`deploy.yml`):
- Runs on push to `main` or `staging`
- Lints code
- Builds project
- Deploys to Vercel

**SEO workflow** (`seo-check.yml`):
- Validates sitemap
- Checks JSON-LD

### 6.2 Configure Vercel Secrets

Add to Vercel project settings:

\`\`\`
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
\`\`\`

Get these from:
- Vercel Dashboard → Settings → Tokens
- Vercel Dashboard → Project Settings

## Step 7: Staging Environment

### 7.1 Create Staging Branch

\`\`\`bash
git checkout -b staging
git push origin staging
\`\`\`

### 7.2 Create Staging Project in Vercel

1. Go to Vercel Dashboard
2. Create new project from same repository
3. Set to deploy from `staging` branch
4. Name it `rainwatch-in-staging`

### 7.3 Test Before Production

- Deploy to staging first
- Test all features
- Run Lighthouse audit
- Check SEO with Rich Results Test
- Then merge to main for production

## Step 8: Post-Deployment Checklist

### 8.1 Verify Deployment

- [ ] Site loads at `https://rainwatch.in`
- [ ] HTTPS certificate is valid
- [ ] Home page renders correctly
- [ ] City pages work (e.g., `/weather/in/delhi`)
- [ ] API endpoints respond (e.g., `/api/forecast?city=delhi`)
- [ ] Widgets load correctly
- [ ] Sitemap is accessible (`/sitemap.xml`)
- [ ] Robots.txt is correct (`/robots.txt`)

### 8.2 SEO Verification

- [ ] Meta tags are dynamic per page
- [ ] JSON-LD is valid (use [Rich Results Test](https://search.google.com/test/rich-results))
- [ ] Open Graph tags work (test on [Facebook Debugger](https://developers.facebook.com/tools/debug/))
- [ ] Sitemap submitted to Google Search Console
- [ ] Mobile-friendly (test on [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly))

### 8.3 Performance Verification

- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] API response time < 500ms

### 8.4 Security Verification

- [ ] HTTPS enabled
- [ ] Security headers present
- [ ] CSP headers configured
- [ ] No sensitive data in logs
- [ ] API keys not exposed

## Step 9: Monitoring & Maintenance

### 9.1 Daily Checks

\`\`\`bash
# Check deployment status
curl https://rainwatch.in/api/forecast?city=delhi

# Check sitemap
curl https://rainwatch.in/sitemap.xml

# Check robots.txt
curl https://rainwatch.in/robots.txt
\`\`\`

### 9.2 Weekly Reviews

- Check Google Search Console for errors
- Review Google Analytics traffic
- Monitor Vercel Analytics for performance
- Check Sentry for errors

### 9.3 Monthly Tasks

- Rotate API keys
- Review and optimize slow pages
- Update city data if needed
- Backup database
- Review security logs

## Troubleshooting

### Domain Not Resolving

\`\`\`bash
# Check DNS propagation
nslookup rainwatch.in

# Check Vercel nameservers
dig rainwatch.in NS
\`\`\`

**Fix**: Wait 24-48 hours for DNS propagation

### Build Failing

1. Check Vercel build logs
2. Verify environment variables are set
3. Test locally: `npm run build`
4. Check for TypeScript errors: `npm run lint`

### Performance Issues

1. Check Vercel Analytics
2. Review slow API endpoints
3. Verify cache headers
4. Check Cloudflare cache hit rate

### SSL Certificate Issues

1. Verify domain ownership in Vercel
2. Check Cloudflare SSL settings
3. Clear Cloudflare cache
4. Wait for certificate renewal (automatic)

## Rollback Procedure

If deployment has critical issues:

\`\`\`bash
# Revert to previous commit
git revert HEAD
git push origin main

# Vercel will automatically redeploy
\`\`\`

Or manually in Vercel Dashboard:
1. Go to Deployments
2. Find previous successful deployment
3. Click "Promote to Production"

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Cloudflare Docs**: https://developers.cloudflare.com/
- **GitHub Actions**: https://docs.github.com/en/actions

---

**Deployment Date**: October 21, 2025
**Status**: Ready for Production
