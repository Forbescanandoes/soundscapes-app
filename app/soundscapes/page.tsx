"use client"

import { useState, useEffect } from 'react'
import { Play, Lock } from 'lucide-react'
import { Player } from '@/components/soundscape/player'
import { RotatingMessage } from '@/components/soundscape/rotating-message'
import { RotatingInsight } from '@/components/soundscape/rotating-insight'
import { useAudioPlayer } from '@/hooks/use-audio-player'
import { soundscapeAnalytics } from '@/utils/analytics/soundscape-analytics'
import { useUser } from '@clerk/nextjs'
import { FreemiumBadge } from '@/components/soundscape/account-menu'

const soundCategories = [
  {
    title: 'Burnout',
    items: [
      { id: 'shipping-too-fast', name: 'shipping too fast', unlocked: true },
      { id: 'slept-at-desk', name: 'slept at desk', unlocked: true },
      { id: 'forgot-to-eat', name: 'forgot to eat', unlocked: false },
      { id: 'brain-fog', name: 'brain fog', unlocked: false },
      { id: 'running-on-fumes', name: 'running on fumes', unlocked: false },
    ],
  },
  {
    title: 'Overload',
    items: [
      { id: 'one-too-many-hats', name: 'one too many hats', unlocked: true },
      { id: 'everything-on-fire', name: "everything's on fire", unlocked: false },
      { id: 'ten-tabs-deep', name: 'ten tabs deep', unlocked: false },
      { id: 'drowning-in-pings', name: 'drowning in pings', unlocked: false },
      { id: 'zero-quiet', name: 'zero quiet', unlocked: false },
    ],
  },
  {
    title: 'Anxiety',
    items: [
      { id: 'dread-of-marketing', name: 'the dread of marketing', unlocked: true },
      { id: 'runway-math', name: 'runway math', unlocked: false },
      { id: 'waiting-on-replies', name: 'waiting on replies', unlocked: false },
      { id: 'imposter-hour', name: 'imposter hour', unlocked: true },
      { id: 'distributed-my-guts', name: 'distributed my guts', unlocked: false },
    ],
  },
  {
    title: 'ADHD',
    items: [
      { id: 'twelve-tabs-open', name: 'twelve tabs open', unlocked: true },
      { id: 'idea-avalanche', name: 'idea avalanche', unlocked: true },
      { id: 'forgot-the-point', name: 'forgot the point', unlocked: false },
      { id: 'dopamine-chase', name: 'dopamine chase', unlocked: false },
      { id: 'cant-start', name: "can't start", unlocked: false },
      { id: 'cant-stop', name: "can't stop", unlocked: false },
      { id: 'half-built-everything', name: 'half built everything', unlocked: false },
      { id: 'scrolling-instead', name: 'scrolling instead', unlocked: false },
    ],
  },
]

export default function SoundscapesPage() {
  const { user } = useUser()
  const [currentTrack, setCurrentTrack] = useState<{
    id: string
    name: string
    category: string
  } | null>(null)

  // Initialize audio player with analytics callbacks
  const { play, toggle, isPlaying, isLoading, error } = useAudioPlayer({
    onPlay: async () => {
      if (currentTrack) {
        await soundscapeAnalytics.startSession({
          soundscapeId: currentTrack.id,
          soundscapeName: currentTrack.name,
          category: currentTrack.category,
          userId: user?.id,
        })
      }
    },
    onPause: async () => {
      await soundscapeAnalytics.endSession()
    },
    onError: (err) => {
      console.error('Audio playback error:', err)
    },
  })

  // Handle cleanup on unmount or tab close
  useEffect(() => {
    const handleBeforeUnload = () => {
      soundscapeAnalytics.endSession()
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      soundscapeAnalytics.endSession()
    }
  }, [])

  const handlePlay = async (itemId: string, itemName: string, categoryTitle: string, unlocked: boolean) => {
    if (!unlocked) return
    
    const userId = user?.id
    
    // If clicking same track, toggle play/pause
    if (currentTrack?.id === itemId) {
      toggle()
    } else {
      // Track the play event with user ID
      await soundscapeAnalytics.trackPlay({
        soundscapeId: itemId,
        soundscapeName: itemName,
        category: categoryTitle,
        userId,
      })

      // If switching tracks, handle the switch
      if (currentTrack) {
        await soundscapeAnalytics.switchSoundscape({
          soundscapeId: itemId,
          soundscapeName: itemName,
          category: categoryTitle,
          userId,
        })
      }

      // Update current track
      setCurrentTrack({ id: itemId, name: itemName, category: categoryTitle })

      // Map track names to actual filenames
      const fileMap: Record<string, string> = {
        'shipping too fast': 'Shipping Too Fast.mp3',
        'slept at desk': 'Slept at Desk.wav',
        'one too many hats': 'One Too Many Hats.wav',
        'the dread of marketing': 'the dread of marketing.wav',
        'imposter hour': 'Imposter Hour.wav',
        'idea avalanche': 'Idea Avalanche.wav',
        'twelve tabs open': 'Twelve Tabs Open.wav',
      }
      
      const filename = fileMap[itemName]
      
      // Get audio URL - check for Supabase Storage first, fallback to local
      const storageUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL
      const audioUrl = storageUrl 
        ? `${storageUrl}/${encodeURIComponent(filename)}`
        : `/MUSIC/${filename}`
      
      play(itemId, audioUrl)
    }
  }

  const handleTogglePlay = () => {
    toggle()
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary pb-32">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-brand-text-muted/10">
        <FreemiumBadge />
      </div>

      {/* Rotating Insight */}
      <RotatingInsight />

      {/* Soundscapes List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {soundCategories.map((category, idx) => (
          <div key={category.title} className={idx > 0 ? 'mt-16' : ''}>
            <h2 className="text-3xl sm:text-4xl font-light mb-8 lowercase text-brand-text-primary">{category.title}</h2>
            <div className="space-y-2">
              {category.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePlay(item.id, item.name, category.title, item.unlocked)}
                  disabled={!item.unlocked}
                  className={`w-full flex items-center justify-between p-4 sm:p-6 rounded-2xl transition-all group ${
                    item.unlocked
                      ? 'hover:bg-brand-bg-secondary cursor-pointer'
                      : 'opacity-40 cursor-not-allowed'
                  } ${currentTrack?.id === item.id && isPlaying ? 'bg-brand-bg-secondary border border-brand-accent/50' : 'border border-transparent'}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                      item.unlocked 
                        ? currentTrack?.id === item.id && isPlaying 
                          ? 'bg-brand-accent/20 border border-brand-accent' 
                          : 'bg-brand-text-muted/10 border border-brand-text-muted/20 group-hover:border-brand-accent/50'
                        : 'bg-brand-text-muted/5 border border-brand-text-muted/10'
                    }`}>
                      {/* Icon placeholder - you can customize per item */}
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border transition-all ${
                        currentTrack?.id === item.id && isPlaying
                          ? 'border-brand-accent'
                          : 'border-brand-text-muted/30'
                      }`} />
                    </div>
                    <span className="text-base sm:text-xl font-light lowercase text-brand-text-primary">{item.name}</span>
                  </div>
                  {item.unlocked ? (
                    <Play className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                      currentTrack?.id === item.id && isPlaying
                        ? 'text-brand-accent'
                        : 'text-brand-text-secondary group-hover:text-brand-accent'
                    }`} />
                  ) : (
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-brand-text-muted" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Player */}
      {currentTrack && (
        <Player
          trackName={currentTrack.name}
          category={currentTrack.category}
          isPlaying={isPlaying}
          isLoading={isLoading}
          onTogglePlay={handleTogglePlay}
        />
      )}

      {/* Error display (optional - for development) */}
      {error && process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 right-4 bg-brand-error text-white p-4 rounded-lg max-w-md">
          <p className="text-sm">{error.message}</p>
        </div>
      )}

      {/* Rotating message at bottom */}
      <RotatingMessage />
    </div>
  )
}

