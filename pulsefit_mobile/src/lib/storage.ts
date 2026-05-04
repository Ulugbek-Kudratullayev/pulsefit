/** Native uchun MMKV. Metro web build'da avtomatik storage.web.ts'ni tanlaydi. */
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({ id: 'pulsefit-storage' });

export const STORAGE_KEYS = {
  ONBOARDING_DONE: 'onboarding_done',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;
