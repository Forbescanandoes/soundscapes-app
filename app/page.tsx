"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-brand-bg text-brand-text-primary">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative">

        {/* Subtle glow background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] rounded-full bg-brand-accent/5 blur-[140px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight lowercase leading-[1.05] mb-12">
            <div className="mb-3">while you&apos;re stuck</div>
            <div className="text-brand-accent">someone else is shipping.</div>
          </h1>
          
          <p className="text-base sm:text-lg font-light text-brand-text-secondary lowercase max-w-2xl mx-auto tracking-wide leading-relaxed">
            the fastest reset for founders who can&apos;t afford to stay fried.
          </p>

          <div className="mt-16">
            <Link href="/soundscapes">
              <Button 
                size="lg"
                className="rounded-full bg-brand-accent hover:bg-brand-accent/90 text-brand-bg text-base px-10 py-6 lowercase font-normal glow-accent-lg hover:scale-105 transition-all duration-300 tracking-wide"
              >
                open app
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What This Is Section */}
      <section className="py-24 sm:py-32 px-6 border-t border-brand-text-muted/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-3xl sm:text-4xl md:text-5xl font-light lowercase leading-tight text-brand-text-primary mb-12 tracking-tight">
            forget productivity porn.
          </p>
          
          <p className="text-lg sm:text-xl font-light lowercase text-brand-text-secondary leading-relaxed tracking-wide">
            the real killer isn&apos;t distractions. it&apos;s the days you lose to brain fog and bad calls on fumes.
          </p>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-24 sm:py-32 px-6 bg-brand-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl sm:text-3xl font-light lowercase leading-relaxed text-brand-text-secondary tracking-tight mb-10">
            every launch, every all nighter, every pivot compounds.
          </p>
          
          <p className="text-2xl sm:text-3xl font-light lowercase leading-relaxed text-brand-text-primary tracking-tight">
            stop losing time you can&apos;t get back.
          </p>
        </div>
      </section>

      {/* The Advantage Section */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-3xl sm:text-4xl md:text-5xl font-light lowercase leading-tight text-brand-accent tracking-tight">
            every founder hits empty. the ones who last know how to refill.
          </p>
        </div>
      </section>

      {/* States Section */}
      <section className="py-24 sm:py-32 px-6 bg-brand-bg-secondary">
        <div className="max-w-5xl mx-auto">
          <p className="text-xl sm:text-2xl font-light lowercase mb-16 text-brand-text-primary tracking-wide">
            we made these for when you&apos;re:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16">
            <div>
              <h3 className="text-xl sm:text-2xl font-light lowercase mb-4 text-brand-text-primary tracking-tight">
                burnt out
              </h3>
              <p className="text-base text-brand-text-secondary lowercase leading-relaxed tracking-wide">
                shipping nonstop. brain&apos;s static. can&apos;t think. this clears it.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-light lowercase mb-4 text-brand-text-primary tracking-tight">
                overloaded
              </h3>
              <p className="text-base text-brand-text-secondary lowercase leading-relaxed tracking-wide">
                ten tabs deep. everything&apos;s on fire. wearing every hat. pause here.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-light lowercase mb-4 text-brand-text-primary tracking-tight">
                anxious
              </h3>
              <p className="text-base text-brand-text-secondary lowercase leading-relaxed tracking-wide">
                runway math. pitch anxiety. imposter loop. stop the spiral.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-light lowercase mb-4 text-brand-text-primary tracking-tight">
                adhd as hell
              </h3>
              <p className="text-base text-brand-text-secondary lowercase leading-relaxed tracking-wide">
                ideas avalanching. scrolling not shipping. can&apos;t start. can&apos;t stop. reset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-3xl sm:text-4xl font-light lowercase leading-tight text-brand-text-secondary mb-8 tracking-tight">
            forget wellness.
          </p>
          <p className="text-3xl sm:text-4xl font-light lowercase leading-tight text-brand-accent tracking-tight">
            this is endurance tech.
          </p>
        </div>
      </section>

      {/* Truth Section */}
      <section className="py-24 sm:py-32 px-6 bg-brand-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <p className="text-2xl sm:text-3xl font-light lowercase leading-relaxed text-brand-text-secondary mb-10 tracking-tight">
            most founders don&apos;t quit because it&apos;s hard.
          </p>
          <p className="text-2xl sm:text-3xl font-light lowercase leading-relaxed text-brand-text-primary tracking-tight">
            they run out of gas before the breakthrough.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 sm:py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light lowercase leading-tight text-brand-text-primary mb-16 tracking-tight">
            stop losing days to fog.
          </h2>

          <Link href="/soundscapes">
            <Button 
              size="lg"
              className="rounded-full bg-brand-accent hover:bg-brand-accent/90 text-brand-bg text-base px-12 py-6 lowercase font-normal glow-accent-lg hover:scale-105 transition-all duration-300 tracking-wide"
            >
              start now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 border-t border-brand-text-muted/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-text-muted lowercase">
            we see you when you&apos;re fried
          </p>
          <div className="flex items-center gap-6 text-sm text-brand-text-muted lowercase">
            <Link href="/soundscapes" className="hover:text-brand-accent transition-colors">
              soundscapes
            </Link>
            <span>•</span>
            <a href="#" className="hover:text-brand-accent transition-colors">
              twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
