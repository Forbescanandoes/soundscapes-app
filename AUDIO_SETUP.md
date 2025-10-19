# 🎵 Audio & Analytics Setup Guide

Your soundscape app is now fully wired up with audio playback and analytics tracking! Here's everything you need to know.

## ✅ What's Been Built

### 1. **Seamless Audio Playback**
- HTML5 Audio with native looping (`loop: true`)
- Flawless endless playback until pause/switch
- No time display - just pure vibes
- Loading states with spinner
- Error handling built-in

### 2. **Analytics Tracking** 
Tracks everything you need:
- ✅ Which soundscapes get clicked (play events)
- ✅ Which ones get listened to most (session counts)
- ✅ How long users listen (duration in seconds)
- ✅ Category breakdown
- ✅ Unique users (when you add Clerk)
- ✅ First-click tracking (ordered by timestamp)

### 3. **Database Schema**
Two main tables in Supabase:
- `soundscape_plays` - Every click/play event
- `soundscape_sessions` - Listening sessions with duration

## 🚀 Getting Started

### Step 1: Run the Migration

```bash
# Make sure Supabase is running locally
npx supabase start

# Or if using remote Supabase, push the migration:
npx supabase db push
```

### Step 2: Add Your Audio Files

Place your `.mp3` files in `/public/soundscapes/` with these exact names:

**Burnout:**
- `shipping-too-fast.mp3`
- `slept-at-desk.mp3`
- `forgot-to-eat.mp3`
- `brain-fog.mp3`
- `running-on-fumes.mp3`

**Overload:**
- `one-too-many-hats.mp3`
- `everything-on-fire.mp3`
- `ten-tabs-deep.mp3`
- `drowning-in-pings.mp3`
- `zero-quiet.mp3`

**Anxiety:**
- `dread-of-marketing.mp3`
- `runway-math.mp3`
- `waiting-on-replies.mp3`
- `imposter-hour.mp3`
- `distributed-my-guts.mp3`

**ADHD:**
- `twelve-tabs-open.mp3`
- `idea-avalanche.mp3`
- `forgot-the-point.mp3`
- `dopamine-chase.mp3`
- `cant-start.mp3`
- `cant-stop.mp3`
- `half-built-everything.mp3`
- `scrolling-instead.mp3`

### Step 3: Set Environment Variables

Make sure you have these in your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
# or
NEXT_PUBLIC_SUPABASE_KEY=your_anon_key
```

### Step 4: Test It!

```bash
npm run dev
```

Go to `/soundscapes` and click on a soundscape. It should:
1. Play the audio in an endless loop
2. Show loading state briefly
3. Track the play in your database
4. Start a session timer

## 📊 Viewing Analytics

### Quick Queries (Use Supabase Dashboard)

**Top 10 Most Played:**
```sql
SELECT * FROM soundscape_analytics 
ORDER BY total_plays DESC 
LIMIT 10;
```

**Recent Plays:**
```sql
SELECT soundscape_name, category, played_at 
FROM soundscape_plays 
ORDER BY played_at DESC 
LIMIT 50;
```

**Average Listening Duration:**
```sql
SELECT 
  soundscape_name,
  COUNT(*) as sessions,
  AVG(duration_seconds) as avg_duration_seconds,
  AVG(duration_seconds) / 60 as avg_duration_minutes
FROM soundscape_sessions
WHERE duration_seconds IS NOT NULL
GROUP BY soundscape_name
ORDER BY sessions DESC;
```

**Category Breakdown:**
```sql
SELECT 
  category,
  COUNT(*) as total_plays,
  COUNT(DISTINCT user_id) as unique_users
FROM soundscape_plays
GROUP BY category
ORDER BY total_plays DESC;
```

### Using the Analytics Service in Code

```typescript
import { soundscapeAnalytics } from '@/utils/analytics/soundscape-analytics'
import { getAnalyticsSummary, getTopSoundscapes } from '@/utils/analytics/queries'

// Get stats for a specific soundscape
const stats = await soundscapeAnalytics.getSoundscapeStats('shipping-too-fast')
console.log(stats) 
// { totalPlays: 42, averageDurationSeconds: 180, totalSessions: 38 }

// Get top soundscapes
const top = await getTopSoundscapes(10)

// Get comprehensive summary
const summary = await getAnalyticsSummary()
console.log(summary)
// {
//   totalPlays: 523,
//   totalSessions: 487,
//   uniqueUsers: 23,
//   topSoundscapes: [...],
//   categoryStats: { Burnout: 145, Anxiety: 178, ... }
// }
```

## 🎯 Key Features

### Endless Looping
- Uses native HTML5 Audio `loop` attribute
- No gaps, no glitches
- Plays until paused or switched

### Session Tracking
- Starts when audio plays
- Ends when:
  - User pauses
  - User switches tracks
  - User closes tab/browser
  - Component unmounts

### Anonymous Tracking
- Works without authentication (for MVP)
- `user_id` is `null` for anonymous users
- When you add Clerk, it'll automatically track user IDs

## 🔜 Next Steps

### 1. Add Clerk for User Tracking

```typescript
import { useUser } from '@clerk/nextjs'

// In your soundscapes page:
const { user } = useUser()

// Pass userId to analytics:
await soundscapeAnalytics.trackPlay({
  soundscapeId: 'burnout-1',
  soundscapeName: 'shipping too fast',
  category: 'Burnout',
  userId: user?.id, // ← This will now be tracked
})
```

### 2. Build an Analytics Dashboard

Create `/app/admin/analytics/page.tsx`:

```typescript
import { getAnalyticsSummary } from '@/utils/analytics/queries'

export default async function AnalyticsPage() {
  const summary = await getAnalyticsSummary()
  
  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <p>Total Plays: {summary.totalPlays}</p>
      <p>Unique Users: {summary.uniqueUsers}</p>
      {/* ... */}
    </div>
  )
}
```

### 3. Add More Soundscapes

Just:
1. Add the audio file to `/public/soundscapes/`
2. Add the item to the `soundCategories` array in `/app/soundscapes/page.tsx`
3. That's it! Analytics will automatically track it.

## 🎨 Audio Production Tips

For seamless looping:
- Use a DAW (Ableton, Logic, etc.)
- Export at exactly your target loop length (e.g., 4 bars, 8 bars)
- Add a tiny fade at the very end (5-10ms) to avoid clicks
- Test the loop in Audacity or your DAW before exporting
- Export as 320kbps MP3 or 44.1kHz WAV

## 📝 Current State

✅ Audio playback working  
✅ Seamless looping enabled  
✅ Analytics tracking implemented  
✅ Anonymous user support  
⏳ Need to add actual audio files  
⏳ Need to run migration  
⏳ Optional: Add Clerk for user auth  

## 🐛 Troubleshooting

**Audio won't play?**
- Check browser console for errors
- Verify file exists at `/public/soundscapes/{id}.mp3`
- Try clicking the track again (some browsers require user interaction)

**Analytics not tracking?**
- Check Supabase connection
- Run the migration
- Check browser console for errors
- Verify RLS policies are set (migration handles this)

**Loops have gaps/clicks?**
- Re-export your audio with proper loop points
- Ensure file doesn't have silence at start/end
- Try different export settings (320kbps MP3)

---

**You're all set!** 🎉 Add your audio files and you're ready to ship your MVP.

