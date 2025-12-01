"use client"

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Player() {
  const router = useRouter()
  const [selectedIntensity, setSelectedIntensity] = useState<number | null>(null)

  const intensityLevels = [
    { value: 1, label: 'mild', color: 'from-blue-500/20 to-cyan-500/20', borderColor: 'border-blue-500/50', hoverColor: 'hover:border-blue-500' },
    { value: 2, label: 'annoying', color: 'from-yellow-500/20 to-green-500/20', borderColor: 'border-yellow-500/50', hoverColor: 'hover:border-yellow-500' },
    { value: 3, label: 'heavy', color: 'from-orange-500/20 to-yellow-500/20', borderColor: 'border-orange-500/50', hoverColor: 'hover:border-orange-500' },
    { value: 4, label: 'overwhelming', color: 'from-red-500/20 to-orange-500/20', borderColor: 'border-red-500/50', hoverColor: 'hover:border-red-500' },
    { value: 5, label: 'meltdown territory', color: 'from-red-600/20 to-red-500/20', borderColor: 'border-red-600/50', hoverColor: 'hover:border-red-600' },
  ]

  const handleIntensitySelect = (value: number) => {
    setSelectedIntensity(value)
    // Store the intensity in sessionStorage
    sessionStorage.setItem('demoIntensityBefore', value.toString())
    
    // Wait a moment for visual feedback, then continue
    setTimeout(() => {
      router.push('/demo/audio')
    }, 300)
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-accent/10 blur-[120px]"
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
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-brand-accent/5 blur-[140px]"
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
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light lowercase leading-tight mb-12 text-brand-text-primary tracking-tight"
          >
            how intense is it right now?
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent mx-auto mb-16"
          />

          {/* Intensity Buttons */}
          <div className="space-y-4 max-w-2xl mx-auto">
            {intensityLevels.map((level, index) => (
              <motion.button
                key={level.value}
                onClick={() => handleIntensitySelect(level.value)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative w-full text-left transition-all duration-300 ${
                  selectedIntensity === level.value ? 'scale-105' : ''
                }`}
              >
                <div className={`relative p-6 sm:p-8 rounded-2xl border-2 ${level.borderColor} bg-brand-bg-secondary/50 backdrop-blur-sm ${level.hoverColor} transition-all duration-300 overflow-hidden`}>
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${level.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    {/* Number and Label */}
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-bg border-2 border-current flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl font-light text-brand-text-primary">
                          {level.value}
                        </span>
                      </div>
                      <span className="text-xl sm:text-2xl font-light lowercase text-brand-text-primary tracking-tight">
                        {level.label}
                      </span>
                    </div>

                    {/* Arrow indicator */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-brand-accent text-xl">→</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Bottom emphasis */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12"
          >
            <p className="text-base sm:text-lg text-brand-text-muted lowercase tracking-wide">
              be honest. we need a baseline.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

