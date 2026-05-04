import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, ProgressBar } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { trackersApi } from '@/api/trackers';
import { FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';

const QUICK = [200, 300, 500, 750];

export function WaterTracker() {
  const { colors } = useTheme();
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: ['water', 'today'],
    queryFn: trackersApi.waterToday,
  });

  const add = useMutation({
    mutationFn: (ml: number) => trackersApi.waterAdd(ml),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['water'] });
    },
  });

  return (
    <ScrollView contentContainerStyle={{ padding: SPACING.lg, gap: SPACING.lg }}>
      <Card style={{ alignItems: 'center', padding: SPACING.xl }}>
        <View
          style={[
            styles.glass,
            { backgroundColor: colors.info + '15' },
          ]}
        >
          <Ionicons name="water" size={64} color={colors.info} />
        </View>
        <Text style={[styles.bigVal, { color: colors.text }]}>
          {data?.total_ml ?? 0}
        </Text>
        <Text style={{ color: colors.textSecondary }}>
          / {data?.goal_ml ?? 2500} ml
        </Text>
        <ProgressBar
          progress={data?.progress_percent ?? 0}
          color={colors.info}
          height={10}
        />
        <Text style={{ color: colors.info, fontWeight: '700', marginTop: SPACING.sm }}>
          {data?.progress_percent ?? 0}%
        </Text>
      </Card>

      <View>
        <Text style={[styles.section, { color: colors.text }]}>
          Tez qo'shish
        </Text>
        <View style={styles.quickGrid}>
          {QUICK.map((ml) => (
            <Card
              key={ml}
              onPress={() => add.mutate(ml)}
              style={styles.quickItem}
            >
              <Ionicons name="water" size={28} color={colors.info} />
              <Text style={{ color: colors.text, fontWeight: '700', marginTop: 4 }}>
                {ml}
              </Text>
              <Text style={{ color: colors.textSecondary, fontSize: FONT_SIZE.xs }}>
                ml
              </Text>
            </Card>
          ))}
        </View>
      </View>

      {data?.entries && data.entries.length > 0 && (
        <View>
          <Text style={[styles.section, { color: colors.text }]}>
            Bugungi yozuvlar
          </Text>
          <Card>
            {data.entries.map((e, i) => (
              <View
                key={e.id}
                style={[
                  styles.entryRow,
                  i < data.entries.length - 1 && {
                    borderBottomColor: colors.border,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <Ionicons name="water" size={20} color={colors.info} />
                <Text style={{ flex: 1, color: colors.text, marginLeft: SPACING.sm }}>
                  {e.amount_ml} ml
                </Text>
                <Text style={{ color: colors.textSecondary, fontSize: FONT_SIZE.xs }}>
                  {new Date(e.time).toLocaleTimeString('uz', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
            ))}
          </Card>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  glass: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  bigVal: { fontSize: 48, fontWeight: '700' },
  section: { fontSize: FONT_SIZE.lg, fontWeight: '700', marginBottom: SPACING.md },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md },
  quickItem: {
    flexBasis: '47%',
    flexGrow: 1,
    alignItems: 'center',
  },
  entryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
});
