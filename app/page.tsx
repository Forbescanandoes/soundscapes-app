"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-brand-bg text-brand-text-primary overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Auth buttons - top right */}
        <div className="absolute top-6 sm:top-8 right-6 sm:right-8 flex items-center gap-3 z-50">
          <SignedOut>
            <SignInButton 
              mode="modal"
              fallbackRedirectUrl="/soundscapes"
              signUpFallbackRedirectUrl="/soundscapes"
            >
              <Button variant="ghost" className="rounded-full lowercase text-sm text-brand-text-secondary hover:text-brand-text-primary transition-all backdrop-blur-sm border border-brand-text-muted/10 hover:border-brand-text-muted/30">
                sign in
              </Button>
            </SignInButton>
            <SignUpButton 
              mode="modal"
              fallbackRedirectUrl="/soundscapes"
              signInFallbackRedirectUrl="/soundscapes"
            >
              <Button className="rounded-full bg-brand-accent hover:bg-brand-accent/90 text-brand-bg lowercase text-sm font-medium transition-all glow-accent hover:scale-105 hover:glow-accent-lg">
                sign up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-brand-accent/20 hover:ring-brand-accent/40 transition-all"
                }
              }}
            />
          </SignedIn>
        </div>

        {/* Animated gradient background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Main glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-brand-accent/10 blur-[200px] animate-pulse-slow"
            style={{
              transform: `translate(-50%, -50%) translateY(${scrollY * 0.3}px)`
            }}
          />
          {/* Secondary glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[180px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-brand-accent/5 blur-[180px]" />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-accent/20 bg-brand-accent/5 backdrop-blur-sm mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-xs lowercase tracking-wider text-brand-text-secondary">endurance tech for builders</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight lowercase leading-[1.05] mb-8 animate-fade-in-up">
            <div className="mb-4 bg-gradient-to-b from-brand-text-primary to-brand-text-secondary bg-clip-text text-transparent">
              while you&apos;re stuck
            </div>
            <div className="text-brand-accent glow-text">
              someone else is shipping.
            </div>
          </h1>
          
          <p className="text-lg sm:text-xl font-light text-brand-text-secondary lowercase max-w-2xl mx-auto tracking-wide leading-relaxed mb-16 animate-fade-in-up animation-delay-200">
            the fastest reset for founders who can&apos;t afford to stay fried.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
            <Link href="/soundscapes">
              <Button 
                size="lg"
                className="rounded-full bg-brand-accent hover:bg-brand-accent text-brand-bg text-base px-12 py-7 lowercase font-normal glow-accent-lg hover:scale-105 transition-all duration-500 tracking-wide group relative overflow-hidden"
              >
                <span className="relative z-10">open app</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </Button>
            </Link>
            <Button 
              variant="ghost"
              size="lg"
              className="rounded-full border border-brand-text-muted/20 hover:border-brand-accent/50 text-brand-text-secondary hover:text-brand-accent text-base px-12 py-7 lowercase font-normal backdrop-blur-sm transition-all duration-300"
            >
              see how it works
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow opacity-30">
          <div className="w-6 h-10 rounded-full border-2 border-brand-text-muted/30 p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-text-muted/50 mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* What This Is Section */}
      <section className="py-32 sm:py-40 px-6 relative">
        {/* Gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <p className="text-4xl sm:text-5xl md:text-6xl font-light lowercase leading-[1.1] text-brand-text-primary tracking-tight">
                forget productivity porn.
              </p>
              
              <p className="text-xl sm:text-2xl font-light lowercase text-brand-text-secondary leading-relaxed tracking-wide">
                the real killer isn&apos;t distractions. it&apos;s the days you lose to brain fog and bad calls on fumes.
              </p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-brand-bg-secondary border border-brand-text-muted/10 backdrop-blur-sm hover:border-brand-accent/30 transition-all duration-500 group">
                <div className="text-4xl font-light text-brand-accent mb-2 group-hover:scale-110 transition-transform">5min</div>
                <div className="text-sm lowercase text-brand-text-muted">average reset time</div>
              </div>
              <div className="p-6 rounded-2xl bg-brand-bg-secondary border border-brand-text-muted/10 backdrop-blur-sm hover:border-brand-accent/30 transition-all duration-500 group">
                <div className="text-4xl font-light text-brand-accent mb-2 group-hover:scale-110 transition-transform">4x</div>
                <div className="text-sm lowercase text-brand-text-muted">focus improvement</div>
              </div>
              <div className="p-6 rounded-2xl bg-brand-bg-secondary border border-brand-text-muted/10 backdrop-blur-sm hover:border-brand-accent/30 transition-all duration-500 group col-span-2">
                <div className="text-4xl font-light text-brand-accent mb-2 group-hover:scale-110 transition-transform">24/7</div>
                <div className="text-sm lowercase text-brand-text-muted">reset when you need it</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-32 sm:py-40 px-6 relative">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-bg-secondary to-brand-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(47,128,237,0.1),transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="space-y-12 text-center">
            <p className="text-3xl sm:text-4xl font-light lowercase leading-relaxed text-brand-text-secondary tracking-tight">
              every launch, every all nighter, every pivot compounds.
            </p>
            
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent mx-auto" />
            
            <p className="text-3xl sm:text-4xl font-light lowercase leading-relaxed text-brand-text-primary tracking-tight">
              stop losing time you can&apos;t get back.
            </p>
          </div>
        </div>
      </section>

      {/* The Advantage Section */}
      <section className="py-32 sm:py-40 px-6 relative">
        {/* Spotlight effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(47,128,237,0.15),transparent_70%)]" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block p-12 sm:p-16 rounded-3xl bg-brand-bg-secondary/50 border border-brand-accent/20 backdrop-blur-xl relative overflow-hidden group hover:border-brand-accent/40 transition-all duration-700">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            
            <p className="text-4xl sm:text-5xl md:text-6xl font-light lowercase leading-tight text-brand-accent tracking-tight relative z-10">
              every founder hits empty. the ones who last know how to refill.
            </p>
          </div>
        </div>
      </section>

      {/* States Section */}
      <section className="py-32 sm:py-40 px-6 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-bg-secondary to-brand-bg" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <p className="text-2xl sm:text-3xl font-light lowercase text-brand-text-primary tracking-wide mb-4">
              we made these for when you&apos;re:
            </p>
            <div className="w-16 h-1 bg-brand-accent/50 mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Burnt out */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-brand-bg-secondary to-brand-bg border border-brand-text-muted/10 hover:border-brand-accent/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-brand-accent/10">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 group-hover:scale-110 transition-all duration-500">
                  <div className="w-2 h-2 rounded-full bg-brand-accent" />
                </div>
                <h3 className="text-2xl font-light lowercase mb-4 text-brand-text-primary tracking-tight group-hover:text-brand-accent transition-colors">
                  burnt out
                </h3>
                <p className="text-sm text-brand-text-secondary lowercase leading-relaxed">
                  shipping nonstop. brain&apos;s static. can&apos;t think. this clears it.
                </p>
              </div>
            </div>

            {/* Overloaded */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-brand-bg-secondary to-brand-bg border border-brand-text-muted/10 hover:border-brand-accent/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-brand-accent/10">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 group-hover:scale-110 transition-all duration-500">
                  <div className="w-2 h-2 rounded-full bg-brand-accent" />
                </div>
                <h3 className="text-2xl font-light lowercase mb-4 text-brand-text-primary tracking-tight group-hover:text-brand-accent transition-colors">
                  overloaded
                </h3>
                <p className="text-sm text-brand-text-secondary lowercase leading-relaxed">
                  ten tabs deep. everything&apos;s on fire. wearing every hat. pause here.
                </p>
              </div>
            </div>

            {/* Anxious */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-brand-bg-secondary to-brand-bg border border-brand-text-muted/10 hover:border-brand-accent/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-brand-accent/10">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 group-hover:scale-110 transition-all duration-500">
                  <div className="w-2 h-2 rounded-full bg-brand-accent" />
                </div>
                <h3 className="text-2xl font-light lowercase mb-4 text-brand-text-primary tracking-tight group-hover:text-brand-accent transition-colors">
                  anxious
                </h3>
                <p className="text-sm text-brand-text-secondary lowercase leading-relaxed">
                  runway math. pitch anxiety. imposter loop. stop the spiral.
                </p>
              </div>
            </div>

            {/* ADHD */}
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-brand-bg-secondary to-brand-bg border border-brand-text-muted/10 hover:border-brand-accent/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-brand-accent/10">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 group-hover:scale-110 transition-all duration-500">
                  <div className="w-2 h-2 rounded-full bg-brand-accent" />
                </div>
                <h3 className="text-2xl font-light lowercase mb-4 text-brand-text-primary tracking-tight group-hover:text-brand-accent transition-colors">
                  adhd as hell
                </h3>
                <p className="text-sm text-brand-text-secondary lowercase leading-relaxed">
                  ideas avalanching. scrolling not shipping. can&apos;t start. can&apos;t stop. reset.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 sm:py-40 px-6 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-accent/10 blur-[120px] animate-pulse-slow" />
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] animate-pulse-slow animation-delay-1000" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <p className="text-4xl sm:text-5xl md:text-6xl font-light lowercase leading-tight text-brand-text-secondary tracking-tight opacity-60">
              forget wellness.
            </p>
            <p className="text-5xl sm:text-6xl md:text-7xl font-light lowercase leading-tight text-brand-accent tracking-tight glow-text">
              this is endurance tech.
            </p>
          </div>
        </div>
      </section>

      {/* Truth Section */}
      <section className="py-32 sm:py-40 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-bg-secondary/50 to-brand-bg" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="p-12 sm:p-16 rounded-3xl bg-brand-bg-secondary/80 border border-brand-text-muted/20 backdrop-blur-xl relative overflow-hidden group">
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 space-y-8">
              <p className="text-3xl sm:text-4xl font-light lowercase leading-relaxed text-brand-text-secondary tracking-tight">
                most founders don&apos;t quit because it&apos;s hard.
              </p>
              
              <div className="w-20 h-px bg-gradient-to-r from-brand-accent to-transparent" />
              
              <p className="text-3xl sm:text-4xl font-light lowercase leading-relaxed text-brand-text-primary tracking-tight">
                they run out of gas before the breakthrough.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 sm:py-52 px-6 relative overflow-hidden">
        {/* Epic background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(47,128,237,0.2),transparent_70%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light lowercase leading-tight text-brand-text-primary mb-8 tracking-tight">
            stop losing days to fog.
          </h2>
          
          <p className="text-xl sm:text-2xl font-light lowercase text-brand-text-secondary mb-16 tracking-wide">
            your breakthrough is waiting. don&apos;t let brain fog steal it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/soundscapes">
              <Button 
                size="lg"
                className="rounded-full bg-brand-accent hover:bg-brand-accent text-brand-bg text-lg px-16 py-8 lowercase font-normal glow-accent-lg hover:scale-110 transition-all duration-500 tracking-wide group relative overflow-hidden"
              >
                <span className="relative z-10">start now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-20 flex flex-wrap items-center justify-center gap-8 text-sm lowercase text-brand-text-muted">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent/50" />
              <span>instant access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent/50" />
              <span>no credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-accent/50" />
              <span>works everywhere</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-text-muted/20 to-transparent" />
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-brand-accent/50" />
              </div>
              <span className="text-lg lowercase font-light text-brand-text-primary tracking-wide">soundscapes</span>
            </div>
            
            {/* Links */}
            <div className="flex items-center gap-8 text-sm text-brand-text-muted lowercase">
              <Link href="/soundscapes" className="hover:text-brand-accent transition-colors duration-300">
                app
              </Link>
              <a href="#" className="hover:text-brand-accent transition-colors duration-300">
                twitter
              </a>
              <a href="#" className="hover:text-brand-accent transition-colors duration-300">
                contact
              </a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-brand-text-muted/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-brand-text-muted lowercase">
              we see you when you&apos;re fried
            </p>
            <p className="text-xs text-brand-text-muted/60 lowercase">
              © 2025 endurance tech for builders
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
