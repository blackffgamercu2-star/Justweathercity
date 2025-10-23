import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JustWeatherCity - Free Weather App | Live Weather Forecast India",
  description:
    "Get accurate real-time weather forecasts for 1000+ Indian cities. Free weather app with live temperature, humidity, wind speed, air quality index, and 7-day forecast. Updated every 15 minutes.",
  keywords:
    "weather forecast, live weather, temperature, humidity, wind speed, air quality, weather app, free weather, weather today, weather India, weather forecast India, weather widget, monsoon forecast, cyclone alert, earthquake warning, natural disaster alert, storm tracking, heat wave warning, cold wave alert, UV index, dew point, real feel temperature, weather radar, satellite weather, precipitation forecast, thunderstorm alert, lightning tracker, fog alert, hailstorm warning, dust storm, air quality index, AQI, PM2.5, PM10, city weather, state weather, regional weather, hyperlocal weather, weather map, weather news, weather update, 7 day forecast, 10 day forecast, hourly forecast, weather widget, weather API, weather data, weather trends, climate data, weather patterns, seasonal forecast, weather statistics, historical weather, weather comparison, weather alerts, severe weather, extreme weather, weather safety, weather preparedness, disaster management, flood warning, drought alert, wildfire risk, avalanche warning, blizzard alert, tornado watch, hurricane tracker, tropical storm, weather emergency, weather conditions, current weather, today's weather, tomorrow weather, weekend weather, next week weather, monthly forecast, weather outlook, weather prediction, weather analysis, weather science, meteorology, atmospheric conditions, barometric pressure, wind direction, wind chill, heat index, visibility, cloud cover, sunrise sunset, moonrise moonset, tide times, weather station, weather sensor, weather observation, weather measurement, weather monitoring, weather tracking, weather surveillance, weather detection, weather warning system, emergency alert, disaster alert, calamity warning, weather hazard, weather risk assessment",
  generator: "JustWeatherCity",
  metadataBase: new URL("https://justweathercity.com"),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://justweathercity.com",
    siteName: "JustWeatherCity - Free Weather Forecast",
    title: "JustWeatherCity - Live Weather & Forecasts for 1000+ Indian Cities",
    description:
      "Real-time weather updates, forecasts, and alerts for Indian cities. Get accurate hyperlocal weather data with 7-day forecasts, radar, and air quality index.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JustWeatherCity - Free Weather Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JustWeatherCity - Free Weather Forecast",
    description: "Live weather for 1000+ Indian cities with accurate forecasts",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="Kn10tOYvW8yEXhqnZoSACfnWWHzCWh7dIs67GpMPNDU" />
        <meta name="msvalidate.01" content="59D81615960C1B888C89F1E8E4DA3A8A" />
        <meta name="yandex-verification" content="1a5b215b79e0c2cc" />
        <meta name="ahrefs-site-verification" content="HHoBZvX8Wx3vdJabn3t0Ow" />

        <script src="https://analytics.ahrefs.com/analytics.js" data-key="HHoBZvX8Wx3vdJabn3t0Ow" async />

        <link rel="canonical" href="https://justweathercity.com" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="JustWeather" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "JustWeatherCity",
              "url": "https://justweathercity.com",
              "logo": "https://justweathercity.com/icon-512.png",
              "description": "Real-time weather forecasts for 1000+ Indian cities with accurate predictions, air quality monitoring, and disaster alerts.",
              "sameAs": [
                "https://www.facebook.com/justweathercity",
                "https://twitter.com/justweathercity",
                "https://www.instagram.com/justweathercity"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Customer Service",
                "email": "support@justweathercity.com",
                "availableLanguage": ["English", "Hindi"]
              },
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "founder": {
                "@type": "Organization",
                "name": "JustWeatherCity Team"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "JustWeatherCity",
              "url": "https://justweathercity.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://justweathercity.com/weather/in/{search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`font-sans antialiased bg-white text-gray-900`}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
