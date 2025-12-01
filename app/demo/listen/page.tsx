"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudioPlayer } from '@/hooks/use-audio-player'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

// All soundscapes from all categories
const demoSoundscapes = [
  // Burnout
  { id: 'shipping-too-fast', name: 'shipping too fast', category: 'burnout', file: 'Shipping Too Fast.mp3' },
  { id: 'slept-at-desk', name: 'slept at desk', category: 'burnout', file: 'Slept at Desk.wav' },
  { id: 'forgot-to-eat', name: 'forgot to eat', category: 'burnout', file: 'Forgot to Eat.wav' },
  { id: 'brain-fog', name: 'brain fog', category: 'burnout', file: 'Brain Fog.wav' },
  { id: 'running-on-fumes', name: 'running on fumes', category: 'burnout', file: 'Running on Fumes.wav' },
  
  // Overload
  { id: 'one-too-many-hats', name: 'one too many hats', category: 'overload', file: 'One Too Many Hats.wav' },
  { id: 'everything-on-fire', name: "everything's on fire", category: 'overload', file: 'fire.wav' },
  { id: 'ten-tabs-deep', name: 'ten tabs deep', category: 'overload', file: 'Ten Tabs Deep.wav' },
  { id: 'drowning-in-pings', name: 'drowning in pings', category: 'overload', file: 'Drowning in Pings.wav' },
  { id: 'zero-quiet', name: 'zero quiet', category: 'overload', file: 'Zero Quiet.wav' },
  
  // Anxious
  { id: 'dread-of-marketing', name: 'the dread of marketing', category: 'anxious', file: 'the dread of marketing.wav' },
  { id: 'runway-math', name: 'runway math', category: 'anxious', file: 'Runway Math.wav' },
  { id: 'waiting-on-replies', name: 'waiting on replies', category: 'anxious', file: 'Waiting on Replies.wav' },
  { id: 'imposter-hour', name: 'imposter hour', category: 'anxious', file: 'Imposter Hour.wav' },
  { id: 'distributed-my-guts', name: 'distributed my guts', category: 'anxious', file: 'Distributed My Guts.wav' },
  
  // Scattered
  { id: 'twelve-tabs-open', name: 'twelve tabs open', category: 'scattered', file: 'Twelve Tabs Open.wav' },
  { id: 'idea-avalanche', name: 'idea avalanche', category: 'scattered', file: 'Idea Avalanche.wav' },
  { id: 'forgot-the-point', name: 'forgot the point', category: 'scattered', file: 'Forgot the Point.wav' },
  { id: 'dopamine-chase', name: 'dopamine chase', category: 'scattered', file: 'Dopamine Chase.wav' },
  { id: 'cant-start', name: "can't start", category: 'scattered', file: "Can't Start.wav" },
  { id: 'cant-stop', name: "can't stop", category: 'scattered', file: "Can't Stop.wav" },
  { id: 'half-built-everything', name: 'half built everything', category: 'scattered', file: 'Half Built Everything.wav' },
  { id: 'scrolling-instead', name: 'scrolling instead', category: 'scattered', file: 'Scrolling Instead.wav' },
]

const storageUrl = 'https://gbyvackgdmzrfawmeuhd.supabase.co/storage/v1/object/public/soundscapes'

// Category color schemes matching landing page
const categoryColors = {
  burnout: {
    gradient: 'from-red-500/20 to-orange-500/20',
    ring: 'border-red-500/40',
    glow: 'rgba(239, 68, 68, 0.4)', // red-500
  },
  overload: {
    gradient: 'from-yellow-500/20 to-orange-500/20',
    ring: 'border-yellow-500/40',
    glow: 'rgba(234, 179, 8, 0.4)', // yellow-500
  },
  anxious: {
    gradient: 'from-purple-500/20 to-pink-500/20',
    ring: 'border-purple-500/40',
    glow: 'rgba(168, 85, 247, 0.4)', // purple-500
  },
  scattered: {
    gradient: 'from-blue-500/20 to-cyan-500/20',
    ring: 'border-blue-500/40',
    glow: 'rgba(59, 130, 246, 0.4)', // blue-500
  },
}

export default function Listen() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)
  const [showFeedbackButton, setShowFeedbackButton] = useState(false)
  const wasPlayingRef = useRef(false)
  const prevTrackIdRef = useRef<string | null>(null)
  const currentTrack = demoSoundscapes[currentIndex]
  const categoryColor = categoryColors[currentTrack.category as keyof typeof categoryColors]

  const { play, pause, isPlaying, currentTrackId } = useAudioPlayer({
    onPlayNext: () => {
      // Auto-play next track when current one ends
      wasPlayingRef.current = true
      setCurrentIndex(prev => prev === demoSoundscapes.length - 1 ? 0 : prev + 1)
    }
  })

  // Update ref when playing state changes
  useEffect(() => {
    if (isPlaying && currentTrackId === currentTrack.id) {
      wasPlayingRef.current = true
    } else if (!isPlaying && currentTrackId === currentTrack.id) {
      wasPlayingRef.current = false
    }
  }, [isPlaying, currentTrackId, currentTrack.id])

  const handlePlayPause = useCallback(() => {
    if (isPlaying && currentTrackId === currentTrack.id) {
      pause()
      wasPlayingRef.current = false
    } else {
      wasPlayingRef.current = true
      // Always compute fresh audio file to ensure it's current
      const freshAudioFile = `${storageUrl}/${encodeURIComponent(currentTrack.file)}`
      play(currentTrack.id, freshAudioFile)
    }
  }, [isPlaying, currentTrackId, currentTrack.id, currentTrack.file, pause, play])

  const handlePrevious = () => {
    const wasPlaying = wasPlayingRef.current
    const newIndex = currentIndex === 0 ? demoSoundscapes.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    wasPlayingRef.current = wasPlaying
  }

  const handleNext = () => {
    const wasPlaying = wasPlayingRef.current
    const newIndex = currentIndex === demoSoundscapes.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    wasPlayingRef.current = wasPlaying
  }

  const jumpToCategory = (categoryIndex: number) => {
    const wasPlaying = wasPlayingRef.current
    const categoryStarts = [0, 5, 10, 15] // burnout, overload, anxious, scattered
    const newIndex = categoryStarts[categoryIndex]
    setCurrentIndex(newIndex)
    wasPlayingRef.current = wasPlaying
  }

  // Handle track changes - only auto-play if we were playing before
  useEffect(() => {
    // Skip if this is the same track
    if (prevTrackIdRef.current === currentTrack.id) {
      return
    }
    
    prevTrackIdRef.current = currentTrack.id
    const newAudioFile = `${storageUrl}/${encodeURIComponent(currentTrack.file)}`
    
    // Only auto-play if we were playing before
    if (wasPlayingRef.current) {
      play(currentTrack.id, newAudioFile)
    }
    // If paused, do nothing - user will click play when ready
    // The play function will handle loading the track when clicked
  }, [currentIndex, currentTrack.id, currentTrack.file, play])

  // Spacebar to play/pause
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        handlePlayPause()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handlePlayPause])

  // Feedback button fade in/out every 10 seconds
  useEffect(() => {
    if (showWelcomeModal) return // Don't show while welcome modal is open
    
    // Show initially after welcome modal closes
    const initialDelay = setTimeout(() => {
      setShowFeedbackButton(true)
    }, 2000)

    // Toggle visibility every 10 seconds
    const interval = setInterval(() => {
      setShowFeedbackButton(prev => !prev)
    }, 10000)

    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
    }
  }, [showWelcomeModal])

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary relative overflow-hidden">
      {/* Animated gradient orbs - color changes based on category */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentTrack.category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <motion.div 
            className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br ${categoryColor.gradient} blur-[120px]`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className={`absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br ${categoryColor.gradient} blur-[140px]`}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Logo in top left */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <Link href="/" className="inline-block">
          <div className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            donothing<span className="text-brand-accent">sounds</span>
          </div>
        </Link>
      </div>

      {/* Main Player */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Animated Visualizer */}
            <div className="mb-16 flex items-center justify-center">
              <div className="relative">
                {/* Center circle - color matches category */}
                <motion.div
                  className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${categoryColor.gradient} border-2 ${categoryColor.ring} flex items-center justify-center`}
                  animate={isPlaying && currentTrackId === currentTrack.id ? {
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Audio wave bars inside circle - color matches category */}
                  {isPlaying && currentTrackId === currentTrack.id && (
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`w-1 rounded-full ${
                            currentTrack.category === 'burnout' ? 'bg-red-500' :
                            currentTrack.category === 'overload' ? 'bg-yellow-500' :
                            currentTrack.category === 'anxious' ? 'bg-purple-500' :
                            'bg-blue-500'
                          }`}
                          animate={{
                            height: [8, 20, 8],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Track Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrack.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-12"
              >
                <p className="text-sm uppercase tracking-wider text-brand-text-secondary mb-3">
                  {currentTrack.category}
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light lowercase text-brand-text-primary tracking-tight">
                  {currentTrack.name}
                </h2>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center gap-8">
              {/* Previous Button */}
              <motion.button
                onClick={handlePrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full bg-brand-bg-secondary border border-brand-text-muted/30 hover:border-brand-accent flex items-center justify-center transition-all duration-300 hover:bg-brand-accent/10"
              >
                <ChevronLeft className="w-6 h-6 text-brand-text-secondary hover:text-brand-accent transition-colors" />
              </motion.button>

              {/* Play/Pause Button */}
              <motion.button
                onClick={handlePlayPause}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-brand-accent flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_40px_rgba(47,128,237,0.4)]"
              >
                {isPlaying && currentTrackId === currentTrack.id ? (
                  <Pause className="w-8 h-8 text-brand-bg" fill="currentColor" />
                ) : (
                  <Play className="w-8 h-8 text-brand-bg ml-1" fill="currentColor" />
                )}
              </motion.button>

              {/* Next Button */}
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full bg-brand-bg-secondary border border-brand-text-muted/30 hover:border-brand-accent flex items-center justify-center transition-all duration-300 hover:bg-brand-accent/10"
              >
                <ChevronRight className="w-6 h-6 text-brand-text-secondary hover:text-brand-accent transition-colors" />
              </motion.button>
            </div>

            {/* Track Counter and Category Filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
            >
              <p className="text-sm text-brand-text-muted lowercase tracking-wide">
                {currentIndex + 1} of {demoSoundscapes.length}
              </p>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-brand-text-secondary lowercase tracking-wide">states:</span>
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3].map((catIndex) => (
                    <motion.button
                      key={catIndex}
                      onClick={() => jumpToCategory(catIndex)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-8 h-8 rounded-full border transition-all duration-300 ${
                        currentIndex >= catIndex * 5 && currentIndex < (catIndex + 1) * 5
                          ? 'border-brand-accent bg-brand-accent/20 text-brand-accent'
                          : 'border-brand-text-muted/30 text-brand-text-muted hover:border-brand-accent hover:text-brand-accent'
                      }`}
                    >
                      <span className="text-xs font-medium">{catIndex + 1}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Feedback Button */}
      <AnimatePresence>
        {showFeedbackButton && (
          <motion.a
            href="https://tally.so/r/vGXVpX"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed bottom-6 right-6 z-40 rounded-xl border border-brand-text-muted/30 bg-brand-bg/90 backdrop-blur-sm px-5 py-3 text-sm font-normal lowercase tracking-wide text-brand-text-secondary transition-all duration-300 hover:border-brand-accent hover:text-brand-accent hover:bg-brand-accent/10"
          >
            leave feedback
          </motion.a>
        )}
      </AnimatePresence>

      {/* Welcome Modal */}
      <Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
        <DialogContent className="bg-gradient-to-br from-brand-bg to-brand-bg-secondary border border-brand-text-muted/20 max-w-[calc(100%-2rem)] sm:max-w-md p-8 sm:p-10">
          <DialogHeader className="space-y-6">
            <DialogTitle className="text-3xl sm:text-4xl font-light lowercase tracking-tight text-brand-text-primary leading-tight text-center">
              when this worked for me, it took <span className="text-brand-accent">1 second</span>.
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-6 text-center">
            <p className="text-lg sm:text-xl text-brand-text-secondary lowercase leading-relaxed tracking-wide">
              but only because i actually listened.
            </p>
            <p className="text-lg sm:text-xl text-brand-text-primary lowercase leading-relaxed tracking-wide">
              don&apos;t browse choose a track and let it <span className="text-brand-accent">take over</span>.
            </p>
          </div>

          <div className="mt-8">
            <motion.button
              onClick={() => setShowWelcomeModal(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl border-2 border-brand-accent bg-transparent px-8 sm:px-12 py-4 text-base sm:text-lg font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)]"
            >
              let&apos;s go
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

