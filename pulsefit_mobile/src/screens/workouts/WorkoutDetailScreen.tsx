import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Screen } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { workoutsApi } from '@/api/workouts';
import { FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const [activeDay, setActiveDay] = useState(1);

  const { data: plan, isLoading } = useQuery({
    queryKey: ['workout-plan', id],
    queryFn: () => workoutsApi.planDetail(Number(id)),
    enabled: !!id,
  });

  if (isLoading || !plan) {
    return (
      <Screen>
        <Text style={{ color: colors.textSecondary }}>Yuklanmoqda...</Text>
      </Screen>
    );
  }

  const day = plan.days?.find((d) => d.day_number === activeDay) ?? plan.days?.[0];

  const startSession = async () => {
    try {
      const session = await workoutsApi.startSession(plan.id, activeDay);
      router.push(`/session/${session.id}`);
    } catch (e) {
      // ignore
    }
  };

  return (
    <Screen scroll padded={false}>
      <View style={styles.coverWrap}>
        {plan.cover_url ? (
          <Image source={{ uri: plan.cover_url }} style={styles.cover} />
        ) : (
          <View style={[styles.cover, { backgroundColor: colors.primary + '20' }]} />
        )}
        <Pressable
          onPress={() => router.back()}
          style={[styles.back, { backgroundColor: colors.surface }]}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
      </View>

      <View style={{ padding: SPACING.lg, gap: SPACING.lg }}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>{plan.name_uz}</Text>
          <Text style={{ color: colors.textSecondary, marginTop: 4 }}>
            {plan.total_days} kun • {plan.workouts_per_week}x/hafta •{' '}
            {plan.estimated_duration} daq/kun
          </Text>
        </View>

        {plan.description_uz && (
          <Text style={{ color: colors.text, lineHeight: 22 }}>
            {plan.description_uz}
          </Text>
        )}

        {/* Kunlar tabbar */}
        {plan.days && plan.days.length > 0 && (
          <View>
            <Text style={[styles.section, { color: colors.text }]}>Kunlar</Text>
            <View style={{ flexDirection: 'row', gap: SPACING.sm, flexWrap: 'wrap' }}>
              {plan.days.map((d) => (
                <Pressable
                  key={d.id}
                  onPress={() => setActiveDay(d.day_number)}
                  style={({ pressed }) => [
                    styles.dayChip,
                    {
                      backgroundColor:
                        activeDay === d.day_number
                          ? colors.primary
                          : colors.surfaceAlt,
                      opacity: pressed ? 0.85 : 1,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color:
                        activeDay === d.day_number ? '#fff' : colors.text,
                      fontWeight: '600',
                    }}
                  >
                    Kun {d.day_number}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Kunning mashqlari */}
        {day && (
          <View>
            <Text style={[styles.dayTitle, { color: colors.text }]}>
              {day.title_uz}
            </Text>
            <View style={{ gap: SPACING.md, marginTop: SPACING.md }}>
              {day.exercises.map((dex) => (
                <Card
                  key={dex.id}
                  onPress={() => router.push(`/exercise/${dex.exercise.id}`)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.md }}>
                    <View
                      style={[
                        styles.dexThumb,
                        { backgroundColor: dex.exercise.category.color + '20' },
                      ]}
                    >
                      <Ionicons
                        name="barbell"
                        size={24}
                        color={dex.exercise.category.color}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: colors.text, fontWeight: '600' }}>
                        {dex.exercise.name_uz}
                      </Text>
                      <Text style={{ color: colors.textSecondary, marginTop: 2 }}>
                        {dex.sets} set × {dex.reps} takror • {dex.rest_seconds}s dam
                      </Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          </View>
        )}

        <Button
          title="Mashqni boshlash"
          leftIcon={<Ionicons name="play" size={20} color="#fff" />}
          onPress={startSession}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  coverWrap: { position: 'relative' },
  cover: { width: '100%', height: 220 },
  back: {
    position: 'absolute',
    top: 50,
    left: SPACING.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: FONT_SIZE['2xl'], fontWeight: '700' },
  section: { fontSize: FONT_SIZE.lg, fontWeight: '700', marginBottom: SPACING.md },
  dayChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  dayTitle: { fontSize: FONT_SIZE.lg, fontWeight: '700' },
  dexThumb: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
