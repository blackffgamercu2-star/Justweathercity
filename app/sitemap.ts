import { getAllCitiesDB } from "@/lib/db"
import type { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cities = await getAllCitiesDB()

  const cityEntries = cities.map((city) => ({
    url: `https://justweathercity.com/weather/in/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: city.population > 5000000 ? 0.9 : city.population > 1000000 ? 0.8 : 0.7,
  }))

  const widgetEntries = cities
    .filter((city) => city.population > 1000000)
    .map((city) => ({
      url: `https://justweathercity.com/widget/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.6,
    }))

  const staticPages = [
    {
      url: "https://justweathercity.com",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: "https://justweathercity.com/widgets",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: "https://justweathercity.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: "https://justweathercity.com/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ]

  return [...staticPages, ...cityEntries, ...widgetEntries]
}
