import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Globe, Zap } from "lucide-react"

export const metadata = {
  title: "About JustWeatherCity - Accurate Weather for India",
  description: "Learn about JustWeatherCity, India's most accurate hyperlocal weather platform.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">About JustWeatherCity</h1>

        <div className="space-y-8">
          <Card className="bg-white border-gray-200 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Cloud className="w-5 h-5 text-blue-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                JustWeatherCity is dedicated to providing the most accurate, hyperlocal weather information for every
                city in India. We believe that precise weather data should be accessible to everyone, from farmers
                planning their harvest to commuters planning their day.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Zap className="w-5 h-5 text-amber-500" />
                Why JustWeatherCity?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li>• Real-time updates every 15 minutes</li>
                <li>• Coverage for 200+ Indian cities</li>
                <li>• Air quality index (AQI) data</li>
                <li>• 7-day accurate forecasts</li>
                <li>• Free embeddable widgets</li>
                <li>• Mobile-first design</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Globe className="w-5 h-5 text-green-600" />
                Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">We use high-quality, reliable data sources:</p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <strong>Weather Data</strong>: Open-Meteo (free, open-source)
                </li>
                <li>
                  • <strong>Air Quality</strong>: Open-Meteo AQI API
                </li>
                <li>
                  • <strong>Coordinates</strong>: Verified geographic data
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-md">
            <CardHeader>
              <CardTitle className="text-gray-900">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Have questions or suggestions? We'd love to hear from you!</p>
              <div className="mt-4 space-y-2 text-gray-700">
                <p>Email: support@justweathercity.com</p>
                <p>Twitter: @justweathercity</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
