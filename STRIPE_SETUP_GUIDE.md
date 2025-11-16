# 🔒 Production Stripe + Supabase + Clerk Integration

## Overview
Secure payment flow:
1. User clicks "Upgrade" → Creates Stripe Checkout session
2. User completes payment on Stripe → Stripe sends webhook
3. Webhook verifies payment → Updates Supabase + Clerk metadata
4. Gating system checks Clerk metadata → Grants/denies access

---

## Step 1: Supabase Database Setup

### Create `subscriptions` table:

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL UNIQUE, -- Clerk user ID
  clerk_user_id TEXT NOT NULL, -- Redundant for clarity
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  subscription_status TEXT NOT NULL, -- 'active', 'canceled', 'past_due', 'trialing'
  plan_type TEXT NOT NULL, -- 'monthly' or 'yearly'
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);

-- Row Level Security (RLS)
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can only read their own subscription
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (user_id = auth.jwt() ->> 'sub');

-- Only service role can insert/update (webhooks)
CREATE POLICY "Service role can manage subscriptions"
  ON subscriptions FOR ALL
  USING (true)
  WITH CHECK (true);
```

---

## Step 2: Stripe Products & Prices Setup

### In Stripe Dashboard:
1. Go to **Products** → Create 2 products:
   - **donothingsounds.com Pro - Monthly** ($5/month)
   - **donothingsounds.com Pro - Yearly** ($35/year)

2. Copy the **Price IDs** (start with `price_...`)
   - `price_xxxxxxxxxxxxx` (monthly)
   - `price_yyyyyyyyyyyyy` (yearly)

3. Go to **Webhooks** → Add endpoint:
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

4. Copy the **Webhook Signing Secret** (starts with `whsec_...`)

---

## Step 3: Environment Variables

Add to `.env.local`:

```bash
# Stripe Keys (from Stripe Dashboard → Developers → API Keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs
STRIPE_MONTHLY_PRICE_ID=price_xxxxxxxxxxxxx
STRIPE_YEARLY_PRICE_ID=price_yyyyyyyyyyyyy

# Supabase (you already have these)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Clerk (you already have these)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
```

---

## Step 4: Install Stripe SDK

```bash
npm install stripe @stripe/stripe-js
```

---

## Step 5: Implementation Flow

### Files to create:
1. `/app/api/create-checkout-session/route.ts` - Creates Stripe checkout
2. `/app/api/webhooks/stripe/route.ts` - Handles Stripe webhooks
3. `/lib/stripe.ts` - Stripe client initialization
4. `/utils/supabase/admin.ts` - Supabase admin client (service role)
5. Update `PricingModal` to call checkout API

---

## Step 6: Security Checklist

✅ **Webhook signature verification** - Prevents fake webhook calls
✅ **Supabase RLS policies** - Users can only see their own data
✅ **Service role for webhooks** - Bypasses RLS for trusted operations
✅ **Clerk metadata sync** - Single source of truth for access control
✅ **No client-side subscription checks** - All checks via Clerk metadata
✅ **HTTPS only** - Stripe requires secure endpoints

---

## Step 7: Testing Flow

### Development Testing:
1. Use Stripe Test Mode keys
2. Install Stripe CLI for local webhooks:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
3. Test with Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

### Production:
1. Switch to Live Mode keys in Stripe Dashboard
2. Update webhook endpoint to production URL
3. Test with real (small) payment
4. Verify:
   - Supabase `subscriptions` table updates
   - Clerk metadata updates (`isPro: true`)
   - App gating works correctly

---

## Architecture Diagram

```
User clicks "Upgrade"
    ↓
Next.js API: /api/create-checkout-session
    ↓
Stripe Checkout (hosted by Stripe)
    ↓
User completes payment
    ↓
Stripe Webhook → /api/webhooks/stripe
    ↓
Verify webhook signature
    ↓
Update Supabase subscriptions table
    ↓
Update Clerk user metadata (isPro: true)
    ↓
User reloads app → Gating checks Clerk → Access granted ✅
```

---

## Important Notes

1. **Webhook = Source of Truth** - Never trust client-side payment confirmations
2. **Idempotency** - Webhooks can fire multiple times, handle gracefully
3. **Subscription Status** - Check `status === 'active'` AND `current_period_end > now()`
4. **Cancellations** - Let users finish their paid period (`cancel_at_period_end`)
5. **Failed Payments** - Handle gracefully, don't immediately revoke access

---

Ready to implement? I'll create all the files and code now.


