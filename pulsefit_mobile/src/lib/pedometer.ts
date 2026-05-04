/** Universal pedometer wrapper — web'da yo'q. */
import { Platform } from 'react-native';

export interface PedometerSubscription {
  remove(): void;
}

export interface PedometerResult {
  steps: number;
}

export async function isAvailable(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  try {
    const { Pedometer } = await import('expo-sensors');
    return await Pedometer.isAvailableAsync();
  } catch {
    return false;
  }
}

export async function getStepsToday(): Promise<number | null> {
  if (Platform.OS === 'web') return null;
  try {
    const { Pedometer } = await import('expo-sensors');
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const result = await Pedometer.getStepCountAsync(start, new Date());
    return result?.steps ?? 0;
  } catch {
    return null;
  }
}

export async function watchSteps(
  onUpdate: (result: PedometerResult) => void
): Promise<PedometerSubscription | null> {
  if (Platform.OS === 'web') return null;
  try {
    const { Pedometer } = await import('expo-sensors');
    return Pedometer.watchStepCount(onUpdate);
  } catch {
    return null;
  }
}
