"use client"

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface PricingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PricingModal({ open, onOpenChange }: PricingModalProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const pricingFeatures = [
    "Full Founder Reset Library",
    "unlimited Scenarios, States, and get your head back sessions",
    "New drops every month",
    "Early access to experimental soundscapes",
    "Direct access to the founder (24/7 DM)"
  ]

  const handleCheckout = async () => {
    try {
      setLoading('checkout')
      setError(null)

      // Call our API to create a Stripe Checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || '',
          planType: 'monthly'
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border border-border sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-4">
          <DialogTitle className="font-display text-3xl sm:text-4xl font-bold">
            Simple Pricing
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Costs less than losing one hour to mental fog
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl" />
            
            <div className="relative p-8 rounded-3xl bg-card border-2 border-primary/30 glow-primary">
              <div className="mb-6">
                <span className="font-display text-5xl font-bold">$15</span>
                <span className="text-muted-foreground">/ month</span>
              </div>
              
              <p className="text-foreground font-medium mb-8">
                Reset your mind anytime
              </p>

              <ul className="space-y-4 text-left mb-8">
                {pricingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant="hero" 
                size="xl" 
                className="w-full"
                onClick={handleCheckout}
                disabled={loading !== null}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Start Free'
                )}
              </Button>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                No commitment. Cancel anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
            {error}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
