import { useTranslations as useNextIntlTranslations, useLocale as useNextIntlLocale } from 'next-intl';

export const useTranslations = (namespace?: string) => {
  return useNextIntlTranslations(namespace);
};

export const useLocale = () => {
  return useNextIntlLocale();
};

// Language code mapping for API calls
const LOCALE_TO_LANG_CODE: Record<string, string> = {
  'vi': 'VI',
  'en': 'EN',
  'ru': 'RU',
  'zh': 'ZH'
};

// Hook to get language code for API calls
export const useLanguageCode = (): string => {
  const locale = useNextIntlLocale();
  return LOCALE_TO_LANG_CODE[locale] || 'VI'; // Default to Vietnamese
};

// Hook to get current language name
export const useLanguageName = (): string => {
  const locale = useNextIntlLocale();
  const languageNames: Record<string, string> = {
    'vi': 'Tiếng Việt',
    'en': 'English',
    'ru': 'Русский',
    'zh': '中文'
  };
  return languageNames[locale] || 'Tiếng Việt';
};
