import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// All routes are public - users can browse without signing in
const isPublicRoute = createRouteMatcher([
  '/',
  '/soundscapes(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // No protected routes - everyone can access everything
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|api/webhooks).*)",
  ],
}
