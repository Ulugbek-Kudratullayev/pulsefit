import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import uz from '@/locales/uz.json';

const resources = { uz: { translation: uz } };

const deviceLang = Localization.getLocales()[0]?.languageCode ?? 'uz';

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLang === 'uz' ? 'uz' : 'uz',
  fallbackLng: 'uz',
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v3',
});

export default i18n;
