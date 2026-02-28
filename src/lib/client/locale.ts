'use client';
import { i18n, type Locale } from '@/i18n-config';

export function getLocaleFromCookieClient(): Locale {
  const cookies = document.cookie.split('; ');
  const localeCookie = cookies.find((row) => row.startsWith('NEXT_LOCALE='));
  const locale = localeCookie?.split('=')[1];

  if (locale && i18n.locales.includes(locale as any)) {
    return locale as Locale;
  }

  return i18n.defaultLocale;
}
