/** Joriy mavzu (light/dark) va ranglarni qaytaradi. */
import { useColorScheme } from 'react-native';
import { COLORS, ColorScheme } from '@/constants/theme';
import { storage, STORAGE_KEYS } from '@/lib/storage';
import { create } from 'zustand';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: (storage.getString(STORAGE_KEYS.THEME) as ThemeMode) || 'system',
  setMode: (m) => {
    storage.set(STORAGE_KEYS.THEME, m);
    set({ mode: m });
  },
}));

export function useTheme(): { colors: ColorScheme; isDark: boolean; mode: ThemeMode } {
  const systemScheme = useColorScheme();
  const mode = useThemeStore((s) => s.mode);
  const isDark =
    mode === 'system' ? systemScheme === 'dark' : mode === 'dark';
  return {
    colors: isDark ? COLORS.dark : COLORS.light,
    isDark,
    mode,
  };
}
