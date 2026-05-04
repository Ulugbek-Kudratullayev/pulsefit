import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
  useWindowDimensions,
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
  maxWidth?: number;
}

const DEFAULT_MAX_WIDTH = 480;

export function Screen({
  children,
  scroll = false,
  padded = true,
  style,
  edges = ['top', 'left', 'right'],
  maxWidth = DEFAULT_MAX_WIDTH,
}: Props) {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();

  // Web desktop'da kontentni markazlashtir + max-width berib qo'yamiz
  const isWebDesktop = Platform.OS === 'web' && width > maxWidth;
  const sidePad = isWebDesktop ? Math.max((width - maxWidth) / 2, 0) : 0;
  const innerPad = padded ? SPACING.lg : 0;

  const content = scroll ? (
    <ScrollView
      contentContainerStyle={[
        {
          flexGrow: 1,
          paddingTop: innerPad,
          paddingBottom: innerPad,
          paddingLeft: innerPad + sidePad,
          paddingRight: innerPad + sidePad,
        },
        style,
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.flex,
        {
          paddingTop: innerPad,
          paddingBottom: innerPad,
          paddingLeft: innerPad + sidePad,
          paddingRight: innerPad + sidePad,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

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
        {content}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ flex: { flex: 1 } });
