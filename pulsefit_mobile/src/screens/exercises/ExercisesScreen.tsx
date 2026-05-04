import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { Card, Input, Screen } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { exercisesApi } from '@/api/exercises';
import { FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';
import { Exercise } from '@/types';

export default function ExercisesScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const { data: categories } = useQuery({
    queryKey: ['exercise-categories'],
    queryFn: exercisesApi.categories,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['exercises', { activeCategory, search }],
    queryFn: () =>
      exercisesApi.list({
        category: activeCategory ?? undefined,
        search: search || undefined,
      }),
  });

  const exercises: Exercise[] = data?.results ?? [];

  return (
    <Screen padded={false}>
      <View style={{ paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg }}>
        <Text style={[styles.title, { color: colors.text }]}>Mashqlar</Text>
        <Input
          placeholder="Mashq qidirish..."
          value={search}
          onChangeText={setSearch}
          leftIcon={
            <Ionicons name="search" size={20} color={colors.textSecondary} />
          }
          containerStyle={{ marginTop: SPACING.md }}
        />
      </View>

      {/* Kategoriyalar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SPACING.lg,
          paddingVertical: SPACING.md,
          gap: SPACING.sm,
        }}
      >
        <CategoryChip
          label="Barchasi"
          color={colors.primary}
          active={activeCategory === null}
          onPress={() => setActiveCategory(null)}
        />
        {categories?.map((c) => (
          <CategoryChip
            key={c.id}
            label={c.name_uz}
            color={c.color}
            active={activeCategory === c.id}
            onPress={() => setActiveCategory(c.id)}
          />
        ))}
      </ScrollView>

      {/* Ro'yxat */}
      <FlatList
        data={exercises}
        keyExtractor={(it) => String(it.id)}
        contentContainerStyle={{ paddingHorizontal: SPACING.lg, paddingBottom: SPACING['2xl'] }}
        ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
        renderItem={({ item }) => (
          <Card onPress={() => router.push(`/exercise/${item.id}`)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.md }}>
              <View
                style={[
                  styles.thumb,
                  { backgroundColor: item.category.color + '20' },
                ]}
              >
                <Ionicons
                  name="barbell"
                  size={32}
                  color={item.category.color}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
                  {item.name_uz}
                </Text>
                <View style={{ flexDirection: 'row', gap: SPACING.sm, marginTop: 4 }}>
                  <Badge label={item.category.name_uz} color={item.category.color} />
                  <Badge
                    label={
                      item.difficulty === 'beginner'
                        ? 'Boshlang\'ich'
                        : item.difficulty === 'intermediate'
                        ? 'O\'rta'
                        : 'Yuqori'
                    }
                    color={colors.textSecondary}
                  />
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
            </View>
          </Card>
        )}
        ListEmptyComponent={
          !isLoading ? (
            <View style={{ alignItems: 'center', paddingTop: SPACING['2xl'] }}>
              <Ionicons name="search-outline" size={48} color={colors.textTertiary} />
              <Text style={{ color: colors.textSecondary, marginTop: SPACING.md }}>
                Hech narsa topilmadi
              </Text>
            </View>
          ) : null
        }
      />
    </Screen>
  );
}

function CategoryChip({
  label,
  color,
  active,
  onPress,
}: {
  label: string;
  color: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: active ? color : color + '15',
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Text
        style={{
          color: active ? '#fff' : color,
          fontWeight: '600',
          fontSize: FONT_SIZE.sm,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <View
      style={{
        backgroundColor: color + '15',
        paddingHorizontal: SPACING.sm,
        paddingVertical: 2,
        borderRadius: RADIUS.sm,
      }}
    >
      <Text style={{ color, fontSize: FONT_SIZE.xs, fontWeight: '500' }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: FONT_SIZE['2xl'], fontWeight: '700' },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: FONT_SIZE.base, fontWeight: '600' },
});
