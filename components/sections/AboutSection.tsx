'use client'

import {
  FaInstagram,
  FaSoundcloud,
  FaSpotify,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa6'

import EdgeDecorations from '@/components/animations/EdgeDecorations'
import SplitText from '@/components/animations/SplitText'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex h-screen snap-start snap-always items-center bg-transparent px-6 py-20 md:px-12"
    >
      <EdgeDecorations />
      <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left column - Small image */}
        <div className="lg:col-span-2">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-900">
            <img
              src="https://www.sleek-mag.com/wp-content/uploads/2017/05/takashi_murakami_kanye_west.jpg"
              alt="Music"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Center column - Content */}
        <div className="space-y-6 lg:col-span-5">
          <div className="flex flex-wrap items-baseline gap-4">
            <SplitText
              text="SHUFFLE"
              className="text-5xl font-bold text-white md:text-7xl"
              delay={50}
              duration={0.8}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.2}
              rootMargin="-100px"
              textAlign="left"
              tag="h3"
            />
            <span className="text-sm tracking-wider text-white/60 uppercase">
              BRAZIL
            </span>
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              aria-label="Instagram"
            >
              <FaInstagram />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              aria-label="Twitter"
            >
              <FaTwitter />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              aria-label="Twitter"
            >
              <FaYoutube />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              aria-label="Twitter"
            >
              <FaSpotify />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              aria-label="SoundCloud"
            >
              <FaSoundcloud />
            </button>
          </div>

          {/* Genre tags */}
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              Melodic Techno
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              Progressive House
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              Indie Dance
            </span>
          </div>

          {/* Description */}
          <p className="text-lg leading-relaxed text-white/80">
            Emerging from the vibrant music scene, Shuffle crafts immersive
            electronic experiences that merge deep rhythmic pulses with ethereal
            atmospheres. Drawing inspiration from nocturnal cityscapes and the
            energy of dance floors, our sound blends delicate textures with
            mesmerizing loops, creating a meditative yet dynamic sonic
            experience.
          </p>
        </div>

        {/* Right column - Large image */}
        <div className="lg:col-span-5">
          <div className="aspect-3/4 overflow-hidden rounded-lg bg-gray-900">
            <img
              src="https://images.pexels.com/photos/7061956/pexels-photo-7061956.jpeg?_gl=1*ukgzmq*_ga*MTAyMzcwMTk2Mi4xNzY4MTM3OTUw*_ga_8JE65Q40S6*czE3NjgxMzc5NDkkbzEkZzEkdDE3NjgxMzgwMzQkajU0JGwwJGgw"
              alt="DJ performing"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
