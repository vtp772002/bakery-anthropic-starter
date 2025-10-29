import {getRequestConfig} from 'next-intl/server';

// Supported locales for the app
const locales = ['en', 'vi'] as const;
type AppLocale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Fall back to the default locale instead of throwing 404s if something is off
  const resolvedLocale: AppLocale = (locale && locales.includes(locale as AppLocale))
    ? (locale as AppLocale)
    : 'en';

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});
