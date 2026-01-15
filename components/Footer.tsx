'use client'

import {
  FaInstagram,
  FaSoundcloud,
  FaSpotify,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="relative mx-auto mt-16 w-full max-w-7xl border-t border-white/10 pt-8">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        {/* Copyright */}
        <div className="flex flex-col gap-2 text-center text-sm text-white/60 md:text-left">
          <p>© {new Date().getFullYear()} Shuffle Music. All rights reserved.</p>
          <p>
            Designed by{' '}
            <a
              href="https://www.github.com/vargastm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline transition-colors hover:text-white/80"
            >
              @vargastm
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20"
            aria-label="Instagram"
          >
            <FaInstagram className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20"
            aria-label="Twitter"
          >
            <FaTwitter className="h-5 w-5" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20"
            aria-label="YouTube"
          >
            <FaYoutube className="h-5 w-5" />
          </a>
          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20"
            aria-label="Spotify"
          >
            <FaSpotify className="h-5 w-5" />
          </a>
          <a
            href="https://soundcloud.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20"
            aria-label="SoundCloud"
          >
            <FaSoundcloud className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
