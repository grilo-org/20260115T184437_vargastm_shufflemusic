import { useEffect, useLayoutEffect } from 'react'

/**
 * Hook to lock scroll during animations
 * @param isLocked
 */
export function useScrollLock(isLocked: boolean) {
  // Ensure the page starts at the top on mount initial
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  // Manage overflow and prevent scroll events
  useEffect(() => {
    if (!isLocked) {
      // Release scroll when unlocked
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      return
    }

    // Lock scroll and prevent scroll events
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowUp' ||
        e.key === 'PageDown' ||
        e.key === 'PageUp' ||
        e.key === 'Home' ||
        e.key === 'End' ||
        e.key === ' '
      ) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    // Add listeners
    window.addEventListener('wheel', handleWheel, {
      passive: false,
      capture: true,
    })
    window.addEventListener('touchmove', handleTouchMove, {
      passive: false,
      capture: true,
    })
    window.addEventListener('keydown', handleKeyDown, {
      capture: true,
    })

    return () => {
      // Cleanup: remove listeners and release scroll
      window.removeEventListener('wheel', handleWheel, {
        capture: true,
      } as EventListenerOptions)
      window.removeEventListener('touchmove', handleTouchMove, {
        capture: true,
      } as EventListenerOptions)
      window.removeEventListener('keydown', handleKeyDown, {
        capture: true,
      } as EventListenerOptions)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isLocked])
}
