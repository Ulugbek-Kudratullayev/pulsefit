"""Workouts serializerlari."""
from django.utils import timezone
from rest_framework import serializers
from apps.exercises.serializers import ExerciseListSerializer
from .models import (
    WorkoutPlan,
    WorkoutDay,
    WorkoutDayExercise,
    WorkoutSession,
    SessionExercise,
)


class WorkoutDayExerciseSerializer(serializers.ModelSerializer):
    exercise = ExerciseListSerializer(read_only=True)

    class Meta:
        model = WorkoutDayExercise
        fields = ('id', 'exercise', 'sets', 'reps', 'rest_seconds', 'order')


class WorkoutDaySerializer(serializers.ModelSerializer):
    exercises = WorkoutDayExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = WorkoutDay
        fields = (
            'id', 'day_number',
            'title_uz', 'title_ru', 'title_en',
            'notes', 'exercises',
        )


class WorkoutPlanListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutPlan
        fields = (
            'id', 'slug',
            'name_uz', 'name_ru', 'name_en',
            'level', 'target_goal',
            'total_days', 'workouts_per_week',
            'estimated_duration',
            'cover_image', 'cover_url',
        )


class WorkoutPlanDetailSerializer(serializers.ModelSerializer):
    days = WorkoutDaySerializer(many=True, read_only=True)

    class Meta:
        model = WorkoutPlan
        fields = (
            'id', 'slug',
            'name_uz', 'name_ru', 'name_en',
            'description_uz', 'description_ru', 'description_en',
            'level', 'target_goal',
            'total_days', 'workouts_per_week',
            'estimated_duration',
            'cover_image', 'cover_url',
            'days',
        )


class SessionExerciseSerializer(serializers.ModelSerializer):
    exercise_id = serializers.IntegerField(source='exercise.id', read_only=True)
    exercise_name = serializers.CharField(source='exercise.name_uz', read_only=True)

    class Meta:
        model = SessionExercise
        fields = (
            'id', 'exercise', 'exercise_id', 'exercise_name',
            'sets_completed', 'reps_per_set',
            'weight_kg', 'skipped', 'order',
        )


class WorkoutSessionSerializer(serializers.ModelSerializer):
    exercises = SessionExerciseSerializer(many=True, read_only=True)
    plan_name = serializers.CharField(source='plan.name_uz', read_only=True)
    is_completed = serializers.BooleanField(read_only=True)

    class Meta:
        model = WorkoutSession
        fields = (
            'id', 'user', 'plan', 'plan_name', 'plan_day_number',
            'started_at', 'completed_at',
            'duration_seconds', 'calories_burned',
            'mood', 'notes',
            'is_completed', 'exercises',
        )
        read_only_fields = ('user',)


class StartSessionSerializer(serializers.Serializer):
    plan = serializers.PrimaryKeyRelatedField(
        queryset=WorkoutPlan.objects.filter(is_active=True),
        required=False,
        allow_null=True,
    )
    plan_day_number = serializers.IntegerField(required=False, allow_null=True)

    def create(self, validated_data):
        user = self.context['request'].user
        return WorkoutSession.objects.create(
            user=user,
            plan=validated_data.get('plan'),
            plan_day_number=validated_data.get('plan_day_number'),
            started_at=timezone.now(),
        )


class CompleteSessionSerializer(serializers.Serializer):
    duration_seconds = serializers.IntegerField(min_value=0)
    calories_burned = serializers.IntegerField(min_value=0)
    mood = serializers.ChoiceField(
        choices=WorkoutSession.MOOD,
        required=False,
        allow_blank=True,
    )
    notes = serializers.CharField(required=False, allow_blank=True)
    exercises = SessionExerciseSerializer(many=True, required=False)

    def update(self, instance, validated_data):
        exercises_data = validated_data.pop('exercises', [])
        instance.duration_seconds = validated_data.get('duration_seconds', instance.duration_seconds)
        instance.calories_burned = validated_data.get('calories_burned', instance.calories_burned)
        instance.mood = validated_data.get('mood', instance.mood)
        instance.notes = validated_data.get('notes', instance.notes)
        instance.completed_at = timezone.now()
        instance.save()
        # Sessiya mashqlari
        instance.exercises.all().delete()
        for ex_data in exercises_data:
            SessionExercise.objects.create(session=instance, **ex_data)
        return instance
