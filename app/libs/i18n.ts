import { getRequestConfig } from 'next-intl/server';

import { appConfig, Locale } from '../configs/appConfig';

export default getRequestConfig(async ({ locale }) => {
  // Check if the locale is valid, if not, switch to 'en'
  const validLocale = appConfig.locales.includes(locale as Locale)
    ? locale
    : appConfig.defaultLocale;

  // Get the time zone based on the locale
  const timeZone = appConfig.timeZoneMap[validLocale as Locale] || 'UTC';

  let messages;
  try {
    messages = (await import(`../locales/${validLocale}.json`)).default;
  } catch (error) {
    messages = (await import(`../locales/en.json`)).default;
  }
  return { messages, timeZone };
});
