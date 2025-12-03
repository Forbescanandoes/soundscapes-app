"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SignInButton, SignUpButton, SignedOut, useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { Brain, Zap, Target, Sparkles, Check, Copy } from 'lucide-react'
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

  const soundscapeCategories = [
    {
      id: 'burnout',
      title: 'burnt out',
      description: 'completely fried.',
      icon: Brain,
      gradient: 'from-red-500/20 to-orange-500/20'
    },
    {
      id: 'overload',
      title: 'overloaded',
      description: 'too much at once.',
      icon: Zap,
      gradient: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      id: 'anxious',
      title: 'anxious',
      description: 'can\'t stop spiraling.',
      icon: Target,
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 'scattered',
      title: 'scattered',
      description: 'can\'t focus on anything.',
      icon: Sparkles,
      gradient: 'from-blue-500/20 to-cyan-500/20'
    }
  ]

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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-base sm:text-xl font-bold tracking-tight">
              donothing<span className="text-brand-accent">sounds</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <SignedOut>
                <SignInButton 
                  mode="modal"
                  fallbackRedirectUrl="/soundscapes"
                  signUpFallbackRedirectUrl="/soundscapes"
                >
                  <Button variant="ghost" className="rounded-full lowercase text-xs sm:text-sm text-brand-text-secondary hover:text-brand-text-primary transition-colors focus:outline-none focus-visible:outline-none px-3 sm:px-4">
                    sign in
                  </Button>
                </SignInButton>
                <SignUpButton 
                  mode="modal"
                  fallbackRedirectUrl="/soundscapes"
                  signInFallbackRedirectUrl="/soundscapes"
                >
                  <Button className="rounded-full border-2 border-brand-accent bg-transparent hover:bg-brand-accent/10 text-brand-accent lowercase text-xs sm:text-sm font-medium transition-all px-3 sm:px-4">
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
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.15] mb-8 text-brand-text-primary lowercase">
              When your <span className="text-brand-accent">brain</span> jams,
              <br className="sm:hidden" /> press play
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-brand-text-secondary lowercase max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            a 5 minute reset that gets your brain back online
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/soundscapes" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative rounded-xl border-2 border-brand-accent bg-transparent px-8 sm:px-12 py-4 text-base sm:text-lg font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)] w-full"
              >
                start your reset
              </motion.button>
            </Link>

            <Link href="/demo/state-gate" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative rounded-xl border-2 border-brand-text-primary bg-transparent px-8 sm:px-12 py-4 text-base sm:text-lg font-normal lowercase tracking-wide text-brand-text-primary transition-all duration-300 hover:bg-brand-text-primary/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] w-full"
              >
                try demo
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
              how does your <span className="text-brand-accent">brain</span> feel?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {soundscapeCategories.map((category, index) => {
              const Icon = category.icon
              
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

                    <div className="relative z-10 p-8 flex flex-col h-full">
                      {/* Icon */}
                      <div className="mb-6">
                        <Icon className="w-10 h-10 text-brand-text-secondary group-hover:text-brand-accent transition-all duration-300" />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-light lowercase mb-2 text-brand-text-primary tracking-tight">
                        {category.title}
                      </h3>
                      <p className="text-sm text-brand-text-secondary lowercase tracking-wide mb-6 flex-1">
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

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  trigger: "can't think straight",
                  gradient: "from-red-500/20 to-orange-500/20"
                },
                {
                  trigger: "stuck in a thinking loop",
                  gradient: "from-purple-500/20 to-pink-500/20"
                },
                {
                  trigger: "decisions feel impossible",
                  gradient: "from-yellow-500/20 to-orange-500/20"
                },
                {
                  trigger: "the crash is coming",
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
                  <div className="relative h-full py-10 sm:py-14 px-4 sm:px-8 rounded-2xl border border-brand-text-muted/20 bg-brand-bg/50 backdrop-blur-sm hover:border-brand-accent/40 transition-all duration-300 overflow-hidden flex items-center justify-center text-center">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <h4 className="text-lg sm:text-2xl md:text-3xl font-light lowercase text-brand-text-primary tracking-tight leading-tight">
                        {item.trigger}
                      </h4>
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
              <Link href="/soundscapes">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative rounded-xl border-2 border-brand-accent bg-transparent px-8 sm:px-12 py-4 text-base sm:text-lg font-normal lowercase tracking-wide text-brand-accent transition-all duration-300 hover:bg-brand-accent/10 hover:shadow-[0_0_40px_rgba(47,128,237,0.3)]"
                >
                  reset now
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* How to Use It */}
          <motion.div
            id="how-to-use"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light lowercase mb-8 tracking-tight text-brand-text-primary">
              how to use this
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light lowercase text-brand-accent tracking-tight mb-4">
              headphones on. press play.
            </p>
            <p className="text-lg sm:text-xl text-brand-text-secondary lowercase tracking-wide">
              that&apos;s it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-brand-text-muted/10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-bg-secondary/50 to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-3xl sm:text-4xl md:text-5xl font-light lowercase leading-tight text-brand-text-secondary mb-4 tracking-tight">
              the threat isn&apos;t distractions.
            </p>
            <p className="text-3xl sm:text-4xl md:text-5xl font-light lowercase leading-tight text-brand-text-primary tracking-tight">
              it&apos;s a jammed <span className="text-brand-accent">brain</span>.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Why This Works Section */}
      <section className="py-32 sm:py-40 px-4 sm:px-6 lg:px-8 bg-brand-bg relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-accent/5 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light lowercase mb-12 tracking-tight">
              why this works
            </h2>
            <div className="space-y-6">
              <p className="text-xl sm:text-2xl font-light lowercase text-brand-text-secondary leading-relaxed tracking-wide">
                when your brain gets jammed, working through it doesn&apos;t fix it.
              </p>
              <p className="text-xl sm:text-2xl font-light lowercase text-brand-text-primary leading-relaxed tracking-wide">
                sound hits your nervous system before your thoughts do.
              </p>
              <p className="text-xl sm:text-2xl font-light lowercase text-brand-accent leading-relaxed tracking-wide">
                it breaks the jam fast, so you get your brain back.
              </p>
            </div>
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
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light lowercase leading-tight text-brand-text-secondary tracking-tight">
              every founder hits empty.
            </p>
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light lowercase leading-tight text-brand-text-primary tracking-tight mt-4">
              here&apos;s how you get your <span className="text-brand-accent">brain</span> back.
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
              know a founder who&apos;s cooked? send them a reset.
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
        <DialogContent className="bg-gradient-to-br from-brand-bg to-brand-bg-secondary border border-brand-text-muted/20 max-w-[calc(100%-2rem)] sm:max-w-lg p-8 sm:p-10">
          <DialogHeader className="space-y-6">
            <DialogTitle className="text-3xl sm:text-4xl md:text-5xl font-light lowercase tracking-tight text-brand-text-primary leading-tight">
              access the full system
            </DialogTitle>
            
            <DialogDescription className="space-y-6 text-left">
              <p className="text-base sm:text-lg text-brand-text-secondary lowercase leading-relaxed">
                these soundscapes aren&apos;t music.
              </p>
              <p className="text-base sm:text-lg text-brand-text-primary lowercase leading-relaxed">
                they&apos;re built to pull you out of cognitive overload so you can get back to work.
              </p>
              <p className="text-base sm:text-lg text-brand-text-secondary lowercase leading-relaxed">
                sign up free to unlock more resets and keep using them for life.
              </p>
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-8">
            <SignUpButton 
              mode="modal"
              fallbackRedirectUrl="/soundscapes"
              signInFallbackRedirectUrl="/soundscapes"
            >
              <button className="w-full rounded-lg bg-brand-accent px-8 py-4 text-base font-medium lowercase tracking-wide text-brand-bg transition-all duration-300 hover:shadow-[0_0_30px_rgba(47,128,237,0.4)] hover:scale-[1.01] active:scale-[0.99]">
                sign up free
              </button>
            </SignUpButton>

            <Link href="/learn-more" className="w-full">
              <button
                onClick={() => setShowConversionModal(false)}
                className="w-full text-sm text-brand-text-muted hover:text-brand-accent lowercase tracking-wide transition-colors py-2"
              >
                see how they&apos;re built
              </button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
