import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'mr', 'hi'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(en|mr|hi)/:path*']
};