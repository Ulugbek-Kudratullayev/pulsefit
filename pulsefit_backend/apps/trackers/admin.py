from django.contrib import admin
from .models import WaterIntake, WaterEntry, StepRecord, WeightLog


class WaterEntryInline(admin.TabularInline):
    model = WaterEntry
    extra = 0
    readonly_fields = ('time',)


@admin.register(WaterIntake)
class WaterIntakeAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'total_ml', 'goal_ml', 'progress_percent')
    list_filter = ('date',)
    search_fields = ('user__email',)
    date_hierarchy = 'date'
    inlines = (WaterEntryInline,)


@admin.register(StepRecord)
class StepRecordAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'count', 'goal', 'distance_km', 'calories_burned')
    list_filter = ('date',)
    search_fields = ('user__email',)
    date_hierarchy = 'date'


@admin.register(WeightLog)
class WeightLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'weight_kg')
    list_filter = ('date',)
    search_fields = ('user__email',)
    date_hierarchy = 'date'
