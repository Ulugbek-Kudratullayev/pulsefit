/** PulseFit umumiy TypeScript turlari. */

export type Gender = 'male' | 'female';
export type Goal = 'lose' | 'gain' | 'maintain' | 'endurance';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Equipment = 'none' | 'dumbbell' | 'barbell' | 'kettlebell' | 'band' | 'machine';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'uz' | 'ru' | 'en';

export interface UserProfile {
  avatar: string | null;
  age: number | null;
  gender: Gender | '';
  height: number | null;
  weight: number | null;
  target_weight: number | null;
  goal: Goal | '';
  activity_level: ActivityLevel | '';
  daily_calorie_goal: number;
  daily_water_goal: number;
  daily_step_goal: number;
  language: Language;
  theme: Theme;
  notif_workout: boolean;
  notif_water: boolean;
  notif_weekly_report: boolean;
  notif_achievements: boolean;
  onboarding_completed: boolean;
  bmi: number | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
  date_joined: string;
  profile: UserProfile;
}

export interface AuthTokens {
  access: string;
  refresh: string;
  user: User;
}

export interface ExerciseCategory {
  id: number;
  slug: string;
  name_uz: string;
  name_ru: string;
  name_en: string;
  icon: string;
  color: string;
  order: number;
}

export interface Exercise {
  id: number;
  slug: string;
  name_uz: string;
  name_ru: string;
  name_en: string;
  description_uz?: string;
  category: ExerciseCategory;
  difficulty: Difficulty;
  equipment: Equipment;
  media_url: string;
  thumbnail: string | null;
  default_sets: number;
  default_reps: number;
  duration_seconds: number | null;
  calories_per_minute: number;
  muscle_groups?: string;
  muscle_groups_list?: string[];
  instructions_uz?: string;
  instructions_list_uz?: string[];
  tips_uz?: string;
}

export interface WorkoutDayExercise {
  id: number;
  exercise: Exercise;
  sets: number;
  reps: number;
  rest_seconds: number;
  order: number;
}

export interface WorkoutDay {
  id: number;
  day_number: number;
  title_uz: string;
  notes: string;
  exercises: WorkoutDayExercise[];
}

export interface WorkoutPlan {
  id: number;
  slug: string;
  name_uz: string;
  name_ru: string;
  description_uz?: string;
  level: Difficulty;
  target_goal: Goal;
  total_days: number;
  workouts_per_week: number;
  estimated_duration: number;
  cover_image: string | null;
  cover_url: string;
  days?: WorkoutDay[];
}

export interface WaterIntake {
  id: number;
  date: string;
  total_ml: number;
  goal_ml: number;
  progress_percent: number;
  entries: { id: number; amount_ml: number; time: string }[];
  updated_at: string;
}

export interface StepRecord {
  id: number;
  date: string;
  count: number;
  distance_km: number;
  calories_burned: number;
  goal: number;
  progress_percent: number;
}

export interface WeightLog {
  id: number;
  date: string;
  weight_kg: number;
  note: string;
  photo: string | null;
  created_at: string;
}

export interface FoodItem {
  id: number;
  slug: string;
  name_uz: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  default_portion: number;
  image_url: string;
}

export interface MealEntry {
  id: number;
  food_item: number | null;
  food_item_name?: string;
  date: string;
  meal_type: MealType;
  name: string;
  portion_size: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  source: 'manual' | 'database' | 'barcode';
  created_at: string;
}

export interface MealsToday {
  date: string;
  goal_calories: number;
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  entries: MealEntry[];
}

export interface WorkoutSession {
  id: number;
  plan: number | null;
  plan_name?: string;
  plan_day_number: number | null;
  started_at: string;
  completed_at: string | null;
  duration_seconds: number;
  calories_burned: number;
  mood: string;
  notes: string;
  is_completed: boolean;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

export interface StatsOverview {
  total_sessions: number;
  total_duration_minutes: number;
  total_calories_burned: number;
  current_streak_days: number;
  current_weight: number | null;
  weight_change_total: number | null;
}

export interface WeeklyDay {
  date: string;
  workouts: number;
  duration_minutes: number;
  calories_burned: number;
  water_ml: number;
  steps: number;
  meals_calories: number;
}
