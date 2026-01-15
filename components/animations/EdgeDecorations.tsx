'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

export default function EdgeDecorations() {
  const edgeParticlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!edgeParticlesRef.current) return

    const particles =
      edgeParticlesRef.current.querySelectorAll('[data-particle]')

    // Animate decorative particles on the edges
    gsap.fromTo(
      particles,
      {
        opacity: 0,
        scale: 0,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.8,
      },
    )

    // Continuous animations for each particle
    particles.forEach((particle, i) => {
      const delay = i * 0.2
      const duration = 3 + Math.random() * 2
      const distance = 20 + Math.random() * 30

      gsap.to(particle, {
        y: `+=${distance}`,
        x: `+=${(Math.random() - 0.5) * 40}`,
        rotation: 360,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      })
    })
  }, [])

  return (
    <div
      ref={edgeParticlesRef}
      className="pointer-events-none absolute inset-0 z-2 overflow-hidden"
    >
      {/* Upper particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`top-${i}`}
          data-particle
          className="absolute h-1 w-1 rounded-full bg-white/40 blur-[1px]"
          style={{
            top: '5%',
            left: `${10 + i * 12}%`,
          }}
        />
      ))}

      {/* Bottom particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`bottom-${i}`}
          data-particle
          className="absolute h-1 w-1 rounded-full bg-white/40 blur-[1px]"
          style={{
            bottom: '5%',
            left: `${10 + i * 12}%`,
          }}
        />
      ))}

      {/* Left-side particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`left-${i}`}
          data-particle
          className="absolute h-1 w-1 rounded-full bg-white/40 blur-[1px]"
          style={{
            left: '3%',
            top: `${15 + i * 12}%`,
          }}
        />
      ))}

      {/* Right-side particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`right-${i}`}
          data-particle
          className="absolute h-1 w-1 rounded-full bg-white/40 blur-[1px]"
          style={{
            right: '3%',
            top: `${15 + i * 12}%`,
          }}
        />
      ))}

      {/* Larger decorative shapes in the corners */}
      <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-linear-to-br from-purple-500/20 to-transparent blur-2xl" />
      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-linear-to-bl from-blue-500/20 to-transparent blur-2xl" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-linear-to-tr from-purple-500/20 to-transparent blur-2xl" />
      <div className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-linear-to-tl from-blue-500/20 to-transparent blur-2xl" />
    </div>
  )
}
