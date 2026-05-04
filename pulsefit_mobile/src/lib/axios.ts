/** Axios klient + JWT interceptor (auto-refresh bilan). */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';
import { getAccessToken, getRefreshToken, updateAccessToken, clearTokens } from './tokenManager';

const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  Constants.expoConfig?.extra?.apiUrl ||
  'http://10.0.2.2:8000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let queue: Array<(t: string | null) => void> = [];

const onRefreshed = (token: string | null) => {
  queue.forEach((cb) => cb(token));
  queue = [];
};

api.interceptors.response.use(
  (resp) => resp,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (
      error.response?.status === 401 &&
      original &&
      !original._retry &&
      !original.url?.includes('/auth/login') &&
      !original.url?.includes('/auth/token/refresh')
    ) {
      original._retry = true;
      const refresh = await getRefreshToken();
      if (!refresh) {
        await clearTokens();
        return Promise.reject(error);
      }
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push((newToken) => {
            if (newToken) {
              original.headers!.Authorization = `Bearer ${newToken}`;
              resolve(api(original));
            } else {
              reject(error);
            }
          });
        });
      }
      isRefreshing = true;
      try {
        const { data } = await axios.post(`${API_URL}/auth/token/refresh/`, { refresh });
        await updateAccessToken(data.access);
        onRefreshed(data.access);
        original.headers!.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch (e) {
        onRefreshed(null);
        await clearTokens();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
