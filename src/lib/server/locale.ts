import { cookies } from 'next/headers';
import { i18n, type Locale } from '@/i18n-config';

export async function getLocaleFromCookie(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE');
  const locale = localeCookie?.value;

  if (locale && i18n.locales.includes(locale as any)) {
    return locale as Locale;
  }

  return i18n.defaultLocale;
}
