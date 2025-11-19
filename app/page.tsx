"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SignInButton, SignUpButton, SignedOut, useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { Brain, Zap, Target, Sparkles, Play, Pause, Check, Copy } from 'lucide-react'
import { useAudioPlayer } from '@/hooks/use-audio-player'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export default function Home() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  
  // Redirect logged-in users to soundscapes
  useEffect(() => {
    if (isSignedIn) {
      router.push('/soundscapes')
    }
  }, [isSignedIn, router])
  const [showConversionModal, setShowConversionModal] = useState(false)
  const [copied, setCopied] = useState(false)
  
  const { play, pause, isPlaying, currentTrackId } = useAudioPlayer({
    durationLimit: isSignedIn ? undefined : 20, // 20 seconds for non-signed-in users
    onDurationLimitReached: () => {
      setShowConversionModal(true)
    }
  })

  const storageUrl = 'https://gbyvackgdmzrfawmeuhd.supabase.co/storage/v1/object/public/soundscapes'
  
  const soundscapeCategories = [
    {
      id: 'burnout',
      title: 'burnout',
      description: 'shipping nonstop. brain\'s static. can\'t think. this clears it.',
      audioFile: `${storageUrl}/${encodeURIComponent('Slept at Desk.wav')}`,
      icon: Brain,
      gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
      id: 'overload',
      title: 'overload',
      description: 'ten tabs deep. everything\'s on fire. wearing every hat. pause here.',
      audioFile: `${storageUrl}/${encodeURIComponent('One Too Many Hats.wav')}`,
      icon: Zap,
      gradient: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      id: 'anxious',
      title: 'anxious',
      description: 'runway math. pitch anxiety. imposter loop. stop the spiral.',
      audioFile: `${storageUrl}/${encodeURIComponent('Imposter Hour.wav')}`,
      icon: Target,
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 'scattered',
      title: 'scattered',
      description: 'ideas avalanching. scrolling not shipping. can\'t start. can\'t stop. reset.',
      audioFile: `${storageUrl}/${encodeURIComponent('Twelve Tabs Open.wav')}`,
      icon: Sparkles,
      gradient: 'from-blue-500/20 to-cyan-500/20'
    }
  ]

  const handlePlayPause = (id: string, audioFile: string) => {
    if (currentTrackId === id && isPlaying) {
      pause()
    } else {
      play(id, audioFile)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://workingonname.vercel.app')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="bg-brand-bg text-brand-text-primary overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-brand-text-muted/10 bg-brand-bg/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-bold tracking-tight">donothingsounds.com</div>
            <div className="flex items-center gap-3">
              <SignedOut>
                <SignInButton 
                  mode="modal"
                  fallbackRedirectUrl="/soundscapes"
                  signUpFallbackRedirectUrl="/soundscapes"
                >
                  <Button variant="ghost" className="rounded-full lowercase text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors">
                    sign in
                  </Button>
                </SignInButton>
                <SignUpButton 
                  mode="modal"
                  fallbackRedirectUrl="/soundscapes"
                  signInFallbackRedirectUrl="/soundscapes"
                >
                  <Button className="rounded-full border-2 border-brand-accent bg-transparent hover:bg-brand-accent/10 text-brand-accent lowercase text-sm font-medium transition-all">
                    sign up
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8">
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

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] mb-8 text-brand-text-primary lowercase">
              Your brain isn&apos;t tired. It&apos;s overloaded.
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-brand-text-secondary lowercase max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Here&apos;s the 5 minute reset that clears the pressure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/soundscapes">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative rounded-xl border-2 border-brand-accent bg-transparent px-12 py-4 text-lg font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)]"
              >
                start your reset
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Soundscape Categories Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-bg-secondary to-brand-bg" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-light lowercase mb-6 tracking-tight">
              choose your state
            </h2>
            <p className="text-lg sm:text-xl text-brand-text-secondary lowercase tracking-wide">
              when you&apos;ve hit a wall; <span className="text-brand-accent">hit play</span>.
            </p>
          </motion.div>

          {/* Visual Player Display */}
          {currentTrackId && isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-12 max-w-4xl mx-auto"
            >
              <div className="relative overflow-hidden rounded-3xl border border-brand-text-muted/20 bg-brand-bg-secondary/50 backdrop-blur-xl p-8 sm:p-12">
                {/* Animated background gradient based on category */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  soundscapeCategories.find(c => c.id === currentTrackId)?.gradient
                } opacity-20`} />
                
                {/* Animated pulse rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-24 h-24 rounded-full border ${
                        currentTrackId === 'burnout' ? 'border-red-500/40' :
                        currentTrackId === 'overload' ? 'border-yellow-500/40' :
                        currentTrackId === 'anxious' ? 'border-purple-500/40' :
                        'border-blue-500/40'
                      }`}
                      style={{ borderWidth: '1.5px' }}
                      animate={{
                        scale: [1, 3, 3],
                        opacity: [0.8, 0, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: i * 1.3,
                        ease: "linear",
                        times: [0, 0.95, 1],
                      }}
                    />
                  ))}
                </div>

                {/* Center content */}
                <div className="relative z-10 text-center">
                  <p className="text-xl sm:text-2xl font-light lowercase text-brand-accent tracking-tight mb-6">
                    {soundscapeCategories.find(c => c.id === currentTrackId)?.title}
                  </p>
                  
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {(() => {
                      const category = soundscapeCategories.find(c => c.id === currentTrackId)
                      const Icon = category?.icon
                      return Icon ? <Icon className="w-16 h-16 mx-auto text-brand-accent" /> : null
                    })()}
                  </motion.div>

                  {/* Audio wave animation */}
                  <div className="flex items-center justify-center gap-1 mt-8">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-brand-accent rounded-full"
                        animate={{
                          height: [12, 32, 12],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {soundscapeCategories.map((category, index) => {
              const Icon = category.icon
              const isCategoryPlaying = currentTrackId === category.id && isPlaying
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="relative h-full bg-brand-bg-secondary rounded-2xl border border-brand-text-muted/20 hover:border-brand-accent/50 transition-all duration-300 overflow-hidden">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Playing animation */}
                    {isCategoryPlaying && (
                      <motion.div
                        className="absolute inset-0 bg-brand-accent/10"
                        animate={{
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}

                    <div className="relative z-10 p-8 flex flex-col h-full">
                      {/* Play button */}
                      <button
                        onClick={() => handlePlayPause(category.id, category.audioFile)}
                        className="absolute top-4 right-4 w-12 h-12 rounded-full bg-brand-bg border border-brand-text-muted/30 hover:border-brand-accent hover:bg-brand-accent/10 flex items-center justify-center transition-all duration-300 group/play"
                      >
                        {isCategoryPlaying ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <Pause className="w-5 h-5 text-brand-accent" />
                          </motion.div>
                        ) : (
                          <Play className="w-5 h-5 text-brand-text-secondary group-hover/play:text-brand-accent transition-colors" />
                        )}
                      </button>

                      {/* Icon */}
                      <div className="mb-6">
                        <Icon className={`w-10 h-10 transition-all duration-300 ${isCategoryPlaying ? 'text-brand-accent' : 'text-brand-text-secondary'}`} />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-light lowercase mb-3 text-brand-text-primary tracking-tight">
                        {category.title}
                      </h3>
                      <p className="text-sm text-brand-text-secondary lowercase leading-relaxed tracking-wide mb-6 flex-1">
                        {category.description}
                      </p>

                      {/* Learn More Link */}
                      <Link 
                        href="/learn-more"
                        className="text-sm text-brand-text-secondary hover:text-brand-accent transition-colors lowercase tracking-wide inline-flex items-center gap-2 group/link"
                      >
                        learn more
                        <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How To Roadmap Section */}
      <section className="py-32 sm:py-40 px-4 sm:px-6 lg:px-8 bg-brand-bg-secondary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-bg-secondary to-brand-bg" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* When to Use It */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-[32rem]"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light lowercase mb-8 text-brand-text-primary tracking-tight">
                when to use it
            </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  trigger: "when you can't think straight",
                  moment: "brain fog. tabs open but nothing landing. you're reading the same line three times.",
                  gradient: "from-red-500/20 to-orange-500/20"
                },
                {
                  trigger: "when you're stuck in a loop",
                  moment: "same thought. same worry. same mental tab refreshing. you're spinning, not solving.",
                  gradient: "from-purple-500/20 to-pink-500/20"
                },
                {
                  trigger: "when decisions feel impossible",
                  moment: "every option looks bad. analysis paralysis. you need clarity but you're running on fumes.",
                  gradient: "from-yellow-500/20 to-orange-500/20"
              },
              {
                  trigger: "when you feel the crash coming",
                  moment: "that moment before burnout fully hits. when you know you're about to lose hours or days if you don't stop now.",
                  gradient: "from-blue-500/20 to-cyan-500/20"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                  initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                viewport={{ once: true }}
                  className="group relative"
              >
                  <div className="relative h-full p-6 rounded-2xl border border-brand-text-muted/20 bg-brand-bg/50 backdrop-blur-sm hover:border-brand-accent/40 transition-all duration-300 overflow-hidden">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <h4 className="text-xl sm:text-2xl font-light lowercase mb-3 text-brand-text-primary tracking-tight">
                        {item.trigger}
                      </h4>
                      <p className="text-base text-brand-text-secondary lowercase leading-relaxed tracking-wide">
                        {item.moment}
                </p>
                    </div>
                  </div>
              </motion.div>
            ))}
          </div>

            {/* Emphasis */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-xl sm:text-2xl font-light lowercase text-brand-text-secondary tracking-wide">
                don&apos;t wait until you&apos;re already gone.
              </p>
              <p className="text-xl sm:text-2xl font-light lowercase text-brand-accent tracking-wide mt-2">
                catch it early. reset now.
              </p>
            </motion.div>
          </motion.div>

          {/* How to Use It Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light lowercase mb-6 tracking-tight text-brand-text-primary">
              how to actually use this
            </h2>
            <p className="text-xl sm:text-2xl text-brand-accent lowercase tracking-wide font-light">
              this isn&apos;t background music.
            </p>
          </motion.div>

          {/* Roadmap Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-accent/0 via-brand-accent/40 to-brand-accent/0 hidden sm:block" />

            {/* Steps */}
            <div className="space-y-20">
              {[
                {
                  number: "01",
                  title: "headphones on. 100%.",
                  description: "not speakers. not airpods on low. actual headphones. this only works if the sound wraps around your brain.",
                  side: "left",
                  delay: 0.1
                  },
                  {
                  number: "02",
                  title: "stop everything.",
                  description: "you don't just turn it on and call it a day. you stop. desk, couch, floor. doesn't matter. but you stop.",
                  side: "right",
                  delay: 0.2
                },
                {
                  number: "03",
                  title: "eyes off. eyes shut.",
                  description: "screen off. phone face down. eyes closed. if you're still scrolling, you're not resetting. you're stalling.",
                  side: "left",
                  delay: 0.3
                  },
                  {
                  number: "04",
                  title: "let go.",
                  description: "try not to think. try not to solve. try not to plan. just breathe and let the sound do the work.",
                  side: "right",
                  delay: 0.4
                },
                {
                  number: "05",
                  title: "this is the reset.",
                  description: "5 minutes. 10 if you can. this isn't a break. your nervous system finally stops screaming.",
                  side: "left",
                  delay: 0.5
                  }
              ].map((step, index) => (
                  <motion.div
                    key={index}
                  initial={{ opacity: 0, x: step.side === 'left' ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: step.delay }}
                    viewport={{ once: true }}
                  className={`relative flex items-center ${
                    step.side === 'right' ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Mobile layout (stacked) */}
                  <div className="flex items-start gap-6 md:hidden w-full">
                    {/* Number badge */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-accent/10 border-2 border-brand-accent flex items-center justify-center">
                      <span className="text-brand-accent font-light text-lg tracking-tight">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-2xl sm:text-3xl font-light lowercase mb-3 text-brand-text-primary tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-base sm:text-lg text-brand-text-secondary lowercase leading-relaxed tracking-wide">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop layout (alternating sides) */}
                  <div className="hidden md:flex md:items-center md:w-full">
                    {/* Left content */}
                    <div className={`w-full md:w-[calc(50%-2rem)] ${
                      step.side === 'left' ? 'pr-12 text-right' : 'pl-12 text-left order-2'
                    }`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="group"
                      >
                        <div className="relative p-8 rounded-2xl border border-brand-text-muted/20 bg-brand-bg/50 backdrop-blur-sm hover:border-brand-accent/50 transition-all duration-300">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-accent/0 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <div className="relative z-10">
                            <h3 className="text-2xl sm:text-3xl font-light lowercase mb-4 text-brand-text-primary tracking-tight">
                              {step.title}
                      </h3>
                            <p className="text-base sm:text-lg text-brand-text-secondary lowercase leading-relaxed tracking-wide">
                              {step.description}
                      </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Center node */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex-shrink-0 z-20">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-16 h-16 rounded-full bg-brand-bg border-2 border-brand-accent flex items-center justify-center relative"
                      >
                        <div className="absolute inset-0 rounded-full bg-brand-accent/20 blur-xl" />
                        <span className="text-brand-accent font-light text-lg tracking-tight relative z-10">
                          {step.number}
                        </span>
                      </motion.div>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="w-full md:w-[calc(50%-2rem)]" />
                    </div>
                  </motion.div>
                ))}
              </div>

            {/* Final emphasis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-32 text-center"
            >
              <p className="text-3xl sm:text-4xl md:text-5xl font-light lowercase text-brand-text-primary tracking-tight leading-tight">
                do it right or don&apos;t do it at all.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <Link href="/soundscapes">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative rounded-xl border-2 border-brand-accent bg-transparent px-12 py-4 text-lg font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)]"
                >
                  see how fast it works → start your reset
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-text-muted/10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-bg-secondary/50 to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl sm:text-6xl md:text-7xl font-light lowercase leading-tight text-brand-text-secondary mb-6 tracking-tight">
                forget
              </div>
              <div className="text-5xl sm:text-6xl md:text-7xl font-light lowercase leading-tight text-brand-text-primary tracking-tight">
                productivity porn.
            </div>
          </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-xl sm:text-2xl font-light lowercase text-brand-text-secondary leading-relaxed tracking-wide">
                the real killer isn&apos;t distractions.
              </p>
              <p className="text-xl sm:text-2xl font-light lowercase text-brand-text-primary leading-relaxed tracking-wide">
                it&apos;s the days you lose to brain fog and bad calls on fumes.
              </p>
          </motion.div>
          </div>
        </div>
      </section>

      {/* States Bento Grid */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-brand-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-2xl sm:text-3xl font-light lowercase text-brand-text-primary tracking-wide">
              we made these for when you&apos;re:
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Brain,
                title: "burnt out",
                description: "shipping nonstop. brain's static. can't think. this clears it.",
                delay: 0
              },
              {
                icon: Zap,
                title: "overloaded",
                description: "ten tabs deep. everything's on fire. wearing every hat. pause here.",
                delay: 0.1
              },
              {
                icon: Target,
                title: "anxious",
                description: "runway math. pitch anxiety. imposter loop. stop the spiral.",
                delay: 0.2
              },
              {
                icon: Sparkles,
                title: "scattered as hell",
                description: "ideas avalanching. scrolling not shipping. can't start. can't stop. reset.",
                delay: 0.3
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative h-full p-8 rounded-2xl border border-brand-text-muted/20 bg-brand-bg/50 backdrop-blur-sm hover:border-brand-accent/50 transition-all duration-300 hover:bg-brand-bg/80">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-accent/0 via-brand-accent/0 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <item.icon className="w-8 h-8 mb-6 text-brand-accent opacity-80 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-2xl sm:text-3xl font-light lowercase mb-4 text-brand-text-primary tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg text-brand-text-secondary lowercase leading-relaxed tracking-wide">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Neuroscience Stats Section */}
      <section className="py-32 sm:py-40 px-4 sm:px-6 lg:px-8 bg-brand-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-accent/5 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-light lowercase mb-8 tracking-tight">
              why this works (without the woo-woo)
            </h2>
            <p className="text-lg sm:text-xl text-brand-text-secondary lowercase max-w-4xl mx-auto leading-relaxed">
              Your brain is a machine. When it overheats, you don&apos;t meditate you cool it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {[
              {
                stat: "90 seconds",
                description: "Your stress response can drop off in ~90 seconds if you interrupt the spiral.",
                superscript: "1",
                delay: 0
              },
              {
                stat: "2–5 minutes",
                description: "Short resets restore attention way more than long breaks (because long breaks kill momentum).",
                superscript: "2",
                delay: 0.1
              },
              {
                stat: "70%",
                description: "Founders report higher stress than everyone else. Shocker.",
                superscript: "3",
                delay: 0.2
              },
              {
                stat: "2x",
                description: "Sound resets help you bounce back from spikes twice as fast.",
                superscript: "4",
                delay: 0.3
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: item.delay }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative inline-block mb-6">
                  <motion.div
                    className="text-4xl sm:text-5xl md:text-6xl font-light text-brand-text-primary tracking-tight"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.stat}
                  </motion.div>
                </div>
                <p className="text-base sm:text-lg text-brand-text-secondary lowercase leading-relaxed tracking-wide px-2">
                  {item.description}
            </p>
          </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Advantage Section */}
      <section className="py-32 sm:py-40 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light lowercase leading-tight text-brand-accent tracking-tight">
              every founder hits empty.
            </p>
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light lowercase leading-tight text-brand-text-primary tracking-tight mt-4">
              the ones who last know how to refill.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Truth Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-brand-bg-secondary border-y border-brand-text-muted/10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-1 h-full bg-gradient-to-b from-brand-accent to-transparent rounded-full" />
              <div className="space-y-6">
                <p className="text-3xl sm:text-4xl md:text-5xl font-light lowercase leading-tight text-brand-text-secondary tracking-tight">
                  forget wellness.
                </p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-light lowercase leading-tight text-brand-accent tracking-tight">
                  this is endurance tech.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 sm:py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Dramatic gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg-secondary to-brand-bg" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-accent/10 via-transparent to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light lowercase leading-tight text-brand-text-primary mb-20 tracking-tight">
              stop losing days to fog.
            </h2>

            <Link href="/soundscapes">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative rounded-xl border-2 border-brand-accent bg-transparent px-12 py-4 text-lg font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)]"
              >
                see how fast it works
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-text-muted/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-3xl sm:text-4xl md:text-5xl font-light lowercase leading-tight text-brand-text-primary mb-12 tracking-tight">
              if you know a founder who&apos;s about to snap, send them this.
            </p>

            <motion.button
              onClick={handleCopyLink}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full border border-brand-text-muted/30 hover:border-brand-accent/50 bg-brand-bg-secondary/50 backdrop-blur-sm hover:bg-brand-bg-secondary transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-base sm:text-lg font-light lowercase text-brand-text-primary tracking-wide">
                send them a reset
              </span>
              {copied ? (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Check className="w-5 h-5 text-brand-accent" />
                </motion.div>
              ) : (
                <Copy className="w-5 h-5 text-brand-text-secondary group-hover:text-brand-accent transition-colors" />
              )}

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-brand-accent/0 group-hover:bg-brand-accent/5 transition-all duration-300" />
            </motion.button>

            {copied && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-sm text-brand-accent lowercase tracking-wide"
              >
                link copied
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-brand-text-muted/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-text-muted lowercase tracking-wide">
            brain fog kills more startups than bad code.
          </p>
          <div className="flex items-center gap-6 text-sm text-brand-text-muted lowercase">
            <Link href="/soundscapes" className="hover:text-brand-accent transition-colors tracking-wide">
              soundscapes
            </Link>
            <span className="opacity-50">•</span>
            <a href="#" className="hover:text-brand-accent transition-colors tracking-wide">
              twitter
            </a>
          </div>
        </div>
      </footer>

      {/* Conversion Modal */}
      <Dialog open={showConversionModal} onOpenChange={setShowConversionModal}>
        <DialogContent className="bg-brand-bg border-brand-text-muted/20 sm:max-w-md">
          <DialogHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mx-auto w-16 h-16 rounded-full bg-brand-accent/10 border-2 border-brand-accent flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-brand-accent" />
            </motion.div>
            
            <DialogTitle className="text-3xl sm:text-4xl font-light lowercase tracking-tight text-brand-text-primary">
              ready for the full experience?
            </DialogTitle>
            
            <DialogDescription className="text-base sm:text-lg text-brand-text-secondary lowercase leading-relaxed tracking-wide">
              that was just a taste. sign up for unlimited access to all soundscapes and reset whenever you need.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-6">
            <SignUpButton 
              mode="modal"
              fallbackRedirectUrl="/soundscapes"
              signInFallbackRedirectUrl="/soundscapes"
            >
              <button className="w-full rounded-xl border-2 border-brand-accent bg-transparent px-8 py-3 text-base font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)] hover:scale-[1.02] active:scale-[0.98]">
                sign up free
              </button>
            </SignUpButton>

            <button
              onClick={() => setShowConversionModal(false)}
              className="text-sm text-brand-text-muted hover:text-brand-text-secondary lowercase tracking-wide transition-colors"
            >
              maybe later
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
