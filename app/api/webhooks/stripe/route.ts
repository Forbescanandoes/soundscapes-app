import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/utils/supabase/admin'
import Stripe from 'stripe'
import { clerkClient } from '@clerk/nextjs/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    console.error('No Stripe signature found')
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  console.log(`Processing webhook: ${event.type}`)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'customer.subscription.created': {
        // Skip - we handle this in checkout.session.completed
        // Subscription is created before checkout completes, so metadata isn't set yet
        console.log('Subscription created - waiting for checkout completion')
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdate(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentSucceeded(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const clerkUserId = session.metadata?.clerkUserId
  const planType = session.metadata?.planType

  if (!clerkUserId) {
    console.error('No clerkUserId in checkout session metadata')
    return
  }

  console.log(`Checkout completed for user: ${clerkUserId}`)

  const subscriptionId = session.subscription as string
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const { error } = await supabaseAdmin
    .from('subscriptions')
    .upsert({
      user_id: clerkUserId,
      clerk_user_id: clerkUserId,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: subscriptionId,
      subscription_status: subscription.status,
      plan_type: planType || 'monthly',
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id'
    })

  if (error) {
    console.error('Error upserting subscription:', error)
    return
  }

  await updateClerkMetadata(clerkUserId, subscription.status === 'active')
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  try {
    const clerkUserId = subscription.metadata?.clerkUserId

    if (!clerkUserId) {
      console.log('Skipping subscription update - no clerkUserId in metadata')
      return
    }

    console.log(`Subscription updated for user: ${clerkUserId}, status: ${subscription.status}`)

    const { error } = await supabaseAdmin
      .from('subscriptions')
      .update({
        subscription_status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscription.id)

    if (error) {
      console.error('Error updating subscription:', error)
      return
    }

    const isActive = subscription.status === 'active' || subscription.status === 'trialing'
    await updateClerkMetadata(clerkUserId, isActive)
  } catch (error) {
    console.error('Exception in handleSubscriptionUpdate:', error)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const clerkUserId = subscription.metadata?.clerkUserId

  if (!clerkUserId) {
    console.error('No clerkUserId in subscription metadata')
    return
  }

  console.log(`Subscription deleted for user: ${clerkUserId}`)

  const { error } = await supabaseAdmin
    .from('subscriptions')
    .update({
      subscription_status: 'canceled',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('Error updating subscription to canceled:', error)
    return
  }

  await updateClerkMetadata(clerkUserId, false)
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string
  
  if (!subscriptionId) {
    return
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const clerkUserId = subscription.metadata?.clerkUserId

  if (!clerkUserId) {
    return
  }

  console.log(`Payment succeeded for user: ${clerkUserId}`)

  await handleSubscriptionUpdate(subscription)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string
  
  if (!subscriptionId) {
    return
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  const clerkUserId = subscription.metadata?.clerkUserId

  if (!clerkUserId) {
    return
  }

  console.log(`Payment failed for user: ${clerkUserId}`)

  await handleSubscriptionUpdate(subscription)
}

async function updateClerkMetadata(clerkUserId: string, isPro: boolean) {
  try {
    const client = await clerkClient()
    await client.users.updateUserMetadata(clerkUserId, {
      publicMetadata: {
        isPro: isPro,
        subscriptionTier: isPro ? 'pro' : 'freemium',
      },
    })
    console.log(`Updated Clerk metadata for ${clerkUserId}: isPro=${isPro}`)
  } catch (error) {
    console.error('Error updating Clerk metadata:', error)
  }
}

