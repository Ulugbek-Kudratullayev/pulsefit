"""Meals serializerlari."""
from rest_framework import serializers
from .models import FoodItem, MealEntry


class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = (
            'id', 'slug', 'name_uz', 'name_ru', 'name_en',
            'category',
            'calories', 'protein', 'carbs', 'fat',
            'default_portion', 'image', 'image_url',
        )


class MealEntrySerializer(serializers.ModelSerializer):
    food_item_name = serializers.CharField(source='food_item.name_uz', read_only=True)

    class Meta:
        model = MealEntry
        fields = (
            'id', 'food_item', 'food_item_name',
            'date', 'meal_type', 'name',
            'portion_size',
            'calories', 'protein', 'carbs', 'fat',
            'source', 'created_at',
        )
        read_only_fields = ('created_at',)

    def create(self, validated_data):
        food_item = validated_data.get('food_item')
        portion = validated_data.get('portion_size', 100)
        # Agar food_item dan kelsa va kaloriya 0 bo'lsa, hisoblash
        if food_item and not validated_data.get('calories'):
            ratio = portion / 100.0
            validated_data['calories'] = food_item.calories * ratio
            validated_data['protein'] = food_item.protein * ratio
            validated_data['carbs'] = food_item.carbs * ratio
            validated_data['fat'] = food_item.fat * ratio
            if not validated_data.get('name'):
                validated_data['name'] = food_item.name_uz
        return super().create(validated_data)
