"use client"

import { useState } from 'react'
import { Play, Lock, ChevronDown } from 'lucide-react'
import { Player } from '@/components/soundscape/player'
import { RotatingMessage } from '@/components/soundscape/rotating-message'
import { RotatingInsight } from '@/components/soundscape/rotating-insight'
import { useAudioPlayer } from '@/hooks/use-audio-player'
import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { trackPlay, startSession, endSession } from '@/utils/analytics/track'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
  const { signOut, openUserProfile } = useClerk()
  const { user } = useUser()
  const [currentTrack, setCurrentTrack] = useState<{
    id: string
    name: string
    category: string
  } | null>(null)

  // Initialize audio player with analytics
  const { play, toggle, isPlaying, isLoading } = useAudioPlayer({
    onPlay: () => {
      if (currentTrack) {
        startSession(currentTrack.id, currentTrack.name, currentTrack.category, user?.id)
      }
    },
    onPause: () => {
      endSession()
    },
  })

  const handlePlay = async (itemId: string, itemName: string, categoryTitle: string, unlocked: boolean) => {
    if (!unlocked) return
    
    // If clicking same track, toggle play/pause
    if (currentTrack?.id === itemId) {
      toggle()
    } else {
      // Track the play
      trackPlay(itemId, itemName, categoryTitle, user?.id)
      
      // Set as current track and play
      setCurrentTrack({ id: itemId, name: itemName, category: categoryTitle })
      
      // Get filename from map
      const filename = fileMap[itemName]
      if (!filename) {
        console.error(`No filename found for: ${itemName}`)
        return
      }
      
      // Use Supabase Storage URL
      const storageUrl = 'https://gbyvackgdmzrfawmeuhd.supabase.co/storage/v1/object/public/soundscapes'
      const audioUrl = `${storageUrl}/${encodeURIComponent(filename)}`
      
      play(itemId, audioUrl)
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-brand-text-muted/10">
        {/* Left: Logo + Badge */}
        <div className="flex items-center gap-3">
          {/* Logo - clickable to go home */}
          <Link href="/" className="w-10 h-10 rounded-full bg-brand-text-primary flex items-center justify-center hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 rounded-full border-2 border-brand-bg" />
          </Link>
          
          {/* Freemium badge - becomes dropdown when signed in */}
          <SignedOut>
            <span className="text-xs lowercase tracking-wide border border-brand-text-muted/30 px-3 py-1 rounded-full text-brand-text-secondary">
              freemium
            </span>
          </SignedOut>

          <SignedIn>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-xs lowercase tracking-wide border border-brand-text-muted/30 px-3 py-1 rounded-full text-brand-text-secondary hover:border-brand-accent/50 hover:text-brand-accent transition-colors focus:outline-none">
                  freemium
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-48 bg-brand-bg-secondary border-brand-text-muted/20 text-brand-text-primary"
              >
                <DropdownMenuItem 
                  onClick={() => openUserProfile()}
                  className="lowercase cursor-pointer focus:bg-brand-text-muted/10 focus:text-brand-text-primary"
                >
                  account settings
                </DropdownMenuItem>
                <DropdownMenuItem 
                  asChild
                  className="lowercase cursor-pointer focus:bg-brand-text-muted/10 focus:text-brand-text-primary"
                >
                  <Link href="/">
                    back to home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-brand-text-muted/10" />
                <DropdownMenuItem 
                  onClick={async () => {
                    await signOut()
                    window.location.href = '/'
                  }}
                  className="lowercase cursor-pointer text-brand-error focus:bg-brand-error/10 focus:text-brand-error"
                >
                  sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
        </div>
        
        {/* Right: Empty for now, sign out is in dropdown */}
        <div />
      </div>

      {/* Rotating Insight */}
      <RotatingInsight />

      {/* Soundscapes List */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-3xl mx-auto">
          {soundCategories.map((category) => (
            <div key={category.title} className="mb-8">
              <h2 className="text-2xl font-light lowercase mb-4 px-4 sm:px-6 text-brand-text-primary tracking-tight">
                {category.title}
              </h2>
              <div className="space-y-0">
                {category.items.map((item) => {
                  const isActive = currentTrack?.id === item.id && isPlaying

                  return (
                    <button
                      key={item.id}
                      onClick={() => handlePlay(item.id, item.name, category.title, item.unlocked)}
                      disabled={!item.unlocked}
                      className={`
                        w-full flex items-center justify-between px-4 sm:px-6 py-4 border-b border-brand-text-muted/10 transition-all
                        ${!item.unlocked
                          ? 'opacity-40 cursor-not-allowed'
                          : 'hover:bg-brand-bg-secondary cursor-pointer'
                        }
                      `}
                    >
                      {/* Left: Icon + Name */}
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        {/* Circular Icon */}
                        <div className={`
                          flex-shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-all
                          ${!item.unlocked
                            ? 'border-brand-text-muted/30 bg-brand-bg-secondary'
                            : isActive
                            ? 'border-brand-accent bg-brand-accent/10'
                            : 'border-brand-text-muted/30 bg-brand-bg-secondary'
                          }
                        `}>
                          {!item.unlocked ? (
                            <Lock className="w-5 h-5 text-brand-text-muted" />
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-current" />
                          )}
                        </div>

                        {/* Track name */}
                        <div className={`
                          text-left text-lg font-light lowercase truncate
                          ${!item.unlocked
                            ? 'text-brand-text-muted'
                            : isActive
                            ? 'text-brand-accent'
                            : 'text-brand-text-primary'
                          }
                        `}>
                          {item.name}
                        </div>
                      </div>

                      {/* Right: Play button */}
                      {item.unlocked && (
                        <div className={`
                          flex-shrink-0 ml-4
                          ${isActive ? 'text-brand-accent' : 'text-brand-text-secondary'}
                        `}>
                          <Play 
                            className="w-5 h-5" 
                            fill={isActive ? 'currentColor' : 'none'}
                          />
                        </div>
                      )}
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
