"""Workouts endpointlari."""
from rest_framework.routers import DefaultRouter
from .views import WorkoutPlanViewSet, WorkoutSessionViewSet


router = DefaultRouter()
router.register('plans', WorkoutPlanViewSet, basename='workout-plan')
router.register('sessions', WorkoutSessionViewSet, basename='workout-session')

urlpatterns = router.urls
