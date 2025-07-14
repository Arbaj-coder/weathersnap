// app/api/weather/route.js
import axios from 'axios'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const city = searchParams.get('city')
  const apiKey = process.env.WEATHER_API_KEY

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const response = await axios.get(url)
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'City not found' }), {
      status: 500,
    })
  }
}
