'use client'

import { useEffect, useState } from 'react'
import { HiChevronRight } from 'react-icons/hi2'

import EdgeDecorations from '@/components/animations/EdgeDecorations'
import SplitText from '@/components/animations/SplitText'
import AudioVisualizer from '@/components/AudioVisualizer'
import StackedAlbums from '@/components/StackedAlbums'

export default function ReleasesSection() {
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section
      id="releases"
      className="relative flex h-screen snap-start snap-always items-start justify-center bg-transparent px-6 pt-20 md:px-12"
    >
      <EdgeDecorations />
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          {/* Left column - Stacked Albums */}
          <div className="lg:col-span-5">
            <StackedAlbums onAlbumSelect={setSelectedAlbum} />
          </div>

          {/* Right column - New Releases Info */}
          <div className="space-y-8 lg:col-span-5 lg:col-start-7">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <SplitText
                  text="LATEST RELEASES"
                  className="text-5xl leading-tight font-bold text-white md:text-7xl"
                  delay={50}
                  duration={0.8}
                  ease="power3.out"
                  splitType="words"
                  from={{ opacity: 0, y: 30 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.2}
                  rootMargin="-100px"
                  textAlign="left"
                  tag="h2"
                />
              </div>
              <div className="text-2xl font-light text-white">3</div>
            </div>

            <button className="group flex items-center gap-3 border border-white/30 px-6 py-3 transition-colors hover:bg-white/10">
              <span className="text-sm tracking-wider text-white uppercase">
                LISTEN ON SPOTIFY
              </span>
              <HiChevronRight className="h-5 w-5 text-white transition-transform group-hover:translate-x-1" />
            </button>

            {/* Content that appears when no album is selected */}
            {!selectedAlbum && isClient && (
              <div className="animate-fadeIn space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-8">
                  <div className="text-center">
                    <div className="mb-2 text-5xl font-bold text-white">3</div>
                    <div className="text-sm tracking-wider text-white/60 uppercase">
                      Singles
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 text-5xl font-bold text-white">
                      1500+
                    </div>
                    <div className="text-sm tracking-wider text-white/60 uppercase">
                      Plays
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-2 text-5xl font-bold text-white">
                      12m
                    </div>
                    <div className="text-sm tracking-wider text-white/60 uppercase">
                      Duration
                    </div>
                  </div>
                </div>

                <AudioVisualizer />

                {/* Description */}
                <p className="pt-8 text-base leading-relaxed text-white/60">
                  Explore our latest sonic journeys. Each release crafted with
                  attention to detail, blending melodic progressions with
                  driving rhythms. Click on any album to discover the groove
                  behind the music.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
