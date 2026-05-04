import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Screen } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { FONT_SIZE, SPACING } from '@/constants/theme';
import { useAuthStore } from '@/stores/authStore';

const schema = z
  .object({
    full_name: z.string().min(2, 'Ism kiriting'),
    email: z.string().email("Email noto'g'ri"),
    password: z.string().min(6, 'Kamida 6 belgi'),
    password_confirm: z.string().min(6),
  })
  .refine((d) => d.password === d.password_confirm, {
    message: 'Parollar mos kelmadi',
    path: ['password_confirm'],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { full_name: '', email: '', password: '', password_confirm: '' },
  });

  const translateError = (msg: string): string => {
    const t: Record<string, string> = {
      'This password is too common.': 'Bu parol juda oddiy. Murakkabroq parol tanlang.',
      'This password is too short. It must contain at least 6 characters.':
        'Parol juda qisqa. Kamida 6 ta belgi bo\'lsin.',
      'This password is entirely numeric.': 'Parol faqat raqamlardan iborat bo\'la olmaydi.',
      'user with this email already exists.':
        'Bu email allaqachon ro\'yxatdan o\'tgan.',
      'Enter a valid email address.': 'To\'g\'ri email kiriting.',
    };
    return t[msg] || msg;
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await register(data);
      router.replace('/(tabs)');
    } catch (e: any) {
      const errors = e?.response?.data;
      const messages: string[] = [];
      if (errors && typeof errors === 'object') {
        for (const [_field, value] of Object.entries(errors)) {
          if (Array.isArray(value)) {
            value.forEach((m) => messages.push(translateError(String(m))));
          } else if (typeof value === 'string') {
            messages.push(translateError(value));
          }
        }
      }
      const msg = messages.length > 0
        ? messages.join('\n')
        : "Ro'yxatdan o'tishda xatolik";
      Alert.alert('Xatolik', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Yangi akkaunt
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          PulseFit oilasiga qo'shiling
        </Text>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="full_name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Ism"
              placeholder="Ismingiz"
              value={value}
              onChangeText={onChange}
              error={errors.full_name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Email"
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Parol"
              placeholder="••••••••"
              isPassword
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password_confirm"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Parolni tasdiqlang"
              placeholder="••••••••"
              isPassword
              value={value}
              onChangeText={onChange}
              error={errors.password_confirm?.message}
            />
          )}
        />

        <Button
          title="Ro'yxatdan o'tish"
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />

        <View style={styles.footer}>
          <Text style={{ color: colors.textSecondary }}>
            Akkauntingiz bormi?{' '}
          </Text>
          <Link href="/login">
            <Text style={{ color: colors.primary, fontWeight: '600' }}>Kiring</Text>
          </Link>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: SPACING['2xl'], marginBottom: SPACING['2xl'] },
  title: { fontSize: FONT_SIZE['3xl'], fontWeight: '700' },
  subtitle: { fontSize: FONT_SIZE.lg, marginTop: SPACING.xs },
  form: { gap: SPACING.lg },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
});
