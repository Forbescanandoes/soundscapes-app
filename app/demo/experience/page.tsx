"use client"

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Brain, Target, Flame, RefreshCw, Zap, Sparkles } from 'lucide-react'

export default function Experience() {
  const router = useRouter()

  const stateTypes = [
    {
      id: 'brain-fog',
      title: 'brain fog',
      description: "can't think, nothing's landing",
      icon: Brain,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/50',
      hoverColor: 'hover:border-blue-500',
    },
    {
      id: 'decision-paralysis',
      title: 'decision paralysis',
      description: 'stuck on a choice',
      icon: Target,
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/50',
      hoverColor: 'hover:border-purple-500',
    },
    {
      id: 'everything-on-fire',
      title: "everything's on fire",
      description: 'juggling too much',
      icon: Flame,
      gradient: 'from-red-500/20 to-orange-500/20',
      borderColor: 'border-red-500/50',
      hoverColor: 'hover:border-red-500',
    },
    {
      id: 'anxiety-loop',
      title: 'anxiety loop',
      description: 'same worry on repeat',
      icon: RefreshCw,
      gradient: 'from-yellow-500/20 to-orange-500/20',
      borderColor: 'border-yellow-500/50',
      hoverColor: 'hover:border-yellow-500',
    },
    {
      id: 'scattered-mode',
      title: 'scattered mode',
      description: "ideas everywhere, can't start anything",
      icon: Sparkles,
      gradient: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-500/50',
      hoverColor: 'hover:border-cyan-500',
    },
    {
      id: 'burnout-spike',
      title: 'burnout spike',
      description: "you're about to crash",
      icon: Zap,
      gradient: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/50',
      hoverColor: 'hover:border-orange-500',
    },
  ]

  const handleStateSelect = (stateId: string) => {
    // Store the selected state in sessionStorage for later use
    sessionStorage.setItem('demoState', stateId)
    router.push('/demo/instructions')
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative overflow-hidden">
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

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light lowercase leading-tight mb-8 text-brand-text-primary tracking-tight"
          >
            what kind of overload are you in right now?
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent mx-auto"
          />
        </motion.div>

        {/* State Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {stateTypes.map((state, index) => {
            const Icon = state.icon
            
            return (
              <motion.button
                key={state.id}
                onClick={() => handleStateSelect(state.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative text-left"
              >
                <div className={`relative h-full p-8 rounded-2xl border-2 ${state.borderColor} bg-brand-bg-secondary/50 backdrop-blur-sm ${state.hoverColor} transition-all duration-300 overflow-hidden`}>
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${state.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <Icon className="w-10 h-10 text-brand-text-secondary group-hover:text-brand-accent transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl sm:text-3xl font-light lowercase mb-3 text-brand-text-primary tracking-tight">
                      {state.title}
                    </h3>
                    <p className="text-base sm:text-lg text-brand-text-secondary lowercase leading-relaxed tracking-wide">
                      {state.description}
                    </p>

                    {/* Hover indicator */}
                    <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm text-brand-accent lowercase tracking-wide">select this</span>
                      <span className="text-brand-accent">→</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Bottom emphasis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <p className="text-base sm:text-lg text-brand-text-muted lowercase tracking-wide">
            pick what fits. we&apos;ll handle the rest.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

