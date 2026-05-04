/** Exercises API. */
import api from '@/lib/axios';
import { Exercise, ExerciseCategory } from '@/types';

export const exercisesApi = {
  list: async (params?: { category?: number; difficulty?: string; search?: string }) => {
    const { data } = await api.get<{ results: Exercise[]; count: number }>(
      '/exercises/',
      { params }
    );
    return data;
  },
  detail: async (id: number) => {
    const { data } = await api.get<Exercise>(`/exercises/${id}/`);
    return data;
  },
  categories: async () => {
    const { data } = await api.get<ExerciseCategory[]>('/exercises/categories/');
    return data;
  },
};
