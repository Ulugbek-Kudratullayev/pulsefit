/** Web uchun storage — localStorage. */

interface IStorage {
  set(key: string, value: string | number | boolean): void;
  getString(key: string): string | undefined;
  getNumber(key: string): number | undefined;
  getBoolean(key: string): boolean | undefined;
  delete(key: string): void;
}

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

export const storage: IStorage = {
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

export const STORAGE_KEYS = {
  ONBOARDING_DONE: 'onboarding_done',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;
