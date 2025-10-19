"use client"

import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/nextjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Settings, LogOut, User } from 'lucide-react'
import Link from 'next/link'

export function FreemiumBadge() {
  const { signOut, openUserProfile } = useClerk()
  const { user } = useUser()

  return (
    <div className="flex items-center gap-3">
      {/* Logo - always clickable to go home */}
      <Link href="/" className="w-10 h-10 rounded-full bg-brand-text-primary flex items-center justify-center hover:opacity-80 transition-opacity">
        <div className="w-6 h-6 rounded-full border-2 border-brand-bg" />
      </Link>
      
      {/* When NOT logged in - simple badge that links home */}
      <SignedOut>
        <Link href="/">
          <span className="text-xs lowercase tracking-wide border border-brand-text-muted/30 px-3 py-1 rounded-full text-brand-text-secondary hover:opacity-80 transition-opacity">
            freemium
          </span>
        </Link>
      </SignedOut>

      {/* When logged in - clickable dropdown badge */}
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="text-xs lowercase tracking-wide border border-brand-text-muted/30 px-3 py-1 rounded-full text-brand-text-secondary hover:border-brand-accent/50 transition-colors focus:outline-none"
            >
              freemium
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="start" 
            className="w-48 bg-brand-bg-secondary border-brand-text-muted/20 text-brand-text-primary"
          >
            <div className="px-3 py-2 text-xs text-brand-text-muted lowercase">
              {user?.primaryEmailAddress?.emailAddress}
            </div>
            <DropdownMenuSeparator className="bg-brand-text-muted/10" />
            <DropdownMenuItem 
              onClick={() => openUserProfile()}
              className="lowercase cursor-pointer focus:bg-brand-text-muted/10 focus:text-brand-text-primary"
            >
              <Settings className="mr-2 h-4 w-4" />
              account settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              asChild
              className="lowercase cursor-pointer focus:bg-brand-text-muted/10 focus:text-brand-text-primary"
            >
              <Link href="/">
                <User className="mr-2 h-4 w-4" />
                back to home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-brand-text-muted/10" />
            <DropdownMenuItem 
              onClick={() => signOut()}
              className="lowercase cursor-pointer text-brand-error focus:bg-brand-error/10 focus:text-brand-error"
            >
              <LogOut className="mr-2 h-4 w-4" />
              sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>
    </div>
  )
}

