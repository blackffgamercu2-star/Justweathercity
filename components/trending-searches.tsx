"use client"

import Link from "next/link"
import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TrendingSearchesProps {
  city: string
  state: string
}

export function TrendingSearches({ city, state }: TrendingSearchesProps) {
  const trendingQueries = [
    `${city} weather today`,
    `${city} temperature now`,
    `${city} weather forecast`,
    `${city} rain alert`,
    `${city} humidity`,
    `${city} wind speed`,
    `${city} air quality`,
    `${city} weather tomorrow`,
  ]

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Trending Searches
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {trendingQueries.map((query) => (
            <Link
              key={query}
              href={`/?search=${encodeURIComponent(query)}`}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline p-2 rounded hover:bg-blue-50 transition-colors"
            >
              {query}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
