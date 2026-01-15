'use client'

import EdgeDecorations from '@/components/animations/EdgeDecorations'
import SplitText from '@/components/animations/SplitText'
import Tracklist from '@/components/Tracklist'
import { tracks } from '@/lib/tracks'

export default function LiveSetsSection() {
  const videoUrl =
    'https://www.youtube.com/embed/xsz-VpTjP2Y?si=0twnUigqt6V-llfu'

  return (
    <section
      id="livesets"
      className="relative flex h-screen snap-start snap-always items-center justify-center bg-transparent px-6 py-[80px] md:px-12"
    >
      <EdgeDecorations />
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left column - Info */}
          <div className="flex flex-col space-y-6 lg:col-span-5">
            <div className="flex items-start justify-between">
              <div>
                <SplitText
                  text="LIVE SETS"
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
              <div className="text-2xl font-light text-white">1</div>
            </div>

            <div className="space-y-6">
              <p className="text-base leading-relaxed text-white/60">
                Dive into the energy of live performances. Full sets recorded
                from intimate venues and stages, showcasing the raw creative
                process and the connection between artist and audience.
              </p>

              {/* Genre tags */}
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20">
                  Melodic Techno
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20">
                  Progressive House
                </span>
              </div>

              {/* Location & Venue info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-xs tracking-wider text-white/40 uppercase">
                    Venue
                  </div>
                  <div className="text-base font-bold text-white">
                    Chapadão – Pipa Beach - RN - Brazil
                  </div>
                </div>
                <div className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="text-xs tracking-wider text-white/40 uppercase">
                    Date
                  </div>
                  <div className="text-base font-bold text-white">
                    December 2025
                  </div>
                </div>
              </div>
            </div>

            {/* Tracklist */}
            <Tracklist tracks={tracks} />
          </div>

          {/* Right column - Video */}
          <div className="flex flex-col space-y-6 lg:col-span-7">
            {/* Video container */}
            <div className="group relative aspect-video w-full overflow-hidden rounded-lg bg-gray-900 shadow-2xl transition-all duration-500 hover:shadow-white/5">
              <iframe
                src={videoUrl}
                title="Live Set Performance"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>

            {/* Featured images grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-square h-[260px] w-[230px] overflow-hidden rounded-lg bg-gray-900">
                <img
                  src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg"
                  alt="Live moment 1"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="aspect-square h-[260px] w-[230px] overflow-hidden rounded-lg bg-gray-900">
                <img
                  src="https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg"
                  alt="Live moment 2"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="aspect-square h-[260px] w-[230px] overflow-hidden rounded-lg bg-gray-900">
                <img
                  src="https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg"
                  alt="Live moment 3"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
