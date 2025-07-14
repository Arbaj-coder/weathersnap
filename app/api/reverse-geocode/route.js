// app/api/reverse-geocode/route.js
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  const apiKey = process.env.WEATHER_API_KEY

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    )

    return NextResponse.json(response.data)
  } catch (err) {
    console.error('Reverse geocoding failed:', err.message)
    return NextResponse.json({ error: 'Failed to fetch location' }, { status: 500 })
  }
}
