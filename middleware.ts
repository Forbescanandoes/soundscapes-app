import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// All routes are public - users can browse without signing in
const isPublicRoute = createRouteMatcher([
  '/',
  '/soundscapes(.*)',
  '/learn-more(.*)',
  '/privacy(.*)',
  '/terms(.*)',
  '/demo(.*)',
  '/admin(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Skip Stripe webhooks entirely - they need raw body
  if (req.nextUrl.pathname === '/api/webhooks/stripe') {
    return
  }
  
  // No protected routes - everyone can access everything
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}

