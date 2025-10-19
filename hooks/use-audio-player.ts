"use client"

import { useEffect, useRef, useState, useCallback } from 'react'

export interface UseAudioPlayerOptions {
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onError?: (error: Error) => void
}

export function useAudioPlayer(options?: UseAudioPlayerOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const optionsRef = useRef(options)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null)

  // Keep options ref up to date
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.loop = true // Enable seamless looping
    audioRef.current.preload = 'auto'

    const audio = audioRef.current

    // Event handlers
    const handleCanPlay = () => {
      setIsLoading(false)
    }

    const handlePlay = () => {
      setIsPlaying(true)
      optionsRef.current?.onPlay?.()
    }

    const handlePause = () => {
      setIsPlaying(false)
      optionsRef.current?.onPause?.()
    }

    const handleEnded = () => {
      optionsRef.current?.onEnded?.()
    }

    const handleError = () => {
      const err = new Error('Failed to load audio')
      setError(err)
      setIsLoading(false)
      setIsPlaying(false)
      optionsRef.current?.onError?.(err)
    }

    const handleLoadStart = () => {
      setIsLoading(true)
    }

    // Attach event listeners
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)
    audio.addEventListener('loadstart', handleLoadStart)

    return () => {
      // Cleanup
      if (playPromiseRef.current) {
        playPromiseRef.current.then(() => audio.pause()).catch(() => {})
      } else {
        audio.pause()
      }
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('loadstart', handleLoadStart)
      audioRef.current = null
    }
  }, [])

  // Load and play a track
  const play = useCallback((trackId: string, audioUrl: string) => {
    if (!audioRef.current) return

    const audio = audioRef.current
    
    // Wait for any pending play promise
    if (playPromiseRef.current) {
      playPromiseRef.current.then(() => {
        playTrack()
      }).catch(() => {
        playTrack()
      })
      return
    }
    
    playTrack()
    
    function playTrack() {
      if (!audioRef.current) return
      const audio = audioRef.current
      
      // If same track, just resume
      if (trackId === currentTrackId && audio.src) {
        playPromiseRef.current = audio.play().catch(err => {
          console.error('Play error:', err)
          setError(null) // Clear error silently for autoplay restrictions
          setIsPlaying(false)
        }).finally(() => {
          playPromiseRef.current = null
        })
        return
      }

      // Load new track
      setIsLoading(true)
      setError(null)
      setCurrentTrackId(trackId)
      
      audio.src = audioUrl
      audio.load()
      
      // Wait for audio to be ready, then play
      const playWhenReady = () => {
        playPromiseRef.current = audio.play().catch(err => {
          console.error('Play error:', err)
          setError(null) // Clear error silently
          setIsLoading(false)
          setIsPlaying(false)
        }).finally(() => {
          playPromiseRef.current = null
        })
      }
      
      // Try to play immediately, or wait for canplay
      if (audio.readyState >= 2) {
        playWhenReady()
      } else {
        audio.addEventListener('canplay', playWhenReady, { once: true })
      }
    }
  }, [currentTrackId])

  // Pause current track
  const pause = useCallback(() => {
    if (!audioRef.current) return
    
    // Wait for play promise to resolve before pausing
    if (playPromiseRef.current) {
      playPromiseRef.current.then(() => {
        audioRef.current?.pause()
      }).catch(() => {
        // Play was already rejected, safe to pause
        audioRef.current?.pause()
      }).finally(() => {
        playPromiseRef.current = null
      })
    } else {
      audioRef.current.pause()
    }
  }, [])

  // Toggle play/pause
  const toggle = useCallback(() => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      pause()
    } else if (audioRef.current.src) {
      playPromiseRef.current = audioRef.current.play().catch(err => {
        console.error('Play error:', err)
        setError(null) // Clear error silently
        setIsPlaying(false)
      }).finally(() => {
        playPromiseRef.current = null
      })
    }
  }, [isPlaying, pause])

  // Stop and clear
  const stop = useCallback(() => {
    if (!audioRef.current) return
    
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setCurrentTrackId(null)
  }, [])

  return {
    play,
    pause,
    toggle,
    stop,
    isPlaying,
    isLoading,
    error,
    currentTrackId,
  }
}

