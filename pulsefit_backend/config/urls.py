"""PulseFit URL routing."""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)


def health(_request):
    return JsonResponse({'status': 'ok', 'service': 'pulsefit-api'})


def root(_request):
    return JsonResponse({
        'service': 'PulseFit API',
        'version': '1.0.0',
        'docs': '/api/docs/',
        'admin': '/admin/',
        'health': '/api/health/',
    })


api_v1_patterns = [
    path('auth/', include('apps.users.urls_auth')),
    path('users/', include('apps.users.urls')),
    path('exercises/', include('apps.exercises.urls')),
    path('workouts/', include('apps.workouts.urls')),
    path('trackers/', include('apps.trackers.urls')),
    path('meals/', include('apps.meals.urls')),
    path('notifications/', include('apps.notifications.urls')),
    path('stats/', include('apps.stats.urls')),
]


urlpatterns = [
    path('', root),
    path('api/health/', health, name='health'),
    path('admin/', admin.site.urls),
    path('api/v1/', include(api_v1_patterns)),

    # OpenAPI / Swagger UI
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
