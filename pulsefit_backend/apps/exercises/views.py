"""Exercises API views."""
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Exercise, ExerciseCategory
from .serializers import (
    ExerciseListSerializer,
    ExerciseDetailSerializer,
    ExerciseCategorySerializer,
)


class ExerciseCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """Mashqlar kategoriyalari."""
    queryset = ExerciseCategory.objects.all()
    serializer_class = ExerciseCategorySerializer
    pagination_class = None


class ExerciseViewSet(viewsets.ReadOnlyModelViewSet):
    """Mashqlar — read-only (admin paneldan qo'shiladi)."""
    queryset = Exercise.objects.filter(is_active=True).select_related('category')
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'difficulty', 'equipment', 'category__slug']
    search_fields = ['name_uz', 'name_ru', 'name_en', 'muscle_groups']
    ordering_fields = ['name_uz', 'difficulty', 'created_at']
    ordering = ['name_uz']

    def get_serializer_class(self):
        if self.action == 'list':
            return ExerciseListSerializer
        return ExerciseDetailSerializer
