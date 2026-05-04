import React, { useState, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Screen } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { storage, STORAGE_KEYS } from '@/lib/storage';
import { FONT_SIZE, SPACING } from '@/constants/theme';

const { width } = Dimensions.get('window');

const slides = [
  {
    icon: 'fitness',
    title: "Sog'lom hayot - sizning qo'lingizda",
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
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList>(null);

  const finish = () => {
    storage.set(STORAGE_KEYS.ONBOARDING_DONE, true);
    router.replace('/login');
  };

  const next = () => {
    if (index < slides.length - 1) {
      ref.current?.scrollToIndex({ index: index + 1 });
    } else {
      finish();
    }
  };

  return (
    <Screen padded={false}>
      <View style={{ flex: 1 }}>
        <FlatList
          ref={ref}
          data={slides}
          keyExtractor={(_, i) => String(i)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
          }}
          renderItem={({ item }) => (
            <View style={[styles.slide, { width }]}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: colors.primary + '15' },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={120}
                  color={colors.primary}
                />
              </View>
              <Text style={[styles.title, { color: colors.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.desc, { color: colors.textSecondary }]}>
                {item.desc}
              </Text>
            </View>
          )}
        />

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i === index ? colors.primary : colors.border,
                  width: i === index ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.bottom}>
          <Button
            title={index === slides.length - 1 ? 'Boshlash' : 'Keyingi'}
            onPress={next}
          />
          {index < slides.length - 1 && (
            <Button title="O'tkazib yuborish" variant="ghost" onPress={finish} />
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING['2xl'],
  },
  iconBox: {
    width: 220,
    height: 220,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING['2xl'],
  },
  title: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  desc: {
    fontSize: FONT_SIZE.base,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
    marginVertical: SPACING.xl,
  },
  dot: { height: 8, borderRadius: 4 },
  bottom: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
});
