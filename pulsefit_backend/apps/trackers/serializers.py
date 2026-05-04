"""Trackers serializerlari."""
from rest_framework import serializers
from .models import WaterIntake, WaterEntry, StepRecord, WeightLog


class WaterEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterEntry
        fields = ('id', 'amount_ml', 'time')


class WaterIntakeSerializer(serializers.ModelSerializer):
    entries = WaterEntrySerializer(many=True, read_only=True)
    progress_percent = serializers.IntegerField(read_only=True)

    class Meta:
        model = WaterIntake
        fields = (
            'id', 'date',
            'total_ml', 'goal_ml',
            'progress_percent',
            'entries', 'updated_at',
        )
        read_only_fields = ('total_ml',)


class WaterAddSerializer(serializers.Serializer):
    amount_ml = serializers.IntegerField(min_value=1, max_value=2000)


class StepRecordSerializer(serializers.ModelSerializer):
    progress_percent = serializers.IntegerField(read_only=True)

    class Meta:
        model = StepRecord
        fields = (
            'id', 'date', 'count', 'distance_km',
            'calories_burned', 'goal',
            'progress_percent', 'updated_at',
        )


class WeightLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeightLog
        fields = ('id', 'date', 'weight_kg', 'note', 'photo', 'created_at')
        read_only_fields = ('created_at',)
