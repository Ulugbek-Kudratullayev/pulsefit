"""Exercises endpointlari."""
from rest_framework.routers import DefaultRouter
from .views import ExerciseViewSet, ExerciseCategoryViewSet


router = DefaultRouter()
router.register('categories', ExerciseCategoryViewSet, basename='exercise-category')
router.register('', ExerciseViewSet, basename='exercise')

urlpatterns = router.urls
