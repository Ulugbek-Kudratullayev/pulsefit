/** JWT tokenlarni saqlash (Native: SecureStore, Web: localStorage). */
import { Platform } from 'react-native';

const ACCESS_KEY = 'pulsefit_access';
const REFRESH_KEY = 'pulsefit_refresh';

interface ITokenStore {
  set(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
  del(key: string): Promise<void>;
}

let store: ITokenStore;

if (Platform.OS === 'web') {
  const ls =
    typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
      ? window.localStorage
      : null;
  store = {
    set: async (k, v) => {
      if (ls) ls.setItem(k, v);
    },
    get: async (k) => (ls ? ls.getItem(k) : null),
    del: async (k) => {
      if (ls) ls.removeItem(k);
    },
  };
} else {
  const SecureStore = require('expo-secure-store');
  store = {
    set: (k, v) => SecureStore.setItemAsync(k, v),
    get: (k) => SecureStore.getItemAsync(k),
    del: (k) => SecureStore.deleteItemAsync(k),
  };
}

export async function setTokens(access: string, refresh: string): Promise<void> {
  await store.set(ACCESS_KEY, access);
  await store.set(REFRESH_KEY, refresh);
}

export async function getAccessToken(): Promise<string | null> {
  return store.get(ACCESS_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  return store.get(REFRESH_KEY);
}

export async function clearTokens(): Promise<void> {
  await store.del(ACCESS_KEY);
  await store.del(REFRESH_KEY);
}

export async function updateAccessToken(access: string): Promise<void> {
  await store.set(ACCESS_KEY, access);
}
