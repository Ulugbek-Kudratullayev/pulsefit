import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ActivityIndicator, View } from 'react-native';

import '@/lib/i18n';
import { useAuthStore } from '@/stores/authStore';
import { useTheme } from '@/hooks/useTheme';
import { storage, STORAGE_KEYS } from '@/lib/storage';

if (Platform.OS !== 'web') {
  require('react-native-gesture-handler');
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

function RootNavigator() {
  const { isAuthenticated, isLoading, user, bootstrap } = useAuthStore();
  const { colors } = useTheme();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    bootstrap().catch(() => {});
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const seg0 = segments[0] ?? '';
    const inAuth = seg0 === 'login' || seg0 === 'register';
    const inOnboarding = seg0 === 'onboarding' || seg0 === 'profile-setup';
    let onboardingDone = false;
    try {
      onboardingDone = storage.getBoolean(STORAGE_KEYS.ONBOARDING_DONE) ?? false;
    } catch {}

    if (!onboardingDone && seg0 !== 'onboarding') {
      router.replace('/onboarding');
      return;
    }
    if (!isAuthenticated && !inAuth && seg0 !== 'onboarding') {
      router.replace('/login');
      return;
    }
    if (
      isAuthenticated &&
      user &&
      !user.profile?.onboarding_completed &&
      !inOnboarding
    ) {
      router.replace('/profile-setup');
      return;
    }
    if (isAuthenticated && (inAuth || seg0 === 'onboarding')) {
      router.replace('/(tabs)');
    }
  }, [isLoading, isAuthenticated, user, segments]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="profile-setup" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="exercise/[id]" />
      <Stack.Screen name="workout/[id]" />
      <Stack.Screen name="session/[id]" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
