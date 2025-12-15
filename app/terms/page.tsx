import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-6 px-4 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-12">Last updated: December 2024</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-lg text-muted-foreground">
              By using DoNothingSounds, you agree to these Terms.
            </p>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Use of the Service</h2>
              <p className="text-muted-foreground mb-4">
                DoNothingSounds provides audio tools intended to help founders regain mental clarity and reduce cognitive overload.
              </p>
              <p className="text-muted-foreground mb-4">The service is:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Not medical advice</li>
                <li>Not therapy</li>
                <li>Not a replacement for professional care</li>
              </ul>
              <p className="text-foreground font-medium mt-4">You are responsible for how you use the product.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">No Guarantees</h2>
              <p className="text-muted-foreground mb-4">
                We make no guarantees about outcomes, performance, productivity, business success, or mental health results.
              </p>
              <p className="text-muted-foreground">Results vary by individual.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Payments & Subscriptions</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Subscriptions are billed monthly unless stated otherwise</li>
                <li>You can cancel at any time</li>
                <li>Payments are processed securely via Stripe</li>
                <li>Refunds are handled at our discretion unless required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Abuse, reverse engineer, or resell the service</li>
                <li>Use the service for unlawful purposes</li>
                <li>Attempt to disrupt or exploit the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content, audio, designs, and branding are owned by DoNothingSounds and may not be copied or redistributed without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the maximum extent allowed by law, DoNothingSounds is not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Lost profits</li>
                <li>Business decisions</li>
                <li>Emotional distress</li>
                <li>Any indirect or consequential damages</li>
              </ul>
              <p className="text-foreground font-medium mt-4">Use the service at your own discretion.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Termination</h2>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate access if these Terms are violated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Changes to These Terms</h2>
              <p className="text-muted-foreground">
                We may update these Terms at any time. Continued use means acceptance of the updated Terms.
              </p>
            </section>

            <div className="pt-8 mt-8 border-t border-border">
              <p className="text-muted-foreground">
                If you have questions about these terms, contact:{" "}
                <a 
                  href="https://x.com/loganforbes2442" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @loganforbes2442
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terms;

