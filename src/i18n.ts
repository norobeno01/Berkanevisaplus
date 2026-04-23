import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTrans from './locales/en/translation.json';
import frTrans from './locales/fr/translation.json';
import esTrans from './locales/es/translation.json';
import arTrans from './locales/ar/translation.json';

const resources = {
  en: { translation: enTrans },
  fr: { translation: frTrans },
  es: { translation: esTrans },
  ar: { translation: arTrans },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'es', 'ar'],
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
