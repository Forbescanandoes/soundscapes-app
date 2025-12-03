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

      {/* Intro Section */}
      <div className="bg-brand-bg-secondary py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light lowercase leading-tight mb-6 tracking-tight">
              engineered sounds. not music.
            </h2>
            <p className="text-xl sm:text-2xl font-light text-brand-text-secondary lowercase leading-relaxed tracking-wide">
              built to pull overloaded founders out of the jam fast.
            </p>
          </motion.div>
        </div>
      </div>

      {/* The System Section */}
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
            <h3 className="text-3xl sm:text-4xl font-light lowercase tracking-tight">the system</h3>
          </div>
          <div className="space-y-4 text-lg text-brand-text-secondary leading-relaxed lowercase">
            <p>
              a neuroacoustic reset designed for people who think hard for a living.
            </p>
            <p className="text-brand-text-primary">
              just sound that interrupts overload and restores cognitive bandwidth.
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
                title: "model the overload",
                description: "we recreate the exact mental states founders hit when their brain jams: fog, pressure, panic loops, scattered focus.",
                icon: Activity,
                delay: 0.3
              },
              {
                number: "2",
                title: "design the physiology",
                description: "we map what the body does under stress and turn those patterns into sound rules the nervous system reacts to.",
                icon: TrendingUp,
                delay: 0.35
              },
              {
                number: "3",
                title: "build the environment",
                description: "we craft a sound field that interrupts overload: frequencies, modulation, and micro silence that break the jam.",
                icon: Layers,
                delay: 0.4
              },
              {
                number: "4",
                title: "test with real founders",
                description: "we run each track during real pressure moments mid build, mid fog, mid spike and tune it until relief is repeatable.",
                icon: TestTube,
                delay: 0.45
              },
              {
                number: "5",
                title: "measure the shift",
                description: "if clarity rises and the jam drops, it stays. if not, it gets rebuilt. only the tracks that actually help make it through.",
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

        {/* Real Founder States */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-12">
            <TestTube className="w-8 h-8 text-brand-accent" />
            <h3 className="text-3xl sm:text-4xl font-light lowercase tracking-tight">real founder states</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "🎭",
                title: "one too many hats",
                situation: "when your attention is split across ten tabs.",
                solution: "sound built to collapse chaos into one stable thread.",
                icon: BriefcaseBusiness,
                gradient: "from-yellow-500/20 to-orange-500/20",
                delay: 0.3
              },
              {
                emoji: "😬",
                title: "marketing dread",
                situation: "when visibility feels like threat.",
                solution: "sound designed to lower that spike so you can think again.",
                icon: Frown,
                gradient: "from-purple-500/20 to-pink-500/20",
                delay: 0.35
              },
              {
                emoji: "💤",
                title: "slept at desk",
                situation: "when your body quits before the build does.",
                solution: "sound that stabilizes you long enough to reset properly.",
                icon: Moon,
                gradient: "from-red-500/20 to-orange-500/20",
                delay: 0.4
              },
              {
                emoji: "🍽️",
                title: "forgot to eat",
                situation: "when you're hollow and unfocused.",
                solution: "sound that pulls you back into your body so your brain can reconnect.",
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
          <Link href="/demo/state-gate">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-xl border-2 border-brand-accent bg-transparent px-12 py-4 text-lg font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)]"
            >
              try demo
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
