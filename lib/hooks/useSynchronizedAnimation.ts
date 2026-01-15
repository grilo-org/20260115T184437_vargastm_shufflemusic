import { gsap } from 'gsap'
import { type RefObject, useEffect, useRef } from 'react'

interface UseSynchronizedAnimationOptions {
  /**
   * Animation direction: 'left' to animate from the left, 'right' to animate from the right
   */
  direction?: 'left' | 'right'
  /**
   * Delay before starting the animation (in seconds)
   * @default 1
   */
  delay?: number
  /**
   * Animation duration (in seconds)
   * @default 0.8
   */
  duration?: number
  /**
   * Interval between each element (in seconds)
   * @default 0.1
   */
  stagger?: number
  /**
   * Animation easing
   * @default 'power2.out'
   */
  ease?: string
}

/**
 * Hook that synchronizes animations of child elements with the 'heroScreenChanged' event
 * Used to animate side menus (navigation and social links) synchronizedly
 */
export function useSynchronizedAnimation(
  elementRef: RefObject<Element | null>,
  options: UseSynchronizedAnimationOptions = {},
) {
  const {
    direction = 'right',
    delay = 1,
    duration = 0.8,
    stagger = 0.1,
    ease = 'power2.out',
  } = options

  const animationRef = useRef<ReturnType<typeof gsap.fromTo> | null>(null)

  useEffect(() => {
    const handleScreenChange = () => {
      if (elementRef.current && elementRef.current.children.length > 0) {
        // Cancel the previous animation if it exists
        if (animationRef.current) {
          animationRef.current.kill()
        }

        const children = elementRef.current.children
        const initialX = direction === 'left' ? -30 : 30

        // Ensure the elements are in the initial state before animating
        gsap.set(children, {
          opacity: 0,
          x: initialX,
        })

        animationRef.current = gsap.fromTo(
          children,
          {
            opacity: 0,
            x: initialX,
          },
          {
            opacity: 1,
            x: 0,
            duration,
            stagger,
            ease,
            delay,
            onComplete: () => {
              animationRef.current = null
            },
          },
        )
      }
    }

    // Listen to the heroScreenChanged event from the HeroSection
    window.addEventListener('heroScreenChanged', handleScreenChange)

    return () => {
      window.removeEventListener('heroScreenChanged', handleScreenChange)
      // Cancel the animation when unmounting
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [elementRef, direction, delay, duration, stagger, ease])
}
