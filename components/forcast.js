'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function WeatherPage() {
  const searchParams = useSearchParams()
  const city = searchParams.get('city') || 'Delhi'

  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=YOUR_API_KEY`)
        const geoData = await geoRes.json()
        const { lat, lon } = geoData[0]

        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=YOUR_API_KEY`
        )
        const weatherData = await weatherRes.json()

        setForecast(weatherData.daily.slice(0, 7))
      } catch (err) {
        console.error('Error fetching forecast:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchForecast()
  }, [city])

  if (loading) return <div className="text-white text-center p-10">Loading 7-day forecast...</div>

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">7-Day Forecast for {city}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {forecast.map((day, index) => {
          const date = new Date(day.dt * 1000).toLocaleDateString('en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
          })
          return (
            <div key={index} className="bg-purple-800 p-4 rounded-xl text-center">
              <p className="font-semibold">{date}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="mx-auto"
              />
              <p>{day.temp.day}°C</p>
              <p className="capitalize">{day.weather[0].description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
