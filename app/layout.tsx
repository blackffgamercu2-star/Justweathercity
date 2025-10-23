import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JustWeatherCity - Live Weather & Forecasts for India",
  description:
    "Real-time weather updates, forecasts, and alerts for Indian cities. Get accurate hyperlocal weather data with 7-day forecasts, radar, and air quality index.",
  generator: "JustWeatherCity",
  metadataBase: new URL("https://justweathercity.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://justweathercity.com",
    siteName: "JustWeatherCity",
    title: "JustWeatherCity - Live Weather & Forecasts for India",
    description: "Real-time weather updates, forecasts, and alerts for Indian cities.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JustWeatherCity Weather Platform",
      },
    ],
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
