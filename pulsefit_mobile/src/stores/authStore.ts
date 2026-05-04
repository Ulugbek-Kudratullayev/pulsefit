/** Auth holati: token, user, login/logout. */
import { create } from 'zustand';
import { authApi, LoginPayload, RegisterPayload } from '@/api/auth';
import { setTokens, clearTokens, getAccessToken, getRefreshToken } from '@/lib/tokenManager';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  bootstrap: () => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  bootstrap: async () => {
    const access = await getAccessToken();
    if (!access) {
      set({ isLoading: false, isAuthenticated: false, user: null });
      return;
    }
    try {
      const user = await authApi.me();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      await clearTokens();
      set({ isLoading: false, isAuthenticated: false, user: null });
    }
  },

  login: async (payload) => {
    const tokens = await authApi.login(payload);
    await setTokens(tokens.access, tokens.refresh);
    set({ user: tokens.user, isAuthenticated: true, isLoading: false });
  },

  register: async (payload) => {
    const tokens = await authApi.register(payload);
    await setTokens(tokens.access, tokens.refresh);
    set({ user: tokens.user, isAuthenticated: true, isLoading: false });
  },

  logout: async () => {
    const refresh = await getRefreshToken();
    if (refresh) {
      try {
        await authApi.logout(refresh);
      } catch {
        // ignore
      }
    }
    await clearTokens();
    set({ user: null, isAuthenticated: false });
  },

  refetchUser: async () => {
    try {
      const user = await authApi.me();
      set({ user });
    } catch {
      // ignore
    }
  },

  updateUser: (user) => set({ user }),
}));
