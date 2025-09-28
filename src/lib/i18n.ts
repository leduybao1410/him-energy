import { getTranslations } from 'next-intl/server';

export const getPageTranslations = async (locale: string, page: string) => {
  try {
    const t = await getTranslations({ locale, namespace: page });
    return t;
  } catch (error) {
    console.error(`Error loading translations for ${locale}/${page}:`, error);
    // Fallback to Vietnamese if translation not found
    const fallbackT = await getTranslations({ locale: 'vi', namespace: page });
    return fallbackT;
  }
};

export const getCommonTranslations = async (locale: string) => {
  try {
    const t = await getTranslations({ locale, namespace: 'common' });
    return t;
  } catch (error) {
    console.error(`Error loading common translations for ${locale}:`, error);
    // Fallback to Vietnamese if translation not found
    const fallbackT = await getTranslations({ locale: 'vi', namespace: 'common' });
    return fallbackT;
  }
};

export const locales = ['vi', 'en', 'ru', 'zh'] as const;
export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  vi: 'Tiếng Việt',
  en: 'English',
  ru: 'Русский',
  zh: '中文'
};

export const localeFlags: Record<Locale, string> = {
  vi: '🇻🇳',
  en: '🇺🇸',
  ru: '🇷🇺',
  zh: '🇨🇳'
};
