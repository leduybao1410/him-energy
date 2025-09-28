import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['vi', 'en', 'ru', 'zh'],

  // Used when no locale matches
  defaultLocale: 'vi',

  // Always show the locale in the URL
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vi|en|ru|zh)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
