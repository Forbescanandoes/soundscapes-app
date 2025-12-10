"use client"

import { useState } from "react";
import { 
  Headphones, Target, MessageCircle, Play, Pause, Lock,
  Layers, Brain, Flame, AlertCircle, Zap, Radio, 
  Battery, Cloud, Coffee, Compass, Clock, Eye, Focus, 
  Heart, Lightbulb, Moon, RefreshCw, Shield, Sparkles, 
  Sun, Timer, Star, TrendingUp, Anchor, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser, useClerk } from "@clerk/nextjs";
import { PricingModal } from "@/components/soundscape/pricing-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// 32 Founder States - 8 per category
const founderStates = {
  scattered: [
    { name: "Half Built Everything", description: "When you have 12 projects at 40% and can't finish one", icon: Layers, free: true },
    { name: "Shiny Object Syndrome", description: "Every new idea feels more exciting than your current one", icon: Sparkles },
    { name: "Context Switching Hell", description: "Your brain is jumping between 10 different tasks", icon: RefreshCw },
    { name: "Decision Paralysis", description: "Too many options, can't pick a direction", icon: Compass },
    { name: "Fragmented Focus", description: "Your attention is split across too many things", icon: Focus },
    { name: "Idea Overflow", description: "New ideas keep coming but nothing gets done", icon: Lightbulb },
    { name: "Priority Confusion", description: "Everything feels equally important and urgent", icon: Star },
    { name: "Tab Explosion Mode", description: "30 browser tabs open, zero clarity on what's next", icon: Layers },
  ],
  overloaded: [
    { name: "One Too Many Hats", description: "CEO, dev, marketer, support your brain is fragmenting", icon: Brain, free: true },
    { name: "Information Overload", description: "Too much input, can't process anything new", icon: Cloud },
    { name: "Meeting Recovery", description: "Back-to-back calls have fried your thinking capacity", icon: Clock },
    { name: "Inbox Avalanche", description: "Messages, emails, notifications drowning in input", icon: Radio },
    { name: "Responsibility Crush", description: "Everything depends on you and it's too much", icon: Shield },
    { name: "Learning Overload", description: "Trying to learn too many new things at once", icon: Eye },
    { name: "Customer Chaos", description: "Support tickets, feedback, feature requests overwhelming", icon: MessageCircle },
    { name: "Tech Stack Overwhelm", description: "Too many tools, integrations, and systems to manage", icon: Zap },
  ],
  burnout: [
    { name: "Shipping Too Fast", description: "You've been sprinting for weeks and your mind is fried", icon: Flame, free: true },
    { name: "Empty Tank", description: "No energy left, running on fumes", icon: Battery },
    { name: "Creative Exhaustion", description: "The well is dry, nothing feels fresh anymore", icon: Sun },
    { name: "Weekend? What Weekend?", description: "Haven't taken a real break in months", icon: Moon },
    { name: "Output Obsession Crash", description: "Pushed too hard on metrics, now can't function", icon: TrendingUp },
    { name: "Launch Hangover", description: "Post-launch exhaustion hitting hard", icon: Timer },
    { name: "Hustle Culture Victim", description: "Bought into grind culture, now paying the price", icon: Coffee },
    { name: "Solo Founder Fatigue", description: "Carrying everything alone has worn you down", icon: Anchor },
  ],
  anxious: [
    { name: "The Dread of Marketing", description: "The thought of putting yourself out there feels impossible", icon: AlertCircle, free: true },
    { name: "Comparison Spiral", description: "Everyone else seems to be winning except you", icon: Eye },
    { name: "Imposter Syndrome Attack", description: "Feeling like a fraud who's about to be exposed", icon: Shield },
    { name: "Launch Anxiety", description: "The fear of shipping and being judged", icon: Zap },
    { name: "Revenue Panic", description: "Money fears are hijacking your thinking", icon: TrendingUp },
    { name: "Failure Dread", description: "Constant fear that everything will collapse", icon: Cloud },
    { name: "Public Speaking Terror", description: "Demo day, podcast, or call anxiety is spiking", icon: Radio },
    { name: "Rejection Sensitivity", description: "Every 'no' feels like a personal attack", icon: Heart },
  ],
};

// 10 Founder Scenarios
const founderScenarios = [
  { name: "Stuck at 0 MRR Doubt Loop", trigger: "When comparison + fear are killing your execution", description: "Targeted reset for that specific moment when you're paralyzed by seeing others succeed while you're stuck at zero.", icon: Target, free: true },
  { name: "Can't Start the Day", trigger: "When your brain feels blank and you can't begin work", description: "Precision designed for mornings where opening your laptop feels impossible.", icon: Sun, free: true },
  { name: "Post-Rejection Spiral", trigger: "When a 'no' has sent you into doubt about everything", description: "Reset for the moment when rejection makes you question your entire direction.", icon: Heart },
  { name: "The 3AM Pivot Urge", trigger: "When your brain wants to rebuild everything at 1AM", description: "Stops the late-night impulse to throw away months of work.", icon: Moon },
  { name: "Demo Day Meltdown", trigger: "When you're about to present and can't think straight", description: "Emergency reset for high-stakes moments where anxiety is winning.", icon: Zap },
  { name: "Competitor Panic", trigger: "When you see a competitor and lose all confidence", description: "Clears the spiral that starts with 'they're doing it better'.", icon: Eye },
  { name: "Customer Complaint Crash", trigger: "When negative feedback sends you spiraling", description: "Reset for when one complaint makes you question everything.", icon: MessageCircle },
  { name: "Funding Rejection Recovery", trigger: "When VCs pass and you feel like giving up", description: "Rebuilds conviction after investor rejection.", icon: TrendingUp },
  { name: "Co-founder Tension Fog", trigger: "When relationship stress is blocking your work", description: "Clears the mental static from interpersonal conflict.", icon: Anchor },
  { name: "The 'Nobody Cares' Spiral", trigger: "When zero engagement makes you want to quit", description: "Reset for the silence that makes you doubt if anyone will ever care.", icon: Radio },
];

// 5 Get-Your-Head-Back Sessions
const headBackSessions = [
  { name: "Regain Faith in Your Product", subtitle: "Founder Reset #1", trigger: "When you think your idea is trash", description: "A direct, founder to founder voice session that walks you out of the 'my product sucks' spiral.", duration: "4 min", icon: Heart, free: true },
  { name: "Stop Rethinking Everything", subtitle: "Founder Reset #2", trigger: "When your brain tries to pivot you to death", description: "Interrupts the endless 'maybe I should build something else' loop and gets you back to shipping.", duration: "3 min", icon: RefreshCw, free: true },
  { name: "Overthinking Shutdown", subtitle: "Founder Reset #3", trigger: "When your head is spinning and you can't act", description: "Breaks the analysis paralysis loop and gets you moving again.", duration: "5 min", icon: Brain },
  { name: "Undo the Morning Spiral", subtitle: "Founder Reset #4", trigger: "When you wake up mentally cooked", description: "Clears the fog that hits before you even start working.", duration: "3 min", icon: Sun },
  { name: "Get Back Into Execution Mode", subtitle: "Founder Reset #5", trigger: "When doubt has paralyzed you", description: "Shifts you from overthinking back to doing.", duration: "4 min", icon: Zap },
];

type TabType = "states" | "scenarios" | "sessions";
type CategoryType = "scattered" | "overloaded" | "burnout" | "anxious";

const categoryMeta: Record<CategoryType, { label: string; color: string; borderColor: string; bgColor: string }> = {
  scattered: { label: "Scattered", color: "text-amber-400", borderColor: "border-amber-500/30", bgColor: "bg-amber-500/10" },
  overloaded: { label: "Overloaded", color: "text-purple-400", borderColor: "border-purple-500/30", bgColor: "bg-purple-500/10" },
  burnout: { label: "Burnout", color: "text-red-400", borderColor: "border-red-500/30", bgColor: "bg-red-500/10" },
  anxious: { label: "Anxious", color: "text-blue-400", borderColor: "border-blue-500/30", bgColor: "bg-blue-500/10" },
};

export default function SoundscapesPage() {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [activeTab, setActiveTab] = useState<TabType>("states");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("scattered");
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [showPricingModal, setShowPricingModal] = useState(false);

  // Determine if user is pro
  const isPro = user?.publicMetadata?.subscriptionTier === 'pro' || user?.publicMetadata?.isPro === true;

  const handlePlay = (itemName: string, isLocked: boolean) => {
    if (isLocked) {
      setShowPricingModal(true);
      return;
    }
    setPlayingItem(playingItem === itemName ? null : itemName);
  };

  const handleUpgradeClick = () => {
    setShowPricingModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-xl font-bold">DoNothing<span className="text-primary">Sounds</span></h1>
          </div>
          <div className="flex items-center gap-2">
            {isPro ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <button className="relative group flex items-center gap-2 text-xs lowercase tracking-wide border-2 border-primary/50 bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-1.5 rounded-full text-primary hover:border-primary hover:shadow-[0_0_20px_rgba(47,128,237,0.3)] transition-all duration-300 focus:outline-none">
                    <Sparkles className="w-3 h-3" />
                    premium
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                  align="end" 
                  className="w-48 bg-card border-border text-foreground"
              >
                <DropdownMenuItem 
                  onClick={() => openUserProfile()}
                    className="lowercase cursor-pointer focus:bg-muted focus:text-foreground"
                >
                  account settings
                </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem 
                    onClick={async () => {
                      await signOut()
                      window.location.href = '/'
                    }}
                    className="lowercase cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                  >
                    sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="flex items-center gap-2 text-xs lowercase tracking-wide border border-muted-foreground/30 px-3 py-1 rounded-full text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors focus:outline-none"
                  >
                    freemium
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-48 bg-card border-border text-foreground"
                >
                  <DropdownMenuItem 
                    onClick={handleUpgradeClick}
                    className="lowercase cursor-pointer focus:bg-primary/10 focus:text-primary"
                  >
                    upgrade to premium
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem 
                    onClick={() => openUserProfile()}
                    className="lowercase cursor-pointer focus:bg-muted focus:text-foreground"
                  >
                    account settings
                </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem 
                  onClick={async () => {
                    await signOut()
                    window.location.href = '/'
                  }}
                    className="lowercase cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <nav className="border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: "states" as TabType, label: "Founder States", icon: Headphones, count: 32 },
              { id: "scenarios" as TabType, label: "Founder Scenarios", icon: Target, count: 10 },
              { id: "sessions" as TabType, label: "Get-Your-Head-Back", icon: MessageCircle, count: 5 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all",
                  activeTab === tab.id
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Founder States Tab */}
        {activeTab === "states" && (
          <div>
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {(Object.keys(categoryMeta) as CategoryType[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                    activeCategory === cat
                      ? `${categoryMeta[cat].bgColor} ${categoryMeta[cat].borderColor} ${categoryMeta[cat].color}`
                      : "bg-card border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  {categoryMeta[cat].label}
                  <span className="ml-2 opacity-60">8</span>
                </button>
              ))}
      </div>

            {/* Section Description */}
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold mb-2">
                {categoryMeta[activeCategory].label} States
              </h2>
              <p className="text-muted-foreground">
                Engineered audio environments that shift your brain out of {activeCategory} mode and into functional clarity.
              </p>
            </div>

            {/* States Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {founderStates[activeCategory].map((state) => {
                const isLocked = !isPro && !state.free;
                return (
                  <div
                    key={state.name}
                    onClick={() => isLocked && handlePlay(state.name, isLocked)}
                    className={cn(
                      "group relative p-5 rounded-2xl border transition-all duration-300",
                      isLocked 
                        ? "bg-card/30 border-border/50 opacity-50 cursor-pointer hover:opacity-60 hover:border-primary/30" 
                        : "bg-card/50 border-border hover:border-primary/30 hover:scale-[1.02]",
                      playingItem === state.name && !isLocked && `${categoryMeta[activeCategory].bgColor} ${categoryMeta[activeCategory].borderColor}`
                    )}
                  >
                    {isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-sm rounded-2xl z-10 pointer-events-none">
                        <Lock className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors",
                      playingItem === state.name && !isLocked ? "bg-primary/20" : "bg-secondary"
                    )}>
                      <state.icon className={cn(
                        "w-5 h-5",
                        playingItem === state.name && !isLocked ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <h3 className="font-display font-semibold mb-1">
                      {isLocked ? "••••••" : state.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {isLocked ? "Unlock to access" : state.description}
                    </p>
                    {!isLocked && (
                      <Button
                        variant="heroOutline"
                        size="sm"
                        className="w-full"
                        onClick={() => handlePlay(state.name, isLocked)}
                      >
                        {playingItem === state.name ? (
                          <><Pause className="w-4 h-4" /> Playing...</>
                        ) : (
                          <><Play className="w-4 h-4" /> Play State</>
                        )}
                      </Button>
                    )}
                    {isLocked && (
                      <div className="w-full px-4 py-2 rounded-lg border border-border bg-secondary/50 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" /> Locked
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Founder Scenarios Tab */}
        {activeTab === "scenarios" && (
          <div>
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold mb-2">Founder Scenarios</h2>
              <p className="text-muted-foreground max-w-2xl">
                Precision designed resets for the exact mental breakdown moments solo founders face. Not moods <span className="text-foreground">exact situations.</span>
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {founderScenarios.map((scenario) => {
                const isLocked = !isPro && !scenario.free;
                  return (
                  <div
                    key={scenario.name}
                    onClick={() => isLocked && handlePlay(scenario.name, isLocked)}
                    className={cn(
                      "group relative p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 border transition-all duration-300",
                      isLocked 
                        ? "opacity-50 border-border/50 cursor-pointer hover:opacity-60 hover:border-primary/30" 
                        : playingItem === scenario.name ? "border-primary/50" : "border-border hover:border-primary/30"
                    )}
                  >
                    {isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-sm rounded-2xl z-10 pointer-events-none">
                        <Lock className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <scenario.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                        Scenario
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      {isLocked ? "••••••" : scenario.name}
                    </h3>
                    <p className="text-primary/80 text-sm font-medium mb-2">
                      {isLocked ? "Unlock to access" : scenario.trigger}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {isLocked ? "Premium feature" : scenario.description}
                    </p>
                    {!isLocked && (
                      <Button
                        variant="heroOutline"
                        size="sm"
                        className="w-full"
                        onClick={() => handlePlay(scenario.name, isLocked)}
                      >
                        {playingItem === scenario.name ? (
                          <><Pause className="w-4 h-4" /> Playing...</>
                        ) : (
                          <><Play className="w-4 h-4" /> Try Scenario</>
                        )}
                      </Button>
                    )}
                    {isLocked && (
                      <div className="w-full px-4 py-2 rounded-lg border border-border bg-secondary/50 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" /> Locked
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Get-Your-Head-Back Sessions Tab */}
        {activeTab === "sessions" && (
          <div>
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold mb-2">Get-Your-Head-Back Sessions</h2>
              <p className="text-muted-foreground max-w-2xl">
                Short voice-guided resets that pull you out of spirals. Founder-to-founder. <span className="text-foreground">No guru energy.</span>
              </p>
                        </div>

            <div className="grid gap-6">
              {headBackSessions.map((session) => {
                const isLocked = !isPro && !session.free;
                return (
                  <div
                    key={session.name}
                    onClick={() => isLocked && handlePlay(session.name, isLocked)}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/80 to-secondary/40 border transition-all duration-300",
                      isLocked 
                        ? "opacity-50 border-border/50 cursor-pointer hover:opacity-60 hover:border-primary/30" 
                        : playingItem === session.name ? "border-primary/50" : "border-border hover:border-primary/30"
                    )}
                  >
                    {isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-sm rounded-2xl z-10 pointer-events-none">
                        <Lock className="w-8 h-8 text-primary" />
                      </div>
                    )}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                    <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <session.icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-primary/70 uppercase tracking-wider">
                          {session.subtitle}
                        </span>
                        <h3 className="font-display text-xl font-semibold mt-1 mb-2">
                          {isLocked ? "••••••" : session.name}
                        </h3>
                        <p className="text-primary/80 text-sm font-medium mb-1">
                          {isLocked ? "Unlock to access" : `"${session.trigger}"`}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {isLocked ? "Premium voice session" : session.description}
                        </p>
                        </div>
                      <div className="flex sm:flex-col items-center gap-4">
                        <span className="text-sm text-muted-foreground">{session.duration}</span>
                        {!isLocked && (
                          <Button
                            variant="hero"
                            onClick={() => handlePlay(session.name, isLocked)}
                          >
                            {playingItem === session.name ? (
                              <><Pause className="w-4 h-4" /> Pause</>
                            ) : (
                              <><Play className="w-4 h-4" /> Listen</>
                            )}
                          </Button>
                        )}
                        {isLocked && (
                          <div className="px-4 py-2 rounded-lg border border-border bg-secondary/50 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                            <Lock className="w-4 h-4" /> Locked
                        </div>
                      )}
                      </div>
                    </div>
                  </div>
                );
                })}
              </div>
          </div>
        )}

        {/* Quick Stats Footer */}
        <div className="mt-16 p-6 rounded-2xl bg-secondary/30 border border-border">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <div className="font-display text-3xl font-bold text-primary">32</div>
              <div className="text-sm text-muted-foreground">Founder States</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="font-display text-3xl font-bold text-primary">10</div>
              <div className="text-sm text-muted-foreground">Scenarios</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="font-display text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Voice Sessions</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="hidden sm:block text-sm text-muted-foreground max-w-xs">
              Everything you need to keep your founder brain online.
            </div>
          </div>
        </div>
      </main>

      {/* Pricing Modal */}
      <PricingModal 
        open={showPricingModal} 
        onOpenChange={setShowPricingModal}
      />
    </div>
  );
}
