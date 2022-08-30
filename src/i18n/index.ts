import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import be from './locales/be';

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
