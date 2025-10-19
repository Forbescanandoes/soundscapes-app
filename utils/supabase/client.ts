"use client"

import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_KEY
  
  // Return a mock client if Supabase isn't configured (for local testing)
  if (!url || !key || url.includes('your-project-ref')) {
    console.warn('⚠️ Supabase not configured - analytics will be disabled')
    return null as any
  }
  
  return createSupabaseClient<Database>(url, key)
}

