import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Script from 'next/script'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Soundscapes - Relief for Builders",
  description: "When you hit the wall, hit play.",
  icons: {
    icon: '/favcon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorBackground: '#0E0E0E',
          colorInputBackground: '#121212',
          colorInputText: '#FFFFFF',
          colorText: '#FFFFFF',
          colorTextSecondary: '#B5B5B5',
          colorPrimary: '#2F80ED',
          colorDanger: '#FF5C5C',
          colorSuccess: '#3FCF8E',
          colorNeutral: '#7A7A7A',
          borderRadius: '0.75rem',
        },
        elements: {
          formButtonPrimary: 'bg-brand-accent hover:bg-brand-accent/90 text-white',
          card: 'bg-brand-bg-secondary border-brand-text-muted/20',
          headerTitle: 'text-brand-text-primary',
          headerSubtitle: 'text-brand-text-secondary',
          socialButtonsBlockButton: 'border-brand-text-muted/30 hover:border-brand-accent/50',
          formFieldLabel: 'text-brand-text-primary',
          formFieldInput: 'bg-brand-bg-secondary text-brand-text-primary border-brand-text-muted/30 focus:border-brand-accent',
          footerActionLink: 'text-brand-accent hover:text-brand-accent/80',
        },
      }}
    >
      <html lang="en" className="dark">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          {/* Simple Analytics - 100% privacy-first */}
          <Script 
            src="https://scripts.simpleanalyticscdn.com/latest.js" 
            strategy="afterInteractive"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
