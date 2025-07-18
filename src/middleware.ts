import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle internationalization first
  const response = intlMiddleware(request);

  // Extract locale from pathname
  const pathnameIsMissingLocale = routing.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If locale is missing, let intl middleware handle it
  if (pathnameIsMissingLocale) {
    return response;
  }

  // Get current locale from pathname
  const locale = pathname.split("/")[1];

  // Define protected routes (dashboard pages)
  const protectedRoutes = [
    `/${locale}`,
    `/${locale}/dashboard`,
    `/${locale}/profile`,
    `/${locale}/settings`,
    `/${locale}/resumes`,
  ];

  // Define public routes (auth pages)
  const publicRoutes = [`/${locale}/auth/login`];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route ||
      (pathname.startsWith(route + "/") &&
        !publicRoutes.some((route) => pathname === route))
  );

  // Check if current path is public
  const isPublicRoute = publicRoutes.some((route) => pathname === route);
  // Get authentication token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If user is not authenticated and trying to access protected route
  if (isProtectedRoute && !token) {
    console.log("User not authenticated, redirecting to login");
    const loginUrl = new URL(`/${locale}/auth/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access login page, redirect to dashboard
  if (isPublicRoute && token) {
    const dashboardUrl = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
