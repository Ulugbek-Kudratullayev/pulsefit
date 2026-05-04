"""Exercises serializerlari."""
from rest_framework import serializers
from .models import Exercise, ExerciseCategory


class ExerciseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseCategory
        fields = ('id', 'slug', 'name_uz', 'name_ru', 'name_en', 'icon', 'color', 'order')


class ExerciseListSerializer(serializers.ModelSerializer):
    """Ro'yxat uchun yengilroq serializer."""
    category = ExerciseCategorySerializer(read_only=True)

    class Meta:
        model = Exercise
        fields = (
            'id', 'slug', 'name_uz', 'name_ru', 'name_en',
            'category', 'difficulty', 'equipment',
            'media_url', 'thumbnail',
            'default_sets', 'default_reps',
            'duration_seconds', 'calories_per_minute',
        )


class ExerciseDetailSerializer(serializers.ModelSerializer):
    """Detail uchun barcha maydonlar bilan."""
    category = ExerciseCategorySerializer(read_only=True)
    instructions_list_uz = serializers.SerializerMethodField()
    instructions_list_ru = serializers.SerializerMethodField()
    instructions_list_en = serializers.SerializerMethodField()
    muscle_groups_list = serializers.SerializerMethodField()

    class Meta:
        model = Exercise
        fields = (
            'id', 'slug',
            'name_uz', 'name_ru', 'name_en',
            'description_uz', 'description_ru', 'description_en',
            'category', 'muscle_groups', 'muscle_groups_list',
            'equipment', 'difficulty',
            'instructions_uz', 'instructions_ru', 'instructions_en',
            'instructions_list_uz', 'instructions_list_ru', 'instructions_list_en',
            'tips_uz', 'tips_ru', 'tips_en',
            'media_url', 'thumbnail',
            'duration_seconds', 'default_reps', 'default_sets',
            'calories_per_minute',
            'created_at',
        )

    def get_muscle_groups_list(self, obj):
        return [m.strip() for m in obj.muscle_groups.split(',') if m.strip()]

    def _split(self, text):
        return [line.strip() for line in (text or '').split('\n') if line.strip()]

    def get_instructions_list_uz(self, obj):
        return self._split(obj.instructions_uz)

    def get_instructions_list_ru(self, obj):
        return self._split(obj.instructions_ru)

    def get_instructions_list_en(self, obj):
        return self._split(obj.instructions_en)
