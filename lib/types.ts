export interface City {
  id: string
  name: string
  state: string
  lat: number
  lon: number
  population: number
  timezone: string
  aliases: string[]
  slug: string
}

export interface CurrentWeather {
  temp_c: number
  feels_like_c: number
  condition: string
  humidity: number
  wind_kmh: number
  precip_mm_last_1h: number
  uv_index: number
  visibility_km: number
}

export interface HourlyForecast {
  time: string
  temp_c: number
  precip_mm: number
  precip_prob: number
  wind_kmh: number
  condition: string
}

export interface DailyForecast {
  date: string
  max_c: number
  min_c: number
  precip_prob: number
  precip_mm: number
  condition: string
  uv_index: number
}

export interface AQI {
  pm2_5: number
  pm10: number
  no2: number
  o3: number
  so2: number
  aqi_index: number
}

export interface WeatherData {
  city_id: string
  name: string
  lat: number
  lon: number
  timezone: string
  current: CurrentWeather
  hourly: HourlyForecast[]
  daily: DailyForecast[]
  aqi: AQI
  updated_at: string
  source: string
}
