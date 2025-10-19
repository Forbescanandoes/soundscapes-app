"use client"

import { useState, useEffect } from 'react'

const insights = [
  {
    quote: "brief mental breaks prevent decision fatigue and restore focus.",
    source: "university of illinois study",
    fact: "your 5 min sound reset is that break",
  },
  {
    quote: "the brain's attention system gets bored after sustained focus. novelty resets it.",
    source: "cognitive science review",
    fact: "soundscapes provide novelty → reset",
  },
  {
    quote: "controlled sound has measurable effects on stress, focus, and recovery.",
    source: "nih review on music & cognition",
    fact: "your sound is engineered, not random",
  },
  {
    quote: "neural entrainment: rhythm and sound can synchronize brain activity, improving performance.",
    source: "mit neuroscience lab",
    fact: "your product uses sound science, not wellness fluff",
  },
  {
    quote: "silence alone doesn't restore the brain. active recovery does.",
    source: "psychological science journal",
    fact: "why your sound beats just 'taking a break'",
  },
  {
    quote: "sound is the shortcut to state change.",
    source: "oliver sacks, musicophilia",
    fact: null,
  },
  {
    quote: "music is the language of the brain's emotions.",
    source: "daniel levitin, this is your brain on music",
    fact: null,
  },
  {
    quote: "if words are the software, music is the operating system.",
    source: "jourdain, music, the brain, and ecstasy",
    fact: null,
  },
  {
    quote: "five minutes of sound can shift the nervous system faster than meditation.",
    source: "huberman lab",
    fact: null,
  },
  {
    quote: "the brain responds to rhythm before it responds to language.",
    source: "neuroscience of music research",
    fact: null,
  },
]

export function RotatingInsight() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % insights.length)
    }, 120000) // 2 minutes

    return () => clearInterval(interval)
  }, [])

  const current = insights[currentIndex]

  return (
    <div className="px-4 sm:px-6 py-3 border-b border-brand-text-muted/10 bg-brand-bg">
      <div className="max-w-3xl mx-auto">
        {/* Quote */}
        <p className="text-sm font-light text-brand-text-primary lowercase leading-snug mb-1">
          "{current.quote}"
        </p>
        
        {/* Source */}
        <p className="text-xs text-brand-text-muted lowercase">
          {current.source}
        </p>

        {/* Fact (if exists) */}
        {current.fact && (
          <p className="text-xs text-brand-accent lowercase mt-1">
            → {current.fact}
          </p>
        )}
      </div>
    </div>
  )
}
