"use client"

import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, MapPin, Zap, TrendingUp } from "lucide-react"
import { CITIES } from "@/lib/cities"

export default function Home() {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState<typeof CITIES>([])

  const handleSearch = (value: string) => {
    setSearch(value)
    if (value.length > 0) {
      const filtered = CITIES.filter(
        (city) =>
          city.name.toLowerCase().includes(value.toLowerCase()) ||
          city.state.toLowerCase().includes(value.toLowerCase()),
      )
      setResults(filtered.slice(0, 8))
    } else {
      setResults([])
    }
  }

  const featuredCities = CITIES.slice(0, 6)

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-balance text-gray-900">
              Free Weather Forecast for 1000+ Indian Cities | Live Temperature & Alerts
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get real-time weather updates, 7-day forecasts, air quality index, and weather alerts for every Indian
              city. Updated every 15 minutes with hyperlocal precision. No signup required.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Input
                placeholder="Search weather in your city..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
              {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {results.map((city) => (
                    <Link
                      key={city.id}
                      href={`/weather/in/${city.slug}`}
                      className="block px-4 py-2 hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <div className="font-medium text-gray-900">{city.name} Weather</div>
                      <div className="text-sm text-gray-500">{city.state}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 border-b border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Trending Weather Searches</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "Delhi weather today",
            "Mumbai temperature now",
            "Bangalore weather forecast",
            "Weather in my location",
            "Today weather India",
            "Rain alert near me",
            "Air quality today",
            "7 day forecast",
          ].map((keyword) => (
            <Link
              key={keyword}
              href={`/weather/in/delhi?q=${encodeURIComponent(keyword)}`}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm text-gray-700 font-medium transition-colors"
            >
              {keyword}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Cities */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Popular Cities Weather</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredCities.map((city) => (
            <Link key={city.id} href={`/weather/in/${city.slug}`}>
              <Card className="bg-white border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    {city.name} Weather
                  </CardTitle>
                  <CardDescription className="text-gray-600">{city.state}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">Population: {(city.population / 1000000).toFixed(1)}M</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Why Choose JustWeatherCity?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Zap className="w-5 h-5 text-amber-500" />
                Real-Time Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Weather data updated every 15 minutes with hyperlocal precision for your exact location.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Cloud className="w-5 h-5 text-blue-600" />
                Comprehensive Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Temperature, humidity, wind, precipitation, AQI, and 7-day forecasts all in one place.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <TrendingUp className="w-5 h-5 text-green-600" />
                India-Focused
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Coverage for 200+ Indian cities with local insights and seasonal weather patterns.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Embed Weather on Your Website</h3>
          <p className="mb-6 text-blue-100">
            Use our free embeddable widgets to show live weather on your site. No coding required.
          </p>
          <Link
            href="/widgets"
            className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Widget Code
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-4">JustWeatherCity</h4>
              <p className="text-gray-600 text-sm">Accurate weather for every Indian city.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/weather/in/delhi" className="text-gray-600 hover:text-blue-600">
                    Weather
                  </Link>
                </li>
                <li>
                  <Link href="/widgets" className="text-gray-600 hover:text-blue-600">
                    Widgets
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-blue-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-blue-600">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600 text-sm">
            <p>&copy; 2025 JustWeatherCity. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
