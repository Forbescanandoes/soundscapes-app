"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SignUpButton, SignedOut, useUser } from '@clerk/nextjs'
import { Play, Pause, Zap, Brain, RefreshCw, Lightbulb, Shield, Rocket, Quote, Library, Waves, Clock, Gauge, Check, Radio, Headphones, MessageCircle, Target, Flame, AlertCircle, Layers } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAudioPlayer } from '@/hooks/use-audio-player'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const storageUrl = 'https://gbyvackgdmzrfawmeuhd.supabase.co/storage/v1/object/public/soundscapes'
const scenariosStorageUrl = 'https://gbyvackgdmzrfawmeuhd.supabase.co/storage/v1/object/public/scenerios'

export default function Home() {
  const { isSignedIn } = useUser()
  const router = useRouter()
  const [activeState, setActiveState] = useState(0)
  const { play, pause, isPlaying, currentTrackId } = useAudioPlayer()
  
  // Redirect logged-in users to soundscapes
  useEffect(() => {
    if (isSignedIn) {
      router.push('/soundscapes')
    }
  }, [isSignedIn, router])

  const painPoints = [
    "can't think straight",
    "pivots every 10 days",
    "burns out your brain faster than you ship product",
    "gets stuck in loops, doubt spikes, and fog"
  ]

  const solutions = [
    {
      icon: Zap,
      title: "Engineered sound that cools your mental load",
      description: "Slows breath, stabilizes rhythm, breaks the spiral"
    },
    {
      icon: Brain,
      title: 'Founder-specific Resets',
      description: 'For moments like "I hate my product," "I can\'t think," and "I\'m about to quit"'
    },
    {
      icon: RefreshCw,
      title: "State switching that restores clarity",
      description: "When panic or doubt hijack your decision-making"
    }
  ]

  const benefits = [
    {
      icon: Lightbulb,
      title: "Think Clearly on Demand",
      description: 'Feel your brain "click back on" within minutes regain access to logic, creativity, and calm decision making.'
    },
    {
      icon: Shield,
      title: "Stop Self-Sabotaging Good Ideas",
      description: "Break the panic-driven urge to pivot, quit, or rebuild everything at 1AM."
    },
    {
      icon: Rocket,
      title: "Get Your Execution Back",
      description: "When your mind is stable, your output becomes predictable. No more days lost to fog, loops, and mental noise."
    }
  ]

  const testimonials = [
    {
      quote: "I used a Reset before a launch and felt my head come back online. Saved my entire day.",
      author: "Indie Hacker"
    },
    {
      quote: "It's the first 'mental tool' that isn't bullshit. It just turns my brain back on.",
      author: "Solo SaaS Founder"
    },
    {
      quote: "Feels like someone pulled the pressure valve in my skull.",
      author: "AI Builder"
    }
  ]

  const features = [
    {
      icon: Library,
      title: "Founder States Library",
      description: "Instant resets for specific mental states",
      states: [
        'twelve tabs open',
        'forgot the point',
        'cant stop',
        'ten tabs deep',
        'waiting on replies'
      ]
    },
    {
      icon: Waves,
      title: "Neuro-Acoustic Relief System",
      description: "Sound designed using physics + nervous system principles. Not calming music. Not meditation. Functional nervous system regulation."
    },
    {
      icon: Clock,
      title: "2 Minute Mental Turnaround",
      description: "Short enough to use mid build, mid meeting, or mid breakdown."
    },
    {
      icon: Gauge,
      title: "Pressure Release Protocols",
      description: "Guided talk downs for when your brain is collapsing into doubt or overload."
    }
  ]

  const useCases = [
    {
      emoji: "🧩",
      title: "Solo Founders",
      description: "Carrying everything in your head? This gives your brain breathing room."
    },
    {
      emoji: "⚡",
      title: "Dream Chasers & Early Builders",
      description: "If you're overwhelmed by possibilities, loops, and pressure this gives you mental stability."
    },
    {
      emoji: "💻",
      title: "AI + SaaS Builders",
      description: "When you're shipping fast, your mind burns even faster. These resets keep your thinking sharp."
    },
    {
      emoji: "🔥",
      title: "Creators & Indies",
      description: "If your brain fries under volume, decisions, or comparison this keeps your execution steady."
    }
  ]

  const pricingFeatures = [
    "Full Founder Reset Library",
    "unlimited Scenarios, States, and get your head back sessions",
    "New drops every month",
    "Early access to experimental soundscapes",
    "Direct access to the founder (24/7 DM)"
  ]

  const faqs = [
    {
      question: "I don't like meditation or wellness bullshit.",
      answer: "Good. This isn't that. No spirituality. No breathwork. No woo. Pure nervous system physics."
    },
    {
      question: "Will this work if I have ADHD or can't focus?",
      answer: "Yes it's designed specifically for overloaded brains with low cognitive bandwidth."
    },
    {
      question: "How long before I feel something?",
      answer: "Most founders feel a shift in 30 to 90 seconds. The rest within 2 to 3 minutes."
    },
    {
      question: "Do I need headphones?",
      answer: "Recommended. The effects are stronger in stereo."
    },
    {
      question: "I've tried everything. Why is this different?",
      answer: "Because it doesn't rely on discipline or calm. It fixes the state your brain is in so clarity naturally returns."
    }
  ]

  const founderStates = [
    {
      category: "Scattered",
      name: "Half Built Everything",
      description: "When you have 12 projects at 40% and can't finish one",
      icon: Layers,
      color: "from-amber-500/20 to-amber-600/10",
      borderColor: "border-amber-500/30",
      id: "half-built-everything",
      file: "Half-Built Everything.mp3",
    },
    {
      category: "Overloaded",
      name: "One Too Many Hats",
      description: "CEO, dev, marketer, support your brain is fragmenting",
      icon: Brain,
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-500/30",
      id: "one-too-many-hats",
      file: "One Too Many Hats.wav",
    },
    {
      category: "Burnout",
      name: "Shipping Too Fast",
      description: "You've been sprinting for weeks and your mind is fried",
      icon: Flame,
      color: "from-red-500/20 to-red-600/10",
      borderColor: "border-red-500/30",
      id: "shipping-too-fast",
      file: "Shipping Too Fast.mp3",
    },
    {
      category: "Anxious",
      name: "The Dread of Marketing",
      description: "The thought of putting yourself out there feels impossible",
      icon: AlertCircle,
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/30",
      id: "dread-of-marketing",
      file: "the dread of marketing.wav",
    },
  ]

  const handlePreviewState = (state: typeof founderStates[0]) => {
    const audioUrl = `${storageUrl}/${encodeURIComponent(state.file)}`
    if (isPlaying && currentTrackId === state.id) {
      pause()
    } else {
      play(state.id, audioUrl)
    }
  }

  const handlePreviewScenario = (scenario: typeof founderScenarios[0]) => {
    const audioUrl = `${scenariosStorageUrl}/${encodeURIComponent(scenario.file)}`
    console.log('Playing scenario:', scenario.name)
    console.log('Audio URL:', audioUrl)
    if (isPlaying && currentTrackId === scenario.id) {
      pause()
    } else {
      play(scenario.id, audioUrl)
    }
  }

  const founderScenarios = [
    {
      id: "scenario-1",
      name: "The 'I Don't Know What to Build' Loop",
      trigger: "When comparison + fear are killing your execution",
      description: "Too many ideas, none feel 'right,' terrified of choosing wrong. They don't need clarity — they need state stability so they can CHOOSE.",
      internalVoice: "What if I waste months on the wrong thing?",
      icon: Target,
      file: "idk what to build COACH.mp3",
    },
    {
      id: "scenario-2",
      name: "The 'Is My Idea Even Good?' Spiral",
      trigger: "When your brain feels blank and you can't begin work",
      description: "They like their idea… until they don't… then they do again 6 hours later. They confuse mood with market signal.",
      internalVoice: "I can't tell if this is genius or trash.",
      icon: Zap,
      file: "Is My Idea Even Good? COACH.mp3",
    },
  ]

  const talkDowns = [
    {
      name: "Regain Faith in Your Product",
      subtitle: "Founder Reset #1",
      trigger: "When you think your idea is trash",
      description: "A direct, founder to founder voice session that walks you out of the 'my product sucks' spiral.",
      icon: MessageCircle,
    },
    {
      name: "Stop Rethinking Everything",
      subtitle: "Founder Reset #2",
      trigger: "When your brain tries to pivot you to death",
      description: "Interrupts the endless 'maybe I should build something else' loop and gets you back to shipping.",
      icon: Radio,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl glass border border-border/50">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-lg">DoNothing<span className="text-primary">Sounds</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </a>
          </div>

              <SignedOut>
                <SignUpButton 
                  mode="modal"
                  fallbackRedirectUrl="/soundscapes"
                  signInFallbackRedirectUrl="/soundscapes"
                >
              <Button variant="hero" size="sm">
                Start Free
                  </Button>
                </SignUpButton>
              </SignedOut>
      </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-32 pb-20">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border mb-8 animate-fade-up">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">The mental OS for solo founders</span>
              </div>

          {/* Main headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Your mind is not the problem.{" "}
            <span className="text-gradient">Your state is.</span>
            </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Reset it in minutes.
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            DoNothingSounds clears mental fog, breaks overthinking loops, and stabilizes the founder brain without meditation, wellness clichés, or long routines.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <SignUpButton 
              mode="modal"
              fallbackRedirectUrl="/soundscapes"
              signInFallbackRedirectUrl="/soundscapes"
            >
              <Button variant="hero" size="xl">
                Start Free
              </Button>
            </SignUpButton>
            <button
              onClick={() => {
                const demoSection = document.getElementById('demo-section')
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="w-full sm:w-auto rounded-xl border-2 border-primary/40 bg-transparent text-foreground hover:border-primary hover:bg-primary/10 font-semibold px-10 py-4 text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Hear a Reset
            </button>
          </div>

          {/* Trust line */}
          <p className="mt-12 text-sm text-muted-foreground/60 animate-fade-up" style={{ animationDelay: '0.5s' }}>
            Build from a clear, steady mind again.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Problem statement */}
          <div className="max-w-3xl mb-20">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8">
              If you're a founder who:
            </h2>
            <ul className="space-y-3 mb-8">
              {painPoints.map((point, index) => (
                <li 
                  key={index}
                  className="flex items-start gap-3 text-lg text-muted-foreground"
                >
                  <span className="text-primary mt-1">×</span>
                  {point}
                </li>
              ))}
            </ul>
            <p className="text-xl text-foreground font-medium">
              …your problem isn't motivation it's <span className="text-gradient">nervous system overload</span>.
            </p>
              </div>

          {/* Solution cards */}
          <div className="mb-12">
            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-10">
              Here's how DoNothingSounds fixes that instantly:
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {solutions.map((solution, index) => (
                <div 
                  key={index}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:glow-primary"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <solution.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-display text-lg font-semibold mb-2">
                    {solution.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Differentiator */}
          <div className="text-center py-12 border-t border-border">
            <p className="text-xl text-muted-foreground">
              This isn't meditation.
            </p>
            <p className="font-display text-2xl font-bold text-gradient mt-2">
              This is mental performance engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              What You Get
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Outcome oriented mental resets designed for founders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-8 rounded-3xl bg-card border border-border h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">
                    {benefit.title}
                    </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Proof It Works
            </h2>
            <p className="text-muted-foreground">
              Real founders, real results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <blockquote className="text-foreground text-lg mb-6 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <cite className="text-sm text-muted-foreground not-italic">
                  {testimonial.author}
                </cite>
              </div>
                  ))}
                </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Built for the Founder Brain
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every feature engineered for cognitive overload
            </p>
                  </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">
                      {feature.title}
                      </h3>
                    <p className="text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    {feature.states && (
                      <ul className="space-y-2">
                        {feature.states.map((state, idx) => (
                          <li 
                            key={idx}
                            className="text-sm text-muted-foreground/80 pl-4 border-l-2 border-primary/30"
                          >
                            {state}
                          </li>
                        ))}
                      </ul>
                    )}
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Built For
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div 
                    key={index}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:glow-soft"
              >
                <div className="text-4xl mb-6">{useCase.emoji}</div>
                <h3 className="font-display text-2xl font-semibold mb-4">
                  {useCase.title}
                      </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                      </p>
                    </div>
                ))}
              </div>
        </div>
      </section>

      {/* Demo Section - See What's Inside */}
      <section id="demo-section" className="py-24 px-4 bg-gradient-to-b from-background via-secondary/20 to-background">
            <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              The System
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              See What&apos;s Inside
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three components. One system. Your brain back online.
            </p>
                    </div>
                    
          {/* Component 1: Founder States */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Headphones className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold">Founder States</h3>
            </div>
            <p className="text-muted-foreground mb-8 max-w-xl">
              Engineered audio environments that shift your brain into a functional, clear execution mode. Not relaxation. <span className="text-foreground font-medium">Function.</span>
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {founderStates.map((state, index) => {
                const StateIcon = state.icon
                return (
                  <div
                    key={state.name}
                    onClick={() => setActiveState(index)}
                    className={`group relative p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      activeState === index
                        ? `bg-gradient-to-br ${state.color} ${state.borderColor} scale-[1.02]`
                        : "bg-card/50 border-border hover:border-primary/20"
                    }`}
                  >
                    <span className={`text-xs font-medium uppercase tracking-wider ${
                      activeState === index ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {state.category}
                    </span>
                    <h4 className="font-display font-semibold mt-2 mb-1">{state.name}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {state.description}
                    </p>
                    <div className={`absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      activeState === index 
                        ? "bg-primary/20" 
                        : "bg-secondary group-hover:bg-primary/10"
                    }`}>
                      <StateIcon className={`w-4 h-4 ${activeState === index ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                    {activeState === index && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <Button 
                          size="sm" 
                          variant="heroOutline" 
                          className="w-full text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePreviewState(state)
                          }}
                        >
                          {isPlaying && currentTrackId === state.id ? (
                            <>
                              <Pause className="w-3 h-3" />
                              Playing...
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3" />
                              Preview State
                            </>
                          )}
                        </Button>
                </div>
                    )}
          </div>
                )
              })}
        </div>
            <p className="text-xs text-muted-foreground/60 mt-4 text-center">
              States for the day shift your baseline mental mode
            </p>
        </div>

          {/* Component 2: Founder Scenarios */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
        </div>
              <h3 className="font-display text-2xl font-bold">Founder Scenarios</h3>
            </div>
            <p className="text-muted-foreground mb-8 max-w-xl">
              Precision designed resets for the exact mental breakdown moments solo founders face. Not moods. <span className="text-foreground font-medium">Exact situations.</span>
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {founderScenarios.map((scenario) => {
                const ScenarioIcon = scenario.icon
                return (
                  <div
                    key={scenario.name}
                    className="group relative p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <ScenarioIcon className="w-6 h-6 text-primary" />
                    </div>
                        <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                          Scenario
                        </span>
                      </div>
                      <h4 className="font-display text-xl font-semibold mb-2">{scenario.name}</h4>
                      <p className="text-primary text-sm font-medium mb-3">{scenario.trigger}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {scenario.description}
                      </p>
                      {scenario.internalVoice && (
                        <div className="mb-4 p-3 rounded-lg bg-muted/30 border-l-2 border-primary/50">
                          <p className="text-foreground/80 text-sm italic">
                            &quot;{scenario.internalVoice}&quot;
                          </p>
                        </div>
                      )}
                      <Button 
                        variant="heroOutline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => handlePreviewScenario(scenario)}
                      >
                        {isPlaying && currentTrackId === scenario.id ? (
                          <>
                            <Pause className="w-4 h-4" />
                            Playing...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Try This Scenario
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-muted-foreground/60 mt-4 text-center">
              Scenarios for the moment targeted fixes for specific breakdowns
                    </p>
        </div>

          {/* Component 3: Talk-Downs / Get-Your-Head-Back Sessions */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary" />
        </div>
              <h3 className="font-display text-2xl font-bold">Get Your Head Back Sessions</h3>
        </div>
            <p className="text-muted-foreground mb-8 max-w-xl">
              Short voice-guided resets that pull you out of spirals and get your head working again. Founder to founder. <span className="text-foreground font-medium">No guru energy.</span>
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {talkDowns.map((session) => {
                const SessionIcon = session.icon
                return (
                  <div
                    key={session.name}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/80 to-secondary/40 border border-border hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                    <div className="relative p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-xs font-medium text-primary/70 uppercase tracking-wider">
                            {session.subtitle}
                          </span>
                          <h4 className="font-display text-xl font-semibold mt-1">{session.name}</h4>
                </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <SessionIcon className="w-5 h-5 text-primary" />
          </div>
        </div>
                      <p className="text-primary/80 text-sm font-medium mb-2">&quot;{session.trigger}&quot;</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {session.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <Button variant="hero" size="sm" className="flex-1">
                          <Play className="w-4 h-4" />
                          Listen Now
                        </Button>
                        <span className="text-xs text-muted-foreground">~3 min</span>
        </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-muted-foreground/60 mt-4 text-center">
              Sessions for the spiral — voice-guided clarity injections
                </p>
              </div>

          {/* System Summary */}
          <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/50 to-primary/5 border border-primary/10 text-center">
            <h4 className="font-display text-xl font-semibold mb-3">The Complete System</h4>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="px-4 py-2 rounded-full bg-card border border-border">
                <strong className="text-foreground">States</strong> <span className="text-muted-foreground">for the day</span>
              </span>
              <span className="text-muted-foreground">+</span>
              <span className="px-4 py-2 rounded-full bg-card border border-border">
                <strong className="text-foreground">Scenarios</strong> <span className="text-muted-foreground">for the moment</span>
              </span>
              <span className="text-muted-foreground">+</span>
              <span className="px-4 py-2 rounded-full bg-card border border-border">
                <strong className="text-foreground">Sessions</strong> <span className="text-muted-foreground">for the spiral</span>
              </span>
            </div>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
              Three tools. Every mental situation covered. Your brain stays online.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Simple Pricing
            </h2>
          <p className="text-muted-foreground mb-12">
            Costs less than losing one hour to mental fog
          </p>

          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl" />
            
            <div className="relative p-8 rounded-3xl bg-card border-2 border-primary/30 glow-primary">
              <div className="mb-6">
                <span className="font-display text-5xl font-bold">$15</span>
                <span className="text-muted-foreground">/ month</span>
                  </div>

              <p className="text-foreground font-medium mb-8">
                Reset your mind anytime
              </p>

              <ul className="space-y-4 text-left mb-8">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                      </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <SignUpButton 
                mode="modal"
                fallbackRedirectUrl="/soundscapes"
                signInFallbackRedirectUrl="/soundscapes"
              >
                <Button variant="hero" size="xl" className="w-full">
                  Start Free
                </Button>
              </SignUpButton>

              <p className="text-sm text-muted-foreground mt-4">
                No commitment. Cancel anytime.
              </p>
                      </div>
                    </div>
                  </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-secondary/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Real Questions, Real Answers
            </h2>
                </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left font-display font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Stop letting mental overload{" "}
            <span className="text-gradient">sabotage your progress.</span>
            </h2>

          <p className="text-xl text-muted-foreground mb-10">
            Get your mind back in minutes.
          </p>

          <SignUpButton 
            mode="modal"
            fallbackRedirectUrl="/soundscapes"
            signInFallbackRedirectUrl="/soundscapes"
          >
            <Button variant="hero" size="xl">
              Start Free
            </Button>
          </SignUpButton>

          <p className="mt-6 text-muted-foreground">
            Begin building from a clear, steady mind again.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Waves className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-semibold">DoNothing<span className="text-primary">Sounds</span></span>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/learn-more" className="hover:text-foreground transition-colors">
                How it works
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <a 
                href="https://x.com/loganforbes2442" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2025 DoNothingSounds. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
