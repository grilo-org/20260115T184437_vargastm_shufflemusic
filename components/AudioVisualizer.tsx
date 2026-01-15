'use client'

import { useState } from 'react'

interface VisualizerBar {
  height: number
  duration: number
}

interface AudioVisualizerProps {
  barCount?: number
  className?: string
}

export default function AudioVisualizer({
  barCount = 40,
  className = '',
}: AudioVisualizerProps) {
  const [visualizerBars] = useState<VisualizerBar[]>(() =>
    [...Array(barCount)].map(() => ({
      height: Math.random() * 60 + 20,
      duration: Math.random() * 0.8 + 0.6,
    })),
  )

  return (
    <div
      className={`flex h-48 items-end justify-center gap-1 pt-12 ${className}`}
    >
      {visualizerBars.map((bar, i) => (
        <div
          key={i}
          className="animate-pulse-bar w-2 rounded-full bg-linear-to-t from-white/80 to-white/40"
          style={{
            height: `${bar.height}%`,
            animationDelay: `${i * 0.05}s`,
            animationDuration: `${bar.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
