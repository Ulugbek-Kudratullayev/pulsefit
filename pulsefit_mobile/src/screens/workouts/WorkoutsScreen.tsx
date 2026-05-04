import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { Card, Screen } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { workoutsApi } from '@/api/workouts';
import { FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';

const LEVEL_LABEL: Record<string, string> = {
  beginner: "Boshlang'ich",
  intermediate: "O'rta",
  advanced: 'Yuqori',
};
const GOAL_LABEL: Record<string, string> = {
  lose: "Vazn yo'qotish",
  gain: 'Vazn oshirish',
  maintain: 'Saqlash',
  endurance: 'Chidamlilik',
};

export default function WorkoutsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ['workout-plans'],
    queryFn: () => workoutsApi.plans(),
  });

  return (
    <Screen padded={false}>
      <View style={{ paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg }}>
        <Text style={[styles.title, { color: colors.text }]}>Dasturlar</Text>
        <Text style={{ color: colors.textSecondary, marginTop: 4 }}>
          Sizga mos dasturni tanlang
        </Text>
      </View>

      <FlatList
        data={data?.results ?? []}
        keyExtractor={(it) => String(it.id)}
        contentContainerStyle={{
          padding: SPACING.lg,
          paddingBottom: SPACING['2xl'],
          gap: SPACING.md,
        }}
        renderItem={({ item }) => (
          <Card padded={false} onPress={() => router.push(`/workout/${item.id}`)}>
            <View>
              {item.cover_url ? (
                <Image source={{ uri: item.cover_url }} style={styles.cover} />
              ) : (
                <View style={[styles.cover, { backgroundColor: colors.primary + '20' }]}>
                  <Ionicons name="fitness" size={64} color={colors.primary} />
                </View>
              )}
              <View
                style={[
                  styles.badge,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: FONT_SIZE.xs }}>
                  {LEVEL_LABEL[item.level]}
                </Text>
              </View>
            </View>
            <View style={{ padding: SPACING.lg }}>
              <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
                {item.name_uz}
              </Text>
              <View style={styles.metaRow}>
                <Meta icon="calendar" text={`${item.total_days} kun`} />
                <Meta icon="time" text={`${item.estimated_duration} daq/kun`} />
                <Meta icon="repeat" text={`${item.workouts_per_week}x/hafta`} />
              </View>
              <View style={[styles.goalBadge, { backgroundColor: colors.secondary + '15' }]}>
                <Text style={{ color: colors.secondary, fontSize: FONT_SIZE.xs, fontWeight: '600' }}>
                  {GOAL_LABEL[item.target_goal]}
                </Text>
              </View>
            </View>
          </Card>
        )}
      />
    </Screen>
  );
}

function Meta({ icon, text }: { icon: any; text: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Ionicons name={icon} size={14} color={colors.textSecondary} />
      <Text style={{ color: colors.textSecondary, fontSize: FONT_SIZE.xs }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: FONT_SIZE['2xl'], fontWeight: '700' },
  cover: { width: '100%', height: 160, alignItems: 'center', justifyContent: 'center' },
  badge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  name: { fontSize: FONT_SIZE.lg, fontWeight: '700' },
  metaRow: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginTop: SPACING.sm,
  },
  goalBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginTop: SPACING.sm,
  },
});
