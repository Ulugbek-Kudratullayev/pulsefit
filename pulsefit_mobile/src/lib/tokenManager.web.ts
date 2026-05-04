/** Web uchun JWT saqlash — localStorage. */

const ACCESS_KEY = 'pulsefit_access';
const REFRESH_KEY = 'pulsefit_refresh';

const ls = (): Storage | null =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
    ? window.localStorage
    : null;

export async function setTokens(access: string, refresh: string): Promise<void> {
  const s = ls();
  if (!s) return;
  s.setItem(ACCESS_KEY, access);
  s.setItem(REFRESH_KEY, refresh);
}

export async function getAccessToken(): Promise<string | null> {
  return ls()?.getItem(ACCESS_KEY) ?? null;
}

export async function getRefreshToken(): Promise<string | null> {
  return ls()?.getItem(REFRESH_KEY) ?? null;
}

export async function clearTokens(): Promise<void> {
  const s = ls();
  if (!s) return;
  s.removeItem(ACCESS_KEY);
  s.removeItem(REFRESH_KEY);
}

export async function updateAccessToken(access: string): Promise<void> {
  ls()?.setItem(ACCESS_KEY, access);
}
