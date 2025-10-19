# 🗂️ Project Structure

## Pages

### `/` (Homepage)
- **File**: `app/page.tsx`
- **Purpose**: Landing page with hero, features, philosophy, CTAs
- **Auth**: Public (no login required)
- **Features**:
  - Sign up button (top right, blue accent)
  - Sign in button (top right, subtle)
  - User avatar when logged in
  - "Open App" CTA → goes to `/soundscapes`

### `/soundscapes` (Main App)
- **File**: `app/soundscapes/page.tsx`
- **Purpose**: Audio player with soundscape categories
- **Auth**: Public (no login required)
- **Features**:
  - Logo + freemium badge (top left)
  - When NOT logged in: badge just shows "freemium"
  - When logged in: badge becomes dropdown with account settings + sign out
  - Rotating insights
  - 4 categories: Burnout, Overload, Anxiety, ADHD
  - Player at bottom with pause/play
  - Rotating messages at bottom

## Key Components

### Authentication
- **Clerk**: Handles all auth (sign in/up/out, user management)
- **Location**: Integrated in `app/layout.tsx` with `ClerkProvider`
- **Middleware**: `middleware.ts` - all routes are public

### Audio System
- **Hook**: `hooks/use-audio-player.ts` - manages playback, looping, state
- **Player UI**: `components/soundscape/player.tsx` - bottom player bar
- **Storage**: 
  - Local: `/public/MUSIC/` (for dev)
  - Production: Supabase Storage (configure via `NEXT_PUBLIC_SUPABASE_STORAGE_URL`)

### Navigation
- **FreemiumBadge**: `components/soundscape/account-menu.tsx`
  - Shows logo + "freemium" tag
  - Dropdown menu when logged in
  - Account settings, sign out options

### Analytics
- **Service**: `utils/analytics/soundscape-analytics.ts`
- **Tracks**: Play events, sessions, duration
- **User ID**: Connected to Clerk user ID when logged in
- **Database**: Supabase (see `supabase/migrations/`)

## Environment Variables

Required in `.env.local`:

```bash
# Clerk (auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (database + storage)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_SUPABASE_STORAGE_URL=https://xxx.supabase.co/storage/v1/object/public/soundscapes
```

## Audio Files

Current tracks (7 total):
1. Shipping Too Fast.mp3 (Burnout)
2. Slept at Desk.wav (Burnout)
3. One Too Many Hats.wav (Overload)
4. the dread of marketing.wav (Anxiety)
5. Imposter Hour.wav (Anxiety)
6. Idea Avalanche.wav (ADHD)
7. Twelve Tabs Open.wav (ADHD)

## Brand Design

- **Colors**: Near-black bg, white text, electric blue accent
- **Typography**: Inter, lowercase, light weight
- **Effects**: Subtle glows, blur backgrounds, minimal UI
- **Philosophy**: "Relief, not optimization. Recovery, not performance."

## Deployment

See `DEPLOYMENT_GUIDE.md` for full deployment instructions to Vercel.

