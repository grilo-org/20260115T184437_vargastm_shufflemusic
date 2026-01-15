'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { BsFillCameraReelsFill } from 'react-icons/bs'
import { FaCompactDisc, FaHeadphones, FaTicket } from 'react-icons/fa6'
import { IoMdMail } from 'react-icons/io'

import { useSynchronizedAnimation } from '@/lib/hooks/useSynchronizedAnimation'

export default function NavigationMenu() {
  const menuRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const isHoveredRef = useRef(false)
  const hasHeroScreenChangedRef = useRef(false)
  const menuContainerRef = useRef<HTMLDivElement>(null)
  const isInHeroModeRef = useRef(true)
  const menuAnimationRef = useRef<ReturnType<typeof gsap.to> | null>(null)
  const indicatorAnimationRef = useRef<ReturnType<typeof gsap.to> | null>(null)
  const isMouseOverMenuRef = useRef(false)
  const initialAnimationCompleteRef = useRef(false)

  useSynchronizedAnimation(menuRef, { direction: 'left' })

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const cancelAnimation = (animationRef: {
    current: ReturnType<typeof gsap.to> | null
  }) => {
    if (animationRef.current) {
      animationRef.current.kill()
      animationRef.current = null
    }
  }

  const animateIndicator = (
    opacity: number,
    scale: number,
    duration: number,
    ease: string,
  ) => {
    if (!indicatorRef.current) return

    cancelAnimation(indicatorAnimationRef)
    indicatorAnimationRef.current = gsap.to(indicatorRef.current, {
      opacity,
      scale,
      duration,
      ease,
      onComplete: () => {
        indicatorAnimationRef.current = null
      },
    })
  }

  const animateMenu = (opacity: number, x: number, duration: number) => {
    if (!menuRef.current) return

    cancelAnimation(menuAnimationRef)
    const buttons = Array.from(menuRef.current.children)
    menuAnimationRef.current = gsap.to(buttons, {
      opacity,
      x,
      duration,
      stagger: opacity === 1 ? 0.05 : 0,
      ease: opacity === 1 ? 'power2.out' : 'power2.in',
      onComplete: () => {
        menuAnimationRef.current = null
      },
    })
  }

  const showMenu = () => {
    if (menuRef.current && !isHoveredRef.current && !isInHeroModeRef.current) {
      isHoveredRef.current = true
      animateMenu(1, 0, 0.5)
      animateIndicator(0, 0.8, 0.3, 'power2.in')
    }
  }

  const hideMenu = () => {
    if (
      menuRef.current &&
      isHoveredRef.current &&
      !isInHeroModeRef.current &&
      !isMouseOverMenuRef.current
    ) {
      isHoveredRef.current = false
      animateMenu(0, -30, 0.3)

      if (indicatorRef.current && !isInHeroModeRef.current) {
        animateIndicator(1, 1, 0.4, 'power2.out')
      }
    }
  }

  const highlightIndicator = () => {
    if (
      indicatorRef.current &&
      !isHoveredRef.current &&
      !isInHeroModeRef.current
    ) {
      gsap.to(indicatorRef.current, {
        opacity: 0.8,
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const dimIndicator = () => {
    if (
      indicatorRef.current &&
      !isHoveredRef.current &&
      !isInHeroModeRef.current
    ) {
      gsap.to(indicatorRef.current, {
        opacity: 0.4,
        scale: 1,
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }

  useEffect(() => {
    if (menuRef.current) {
      gsap.set(menuRef.current.children, {
        opacity: 0,
        x: -30,
      })
    }

    const detectVisibleSection = () => {
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      const heroSectionHeight = viewportHeight

      if (scrollPosition < heroSectionHeight * 0.5) {
        return 'hero'
      }

      const sections = ['about', 'releases', 'livesets', 'events', 'contact']
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const rect = section.getBoundingClientRect()
          if (
            rect.top <= viewportHeight / 2 &&
            rect.bottom >= viewportHeight / 2
          ) {
            return sectionId
          }
        }
      }

      return 'hero'
    }

    const hideIndicator = () => {
      if (indicatorRef.current) {
        cancelAnimation(indicatorAnimationRef)
        gsap.set(indicatorRef.current, {
          opacity: 0,
          scale: 0.8,
        })
      }
    }

    const showIndicatorPulse = () => {
      if (
        indicatorRef.current &&
        !isHoveredRef.current &&
        !isInHeroModeRef.current
      ) {
        gsap.set(indicatorRef.current, {
          opacity: 0.4,
          scale: 1,
        })
        indicatorAnimationRef.current = gsap.to(indicatorRef.current, {
          opacity: 0.6,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        })
      }
    }

    const updateSectionState = () => {
      const currentSection = detectVisibleSection()
      const isHero = currentSection === 'hero'

      isInHeroModeRef.current = isHero && hasHeroScreenChangedRef.current

      if (isHero && hasHeroScreenChangedRef.current) {
        if (menuRef.current && !isHoveredRef.current) {
          isHoveredRef.current = true
        }
        if (initialAnimationCompleteRef.current && menuRef.current) {
          gsap.set(menuRef.current.children, {
            opacity: 1,
            x: 0,
          })
        }
        hideIndicator()
      } else if (!isHero) {
        if (
          menuRef.current &&
          isHoveredRef.current &&
          !isMouseOverMenuRef.current
        ) {
          isHoveredRef.current = false
          animateMenu(0, -30, 0.3)
        }
        showIndicatorPulse()
      } else {
        hideIndicator()
      }
    }

    const initIndicatorTimer = setTimeout(() => {
      const currentSection = detectVisibleSection()
      const isHero = currentSection === 'hero'
      const shouldShowIndicator =
        !isHero && !hasHeroScreenChangedRef.current && !isInHeroModeRef.current

      if (indicatorRef.current && shouldShowIndicator) {
        gsap.set(indicatorRef.current, {
          opacity: 0.4,
          scale: 1,
        })
        indicatorAnimationRef.current = gsap.to(indicatorRef.current, {
          opacity: 0.6,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        })
      } else if (indicatorRef.current && isHero) {
        hideIndicator()
      }
    }, 2000)

    const handleScreenChange = () => {
      hasHeroScreenChangedRef.current = true

      if (menuRef.current) {
        isHoveredRef.current = true
      }

      if (indicatorRef.current) {
        animateIndicator(0, 0.8, 0.5, 'power2.in')
      }

      setTimeout(() => {
        initialAnimationCompleteRef.current = true
        updateSectionState()
      }, 2500)
    }

    let mouseMoveTimeout: ReturnType<typeof setTimeout> | null = null
    const handleMouseMove = (e: MouseEvent) => {
      const threshold = 100

      if (mouseMoveTimeout) {
        clearTimeout(mouseMoveTimeout)
      }

      if (!isInHeroModeRef.current) {
        if (menuContainerRef.current) {
          const menuRect = menuContainerRef.current.getBoundingClientRect()
          const isOverMenu =
            e.clientX >= menuRect.left - 50 &&
            e.clientX <= menuRect.right + 50 &&
            e.clientY >= menuRect.top - 50 &&
            e.clientY <= menuRect.bottom + 50

          isMouseOverMenuRef.current = isOverMenu

          if (isOverMenu) {
            highlightIndicator()
            showMenu()
            return
          }
        }

        if (e.clientX <= threshold) {
          highlightIndicator()
          showMenu()
        } else if (e.clientX > threshold + 200) {
          mouseMoveTimeout = setTimeout(() => {
            if (!isMouseOverMenuRef.current) {
              dimIndicator()
              hideMenu()
            }
          }, 100)
        }
      }
    }

    const handleMenuEnter = () => {
      if (!isInHeroModeRef.current) {
        isMouseOverMenuRef.current = true
        highlightIndicator()
        showMenu()
      }
    }

    const handleMenuLeave = () => {
      if (!isInHeroModeRef.current) {
        isMouseOverMenuRef.current = false
        setTimeout(() => {
          if (!isMouseOverMenuRef.current) {
            dimIndicator()
            hideMenu()
          }
        }, 150)
      }
    }

    window.addEventListener('heroScreenChanged', handleScreenChange)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', updateSectionState, { passive: true })

    const setupMenuListeners = setTimeout(() => {
      if (menuContainerRef.current) {
        menuContainerRef.current.addEventListener('mouseenter', handleMenuEnter)
        menuContainerRef.current.addEventListener('mouseleave', handleMenuLeave)
      }
    }, 0)

    updateSectionState()

    return () => {
      window.removeEventListener('heroScreenChanged', handleScreenChange)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', updateSectionState)
      if (menuContainerRef.current) {
        menuContainerRef.current.removeEventListener(
          'mouseenter',
          handleMenuEnter,
        )
        menuContainerRef.current.removeEventListener(
          'mouseleave',
          handleMenuLeave,
        )
      }
      cancelAnimation(menuAnimationRef)
      cancelAnimation(indicatorAnimationRef)
      clearTimeout(initIndicatorTimer)
      clearTimeout(setupMenuListeners)
      if (mouseMoveTimeout) {
        clearTimeout(mouseMoveTimeout)
      }
    }
  }, [])

  return (
    <>
      {/* Visual subtle indicator on the left edge */}
      <div
        ref={indicatorRef}
        className="pointer-events-none fixed top-1/2 left-0 z-40 -translate-y-1/2"
        style={{ opacity: 0 }}
      >
        <div className="relative h-32 w-1 rounded-r-full bg-white/30 backdrop-blur-sm">
          {/* Central pulse point */}
          <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 blur-sm" />
        </div>
      </div>

      {/* Navigation menu */}
      <div
        ref={menuContainerRef}
        className="fixed top-1/2 left-6 z-50 flex -translate-y-1/2 flex-col gap-4 md:left-8"
      >
        <div ref={menuRef} className="flex flex-col gap-4">
          <button
            onClick={() => scrollToSection('about')}
            className="group relative flex h-12 w-12 items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:w-auto hover:overflow-hidden hover:border-white/40 hover:bg-white/10 hover:pr-4"
            aria-label="Shuffle"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <FaHeadphones className="h-5 w-5 text-white" />
            </div>
            <span className="max-w-0 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
              Shuffle
            </span>
          </button>
          <button
            onClick={() => scrollToSection('releases')}
            className="group relative flex h-12 w-12 items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:w-auto hover:overflow-hidden hover:border-white/40 hover:bg-white/10 hover:pr-4"
            aria-label="Releases"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <FaCompactDisc className="h-5 w-5 text-white" />
            </div>
            <span className="max-w-0 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
              Releases
            </span>
          </button>
          <button
            onClick={() => scrollToSection('livesets')}
            className="group relative flex h-12 w-12 items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:w-auto hover:overflow-hidden hover:border-white/40 hover:bg-white/10 hover:pr-4"
            aria-label="Live Sets"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <BsFillCameraReelsFill className="h-5 w-5 text-white" />
            </div>
            <span className="max-w-0 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
              Live Sets
            </span>
          </button>
          <button
            onClick={() => scrollToSection('events')}
            className="group relative flex h-12 w-12 items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:w-auto hover:overflow-hidden hover:border-white/40 hover:bg-white/10 hover:pr-4"
            aria-label="Events"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <FaTicket className="h-5 w-5 text-white" />
            </div>
            <span className="max-w-0 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
              Events
            </span>
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="group relative flex h-12 w-12 items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:w-auto hover:overflow-hidden hover:border-white/40 hover:bg-white/10 hover:pr-4"
            aria-label="Booking"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <IoMdMail className="h-5 w-5 text-white" />
            </div>
            <span className="max-w-0 text-xs font-medium whitespace-nowrap text-white opacity-0 transition-all duration-300 group-hover:max-w-[200px] group-hover:opacity-100">
              Booking
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
