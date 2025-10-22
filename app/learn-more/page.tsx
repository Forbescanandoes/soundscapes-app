"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain, Zap, Target, Sparkles } from 'lucide-react'

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
          <h2 className="text-2xl sm:text-3xl font-light text-brand-text-primary lowercase leading-relaxed mb-6 tracking-tight">
            sound built for endurance
          </h2>
          <p className="text-lg sm:text-xl font-light text-brand-text-secondary lowercase leading-relaxed mb-16">
            neuroscience backed soundscapes designed for founders who need to perform — not unwind. quick resets that clear the noise, restore clarity, and keep you shipping when everything&apos;s on fire.
          </p>
        </motion.div>

        {/* Soundscape States */}
        <div className="space-y-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 pb-12 border-b border-brand-text-muted/10"
          >
            <div className="flex items-center gap-4">
              <Brain className="w-8 h-8 text-brand-accent" />
              <h2 className="text-3xl font-light lowercase tracking-tight">burnout</h2>
            </div>
            <p className="text-lg text-brand-text-secondary leading-relaxed lowercase">
              shipping nonstop. brain&apos;s static. can&apos;t think.
            </p>
            <p className="text-lg text-brand-text-primary leading-relaxed lowercase">
              this clears the mental jam so you don&apos;t stall.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 pb-12 border-b border-brand-text-muted/10"
          >
            <div className="flex items-center gap-4">
              <Zap className="w-8 h-8 text-brand-accent" />
              <h2 className="text-3xl font-light lowercase tracking-tight">overload</h2>
            </div>
            <p className="text-lg text-brand-text-secondary leading-relaxed lowercase">
              ten tabs deep. inbox on fire. wearing every hat.
            </p>
            <p className="text-lg text-brand-text-primary leading-relaxed lowercase">
              pause here — come back sharper.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 pb-12 border-b border-brand-text-muted/10"
          >
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8 text-brand-accent" />
              <h2 className="text-3xl font-light lowercase tracking-tight">anxious</h2>
            </div>
            <p className="text-lg text-brand-text-secondary leading-relaxed lowercase">
              runway math. pitch nerves. imposter loop.
            </p>
            <p className="text-lg text-brand-text-primary leading-relaxed lowercase">
              stop the spiral before it wrecks your focus.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-4 pb-12 border-b border-brand-text-muted/10"
          >
            <div className="flex items-center gap-4">
              <Sparkles className="w-8 h-8 text-brand-accent" />
              <h2 className="text-3xl font-light lowercase tracking-tight">adhd</h2>
            </div>
            <p className="text-lg text-brand-text-secondary leading-relaxed lowercase">
              ideas avalanching. scrolling not shipping. can&apos;t start. can&apos;t stop.
            </p>
            <p className="text-lg text-brand-text-primary leading-relaxed lowercase">
              reset. lock in. ship.
            </p>
          </motion.div>
        </div>

        {/* The Tech */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-brand-text-muted/10 pt-16"
        >
          <h2 className="text-4xl font-light lowercase mb-8 tracking-tight">the tech</h2>
          <div className="space-y-6 text-lg text-brand-text-secondary leading-relaxed lowercase">
            <p>
              our soundscapes use binaural beats, isochronic tones, and nature based frequencies tuned to shift your brain&apos;s state fast.
            </p>
            <p className="text-brand-text-primary">
              not meditation. not wellness. functional audio that rebuilds momentum.
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

