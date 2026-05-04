import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import * as haptics from '@/lib/haptics';
import { useTheme } from '@/hooks/useTheme';
import { RADIUS, SPACING, FONT_SIZE } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface Props extends Omit<PressableProps, 'style' | 'children'> {
  title: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  style?: ViewStyle;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading,
  fullWidth = true,
  leftIcon,
  style,
  onPress,
  disabled,
  ...rest
}: Props) {
  const { colors } = useTheme();

  const bgByVariant: Record<Variant, string> = {
    primary: colors.primary,
    secondary: colors.secondary,
    ghost: 'transparent',
    danger: colors.error,
  };
  const textByVariant: Record<Variant, string> = {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    ghost: colors.primary,
    danger: '#FFFFFF',
  };
  const paddingBySize: Record<Size, ViewStyle> = {
    sm: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md },
    md: { paddingVertical: SPACING.md + 2, paddingHorizontal: SPACING.lg },
    lg: { paddingVertical: SPACING.lg, paddingHorizontal: SPACING.xl },
  };
  const fontBySize: Record<Size, number> = {
    sm: FONT_SIZE.sm,
    md: FONT_SIZE.base,
    lg: FONT_SIZE.lg,
  };

  return (
    <Pressable
      onPress={(e) => {
        haptics.selection();
        onPress?.(e);
      }}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: disabled ? colors.border : bgByVariant[variant],
          width: fullWidth ? '100%' : undefined,
          opacity: pressed ? 0.85 : 1,
          borderWidth: variant === 'ghost' ? 1.5 : 0,
          borderColor: colors.primary,
        },
        paddingBySize[size],
        style,
      ]}
      {...rest}
    >
      <View style={styles.row}>
        {loading ? (
          <ActivityIndicator color={textByVariant[variant]} />
        ) : (
          <>
            {leftIcon}
            <Text
              style={[
                styles.text,
                { color: textByVariant[variant], fontSize: fontBySize[size] },
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  text: { fontWeight: '600' },
});
