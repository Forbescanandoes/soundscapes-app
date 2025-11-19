"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain, Activity, TrendingUp, Layers, TestTube, BarChart3, BriefcaseBusiness, Frown, Moon, Sandwich } from 'lucide-react'

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light lowercase leading-tight mb-12 tracking-tight">
            how it works
          </h1>
        </motion.div>
      </div>

      {/* Built Like a Product Section */}
      <div className="bg-brand-bg-secondary py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light lowercase leading-tight mb-6 tracking-tight">
              built like a product, not a playlist.
            </h2>
            <p className="text-xl sm:text-2xl font-light text-brand-text-secondary lowercase leading-relaxed tracking-wide">
              we don&apos;t make ambience — we engineer states.
            </p>
            <p className="text-lg sm:text-xl font-light text-brand-text-muted lowercase leading-relaxed tracking-wide mt-4">
              every sound is modeled, tested, and refined to pull founders out of overload in minutes.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Framework Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Brain className="w-8 h-8 text-brand-accent" />
            <h3 className="text-3xl sm:text-4xl font-light lowercase tracking-tight">the framework</h3>
          </div>
          <div className="space-y-4 text-lg text-brand-text-secondary leading-relaxed lowercase">
            <p>
              a neuroacoustic system designed for overstimulated founders who need rapid decompression.
            </p>
            <p>
              not mindfulness.
            </p>
            <p>
              not meditation.
            </p>
            <p>
              not mood management.
            </p>
            <p className="text-brand-text-primary">
              just physics, psychoacoustics, and nervous-system ergonomics — sound that resets your cognitive bandwidth so you can get back to building.
            </p>
          </div>
        </motion.div>

        {/* How We Build It */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-3 mb-12">
            <Layers className="w-8 h-8 text-brand-accent" />
            <h3 className="text-3xl sm:text-4xl font-light lowercase tracking-tight">how we build it</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                number: "1",
                title: "simulate the state",
                description: "model real founder overload: deadline panic, cognitive fog, burnout loops, physiological stress.",
                icon: Activity,
                delay: 0.3
              },
              {
                number: "2",
                title: "design the physiology",
                description: "map the stress signature: breath rhythm, heart rate drift, neural activation patterns. translate them into acoustic rules.",
                icon: TrendingUp,
                delay: 0.35
              },
              {
                number: "3",
                title: "build the environment",
                description: "layer frequencies, modulation curves, and micro-silence windows until the nervous system unlocks.",
                icon: Layers,
                delay: 0.4
              },
              {
                number: "4",
                title: "test in the wild",
                description: "run each sound with real founders mid-build, mid-panic, mid-burnout. optimize for regulation, not vibes.",
                icon: TestTube,
                delay: 0.45
              },
              {
                number: "5",
                title: "measure the effect",
                description: "clarity up. pressure down. brain back online. if it doesn't move the needle, it doesn't ship.",
                icon: BarChart3,
                delay: 0.5
              }
            ].map((step) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: step.delay }}
                viewport={{ once: true }}
                className={`group relative ${step.number === "5" ? "md:col-span-2 md:max-w-md md:mx-auto" : ""}`}
              >
                <div className="relative h-full p-6 rounded-2xl border border-brand-text-muted/20 bg-brand-bg/50 backdrop-blur-sm hover:border-brand-accent/30 transition-all duration-300">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-accent/0 via-brand-accent/0 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    {/* Number and Icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center">
                        <span className="text-brand-accent font-medium text-sm">{step.number}</span>
                      </div>
                      <step.icon className="w-5 h-5 text-brand-accent opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <h4 className="text-xl font-light lowercase mb-3 text-brand-text-primary tracking-tight">
                      {step.title}
                    </h4>
                    <p className="text-base text-brand-text-secondary lowercase leading-relaxed tracking-wide">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real Simulations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <TestTube className="w-8 h-8 text-brand-accent" />
            <h3 className="text-3xl sm:text-4xl font-light lowercase tracking-tight">real simulations</h3>
          </div>
          <p className="text-lg text-brand-text-secondary lowercase leading-relaxed mb-12 tracking-wide">
            each sound begins with a real founder moment — the nervous system under load.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "🎭",
                title: "one too many hats",
                situation: "when every tab pulls attention and your brain fragments.",
                solution: "sound designed to collapse chaos into a single stable thread.",
                icon: BriefcaseBusiness,
                gradient: "from-yellow-500/20 to-orange-500/20",
                delay: 0.3
              },
              {
                emoji: "😬",
                title: "the dread of marketing",
                situation: "when visibility feels like exposure.",
                solution: "sound built to calm the threat response and open cognitive space.",
                icon: Frown,
                gradient: "from-purple-500/20 to-pink-500/20",
                delay: 0.35
              },
              {
                emoji: "💤",
                title: "slept at desk",
                situation: "when the body quits before the build does.",
                solution: "sound that stabilizes you long enough to stop resisting recovery.",
                icon: Moon,
                gradient: "from-red-500/20 to-orange-500/20",
                delay: 0.4
              },
              {
                emoji: "🍽️",
                title: "forgot to eat",
                situation: "when you're hollow and disconnected from your body.",
                solution: "sound that pulls you back into gravity and restores presence.",
                icon: Sandwich,
                gradient: "from-blue-500/20 to-cyan-500/20",
                delay: 0.45
              }
            ].map((sim, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sim.delay }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative h-full p-8 rounded-2xl border border-brand-text-muted/20 bg-brand-bg-secondary/50 backdrop-blur-sm hover:border-brand-accent/30 transition-all duration-300 overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${sim.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Emoji */}
                    <div className="text-4xl mb-4">
                      {sim.emoji}
                    </div>
                    
                    <h4 className="text-2xl font-light lowercase mb-4 text-brand-text-primary tracking-tight flex items-center gap-2">
                      {sim.title}
                    </h4>
                    
                    <p className="text-base text-brand-text-secondary lowercase leading-relaxed mb-3 tracking-wide">
                      {sim.situation}
                    </p>
                    
                    <p className="text-base text-brand-text-primary lowercase leading-relaxed tracking-wide">
                      {sim.solution}
                    </p>
                  </div>

                  {/* Corner accent */}
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <sim.icon className="w-8 h-8 text-brand-accent" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Link href="/soundscapes">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-xl border-2 border-brand-accent bg-transparent px-12 py-4 text-lg font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)]"
            >
              explore the states
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

