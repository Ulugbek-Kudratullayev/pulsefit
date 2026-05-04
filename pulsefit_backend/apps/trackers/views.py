"""Trackers API views."""
from datetime import date as date_cls, timedelta
from django.utils import timezone
from django.db.models import Sum, Avg
from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import WaterIntake, WaterEntry, StepRecord, WeightLog
from .serializers import (
    WaterIntakeSerializer,
    WaterAddSerializer,
    StepRecordSerializer,
    WeightLogSerializer,
)


def _parse_date(value, default):
    if not value:
        return default
    try:
        return date_cls.fromisoformat(value)
    except (ValueError, TypeError):
        return default


def _user_goal_water(user):
    profile = getattr(user, 'profile', None)
    return profile.daily_water_goal if profile else 2500


def _user_goal_step(user):
    profile = getattr(user, 'profile', None)
    return profile.daily_step_goal if profile else 8000


# ========================== WATER ==========================

class WaterTodayView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        today = timezone.localdate()
        intake, _ = WaterIntake.objects.get_or_create(
            user=request.user,
            date=today,
            defaults={'goal_ml': _user_goal_water(request.user)},
        )
        return Response(WaterIntakeSerializer(intake).data)


class WaterAddView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = WaterAddSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        amount = serializer.validated_data['amount_ml']
        today = timezone.localdate()
        intake, _ = WaterIntake.objects.get_or_create(
            user=request.user,
            date=today,
            defaults={'goal_ml': _user_goal_water(request.user)},
        )
        WaterEntry.objects.create(intake=intake, amount_ml=amount)
        intake.total_ml = intake.entries.aggregate(s=Sum('amount_ml'))['s'] or 0
        intake.save(update_fields=['total_ml', 'updated_at'])
        return Response(
            WaterIntakeSerializer(intake).data,
            status=status.HTTP_201_CREATED,
        )


class WaterHistoryView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        today = timezone.localdate()
        from_date = _parse_date(
            request.query_params.get('from'),
            today - timedelta(days=29),
        )
        to_date = _parse_date(request.query_params.get('to'), today)
        qs = WaterIntake.objects.filter(
            user=request.user,
            date__gte=from_date,
            date__lte=to_date,
        ).order_by('date')
        return Response(WaterIntakeSerializer(qs, many=True).data)


# ========================== STEPS ==========================

class StepRecordViewSet(viewsets.ModelViewSet):
    serializer_class = StepRecordSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = None

    def get_queryset(self):
        qs = StepRecord.objects.filter(user=self.request.user).order_by('-date')
        days = self.request.query_params.get('days')
        if days:
            try:
                days_int = int(days)
                cutoff = timezone.localdate() - timedelta(days=days_int - 1)
                qs = qs.filter(date__gte=cutoff)
            except (ValueError, TypeError):
                pass
        return qs

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user,
            goal=serializer.validated_data.get('goal') or _user_goal_step(self.request.user),
        )

    @action(detail=False, methods=['get'])
    def today(self, request):
        today = timezone.localdate()
        record, _ = StepRecord.objects.get_or_create(
            user=request.user,
            date=today,
            defaults={'goal': _user_goal_step(request.user)},
        )
        return Response(StepRecordSerializer(record).data)

    @action(detail=False, methods=['post'], url_path='sync')
    def sync_today(self, request):
        """Mobil pedometer'dan kelgan ma'lumotni saqlash."""
        today = timezone.localdate()
        count = int(request.data.get('count', 0))
        distance_km = float(request.data.get('distance_km', count * 0.0007))
        calories = int(request.data.get('calories_burned', count * 0.04))
        record, _ = StepRecord.objects.update_or_create(
            user=request.user,
            date=today,
            defaults={
                'count': count,
                'distance_km': distance_km,
                'calories_burned': calories,
                'goal': _user_goal_step(request.user),
            },
        )
        return Response(StepRecordSerializer(record).data)


# ========================== WEIGHT ==========================

class WeightLogViewSet(viewsets.ModelViewSet):
    serializer_class = WeightLogSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = None

    def get_queryset(self):
        qs = WeightLog.objects.filter(user=self.request.user).order_by('-date')
        days = self.request.query_params.get('days')
        if days:
            try:
                days_int = int(days)
                cutoff = timezone.localdate() - timedelta(days=days_int - 1)
                qs = qs.filter(date__gte=cutoff)
            except (ValueError, TypeError):
                pass
        return qs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        # Profil joriy vaznini yangilash
        profile = getattr(self.request.user, 'profile', None)
        if profile:
            profile.weight = serializer.validated_data['weight_kg']
            profile.save(update_fields=['weight', 'updated_at'])

    @action(detail=False, methods=['get'])
    def latest(self, request):
        log = (
            WeightLog.objects.filter(user=request.user)
            .order_by('-date')
            .first()
        )
        if not log:
            return Response({'detail': "Yozuv yo'q"}, status=404)
        return Response(WeightLogSerializer(log).data)
