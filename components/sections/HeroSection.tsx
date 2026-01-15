'use client'

import { gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import {
  FaArrowDown,
  FaInstagram,
  FaSoundcloud,
  FaSpotify,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa6'

import Orb from '@/components/animations/Orb'
import SplitText from '@/components/animations/SplitText'
import { useScrollLock } from '@/lib/hooks/useScrollLock'
import { useSynchronizedAnimation } from '@/lib/hooks/useSynchronizedAnimation'

import EdgeDecorations from '../animations/EdgeDecorations'

export default function HeroSection() {
  const [changeScreen, setchangeScreen] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const FADE_DELAY = 500
  const FADE_DURATION = 1000

  useScrollLock(!animationComplete)

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        setchangeScreen(true)
      }, FADE_DURATION)
    }, FADE_DELAY)
  }

  const socialLinksRef = useRef<HTMLDivElement>(null)

  // Hook for synchronized animation of social links
  useSynchronizedAnimation(socialLinksRef, { direction: 'right' })

  useEffect(() => {
    if (changeScreen && heroContentRef.current) {
      // Dispatch event to synchronize animations
      window.dispatchEvent(new CustomEvent('heroScreenChanged'))

      const elements = heroContentRef.current.children

      // Animate the primary content
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.3,
          onComplete: () => {
            setAnimationComplete(true)
          },
        },
      )

      // Animate the scroll indicator
      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: -20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            delay: 1.5,
          },
        )

        // Continuous pulse animation
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: 2,
        })
      }
    }
  }, [changeScreen])

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleScrollDown()
    }
  }

  return (
    <>
      {/* First screen - SHUFFLE MUSIC */}
      <main
        className={`fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-transparent transition-opacity duration-1000 ${
          fadeOut ? 'pointer-events-none invisible opacity-0' : 'opacity-100'
        }`}
      >
        <SplitText
          text="SHUFFLE MUSIC"
          className="text-center text-8xl font-semibold"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
      </main>

      {/* Second screen - Where the groove lives */}
      <section
        className={`relative flex h-screen snap-start snap-always items-center justify-center overflow-hidden bg-transparent transition-opacity duration-1000 ${
          changeScreen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="absolute inset-0 z-0">
          <Orb hoverIntensity={0.19} />
        </div>

        <EdgeDecorations />

        {/* Social links and streaming - Right side */}
        <div
          ref={socialLinksRef}
          className="absolute top-1/2 right-6 z-10 flex -translate-y-1/2 flex-col items-end gap-4 md:right-8"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 w-12 items-center justify-end overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:w-auto hover:border-white/40 hover:bg-white/10 hover:pl-4"
            aria-label="Instagram"
          >
            <span className="max-w-0 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
              Instagram
            </span>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <FaInstagram className="h-5 w-5 text-white" />
            </div>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 w-12 items-center justify-end overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:w-auto hover:border-white/40 hover:bg-white/10 hover:pl-4"
            aria-label="Twitter"
          >
            <span className="max-w-0 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
              Twitter
            </span>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <FaTwitter className="h-5 w-5 text-white" />
            </div>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 w-12 items-center justify-end overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:w-auto hover:border-white/40 hover:bg-white/10 hover:pl-4"
            aria-label="YouTube"
          >
            <span className="max-w-0 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
              YouTube
            </span>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <FaYoutube className="h-5 w-5 text-white" />
            </div>
          </a>
          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 w-12 items-center justify-end overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:w-auto hover:border-white/40 hover:bg-white/10 hover:pl-4"
            aria-label="Spotify"
          >
            <span className="max-w-0 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
              Spotify
            </span>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <FaSpotify className="h-5 w-5 text-white" />
            </div>
          </a>
          <a
            href="https://soundcloud.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 w-12 items-center justify-end overflow-hidden rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:w-auto hover:border-white/40 hover:bg-white/10 hover:pl-4"
            aria-label="SoundCloud"
          >
            <span className="max-w-0 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
              SoundCloud
            </span>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <FaSoundcloud className="h-5 w-5 text-white" />
            </div>
          </a>
        </div>

        {/* Primary content */}
        <div
          ref={heroContentRef}
          className="relative z-10 mx-auto mt-8 flex max-w-4xl flex-col items-center justify-center px-4"
        >
          <h1 className="text-center text-6xl font-bold text-white md:text-8xl">
            <SplitText
              text="Where the"
              tag="span"
              className="block"
              delay={80}
              duration={0.8}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="0px"
              textAlign="center"
            />
            <SplitText
              text="groove lives."
              tag="span"
              className="block pb-1"
              delay={80}
              duration={0.8}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="0px"
              textAlign="center"
            />
          </h1>

          {/* Get in touch button */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={handleScrollDown}
              className="group relative overflow-hidden rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20"
            >
              <span className="relative z-10">Get in touch</span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          onClick={handleScrollDown}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer"
        >
          <div className="flex flex-col items-center gap-2 text-white/70 transition-colors hover:text-white">
            <span className="text-xs font-medium tracking-wider uppercase">
              Scroll
            </span>
            <FaArrowDown className="h-6 w-6 animate-bounce" />
          </div>
        </div>
      </section>
    </>
  )
}
