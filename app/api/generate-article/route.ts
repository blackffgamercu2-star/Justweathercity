import { type NextRequest, NextResponse } from "next/server"
import { getCityBySlugDB } from "@/lib/db"
import { saveDraftArticle } from "@/lib/db"

// Simple API key validation (in production, use proper auth)
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "dev-key-change-in-production"

export async function POST(request: NextRequest) {
  try {
    // Check API key
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== ADMIN_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { city, type = "city-intro" } = await request.json()

    if (!city) {
      return NextResponse.json({ error: "City slug required" }, { status: 400 })
    }

    const cityData = await getCityBySlugDB(city)
    if (!cityData) {
      return NextResponse.json({ error: "City not found" }, { status: 404 })
    }

    // Generate AI draft (in production, call OpenAI/Gemini API)
    const draft = generateDraft(cityData, type)

    // Save as draft
    const saved = await saveDraftArticle({
      city_id: cityData.id,
      city_name: cityData.name,
      type,
      content: draft,
      status: "draft",
      created_at: new Date(),
    })

    return NextResponse.json({
      success: true,
      draft: saved,
      message: "Draft created. Please review before publishing.",
    })
  } catch (error) {
    console.error("[v0] Generate article error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateDraft(city: any, type: string) {
  const templates: { [key: string]: (city: any) => any } = {
    "city-intro": (c) => ({
      title: `${c.name} Weather Today | JustWeatherCity — Live Temp, Radar & 7-Day Forecast`,
      meta_description: `Live ${c.name} weather: current temperature, humidity, wind, and 7-day forecast. Updated every 15 minutes.`,
      intro: `${c.name} is located in ${c.state} with a population of ${(c.population / 1000000).toFixed(1)} million. Get real-time weather updates, forecasts, and air quality data for ${c.name} on JustWeatherCity.`,
      faqs: [
        {
          q: `What is the current weather in ${c.name}?`,
          a: `Check the live weather section above for real-time temperature, humidity, wind speed, and conditions.`,
        },
        {
          q: `Will it rain in ${c.name} today?`,
          a: `View the precipitation probability in the 7-day forecast section. Updated every 15 minutes.`,
        },
        {
          q: `What is the air quality in ${c.name}?`,
          a: `Check the AQI section for PM2.5, PM10, and other air quality metrics.`,
        },
      ],
      slug: c.slug,
    }),
  }

  return templates[type]?.(city) || templates["city-intro"](city)
}
