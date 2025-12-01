"use client"

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'

export default function StateGate() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-red-500/10 blur-[120px]"
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
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[140px]"
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Alert Icon */}
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
                className="absolute inset-0 rounded-full bg-red-500/20 blur-xl"
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
              <div className="relative w-20 h-20 rounded-full bg-brand-bg-secondary border-2 border-red-500/50 flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-500" />
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
            this only works when your brain is overloaded
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
            <p className="text-xl sm:text-2xl text-brand-text-secondary lowercase leading-relaxed tracking-wide">
              don&apos;t use this out of curiosity.
            </p>
            <p className="text-xl sm:text-2xl text-brand-text-primary lowercase leading-relaxed tracking-wide">
              use it when your head feels jammed, foggy, or you&apos;re on the edge of burning out.
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
              onClick={() => router.push('/demo/founder-intro')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-xl border-2 border-brand-accent bg-transparent px-8 sm:px-12 py-4 text-base sm:text-lg font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)] w-full sm:w-auto"
            >
              i&apos;m overloaded right now
            </motion.button>

            <motion.button
              onClick={() => router.push('/demo/come-back')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-xl border-2 border-brand-text-muted/30 bg-transparent px-8 sm:px-12 py-4 text-base sm:text-lg font-normal lowercase tracking-wide text-brand-text-secondary transition-all duration-300 hover:bg-brand-text-muted/5 hover:border-brand-text-muted/50 w-full sm:w-auto"
            >
              not right now
            </motion.button>
          </motion.div>

          {/* Bottom emphasis */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16"
          >
            <p className="text-base sm:text-lg text-brand-text-muted lowercase tracking-wide">
              designed for founders in the middle of it.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

