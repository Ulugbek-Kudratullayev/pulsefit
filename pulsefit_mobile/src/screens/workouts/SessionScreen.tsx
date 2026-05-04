import React, { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, ProgressBar, Screen } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { workoutsApi } from '@/api/workouts';
import { FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';

function fmt(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function SessionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const qc = useQueryClient();

  const [elapsed, setElapsed] = useState(0); // jami sekund
  const [resting, setResting] = useState(false);
  const [restRemain, setRestRemain] = useState(0);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [setIdx, setSetIdx] = useState(0);
  const [completed, setCompleted] = useState<number[][]>([]); // har bir mashq uchun setlar
  const [submitting, setSubmitting] = useState(false);

  // Sessiya tafsilotlari (plan + exercises)
  const { data: session } = useQuery({
    queryKey: ['session', id],
    queryFn: async () => {
      // session detail
      const all = await workoutsApi.sessions();
      return all.results.find((s) => s.id === Number(id));
    },
    enabled: !!id,
  });

  const { data: plan } = useQuery({
    queryKey: ['workout-plan', session?.plan],
    queryFn: () => workoutsApi.planDetail(session!.plan!),
    enabled: !!session?.plan,
  });

  const day = plan?.days?.find(
    (d) => d.day_number === session?.plan_day_number
  ) ?? plan?.days?.[0];
  const exercises = day?.exercises ?? [];
  const currentDex = exercises[exerciseIdx];

  // Asosiy timer
  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Rest timer
  useEffect(() => {
    if (!resting) return;
    if (restRemain <= 0) {
      setResting(false);
      return;
    }
    const t = setTimeout(() => setRestRemain((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [resting, restRemain]);

  if (!session || !plan || !currentDex) {
    return (
      <Screen>
        <Text style={{ color: colors.textSecondary }}>Yuklanmoqda...</Text>
      </Screen>
    );
  }

  const ex = currentDex.exercise;
  const totalSets = currentDex.sets;
  const totalExercises = exercises.length;

  const completeSet = () => {
    const newCompleted = [...completed];
    if (!newCompleted[exerciseIdx]) newCompleted[exerciseIdx] = [];
    newCompleted[exerciseIdx][setIdx] = currentDex.reps;
    setCompleted(newCompleted);

    if (setIdx + 1 < totalSets) {
      setSetIdx((s) => s + 1);
      setRestRemain(currentDex.rest_seconds);
      setResting(true);
    } else {
      // Keyingi mashqqa
      if (exerciseIdx + 1 < totalExercises) {
        setExerciseIdx((i) => i + 1);
        setSetIdx(0);
        setRestRemain(currentDex.rest_seconds);
        setResting(true);
      } else {
        finishSession();
      }
    }
  };

  const skipExercise = () => {
    if (exerciseIdx + 1 < totalExercises) {
      setExerciseIdx((i) => i + 1);
      setSetIdx(0);
    } else {
      finishSession();
    }
  };

  const finishSession = async () => {
    setSubmitting(true);
    const calories = Math.round((elapsed / 60) * (ex.calories_per_minute || 5));
    try {
      await workoutsApi.completeSession(session.id, {
        duration_seconds: elapsed,
        calories_burned: calories,
        exercises: exercises.map((dex, i) => ({
          exercise: dex.exercise.id,
          sets_completed: completed[i]?.length ?? 0,
          reps_per_set: completed[i] ?? [],
          order: i,
        })),
      });
      qc.invalidateQueries({ queryKey: ['stats'] });
      qc.invalidateQueries({ queryKey: ['workout-sessions'] });
      Alert.alert(
        'Tabriklayman! 🎉',
        `Mashq tugadi: ${fmt(elapsed)}\nYoqilgan: ~${calories} kkal`,
        [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
      );
    } catch (e) {
      Alert.alert('Xatolik', "Sessiyani saqlashda muammo");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      {/* Top stats */}
      <View style={styles.topRow}>
        <Pressable onPress={() => Alert.alert('Sessiyani tugatish?', '', [
          { text: 'Bekor', style: 'cancel' },
          { text: 'Ha', onPress: finishSession },
        ])}>
          <Ionicons name="close" size={28} color={colors.text} />
        </Pressable>
        <Text style={[styles.elapsed, { color: colors.text }]}>{fmt(elapsed)}</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Progress */}
      <View style={{ marginVertical: SPACING.lg }}>
        <Text style={{ color: colors.textSecondary, marginBottom: SPACING.xs }}>
          Mashq {exerciseIdx + 1} / {totalExercises}
        </Text>
        <ProgressBar
          progress={((exerciseIdx) / totalExercises) * 100}
          height={6}
        />
      </View>

      {resting ? (
        <View style={[styles.restBox, { backgroundColor: colors.info + '15' }]}>
          <Ionicons name="time" size={48} color={colors.info} />
          <Text style={[styles.restTitle, { color: colors.text }]}>Dam oling</Text>
          <Text style={[styles.restTime, { color: colors.info }]}>
            {fmt(restRemain)}
          </Text>
          <Button
            title="Davom etish"
            variant="ghost"
            onPress={() => {
              setResting(false);
              setRestRemain(0);
            }}
          />
        </View>
      ) : (
        <Card style={{ alignItems: 'center', padding: SPACING.xl }}>
          <View
            style={[
              styles.exIcon,
              { backgroundColor: ex.category.color + '20' },
            ]}
          >
            <Ionicons name="barbell" size={64} color={ex.category.color} />
          </View>
          <Text style={[styles.exName, { color: colors.text }]}>
            {ex.name_uz}
          </Text>
          <Text style={{ color: colors.textSecondary, marginTop: 4 }}>
            Set {setIdx + 1} / {totalSets}
          </Text>
          <Text style={[styles.repsBig, { color: colors.primary }]}>
            {currentDex.reps}
          </Text>
          <Text style={{ color: colors.textSecondary }}>takror</Text>

          <Button
            title="Setni tugatdim"
            onPress={completeSet}
            style={{ marginTop: SPACING.xl }}
          />
          <Button
            title="Mashqni o'tkazib yuborish"
            variant="ghost"
            onPress={skipExercise}
          />
        </Card>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  elapsed: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  restBox: {
    padding: SPACING['2xl'],
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    gap: SPACING.md,
  },
  restTitle: { fontSize: FONT_SIZE.xl, fontWeight: '700' },
  restTime: {
    fontSize: 64,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  exIcon: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  exName: { fontSize: FONT_SIZE.xl, fontWeight: '700', textAlign: 'center' },
  repsBig: { fontSize: 72, fontWeight: '700', marginTop: SPACING.lg },
});
