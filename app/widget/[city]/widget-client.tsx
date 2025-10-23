"use client"

import type { WeatherData } from "@/lib/types"
import { Cloud } from "lucide-react"

interface Props {
  weatherData: WeatherData
}

export default function WidgetClient({ weatherData }: Props) {
  const current = weatherData.current
  const today = weatherData.daily[0]

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
        color: "#1f2937",
        padding: "20px",
        borderRadius: "8px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        maxWidth: "400px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "16px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "4px", color: "#111827" }}>
          {weatherData.name}
        </h3>
        <p style={{ fontSize: "12px", color: "#6b7280" }}>
          Updated: {new Date(weatherData.updated_at).toLocaleTimeString("en-IN")}
        </p>
      </div>

      {/* Current Weather */}
      <div
        style={{
          background: "rgba(59, 130, 246, 0.05)",
          padding: "16px",
          borderRadius: "6px",
          marginBottom: "16px",
          border: "1px solid #dbeafe",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#2563eb" }}>{current.temp_c}°C</div>
            <div style={{ fontSize: "14px", color: "#4b5563", marginTop: "4px" }}>{current.condition}</div>
          </div>
          <Cloud style={{ width: "48px", height: "48px", color: "#2563eb" }} />
        </div>
      </div>

      {/* Details Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            background: "rgba(59, 130, 246, 0.05)",
            padding: "12px",
            borderRadius: "6px",
            textAlign: "center",
            border: "1px solid #dbeafe",
          }}
        >
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Humidity</div>
          <div style={{ fontSize: "18px", fontWeight: "bold", color: "#111827" }}>{current.humidity}%</div>
        </div>
        <div
          style={{
            background: "rgba(59, 130, 246, 0.05)",
            padding: "12px",
            borderRadius: "6px",
            textAlign: "center",
            border: "1px solid #dbeafe",
          }}
        >
          <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Wind</div>
          <div style={{ fontSize: "18px", fontWeight: "bold", color: "#111827" }}>{current.wind_kmh} km/h</div>
        </div>
      </div>

      {/* 3-Day Forecast */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#374151", marginBottom: "8px" }}>
          3-Day Forecast
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {weatherData.daily.slice(0, 3).map((day, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                background: "rgba(59, 130, 246, 0.05)",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "center",
                fontSize: "12px",
                border: "1px solid #dbeafe",
              }}
            >
              <div style={{ color: "#6b7280", marginBottom: "4px" }}>
                {new Date(day.date).toLocaleDateString("en-IN", { weekday: "short" })}
              </div>
              <div style={{ fontWeight: "bold", marginBottom: "4px", color: "#111827" }}>{day.max_c}°</div>
              <div style={{ color: "#6b7280", fontSize: "11px" }}>{day.precip_prob}% rain</div>
            </div>
          ))}
        </div>
      </div>

      {/* Powered By */}
      <div
        style={{
          textAlign: "center",
          fontSize: "11px",
          color: "#9ca3af",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "12px",
        }}
      >
        <a
          href="https://justweathercity.com"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "500",
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by JustWeatherCity
        </a>
      </div>
    </div>
  )
}
