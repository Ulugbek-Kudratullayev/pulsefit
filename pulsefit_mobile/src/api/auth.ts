/** Auth API funksiyalar. */
import api from '@/lib/axios';
import { AuthTokens, User, UserProfile } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  password_confirm: string;
  full_name?: string;
}

export const authApi = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post<AuthTokens>('/auth/login/', payload);
    return data;
  },
  register: async (payload: RegisterPayload) => {
    const { data } = await api.post<AuthTokens>('/auth/register/', payload);
    return data;
  },
  logout: async (refresh: string) => {
    await api.post('/auth/logout/', { refresh });
  },
  changePassword: async (old_password: string, new_password: string) => {
    await api.post('/auth/password/change/', { old_password, new_password });
  },
  me: async () => {
    const { data } = await api.get<User>('/users/me/');
    return data;
  },
  updateProfile: async (payload: Partial<UserProfile> & { full_name?: string }) => {
    const { data } = await api.patch<User>('/users/me/', payload);
    return data;
  },
};
