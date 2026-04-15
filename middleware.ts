import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ADMIN_PATHS = [
  "/admin/login",
  "/admin/signup",
  "/admin/forgot-password",
  "/admin/reset-password",
];

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAdminRoute = pathname.startsWith("/admin");
  const isPublicAdminPath = PUBLIC_ADMIN_PATHS.some((path) =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  // Public admin auth pages should remain reachable to avoid redirect loops
  // when stale/invalid tokens exist but DB admin is missing.
  if (isPublicAdminPath) {
    return NextResponse.next();
  }

  // Require authentication for all private admin routes.
  if (!isPublicAdminPath) {
    if (!token || token.role !== "admin") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
