"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Waves, Target, MessageCircle, ArrowLeft, Volume2, Zap, Brain } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Waves className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-semibold">DoNothingSounds</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              How DoNothingSounds Works
          </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              DoNothingSounds helps you get out of your own head when it matters most — not by motivating you, but by <span className="text-foreground font-medium">stabilizing your mental state</span> so you can think and act again.
            </p>
            <p className="text-lg text-muted-foreground mt-4">
              It works through three simple tools you use in real moments.
            </p>
          </div>

          {/* Tool 1: Soundscapes */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Volume2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <span className="text-sm text-muted-foreground font-medium">01</span>
                <h2 className="text-2xl font-display font-bold">Soundscapes — Lower the pressure first</h2>
        </div>
      </div>

            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                When your brain is overloaded, reasoning doesn&apos;t work.<br />
                You can&apos;t &quot;think your way out&quot; while your nervous system is spiking.
              </p>
              
              <p>Soundscapes are engineered background audio designed to:</p>
              
              <ul className="space-y-2 pl-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  reduce mental noise
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  slow down internal pressure
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  create enough calm to re-engage your thinking
                </li>
              </ul>
              
              <p className="text-foreground/80">
                You don&apos;t focus on them.<br />
                You don&apos;t meditate.<br />
                You just let them run while you work or sit.
            </p>
              
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-foreground font-medium">
                  This is the foundation.<br />
                  No clarity happens without lowering the pressure first.
            </p>
          </div>
            </div>
          </section>

          {/* Tool 2: Scenarios */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="text-sm text-muted-foreground font-medium">02</span>
                <h2 className="text-2xl font-display font-bold">Scenarios — Match the moment you&apos;re in</h2>
              </div>
          </div>
          
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                Founders don&apos;t fail in abstract ways.<br />
                They fail in <span className="text-foreground">specific moments</span>.
              </p>
              
              <p>Examples:</p>
              
              <ul className="space-y-2 pl-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  staring at your editor and doing nothing
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  rethinking your entire idea for the 10th time
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  panic-pivoting after reading one tweet
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  feeling stuck but not knowing why
                </li>
              </ul>
              
              <p className="text-foreground/80">
                Scenario tracks are built for these exact moments.
              </p>
              
              <p>
                You don&apos;t ask &quot;what do I need?&quot;<br />
                You pick the situation you&apos;re in and hit play.
              </p>
              
              <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/10">
                <p className="text-foreground font-medium">
                  The goal isn&apos;t motivation.<br />
                  It&apos;s to stop the spiral and get you back to neutral.
                </p>
              </div>
            </div>
          </section>

          {/* Tool 3: Talk-Downs */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-sm text-muted-foreground font-medium">03</span>
                <h2 className="text-2xl font-display font-bold">Talk-Downs — Get your head back</h2>
                      </div>
                    </div>
                    
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                Sometimes sound alone isn&apos;t enough.
              </p>
              
              <p>Talk-downs are short, direct audio sessions that help you:</p>
              
              <ul className="space-y-2 pl-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  break doubt loops
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  separate emotion from reality
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  regain conviction long enough to act
                </li>
              </ul>
              
              <p className="text-foreground/80">
                They don&apos;t hype you up.<br />
                They don&apos;t tell you everything will be okay.
              </p>
              
              <p>
                They walk you through what&apos;s actually happening in your head and guide you back to a usable mental state.
              </p>
              
              <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                <p className="text-foreground font-medium">
                  Think of it as:<br />
                  &quot;Get your head back. Now decide.&quot;
                    </p>
                  </div>
                </div>
          </section>

          {/* When to use it */}
          <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold">When to use it</h2>
          </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p>Use DoNothingSounds when:</p>
          
              <ul className="space-y-2 pl-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  you&apos;re stuck but can&apos;t explain why
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  you feel pressure building and start avoiding work
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  you&apos;re about to scrap something you haven&apos;t actually tested
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  your mind is louder than the task in front of you
                </li>
              </ul>
              
              <p className="text-foreground/80 font-medium">
                This isn&apos;t something you schedule.<br />
                You use it when the moment hits.
              </p>
            </div>
          </section>

          {/* What this isn't */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-bold mb-6">What this isn&apos;t</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
                <span className="text-muted-foreground line-through">Not therapy</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
                <span className="text-muted-foreground line-through">Not motivation</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border text-center">
                <span className="text-muted-foreground line-through">Not productivity hacks</span>
              </div>
                    </div>
                    
            <p className="text-lg text-foreground font-medium">
              This is about <span className="text-primary">state control</span>, not advice.
            </p>
          </section>

          {/* The outcome */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold">The outcome</h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                You don&apos;t magically become smarter.<br />
                You just stop sabotaging yourself long enough to:
              </p>
              
              <ul className="space-y-2 pl-4">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  finish what you start
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  test ideas instead of abandoning them
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  make decisions from clarity instead of fear
                </li>
              </ul>
              
              <p className="text-foreground font-medium text-lg mt-6">
                That&apos;s it.
                    </p>
                  </div>
          </section>

          {/* Founder Note */}
          <section className="mb-16 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img 
                src="/founder.jpg" 
                alt="Founder of DoNothingSounds" 
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-primary/20"
              />
              <div className="text-center md:text-left">
                <p className="text-lg md:text-xl text-foreground font-medium mb-2">
                  &quot;I built this from my own pain.&quot;
                </p>
                <p className="text-muted-foreground">
                  Every scenario, every soundscape, every talk-down — they exist because I needed them first. This isn&apos;t theory. It&apos;s what actually worked when my brain wouldn&apos;t stop breaking.
                </p>
                <p className="text-sm text-muted-foreground mt-3">
                  — Founder, DoNothingSounds
                </p>
                </div>
          </div>
          </section>

        {/* CTA */}
          <div className="text-center pt-8 border-t border-border">
            <h3 className="text-2xl font-display font-bold mb-4">Ready to try it?</h3>
          <Link href="/soundscapes">
              <Button variant="hero" size="lg">
                Start Free
            </Button>
          </Link>
          </div>
      </div>
      </main>
    </div>
  );
};

export default HowItWorks;
