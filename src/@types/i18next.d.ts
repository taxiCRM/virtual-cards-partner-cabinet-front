import resources from '../../public/locales';

declare module 'i18next' {
  interface CustomTypeOptions {
    lng: 'ru';
    fallbackLng: 'en';
    resources: typeof resources.ru;
  }
}
