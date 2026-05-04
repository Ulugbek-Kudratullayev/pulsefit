import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { RADIUS, SHADOW, SPACING } from '@/constants/theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  padded?: boolean;
}

const isWeb = Platform.OS === 'web';

export function Card({ children, style, onPress, padded = true }: Props) {
  const { colors } = useTheme();
  const [hovered, setHovered] = useState(false);

  if (!onPress) {
    return (
      <View
        style={[
          styles.base,
          SHADOW.sm,
          {
            backgroundColor: colors.surface,
            padding: padded ? SPACING.lg : 0,
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={isWeb ? () => setHovered(true) : undefined}
      onHoverOut={isWeb ? () => setHovered(false) : undefined}
      style={({ pressed }: any) => [
        styles.base,
        SHADOW.sm,
        isWeb && ({ cursor: 'pointer', transitionDuration: '150ms' } as any),
        {
          backgroundColor: colors.surface,
          padding: padded ? SPACING.lg : 0,
          opacity: pressed ? 0.92 : 1,
          transform: [{ scale: hovered && !pressed ? 1.005 : 1 }],
        },
        hovered && !pressed && SHADOW.md,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.lg,
  },
});
