import i18next, { t } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import be from './locales/be';
import { setLocale } from 'yup';

i18next.on('languageChanged', (lng) => {
  setLocale({
    mixed: {
      required: ({ path }) => t('validation.required', { field: t(`fields.${path}`) })
    },
    string: {
      min: ({ path, min }) => t('validation.min', {
        field: t(`auth.${path}`),
        min,
        chars: t('utils.characters', { count: min })
      })
    }
  })

  localStorage.setItem('lng', lng);
});

export const supportedLngs = ['en', 'be'] as const;

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en,
      be
    },
    lng: localStorage.getItem('lng') || 'en',
    fallbackLng: 'en',
    supportedLngs,
    interpolation: {
      escapeValue: false
    }
  });
