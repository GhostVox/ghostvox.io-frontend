import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // In middleware, use request.cookies instead of cookies()
  const refreshToken = request.cookies.get("refreshToken");
  const accessToken = request.cookies.get("accessToken");
  // Check if the user is trying to access protected routes
  const isProtectedRoute = !notProtectedRoutes.includes(request.nextUrl.pathname);

  // If accessing protected routes without tokens, redirect to sign-in
  if (isProtectedRoute && !refreshToken?.value && !accessToken?.value) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

const notProtectedRoutes = ["/", "/sign-in", "/sign-up"];

// Apply middleware only to routes that should be protected
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/polls/:path*",
    "/user-profile/:path*",
    "/settings/:path*",
    // Add other protected routes here
  ],
};
