/** Universal JWT saqlash — AsyncStorage (web va native uchun bir xil). */
import { storage, STORAGE_KEYS } from './storage';

export async function setTokens(access: string, refresh: string): Promise<void> {
  await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
  await storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
}

export async function getAccessToken(): Promise<string | null> {
  return storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export async function getRefreshToken(): Promise<string | null> {
  return storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

export async function clearTokens(): Promise<void> {
  await storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  await storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
}

export async function updateAccessToken(access: string): Promise<void> {
  await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
}
