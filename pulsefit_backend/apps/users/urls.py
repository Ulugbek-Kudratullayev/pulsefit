"""User endpointlari (/api/v1/users/...)."""
from django.urls import path
from .views import MeView


urlpatterns = [
    path('me/', MeView.as_view(), name='user-me'),
]
