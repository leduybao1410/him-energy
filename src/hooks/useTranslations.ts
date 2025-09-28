import { useTranslations as useNextIntlTranslations, useLocale as useNextIntlLocale } from 'next-intl';

export const useTranslations = (namespace?: string) => {
  return useNextIntlTranslations(namespace);
};

export const useLocale = () => {
  return useNextIntlLocale();
};
