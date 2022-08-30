import i18next, { t } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import be from './locales/be';
import { setLocale } from 'yup';

i18next.on('languageChanged', () => {
  setLocale({
    mixed: {
      required: ({ path }) => t('validation.required', { field: t(`auth.${path}`) })
    },
    string: {
      min: ({ path, min }) => t('validation.min', {
        field: t(`auth.${path}`),
        min,
        chars: t('utils.characters', { count: min })
      })
    }
  })
});

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en,
      be
    },
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'be'],
    interpolation: {
      escapeValue: false
    }
  });
