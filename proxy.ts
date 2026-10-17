import { NextRequest, NextResponse } from 'next/server';

// Replaces clerkMiddleware: these pages need the JWT cookie set by loginAction.
// The backend still verifies the token (and the ADMIN role) on every request.
const protectedRoutes = ['/cart', '/favorites', '/orders', '/reviews', '/admin'];

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected && !req.cookies.has('token')) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
