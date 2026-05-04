/** Workouts API. */
import api from '@/lib/axios';
import { WorkoutPlan, WorkoutSession } from '@/types';

export const workoutsApi = {
  plans: async (params?: { level?: string; target_goal?: string }) => {
    const { data } = await api.get<{ results: WorkoutPlan[]; count: number }>(
      '/workouts/plans/',
      { params }
    );
    return data;
  },
  planDetail: async (id: number) => {
    const { data } = await api.get<WorkoutPlan>(`/workouts/plans/${id}/`);
    return data;
  },
  sessions: async () => {
    const { data } = await api.get<{ results: WorkoutSession[] }>('/workouts/sessions/');
    return data;
  },
  startSession: async (plan?: number, plan_day_number?: number) => {
    const { data } = await api.post<WorkoutSession>('/workouts/sessions/', {
      plan,
      plan_day_number,
    });
    return data;
  },
  completeSession: async (
    sessionId: number,
    payload: {
      duration_seconds: number;
      calories_burned: number;
      mood?: string;
      notes?: string;
      exercises?: { exercise: number; sets_completed: number; reps_per_set: number[]; order: number }[];
    }
  ) => {
    const { data } = await api.post<WorkoutSession>(
      `/workouts/sessions/${sessionId}/complete/`,
      payload
    );
    return data;
  },
};
