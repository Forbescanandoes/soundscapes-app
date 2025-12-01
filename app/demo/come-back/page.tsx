"use client"

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Clock } from 'lucide-react'

export default function ComeBack() {
  const router = useRouter()

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Clock Icon */}
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
                <Clock className="w-10 h-10 text-brand-accent" />
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
            perfect. wait.
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent mx-auto mb-12"
          />

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8 mb-16"
          >
            <p className="text-xl sm:text-2xl text-brand-text-secondary lowercase leading-relaxed tracking-wide">
              this reset is for the moments when:
            </p>

            {/* Moment Cards */}
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                "you can't think straight",
                "you're stuck in a loop",
                "you're fried but still forcing work"
              ].map((moment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
                  className="relative p-6 rounded-xl border border-brand-text-muted/20 bg-brand-bg-secondary/50 backdrop-blur-sm hover:border-brand-accent/40 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-accent/0 to-brand-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <p className="relative text-lg sm:text-xl text-brand-text-primary lowercase tracking-wide">
                    {moment}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="space-y-8"
          >
            <p className="text-xl sm:text-2xl text-brand-text-primary lowercase leading-relaxed tracking-wide max-w-2xl mx-auto">
              when that hits, open donothing<span className="text-brand-accent">sounds</span> and hit "i&apos;m overloaded right now."
            </p>

            {/* Button */}
            <motion.button
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-xl border-2 border-brand-accent bg-transparent px-8 sm:px-12 py-4 text-base sm:text-lg font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)]"
            >
              back to home
            </motion.button>
          </motion.div>

          {/* Bottom emphasis */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-16"
          >
            <p className="text-base sm:text-lg text-brand-text-muted lowercase tracking-wide">
              come back when you&apos;re actually overloaded.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

