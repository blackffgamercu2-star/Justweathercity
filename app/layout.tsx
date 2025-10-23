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
    "weather app, free weather, weather forecast, live weather, weather today, temperature, humidity, wind speed, air quality, weather India, weather forecast India, weather widget",
  generator: "JustWeatherCity",
  metadataBase: new URL("https://justweathercity.com"),
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

        <script src="https://analytics.ahrefs.com/analytics.js" data-key="HHoBZvX8Wx3vdJabn3t0Ow" async />

        <link rel="canonical" href="https://justweathercity.com" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`font-sans antialiased bg-white text-gray-900`}>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
