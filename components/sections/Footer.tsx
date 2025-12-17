import { Headphones } from "lucide-react";

const footerLinks = [
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Terms", href: "#terms" },
  { label: "Privacy", href: "#privacy" },
];

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Headphones className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-foreground">DoNothingSounds</span>
              <p className="text-xs text-muted-foreground">Good vibes for people making cool sh*t.</p>
            </div>
          </div>
          
          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            © 2024 DoNothingSounds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

