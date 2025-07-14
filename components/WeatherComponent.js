'use client'
import Navbar from '@/components/Navbar'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'


export default function WeatherPage() {
  const searchParams = useSearchParams()
  const city = searchParams.get('city') || 'Delhi'
  

  function getWindDirection(deg) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(deg / 45) % 8
  return directions[index]
}


  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/weather?city=${city}`)
        const data = await res.json()
        setWeather(data)
      } catch (err) {
        console.error('Weather fetch error:', err)
        setWeather(null)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  if (loading) return (<div className='min-h-screen flex justify-center items-center'>
  <div className="loader2"></div>
  </div>)
  if (!weather || weather.error) return <div className="text-red-500 text-center p-10">Error fetching weather data.</div>

  const iconCode = weather.weather[0]?.icon
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

  // Sunrise & sunset formatting
  const toTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div>
      <Navbar/>
    <div className="p-6 text-white text-center">
      <h1 className="text-3xl font-bold mb-2">{weather.name} Weather</h1>
      <p className="text-gray-300 mb-4">📅 {formattedDate}</p>

      <div className="flex flex-col items-center gap-4">
        <img src={iconUrl} alt={weather.weather[0].description} className="w-28 h-28" />
        <p className='text-4xl font-bold'>{weather.main.temp}°C</p>

        {/* Primary weather stats */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 text-black'>
          <div className='bg-purple-200 p-6 rounded-2xl'>
            <img src="/description.png" alt="" className="w-16 h-16 mx-auto mb-2" />
            <p className="font-bold capitalize">{weather.weather[0].description}</p>
            <p className='font-semibold'>Condition</p> 
          </div>

          <div className='bg-purple-200 p-6 rounded-2xl'>
            <img src="/humidity.png" alt="" className="w-16 h-16 mx-auto mb-2" />
            <p className='font-bold'>{weather.main.humidity}%</p>
            <p className='font-semibold'>💧 Humidity</p> 
          </div>

          <div className='bg-purple-200 p-6 rounded-2xl'>
            <img src="/wind.png" alt="" className="w-16 h-16 mx-auto mb-2" />
            <p className='font-bold'>{weather.wind.speed} m/s</p>
            <p className='font-semibold'>🌬 Wind Speed</p>
            <p className='font-semibold'>🧭 Wind Direction: {getWindDirection(weather.wind.deg)}</p>
 
          </div>

          <div className='bg-purple-200 p-6 rounded-2xl'>
            <img src="/feels.png" alt="" className="w-16 h-16 mx-auto mb-2" />
            <p className='font-bold'>{weather.main.feels_like}°C</p>
            <p className='font-semibold'>🤗 Feels Like</p> 
          </div>

          <div className='bg-purple-200 p-6 rounded-2xl'>
            <img src="/temp.png" alt="" className="w-16 h-16 mx-auto mb-2" />
            <p className='font-bold'>{weather.main.temp_min}° / {weather.main.temp_max}°</p>
            <p className='font-semibold'>🔻 Min / Max</p> 
          </div>

          <div className='bg-purple-200 p-6 rounded-2xl'>
            <img src="/sun.png" alt="" className="w-16 h-16 mx-auto mb-2" />
            <p className='font-bold'>🌅 {toTime(weather.sys.sunrise)}</p>
            <p className='font-bold'>🌇 {toTime(weather.sys.sunset)}</p>
            <p className='font-semibold'>Sunrise / Sunset</p> 
          </div>
        </div>

      </div>
        
    </div>

    </div>
  )
}
