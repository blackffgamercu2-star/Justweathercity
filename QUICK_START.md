# RainWatch.in - Quick Start Guide

Get RainWatch.in running locally in 5 minutes.

## Prerequisites

- Node.js 20+ installed
- npm or pnpm
- Git

## Installation

### 1. Clone Repository

\`\`\`bash
git clone https://github.com/yourusername/rainwatch-in.git
cd rainwatch-in
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
pnpm install
\`\`\`

### 3. Setup Environment

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local`:
\`\`\`env
ADMIN_API_KEY=dev-key-for-testing
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## What's Included

✓ Home page with city search  
✓ Dynamic city weather pages (`/weather/in/[city]`)  
✓ Weather API proxy (`/api/forecast`)  
✓ Embeddable widgets (`/widgets`)  
✓ AI draft generation endpoint (`/api/generate-article`)  
✓ SEO infrastructure (sitemap, robots.txt, JSON-LD)  
✓ 10 major Indian cities pre-configured  

## Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/weather/in/delhi` | City weather page |
| `/weather/in/mumbai` | Another city example |
| `/widgets` | Widget generator |
| `/widget/delhi` | Embeddable widget |
| `/api/forecast?city=delhi` | Weather API |
| `/api/generate-article` | AI draft generation |
| `/sitemap.xml` | SEO sitemap |
| `/robots.txt` | Robots file |

## Testing

### Test Home Page
\`\`\`bash
curl http://localhost:3000
\`\`\`

### Test City Page
\`\`\`bash
curl http://localhost:3000/weather/in/delhi
\`\`\`

### Test API
\`\`\`bash
curl "http://localhost:3000/api/forecast?city=delhi"
\`\`\`

### Test AI Generation
\`\`\`bash
curl -X POST http://localhost:3000/api/generate-article \
  -H "x-api-key: dev-key-for-testing" \
  -H "Content-Type: application/json" \
  -d '{"city": "delhi", "type": "city-intro"}'
\`\`\`

## Add More Cities

Edit `lib/cities.ts`:

\`\`\`typescript
export const CITIES: City[] = [
  // ... existing cities ...
  {
    id: 'new-city-state',
    name: 'New City',
    state: 'State',
    lat: 28.1234,
    lon: 77.5678,
    population: 1000000,
    timezone: 'Asia/Kolkata',
    aliases: [],
    slug: 'new-city'
  }
]
\`\`\`

Then restart dev server.

## Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Deploy to Vercel

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

## Next Steps

1. **Add More Cities**: Edit `lib/cities.ts` to add 200+ cities
2. **Setup Monitoring**: Add Google Analytics and Sentry
3. **Configure Domain**: Point rainwatch.in to Vercel
4. **Create Content**: Add blog posts and data stories
5. **Outreach**: Start widget embed outreach

## Troubleshooting

### Port Already in Use
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

## Documentation

- [README.md](./README.md) - Full documentation
- [ADMIN.md](./ADMIN.md) - Admin operations guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md) - Launch checklist

## Support

- GitHub Issues: [Create an issue](https://github.com/yourusername/rainwatch-in/issues)
- Email: support@rainwatch.in

---

**Happy coding!** 🚀
