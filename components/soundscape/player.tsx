"use client"

import { Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PlayerProps {
  trackName: string
  isPlaying: boolean
  isLoading?: boolean
  onTogglePlay: () => void
}

export function Player({ trackName, isPlaying, isLoading = false, onTogglePlay }: PlayerProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-brand-bg-secondary/95 backdrop-blur-xl border-t border-brand-text-muted/10">
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/5 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all ${
              isPlaying 
                ? 'bg-brand-accent/20 border-brand-accent animate-pulse-glow' 
                : 'bg-brand-text-muted/10 border-brand-text-muted/30'
            }`}>
              <div className={`w-8 h-8 rounded-full border transition-all ${
                isPlaying ? 'border-brand-accent' : 'border-brand-text-muted/30'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs lowercase tracking-wide mb-1 text-brand-text-muted">
                {isLoading ? 'loading...' : isPlaying ? 'playing' : 'paused'}
              </div>
              <div className="text-base sm:text-lg font-light lowercase text-brand-text-primary truncate">{trackName}</div>
            </div>
          </div>
          <Button
            onClick={onTogglePlay}
            size="lg"
            disabled={isLoading}
            className="rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-brand-accent hover:bg-brand-accent/90 text-brand-bg transition-all duration-300 glow-accent flex-shrink-0 ml-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-brand-bg border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" />
            ) : (
              <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" fill="currentColor" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

