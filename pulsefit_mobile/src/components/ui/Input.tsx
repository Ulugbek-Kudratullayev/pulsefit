import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { RADIUS, SPACING, FONT_SIZE } from '@/constants/theme';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
}

export function Input({
  label,
  error,
  leftIcon,
  containerStyle,
  isPassword,
  ...rest
}: Props) {
  const { colors, isDark } = useTheme();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(!!isPassword);

  return (
    <View style={[styles.wrap, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      )}
      <View
        style={[
          styles.box,
          {
            backgroundColor: colors.surface,
            borderColor: error
              ? colors.error
              : focused
              ? colors.primary
              : colors.border,
          },
        ]}
      >
        {leftIcon && <View style={{ marginRight: SPACING.sm }}>{leftIcon}</View>}
        <TextInput
          {...rest}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          secureTextEntry={hidden}
          placeholderTextColor={colors.textTertiary}
          style={[
            styles.input,
            { color: colors.text, fontSize: FONT_SIZE.base },
            rest.style as any,
          ]}
        />
        {isPassword && (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
        )}
      </View>
      {error && <Text style={[styles.err, { color: colors.error }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%' },
  label: {
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    minHeight: 50,
  },
  input: { flex: 1, paddingVertical: SPACING.sm },
  err: { marginTop: SPACING.xs, fontSize: FONT_SIZE.xs },
});
