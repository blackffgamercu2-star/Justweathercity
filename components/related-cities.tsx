import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface RelatedCity {
  name: string
  slug: string
  distance?: string
}

interface RelatedCitiesProps {
  cities: RelatedCity[]
  title?: string
}

export function RelatedCities({ cities, title = "Nearby Cities" }: RelatedCitiesProps) {
  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <MapPin className="w-5 h-5 text-blue-600" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/weather/in/${city.slug}`}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline p-2 rounded hover:bg-blue-50 transition-colors"
            >
              {city.name}
              {city.distance && <span className="text-gray-500 text-xs ml-1">({city.distance})</span>}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
