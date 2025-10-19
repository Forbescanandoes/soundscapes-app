"use client"

import { useState } from 'react'
import { Play, Lock } from 'lucide-react'
import { Player } from '@/components/soundscape/player'
import { RotatingMessage } from '@/components/soundscape/rotating-message'
import { RotatingInsight } from '@/components/soundscape/rotating-insight'
import { useAudioPlayer } from '@/hooks/use-audio-player'
import Link from 'next/link'

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

// Map of track IDs to actual audio filenames
const fileMap: Record<string, string> = {
  'shipping too fast': 'Shipping Too Fast.mp3',
  'slept at desk': 'Slept at Desk.wav',
  'one too many hats': 'One Too Many Hats.wav',
  'the dread of marketing': 'the dread of marketing.wav',
  'imposter hour': 'Imposter Hour.wav',
  'idea avalanche': 'Idea Avalanche.wav',
  'twelve tabs open': 'Twelve Tabs Open.wav',
}

export default function SoundscapesPage() {
  const [currentTrack, setCurrentTrack] = useState<{
    id: string
    name: string
    category: string
  } | null>(null)

  // Initialize audio player
  const { play, toggle, isPlaying, isLoading } = useAudioPlayer()

  const handlePlay = async (itemId: string, itemName: string, categoryTitle: string, unlocked: boolean) => {
    if (!unlocked) return
    
    // If clicking same track, toggle play/pause
    if (currentTrack?.id === itemId) {
      toggle()
    } else {
      // Set as current track and play
      setCurrentTrack({ id: itemId, name: itemName, category: categoryTitle })
      
      // Get filename from map
      const filename = fileMap[itemName]
      if (!filename) {
        console.error(`No filename found for: ${itemName}`)
        return
      }
      
      // Use Supabase Storage URL if configured, otherwise fall back to local
      const storageUrl = 'https://gbyvackgdmzrfawmeuhd.supabase.co/storage/v1/object/public/soundscapes'
      const audioUrl = `${storageUrl}/${encodeURIComponent(filename)}`
      
      play(itemId, audioUrl)
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-brand-text-muted/10">
        <div className="flex items-center gap-3">
          {/* Logo - clickable to go home */}
          <Link href="/" className="w-10 h-10 rounded-full bg-brand-text-primary flex items-center justify-center hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 rounded-full border-2 border-brand-bg" />
          </Link>
          
          {/* Freemium badge */}
          <Link href="/">
            <span className="text-xs lowercase tracking-wide border border-brand-text-muted/30 px-3 py-1 rounded-full text-brand-text-secondary hover:opacity-80 transition-opacity">
              freemium
            </span>
          </Link>
        </div>
      </div>

      {/* Rotating Insight */}
      <RotatingInsight />

      {/* Soundscapes Grid */}
      <div className="flex-1 p-4 sm:p-6 pb-32 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-12">
          {soundCategories.map((category) => (
            <div key={category.title}>
              <h2 className="text-lg sm:text-xl font-light lowercase mb-4 text-brand-text-secondary tracking-wide">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.items.map((item) => {
                  const isActive = currentTrack?.id === item.id && isPlaying
                  const isCurrentTrack = currentTrack?.id === item.id

                  return (
                    <button
                      key={item.id}
                      onClick={() => handlePlay(item.id, item.name, category.title, item.unlocked)}
                      disabled={!item.unlocked}
                      className={`
                        group relative flex items-center gap-4 p-4 rounded-lg border transition-all
                        ${!item.unlocked
                          ? 'border-brand-text-muted/10 bg-brand-bg-secondary/30 cursor-not-allowed opacity-40'
                          : isActive
                          ? 'border-brand-accent bg-brand-accent/10'
                          : isCurrentTrack
                          ? 'border-brand-text-muted/30 bg-brand-bg-secondary hover:border-brand-accent/50'
                          : 'border-brand-text-muted/20 bg-brand-bg-secondary hover:border-brand-text-muted/40'
                        }
                      `}
                    >
                      {/* Play/Pause icon */}
                      <div className={`
                        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all
                        ${!item.unlocked
                          ? 'border-brand-text-muted/20 bg-brand-text-muted/5'
                          : isActive
                          ? 'border-brand-accent bg-brand-accent/20 animate-pulse-glow'
                          : 'border-brand-text-muted/30 bg-brand-text-muted/10 group-hover:border-brand-accent/50'
                        }
                      `}>
                        {!item.unlocked ? (
                          <Lock className="w-4 h-4 text-brand-text-muted" />
                        ) : (
                          <Play 
                            className={`w-4 h-4 ${isActive ? 'text-brand-accent' : 'text-brand-text-secondary group-hover:text-brand-accent'} transition-colors`}
                            fill={isActive ? 'currentColor' : 'none'}
                          />
                        )}
                      </div>

                      {/* Track name */}
                      <div className="flex-1 text-left">
                        <div className={`
                          text-sm sm:text-base lowercase
                          ${!item.unlocked
                            ? 'text-brand-text-muted'
                            : isActive
                            ? 'text-brand-accent font-normal'
                            : 'text-brand-text-primary group-hover:text-brand-accent'
                          } transition-colors
                        `}>
                          {item.name}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player */}
      {currentTrack && (
        <Player
          trackName={currentTrack.name}
          isPlaying={isPlaying}
          isLoading={isLoading}
          onTogglePlay={toggle}
        />
      )}

      {/* Rotating Message */}
      <RotatingMessage />
    </div>
  )
}
