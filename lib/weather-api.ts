import axios from "axios"
import type { WeatherData, CurrentWeather, HourlyForecast, DailyForecast, AQI } from "./types"

const OPEN_METEO_API = "https://api.open-meteo.com/v1"
const AQI_API = "https://air-quality-api.open-meteo.com/v1"

export async function fetchWeatherData(lat: number, lon: number, timezone: string): Promise<Partial<WeatherData>> {
  try {
    const [weatherRes, aqiRes] = await Promise.all([
      axios.get(`${OPEN_METEO_API}/forecast`, {
        params: {
          latitude: lat,
          longitude: lon,
          current:
            "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,uv_index,visibility",
          hourly: "temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m",
          daily:
            "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max",
          timezone: timezone,
          forecast_days: 7,
        },
      }),
      axios
        .get(`${AQI_API}/air_quality`, {
          params: {
            latitude: lat,
            longitude: lon,
            current: "pm2_5,pm10,nitrogen_dioxide,ozone,sulphur_dioxide,us_aqi",
          },
        })
        .catch((error) => {
          console.warn("[v0] AQI API failed, continuing without AQI data:", error.message)
          return { data: { current: {} } }
        }),
    ])

    const current = normalizeCurrentWeather(weatherRes.data.current)
    const hourly = normalizeHourlyForecast(weatherRes.data.hourly)
    const daily = normalizeDailyForecast(weatherRes.data.daily)
    const aqi = normalizeAQI(aqiRes?.data?.current || {})

    return {
      current,
      hourly: hourly.slice(0, 24),
      daily,
      aqi,
      updated_at: new Date().toISOString(),
      source: "open-meteo",
    }
  } catch (error) {
    console.error("[v0] Weather API error:", error)
    throw error
  }
}

function normalizeCurrentWeather(data: any): CurrentWeather {
  return {
    temp_c: data.temperature_2m,
    feels_like_c: data.apparent_temperature,
    condition: getWeatherCondition(data.weather_code),
    humidity: data.relative_humidity_2m,
    wind_kmh: data.wind_speed_10m,
    precip_mm_last_1h: data.precipitation || 0,
    uv_index: data.uv_index,
    visibility_km: data.visibility / 1000,
  }
}

function normalizeHourlyForecast(data: any): HourlyForecast[] {
  return data.time.map((time: string, idx: number) => ({
    time,
    temp_c: data.temperature_2m[idx],
    precip_mm: data.precipitation[idx] || 0,
    precip_prob: data.precipitation_probability[idx] || 0,
    wind_kmh: data.wind_speed_10m[idx],
    condition: getWeatherCondition(data.weather_code[idx]),
  }))
}

function normalizeDailyForecast(data: any): DailyForecast[] {
  return data.time.map((date: string, idx: number) => ({
    date,
    max_c: data.temperature_2m_max[idx],
    min_c: data.temperature_2m_min[idx],
    precip_prob: data.precipitation_probability_max[idx],
    precip_mm: data.precipitation_sum[idx] || 0,
    condition: getWeatherCondition(data.weather_code[idx]),
    uv_index: data.uv_index_max[idx],
  }))
}

function normalizeAQI(data: any): AQI {
  return {
    pm2_5: data?.pm2_5 ?? 0,
    pm10: data?.pm10 ?? 0,
    no2: data?.nitrogen_dioxide ?? 0,
    o3: data?.ozone ?? 0,
    so2: data?.sulphur_dioxide ?? 0,
    aqi_index: data?.us_aqi ?? 0,
  }
}

function getWeatherCondition(code: number): string {
  const conditions: { [key: number]: string } = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Foggy",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Thunderstorm with hail",
  }
  return conditions[code] || "Unknown"
}
