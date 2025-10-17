import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { CONTENT_TYPE_APPLICATION_JSON } from './lib/utils';
import { authRoute } from './constants/server-route/server-auth-route';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['vi', 'en', 'ru', 'zh'],

  // Used when no locale matches
  defaultLocale: 'vi',

  // Always show the locale in the URL
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is an admin route
  const isAdminRoute = pathname.includes('/admin/') || pathname.includes('/dashboard');

  if (isAdminRoute) {
    // Check for ACCESS_TOKEN cookie
    const accessToken = request.cookies.get('ACCESS_TOKEN')?.value;
    fetch(authRoute.validateToken.url, {
      method: authRoute.validateToken.method,
      headers: {
        ...CONTENT_TYPE_APPLICATION_JSON
      },
      body: JSON.stringify({ token: accessToken })
    }).then(response => response.json()).then(data => {
      if (!data.isValid) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }).catch(error => {
      console.error('Error validating token:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    });
  }

  // Apply internationalization middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames and admin routes
  matcher: ['/', '/(vi|en|ru|zh)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
