import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Get auth session from cookie
  const authSession = request.cookies.get("auth")?.value

  // Public paths that don't require authentication
  const publicPaths = ["/", "/sign-in", "/sign-up", "/about", "/features", "/get-code", "/registration-guide"]

  // Check if the path is public
  const isPublicPath = publicPaths.includes(path)

  // If the path requires authentication and there's no session, redirect to sign-in
  if (!isPublicPath && !authSession) {
    const signInUrl = new URL("/sign-in", request.url)
    signInUrl.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(signInUrl)
  }

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (authSession && (path === "/sign-in" || path === "/sign-up")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ (API routes)
     * 2. /_next/ (Next.js internals)
     * 3. /fonts/ (inside public directory)
     * 4. /favicon.ico (favicon file)
     */
    "/((?!api|_next|fonts|favicon.ico).*)",
  ],
}

