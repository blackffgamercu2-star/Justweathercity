"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import { CITIES } from "@/lib/cities"

export default function WidgetsPage() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0])
  const [copied, setCopied] = useState(false)

  const iframeCode = `<iframe src="https://justweathercity.com/widget/${selectedCity.slug}" width="400" height="300" frameborder="0" style="border: none; border-radius: 8px;"></iframe>`

  const jsCode = `<script src="https://justweathercity.com/widget.js"></script>
<div class="justweathercity-widget" data-city="${selectedCity.slug}"></div>`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Weather Widgets</h1>
        <p className="text-gray-600 mb-8">
          Embed JustWeatherCity weather widgets on your website. Free, easy, and always up-to-date.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* City Selector */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-900">Select City</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {CITIES.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => setSelectedCity(city)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCity.id === city.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      <div className="font-medium">{city.name}</div>
                      <div className="text-xs text-gray-600">{city.state}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Widget Preview & Code */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview */}
            <Card className="bg-white border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-900">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <iframe
                    src={`/widget/${selectedCity.slug}`}
                    width="100%"
                    height="300"
                    frameBorder="0"
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Embed Code */}
            <Card className="bg-white border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-900">Embed Code</CardTitle>
                <CardDescription className="text-gray-600">Copy and paste into your website</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="iframe" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                    <TabsTrigger value="iframe" className="text-gray-900">
                      iFrame
                    </TabsTrigger>
                    <TabsTrigger value="js" className="text-gray-900">
                      JavaScript
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="iframe" className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-gray-200">
                      <code className="text-gray-900">{iframeCode}</code>
                    </div>
                    <Button onClick={() => copyToClipboard(iframeCode)} className="w-full" variant="outline">
                      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? "Copied!" : "Copy Code"}
                    </Button>
                  </TabsContent>
                  <TabsContent value="js" className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-gray-200">
                      <code className="text-gray-900">{jsCode}</code>
                    </div>
                    <Button onClick={() => copyToClipboard(jsCode)} className="w-full" variant="outline">
                      {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? "Copied!" : "Copy Code"}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
