import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";

const features = [
  "Full soundscape library",
  "Unlimited listening",
  "New vibes monthly",
  "Early access to experimental tracks",
];

export const PricingSection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 max-w-2xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="text-gradient">vibe based</span> pricing
          </h2>
        </div>
        
        <div className="relative p-8 md:p-12 rounded-3xl bg-card/80 border border-primary/20 shadow-[0_0_100px_-20px_hsl(35_95%_55%/0.2)]">
          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            <Zap className="w-4 h-4" />
            Most Popular
          </div>
          
          {/* Price */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl md:text-6xl font-bold text-foreground">$5</span>
              <span className="text-xl text-muted-foreground">/ month</span>
            </div>
            <p className="text-muted-foreground">
              unlimited vibes
            </p>
            <p className="text-sm text-muted-foreground/60 mt-2 font-mono">
              Less than the price of losing one hour to a bad mental session.
            </p>
          </div>
          
          {/* Features */}
          <div className="space-y-4 mb-10">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Included:</p>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* CTA */}
          <Button variant="cta" size="xl" className="w-full">
            Start Free
          </Button>
        </div>
      </div>
    </section>
  );
};

