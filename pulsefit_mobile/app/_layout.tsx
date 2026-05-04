import React, { useEffect, useState } from 'react';
import { Platform, ActivityIndicator, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/lib/i18n';
import { useAuthStore } from '@/stores/authStore';
import { useTheme, useThemeBootstrap } from '@/hooks/useTheme';
import { storage, STORAGE_KEYS } from '@/lib/storage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

// Native: GestureHandler, Web: oddiy View
const RootContainer: React.ComponentType<{ children: React.ReactNode; style?: any }> =
  Platform.OS === 'web'
    ? ({ children, style }) => <View style={style}>{children}</View>
    : (() => {
        require('react-native-gesture-handler');
        return require('react-native-gesture-handler').GestureHandlerRootView;
      })();

function RootNavigator() {
  const { isAuthenticated, isLoading, user, bootstrap } = useAuthStore();
  const { colors } = useTheme();
  const router = useRouter();
  const segments = useSegments();
  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState(false);

  useThemeBootstrap();

  useEffect(() => {
    bootstrap().catch(() => {});
    storage
      .getBool(STORAGE_KEYS.ONBOARDING_DONE)
      .then((done) => {
        setOnboardingDone(!!done);
        setOnboardingChecked(true);
      })
      .catch(() => setOnboardingChecked(true));
  }, []);

  useEffect(() => {
    if (isLoading || !onboardingChecked) return;
    const seg0 = segments[0] ?? '';
    const inAuth = seg0 === 'login' || seg0 === 'register';
    const inOnboarding = seg0 === 'onboarding' || seg0 === 'profile-setup';

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
  }, [isLoading, isAuthenticated, user, segments, onboardingChecked, onboardingDone]);

  if (isLoading || !onboardingChecked) {
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
    <Stack screenOptions={{ headerShown: false }}>
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
    <RootContainer style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </RootContainer>
  );
}
