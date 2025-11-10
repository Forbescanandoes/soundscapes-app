"use client"

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
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
  const plans = [
    {
      name: 'monthly',
      price: '$5',
      period: '/month',
      description: 'billed monthly',
      features: [
        'unlimited access to all soundscapes',
        'no ads, ever',
        'new soundscapes added weekly',
        'cancel anytime'
      ]
    },
    {
      name: 'yearly',
      price: '$35',
      period: '/year',
      description: 'save 42%',
      popular: true,
      features: [
        'unlimited access to all soundscapes',
        'no ads, ever',
        'new soundscapes added weekly',
        '2 months free'
      ]
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-brand-bg border-brand-text-muted/20 sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-4 flex-shrink-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mx-auto w-16 h-16 rounded-full bg-brand-accent/10 border-2 border-brand-accent flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-brand-accent" />
          </motion.div>
          
          <DialogTitle className="text-3xl sm:text-4xl font-light lowercase tracking-tight text-brand-text-primary">
            unlock everything
          </DialogTitle>
          
          <DialogDescription className="text-base sm:text-lg text-brand-text-secondary lowercase leading-relaxed tracking-wide">
            get unlimited access to every soundscape. reset anytime, anywhere.
          </DialogDescription>
        </DialogHeader>

        {/* Pricing Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="text-xs lowercase tracking-wide bg-brand-accent text-white px-3 py-1 rounded-full">
                    most popular
                  </span>
                </div>
              )}
              
              <button
                className={`
                  w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left
                  ${plan.popular 
                    ? 'border-brand-accent bg-brand-accent/5 hover:bg-brand-accent/10' 
                    : 'border-brand-text-muted/20 bg-brand-bg/50 hover:border-brand-accent/50'
                  }
                `}
              >
                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-light text-brand-text-primary">
                      {plan.price}
                    </span>
                    <span className="text-lg text-brand-text-secondary lowercase">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-brand-accent lowercase tracking-wide mt-1">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-brand-text-secondary lowercase leading-relaxed tracking-wide">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <div className={`
                    w-full py-3 rounded-xl text-center text-sm font-normal lowercase tracking-wide transition-all
                    ${plan.popular
                      ? 'bg-brand-accent text-white'
                      : 'bg-brand-text-muted/10 text-brand-text-primary'
                    }
                  `}>
                    upgrade to pro
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <button
          onClick={() => onOpenChange(false)}
          className="mt-4 text-sm text-brand-text-muted hover:text-brand-text-secondary lowercase tracking-wide transition-colors text-center w-full"
        >
          maybe later
        </button>
      </DialogContent>
    </Dialog>
  )
}

