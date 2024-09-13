import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { appConfig, Locale } from './app/configs/appConfig';

const intlMiddleware = createMiddleware({
  locales: appConfig.locales,
  localePrefix: appConfig.localePrefix,
  defaultLocale: appConfig.defaultLocale,
});

export default async function middleware(request: NextRequest) {
  // Check the cookie first to see if it exists
  const storedLocale = request.cookies.get('locale');

  if (!storedLocale) {
    // Retrieve the default language information from the `Accept-Language` header
    const acceptLanguage = request.headers.get('accept-language');

    if (acceptLanguage) {
      const languages = acceptLanguage
        .split(',')
        .map((lang) => lang.split(';')[0].trim());
      const preferredLocale = languages.find((lang) =>
        appConfig.locales.includes(lang as Locale),
      );

      if (preferredLocale && preferredLocale !== appConfig.defaultLocale) {
        // Save to cookie
        const response = NextResponse.redirect(
          new URL(
            `/${preferredLocale}${request.nextUrl.pathname}`,
            request.url,
          ),
        );
        response.cookies.set('locale', preferredLocale, { path: '/' });
        return response;
      }
    }
  }

  // If none of the above conditions are met, proceed normally
  const response = intlMiddleware(request);
  if (response instanceof Response) return response;

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
