import { useEffect, useRef, useState } from 'react'

interface UseAudioPlayerOptions {
  src: string
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
}

export function useAudioPlayer({
  src,
  onPlay,
  onPause,
  onEnded,
}: UseAudioPlayerOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Initialize audio element once
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src)
      audioRef.current.preload = 'auto'
      audioRef.current.load()
    }

    const audio = audioRef.current

    // Update src if it changed (compare only the pathname to avoid problems with absolute vs relative URLs)
    const currentPath = new URL(audio.src).pathname
    const newPath = new URL(src, window.location.href).pathname
    if (currentPath !== newPath) {
      const wasPlaying = !audio.paused
      audio.pause()
      audio.src = src
      audio.load()
      if (wasPlaying) {
        audio.play().catch(console.error)
      }
    }

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      onEnded?.()
    }
    const handlePlay = () => {
      setIsPlaying(true)
      onPlay?.()
    }
    const handlePause = () => {
      setIsPlaying(false)
      onPause?.()
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [src, onPlay, onPause, onEnded])

  const play = async () => {
    if (!audioRef.current) {
      throw new Error('Audio element not initialized')
    }

    const audio = audioRef.current

    try {
      // If the audio is not ready, wait for it to load
      if (audio.readyState < 2) {
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('error', handleError)
            reject(new Error('Timeout waiting for audio to load'))
          }, 10000) // 10 seconds timeout

          const handleCanPlay = () => {
            clearTimeout(timeout)
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('error', handleError)
            resolve()
          }
          const handleError = () => {
            clearTimeout(timeout)
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('error', handleError)
            reject(new Error('Failed to load audio'))
          }
          audio.addEventListener('canplay', handleCanPlay, { once: true })
          audio.addEventListener('error', handleError, { once: true })
          audio.load()
        })
      }
      await audio.play()
    } catch (error) {
      console.error('Error playing audio:', error)
      throw error
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const toggle = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time) // Update the state also
    }
  }

  // Cleanup when unmounting
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }
    }
  }, [])

  return {
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    toggle,
    seek,
  }
}
