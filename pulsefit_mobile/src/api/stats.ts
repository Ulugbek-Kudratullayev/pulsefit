/** Stats API. */
import api from '@/lib/axios';
import { Achievement, StatsOverview, WeeklyDay } from '@/types';

export const statsApi = {
  overview: async () => (await api.get<StatsOverview>('/stats/overview/')).data,
  weekly: async () =>
    (await api.get<{ from: string; to: string; days: WeeklyDay[] }>('/stats/weekly/')).data,
  achievements: async () =>
    (await api.get<{ unlocked_count: number; total_count: number; achievements: Achievement[] }>(
      '/stats/achievements/'
    )).data,
};
