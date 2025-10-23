# RainWatch.in - Admin & Operations Guide

Complete guide for managing RainWatch.in platform, including city management, API key rotation, content publishing, and monitoring.

## Table of Contents

1. [City Management](#city-management)
2. [API Key Management](#api-key-management)
3. [Content Publishing Workflow](#content-publishing-workflow)
4. [Monitoring & Analytics](#monitoring--analytics)
5. [Troubleshooting](#troubleshooting)

## City Management

### Adding a New City

**Step 1: Update City Database**

Edit `lib/cities.ts`:

\`\`\`typescript
export const CITIES: City[] = [
  // ... existing cities ...
  {
    id: 'new-city-state',
    name: 'New City',
    state: 'State Name',
    lat: 28.1234,
    lon: 77.5678,
    population: 1500000,
    timezone: 'Asia/Kolkata',
    aliases: ['Alternative Name'],
    slug: 'new-city'
  }
]
\`\`\`

**Step 2: Verify Coordinates**

- Use Google Maps to get accurate lat/lon
- Verify timezone (usually Asia/Kolkata for India)
- Add common aliases (e.g., "Bengaluru" for "Bangalore")

**Step 3: Deploy**

\`\`\`bash
git add lib/cities.ts
git commit -m "Add New City to database"
git push origin main
\`\`\`

The city page will be automatically available at `/weather/in/new-city`

### Bulk City Import

For importing 200+ cities:

\`\`\`bash
# Run seed script
node scripts/seed-cities.ts > cities-data.json

# Review and merge into lib/cities.ts
\`\`\`

### City Metadata Updates

To update population, timezone, or aliases:

1. Edit `lib/cities.ts`
2. Commit and push
3. Vercel will auto-redeploy

## API Key Management

### Initial Setup

1. Generate a strong API key:
\`\`\`bash
openssl rand -hex 32
\`\`\`

2. Add to Vercel environment variables:
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add `ADMIN_API_KEY=your-generated-key`

3. Redeploy project

### Rotating API Keys

**Step 1: Generate New Key**
\`\`\`bash
openssl rand -hex 32
\`\`\`

**Step 2: Update in Vercel**
- Vercel Dashboard → Environment Variables
- Update `ADMIN_API_KEY` value
- Redeploy

**Step 3: Notify Team**
- Share new key securely (1Password, LastPass, etc.)
- Revoke old key from all systems

### API Key Security

- Never commit keys to Git
- Use environment variables only
- Rotate keys every 90 days
- Monitor API usage for suspicious activity

## Content Publishing Workflow

### AI Draft Generation

**Step 1: Generate Draft**

\`\`\`bash
curl -X POST https://rainwatch.in/api/generate-article \
  -H "x-api-key: your-admin-key" \
  -H "Content-Type: application/json" \
  -d '{
    "city": "delhi",
    "type": "city-intro"
  }'
\`\`\`

**Step 2: Review Draft**

- Check title for SEO keywords
- Verify meta description (max 155 chars)
- Review intro text for accuracy
- Validate FAQs for relevance

**Step 3: Edit & Approve**

- Make necessary edits
- Ensure no hallucinated data
- Add local insights if needed
- Mark as "approved" in CMS

**Step 4: Publish**

- Set status to "published"
- Verify page renders correctly
- Check JSON-LD in Rich Results Test
- Submit to Google Search Console

### Content Quality Checklist

- [ ] Title includes city name + weather keywords
- [ ] Meta description is 150-160 characters
- [ ] Intro mentions state and population
- [ ] FAQs are relevant and accurate
- [ ] No duplicate content with other cities
- [ ] Links to related cities (internal linking)
- [ ] Updated timestamp is current
- [ ] JSON-LD is valid

### Blog Post Publishing

For data-driven blog posts:

1. Create in `/app/blog/[slug]/page.tsx`
2. Add JSON-LD for Article schema
3. Include internal links to city pages
4. Add author bio and publication date
5. Submit to Google Search Console

## Monitoring & Analytics

### Google Search Console

**Setup:**
1. Verify domain ownership
2. Submit sitemap: `https://rainwatch.in/sitemap.xml`
3. Monitor crawl errors
4. Track search performance

**Weekly Review:**
- Check impressions and clicks
- Monitor average position for top keywords
- Review crawl errors
- Check mobile usability

### Google Analytics 4

**Key Metrics to Track:**
- Users by city page
- Bounce rate by page
- Average session duration
- Widget embed clicks
- Conversion events (newsletter signup, etc.)

**Setup Events:**
\`\`\`typescript
// Track widget embeds
gtag('event', 'widget_embed', {
  city: 'delhi',
  widget_type: 'iframe'
})

// Track city page views
gtag('event', 'city_page_view', {
  city: 'delhi'
})
\`\`\`

### Vercel Analytics

**Monitor:**
- Core Web Vitals (LCP, FID, CLS)
- Response times
- Error rates
- Deployment status

**Access:**
- Vercel Dashboard → Analytics
- Set alerts for performance degradation

### Sentry Error Tracking

**Setup:**
1. Create Sentry project
2. Add `SENTRY_DSN` to environment variables
3. Monitor errors in real-time

**Common Issues:**
- API rate limiting
- Weather API timeouts
- Cache failures
- Invalid city slugs

## Troubleshooting

### City Page Not Showing

**Check:**
1. City slug is correct (lowercase, hyphens)
2. City exists in `lib/cities.ts`
3. Coordinates are valid (lat: -90 to 90, lon: -180 to 180)
4. Timezone is valid (Asia/Kolkata for India)

**Fix:**
\`\`\`bash
# Verify city in database
grep "delhi" lib/cities.ts

# Check page renders
curl https://rainwatch.in/weather/in/delhi
\`\`\`

### API Returning 404

**Check:**
1. City slug is correct
2. API key is valid (if protected endpoint)
3. Rate limit not exceeded

**Fix:**
\`\`\`bash
# Test API
curl "https://rainwatch.in/api/forecast?city=delhi"

# Check rate limit
curl -H "x-api-key: your-key" https://rainwatch.in/api/forecast?city=delhi
\`\`\`

### Slow Page Load

**Check:**
1. Cache hit rate (check X-Cache header)
2. API response time
3. Core Web Vitals in Vercel Analytics

**Fix:**
\`\`\`bash
# Clear cache
curl -X POST https://rainwatch.in/api/cache/clear \
  -H "x-api-key: your-key"

# Check cache headers
curl -I https://rainwatch.in/weather/in/delhi
\`\`\`

### Sitemap Not Updating

**Check:**
1. Sitemap generation runs on deploy
2. New cities are in `lib/cities.ts`
3. Vercel build logs for errors

**Fix:**
\`\`\`bash
# Manually trigger build
vercel --prod

# Resubmit sitemap to GSC
# Google Search Console → Sitemaps → Resubmit
\`\`\`

## Performance Optimization

### Cache Strategy

- **City pages**: 10 minutes (ISR)
- **API responses**: 10 minutes
- **Static assets**: 1 year
- **Sitemap**: 24 hours

### Database Optimization

For production (Postgres/Firestore):

\`\`\`sql
-- Create indexes
CREATE INDEX idx_cities_slug ON cities(slug);
CREATE INDEX idx_cities_state ON cities(state);
CREATE INDEX idx_articles_city_id ON articles(city_id);
\`\`\`

### CDN Configuration

Cloudflare settings:
- Enable Caching
- Set cache level to "Cache Everything"
- Add page rules for API endpoints
- Enable compression (gzip, brotli)

## Backup & Recovery

### Database Backup

\`\`\`bash
# Backup cities data
pg_dump rainwatch_db > backup-$(date +%Y%m%d).sql

# Restore from backup
psql rainwatch_db < backup-20251021.sql
\`\`\`

### Disaster Recovery

1. Keep Git repository as source of truth
2. Regular database backups (daily)
3. Test recovery procedures monthly
4. Document all manual changes

## Security Checklist

- [ ] API keys rotated every 90 days
- [ ] HTTPS enabled on all endpoints
- [ ] CSP headers configured
- [ ] Rate limiting active
- [ ] Admin endpoints protected
- [ ] Database backups encrypted
- [ ] Monitoring alerts configured
- [ ] Incident response plan documented

---

**Last Updated**: October 21, 2025
**Maintained By**: RainWatch.in Team
