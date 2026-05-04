"""Stats API views (overview, weekly, achievements)."""
from datetime import timedelta
from django.utils import timezone
from django.db.models import Sum, Count, Avg
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.workouts.models import WorkoutSession
from apps.trackers.models import WaterIntake, StepRecord, WeightLog
from apps.meals.models import MealEntry


class OverviewView(APIView):
    """Umumiy statistika."""
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        sessions = WorkoutSession.objects.filter(
            user=user,
            completed_at__isnull=False,
        )
        agg = sessions.aggregate(
            total_sessions=Count('id'),
            total_duration=Sum('duration_seconds'),
            total_calories=Sum('calories_burned'),
        )
        latest_weight = (
            WeightLog.objects.filter(user=user).order_by('-date').first()
        )
        first_weight = (
            WeightLog.objects.filter(user=user).order_by('date').first()
        )
        weight_change = None
        if first_weight and latest_weight and first_weight != latest_weight:
            weight_change = round(latest_weight.weight_kg - first_weight.weight_kg, 1)
        return Response({
            'total_sessions': agg['total_sessions'] or 0,
            'total_duration_minutes': round((agg['total_duration'] or 0) / 60),
            'total_calories_burned': agg['total_calories'] or 0,
            'current_streak_days': self._streak(user),
            'current_weight': latest_weight.weight_kg if latest_weight else None,
            'weight_change_total': weight_change,
        })

    def _streak(self, user):
        """Ketma-ket kunlardagi mashq sessiyalari."""
        today = timezone.localdate()
        streak = 0
        d = today
        while True:
            has_session = WorkoutSession.objects.filter(
                user=user,
                started_at__date=d,
                completed_at__isnull=False,
            ).exists()
            if has_session:
                streak += 1
                d -= timedelta(days=1)
            else:
                if d == today:
                    d -= timedelta(days=1)
                    continue
                break
        return streak


class WeeklyView(APIView):
    """Oxirgi 7 kun bo'yicha xulosa."""
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        today = timezone.localdate()
        start = today - timedelta(days=6)
        days = []
        for i in range(7):
            d = start + timedelta(days=i)
            sessions = WorkoutSession.objects.filter(
                user=request.user,
                started_at__date=d,
                completed_at__isnull=False,
            )
            agg = sessions.aggregate(
                duration=Sum('duration_seconds'),
                calories=Sum('calories_burned'),
            )
            water = WaterIntake.objects.filter(user=request.user, date=d).first()
            steps = StepRecord.objects.filter(user=request.user, date=d).first()
            meals_cal = MealEntry.objects.filter(
                user=request.user, date=d
            ).aggregate(c=Sum('calories'))['c'] or 0
            days.append({
                'date': d,
                'workouts': sessions.count(),
                'duration_minutes': round((agg['duration'] or 0) / 60),
                'calories_burned': agg['calories'] or 0,
                'water_ml': water.total_ml if water else 0,
                'steps': steps.count if steps else 0,
                'meals_calories': round(meals_cal),
            })
        return Response({'from': start, 'to': today, 'days': days})


class AchievementsView(APIView):
    """Yutuqlar (achievements) — statik ro'yxat + foydalanuvchi progressi."""
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        sessions_count = WorkoutSession.objects.filter(
            user=user, completed_at__isnull=False,
        ).count()
        weight_logs = WeightLog.objects.filter(user=user).count()
        streak = OverviewView()._streak(user)

        achievements = [
            {'id': 'first_workout', 'icon': '🏃', 'title': "Birinchi mashq",
             'description': "Birinchi marta mashq qilish",
             'unlocked': sessions_count >= 1, 'progress': min(sessions_count, 1), 'target': 1},
            {'id': 'streak_3', 'icon': '🔥', 'title': "3 kunlik streak",
             'description': "Ketma-ket 3 kun mashq",
             'unlocked': streak >= 3, 'progress': min(streak, 3), 'target': 3},
            {'id': 'streak_7', 'icon': '⚡', 'title': "Haftalik streak",
             'description': "Ketma-ket 7 kun mashq",
             'unlocked': streak >= 7, 'progress': min(streak, 7), 'target': 7},
            {'id': 'workouts_10', 'icon': '💪', 'title': "10 ta mashq",
             'description': "Jami 10 ta sessiya",
             'unlocked': sessions_count >= 10, 'progress': min(sessions_count, 10), 'target': 10},
            {'id': 'workouts_50', 'icon': '🏆', 'title': "50 ta mashq",
             'description': "Jami 50 ta sessiya",
             'unlocked': sessions_count >= 50, 'progress': min(sessions_count, 50), 'target': 50},
            {'id': 'weight_log_5', 'icon': '⚖️', 'title': "Vazn kuzatuvi",
             'description': "5 marta vazn yozdirish",
             'unlocked': weight_logs >= 5, 'progress': min(weight_logs, 5), 'target': 5},
        ]
        return Response({
            'unlocked_count': sum(1 for a in achievements if a['unlocked']),
            'total_count': len(achievements),
            'achievements': achievements,
        })
