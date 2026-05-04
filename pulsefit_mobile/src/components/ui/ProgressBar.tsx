import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { RADIUS } from '@/constants/theme';

interface Props {
  progress: number; // 0..100
  height?: number;
  color?: string;
}

export function ProgressBar({ progress, height = 8, color }: Props) {
  const { colors } = useTheme();
  const pct = Math.max(0, Math.min(100, progress));
  return (
    <View
      style={[
        styles.bg,
        { backgroundColor: colors.border, height, borderRadius: height / 2 },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${pct}%`,
            backgroundColor: color || colors.primary,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { width: '100%', overflow: 'hidden' },
  fill: { height: '100%' },
});
