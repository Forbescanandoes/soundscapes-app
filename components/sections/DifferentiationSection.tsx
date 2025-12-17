import { Check, X } from "lucide-react";

const differentiators = [
  { text: "Not meditation", isNot: true },
  { text: "Not productivity hacks", isNot: true },
  { text: "No breathwork, no woo", isNot: true },
  { text: "Actually made for builders", isNot: false },
  { text: "Vibe first, not discipline first", isNot: false },
  { text: "Works in 30–90 seconds", isNot: false },
  { text: "Designed around real creative flow", isNot: false },
];

export const DifferentiationSection = () => {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why <span className="text-gradient">DNS</span>?
          </h2>
        </div>
        
        <div className="space-y-4 mb-12">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                item.isNot
                  ? "bg-destructive/5 border border-destructive/10"
                  : "bg-primary/5 border border-primary/10"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  item.isNot ? "bg-destructive/10" : "bg-primary/20"
                }`}
              >
                {item.isNot ? (
                  <X className="w-4 h-4 text-destructive" />
                ) : (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
              <span
                className={`text-lg ${
                  item.isNot
                    ? "text-muted-foreground line-through decoration-destructive/30"
                    : "text-foreground font-medium"
                }`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
        
        <p className="text-center text-2xl font-bold text-foreground">
          There's <span className="text-gradient">nothing else</span> like it.
        </p>
      </div>
    </section>
  );
};

