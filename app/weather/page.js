// app/weather/page.js
'use client'

import { Suspense } from 'react'
import WeatherComponent from '@/components/WeatherComponent' // move your weather logic to a separate component

export default function WeatherPage() {
  return (
    <Suspense fallback={<div className="text-white p-10 text-center">Loading weather...</div>}>
      <WeatherComponent />
    </Suspense>
  )
}

