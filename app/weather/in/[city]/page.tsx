import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCityBySlugDB } from "@/lib/db"
import { fetchWeatherData } from "@/lib/weather-api"
import { getFromCache, setInCache } from "@/lib/cache"
import type { WeatherData } from "@/lib/types"
import WeatherPageClient from "./weather-client"
import { getNearByCities } from "@/lib/cities"

export const revalidate = 600 // ISR: revalidate every 10 minutes

interface Props {
  params: Promise<{ city: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params
  const cityData = await getCityBySlugDB(city)

  if (!cityData) {
    return {
      title: "City Not Found",
      description: "The city you are looking for does not exist.",
    }
  }

  const title = `${cityData.name} Weather Today | Live Temperature, Forecast & Air Quality`
  const description = `Get live weather for ${cityData.name}, ${cityData.state}. Current temperature, humidity, wind speed, air quality index, and accurate 7-day weather forecast. Updated every 15 minutes. Free weather app.`
  const keywords = `${cityData.name} weather, ${cityData.name} weather today, ${cityData.name} temperature, weather in ${cityData.name}, ${cityData.name} forecast, ${cityData.name} weather forecast, ${cityData.name} air quality, ${cityData.name} humidity, ${cityData.name} wind speed, today weather ${cityData.name}`

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://justweathercity.com/weather/in/${city}`,
      type: "website",
      images: [
        {
          url: `/api/og?city=${cityData.name}`,
          width: 1200,
          height: 630,
          alt: `${cityData.name} Weather Forecast`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og?city=${cityData.name}`],
    },
    alternates: {
      canonical: `https://justweathercity.com/weather/in/${city}`,
    },
  }
}

async function getWeatherForCity(citySlug: string): Promise<WeatherData | null> {
  const cityData = await getCityBySlugDB(citySlug)
  if (!cityData) return null

  const cacheKey = `weather:${cityData.id}`
  const cached = getFromCache(cacheKey)
  if (cached) {
    console.log("[v0] Cache hit for", cityData.name)
    return cached
  }

  try {
    const weatherData = await fetchWeatherData(cityData.lat, cityData.lon, cityData.timezone)
    const fullData: WeatherData = {
      city_id: cityData.id,
      name: cityData.name,
      lat: cityData.lat,
      lon: cityData.lon,
      timezone: cityData.timezone,
      ...weatherData,
    } as WeatherData

    setInCache(cacheKey, fullData, 600)
    return fullData
  } catch (error) {
    console.error("[v0] Error fetching weather:", error)
    return null
  }
}

export default async function CityWeatherPage({ params }: Props) {
  const { city } = await params
  const weatherData = await getWeatherForCity(city)

  if (!weatherData) {
    notFound()
  }

  const nearbyCities = getNearByCities(weatherData.lat, weatherData.lon, 5)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${weatherData.name} Weather Today`,
            description: `Live weather for ${weatherData.name}: temperature, humidity, wind, and 7-day forecast.`,
            url: `https://justweathercity.com/weather/in/${city}`,
            dateModified: weatherData.updated_at,
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://justweathercity.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Weather",
                  item: "https://justweathercity.com/weather",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: weatherData.name,
                  item: `https://justweathercity.com/weather/in/${city}`,
                },
              ],
            },
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: `What is the current weather in ${weatherData.name}?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Current temperature: ${weatherData.current.temp_c}°C, Condition: ${weatherData.current.condition}, Humidity: ${weatherData.current.humidity}%`,
                  },
                },
                {
                  "@type": "Question",
                  name: `Will it rain in ${weatherData.name} today?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Precipitation probability: ${weatherData.daily[0].precip_prob}%. Check the 7-day forecast for detailed rain predictions.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `What is the air quality in ${weatherData.name}?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `PM2.5: ${weatherData.aqi.pm2_5} µg/m³, PM10: ${weatherData.aqi.pm10} µg/m³. Air quality index: ${weatherData.aqi.aqi_index}`,
                  },
                },
                {
                  "@type": "Question",
                  name: `What is the 7-day weather forecast for ${weatherData.name}?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Check the forecast section below for detailed daily predictions including temperature, conditions, and precipitation probability.`,
                  },
                },
              ],
            },
          }),
        }}
      />
      <WeatherPageClient weatherData={weatherData} nearbyCities={nearbyCities} />
    </>
  )
}
