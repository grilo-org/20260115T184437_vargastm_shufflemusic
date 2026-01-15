'use client'

import { HiCalendar, HiMapPin } from 'react-icons/hi2'

import EdgeDecorations from '@/components/animations/EdgeDecorations'
import SplitText from '@/components/animations/SplitText'
import { events } from '@/lib/events'

export default function EventsSection() {
  return (
    <section
      id="events"
      className="relative flex min-h-screen snap-start snap-always items-center justify-center bg-transparent px-6 py-[80px] md:px-12"
    >
      <EdgeDecorations />
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="space-y-16">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <SplitText
                text="EVENTS"
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
            <div className="text-2xl font-light text-white">
              {events.length}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/10"
              >
                {/* Event Image */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Event Info */}
                <div className="space-y-4 p-6">
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-white">
                      {event.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-white/60">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3 border-t border-white/10 pt-4">
                    <div className="flex items-center gap-3">
                      <HiCalendar className="h-5 w-5 text-white/60" />
                      <span className="text-sm text-white">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <HiMapPin className="h-5 w-5 text-white/60" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">
                          {event.venue}
                        </span>
                        <span className="text-xs text-white/60">
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
