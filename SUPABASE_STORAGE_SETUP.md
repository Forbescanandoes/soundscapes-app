# Supabase Storage Setup for Audio Files

## Step 1: Create Storage Bucket

1. Go to your Supabase project dashboard
2. Click **Storage** in the left sidebar
3. Click **New bucket**
4. Name it: `soundscapes`
5. Make it **Public** (so audio files can be streamed)
6. Click **Create bucket**

## Step 2: Upload Your Audio Files

Upload these files to the `soundscapes` bucket:

- `Shipping Too Fast.mp3`
- `Slept at Desk.wav`
- `One Too Many Hats.wav`
- `the dread of marketing.wav`
- `Imposter Hour.wav`
- `Idea Avalanche.wav`
- `Twelve Tabs Open.wav`

## Step 3: Get the Public URL Format

Your audio files will be accessible at:
```
https://[YOUR_PROJECT_REF].supabase.co/storage/v1/object/public/soundscapes/[FILENAME]
```

Example:
```
https://abcdefgh.supabase.co/storage/v1/object/public/soundscapes/Shipping Too Fast.mp3
```

## Step 4: Set Environment Variable

Add to your `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_STORAGE_URL=https://[YOUR_PROJECT_REF].supabase.co/storage/v1/object/public/soundscapes
```

---

**Once this is done, I'll update the audio player to stream from Supabase!**

