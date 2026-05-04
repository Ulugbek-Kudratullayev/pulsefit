import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';
import { WaterTracker } from './WaterTracker';
import { StepsTracker } from './StepsTracker';
import { WeightTracker } from './WeightTracker';
import { MealsTracker } from './MealsTracker';

type Tab = 'water' | 'steps' | 'weight' | 'meals';

const TABS: { key: Tab; label: string; icon: any }[] = [
  { key: 'water', label: 'Suv', icon: 'water' },
  { key: 'steps', label: 'Qadam', icon: 'walk' },
  { key: 'weight', label: 'Vazn', icon: 'scale' },
  { key: 'meals', label: 'Taom', icon: 'restaurant' },
];

export default function TrackersScreen() {
  const { colors } = useTheme();
  const [tab, setTab] = useState<Tab>('water');

  return (
    <Screen padded={false}>
      <View style={{ paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg }}>
        <Text style={[styles.title, { color: colors.text }]}>Trackerlar</Text>
      </View>

      <View style={styles.tabs}>
        {TABS.map((t) => (
          <Pressable
            key={t.key}
            onPress={() => setTab(t.key)}
            style={({ pressed }) => [
              styles.tab,
              {
                backgroundColor:
                  tab === t.key ? colors.primary : colors.surface,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <Text
              style={{
                color: tab === t.key ? '#fff' : colors.text,
                fontWeight: '600',
                fontSize: FONT_SIZE.sm,
              }}
            >
              {t.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ flex: 1 }}>
        {tab === 'water' && <WaterTracker />}
        {tab === 'steps' && <StepsTracker />}
        {tab === 'weight' && <WeightTracker />}
        {tab === 'meals' && <MealsTracker />}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: FONT_SIZE['2xl'], fontWeight: '700' },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.full,
    alignItems: 'center',
  },
});
