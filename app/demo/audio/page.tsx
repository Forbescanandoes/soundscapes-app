"use client"

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Pause, Laptop } from 'lucide-react'

export default function Audio() {
  const router = useRouter()

  const resetStyles = [
    {
      id: 'immersive',
      title: 'immersive reset',
      description: 'stop everything and let the sound fully take over.',
      subtext: "(works best if you're fried or stuck.)",
      icon: Pause,
      gradient: 'from-purple-500/20 to-blue-500/20',
      borderColor: 'border-purple-500/50',
      hoverColor: 'hover:border-purple-500',
      buttonText: 'take a moment →',
    },
    {
      id: 'background',
      title: 'background reset',
      description: 'put the sound on while you work let it clear the pressure as you go.',
      subtext: '(this is how i personally use it a lot.)',
      icon: Laptop,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/50',
      hoverColor: 'hover:border-blue-500',
      buttonText: 'keep building →',
    },
  ]

  const handleStyleSelect = (styleId: string) => {
    // Store the selected style in sessionStorage
    sessionStorage.setItem('demoResetStyle', styleId)
    router.push('/demo/listen')
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light lowercase leading-tight mb-6 text-brand-text-primary tracking-tight"
          >
            how do you want to reset?
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl sm:text-2xl text-brand-text-secondary lowercase tracking-wide"
          >
            choose your style.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent mx-auto mt-8"
          />
        </motion.div>

        {/* Reset Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {resetStyles.map((style, index) => {
            const Icon = style.icon
            
            return (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + (index * 0.2) }}
                className="group relative"
              >
                <div className={`relative h-full p-8 sm:p-10 rounded-2xl border-2 ${style.borderColor} bg-brand-bg-secondary/50 backdrop-blur-sm ${style.hoverColor} transition-all duration-300 overflow-hidden`}>
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Number Badge */}
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-bg border-2 border-current">
                        <span className="text-2xl font-light text-brand-text-primary">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mb-6">
                      <Icon className="w-10 h-10 text-brand-text-secondary group-hover:text-brand-accent transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl sm:text-3xl font-light lowercase mb-4 text-brand-text-primary tracking-tight">
                      {style.title}
                    </h3>
                    <p className="text-base sm:text-lg text-brand-text-primary lowercase leading-relaxed tracking-wide mb-3">
                      {style.description}
                    </p>
                    <p className="text-sm sm:text-base text-brand-text-secondary lowercase leading-relaxed tracking-wide mb-8">
                      {style.subtext}
                    </p>

                    {/* Button */}
                    <div className="mt-auto">
                      <motion.button
                        onClick={() => handleStyleSelect(style.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full rounded-xl border-2 border-brand-accent bg-transparent px-8 py-4 text-base font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)]"
                      >
                        {style.buttonText}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom emphasis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 text-center"
        >
          <p className="text-base sm:text-lg text-brand-text-muted lowercase tracking-wide">
            either way works. pick what feels right.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

