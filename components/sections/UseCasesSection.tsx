import { Laptop, Code, Palette, Cpu, Sparkles, Bot } from "lucide-react";

const useCases = [
  { icon: Code, label: "Solo founders" },
  { icon: Sparkles, label: "Indie hackers" },
  { icon: Palette, label: "Designers" },
  { icon: Cpu, label: "Engineers" },
  { icon: Laptop, label: "Creators" },
  { icon: Bot, label: "AI builders" },
];

export const UseCasesSection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for people who make <span className="text-gradient">cool sh*t</span>
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card/50 border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group cursor-default"
            >
              <useCase.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                {useCase.label}
              </span>
            </div>
          ))}
        </div>
        
        <p className="text-center text-lg text-muted-foreground">
          Anyone living inside their laptop shipping ideas.
        </p>
        
        <p className="text-center text-xl text-foreground mt-8 font-medium">
          If you build things, <span className="text-primary">DNS makes it feel better.</span>
        </p>
      </div>
    </section>
  );
};

