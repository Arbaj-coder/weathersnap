'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

const lines = [
  "Get real-time weather updates.",
  "Plan your day with precision.",
  "Live weather, anywhere, anytime.",
  "Forecasts that follow you, yes!"
]


export default function HomePage() {
  const router = useRouter()
  const [city, setCity] = useState('')
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)

  const handleSearch = () => {
    if (city.trim()) {
      router.push(`/weather?city=${city}`)
    }
  }

const handleUseLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.")
    return
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords

    try {
      const res = await fetch(`/api/reverse-geocode?lat=${latitude}&lon=${longitude}`)
      const data = await res.json()

      const cityName = data[0]?.name?.split(' ')[0] || 'Jaipur'
      router.push(`/weather?city=${encodeURIComponent(cityName)}`)
    } catch (err) {
      alert("Failed to fetch your city.")
      console.error(err)
    }
  }, () => {
    alert("Permission denied or location unavailable.")
  })
}


  useEffect(() => {
    const currentText = lines[index]
    const baseTime = 1500
    const charTime = 70
    const totalTime = baseTime + currentText.length * charTime

    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % lines.length)
    }, totalTime)

    return () => clearTimeout(timeoutRef.current)
  }, [index])

  return (
    <div className="min-h-screen bg-neutral-900 px-4 py-10 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-10">WeatherSnap</h1>

      <div className="flex flex-col md:flex-row items-center gap-10 bg-purple-200 text-black rounded-3xl p-6 md:p-12 shadow-lg max-w-6xl w-full">
        {/* Left side (image + loader text) */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          <img className="w-40 md:w-52 mb-4" src="/w-1.png" alt="Weather logo" />
          <div className="loader">
            <span className="loader-text">{lines[index]}</span>
          </div>
        </div>

        {/* Right side (form) */}
        <div className="flex flex-col items-center w-full md:w-1/2 gap-4">
          <h2 className="text-2xl font-bold mb-2">🌤 Get Started</h2>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-400 p-2 w-full max-w-xs rounded"
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl transition"
            >
              Search Weather
            </button>

            <button
              onClick={handleUseLocation}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-2xl transition"
            >
              Use My Location 📍
            </button>
          </div>
        </div>
      </div>
    </div>
    
  )
  
}

