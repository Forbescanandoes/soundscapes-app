"use client"

import { useState, useMemo } from 'react'
import { Play, Lock, ChevronDown, Sparkles } from 'lucide-react'
import { Player } from '@/components/soundscape/player'
import { RotatingMessage } from '@/components/soundscape/rotating-message'
import { PricingModal } from '@/components/soundscape/pricing-modal'
import { useAudioPlayer } from '@/hooks/use-audio-player'
import { SignedIn, SignedOut, SignUpButton, useClerk, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { trackPlay, startSession, endSession } from '@/utils/analytics/track'
import { motion } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

const soundCategories = [
  {
    title: 'Burnout',
    items: [
      { id: 'shipping-too-fast', name: 'shipping too fast' },
      { id: 'slept-at-desk', name: 'slept at desk' },
      { id: 'forgot-to-eat', name: 'forgot to eat' },
      { id: 'brain-fog', name: 'brain fog' },
      { id: 'running-on-fumes', name: 'running on fumes' },
    ],
  },
  {
    title: 'Overload',
    items: [
      { id: 'one-too-many-hats', name: 'one too many hats' },
      { id: 'everything-on-fire', name: "everything's on fire" },
      { id: 'ten-tabs-deep', name: 'ten tabs deep' },
      { id: 'drowning-in-pings', name: 'drowning in pings' },
      { id: 'zero-quiet', name: 'zero quiet' },
    ],
  },
  {
    title: 'Anxious',
    items: [
      { id: 'dread-of-marketing', name: 'the dread of marketing' },
      { id: 'runway-math', name: 'runway math' },
      { id: 'waiting-on-replies', name: 'waiting on replies' },
      { id: 'imposter-hour', name: 'imposter hour' },
      { id: 'distributed-my-guts', name: 'distributed my guts' },
    ],
  },
  {
    title: 'ADHD',
    items: [
      { id: 'twelve-tabs-open', name: 'twelve tabs open' },
      { id: 'idea-avalanche', name: 'idea avalanche' },
      { id: 'forgot-the-point', name: 'forgot the point' },
      { id: 'dopamine-chase', name: 'dopamine chase' },
      { id: 'cant-start', name: "can't start" },
      { id: 'cant-stop', name: "can't stop" },
      { id: 'half-built-everything', name: 'half built everything' },
      { id: 'scrolling-instead', name: 'scrolling instead' },
    ],
  },
]

// Access tier type
type AccessTier = 'anonymous' | 'freemium' | 'pro'

// Determine how many songs are unlocked per tier
function getUnlockedCount(tier: AccessTier): number {
  switch (tier) {
    case 'anonymous':
      return 1 // First song only
    case 'freemium':
      return 3 // Top 3 songs
    case 'pro':
      return 999 // All songs
    default:
      return 1
  }
}

// Map of track IDs to actual audio filenames
const fileMap: Record<string, string> = {
  'shipping too fast': 'Shipping Too Fast.mp3',
  'slept at desk': 'Slept at Desk.wav',
  'forgot to eat': 'Forgot to Eat.wav',
  'one too many hats': 'One Too Many Hats.wav',
  "everything's on fire": "Everything's on Fire.wav",
  'ten tabs deep': 'Ten Tabs Deep.wav',
  'the dread of marketing': 'the dread of marketing.wav',
  'runway math': 'Runway Math.wav',
  'waiting on replies': 'Waiting on Replies.wav',
  'imposter hour': 'Imposter Hour.wav',
  'idea avalanche': 'Idea Avalanche.wav',
  'forgot the point': 'Forgot the Point.wav',
  'twelve tabs open': 'Twelve Tabs Open.wav',
}

export default function SoundscapesPage() {
  const { signOut, openUserProfile } = useClerk()
  const { user, isSignedIn } = useUser()
  const [currentTrack, setCurrentTrack] = useState<{
    id: string
    name: string
    category: string
  } | null>(null)
  const [showConversionModal, setShowConversionModal] = useState(false)
  const [showPricingModal, setShowPricingModal] = useState(false)

  // Determine access tier
  // TODO: Check if user has pro subscription from Clerk metadata
  const accessTier: AccessTier = !isSignedIn ? 'anonymous' : 'freemium'
  const unlockedCount = getUnlockedCount(accessTier)

  // Add unlocked status to each category's items
  const categoriesWithAccess = useMemo(() => {
    return soundCategories.map(category => ({
      ...category,
      items: category.items.map((item, index) => ({
        ...item,
        unlocked: index < unlockedCount
      }))
    }))
  }, [unlockedCount])

  // Initialize audio player
  const { play, toggle, isPlaying, isLoading } = useAudioPlayer()

  const handleLockClick = () => {
    // Show conversion modal for anonymous users
    // Show pricing modal for freemium users
    if (!isSignedIn) {
      setShowConversionModal(true)
    } else {
      setShowPricingModal(true)
    }
  }

  const handlePlay = async (itemId: string, itemName: string, categoryTitle: string, unlocked: boolean) => {
    if (!unlocked) {
      handleLockClick()
      return
    }
    
    // If clicking same track, toggle play/pause
    if (currentTrack?.id === itemId) {
      if (isPlaying) {
        // Pausing - end the session
        endSession()
      } else {
        // Resuming - start new session
        startSession(itemId, itemName, categoryTitle, user?.id)
      }
      toggle()
    } else {
      // Switching tracks - end previous session
      if (currentTrack && isPlaying) {
        endSession()
      }
      
      // Track the play
      trackPlay(itemId, itemName, categoryTitle, user?.id)
      
      // Start new session
      startSession(itemId, itemName, categoryTitle, user?.id)
      
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

      {/* Soundscapes List */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-3xl mx-auto pt-8">
          {categoriesWithAccess.map((category) => (
            <div key={category.title} className="mb-12">
              <h2 className="text-2xl font-light lowercase mb-6 px-4 sm:px-6 text-brand-text-primary tracking-tight">
                {category.title}
              </h2>
              <div className="space-y-0">
                {category.items.map((item) => {
                  const isActive = currentTrack?.id === item.id && isPlaying

                  return (
                    <button
                      key={item.id}
                      onClick={() => handlePlay(item.id, item.name, category.title, item.unlocked)}
                      className={`
                        w-full flex items-center justify-between px-4 sm:px-6 py-4 border-b border-brand-text-muted/10 transition-all
                        ${!item.unlocked
                          ? 'opacity-50 cursor-pointer'
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

      {/* Conversion Modal (for anonymous users) */}
      <Dialog open={showConversionModal} onOpenChange={setShowConversionModal}>
        <DialogContent className="bg-brand-bg-secondary border-brand-text-muted/20 sm:max-w-md">
          <DialogHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mx-auto w-16 h-16 rounded-full bg-brand-accent/10 border-2 border-brand-accent flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-brand-accent" />
            </motion.div>
            
            <DialogTitle className="text-3xl sm:text-4xl font-light lowercase tracking-tight text-brand-text-primary">
              ready for the full experience?
            </DialogTitle>
            
            <DialogDescription className="text-base sm:text-lg text-brand-text-secondary lowercase leading-relaxed tracking-wide">
              that was just a taste. sign up for unlimited access to all soundscapes and reset whenever you need.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-6">
            <SignUpButton 
              mode="modal"
              fallbackRedirectUrl="/soundscapes"
              signInFallbackRedirectUrl="/soundscapes"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl border-2 border-brand-accent bg-transparent px-8 py-3 text-base font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)]"
              >
                sign up free
              </motion.button>
            </SignUpButton>

            <button
              onClick={() => setShowConversionModal(false)}
              className="text-sm text-brand-text-muted hover:text-brand-text-secondary lowercase tracking-wide transition-colors"
            >
              maybe later
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pricing Modal (for freemium users) */}
      <PricingModal 
        open={showPricingModal} 
        onOpenChange={setShowPricingModal}
      />
    </div>
  )
}
