/** Universal haptic feedback — web'da hech narsa qilmaydi. */
import { Platform } from 'react-native';

export async function selection(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    const Haptics = await import('expo-haptics');
    await Haptics.selectionAsync();
  } catch {}
}

export async function impact(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    const Haptics = await import('expo-haptics');
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch {}
}
