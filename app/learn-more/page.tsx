"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain, Zap, Moon, Activity } from 'lucide-react'

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-primary">
      {/* Header */}
      <header className="border-b border-brand-text-muted/10 bg-brand-bg/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Button variant="ghost" className="lowercase -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              back to home
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light lowercase leading-tight mb-8 tracking-tight">
            how it works
          </h1>
          <p className="text-xl sm:text-2xl font-light text-brand-text-secondary lowercase leading-relaxed mb-16">
            neuroscience-backed soundscapes designed for founders who need to perform.
          </p>
        </motion.div>

        {/* Soundscape Types */}
        <div className="space-y-16 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <Brain className="w-8 h-8 text-brand-accent" />
              <h2 className="text-3xl font-light lowercase tracking-tight">relax</h2>
            </div>
            <p className="text-lg text-brand-text-secondary leading-relaxed">
              calms your mind to create feelings of comfort and safety. when you&apos;re running on fumes, 
              these soundscapes help your nervous system downshift so you can actually rest.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <Zap className="w-8 h-8 text-brand-accent" />
              <h2 className="text-3xl font-light lowercase tracking-tight">focus</h2>
            </div>
            <p className="text-lg text-brand-text-secondary leading-relaxed">
              boosts your productivity by helping you concentrate for longer. cuts through the noise 
              when you have ten tabs open and need to actually ship something.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <Moon className="w-8 h-8 text-brand-accent" />
              <h2 className="text-3xl font-light lowercase tracking-tight">sleep</h2>
            </div>
            <p className="text-lg text-brand-text-secondary leading-relaxed">
              soothes you into a deep sleep with soft, gentle sounds. because sleeping at your desk 
              isn&apos;t a sustainable strategy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <Activity className="w-8 h-8 text-brand-accent" />
              <h2 className="text-3xl font-light lowercase tracking-tight">activity</h2>
            </div>
            <p className="text-lg text-brand-text-secondary leading-relaxed">
              powers your movement with sounds to keep you present and grounded. for when you need 
              to move your body before you can move your business forward.
            </p>
          </motion.div>
        </div>

        {/* The Science */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-brand-text-muted/10 pt-16"
        >
          <h2 className="text-4xl font-light lowercase mb-8 tracking-tight">the science</h2>
          <div className="space-y-6 text-lg text-brand-text-secondary leading-relaxed">
            <p>
              our soundscapes use binaural beats, isochronic tones, and nature sounds that directly 
              influence your brainwave patterns. not meditation. not wellness. just functional audio 
              that changes your state.
            </p>
            <p>
              neuroscience shows that specific frequencies can improve focus by up to 7x, reduce 
              stress by 3.6x with regular use, and help maintain 95% of concentration during extended 
              listening sessions.
            </p>
            <p>
              every soundscape is built for a specific founder state. burnt out. overloaded. anxious. 
              adhd as hell. we know because we&apos;ve been there.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 text-center"
        >
          <Link href="/soundscapes">
            <Button 
              size="lg"
              className="rounded-full bg-brand-accent hover:bg-brand-accent/90 text-white text-base px-12 py-7 lowercase font-normal glow-accent-lg hover:scale-105 transition-all duration-300 tracking-wide"
            >
              start listening
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

