import { Rocket, Headphones, Brain, Flame } from "lucide-react";

const benefits = [
  {
    icon: Rocket,
    title: "Get Into Flow Faster",
    description: "Sound that gently settles your mind so ideas start landing again.",
  },
  {
    icon: Headphones,
    title: "Make Building Feel Good",
    description: "Replace pressure with a creative, steady vibe that carries you through sessions.",
  },
  {
    icon: Brain,
    title: "Stay in the Pocket",
    description: "Less noise in your head = more consistent output without forcing anything.",
  },
  {
    icon: Flame,
    title: "Build Longer Without Burning Out",
    description: "When the vibe is right, energy lasts naturally.",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What <span className="text-gradient">DNS</span> does for you
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_60px_-15px_hsl(35_95%_55%/0.3)]"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-7 h-7 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-gradient transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
              
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

