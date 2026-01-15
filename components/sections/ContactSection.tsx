'use client'

import Image from 'next/image'
import { HiEnvelope, HiPhone } from 'react-icons/hi2'

import EdgeDecorations from '@/components/animations/EdgeDecorations'
import SplitText from '@/components/animations/SplitText'
import Footer from '@/components/Footer'

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen snap-start snap-always flex-col justify-between bg-transparent px-6 pt-[80px] pb-5 md:px-12"
    >
      <EdgeDecorations />
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="space-y-16">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <SplitText
                text="BOOKING"
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
          </div>

          {/* Main CTA Section */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left - CTA Content */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <p className="text-xl leading-relaxed text-white/80 md:text-2xl">
                  Ready to create a unique musical experience?
                </p>
                <p className="mb-0 text-xl leading-relaxed text-white/80 md:text-2xl">
                  Get in touch to book shows, collaborations, or events.
                </p>
                <p className="text-lg leading-relaxed text-white/60">
                  Let&apos;s turn your idea into sonic reality.
                </p>
              </div>

              <div className="space-y-3">
                <p className="mb-4 text-sm font-semibold tracking-wider text-white/40 uppercase">
                  What We Offer
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                    <p className="text-sm leading-relaxed text-white/70">
                      Live performances & DJ sets
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                    <p className="text-sm leading-relaxed text-white/70">
                      Music production & remixes
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                    <p className="text-sm leading-relaxed text-white/70">
                      Event curation & consulting
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                    <p className="text-sm leading-relaxed text-white/70">
                      Collaborative projects
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="mailto:contact@shufflemusic.com"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/20"
                >
                  <span className="relative z-10">GET IN TOUCH</span>
                  <div className="absolute inset-0 z-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>
                <a
                  href="tel:+5511999999999"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  <HiPhone className="h-5 w-5" />
                  <span className="relative z-10">CALL NOW</span>
                </a>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <div className="flex items-center gap-4">
                  <HiEnvelope className="h-5 w-5 text-white/60" />
                  <a
                    href="mailto:contact@shufflemusic.com"
                    className="text-lg text-white transition-colors hover:text-white/80"
                  >
                    contact@shufflemusic.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <HiPhone className="h-5 w-5 text-white/60" />
                  <a
                    href="tel:+5511999999999"
                    className="text-lg text-white transition-colors hover:text-white/80"
                  >
                    +55 11 99999-9999
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Visual Element */}
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg">
                <Image
                  src="/VinylRecords.gif"
                  alt="Vinyl Records Animation"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  )
}
