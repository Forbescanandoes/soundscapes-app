"use client"

import { useState, useEffect } from 'react'

const messages = [
  "stay sharp.",
  "fog costs.",
  "reset or stall.",
  "can't ship if you can't think.",
  "falling behind starts here.",
  "fumes = bad calls.",
  "survival gear.",
  "momentum wins.",
  "stay in it.",
  "relief is leverage.",
]

export function RotatingMessage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false)
      
      // Wait for fade out, then change message and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length)
        setIsVisible(true)
      }, 500) // Half second for fade out
      
    }, 120000) // 2 minutes (120000ms)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-12 px-4 sm:px-6 border-t border-brand-text-muted/10">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <p 
          className={`text-sm text-brand-text-muted lowercase transition-opacity duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {messages[currentIndex]}
        </p>
      </div>
    </div>
  )
}

