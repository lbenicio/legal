import type { Locale } from './i18n-config';

const dictionaryCache = new Map<Locale, any>();

export const getDictionary = async (locale: Locale) => {
  if (dictionaryCache.has(locale)) {
    return dictionaryCache.get(locale);
  }

  // Fallback to English if the requested locale fails
  const requestedLocale = i18n.locales.includes(locale) ? locale : i18n.defaultLocale;

  try {
    const response = await fetch(`/dictionaries/${requestedLocale}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load dictionary for locale ${requestedLocale}`);
    }
    const dictionary = await response.json();
    dictionaryCache.set(requestedLocale, dictionary);
    return dictionary;
  } catch (error) {
    console.error(error);
    // Attempt to load the default dictionary as a last resort
    const response = await fetch(`/dictionaries/${i18n.defaultLocale}.json`);
    const dictionary = await response.json();
    dictionaryCache.set(i18n.defaultLocale, dictionary);
    return dictionary;
  }
};

// Helper to pre-populate i18n config
const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es', 'pt-BR'],
} as const;
