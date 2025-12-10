"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Headphones } from 'lucide-react'
import { useState } from 'react'

export default function Instructions() {
  const router = useRouter()
  const [showNotYetMessage, setShowNotYetMessage] = useState(false)

  const handleNotYet = () => {
    setShowNotYetMessage(true)
  }

  const handleContinue = () => {
    router.push('/demo/audio')
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

      <div className="max-w-3xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!showNotYetMessage ? (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Headphones Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200 
                }}
                className="flex items-center justify-center mb-12"
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-brand-accent/20 blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="relative w-20 h-20 rounded-full bg-brand-bg-secondary border-2 border-brand-accent/50 flex items-center justify-center">
                    <Headphones className="w-10 h-10 text-brand-accent" />
                  </div>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light lowercase leading-tight mb-8 text-brand-text-primary tracking-tight"
              >
                headphones on?
              </motion.h1>

              {/* Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-24 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent mx-auto mb-8"
              />

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-6 mb-16"
              >
                <p className="text-xl sm:text-2xl text-brand-text-primary lowercase leading-relaxed tracking-wide">
                  this only works if the sound wraps your brain.
                </p>
                <p className="text-lg sm:text-xl text-brand-text-secondary lowercase leading-relaxed tracking-wide">
                  laptop speakers / tiny phone volume = weak effect.
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.button
                  onClick={handleContinue}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative rounded-xl border-2 border-brand-accent bg-transparent px-8 sm:px-12 py-4 text-base sm:text-lg font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)] w-full sm:w-auto"
                >
                  yep, headphones are on
                </motion.button>

                <motion.button
                  onClick={handleNotYet}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative rounded-xl border-2 border-brand-text-muted/30 bg-transparent px-8 sm:px-12 py-4 text-base sm:text-lg font-normal lowercase tracking-wide text-brand-text-secondary transition-all duration-300 hover:bg-brand-text-muted/5 hover:border-brand-text-muted/50 w-full sm:w-auto"
                >
                  not yet
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="not-yet"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Headphones Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200 
                }}
                className="flex items-center justify-center mb-12"
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-brand-accent/20 blur-xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="relative w-20 h-20 rounded-full bg-brand-bg-secondary border-2 border-brand-accent/50 flex items-center justify-center">
                    <Headphones className="w-10 h-10 text-brand-accent" />
                  </div>
                </div>
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8 mb-16"
              >
                <p className="text-3xl sm:text-4xl md:text-5xl font-light lowercase leading-tight text-brand-text-primary tracking-tight">
                  grab your headphones, then tap "headphones on" to start.
                </p>
              </motion.div>

              {/* Single Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.button
                  onClick={handleContinue}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative rounded-xl border-2 border-brand-accent bg-transparent px-8 sm:px-12 py-4 text-base sm:text-lg font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)]"
                >
                  headphones on →
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

