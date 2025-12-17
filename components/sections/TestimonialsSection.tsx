import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "It feels like someone lowered the pressure in my head.",
    author: "Indie Hacker",
  },
  {
    quote: "I throw DNS on before I code. Makes everything smoother.",
    author: "SaaS Builder",
  },
  {
    quote: "Finally something that isn't wellness fluff. It just improves the vibe.",
    author: "AI Founder",
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What builders are <span className="text-gradient">saying</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-card/80 border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <blockquote className="text-xl font-medium text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <cite className="text-sm font-mono text-muted-foreground not-italic">
                — {testimonial.author}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

