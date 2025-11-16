"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Hammer } from 'lucide-react'

interface ComingSoonModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  featureName: string
}

export function ComingSoonModal({ open, onOpenChange, featureName }: ComingSoonModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-brand-bg-secondary to-brand-bg border border-brand-text-muted/30 text-brand-text-primary">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 rounded-full bg-brand-accent/10 border border-brand-accent/30">
              <Hammer className="w-8 h-8 text-brand-accent" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-light lowercase tracking-tight text-center">
            currently building
          </DialogTitle>
          <DialogDescription className="text-brand-text-secondary lowercase text-center space-y-4 pt-4">
            <p className="text-base leading-relaxed">
              {featureName} is under construction. we&apos;re building something worth the wait.
            </p>
            <p className="text-base leading-relaxed">
              want early access or have feedback?
            </p>
            <a 
              href="mailto:support@reliefware.app"
              className="inline-block px-6 py-3 rounded-full bg-brand-accent hover:bg-brand-accent/80 text-brand-bg font-light lowercase tracking-wide transition-all duration-300 hover:scale-105 mt-2"
            >
              contact us
            </a>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

