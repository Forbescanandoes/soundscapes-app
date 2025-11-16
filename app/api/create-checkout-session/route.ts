import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/utils/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    // Verify user is authenticated
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized - please sign in' },
        { status: 401 }
      )
    }

    // Get request body
    const body = await req.json()
    const { priceId, planType } = body

    if (!priceId || !planType) {
      return NextResponse.json(
        { error: 'Missing priceId or planType' },
        { status: 400 }
      )
    }

    // Check if user already has a Stripe customer ID
    const { data: existingSubscription } = await supabaseAdmin
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', userId)
      .single()

    let customerId = existingSubscription?.stripe_customer_id

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: {
          clerkUserId: userId,
        },
      })
      customerId = customer.id
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.nextUrl.origin}/soundscapes?success=true`,
      cancel_url: `${req.nextUrl.origin}/soundscapes?canceled=true`,
      metadata: {
        clerkUserId: userId,
        planType: planType,
      },
      subscription_data: {
        metadata: {
          clerkUserId: userId,
          planType: planType,
        },
      },
    })

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url 
    })

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}


