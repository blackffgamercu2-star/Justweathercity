"use client"

import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
          <span className="text-xl font-bold text-gray-900">JustWeatherCity</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/weather/in/delhi"
            className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
          >
            Weather
          </Link>
          <Link href="/widgets" className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium">
            Widgets
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700 hover:text-blue-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
