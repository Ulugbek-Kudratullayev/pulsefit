/** PulseFit dizayn tizimi: ranglar, fontlar, spacing. */

export const COLORS = {
  light: {
    primary: '#FF6B35',
    primaryDark: '#E55525',
    primaryLight: '#FF9468',
    secondary: '#2EC4B6',
    accent: '#FFD60A',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceAlt: '#F3F4F6',
    text: '#1A1A1A',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  dark: {
    primary: '#FF7849',
    primaryDark: '#FF6B35',
    primaryLight: '#FFA078',
    secondary: '#34D5C8',
    accent: '#FFD60A',
    background: '#0A0A0A',
    surface: '#1A1A1A',
    surfaceAlt: '#2A2A2A',
    text: '#FAFAFA',
    textSecondary: '#9CA3AF',
    textTertiary: '#6B7280',
    border: '#2A2A2A',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
};

export const CATEGORY_COLORS: Record<string, string> = {
  chest: '#EF4444',
  back: '#3B82F6',
  legs: '#8B5CF6',
  abs: '#F59E0B',
  cardio: '#EC4899',
  'shoulders-arms': '#14B8A6',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
};

export const RADIUS = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FONT = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
};

export const SHADOW = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};

export type ColorScheme = typeof COLORS.light;
