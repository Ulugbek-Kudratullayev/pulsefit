/** Joriy mavzu (light/dark) va ranglarni qaytaradi. AsyncStorage'ga moslashtirilgan. */
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { create } from 'zustand';
import { COLORS, ColorScheme } from '@/constants/theme';
import { storage, STORAGE_KEYS } from '@/lib/storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  loadMode: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'system',
  setMode: (m) => {
    storage.setItem(STORAGE_KEYS.THEME, m).catch(() => {});
    set({ mode: m });
  },
  loadMode: async () => {
    const saved = await storage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'light' || saved === 'dark' || saved === 'system') {
      set({ mode: saved });
    }
  },
}));

export function useTheme(): { colors: ColorScheme; isDark: boolean; mode: ThemeMode } {
  const systemScheme = useColorScheme();
  const mode = useThemeStore((s) => s.mode);
  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark';
  return {
    colors: isDark ? COLORS.dark : COLORS.light,
    isDark,
    mode,
  };
}

export function useThemeBootstrap(): void {
  const loadMode = useThemeStore((s) => s.loadMode);
  useEffect(() => {
    loadMode().catch(() => {});
  }, [loadMode]);
}
