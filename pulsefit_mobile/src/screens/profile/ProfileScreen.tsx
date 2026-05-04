import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card, Screen } from '@/components/ui';
import { useTheme, useThemeStore } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/authStore';
import { statsApi } from '@/api/stats';
import { FONT_SIZE, RADIUS, SPACING } from '@/constants/theme';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const themeMode = useThemeStore((s) => s.mode);
  const setThemeMode = useThemeStore((s) => s.setMode);

  const { data: overview } = useQuery({
    queryKey: ['stats', 'overview'],
    queryFn: statsApi.overview,
  });

  const { data: ach } = useQuery({
    queryKey: ['stats', 'achievements'],
    queryFn: statsApi.achievements,
  });

  const handleLogout = () => {
    Alert.alert("Chiqish", "Akkauntdan chiqishni xohlaysizmi?", [
      { text: 'Bekor', style: 'cancel' },
      { text: 'Chiqish', style: 'destructive', onPress: () => logout() },
    ]);
  };

  return (
    <Screen scroll>
      {/* Header */}
      <View style={{ alignItems: 'center', gap: SPACING.md }}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: colors.primary + '20' },
          ]}
        >
          <Text style={{ fontSize: 36, fontWeight: '700', color: colors.primary }}>
            {(user?.full_name || user?.email || '?').charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.name, { color: colors.text }]}>
            {user?.full_name || 'Foydalanuvchi'}
          </Text>
          <Text style={{ color: colors.textSecondary }}>{user?.email}</Text>
        </View>
      </View>

      {/* Statistika */}
      <View style={[styles.statsRow, { marginTop: SPACING.xl }]}>
        <StatBox label="Mashqlar" value={overview?.total_sessions ?? 0} />
        <StatBox label="Streak" value={`${overview?.current_streak_days ?? 0} kun`} />
        <StatBox label="Yutuqlar" value={`${ach?.unlocked_count ?? 0}/${ach?.total_count ?? 0}`} />
      </View>

      {/* Yutuqlar */}
      {ach && ach.achievements.length > 0 && (
        <View style={{ marginTop: SPACING.xl }}>
          <Text style={[styles.section, { color: colors.text }]}>Yutuqlar</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm }}>
            {ach.achievements.map((a) => (
              <View
                key={a.id}
                style={[
                  styles.achBadge,
                  {
                    backgroundColor: a.unlocked
                      ? colors.primary + '15'
                      : colors.surfaceAlt,
                    opacity: a.unlocked ? 1 : 0.5,
                  },
                ]}
              >
                <Text style={{ fontSize: 24 }}>{a.icon}</Text>
                <Text
                  style={{
                    color: colors.text,
                    fontSize: FONT_SIZE.xs,
                    textAlign: 'center',
                    marginTop: 4,
                    fontWeight: '600',
                  }}
                >
                  {a.title}
                </Text>
                {!a.unlocked && (
                  <Text style={{ color: colors.textTertiary, fontSize: 10, marginTop: 2 }}>
                    {a.progress}/{a.target}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Sozlamalar */}
      <Text style={[styles.section, { color: colors.text, marginTop: SPACING.xl }]}>
        Sozlamalar
      </Text>

      <Card padded={false}>
        <Row icon="person-outline" label="Profilni tahrirlash" onPress={() => router.push('/profile-setup')} />
        <Divider />
        <Row icon="moon-outline" label="Mavzu">
          <View style={{ flexDirection: 'row', gap: SPACING.xs }}>
            {(['light', 'dark', 'system'] as const).map((m) => (
              <Pressable
                key={m}
                onPress={() => setThemeMode(m)}
                style={{
                  paddingHorizontal: SPACING.sm,
                  paddingVertical: 4,
                  borderRadius: RADIUS.sm,
                  backgroundColor:
                    themeMode === m ? colors.primary : 'transparent',
                }}
              >
                <Text
                  style={{
                    color: themeMode === m ? '#fff' : colors.textSecondary,
                    fontSize: FONT_SIZE.xs,
                    fontWeight: '600',
                  }}
                >
                  {m === 'light' ? 'Yorug\'' : m === 'dark' ? 'Qorong\'i' : 'Tizim'}
                </Text>
              </Pressable>
            ))}
          </View>
        </Row>
        <Divider />
        <Row icon="notifications-outline" label="Bildirishnomalar" />
        <Divider />
        <Row icon="information-circle-outline" label="Ilova haqida">
          <Text style={{ color: colors.textTertiary, fontSize: FONT_SIZE.xs }}>
            v1.0.0
          </Text>
        </Row>
        <Divider />
        <Row
          icon="log-out-outline"
          label="Chiqish"
          color={colors.error}
          onPress={handleLogout}
        />
      </Card>

      <View style={{ height: SPACING['2xl'] }} />
    </Screen>
  );
}

function StatBox({ label, value }: { label: string; value: any }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        padding: SPACING.md,
        borderRadius: RADIUS.lg,
        alignItems: 'center',
      }}
    >
      <Text style={{ color: colors.text, fontWeight: '700', fontSize: FONT_SIZE.lg }}>
        {value}
      </Text>
      <Text style={{ color: colors.textSecondary, fontSize: FONT_SIZE.xs, marginTop: 2 }}>
        {label}
      </Text>
    </View>
  );
}

function Row({
  icon,
  label,
  onPress,
  color,
  children,
}: {
  icon: any;
  label: string;
  onPress?: () => void;
  color?: string;
  children?: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { opacity: pressed && onPress ? 0.7 : 1 },
      ]}
    >
      <Ionicons name={icon} size={22} color={color || colors.text} />
      <Text style={{ flex: 1, color: color || colors.text, marginLeft: SPACING.md }}>
        {label}
      </Text>
      {children ? children : onPress && (
        <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
      )}
    </Pressable>
  );
}

function Divider() {
  const { colors } = useTheme();
  return <View style={{ height: 1, backgroundColor: colors.border, marginLeft: 50 }} />;
}

const styles = StyleSheet.create({
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: FONT_SIZE['xl'], fontWeight: '700' },
  statsRow: { flexDirection: 'row', gap: SPACING.sm },
  section: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  achBadge: {
    flexBasis: '30%',
    flexGrow: 1,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md + 2,
  },
});
