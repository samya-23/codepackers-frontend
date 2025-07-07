import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './translations/en.json';
import es from './translations/es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: 'en', // Default language if none found
    detection: {
      // Detect language in this order:
      order: ['localStorage', 'navigator'],
      // Use this localStorage key to lookup/set
      lookupLocalStorage: 'language',
      // Cache the user's language in localStorage
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already escapes
    }
  });

export default i18n;
