/** Tezkor lokal saqlash. Native: MMKV, Web: localStorage. */
import { Platform } from 'react-native';

interface IStorage {
  set(key: string, value: string | number | boolean): void;
  getString(key: string): string | undefined;
  getNumber(key: string): number | undefined;
  getBoolean(key: string): boolean | undefined;
  delete(key: string): void;
}

let storageImpl: IStorage;

if (Platform.OS === 'web') {
  const ls =
    typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
      ? window.localStorage
      : null;
  const mem = new Map<string, string>();
  const get = (k: string): string | null =>
    ls ? ls.getItem(k) : mem.get(k) ?? null;
  const set = (k: string, v: string): void => {
    if (ls) ls.setItem(k, v);
    else mem.set(k, v);
  };
  const del = (k: string): void => {
    if (ls) ls.removeItem(k);
    else mem.delete(k);
  };
  storageImpl = {
    set: (k, v) => set(k, String(v)),
    getString: (k) => get(k) ?? undefined,
    getNumber: (k) => {
      const v = get(k);
      return v == null ? undefined : Number(v);
    },
    getBoolean: (k) => {
      const v = get(k);
      return v == null ? undefined : v === 'true';
    },
    delete: (k) => del(k),
  };
} else {
  const { MMKV } = require('react-native-mmkv');
  storageImpl = new MMKV({ id: 'pulsefit-storage' });
}

export const storage = storageImpl;

export const STORAGE_KEYS = {
  ONBOARDING_DONE: 'onboarding_done',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;
