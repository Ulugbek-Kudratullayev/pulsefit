"""Meals API views."""
from datetime import date as date_cls, timedelta
from django.utils import timezone
from django.db.models import Sum
from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import FoodItem, MealEntry
from .serializers import FoodItemSerializer, MealEntrySerializer


class FoodItemViewSet(viewsets.ReadOnlyModelViewSet):
    """Mahalliy taomlar bazasi."""
    queryset = FoodItem.objects.filter(is_active=True)
    serializer_class = FoodItemSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['category']
    search_fields = ['name_uz', 'name_ru', 'name_en']


class MealEntryViewSet(viewsets.ModelViewSet):
    serializer_class = MealEntrySerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        qs = MealEntry.objects.filter(user=self.request.user)
        date = self.request.query_params.get('date')
        if date:
            qs = qs.filter(date=date)
        return qs.select_related('food_item').order_by('-date', '-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def today(self, request):
        """Bugungi xulosa: barcha taom + jami kaloriya/macros."""
        today = timezone.localdate()
        entries = MealEntry.objects.filter(user=request.user, date=today)
        totals = entries.aggregate(
            calories=Sum('calories'),
            protein=Sum('protein'),
            carbs=Sum('carbs'),
            fat=Sum('fat'),
        )
        profile = getattr(request.user, 'profile', None)
        goal = profile.daily_calorie_goal if profile else 2000
        return Response({
            'date': today,
            'goal_calories': goal,
            'totals': {
                'calories': totals['calories'] or 0,
                'protein': totals['protein'] or 0,
                'carbs': totals['carbs'] or 0,
                'fat': totals['fat'] or 0,
            },
            'entries': MealEntrySerializer(entries, many=True).data,
        })
