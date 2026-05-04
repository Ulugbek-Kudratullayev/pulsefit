import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Screen } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { useOnboardingStore } from '@/stores/onboardingStore';
import { FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';

interface Slide {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
}

const slides: Slide[] = [
  {
    icon: 'fitness',
    title: "Sog'lom hayot — qo'lingizda",
    desc: 'Har kuni bir oz harakat — katta natijalar uchun',
  },
  {
    icon: 'barbell',
    title: '100+ mashqlar va dasturlar',
    desc: "Boshlovchidan tortib professional darajagacha",
  },
  {
    icon: 'analytics',
    title: 'Progressingizni kuzatib boring',
    desc: "Suv, qadam, vazn va kaloriya — hammasi bir joyda",
  },
];

export default function OnboardingScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isWide = isWeb && width > 768;

  const [index, setIndex] = useState(0);
  const fade = useRef(new Animated.Value(1)).current;
  const slideY = useRef(new Animated.Value(0)).current;

  // Slide o'zgartirilganda fade + slight slide animation
  const goTo = (next: number) => {
    if (next < 0 || next >= slides.length) return;
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: !isWeb,
      }),
      Animated.timing(slideY, {
        toValue: -16,
        duration: 180,
        useNativeDriver: !isWeb,
      }),
    ]).start(() => {
      setIndex(next);
      slideY.setValue(16);
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 280,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: !isWeb,
        }),
        Animated.timing(slideY, {
          toValue: 0,
          duration: 280,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: !isWeb,
        }),
      ]).start();
    });
  };

  const completeOnboarding = useOnboardingStore((s) => s.complete);

  const finish = async () => {
    await completeOnboarding();
    router.replace('/login');
  };

  const next = () => {
    if (index < slides.length - 1) {
      goTo(index + 1);
    } else {
      finish();
    }
  };

  const prev = () => {
    if (index > 0) goTo(index - 1);
  };

  const slide = slides[index];
  const iconSize = isWide ? 160 : 120;
  const iconBoxSize = isWide ? 280 : 220;

  return (
    <Screen padded={false}>
      <View style={styles.container}>
        {/* Skip tugmasi */}
        <View style={styles.topBar}>
          {index > 0 ? (
            <Pressable
              onPress={prev}
              hitSlop={10}
              style={({ pressed }) => [
                styles.iconBtn,
                { backgroundColor: colors.surface, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Ionicons name="chevron-back" size={20} color={colors.text} />
            </Pressable>
          ) : (
            <View style={{ width: 40 }} />
          )}
          {index < slides.length - 1 ? (
            <Pressable onPress={finish} hitSlop={10}>
              <Text style={{ color: colors.textSecondary, fontWeight: '600' }}>
                O'tkazib yuborish
              </Text>
            </Pressable>
          ) : (
            <View style={{ width: 40 }} />
          )}
        </View>

        {/* Slide content */}
        <Animated.View
          style={[
            styles.slide,
            {
              opacity: fade,
              transform: [{ translateY: slideY }],
            },
          ]}
        >
          <View
            style={[
              styles.iconBox,
              {
                width: iconBoxSize,
                height: iconBoxSize,
                borderRadius: iconBoxSize / 2,
                backgroundColor: colors.primary + '15',
              },
            ]}
          >
            <Ionicons name={slide.icon} size={iconSize} color={colors.primary} />
          </View>

          <Text
            style={[
              styles.title,
              { color: colors.text, fontSize: isWide ? FONT_SIZE['3xl'] : FONT_SIZE['2xl'] },
            ]}
          >
            {slide.title}
          </Text>

          <Text
            style={[
              styles.desc,
              { color: colors.textSecondary, fontSize: isWide ? FONT_SIZE.lg : FONT_SIZE.base },
            ]}
          >
            {slide.desc}
          </Text>
        </Animated.View>

        {/* Dots */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <Pressable
              key={i}
              onPress={() => goTo(i)}
              hitSlop={8}
              style={[
                styles.dot,
                {
                  backgroundColor: i === index ? colors.primary : colors.border,
                  width: i === index ? 28 : 8,
                },
              ]}
            />
          ))}
        </View>

        {/* Bottom button */}
        <View style={styles.bottom}>
          <Button
            title={index === slides.length - 1 ? 'Boshlash' : 'Keyingi'}
            onPress={next}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    maxWidth: 560,
    alignSelf: 'center',
    width: '100%',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.lg,
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
  },
  desc: {
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginVertical: SPACING.lg,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  bottom: {
    width: '100%',
  },
});
