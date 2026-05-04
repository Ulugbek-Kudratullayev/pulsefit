from django.contrib import admin
from .models import FoodItem, MealEntry


@admin.register(FoodItem)
class FoodItemAdmin(admin.ModelAdmin):
    list_display = ('name_uz', 'category', 'calories', 'protein', 'carbs', 'fat', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('name_uz', 'name_ru', 'name_en')
    prepopulated_fields = {'slug': ('name_uz',)}


@admin.register(MealEntry)
class MealEntryAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'meal_type', 'name', 'calories')
    list_filter = ('meal_type', 'date')
    search_fields = ('user__email', 'name')
    date_hierarchy = 'date'
