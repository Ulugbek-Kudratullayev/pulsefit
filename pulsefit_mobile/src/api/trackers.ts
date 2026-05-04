/** Trackers API. */
import api from '@/lib/axios';
import { WaterIntake, StepRecord, WeightLog } from '@/types';

export const trackersApi = {
  // WATER
  waterToday: async () => (await api.get<WaterIntake>('/trackers/water/today/')).data,
  waterAdd: async (amount_ml: number) =>
    (await api.post<WaterIntake>('/trackers/water/add/', { amount_ml })).data,
  waterHistory: async (from?: string, to?: string) =>
    (await api.get<WaterIntake[]>('/trackers/water/history/', { params: { from, to } })).data,

  // STEPS
  stepsToday: async () => (await api.get<StepRecord>('/trackers/steps/today/')).data,
  stepsHistory: async (days = 7) =>
    (await api.get<StepRecord[]>('/trackers/steps/', { params: { days } })).data,
  stepsSync: async (count: number, distance_km?: number, calories_burned?: number) =>
    (await api.post<StepRecord>('/trackers/steps/sync/', {
      count, distance_km, calories_burned,
    })).data,

  // WEIGHT
  weightList: async (days = 30) =>
    (await api.get<WeightLog[]>('/trackers/weight/', { params: { days } })).data,
  weightAdd: async (date: string, weight_kg: number, note?: string) =>
    (await api.post<WeightLog>('/trackers/weight/', { date, weight_kg, note })).data,
  weightLatest: async () =>
    (await api.get<WeightLog>('/trackers/weight/latest/')).data,
};
