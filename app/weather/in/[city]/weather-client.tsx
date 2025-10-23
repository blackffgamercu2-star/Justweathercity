"use client"

import type { WeatherData } from "@/lib/types"
import type { City } from "@/lib/types"
import { Wind, Droplets, Eye, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { TrendingSearches } from "@/components/trending-searches"
import { RelatedCities } from "@/components/related-cities"

interface Props {
  weatherData: WeatherData
  nearbyCities: City[]
}

export default function WeatherPageClient({ weatherData, nearbyCities }: Props) {
  const current = weatherData.current
  const daily = weatherData.daily
  const hourly = weatherData.hourly

  const citySlug = weatherData.name.toLowerCase().replace(/\s+/g, "-")

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Weather", href: "/weather" },
              { label: weatherData.name, href: `/weather/in/${citySlug}` },
            ]}
          />
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-balance text-gray-900">{weatherData.name} Weather Today</h1>
          <p className="text-gray-600 mt-2">
            Last updated: {new Date(weatherData.updated_at).toLocaleTimeString("en-IN")}
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Current Weather Card */}
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Current Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl font-bold text-blue-600">{current.temp_c}°C</div>
                  <div className="text-xl text-gray-700 mt-2">{current.condition}</div>
                  <div className="text-sm text-gray-600 mt-1">Feels like {current.feels_like_c}°C</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <span>Humidity</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{current.humidity}%</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <Wind className="w-4 h-4 text-blue-600" />
                    <span>Wind</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{current.wind_kmh} km/h</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>Visibility</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{current.visibility_km.toFixed(1)} km</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center gap-2 text-gray-700 mb-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span>UV Index</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{current.uv_index}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7-Day Forecast */}
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-900">7-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {daily.map((day, idx) => (
                <div key={idx} className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                  <div className="text-sm text-gray-700 mb-2 font-medium">
                    {new Date(day.date).toLocaleDateString("en-IN", { weekday: "short" })}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{day.max_c}°</div>
                  <div className="text-sm text-gray-600 mb-3">{day.min_c}°</div>
                  <div className="text-xs text-gray-700">{day.condition}</div>
                  <div className="text-xs text-blue-600 mt-2 font-medium">{day.precip_prob}% rain</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hourly Chart */}
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-900">24-Hour Temperature Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", border: "1px solid #d1d5db", color: "#111827" }} />
                <Line type="monotone" dataKey="temp_c" stroke="#2563eb" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AQI Card */}
        <Card className="bg-white border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-900">Air Quality Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-gray-700 mb-2 font-medium">PM2.5</div>
                <div className="text-2xl font-bold text-gray-900">{weatherData.aqi.pm2_5}</div>
                <div className="text-xs text-gray-600 mt-1">µg/m³</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-gray-700 mb-2 font-medium">PM10</div>
                <div className="text-2xl font-bold text-gray-900">{weatherData.aqi.pm10}</div>
                <div className="text-xs text-gray-600 mt-1">µg/m³</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-gray-700 mb-2 font-medium">NO₂</div>
                <div className="text-2xl font-bold text-gray-900">{weatherData.aqi.no2}</div>
                <div className="text-xs text-gray-600 mt-1">ppb</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-gray-700 mb-2 font-medium">O₃</div>
                <div className="text-2xl font-bold text-gray-900">{weatherData.aqi.o3}</div>
                <div className="text-xs text-gray-600 mt-1">ppb</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-sm text-gray-700 mb-2 font-medium">AQI</div>
                <div className="text-2xl font-bold text-gray-900">{weatherData.aqi.aqi_index}</div>
                <div className="text-xs text-gray-600 mt-1">Index</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TrendingSearches city={weatherData.name} state="" />
          <RelatedCities
            cities={nearbyCities.map((city) => ({
              name: city.name,
              slug: city.slug,
            }))}
            title="Nearby Cities"
          />
        </div>
      </div>
    </main>
  )
}
