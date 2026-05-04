import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { Card, Screen } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { exercisesApi } from '@/api/exercises';
import { FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const { data: ex, isLoading } = useQuery({
    queryKey: ['exercise', id],
    queryFn: () => exercisesApi.detail(Number(id)),
    enabled: !!id,
  });

  if (isLoading || !ex) {
    return (
      <Screen>
        <Text style={{ color: colors.textSecondary }}>Yuklanmoqda...</Text>
      </Screen>
    );
  }

  return (
    <Screen scroll padded={false}>
      {/* Header */}
      <View style={[styles.imageBox, { backgroundColor: ex.category.color + '20' }]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.back, { backgroundColor: colors.surface }]}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        {ex.media_url ? (
          <Image source={{ uri: ex.media_url }} style={styles.image} resizeMode="contain" />
        ) : (
          <Ionicons name="barbell" size={120} color={ex.category.color} />
        )}
      </View>

      <View style={{ padding: SPACING.lg, gap: SPACING.lg }}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>{ex.name_uz}</Text>
          <Text style={{ color: colors.textSecondary, marginTop: 4 }}>
            {ex.category.name_uz} • {ex.difficulty === 'beginner' ? 'Boshlang\'ich' : ex.difficulty === 'intermediate' ? 'O\'rta' : 'Yuqori'}
          </Text>
        </View>

        {/* Stats */}
        <Card>
          <View style={styles.statRow}>
            <Stat label="Set" value={ex.default_sets.toString()} icon="repeat" color={colors.primary} />
            <Stat label="Takror" value={ex.default_reps.toString()} icon="refresh" color={colors.secondary} />
            <Stat
              label="Vaqt"
              value={ex.duration_seconds ? `${ex.duration_seconds}s` : '—'}
              icon="time"
              color={colors.info}
            />
            <Stat
              label="Kkal/min"
              value={ex.calories_per_minute.toFixed(1)}
              icon="flame"
              color={colors.warning}
            />
          </View>
        </Card>

        {ex.description_uz && (
          <View>
            <Text style={[styles.section, { color: colors.text }]}>Tavsif</Text>
            <Text style={{ color: colors.textSecondary, lineHeight: 22 }}>
              {ex.description_uz}
            </Text>
          </View>
        )}

        {ex.instructions_list_uz && ex.instructions_list_uz.length > 0 && (
          <View>
            <Text style={[styles.section, { color: colors.text }]}>
              Bajarish ko'rsatmasi
            </Text>
            {ex.instructions_list_uz.map((line, i) => (
              <View key={i} style={styles.instrRow}>
                <View style={[styles.numCircle, { backgroundColor: colors.primary }]}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>{i + 1}</Text>
                </View>
                <Text style={{ color: colors.text, flex: 1, lineHeight: 22 }}>
                  {line}
                </Text>
              </View>
            ))}
          </View>
        )}

        {ex.tips_uz && (
          <Card style={{ backgroundColor: colors.warning + '10' }}>
            <View style={{ flexDirection: 'row', gap: SPACING.sm }}>
              <Ionicons name="bulb" size={24} color={colors.warning} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text, fontWeight: '600', marginBottom: 4 }}>
                  Maslahat
                </Text>
                <Text style={{ color: colors.textSecondary }}>{ex.tips_uz}</Text>
              </View>
            </View>
          </Card>
        )}

        {ex.muscle_groups_list && ex.muscle_groups_list.length > 0 && (
          <View>
            <Text style={[styles.section, { color: colors.text }]}>
              Mushak guruhlari
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm }}>
              {ex.muscle_groups_list.map((m) => (
                <View
                  key={m}
                  style={{
                    backgroundColor: colors.primary + '15',
                    paddingHorizontal: SPACING.md,
                    paddingVertical: SPACING.sm,
                    borderRadius: RADIUS.full,
                  }}
                >
                  <Text style={{ color: colors.primary, fontWeight: '500' }}>{m}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
}

function Stat({ label, value, icon, color }: any) {
  const { colors } = useTheme();
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Ionicons name={icon} size={20} color={color} />
      <Text style={{ color: colors.text, fontWeight: '700', marginTop: 4, fontSize: FONT_SIZE.lg }}>
        {value}
      </Text>
      <Text style={{ color: colors.textTertiary, fontSize: FONT_SIZE.xs }}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
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
  image: { width: '100%', height: '100%' },
  title: { fontSize: FONT_SIZE['2xl'], fontWeight: '700' },
  statRow: { flexDirection: 'row', justifyContent: 'space-around' },
  section: { fontSize: FONT_SIZE.lg, fontWeight: '700', marginBottom: SPACING.md },
  instrRow: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.md },
  numCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
