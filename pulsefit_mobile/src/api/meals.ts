/** Meals API. */
import api from '@/lib/axios';
import { FoodItem, MealEntry, MealsToday, MealType } from '@/types';

export const mealsApi = {
  foods: async (search?: string, category?: string) => {
    const { data } = await api.get<{ results: FoodItem[] }>('/meals/foods/', {
      params: { search, category },
    });
    return data;
  },
  today: async () => (await api.get<MealsToday>('/meals/entries/today/')).data,
  list: async (date?: string) =>
    (await api.get<{ results: MealEntry[] }>('/meals/entries/', { params: { date } })).data,
  add: async (payload: {
    food_item?: number | null;
    date: string;
    meal_type: MealType;
    name: string;
    portion_size: number;
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    source?: 'manual' | 'database';
  }) => (await api.post<MealEntry>('/meals/entries/', payload)).data,
  delete: async (id: number) => api.delete(`/meals/entries/${id}/`),
};
