import { Sparkles } from "lucide-react";

export const SolutionSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">The Solution</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Meet <span className="text-gradient">DoNothingSounds</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            A simple library of flow-boosting soundscapes designed for builders who just want their work sessions to{" "}
            <span className="text-foreground font-medium">feel good again.</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <div className="px-6 py-3 rounded-xl bg-card border border-border/50">
              <span className="text-muted-foreground">Not</span>{" "}
              <span className="text-foreground font-medium line-through decoration-primary/50">meditation.</span>
            </div>
            <div className="px-6 py-3 rounded-xl bg-card border border-border/50">
              <span className="text-muted-foreground">Not</span>{" "}
              <span className="text-foreground font-medium line-through decoration-primary/50">productivity hacks.</span>
            </div>
          </div>
          
          <p className="mt-8 text-xl text-foreground/90">
            Just clean, crisp, engineered <span className="text-primary font-semibold">vibe audio</span> that makes building smoother.
          </p>
        </div>
      </div>
    </section>
  );
};

