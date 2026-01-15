'use client'

import {
  type KeyboardEvent,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  FaApple,
  FaPause,
  FaPlay,
  FaSoundcloud,
  FaSpotify,
  FaYoutube,
} from 'react-icons/fa6'
import { LuMousePointerClick } from 'react-icons/lu'

import { albums } from '@/lib/albums'
import { useAudioPlayer } from '@/lib/hooks/useAudioPlayer'

interface StackedAlbumsProps {
  onAlbumSelect?: (id: number | null) => void
}

export default function StackedAlbums({ onAlbumSelect }: StackedAlbumsProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null)
  const [openedAlbum, setOpenedAlbum] = useState<number | null>(null)
  const [playingAlbum, setPlayingAlbum] = useState<number | null>(null)
  const [centerOffset, setCenterOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rotationRefs = useRef<Map<number, number>>(new Map())
  const animationRefs = useRef<Map<number, number>>(new Map())
  const pendingAlbumRef = useRef<number | null>(null)

  // State for the current audio src
  const [currentAudioSrc, setCurrentAudioSrc] = useState<string>(
    albums[0]?.audioSrc,
  )

  // Audio player - usa a música do álbum selecionado
  const audioPlayer = useAudioPlayer({
    src: currentAudioSrc,
    onPlay: () => {
      // When the audio really starts playing, confirm the visual state
      if (pendingAlbumRef.current !== null) {
        setPlayingAlbum(pendingAlbumRef.current)
        pendingAlbumRef.current = null
      }
    },
    onPause: () => {
      // When paused, clear the state
      setPlayingAlbum(null)
      pendingAlbumRef.current = null
    },
    onEnded: () => {
      handleAlbumClick(playingAlbum || 0)
      setPlayingAlbum(null)
      pendingAlbumRef.current = null
    },
  })

  useEffect(() => {
    const calculateCenter = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const screenCenter = window.innerWidth / 2
        const containerLeft = rect.left
        setCenterOffset(screenCenter - containerLeft)
      }
    }

    calculateCenter()
    window.addEventListener('resize', calculateCenter)
    return () => window.removeEventListener('resize', calculateCenter)
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) {
        clearTimeout(openTimeoutRef.current)
      }
    }
  }, [])

  const handleAlbumClick = (id: number) => {
    // Clear any pending timeout
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }

    if (selectedAlbum === id) {
      // Deselect - reset rotation of the disc to 0
      const discElement = document.querySelector(
        `[data-album-id="${id}"] .vinyl-rotating-disc`,
      ) as HTMLElement

      if (discElement) {
        // Cancel animation if it is playing
        const animId = animationRefs.current.get(id)
        if (animId) {
          cancelAnimationFrame(animId)
          animationRefs.current.delete(id)
        }

        // Reset rotation to 0
        rotationRefs.current.set(id, 0)
        discElement.style.animation = 'none'
        discElement.style.transform = 'rotate(0deg)'
      }

      setSelectedAlbum(null)
      setOpenedAlbum(null)
      // Sempre reseta a música quando fecha o disco, mesmo que não esteja tocando
      if (playingAlbum === id || pendingAlbumRef.current === id) {
        audioPlayer.pause()
        setPlayingAlbum(null)
        pendingAlbumRef.current = null
      }
      // Reseta a música para o início sempre que fecha o disco
      audioPlayer.seek(0)
      onAlbumSelect?.(null)
    } else {
      // Select and wait for animation to finish before opening
      setSelectedAlbum(id)
      setOpenedAlbum(null)
      // Se estava tocando outro ?lbum, para ele
      if (
        (playingAlbum !== null && playingAlbum !== id) ||
        (pendingAlbumRef.current !== null && pendingAlbumRef.current !== id)
      ) {
        audioPlayer.pause()
        setPlayingAlbum(null)
        pendingAlbumRef.current = null
      }
      onAlbumSelect?.(id)
      openTimeoutRef.current = setTimeout(() => {
        setOpenedAlbum(id)
        openTimeoutRef.current = null
      }, 700) // Wait for the slide down animation to complete
    }
  }

  const handlePlayClick = async (id: number, e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation()

    if (playingAlbum === id) {
      // If it is playing, pause it
      audioPlayer.pause()
      setPlayingAlbum(null)
      pendingAlbumRef.current = null
    } else {
      // Se outro ?lbum est? tocando, para ele primeiro
      if (playingAlbum !== null) {
        audioPlayer.pause()
        setPlayingAlbum(null)
      }
      // Find the album and update the audio src
      const album = albums.find((a) => a.id === id)
      if (album) {
        // Update the audio src if it is different
        if (album.audioSrc !== currentAudioSrc) {
          setCurrentAudioSrc(album.audioSrc)
          // Wait for the hook to update the src before playing
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
        // Update the visual state immediately and mark which album should play
        setPlayingAlbum(id)
        pendingAlbumRef.current = id
        try {
          await audioPlayer.play()
          // The onPlay callback confirms the state when the audio really starts playing
        } catch (error) {
          // If it fails, revert the state
          console.error('Error playing audio:', error)
          setPlayingAlbum(null)
          pendingAlbumRef.current = null
        }
      }
    }
  }

  // Effect to manage the rotation animation
  useEffect(() => {
    albums.forEach((album) => {
      const discElement = document.querySelector(
        `[data-album-id="${album.id}"] .vinyl-rotating-disc`,
      ) as HTMLElement

      if (!discElement) return

      const isPlaying = playingAlbum === album.id
      const wasPlaying = animationRefs.current.has(album.id)

      if (isPlaying && !wasPlaying) {
        // Start animation from the current angle (or 0 if it is the first time)
        const currentRotation = rotationRefs.current.get(album.id) || 0
        let startTime: number | null = null
        let startRotation = currentRotation

        const animate = (timestamp: number) => {
          if (startTime === null) {
            startTime = timestamp
          }

          const elapsed = (timestamp - startTime) / 1000 // in seconds
          const rotationSpeed = 120 // degrees per second (360 degrees in 3 seconds)
          const newRotation = (startRotation + elapsed * rotationSpeed) % 360

          discElement.style.transform = `rotate(${newRotation}deg)`
          rotationRefs.current.set(album.id, newRotation)

          if (playingAlbum === album.id) {
            const animId = requestAnimationFrame(animate)
            animationRefs.current.set(album.id, animId)
          }
        }

        // Start animation
        discElement.style.animation = 'none'
        discElement.style.transform = `rotate(${currentRotation}deg)`
        const animId = requestAnimationFrame(animate)
        animationRefs.current.set(album.id, animId)
      } else if (!isPlaying && wasPlaying) {
        // Pause - use the saved value in rotationRefs (more reliable)
        const animId = animationRefs.current.get(album.id)
        if (animId) {
          cancelAnimationFrame(animId)
          animationRefs.current.delete(album.id)
        }

        // Use the saved value (updated every frame)
        const savedRotation = rotationRefs.current.get(album.id) || 0

        // Keep the disc in the current position
        discElement.style.animation = 'none'
        discElement.style.transform = `rotate(${savedRotation}deg)`
      }
    })

    // Cleanup - cancel all animations when unmounting
    return () => {
      animationRefs.current.forEach((animId) => {
        cancelAnimationFrame(animId)
      })
      animationRefs.current.clear()
    }
  }, [playingAlbum])

  return (
    <div className="relative w-full space-y-8" ref={containerRef}>
      <div className="relative flex min-h-[300px] items-start justify-start">
        {albums.map((album, index) => {
          const isSelected = selectedAlbum === album.id
          const baseOffset = index * 100 // Horizontal spacing - reduced for better balance
          const stackRotation = (index - 1) * 8 // Subtle rotation for depth
          const verticalOffset = index * 5 // Small vertical stagger for natural look
          const zIndex = 30 - index * 10 // First album on top (30, 20, 10)

          return (
            <div
              key={album.id}
              className="group absolute cursor-pointer transition-all duration-700 ease-out"
              style={{
                left: isSelected ? `${centerOffset}px` : `${baseOffset}px`,
                top: '0',
                transform: isSelected
                  ? 'translateX(-50%) translateY(350px) rotate(0deg)'
                  : `translateY(${verticalOffset}px) rotate(${stackRotation}deg)`,
                zIndex: zIndex,
              }}
              onClick={() => handleAlbumClick(album.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleAlbumClick(album.id)
                }
              }}
              data-album-id={album.id}
            >
              {/* Album container */}
              <div
                className={`album-container relative h-72 w-72 ${openedAlbum === album.id ? 'album-opened' : ''} ${!isSelected ? 'group-hover:scale-105' : ''} transition-transform duration-300`}
              >
                <div className="relative aspect-square">
                  {/* Vinyl disc - starts hidden behind, slides out when opened */}
                  <div className="absolute inset-0 flex items-center justify-end pr-0">
                    <div className="vinyl-disc relative h-[90%] w-[90%] rounded-full bg-linear-to-br from-gray-800 via-gray-900 to-black shadow-2xl">
                      {/* Inner rotating disc */}
                      <div className="vinyl-rotating-disc absolute inset-0 rounded-full">
                        {/* Vinyl grooves */}
                        <div className="absolute inset-0 rounded-full border-2 border-gray-700/50" />
                        <div className="absolute inset-[8%] rounded-full border border-gray-700/30" />
                        <div className="absolute inset-[15%] rounded-full border border-gray-700/20" />
                        <div className="absolute inset-[22%] rounded-full border border-gray-700/10" />
                        {/* Center label with album cover */}
                        <div className="absolute inset-[35%] flex items-center justify-center overflow-hidden rounded-full border-2 border-gray-800 bg-linear-to-br from-gray-700 to-gray-900">
                          <img
                            src={album.albumCover}
                            alt={`${album.albumTitle} Label`}
                            className="h-full w-full object-cover"
                          />
                          {/* Center hole */}
                          <div className="absolute inset-[40%] rounded-full bg-black shadow-inner" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Album cover */}
                  <div className="album-cover relative aspect-square overflow-hidden rounded-lg bg-gray-900">
                    <img
                      src={album.albumCover}
                      alt={album.albumTitle}
                      className="h-full w-full object-cover transition-all duration-300 group-hover:brightness-110"
                    />

                    {/* Number badge */}
                    <div className="absolute top-4 left-4 z-20 font-mono text-sm text-white">
                      {album.albumNumber}
                    </div>

                    {/* Album info overlay */}
                    <div className="absolute right-0 bottom-0 left-0 z-20 bg-linear-to-t from-black/80 to-transparent p-4">
                      <div className="mb-1 text-sm font-semibold text-white">
                        {album.artist}
                      </div>
                      <div className="text-xs text-white/80">
                        {album.albumTitle}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info panel - shows when opened */}
                {openedAlbum === album.id && (
                  <div className="animate-fadeIn pointer-events-auto absolute top-0 right-full z-30 flex h-full w-[200%] flex-col items-end justify-center pr-16 pl-4 opacity-0">
                    {/* Play/Pause button */}
                    <button
                      className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white/90"
                      aria-label={
                        playingAlbum === album.id ? 'Pause album' : 'Play album'
                      }
                      onClick={(e) => handlePlayClick(album.id, e)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          handlePlayClick(album.id, e)
                        }
                      }}
                    >
                      {playingAlbum === album.id ? (
                        <FaPause className="text-2xl text-black" />
                      ) : (
                        <FaPlay className="ml-1 text-2xl text-black" />
                      )}
                    </button>

                    {/* Album details */}
                    <div className="mb-8 text-right">
                      <h3 className="mb-2 text-2xl font-bold text-white">
                        {album.albumTitle}
                      </h3>
                      <p className="mb-3 text-base text-white/60">
                        {album.artist}
                      </p>
                      <div className="flex justify-end gap-3 text-sm text-white/50">
                        <span>{album.releaseDate}</span>
                        <span>•</span>
                        <span>{album.duration}</span>
                      </div>
                    </div>

                    {/* Streaming platforms */}
                    <div className="flex flex-wrap justify-end gap-4">
                      <a
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                        aria-label="Listen on Spotify"
                        href="https://open.spotify.com/"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaSpotify className="text-xl text-white" />
                      </a>
                      <a
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                        aria-label="Listen on SoundCloud"
                        href="https://soundcloud.com/"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaSoundcloud className="text-xl text-white" />
                      </a>
                      <a
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                        aria-label="Listen on Apple Music"
                        href="https://music.apple.com/"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaApple className="text-xl text-white" />
                      </a>
                      <a
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                        aria-label="Watch on YouTube"
                        href="https://www.youtube.com/"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaYoutube className="text-xl text-white" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Instruction - only shows when no album is selected */}
      {!selectedAlbum && (
        <div className="animate-fadeIn mt-10 flex items-center justify-start gap-3 pl-4 text-sm tracking-wider text-white/40 uppercase">
          <LuMousePointerClick className="h-5 w-5 animate-bounce" />
          <span>Click on any album to explore</span>
        </div>
      )}
    </div>
  )
}
