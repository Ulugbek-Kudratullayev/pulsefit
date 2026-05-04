"""Meals endpointlari."""
from rest_framework.routers import DefaultRouter
from .views import FoodItemViewSet, MealEntryViewSet


router = DefaultRouter()
router.register('foods', FoodItemViewSet, basename='food')
router.register('entries', MealEntryViewSet, basename='meal-entry')

urlpatterns = router.urls
