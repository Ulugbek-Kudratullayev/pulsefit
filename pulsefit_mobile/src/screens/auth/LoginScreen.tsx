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

const schema = z.object({
  email: z.string().email("Email noto'g'ri"),
  password: z.string().min(6, 'Parol kamida 6 belgi'),
});

type FormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await login(data);
      router.replace('/(tabs)');
    } catch (e: any) {
      const msg =
        e?.response?.data?.detail || "Email yoki parol noto'g'ri";
      Alert.alert('Xatolik', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Xush kelibsiz!
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          PulseFit'ga kiring
        </Text>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Email"
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
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

        <Button
          title="Kirish"
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />

        <View style={styles.footer}>
          <Text style={{ color: colors.textSecondary }}>
            Akkauntingiz yo'qmi?{' '}
          </Text>
          <Link href="/register">
            <Text style={{ color: colors.primary, fontWeight: '600' }}>
              Ro'yxatdan o'ting
            </Text>
          </Link>
        </View>

        <View style={styles.demoInfo}>
          <Text style={[styles.demoText, { color: colors.textTertiary }]}>
            Demo: demo@pulsefit.uz / demo12345
          </Text>
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
  demoInfo: { alignItems: 'center', marginTop: SPACING.xl },
  demoText: { fontSize: FONT_SIZE.xs, fontStyle: 'italic' },
});
