import { type NextRequest, NextResponse } from "next/server"
import { getCityBySlugDB } from "@/lib/db"
import { fetchWeatherData } from "@/lib/weather-api"
import { getFromCache, setInCache } from "@/lib/cache"

// Simple rate limiting (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return true
  }

  if (limit.count >= 30) {
    // 30 requests per minute
    return false
  }

  limit.count++
  return true
}

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429, headers: { "Retry-After": "60" } })
    }

    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city")
    const lat = searchParams.get("lat")
    const lon = searchParams.get("lon")

    if (!city && (!lat || !lon)) {
      return NextResponse.json({ error: "Provide either city slug or lat/lon coordinates" }, { status: 400 })
    }

    let weatherData

    if (city) {
      const cityData = await getCityBySlugDB(city)
      if (!cityData) {
        return NextResponse.json({ error: "City not found" }, { status: 404 })
      }

      const cacheKey = `weather:${cityData.id}`
      const cached = getFromCache(cacheKey)

      if (cached) {
        return NextResponse.json(cached, {
          headers: {
            "Cache-Control": "public, max-age=600",
            "X-Cache": "HIT",
          },
        })
      }

      const data = await fetchWeatherData(cityData.lat, cityData.lon, cityData.timezone)
      weatherData = {
        city_id: cityData.id,
        name: cityData.name,
        lat: cityData.lat,
        lon: cityData.lon,
        timezone: cityData.timezone,
        ...data,
      }

      setInCache(cacheKey, weatherData, 600)
    } else {
      const data = await fetchWeatherData(Number.parseFloat(lat!), Number.parseFloat(lon!), "Asia/Kolkata")
      weatherData = {
        city_id: `${lat},${lon}`,
        name: "Custom Location",
        lat: Number.parseFloat(lat!),
        lon: Number.parseFloat(lon!),
        timezone: "Asia/Kolkata",
        ...data,
      }
    }

    return NextResponse.json(weatherData, {
      headers: {
        "Cache-Control": "public, max-age=600",
        "X-Cache": "MISS",
      },
    })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
