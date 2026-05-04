import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Card, Input, Screen } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import { FONT_SIZE, SPACING } from '@/constants/theme';
import { authApi } from '@/api/auth';
import { useAuthStore } from '@/stores/authStore';
import { Goal, Gender, ActivityLevel } from '@/types';

const GOALS: { value: Goal; label: string; icon: string }[] = [
  { value: 'lose', label: "Vazn yo'qotish", icon: '📉' },
  { value: 'gain', label: 'Vazn oshirish', icon: '📈' },
  { value: 'maintain', label: 'Vaznni saqlash', icon: '⚖️' },
  { value: 'endurance', label: 'Chidamlilik', icon: '⚡' },
];

const ACTIVITIES: { value: ActivityLevel; label: string }[] = [
  { value: 'sedentary', label: 'Past — kam harakat' },
  { value: 'light', label: "Engil — haftada 1-3 marta" },
  { value: 'moderate', label: "O'rta — haftada 3-5 marta" },
  { value: 'active', label: 'Yuqori — har kuni' },
];

export default function ProfileSetupScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const refetchUser = useAuthStore((s) => s.refetchUser);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [gender, setGender] = useState<Gender | ''>('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [goal, setGoal] = useState<Goal | ''>('');
  const [activity, setActivity] = useState<ActivityLevel | ''>('');

  const finish = async () => {
    setLoading(true);
    try {
      await authApi.updateProfile({
        age: age ? parseInt(age) : null,
        gender,
        height: height ? parseFloat(height) : null,
        weight: weight ? parseFloat(weight) : null,
        target_weight: targetWeight ? parseFloat(targetWeight) : null,
        goal,
        activity_level: activity,
        onboarding_completed: true,
      });
      await refetchUser();
      router.replace('/(tabs)');
    } catch (e) {
      Alert.alert('Xatolik', "Profilni saqlashda muammo yuzaga keldi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll>
      <Text style={[styles.title, { color: colors.text }]}>
        Profilingizni sozlang
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Sizga mos dasturlarni tavsiya qilamiz
      </Text>

      <Text style={[styles.step, { color: colors.textTertiary }]}>
        Qadam {step} / 4
      </Text>

      {step === 1 && (
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>Jinsingiz</Text>
          <View style={{ flexDirection: 'row', gap: SPACING.md }}>
            {(['male', 'female'] as const).map((g) => (
              <Card
                key={g}
                style={[
                  { flex: 1 },
                  gender === g && { borderWidth: 2, borderColor: colors.primary },
                ]}
                onPress={() => setGender(g)}
              >
                <Text style={{ textAlign: 'center', fontSize: 40 }}>
                  {g === 'male' ? '👨' : '👩'}
                </Text>
                <Text style={{ textAlign: 'center', color: colors.text, marginTop: 8 }}>
                  {g === 'male' ? 'Erkak' : 'Ayol'}
                </Text>
              </Card>
            ))}
          </View>
          <Button
            title="Keyingi"
            disabled={!gender}
            onPress={() => setStep(2)}
            style={{ marginTop: SPACING.xl }}
          />
        </View>
      )}

      {step === 2 && (
        <View style={styles.section}>
          <Input
            label="Yoshingiz"
            placeholder="22"
            keyboardType="number-pad"
            value={age}
            onChangeText={setAge}
          />
          <Input
            label="Bo'yingiz (sm)"
            placeholder="178"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <Input
            label="Joriy vazn (kg)"
            placeholder="75"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <Button
            title="Keyingi"
            disabled={!age || !height || !weight}
            onPress={() => setStep(3)}
          />
          <Button title="Orqaga" variant="ghost" onPress={() => setStep(1)} />
        </View>
      )}

      {step === 3 && (
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>
            Maqsadingiz?
          </Text>
          <View style={{ gap: SPACING.md }}>
            {GOALS.map((g) => (
              <Card
                key={g.value}
                style={
                  goal === g.value
                    ? { borderWidth: 2, borderColor: colors.primary }
                    : undefined
                }
                onPress={() => setGoal(g.value)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.md }}>
                  <Text style={{ fontSize: 30 }}>{g.icon}</Text>
                  <Text style={{ color: colors.text, fontSize: FONT_SIZE.base, fontWeight: '500' }}>
                    {g.label}
                  </Text>
                </View>
              </Card>
            ))}
          </View>
          {(goal === 'lose' || goal === 'gain') && (
            <Input
              label="Maqsadli vazn (kg)"
              placeholder="72"
              keyboardType="numeric"
              value={targetWeight}
              onChangeText={setTargetWeight}
              containerStyle={{ marginTop: SPACING.md }}
            />
          )}
          <Button
            title="Keyingi"
            disabled={!goal}
            onPress={() => setStep(4)}
            style={{ marginTop: SPACING.xl }}
          />
          <Button title="Orqaga" variant="ghost" onPress={() => setStep(2)} />
        </View>
      )}

      {step === 4 && (
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>
            Aktivlik darajangiz?
          </Text>
          <View style={{ gap: SPACING.md }}>
            {ACTIVITIES.map((a) => (
              <Card
                key={a.value}
                style={
                  activity === a.value
                    ? { borderWidth: 2, borderColor: colors.primary }
                    : undefined
                }
                onPress={() => setActivity(a.value)}
              >
                <Text style={{ color: colors.text, fontSize: FONT_SIZE.base }}>
                  {a.label}
                </Text>
              </Card>
            ))}
          </View>
          <Button
            title="Tugatish"
            disabled={!activity}
            loading={loading}
            onPress={finish}
            style={{ marginTop: SPACING.xl }}
          />
          <Button title="Orqaga" variant="ghost" onPress={() => setStep(3)} />
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: FONT_SIZE['3xl'], fontWeight: '700', marginTop: SPACING.lg },
  subtitle: { fontSize: FONT_SIZE.base, marginTop: SPACING.xs },
  step: { fontSize: FONT_SIZE.sm, marginTop: SPACING.lg },
  section: { marginTop: SPACING.xl, gap: SPACING.lg },
  label: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
});
