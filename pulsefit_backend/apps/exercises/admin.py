from django.contrib import admin
from .models import Exercise, ExerciseCategory


@admin.register(ExerciseCategory)
class ExerciseCategoryAdmin(admin.ModelAdmin):
    list_display = ('name_uz', 'slug', 'icon', 'color', 'order')
    prepopulated_fields = {'slug': ('name_uz',)}
    list_editable = ('order',)


@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('name_uz', 'category', 'difficulty', 'equipment', 'is_active')
    list_filter = ('category', 'difficulty', 'equipment', 'is_active')
    search_fields = ('name_uz', 'name_ru', 'name_en', 'muscle_groups')
    prepopulated_fields = {'slug': ('name_uz',)}
    fieldsets = (
        ("Asosiy", {
            'fields': ('slug', 'category', 'is_active'),
        }),
        ("Nomlar (3 til)", {
            'fields': ('name_uz', 'name_ru', 'name_en'),
        }),
        ("Tavsif", {
            'fields': ('description_uz', 'description_ru', 'description_en'),
            'classes': ('collapse',),
        }),
        ("Texnik ma'lumotlar", {
            'fields': (
                'muscle_groups', 'equipment', 'difficulty',
                'duration_seconds', 'default_reps', 'default_sets',
                'calories_per_minute',
            ),
        }),
        ("Ko'rsatmalar (3 til)", {
            'fields': (
                'instructions_uz', 'instructions_ru', 'instructions_en',
                'tips_uz', 'tips_ru', 'tips_en',
            ),
            'classes': ('collapse',),
        }),
        ("Media", {
            'fields': ('media_url', 'thumbnail'),
        }),
    )
