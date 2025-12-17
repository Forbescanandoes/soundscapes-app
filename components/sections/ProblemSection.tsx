import { Brain, Zap, RefreshCw, Coffee, Clock } from "lucide-react";

const problems = [
  { icon: Zap, text: "sessions where nothing lands" },
  { icon: Brain, text: "days where your brain feels \"off\" for no reason" },
  { icon: Clock, text: "20-minute loops of overthinking before you even start" },
  { icon: Coffee, text: "building that feels heavier than it should" },
  { icon: RefreshCw, text: "constant context switching that kills flow" },
];

export const ProblemSection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Most builders aren't blocked by{" "}
            <span className="text-gradient">skill.</span>
          </h2>
          <p className="text-2xl md:text-3xl text-muted-foreground">
            They're blocked by <span className="text-foreground font-semibold">vibes.</span>
          </p>
        </div>
        
        <div className="mb-12">
          <p className="text-lg text-muted-foreground mb-8 text-center">
            Without the right atmosphere, you get:
          </p>
          
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <problem.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-lg text-foreground/80 group-hover:text-foreground transition-colors">
                  {problem.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-xl text-foreground">
            It's not that you can't build —
          </p>
          <p className="text-xl text-primary font-medium">
            your environment just isn't helping.
          </p>
          <p className="text-lg text-muted-foreground mt-8 font-mono">
            When the vibe is wrong, everything feels harder.
          </p>
        </div>
      </div>
    </section>
  );
};

