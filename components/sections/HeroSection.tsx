import { Button } from "@/components/ui/button";
import { Play, Headphones } from "lucide-react";

const AudioWaveform = () => (
  <div className="flex items-end gap-1 h-16">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="w-1 bg-gradient-to-t from-primary to-secondary rounded-full animate-wave"
        style={{
          height: `${Math.random() * 60 + 20}%`,
          animationDelay: `${i * 0.1}s`,
        }}
      />
    ))}
  </div>
);

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <div className="mb-8 flex justify-center">
          <AudioWaveform />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-up">
          Build with{" "}
          <span className="text-gradient">better vibes.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          The soundtrack that makes creating feel lighter, smoother, and way more fun.
        </p>
        
        <p className="text-lg text-muted-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          DoNothingSounds gives builders flow-ready soundscapes that make coding, designing, and shipping feel good — no wellness, no pressure, just a vibe that pulls you into the zone.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Button variant="hero" size="xl">
            <Play className="w-5 h-5" />
            Start Listening Free
          </Button>
          <Button variant="heroOutline" size="xl">
            <Headphones className="w-5 h-5" />
            Hear a Soundscape
          </Button>
        </div>
        
        <p className="mt-12 text-sm font-mono text-muted-foreground animate-fade-up" style={{ animationDelay: "0.4s" }}>
          Good vibes for people making cool sh*t.
        </p>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

