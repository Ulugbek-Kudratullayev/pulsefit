"""Stats endpointlari."""
from django.urls import path
from .views import OverviewView, WeeklyView, AchievementsView


urlpatterns = [
    path('overview/', OverviewView.as_view(), name='stats-overview'),
    path('weekly/', WeeklyView.as_view(), name='stats-weekly'),
    path('achievements/', AchievementsView.as_view(), name='stats-achievements'),
]
