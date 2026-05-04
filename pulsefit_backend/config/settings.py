"""PulseFit backend uchun Django sozlamalari."""
import os
from pathlib import Path
from datetime import timedelta
from decouple import config, Csv

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='dev-insecure-secret-change-me-in-production')
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='*', cast=Csv())

# Railway avtomatik domeni
RAILWAY_DOMAIN = os.environ.get('RAILWAY_PUBLIC_DOMAIN') or os.environ.get('RAILWAY_STATIC_URL')
if RAILWAY_DOMAIN:
    ALLOWED_HOSTS.append(RAILWAY_DOMAIN.replace('https://', '').replace('http://', ''))


# Application definition
DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'django_filters',
    'drf_spectacular',
    'django_extensions',
]

LOCAL_APPS = [
    'apps.users',
    'apps.exercises',
    'apps.workouts',
    'apps.trackers',
    'apps.meals',
    'apps.notifications',
    'apps.stats',
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# Production (Railway PostgreSQL): DATABASE_URL env var orqali
# Lokal: SQLite (BASE_DIR/db.sqlite3) yoki SQLITE_DIR
DATABASE_URL = os.environ.get('DATABASE_URL')
if DATABASE_URL:
    import dj_database_url
    DATABASES = {
        'default': dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            ssl_require=False,
        ),
    }
else:
    DB_DIR = Path(os.environ.get('SQLITE_DIR', BASE_DIR))
    # Agar papka yozilmaydigan bo'lsa /tmp'ga fallback (Railway uchun)
    try:
        DB_DIR.mkdir(parents=True, exist_ok=True)
        _t = DB_DIR / '.write_test'
        _t.write_text('ok')
        _t.unlink()
    except (OSError, PermissionError):
        DB_DIR = Path('/tmp')
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': DB_DIR / 'db.sqlite3',
        }
    }


# Custom user model
AUTH_USER_MODEL = 'users.User'


# Password validation — kurs ishi uchun yumshatilgan
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
     'OPTIONS': {'min_length': 6}},
]


# I18n
LANGUAGE_CODE = config('LANGUAGE_CODE', default='uz')
TIME_ZONE = config('TIME_ZONE', default='Asia/Tashkent')
USE_I18N = True
USE_TZ = True


# Static and media files
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# DRF konfiguratsiyasi
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_THROTTLE_CLASSES': (
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ),
    'DEFAULT_THROTTLE_RATES': {
        'anon': '60/min',
        'user': '300/min',
    },
}


# JWT sozlamalari
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(
        minutes=config('JWT_ACCESS_TOKEN_LIFETIME_MINUTES', default=60, cast=int)
    ),
    'REFRESH_TOKEN_LIFETIME': timedelta(
        days=config('JWT_REFRESH_TOKEN_LIFETIME_DAYS', default=7, cast=int)
    ),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}


# CORS
CORS_ALLOW_ALL_ORIGINS = config('CORS_ALLOW_ALL_ORIGINS', default=True, cast=bool)


def _valid_origins(raw: str) -> list[str]:
    """Faqat scheme bilan to'g'ri originlarni qoldiradi. '*' va boshlarini olib tashlaydi."""
    return [
        o.strip()
        for o in raw.split(',')
        if o.strip().startswith(('http://', 'https://'))
    ]


CORS_ALLOWED_ORIGINS = _valid_origins(
    config('CORS_ALLOWED_ORIGINS', default='http://localhost:8081,http://localhost:19006')
)
CORS_ALLOW_CREDENTIALS = True
# Mobil ilovalar (Expo Go) origin yubormaydi — regex bilan ham qo'shamiz
CORS_ALLOWED_ORIGIN_REGEXES = [
    r'^exp://.*$',
    r'^https?://localhost(:\d+)?$',
    r'^https?://192\.168\.\d+\.\d+(:\d+)?$',
    r'^https?://10\.\d+\.\d+\.\d+(:\d+)?$',
]

# CSRF trusted origins (production uchun)
CSRF_TRUSTED_ORIGINS = _valid_origins(
    config('CSRF_TRUSTED_ORIGINS', default='http://localhost:8081')
)
if RAILWAY_DOMAIN:
    domain = RAILWAY_DOMAIN.replace('https://', '').replace('http://', '')
    CSRF_TRUSTED_ORIGINS.append(f'https://{domain}')
    CORS_ALLOWED_ORIGINS.append(f'https://{domain}')


# Swagger / OpenAPI
SPECTACULAR_SETTINGS = {
    'TITLE': 'PulseFit API',
    'DESCRIPTION': 'Fitness ilovasi uchun REST API (kurs ishi loyihasi)',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'COMPONENT_SPLIT_REQUEST': True,
    'CONTACT': {'name': 'PulseFit Dev', 'email': 'support@pulsefit.uz'},
    'LICENSE': {'name': 'MIT'},
    # Bir xil enum nomli maydonlarni hal qilish
    'ENUM_NAME_OVERRIDES': {
        'ExerciseLevelEnum': 'apps.exercises.models.Exercise.DIFFICULTY',
        'WorkoutPlanLevelEnum': 'apps.workouts.models.WorkoutPlan.LEVEL',
        'WorkoutGoalEnum': 'apps.workouts.models.WorkoutPlan.GOAL',
        'ProfileGoalEnum': 'apps.users.models.UserProfile.GOAL_CHOICES',
    },
}


# Production xavfsizlik (DEBUG=False bo'lganda)
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = config('SECURE_SSL_REDIRECT', default=False, cast=bool)
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    X_FRAME_OPTIONS = 'DENY'


# Expo Push Notifications
EXPO_PUSH_API = config(
    'EXPO_PUSH_API',
    default='https://exp.host/--/api/v2/push/send',
)
