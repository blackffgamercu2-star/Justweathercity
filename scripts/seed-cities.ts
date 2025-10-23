const INDIAN_CITIES = [
  // Major metros
  { name: "Delhi", state: "Delhi", lat: 28.6139, lon: 77.209, population: 32941000 },
  { name: "Mumbai", state: "Maharashtra", lat: 19.076, lon: 72.8777, population: 20961472 },
  { name: "Bangalore", state: "Karnataka", lat: 12.9716, lon: 77.5946, population: 8436675 },
  { name: "Hyderabad", state: "Telangana", lat: 17.385, lon: 78.4867, population: 6809970 },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lon: 88.3639, population: 14681900 },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lon: 80.2707, population: 7088000 },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lon: 73.8567, population: 6430400 },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lon: 72.5714, population: 8450570 },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lon: 75.7873, population: 3046163 },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lon: 80.9462, population: 2815601 },
  // Tier 2 cities
  { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lon: 75.8577, population: 2170295 },
  { name: "Thane", state: "Maharashtra", lat: 19.2183, lon: 72.9781, population: 2317000 },
  { name: "Bhopal", state: "Madhya Pradesh", lat: 23.1815, lon: 79.9864, population: 1798218 },
  { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6869, lon: 83.2185, population: 1728000 },
  { name: "Pimpri-Chinchwad", state: "Maharashtra", lat: 18.6298, lon: 73.7997, population: 1727079 },
  { name: "Patna", state: "Bihar", lat: 25.5941, lon: 85.1376, population: 1684222 },
  { name: "Vadodara", state: "Gujarat", lat: 22.3072, lon: 73.1812, population: 1666703 },
  { name: "Ghaziabad", state: "Uttar Pradesh", lat: 28.6692, lon: 77.4538, population: 1729000 },
  { name: "Ludhiana", state: "Punjab", lat: 30.901, lon: 75.8573, population: 1618879 },
  { name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lon: 78.0081, population: 1585704 },
  // Add more cities...
]

const generateCityId = (name: string, state: string) => {
  return `${name.toLowerCase().replace(/\s+/g, "-")}-${state.toLowerCase().replace(/\s+/g, "-")}`
}

const cities = INDIAN_CITIES.map((city) => ({
  id: generateCityId(city.name, city.state),
  name: city.name,
  state: city.state,
  lat: city.lat,
  lon: city.lon,
  population: city.population,
  timezone: "Asia/Kolkata",
  aliases: [],
  slug: city.name.toLowerCase().replace(/\s+/g, "-"),
}))

console.log(`Generated ${cities.length} cities`)
console.log(JSON.stringify(cities, null, 2))
