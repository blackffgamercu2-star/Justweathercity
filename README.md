# RainWatch.in - Hyperlocal Weather Platform for India

A fast, SEO-first weather platform built with Next.js, TypeScript, and Tailwind CSS. Provides real-time weather data, forecasts, and air quality information for Indian cities with embeddable widgets and automated content generation.

## Features

- **Real-time Weather Data**: Updated every 15 minutes using Open-Meteo API
- **Hyperlocal Coverage**: 200+ Indian cities with precise lat/lon coordinates
- **SEO-Optimized**: Dynamic meta tags, JSON-LD structured data, auto-generated sitemaps
- **Embeddable Widgets**: Copy-paste weather widgets for websites
- **Air Quality Index**: PM2.5, PM10, NO₂, O₃, SO₂ data
- **7-Day Forecasts**: Hourly and daily forecasts with precipitation probability
- **Caching**: Vercel Edge Cache + in-memory caching for performance
- **Rate Limiting**: Built-in API rate limiting (30 req/min per IP)
- **AI Content Pipeline**: Protected endpoint for automated draft generation

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui, Lucide icons
- **Charts**: Recharts
- **API**: Open-Meteo (weather), Open-Meteo AQI (air quality)
- **Caching**: Vercel Edge Cache, Node Cache
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## Project Structure

\`\`\`
rainwatch-in/
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── sitemap.ts               # Dynamic sitemap
│   ├── robots.ts                # Robots.txt
│   ├── weather/
│   │   └── in/[city]/           # Dynamic city weather pages
│   ├── widgets/                 # Widget generator
│   ├── widget/[city]/           # Embeddable widget
│   └── api/
│       ├── forecast/            # Weather API proxy
│       └── generate-article/    # AI draft generation
├── lib/
│   ├── types.ts                 # TypeScript types
│   ├── weather-api.ts           # Open-Meteo integration
│   ├── cache.ts                 # Caching utilities
│   ├── cities.ts                # City metadata
│   └── db.ts                    # Database utilities
├── components/                  # shadcn/ui components
├── public/                      # Static assets
└── scripts/
    └── seed-cities.ts           # City data seeding
\`\`\`

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

\`\`\`bash
# Clone repository
git clone https://github.com/yourusername/rainwatch-in.git
cd rainwatch-in

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
\`\`\`

### Environment Variables

\`\`\`env
# API Keys
ADMIN_API_KEY=your-admin-key-here

# Optional: For production AI content generation
OPENAI_API_KEY=your-openai-key
GEMINI_API_KEY=your-gemini-key

# Vercel
VERCEL_TOKEN=your-vercel-token
VERCEL_ORG_ID=your-org-id
VERCEL_PROJECT_ID=your-project-id
\`\`\`

### Development

\`\`\`bash
# Start dev server
npm run dev

# Open http://localhost:3000
\`\`\`

### Build & Deploy

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel (automatic via GitHub Actions)
git push origin main
\`\`\`

## API Endpoints

### GET /api/forecast

Get weather data for a city or coordinates.

**Query Parameters:**
- `city` (string): City slug (e.g., "delhi")
- OR `lat` (number) & `lon` (number): Coordinates

**Response:**
\`\`\`json
{
  "city_id": "delhi-in",
  "name": "Delhi",
  "lat": 28.6139,
  "lon": 77.2090,
  "current": {
    "temp_c": 32.5,
    "feels_like_c": 34.0,
    "condition": "Partly cloudy",
    "humidity": 60,
    "wind_kmh": 12,
    "precip_mm_last_1h": 0,
    "uv_index": 8,
    "visibility_km": 10
  },
  "hourly": [...],
  "daily": [...],
  "aqi": {...},
  "updated_at": "2025-10-21T05:30:00Z",
  "source": "open-meteo"
}
\`\`\`

### POST /api/generate-article

Generate AI draft article for a city (protected).

**Headers:**
- `x-api-key`: Admin API key

**Body:**
\`\`\`json
{
  "city": "delhi",
  "type": "city-intro"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "draft": {
    "id": 1234567890,
    "city_id": "delhi-in",
    "title": "Delhi Weather Today...",
    "meta_description": "...",
    "intro": "...",
    "faqs": [...],
    "status": "draft",
    "created_at": "2025-10-21T05:30:00Z"
  }
}
\`\`\`

## Widget Integration

### iFrame Embed

\`\`\`html
<iframe 
  src="https://rainwatch.in/widget/delhi" 
  width="400" 
  height="300" 
  frameborder="0" 
  style="border: none; border-radius: 8px;">
</iframe>
\`\`\`

### JavaScript Embed

\`\`\`html
<script src="https://rainwatch.in/widget.js"></script>
<div class="rainwatch-widget" data-city="delhi"></div>
\`\`\`

## Admin Operations

### Add a New City

1. Edit `lib/cities.ts` and add city to `CITIES` array:

\`\`\`typescript
{
  id: 'new-city-in',
  name: 'New City',
  state: 'State',
  lat: 28.1234,
  lon: 77.5678,
  population: 1000000,
  timezone: 'Asia/Kolkata',
  aliases: [],
  slug: 'new-city'
}
\`\`\`

2. Commit and push to trigger deployment

### Generate AI Draft

\`\`\`bash
curl -X POST https://rainwatch.in/api/generate-article \
  -H "x-api-key: your-admin-key" \
  -H "Content-Type: application/json" \
  -d '{"city": "delhi", "type": "city-intro"}'
\`\`\`

### Rotate API Keys

1. Update `ADMIN_API_KEY` in environment variables
2. Redeploy to Vercel

### Monitor Performance

- **Google Search Console**: Track impressions, clicks, crawl errors
- **Google Analytics 4**: Monitor user behavior, traffic sources
- **Vercel Analytics**: Track Core Web Vitals, performance metrics
- **Sentry**: Error tracking and monitoring

## SEO Checklist

- [x] Dynamic meta tags per city page
- [x] JSON-LD structured data (WebPage + FAQ)
- [x] Auto-generated sitemap.xml
- [x] robots.txt with proper rules
- [x] Canonical URLs
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Mobile-responsive design
- [x] Core Web Vitals optimization
- [ ] Internal linking strategy
- [ ] Backlink outreach (widgets + data stories)
- [ ] Local SEO optimization

## Performance Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **API Response**: < 500ms (cached)
- **Cache Hit Rate**: > 80%

## Roadmap

### Phase 1 (MVP - 14 days)
- [x] Core city pages with SSR/ISR
- [x] API proxy with caching
- [x] SEO infrastructure
- [x] Basic widgets
- [x] Deployment to Vercel

### Phase 2 (30 days)
- [ ] 200 city pages with QA
- [ ] Push notifications
- [ ] Telegram bot integration
- [ ] Backlink strategy execution
- [ ] Data-driven blog posts

### Phase 3 (60+ days)
- [ ] 5,000+ city pages
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Partnerships with local services

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues, questions, or suggestions:
- GitHub Issues: [Create an issue](https://github.com/yourusername/rainwatch-in/issues)
- Email: support@rainwatch.in
- Twitter: [@rainwatchin](https://twitter.com/rainwatchin)

## Acknowledgments

- Weather data: [Open-Meteo](https://open-meteo.com)
- UI Components: [shadcn/ui](https://ui.shadcn.com)
- Icons: [Lucide React](https://lucide.dev)
- Deployment: [Vercel](https://vercel.com)

---

**RainWatch.in** - Hyperlocal Weather for India
