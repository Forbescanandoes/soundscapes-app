# 🚀 Deployment Guide - Soundscapes App

## ✅ What's Done

Your app is now fully set up with:
- ✅ Clerk authentication (sign in/sign up/sign out)
- ✅ Supabase analytics tracking per user
- ✅ Audio player ready for Supabase Storage
- ✅ Protected /soundscapes route (requires login)
- ✅ Clean UI with sign up/sign out buttons

## 🔧 Setup Steps (In Order)

### 1. **Set Up Clerk** (5 minutes)

1. Go to [clerk.com](https://clerk.com) and create account
2. Create a new application
3. Copy your keys from the Clerk dashboard
4. Add to `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

5. In Clerk dashboard, customize the sign-in/sign-up UI to match your dark theme (optional)

### 2. **Set Up Supabase Storage** (10 minutes)

1. Go to your Supabase project → **Storage**
2. Click **New bucket**
   - Name: `soundscapes`
   - Make it **Public** ✓
   - Create bucket

3. **Upload your 7 audio files:**
   - Shipping Too Fast.mp3
   - Slept at Desk.wav  
   - One Too Many Hats.wav
   - the dread of marketing.wav
   - Imposter Hour.wav
   - Idea Avalanche.wav
   - Twelve Tabs Open.wav

4. Get your storage URL and add to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_STORAGE_URL=https://your-project.supabase.co/storage/v1/object/public/soundscapes
```

### 3. **Run Database Migration**

```bash
# If using local Supabase
npx supabase start
npx supabase db reset

# OR if using remote Supabase
npx supabase link --project-ref your-project-ref
npx supabase db push
```

### 4. **Deploy to Vercel**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New Project**
3. **Import from folder** (since we're not using git):
   - Click "Import Project"
   - Select your local folder
   
   OR use Vercel CLI:
   ```bash
   npm i -g vercel
   vercel
   ```

4. **Add Environment Variables** in Vercel dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SUPABASE_STORAGE_URL`

5. Click **Deploy**

## 🎯 How It Works Now

### **Landing Page** (`/`)
- Public (no login required)
- Shows "sign in" and "sign up" buttons
- Once logged in, shows user avatar
- All CTAs go to `/soundscapes`

### **Soundscapes Page** (`/soundscapes`)
- **Protected** - requires login
- Redirects to Clerk sign-in if not logged in
- Shows user avatar with sign-out option
- Logo clicks back to home
- Audio streams from Supabase Storage (or falls back to local if not set up)

### **Analytics**
- Tracks every play with Clerk user ID
- Tracks listening duration per user
- All data saved to Supabase with user association

## 🧪 Testing Locally

```bash
npm run dev
```

1. Go to `localhost:3000/`
2. Click "sign up" → create account
3. Click "open app" → should redirect to `/soundscapes`
4. Click a soundscape → should play audio from Supabase
5. Check Supabase database → should see analytics with your user ID

## 📊 Viewing Analytics

In Supabase, query:

```sql
-- Plays per user
SELECT user_id, COUNT(*) as total_plays
FROM soundscape_plays
GROUP BY user_id
ORDER BY total_plays DESC;

-- Listening time per user
SELECT user_id, 
       COUNT(*) as sessions,
       AVG(duration_seconds) as avg_duration
FROM soundscape_sessions
WHERE duration_seconds IS NOT NULL
GROUP BY user_id;
```

## 🎨 UI Features

- ✅ Sign up button on landing (styled to match)
- ✅ Sign in button (modal opens)
- ✅ User avatar with dropdown (Clerk's UserButton)
- ✅ Sign out works (in UserButton dropdown)
- ✅ Logo on soundscapes page goes back home
- ✅ Audio player unchanged - still loops forever
- ✅ All design preserved

## 🔒 Security

- `/soundscapes` route is protected by Clerk
- Anonymous users redirected to sign in
- All analytics tied to authenticated user IDs
- Supabase RLS policies still allow public writes (for MVP)
  - Can lock down later to only allow authenticated users

## 🚨 Troubleshooting

**"Clerk keys not found"**
- Make sure `.env.local` exists with both Clerk keys
- Restart dev server after adding env vars

**"Audio won't play"**
- Check Supabase Storage bucket is public
- Check filenames match exactly (including case)
- Check `NEXT_PUBLIC_SUPABASE_STORAGE_URL` is set correctly

**"Can't access /soundscapes"**
- Make sure you're signed in
- Check Clerk middleware is enabled (it is)

**"Analytics not tracking"**
- Check Supabase connection
- Run the migration
- Check browser console for errors

---

You're ready to deploy! 🎉

