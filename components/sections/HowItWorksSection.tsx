import { Music, Play, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Music,
    title: "Pick a vibe",
    description: "Choose from clean, atmospheric soundscapes made specifically for coding, designing, writing, and building.",
  },
  {
    number: "02",
    icon: Play,
    title: "Press play",
    description: "The audio shifts your environment instantly. Lighter, calmer, more focused.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Start building",
    description: "With the vibe set, your brain does the rest. No rituals. No tasks. Just flow.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How it <span className="text-gradient">works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Three steps to better vibes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              
              <div className="text-center">
                {/* Step number */}
                <div className="font-mono text-sm text-primary/60 mb-4">{step.number}</div>
                
                {/* Icon */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-card to-muted border border-border/50 flex items-center justify-center group-hover:border-primary/40 group-hover:shadow-[0_0_40px_-10px_hsl(35_95%_55%/0.4)] transition-all duration-500">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

