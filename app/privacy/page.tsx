import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
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
          <h1 className="text-4xl font-display font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-12">Last updated: December 2024</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <p className="text-lg text-muted-foreground">
              DoNothingSounds (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy. This Privacy Policy explains what information we collect, how we use it, and how we protect it.
            </p>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">We collect only what&apos;s necessary to run the service:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Account information (email, name if provided)</li>
                <li>Payment information (handled securely by Stripe — we never see or store your card details)</li>
                <li>Usage data (basic analytics such as which pages or features are used)</li>
                <li>Communications (messages you send us for support)</li>
              </ul>
              <p className="text-muted-foreground mt-4">We do not collect or store sensitive personal data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Provide and maintain the service</li>
                <li>Process payments</li>
                <li>Improve product functionality</li>
                <li>Respond to support requests</li>
                <li>Communicate important updates</li>
              </ul>
              <p className="text-foreground font-medium mt-4">We do not sell your data.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">We use trusted third-party tools to operate the service, including:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Stripe for payments</li>
                <li>Analytics tools to understand usage patterns</li>
                <li>Hosting providers to deliver the app</li>
              </ul>
              <p className="text-muted-foreground mt-4">These services only receive the data required to perform their function.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We take reasonable measures to protect your data. However, no system is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-4">You may request to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Access your data</li>
                <li>Correct your data</li>
                <li>Delete your account and associated data</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Contact us at:{" "}
                <a 
                  href="https://x.com/loganforbes2442" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  @loganforbes2442
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-semibold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. Continued use of the service means you accept any changes.
              </p>
            </section>

            <div className="pt-8 mt-8 border-t border-border">
              <p className="text-muted-foreground">
                If you have questions about this policy, contact:{" "}
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

export default Privacy;

