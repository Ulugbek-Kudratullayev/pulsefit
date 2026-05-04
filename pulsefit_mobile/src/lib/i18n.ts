import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import uz from '@/locales/uz.json';

const resources = { uz: { translation: uz } };

i18n.use(initReactI18next).init({
  resources,
  lng: 'uz',
  fallbackLng: 'uz',
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v3',
});

export default i18n;
