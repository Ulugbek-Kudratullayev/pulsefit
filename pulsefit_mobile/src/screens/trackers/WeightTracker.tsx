import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Input } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { trackersApi } from '@/api/trackers';
import { useAuthStore } from '@/stores/authStore';
import { FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';

function bmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: 'Vazn kam', color: '#3B82F6' };
  if (bmi < 25) return { label: 'Norma', color: '#10B981' };
  if (bmi < 30) return { label: 'Ortiqcha', color: '#F59E0B' };
  return { label: 'Semizlik', color: '#EF4444' };
}

export function WeightTracker() {
  const { colors } = useTheme();
  const qc = useQueryClient();
  const refetchUser = useAuthStore((s) => s.refetchUser);
  const user = useAuthStore((s) => s.user);

  const [modal, setModal] = useState(false);
  const [weight, setWeight] = useState('');
  const [note, setNote] = useState('');

  const { data: list } = useQuery({
    queryKey: ['weight', 'history'],
    queryFn: () => trackersApi.weightList(30),
  });

  const add = useMutation({
    mutationFn: () =>
      trackersApi.weightAdd(
        new Date().toISOString().slice(0, 10),
        parseFloat(weight),
        note
      ),
    onSuccess: async () => {
      qc.invalidateQueries({ queryKey: ['weight'] });
      qc.invalidateQueries({ queryKey: ['stats'] });
      await refetchUser();
      setModal(false);
      setWeight('');
      setNote('');
    },
    onError: () => Alert.alert('Xatolik', 'Vaznni saqlashda muammo'),
  });

  const latest = list?.[0]?.weight_kg ?? user?.profile.weight ?? 0;
  const profile = user?.profile;
  const bmi = profile?.bmi ?? null;
  const cat = bmi ? bmiCategory(bmi) : null;

  return (
    <ScrollView contentContainerStyle={{ padding: SPACING.lg, gap: SPACING.lg }}>
      <Card style={{ alignItems: 'center', padding: SPACING.xl }}>
        <View style={[styles.circle, { backgroundColor: colors.secondary + '15' }]}>
          <Ionicons name="scale" size={64} color={colors.secondary} />
        </View>
        <Text style={[styles.bigVal, { color: colors.text }]}>
          {latest || '—'}
        </Text>
        <Text style={{ color: colors.textSecondary }}>kg</Text>
        {profile?.target_weight && (
          <Text style={{ color: colors.primary, marginTop: SPACING.sm }}>
            Maqsad: {profile.target_weight} kg
          </Text>
        )}
        <Button
          title="Yozuv qo'shish"
          onPress={() => setModal(true)}
          style={{ marginTop: SPACING.lg }}
        />
      </Card>

      {bmi && cat && (
        <Card>
          <Text style={[styles.section, { color: colors.text }]}>BMI</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.lg }}>
            <Text style={{ fontSize: 48, fontWeight: '700', color: cat.color }}>
              {bmi}
            </Text>
            <View>
              <Text style={{ color: cat.color, fontWeight: '600', fontSize: FONT_SIZE.lg }}>
                {cat.label}
              </Text>
              <Text style={{ color: colors.textSecondary, marginTop: 4 }}>
                Tana massa indeksi
              </Text>
            </View>
          </View>
        </Card>
      )}

      {list && list.length > 0 && (
        <View>
          <Text style={[styles.section, { color: colors.text }]}>Tarix</Text>
          <Card>
            {list.slice(0, 10).map((w, i) => (
              <View
                key={w.id}
                style={[
                  styles.entry,
                  i < list.length - 1 && {
                    borderBottomColor: colors.border,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                <Ionicons name="scale-outline" size={20} color={colors.secondary} />
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.text, fontWeight: '600' }}>
                    {w.weight_kg} kg
                  </Text>
                  <Text style={{ color: colors.textSecondary, fontSize: FONT_SIZE.xs }}>
                    {new Date(w.date).toLocaleDateString('uz')}
                  </Text>
                </View>
                {w.note && (
                  <Text style={{ color: colors.textTertiary, fontSize: FONT_SIZE.xs }}>
                    {w.note}
                  </Text>
                )}
              </View>
            ))}
          </Card>
        </View>
      )}

      <Modal visible={modal} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.section, { color: colors.text }]}>
              Yangi vazn yozuvi
            </Text>
            <Input
              label="Vazn (kg)"
              placeholder="75.5"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
            <Input
              label="Eslatma (ixtiyoriy)"
              placeholder="..."
              value={note}
              onChangeText={setNote}
              containerStyle={{ marginTop: SPACING.md }}
            />
            <View style={{ gap: SPACING.md, marginTop: SPACING.lg }}>
              <Button
                title="Saqlash"
                loading={add.isPending}
                disabled={!weight}
                onPress={() => add.mutate()}
              />
              <Button
                title="Bekor qilish"
                variant="ghost"
                onPress={() => setModal(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    padding: SPACING.xl,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
  },
});
