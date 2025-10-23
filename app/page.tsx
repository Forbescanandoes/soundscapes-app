"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { Brain, Zap, Target, Sparkles, Play, Pause, Check, Copy, BriefcaseBusiness, Frown, Moon, Sandwich } from 'lucide-react'
import { useAudioPlayer } from '@/hooks/use-audio-player'
import { useState } from 'react'

export default function Home() {
  const { play, pause, isPlaying, currentTrackId } = useAudioPlayer()
  const [copied, setCopied] = useState(false)

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
      id: 'adhd',
      title: 'adhd',
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
            <div className="text-xl font-light lowercase tracking-tight">reliefware</div>
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
                  <Button className="rounded-full bg-brand-accent hover:bg-brand-accent/90 text-white lowercase text-sm font-medium transition-all">
                    sign up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 pb-20 px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight lowercase leading-[1.05] mb-6">
              <div className="mb-4">while you&apos;re stuck</div>
              <div className="relative inline-block">
                <span className="text-brand-accent relative z-10">someone else is shipping.</span>
                <motion.div 
                  className="absolute inset-0 blur-2xl bg-brand-accent/30 -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl font-light text-brand-text-secondary lowercase max-w-3xl mx-auto tracking-wide leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            the fastest reset for founders who can&apos;t afford to take a day off.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/soundscapes">
              <Button 
                size="lg"
                className="rounded-full bg-brand-accent hover:bg-brand-accent/90 text-white text-base px-12 py-7 lowercase font-normal glow-accent-lg hover:scale-105 transition-all duration-300 tracking-wide shadow-[0_0_40px_rgba(47,128,237,0.3)]"
              >
                open app
              </Button>
            </Link>
            <Link href="/learn-more">
              <Button 
                size="lg"
                variant="ghost"
                className="rounded-full border border-brand-text-muted/30 hover:border-brand-accent/50 text-brand-text-secondary hover:text-brand-text-primary text-base px-12 py-7 lowercase font-normal transition-all duration-300 tracking-wide"
              >
                learn more
              </Button>
            </Link>
          </motion.div>

          {/* Floating stats */}
          <motion.div 
            className="mt-24 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-sm text-brand-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="lowercase">instant access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="lowercase">science backed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="lowercase">built for founders</span>
            </div>
          </motion.div>
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
                title: "adhd as hell",
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
              backed by neuroscience
            </h2>
            <p className="text-lg sm:text-xl text-brand-text-secondary lowercase max-w-4xl mx-auto leading-relaxed">
              our soundscapes aren&apos;t therapy. they&apos;re survival gear. resets that clear the static in your head, restore energy in minutes, and give you back momentum when the grind tries to take it away.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {[
              {
                stat: "90s",
                description: "stress can biologically clear in as little as 90 seconds with the right reset",
                superscript: "1",
                delay: 0
              },
              {
                stat: "2-5 min",
                description: "micro breaks restore attention and reduce fatigue",
                superscript: "2",
                delay: 0.1
              },
              {
                stat: "70%",
                description: "of entrepreneurs report higher stress than traditional workers",
                superscript: "3",
                delay: 0.2
              },
              {
                stat: "2x",
                description: "faster bounce back from stress spikes with sound based resets",
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

          {/* Citations */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-20 pt-12 border-t border-brand-text-muted/10"
          >
            <div className="max-w-6xl mx-auto">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    headline: "most founders never do.",
                    text: "your body can clear stress in 90 seconds if you actually give it space to regulate.",
                    source: "harvard neuroanatomist jill bolte taylor",
                    delay: 0.8
                  },
                  {
                    headline: "you just don't do it.",
                    text: "2-5 minute breaks restore focus and reduce fatigue better than pushing through. you already know this works.",
                    source: "university of illinois, 2011",
                    delay: 0.85
                  },
                  {
                    headline: "burn out before the breakthrough.",
                    text: "you face higher stress than 70% of traditional workers. pretending you don't need resets is how you",
                    source: "gallup, 2019",
                    delay: 0.9
                  },
                  {
                    headline: "rhythm, not your wish list.",
                    text: "sound based resets double your recovery speed from stress spikes. the ones who last build this into their",
                    source: "applied psychology review, 2020",
                    delay: 0.95
                  }
                ].map((citation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: citation.delay }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    <div className="relative h-full p-8 border-l-2 border-brand-accent/30 bg-brand-bg/30 backdrop-blur-sm hover:border-brand-accent transition-all duration-300">
                      <h3 className="text-2xl sm:text-3xl font-light lowercase mb-4 text-brand-text-primary tracking-tight leading-tight">
                        {citation.headline}
                      </h3>
                      
                      <p className="text-base text-brand-text-secondary lowercase leading-relaxed tracking-wide mb-3">
                        {citation.text}
                      </p>
                      
                      <p className="text-sm text-brand-text-muted lowercase tracking-wide">
                        {citation.source}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Real Simulations Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-brand-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-light lowercase mb-6 tracking-tight text-center">
              real simulations
            </h2>
            <p className="text-lg text-brand-text-secondary lowercase leading-relaxed tracking-wide text-center max-w-3xl mx-auto">
              each sound starts from a real founder moment, the nervous system under pressure.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              {
                emoji: "🎭",
                title: "one too many hats",
                situation: "for when every tab screams for attention. too many roles, not enough bandwidth.",
                solution: "sound built to reorganize chaos into coherence.",
                icon: BriefcaseBusiness,
                gradient: "from-yellow-500/20 to-orange-500/20",
                delay: 0.1
              },
              {
                emoji: "😬",
                title: "the dread of marketing",
                situation: "for when visibility feels like threat.",
                solution: "sound that meets anxiety, then opens space inside it.",
                icon: Frown,
                gradient: "from-purple-500/20 to-pink-500/20",
                delay: 0.2
              },
              {
                emoji: "💤",
                title: "slept at desk",
                situation: "for when your body quits before your code does.",
                solution: "sound that holds you long enough to stop fighting rest.",
                icon: Moon,
                gradient: "from-red-500/20 to-orange-500/20",
                delay: 0.3
              },
              {
                emoji: "🍽️",
                title: "forgot to eat",
                situation: "for when you're hollow and detached from your body.",
                solution: "sound that brings you back into gravity.",
                icon: Sandwich,
                gradient: "from-blue-500/20 to-cyan-500/20",
                delay: 0.4
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
                <div className="relative h-full p-8 rounded-2xl border border-brand-text-muted/20 bg-brand-bg/50 backdrop-blur-sm hover:border-brand-accent/30 transition-all duration-300 overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${sim.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    {/* Emoji */}
                    <div className="text-4xl mb-4">
                      {sim.emoji}
                    </div>
                    
                    <h4 className="text-2xl font-light lowercase mb-4 text-brand-text-primary tracking-tight">
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
        </div>
      </section>

      {/* The Why Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 via-transparent to-transparent" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-3xl sm:text-4xl md:text-5xl font-light lowercase leading-tight text-brand-text-secondary tracking-tight">
              every launch, every all nighter, every pivot compounds.
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-light lowercase leading-tight text-brand-text-primary tracking-tight">
              stop losing time you can&apos;t get back.
            </p>
          </motion.div>
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

      {/* Testimonials Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-brand-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-light lowercase mb-4 tracking-tight text-brand-text-primary">
              others already know
            </h2>
            <p className="text-lg text-brand-text-secondary lowercase tracking-wide">
              what sound does.
            </p>
          </motion.div>

          {/* Staggered testimonial grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            {[
              {
                quote: "brown noise has fundamentally made my life better",
                author: "r/adhdwomen",
                platform: "reddit",
                delay: 0
              },
              {
                quote: "in a world of constant notifications, staying focused is one of the most valuable skills we can cultivate. my method? sound. meditation audio to reset my thoughts.",
                author: "stephen luke",
                role: "fire officer",
                platform: "linkedin",
                delay: 0.1
              },
              {
                quote: "brown noise with isochronic tones. work wonders for me.",
                author: "u/confused_ox_97",
                platform: "reddit",
                delay: 0.2
              },
              {
                quote: "i accidentally found the perfect productivity hack while optimising my work environment.",
                author: "nagarjun mallesh",
                role: "backend engineer",
                platform: "linkedin",
                delay: 0.15
              },
              {
                quote: "ohhh yes. i work from home and use them every day. it really helps with focus",
                author: "u/calminteraction",
                platform: "reddit",
                delay: 0.25
              },
              {
                quote: "sustained focus is key in a noisy world. beyond typical productivity hacks, sound profoundly influences our cognitive performance.",
                author: "simon bubb",
                role: "consultant & coach",
                platform: "linkedin",
                delay: 0.3
              },
              {
                quote: "dead silence is actually unnerving. it makes every tiny distraction sound like a gunshot. your brain goes on high alert, and your focus is shattered. now, imagine the gentle sound of a fountain, or the soft rustle of leaves. this is auditory wallpaper.",
                author: "intl biophilic products assoc",
                platform: "linkedin",
                delay: 0.35
              },
              {
                quote: "ambient noise, when used strategically and in moderation, can be a powerful tool for enhancing focus and improving performance. by understanding the science behind it and experimenting with different types of ambient sounds, you can unlock your full potential.",
                author: "focuslabs",
                platform: "research",
                delay: 0.4
              },
              {
                quote: "pay attention to the invisible transitions, the space between work blocks. by building a focus to rest routine using sound, you're creating rhythm. rhythm is the heartbeat of sustainable productivity.",
                author: "sam mccarthy",
                platform: "linkedin",
                delay: 0.425
              },
              {
                quote: "lofi hip hop, minimal electronic, deep house. mostly just stuff without singing.",
                author: "u/shogunDii",
                platform: "reddit",
                delay: 0.45
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: testimonial.delay }}
                viewport={{ once: true }}
                className={`group ${index % 3 === 1 ? 'md:mt-12' : ''} ${index % 3 === 2 ? 'md:mt-24' : ''}`}
              >
                <div className="relative h-full p-6 rounded-2xl border border-brand-text-muted/20 bg-brand-bg/50 backdrop-blur-sm hover:border-brand-accent/30 transition-all duration-300">
                  {/* Quote mark decoration */}
                  <div className="absolute top-4 right-4 text-6xl text-brand-accent/10 font-serif leading-none">
                    "
                  </div>

                  <div className="relative z-10">
                    <p className="text-base text-brand-text-secondary lowercase leading-relaxed mb-6 tracking-wide">
                      {testimonial.quote}
                    </p>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-brand-text-muted/10">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center">
                        <span className="text-brand-accent text-sm font-medium">
                          {testimonial.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-brand-text-primary lowercase font-medium tracking-wide">
                          {testimonial.author}
                        </p>
                        {testimonial.role && (
                          <p className="text-xs text-brand-text-muted lowercase tracking-wide">
                            {testimonial.role}
                          </p>
                        )}
                        {testimonial.platform && !testimonial.role && (
                          <p className="text-xs text-brand-text-muted lowercase tracking-wide">
                            {testimonial.platform}
                          </p>
                        )}
                        {testimonial.platform && testimonial.role && (
                          <p className="text-xs text-brand-text-muted lowercase tracking-wide flex items-center gap-1">
                            via {testimonial.platform}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-accent/0 via-brand-accent/0 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
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
              <Button 
                size="lg"
                className="rounded-full bg-brand-accent hover:bg-brand-accent/90 text-white text-lg px-16 py-8 lowercase font-normal glow-accent-lg hover:scale-105 transition-all duration-300 tracking-wide shadow-[0_0_60px_rgba(47,128,237,0.4)]"
              >
                start now
              </Button>
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
            <p className="text-3xl sm:text-4xl md:text-5xl font-light lowercase leading-tight text-brand-text-secondary mb-4 tracking-tight">
              every founder crashes.
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-light lowercase leading-tight text-brand-text-primary mb-12 tracking-tight">
              the smart ones don&apos;t crash alone.
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
    </div>
  )
}
