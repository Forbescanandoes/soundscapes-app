# ✅ Stripe Integration Setup Checklist

## 🎯 What You Need to Complete

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Supabase Migration
In your Supabase dashboard:
1. Go to **SQL Editor**
2. Click **New Query**
3. Copy contents from `/supabase/migrations/20250115000000_create_subscriptions.sql`
4. Run the query
5. Verify table created: **Database** → **Tables** → Find `subscriptions`

### 3. Set Up Stripe Dashboard

#### Create Products:
1. Log into **Stripe Dashboard** → **Products**
2. Create product: **Reliefware Pro - Monthly**
   - Price: $5
   - Billing: Recurring monthly
   - Copy the **Price ID** (starts with `price_`)
3. Create product: **Reliefware Pro - Yearly**
   - Price: $35
   - Billing: Recurring yearly
   - Copy the **Price ID** (starts with `price_`)

#### Get API Keys:
1. **Developers** → **API Keys**
2. Copy **Publishable key** (starts with `pk_test_` or `pk_live_`)
3. Copy **Secret key** (starts with `sk_test_` or `sk_live_`)
   - ⚠️ Keep secret key SECURE - never commit to git

#### Set Up Webhook:
1. **Developers** → **Webhooks** → **Add endpoint**
2. Endpoint URL: 
   - **Development**: Use Stripe CLI (see below)
   - **Production**: `https://yourdomain.com/api/webhooks/stripe`
3. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy **Signing secret** (starts with `whsec_`)

### 4. Add Environment Variables

Create/update `.env.local`:

```bash
# Clerk (you already have these)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase (you already have these)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe - ADD THESE NEW ONES
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs - ADD THESE
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID=price_xxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID=price_yyyyyyyyyyyyy
```

### 5. Development Testing

#### Option A: Stripe CLI (Recommended)
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

This will output a **webhook signing secret** - add it to your `.env.local` as `STRIPE_WEBHOOK_SECRET`

#### Option B: ngrok (Alternative)
```bash
ngrok http 3000
# Use the HTTPS URL in Stripe webhook settings
```

### 6. Test the Flow

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test checkout flow:**
   - Go to app → Click soundscape as logged-in freemium user
   - Click locked item → Pricing modal appears
   - Click "Upgrade to Pro" (monthly or yearly)
   - Should redirect to Stripe Checkout
   - Use test card: `4242 4242 4242 4242`
   - Complete checkout

3. **Verify webhook received:**
   - Check Stripe CLI output (should show `checkout.session.completed`)
   - Check your app logs

4. **Verify database updated:**
   - Supabase → Tables → `subscriptions` → Should see new row

5. **Verify Clerk metadata updated:**
   - Clerk Dashboard → Users → Find your user
   - Check **Public metadata** → Should see:
     ```json
     {
       "isPro": true,
       "subscriptionTier": "pro"
     }
     ```

6. **Verify gating works:**
   - Refresh app
   - All soundscapes should be unlocked
   - Scenarios/Exercises should show "Coming Soon" popup instead of locks

### 7. Production Deployment

#### Before deploying:
1. Switch to **Live Mode** in Stripe Dashboard
2. Get **Live API Keys** (start with `pk_live_` and `sk_live_`)
3. Create **Live Products** with new Price IDs
4. Update webhook URL to production domain
5. Update environment variables in production (Vercel/etc.)

#### Vercel Environment Variables:
```bash
# Add in Vercel Dashboard → Settings → Environment Variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID
```

### 8. Security Checklist

✅ **Service role key** only used server-side (never exposed to client)
✅ **Webhook signature** verified on every request
✅ **Supabase RLS** enabled on subscriptions table
✅ **Clerk metadata** used for access control (not client-side checks)
✅ **HTTPS only** in production
✅ **No hardcoded secrets** in code

---

## 🔍 Troubleshooting

### "No signature" error
- Make sure webhook secret is set in `.env.local`
- Restart dev server after adding env vars

### Webhook not firing
- Check Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Check webhook events are selected in Stripe Dashboard

### Gating not working
- Check Clerk metadata updated: Clerk Dashboard → User → Public Metadata
- Make sure to refresh app after payment
- Check browser console for errors

### Database errors
- Make sure migration ran successfully
- Check RLS policies are set correctly
- Verify service role key is correct

---

## 📝 Files Created/Modified

✅ Created:
- `/supabase/migrations/20250115000000_create_subscriptions.sql`
- `/lib/stripe.ts`
- `/utils/supabase/admin.ts`
- `/app/api/create-checkout-session/route.ts`
- `/app/api/webhooks/stripe/route.ts`
- `/STRIPE_SETUP_GUIDE.md`
- This checklist

✅ Modified:
- `/components/soundscape/pricing-modal.tsx` - Now calls checkout API
- `/package.json` - Added Stripe dependencies

---

## 🚀 Ready to Go Live?

Once testing is complete:
1. ✅ Test payments work end-to-end
2. ✅ Test subscription updates/cancellations
3. ✅ Test webhook handling
4. ✅ Verify gating works correctly
5. ✅ Switch to Live Mode in Stripe
6. ✅ Update production environment variables
7. ✅ Deploy to production
8. ✅ Test with real (small) payment

---

**Need help?** Check `STRIPE_SETUP_GUIDE.md` for detailed architecture and flow diagrams.


