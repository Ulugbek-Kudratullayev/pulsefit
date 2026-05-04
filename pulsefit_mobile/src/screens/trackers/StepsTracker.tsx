import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as pedometer from '@/lib/pedometer';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, ProgressBar } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { trackersApi } from '@/api/trackers';
import { FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';

export function StepsTracker() {
  const { colors } = useTheme();
  const qc = useQueryClient();
  const [pedoSteps, setPedoSteps] = useState<number | null>(null);
  const [available, setAvailable] = useState(false);

  const { data: today } = useQuery({
    queryKey: ['steps', 'today'],
    queryFn: trackersApi.stepsToday,
  });

  const { data: history } = useQuery({
    queryKey: ['steps', 'history', 7],
    queryFn: () => trackersApi.stepsHistory(7),
  });

  const sync = useMutation({
    mutationFn: (count: number) => trackersApi.stepsSync(count),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['steps'] }),
  });

  useEffect(() => {
    let sub: pedometer.PedometerSubscription | null = null;
    let cancelled = false;
    (async () => {
      const ok = await pedometer.isAvailable();
      if (cancelled) return;
      setAvailable(ok);
      if (!ok) return;
      const steps = await pedometer.getStepsToday();
      if (steps != null && !cancelled) setPedoSteps(steps);
      sub = await pedometer.watchSteps((r) => {
        setPedoSteps((s) => (s ?? 0) + r.steps);
      });
    })();
    return () => {
      cancelled = true;
      sub?.remove();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: SPACING.lg, gap: SPACING.lg }}>
      <Card style={{ alignItems: 'center', padding: SPACING.xl }}>
        <View style={[styles.circle, { backgroundColor: colors.success + '15' }]}>
          <Ionicons name="walk" size={64} color={colors.success} />
        </View>
        <Text style={[styles.bigVal, { color: colors.text }]}>
          {(pedoSteps ?? today?.count ?? 0).toLocaleString()}
        </Text>
        <Text style={{ color: colors.textSecondary }}>
          / {today?.goal ?? 8000} qadam
        </Text>
        <ProgressBar
          progress={today?.progress_percent ?? 0}
          color={colors.success}
          height={10}
        />
        <View style={styles.metaRow}>
          <Meta
            icon="map"
            label={`${today?.distance_km?.toFixed(2) ?? '0'} km`}
          />
          <Meta
            icon="flame"
            label={`${today?.calories_burned ?? 0} kkal`}
          />
        </View>
        {pedoSteps != null && (
          <Button
            title="Sinxronlash"
            variant="ghost"
            onPress={() => sync.mutate(pedoSteps)}
            style={{ marginTop: SPACING.md }}
          />
        )}
        {!available && (
          <Text
            style={{
              color: colors.warning,
              fontSize: FONT_SIZE.xs,
              marginTop: SPACING.sm,
            }}
          >
            Pedometer mavjud emas — qo'lda kiritish mumkin
          </Text>
        )}
      </Card>

      {history && history.length > 0 && (
        <View>
          <Text style={[styles.section, { color: colors.text }]}>
            Oxirgi 7 kun
          </Text>
          <Card>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: SPACING.sm, height: 140 }}>
              {history.slice(0, 7).reverse().map((d, i) => {
                const max = Math.max(...history.map((x) => x.count), 8000);
                const h = Math.max(8, (d.count / max) * 120);
                return (
                  <View key={d.id} style={{ flex: 1, alignItems: 'center' }}>
                    <View
                      style={{
                        width: '70%',
                        height: h,
                        backgroundColor: colors.success,
                        borderRadius: 6,
                      }}
                    />
                    <Text style={{ color: colors.textSecondary, fontSize: 10, marginTop: 4 }}>
                      {new Date(d.date).getDate()}
                    </Text>
                  </View>
                );
              })}
            </View>
          </Card>
        </View>
      )}
    </ScrollView>
  );
}

function Meta({ icon, label }: any) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Ionicons name={icon} size={16} color={colors.textSecondary} />
      <Text style={{ color: colors.textSecondary }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  bigVal: { fontSize: 48, fontWeight: '700' },
  section: { fontSize: FONT_SIZE.lg, fontWeight: '700', marginBottom: SPACING.md },
  metaRow: {
    flexDirection: 'row',
    gap: SPACING.xl,
    marginTop: SPACING.md,
  },
});
