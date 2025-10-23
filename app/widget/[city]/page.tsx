import { getCityBySlugDB } from "@/lib/db"
import { fetchWeatherData } from "@/lib/weather-api"
import { getFromCache, setInCache } from "@/lib/cache"
import { notFound } from "next/navigation"
import WidgetClient from "./widget-client"

interface Props {
  params: Promise<{ city: string }>
}

export default async function WidgetPage({ params }: Props) {
  const { city } = await params
  const cityData = await getCityBySlugDB(city)

  if (!cityData) {
    notFound()
  }

  const cacheKey = `weather:${cityData.id}`
  let weatherData = getFromCache(cacheKey)

  if (!weatherData) {
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
  }

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{cityData.name} Weather - JustWeatherCity</title>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        `}</style>
      </head>
      <body>
        <WidgetClient weatherData={weatherData} />
      </body>
    </html>
  )
}
