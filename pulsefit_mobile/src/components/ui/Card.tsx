import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { RADIUS, SHADOW, SPACING } from '@/constants/theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  padded?: boolean;
}

export function Card({ children, style, onPress, padded = true }: Props) {
  const { colors } = useTheme();
  const Wrap: any = onPress ? Pressable : View;
  return (
    <Wrap
      onPress={onPress}
      style={({ pressed }: any) => [
        styles.base,
        SHADOW.sm,
        {
          backgroundColor: colors.surface,
          padding: padded ? SPACING.lg : 0,
          opacity: pressed ? 0.95 : 1,
        },
        style,
      ]}
    >
      {children}
    </Wrap>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.lg,
  },
});
