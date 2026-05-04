import React, { useState } from 'react';
import { Alert, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Input, ProgressBar } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { mealsApi } from '@/api/meals';
import { FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';
import { FoodItem, MealType } from '@/types';

const MEAL_TYPES: { key: MealType; label: string; icon: any }[] = [
  { key: 'breakfast', label: 'Nonushta', icon: 'sunny' },
  { key: 'lunch', label: 'Tushlik', icon: 'restaurant' },
  { key: 'dinner', label: 'Kechki', icon: 'moon' },
  { key: 'snack', label: 'Yengil', icon: 'cafe' },
];

export function MealsTracker() {
  const { colors } = useTheme();
  const qc = useQueryClient();

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerType, setPickerType] = useState<MealType>('breakfast');
  const [search, setSearch] = useState('');

  const { data: today } = useQuery({
    queryKey: ['meals', 'today'],
    queryFn: mealsApi.today,
  });

  const { data: foods } = useQuery({
    queryKey: ['foods', search],
    queryFn: () => mealsApi.foods(search || undefined),
    enabled: pickerOpen,
  });

  const add = useMutation({
    mutationFn: (food: FoodItem) =>
      mealsApi.add({
        food_item: food.id,
        date: new Date().toISOString().slice(0, 10),
        meal_type: pickerType,
        name: food.name_uz,
        portion_size: food.default_portion,
        calories: (food.calories * food.default_portion) / 100,
        protein: (food.protein * food.default_portion) / 100,
        carbs: (food.carbs * food.default_portion) / 100,
        fat: (food.fat * food.default_portion) / 100,
        source: 'database',
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['meals'] });
      setPickerOpen(false);
      setSearch('');
    },
    onError: () => Alert.alert('Xatolik', 'Taom qo\'shishda muammo'),
  });

  const grouped = MEAL_TYPES.map((mt) => ({
    ...mt,
    entries: today?.entries?.filter((e) => e.meal_type === mt.key) ?? [],
  }));

  const totals = today?.totals ?? { calories: 0, protein: 0, carbs: 0, fat: 0 };
  const goal = today?.goal_calories ?? 2000;
  const pct = goal ? Math.round((totals.calories / goal) * 100) : 0;

  return (
    <>
      <ScrollView contentContainerStyle={{ padding: SPACING.lg, gap: SPACING.lg }}>
        <Card>
          <Text style={[styles.section, { color: colors.text }]}>
            Kunlik xulosa
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
            <Text style={{ fontSize: FONT_SIZE['3xl'], fontWeight: '700', color: colors.text }}>
              {Math.round(totals.calories)}
            </Text>
            <Text style={{ color: colors.textSecondary }}>
              / {goal} kkal
            </Text>
          </View>
          <ProgressBar progress={pct} color={colors.primary} height={8} />
          <View style={styles.macros}>
            <Macro label="Oqsil" value={totals.protein} unit="g" color="#3B82F6" />
            <Macro label="Uglevod" value={totals.carbs} unit="g" color="#F59E0B" />
            <Macro label="Yog'" value={totals.fat} unit="g" color="#EF4444" />
          </View>
        </Card>

        {grouped.map((g) => (
          <View key={g.key}>
            <View style={styles.mealHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.sm }}>
                <Ionicons name={g.icon} size={20} color={colors.primary} />
                <Text style={{ color: colors.text, fontWeight: '700', fontSize: FONT_SIZE.base }}>
                  {g.label}
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  setPickerType(g.key);
                  setPickerOpen(true);
                }}
              >
                <Ionicons name="add-circle" size={28} color={colors.primary} />
              </Pressable>
            </View>
            {g.entries.length === 0 ? (
              <Text style={{ color: colors.textTertiary, fontStyle: 'italic' }}>
                Yozuv yo'q
              </Text>
            ) : (
              <Card>
                {g.entries.map((e, i) => (
                  <View
                    key={e.id}
                    style={[
                      styles.entry,
                      i < g.entries.length - 1 && {
                        borderBottomColor: colors.border,
                        borderBottomWidth: 1,
                      },
                    ]}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: colors.text, fontWeight: '500' }}>
                        {e.name}
                      </Text>
                      <Text style={{ color: colors.textSecondary, fontSize: FONT_SIZE.xs }}>
                        {e.portion_size}g
                      </Text>
                    </View>
                    <Text style={{ color: colors.primary, fontWeight: '600' }}>
                      {Math.round(e.calories)} kkal
                    </Text>
                  </View>
                ))}
              </Card>
            )}
          </View>
        ))}
      </ScrollView>

      <Modal visible={pickerOpen} animationType="slide">
        <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: 50 }}>
          <View style={{ paddingHorizontal: SPACING.lg, gap: SPACING.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[styles.section, { color: colors.text }]}>Taom tanlang</Text>
              <Pressable onPress={() => setPickerOpen(false)}>
                <Ionicons name="close" size={28} color={colors.text} />
              </Pressable>
            </View>
            <Input
              placeholder="Qidirish (osh, manti, banan...)"
              value={search}
              onChangeText={setSearch}
              leftIcon={<Ionicons name="search" size={20} color={colors.textSecondary} />}
            />
          </View>
          <FlatList
            data={foods?.results ?? []}
            keyExtractor={(it) => String(it.id)}
            contentContainerStyle={{ padding: SPACING.lg, gap: SPACING.sm }}
            renderItem={({ item }) => (
              <Card onPress={() => add.mutate(item)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.text, fontWeight: '600' }}>
                      {item.name_uz}
                    </Text>
                    <Text style={{ color: colors.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 }}>
                      {item.calories} kkal / 100g • Standart: {item.default_portion}g
                    </Text>
                  </View>
                  <Text style={{ color: colors.primary, fontWeight: '700' }}>
                    {Math.round((item.calories * item.default_portion) / 100)} kkal
                  </Text>
                </View>
              </Card>
            )}
          />
        </View>
      </Modal>
    </>
  );
}

function Macro({ label, value, unit, color }: any) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: colors.textSecondary, fontSize: FONT_SIZE.xs }}>{label}</Text>
      <Text style={{ color, fontWeight: '700', fontSize: FONT_SIZE.lg }}>
        {Math.round(value)}{unit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { fontSize: FONT_SIZE.lg, fontWeight: '700', marginBottom: SPACING.md },
  macros: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    gap: SPACING.md,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
});
