# Getting Started with RainWatch.in

## 1. Clone & Setup (2 minutes)

\`\`\`bash
# Clone repository
git clone https://github.com/yourusername/rainwatch-in.git
cd rainwatch-in

# Run startup script
chmod +x STARTUP.sh
./STARTUP.sh

# Or manually:
npm install
cp .env.example .env.local
\`\`\`

## 2. Start Development Server (1 minute)

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## 3. Explore the App (5 minutes)

### Home Page
- Search for cities
- View featured cities
- See feature highlights

### City Weather Pages
- Visit `/weather/in/delhi`
- View real-time weather
- Check 7-day forecast
- See air quality data

### API Endpoints
\`\`\`bash
# Get weather for a city
curl "http://localhost:3000/api/forecast?city=delhi"

# Get weather by coordinates
curl "http://localhost:3000/api/forecast?lat=28.6139&lon=77.209"
\`\`\`

### Widget Generator
- Visit `/widgets`
- Select a city
- Copy embed code
- Test on external site

### AI Draft Generation
\`\`\`bash
curl -X POST http://localhost:3000/api/generate-article \
  -H "x-api-key: dev-key-change-in-production" \
  -H "Content-Type: application/json" \
  -d '{"city": "delhi", "type": "city-intro"}'
\`\`\`

## 4. Add More Cities (5 minutes)

Edit `lib/cities.ts`:

\`\`\`typescript
export const CITIES: City[] = [
  // ... existing cities ...
  {
    id: 'bangalore-in',
    name: 'Bangalore',
    state: 'Karnataka',
    lat: 12.9716,
    lon: 77.5946,
    population: 8436675,
    timezone: 'Asia/Kolkata',
    aliases: ['Bengaluru'],
    slug: 'bangalore'
  }
]
\`\`\`

Restart dev server and visit `/weather/in/bangalore`

## 5. Deploy to Vercel (10 minutes)

### Option A: Using Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

### Option B: Using GitHub

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variables
5. Deploy

## 6. Setup Custom Domain (5 minutes)

1. Go to Vercel Dashboard → Project Settings → Domains
2. Add `rainwatch.in`
3. Update Cloudflare nameservers
4. Wait 24-48 hours for DNS propagation

## 7. Monitor & Optimize (Ongoing)

### Google Search Console
1. Verify domain
2. Submit sitemap
3. Monitor search performance

### Google Analytics
1. Create GA4 property
2. Add tracking ID to `.env.local`
3. Monitor user behavior

### Sentry
1. Create Sentry project
2. Add DSN to `.env.local`
3. Monitor errors

## Common Tasks

### Add a New City
\`\`\`bash
# Edit lib/cities.ts
# Add city to CITIES array
# Restart dev server
\`\`\`

### Generate AI Draft
\`\`\`bash
curl -X POST http://localhost:3000/api/generate-article \
  -H "x-api-key: your-admin-key" \
  -H "Content-Type: application/json" \
  -d '{"city": "delhi", "type": "city-intro"}'
\`\`\`

### Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

### Run Linter
\`\`\`bash
npm run lint
\`\`\`

## Troubleshooting

### Port 3000 Already in Use
\`\`\`bash
npm run dev -- -p 3001
\`\`\`

### Clear Cache
\`\`\`bash
rm -rf .next
npm run dev
\`\`\`

### TypeScript Errors
\`\`\`bash
npm run lint
\`\`\`

### API Not Responding
- Check if dev server is running
- Verify city slug is correct
- Check browser console for errors

## Next Steps

1. **Read Documentation**
   - [README.md](./README.md) - Full docs
   - [ADMIN.md](./ADMIN.md) - Admin guide
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy guide

2. **Customize**
   - Add your cities
   - Update branding
   - Configure analytics

3. **Deploy**
   - Push to GitHub
   - Deploy to Vercel
   - Setup custom domain

4. **Grow**
   - Add blog posts
   - Create widgets
   - Outreach for backlinks

## Support

- GitHub Issues: [Create issue](https://github.com/yourusername/rainwatch-in/issues)
- Email: support@rainwatch.in
- Twitter: @rainwatchin

---

**Happy coding!** 🚀
