/** Universal storage — AsyncStorage (web va native'da bir API). */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  ONBOARDING_DONE: 'pulsefit_onboarding_done',
  THEME: 'pulsefit_theme',
  LANGUAGE: 'pulsefit_language',
  ACCESS_TOKEN: 'pulsefit_access',
  REFRESH_TOKEN: 'pulsefit_refresh',
} as const;

export const storage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch {}
  },
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {}
  },
  async setBool(key: string, value: boolean): Promise<void> {
    return this.setItem(key, value ? '1' : '0');
  },
  async getBool(key: string): Promise<boolean | null> {
    const v = await this.getItem(key);
    return v == null ? null : v === '1';
  },
};
