import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/hooks/useTheme';
import { SPACING } from '@/constants/theme';

interface Props {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export function Screen({
  children,
  scroll = false,
  padded = true,
  style,
  edges = ['top', 'left', 'right'],
}: Props) {
  const { colors, isDark } = useTheme();

  const Container: any = scroll ? ScrollView : View;
  const containerProps = scroll
    ? {
        contentContainerStyle: [
          padded && { padding: SPACING.lg },
          { flexGrow: 1 },
          style,
        ],
        showsVerticalScrollIndicator: false,
        keyboardShouldPersistTaps: 'handled' as const,
      }
    : { style: [styles.flex, padded && { padding: SPACING.lg }, style] };

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.flex, { backgroundColor: colors.background }]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <Container {...containerProps}>{children}</Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ flex: { flex: 1 } });
