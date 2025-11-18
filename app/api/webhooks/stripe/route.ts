import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Force edge runtime for reliability
export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    // Read raw body as text
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    console.log('Webhook POST received:', { hasBody: !!body, hasSignature: !!signature })

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      )
    }

    // For now, just log and return success to test if POST works
    return NextResponse.json({ 
      received: true,
      message: 'Webhook endpoint is working - signature validation disabled for testing'
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Add GET for testing
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Stripe webhook endpoint',
    methods: ['POST']
  })
}
