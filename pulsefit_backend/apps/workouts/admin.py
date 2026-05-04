from django.contrib import admin
from .models import (
    WorkoutPlan,
    WorkoutDay,
    WorkoutDayExercise,
    WorkoutSession,
    SessionExercise,
)


class WorkoutDayExerciseInline(admin.TabularInline):
    model = WorkoutDayExercise
    extra = 1
    autocomplete_fields = ('exercise',)


@admin.register(WorkoutDay)
class WorkoutDayAdmin(admin.ModelAdmin):
    list_display = ('plan', 'day_number', 'title_uz')
    list_filter = ('plan',)
    inlines = (WorkoutDayExerciseInline,)


class WorkoutDayInline(admin.TabularInline):
    model = WorkoutDay
    extra = 1
    show_change_link = True


@admin.register(WorkoutPlan)
class WorkoutPlanAdmin(admin.ModelAdmin):
    list_display = ('name_uz', 'level', 'target_goal', 'total_days', 'is_active')
    list_filter = ('level', 'target_goal', 'is_active')
    search_fields = ('name_uz', 'name_ru', 'name_en')
    prepopulated_fields = {'slug': ('name_uz',)}
    inlines = (WorkoutDayInline,)


class SessionExerciseInline(admin.TabularInline):
    model = SessionExercise
    extra = 0
    autocomplete_fields = ('exercise',)


@admin.register(WorkoutSession)
class WorkoutSessionAdmin(admin.ModelAdmin):
    list_display = ('user', 'plan', 'started_at', 'completed_at', 'duration_seconds', 'calories_burned')
    list_filter = ('plan', 'mood')
    search_fields = ('user__email',)
    date_hierarchy = 'started_at'
    inlines = (SessionExerciseInline,)
