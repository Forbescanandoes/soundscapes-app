import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { DifferentiationSection } from "@/components/sections/DifferentiationSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <UseCasesSection />
      <DifferentiationSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
