import { initReactI18next } from 'react-i18next';

import i18next, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

export const options: InitOptions = {
  lng: 'ru',
  fallbackLng: 'ru',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
};

i18next.use(HttpApi).use(LanguageDetector).use(initReactI18next).init(options);

export default i18next;
