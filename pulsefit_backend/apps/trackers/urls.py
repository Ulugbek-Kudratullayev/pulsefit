"""Trackers endpointlari."""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    WaterTodayView, WaterAddView, WaterHistoryView,
    StepRecordViewSet, WeightLogViewSet,
)


router = DefaultRouter()
router.register('steps', StepRecordViewSet, basename='step')
router.register('weight', WeightLogViewSet, basename='weight')


urlpatterns = [
    path('water/today/', WaterTodayView.as_view(), name='water-today'),
    path('water/add/', WaterAddView.as_view(), name='water-add'),
    path('water/history/', WaterHistoryView.as_view(), name='water-history'),
    path('', include(router.urls)),
]
