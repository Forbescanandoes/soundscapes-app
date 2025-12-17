import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";

export const FinalCTASection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="container mx-auto px-6 max-w-3xl relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Start Today</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          Build in a <span className="text-gradient">better vibe.</span>
        </h2>
        
        <p className="text-xl text-muted-foreground mb-4 max-w-xl mx-auto">
          Start your next session feeling lighter, clearer, and way more in the zone.
        </p>
        
        <p className="text-lg text-muted-foreground/80 mb-10">
          No pressure. No routines. Just good vibes when you need them.
        </p>
        
        <Button variant="hero" size="xl">
          <Play className="w-5 h-5" />
          Start Listening Free
        </Button>
        
        <p className="mt-6 text-sm text-muted-foreground font-mono">
          No commitment. Cancel anytime.
        </p>
      </div>
    </section>
  );
};

