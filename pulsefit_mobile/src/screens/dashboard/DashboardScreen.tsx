import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { Card, ProgressBar, Screen } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/authStore';
import { trackersApi } from '@/api/trackers';
import { mealsApi } from '@/api/meals';
import { statsApi } from '@/api/stats';
import { FONT_SIZE, SPACING } from '@/constants/theme';

export default function DashboardScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const { data: water } = useQuery({
    queryKey: ['water', 'today'],
    queryFn: trackersApi.waterToday,
  });
  const { data: steps } = useQuery({
    queryKey: ['steps', 'today'],
    queryFn: trackersApi.stepsToday,
  });
  const { data: meals } = useQuery({
    queryKey: ['meals', 'today'],
    queryFn: mealsApi.today,
  });
  const { data: overview } = useQuery({
    queryKey: ['stats', 'overview'],
    queryFn: statsApi.overview,
  });

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Xayrli tong';
    if (h < 18) return 'Xayrli kun';
    return 'Xayrli kech';
  })();

  return (
    <Screen scroll>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            {greeting},
          </Text>
          <Text style={[styles.name, { color: colors.text }]}>
            {user?.full_name || user?.email?.split('@')[0]}
          </Text>
        </View>
        <View
          style={[
            styles.streakBadge,
            { backgroundColor: colors.primary + '15' },
          ]}
        >
          <Ionicons name="flame" size={20} color={colors.primary} />
          <Text style={{ color: colors.primary, fontWeight: '700' }}>
            {overview?.current_streak_days ?? 0}
          </Text>
        </View>
      </View>

      {/* Today's Progress — Bento layout */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Bugungi natijangiz
      </Text>

      <View style={styles.grid}>
        {/* Suv */}
        <Card style={[styles.gridItem, { backgroundColor: colors.info + '10' }]}>
          <View style={styles.iconRow}>
            <Ionicons name="water" size={28} color={colors.info} />
            <Text style={[styles.tinyLabel, { color: colors.info }]}>
              {water?.progress_percent ?? 0}%
            </Text>
          </View>
          <Text style={[styles.value, { color: colors.text }]}>
            {water?.total_ml ?? 0}
          </Text>
          <Text style={[styles.unit, { color: colors.textSecondary }]}>
            / {water?.goal_ml ?? 2500} ml
          </Text>
          <ProgressBar
            progress={water?.progress_percent ?? 0}
            color={colors.info}
            height={4}
          />
        </Card>

        {/* Qadam */}
        <Card style={styles.gridItem}>
          <View style={styles.iconRow}>
            <Ionicons name="walk" size={28} color={colors.success} />
            <Text style={[styles.tinyLabel, { color: colors.success }]}>
              {steps?.progress_percent ?? 0}%
            </Text>
          </View>
          <Text style={[styles.value, { color: colors.text }]}>
            {steps?.count?.toLocaleString() ?? 0}
          </Text>
          <Text style={[styles.unit, { color: colors.textSecondary }]}>
            qadam
          </Text>
          <ProgressBar
            progress={steps?.progress_percent ?? 0}
            color={colors.success}
            height={4}
          />
        </Card>

        {/* Kaloriya */}
        <Card style={[styles.gridItem, { backgroundColor: colors.primary + '10' }]}>
          <View style={styles.iconRow}>
            <Ionicons name="flame" size={28} color={colors.primary} />
          </View>
          <Text style={[styles.value, { color: colors.text }]}>
            {Math.round(meals?.totals?.calories ?? 0)}
          </Text>
          <Text style={[styles.unit, { color: colors.textSecondary }]}>
            / {meals?.goal_calories ?? 2000} kkal
          </Text>
          <ProgressBar
            progress={
              meals?.goal_calories
                ? Math.round(
                    ((meals?.totals?.calories ?? 0) / meals.goal_calories) * 100
                  )
                : 0
            }
            color={colors.primary}
            height={4}
          />
        </Card>

        {/* Vazn */}
        <Card style={styles.gridItem}>
          <View style={styles.iconRow}>
            <Ionicons name="scale" size={28} color={colors.secondary} />
          </View>
          <Text style={[styles.value, { color: colors.text }]}>
            {overview?.current_weight ?? user?.profile.weight ?? '—'}
          </Text>
          <Text style={[styles.unit, { color: colors.textSecondary }]}>kg</Text>
          {overview?.weight_change_total != null && (
            <Text
              style={{
                color:
                  overview.weight_change_total < 0
                    ? colors.success
                    : colors.warning,
                fontSize: FONT_SIZE.xs,
                marginTop: 4,
              }}
            >
              {overview.weight_change_total > 0 ? '+' : ''}
              {overview.weight_change_total} kg
            </Text>
          )}
        </Card>
      </View>

      {/* Quick actions */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Tezkor amallar
      </Text>

      <Card onPress={() => router.push('/(tabs)/workouts')} style={styles.actionRow}>
        <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
          <Ionicons name="play" size={24} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.actionTitle, { color: colors.text }]}>
            Mashqni boshlash
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: FONT_SIZE.sm }}>
            Tayyor dasturlardan tanlang
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
      </Card>

      <Card
        onPress={() => router.push('/(tabs)/trackers')}
        style={[styles.actionRow, { marginTop: SPACING.md }]}
      >
        <View style={[styles.actionIcon, { backgroundColor: colors.secondary }]}>
          <Ionicons name="add" size={24} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.actionTitle, { color: colors.text }]}>
            Yozuv qo'shish
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: FONT_SIZE.sm }}>
            Suv, taom, vazn
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
      </Card>

      <View style={{ height: SPACING['2xl'] }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  greeting: { fontSize: FONT_SIZE.base },
  name: { fontSize: FONT_SIZE['2xl'], fontWeight: '700' },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    marginBottom: SPACING.md,
    marginTop: SPACING.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  gridItem: {
    flexBasis: '47%',
    flexGrow: 1,
    gap: 4,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  tinyLabel: { fontSize: FONT_SIZE.xs, fontWeight: '700' },
  value: { fontSize: FONT_SIZE['2xl'], fontWeight: '700' },
  unit: { fontSize: FONT_SIZE.sm, marginBottom: SPACING.xs },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: { fontSize: FONT_SIZE.base, fontWeight: '600' },
});
