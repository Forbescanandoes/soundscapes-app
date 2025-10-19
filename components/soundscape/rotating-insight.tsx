"use client"

import { useState, useEffect } from 'react'

const insights = [
  {
    quote: "while you're stuck, someone else is shipping.",
    fact: "fog kills velocity. bad calls on fumes cost days.",
  },
  {
    quote: null,
    fact: "sleep deprived decisions = legally drunk decisions. you can't afford that.",
  },
  {
    quote: "everyone hits the wall.",
    fact: "winners recover faster.",
  },
  {
    quote: null,
    fact: "burnout isn't quitting. it's shipping slower. deciding worse. bleeding time.",
  },
  {
    quote: "you're not competing against people.",
    fact: "you're competing against time. losing days to fog is a luxury no one has.",
  },
  {
    quote: null,
    fact: "most startups die from founders running out of gas before the breakthrough.",
  },
  {
    quote: "the fastest way to fall behind?",
    fact: "keep going when you can't think.",
  },
  {
    quote: null,
    fact: "protect your ability to make good calls. fumes lead to mistakes you can't undo.",
  },
  {
    quote: "startups are marathons disguised as sprints.",
    fact: "whoever sustains longest wins.",
  },
  {
    quote: null,
    fact: "relief isn't soft. it's the difference between shipping and stalling.",
  },
]

export function RotatingInsight() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false)
      
      // Wait for fade out, then change insight and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % insights.length)
        setIsVisible(true)
      }, 500)
      
    }, 120000) // 2 minutes

    return () => clearInterval(interval)
  }, [])

  const currentInsight = insights[currentIndex]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div 
        className={`p-6 sm:p-8 rounded-2xl bg-brand-bg-secondary border border-brand-text-muted/10 transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {currentInsight.quote && (
          <p className="text-lg sm:text-xl font-light lowercase mb-4 text-brand-accent leading-relaxed">
            {currentInsight.quote}
          </p>
        )}
        <p className="text-base sm:text-lg font-light lowercase text-brand-text-secondary leading-relaxed">
          {currentInsight.fact}
        </p>
      </div>
    </div>
  )
}

