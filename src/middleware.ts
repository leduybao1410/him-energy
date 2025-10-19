import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { CONTENT_TYPE_APPLICATION_JSON } from './lib/utils';
import { ClientRouteMap } from './constants/client-route/client-route-map';
import { serverAuthRoute } from './constants/server-route/server-auth-route';
import { setAuthorizationHeader } from './lib/api/apiFetch';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['vi', 'en', 'ru', 'zh'],

  // Used when no locale matches
  defaultLocale: 'vi',

  // Always show the locale in the URL
  localePrefix: 'always'
});

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(pathname)

  // Check if the path is an admin route
  const isAdminRoute = pathname.includes('/admin') || pathname.includes('/dashboard');

  if (isAdminRoute) {
    // Check for ACCESS_TOKEN cookie
    const accessToken = request.cookies.get('ACCESS_TOKEN')?.value;

    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const response = await fetch(serverAuthRoute.validateToken.url, {
        method: serverAuthRoute.validateToken.method,
        headers: {
          ...setAuthorizationHeader(request),
          ...CONTENT_TYPE_APPLICATION_JSON
        },
        body: JSON.stringify({ token: accessToken })
      });

      const resJSON = await response.json();

      if (resJSON?.data?.status !== 200) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      console.error('Error validating token:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Apply internationalization middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames and admin routes
  matcher: ['/', '/(vi|en|ru|zh)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
