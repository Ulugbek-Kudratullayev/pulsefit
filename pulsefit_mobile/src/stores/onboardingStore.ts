/** Onboarding holati — Zustand global state. */
import { create } from 'zustand';
import { storage, STORAGE_KEYS } from '@/lib/storage';

interface OnboardingState {
  done: boolean;
  checked: boolean;
  load: () => Promise<void>;
  complete: () => Promise<void>;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  done: false,
  checked: false,
  load: async () => {
    try {
      const v = await storage.getBool(STORAGE_KEYS.ONBOARDING_DONE);
      set({ done: !!v, checked: true });
    } catch {
      set({ checked: true });
    }
  },
  complete: async () => {
    try {
      await storage.setBool(STORAGE_KEYS.ONBOARDING_DONE, true);
    } catch {}
    set({ done: true });
  },
}));
