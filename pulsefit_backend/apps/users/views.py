"""Users API views."""
from django.contrib.auth import get_user_model
from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from drf_spectacular.utils import extend_schema, OpenApiResponse

from .serializers import (
    RegisterSerializer,
    UserSerializer,
    UserProfileSerializer,
    TokenPairSerializer,
    ChangePasswordSerializer,
)
from .models import UserProfile

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """Yangi foydalanuvchi ro'yxatdan o'tkazish."""
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)

    @extend_schema(
        responses={201: TokenPairSerializer},
        description="Email + parol bilan ro'yxatdan o'tish",
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        tokens = TokenPairSerializer.for_user(user)
        return Response(tokens, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """Email + parol bilan login (JWT qaytaradi)."""
    permission_classes = (AllowAny,)

    @extend_schema(
        request={
            'application/json': {
                'type': 'object',
                'properties': {
                    'email': {'type': 'string', 'format': 'email'},
                    'password': {'type': 'string', 'format': 'password'},
                },
                'required': ['email', 'password'],
            }
        },
        responses={200: TokenPairSerializer},
    )
    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        password = request.data.get('password', '')
        if not email or not password:
            return Response(
                {'detail': "Email va parol majburiy"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {'detail': "Email yoki parol noto'g'ri"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        if not user.check_password(password):
            return Response(
                {'detail': "Email yoki parol noto'g'ri"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        if not user.is_active:
            return Response(
                {'detail': "Akkaunt o'chirilgan"},
                status=status.HTTP_403_FORBIDDEN,
            )
        return Response(TokenPairSerializer.for_user(user))


class LogoutView(APIView):
    """Refresh token'ni blacklist qilish."""
    permission_classes = (IsAuthenticated,)

    @extend_schema(
        request={
            'application/json': {
                'type': 'object',
                'properties': {'refresh': {'type': 'string'}},
                'required': ['refresh'],
            }
        },
        responses={205: OpenApiResponse(description="Muvaffaqiyatli chiqildi")},
    )
    def post(self, request):
        try:
            refresh = request.data.get('refresh')
            if not refresh:
                return Response(
                    {'detail': "refresh token majburiy"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            token = RefreshToken(refresh)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except TokenError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    @extend_schema(request=ChangePasswordSerializer, responses={200: None})
    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={'request': request},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'detail': "Parol o'zgartirildi"})


class MeView(APIView):
    """Joriy foydalanuvchining profili."""
    permission_classes = (IsAuthenticated,)

    @extend_schema(responses=UserSerializer)
    def get(self, request):
        return Response(UserSerializer(request.user).data)

    @extend_schema(request=UserProfileSerializer, responses=UserSerializer)
    def patch(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        profile = serializer.save()
        # Avtomatik kaloriya hisoblash
        calculated = profile.calculate_daily_calories()
        if calculated != profile.daily_calorie_goal:
            profile.daily_calorie_goal = calculated
            profile.save(update_fields=['daily_calorie_goal'])
        # full_name'ni ham yangilash mumkin
        if 'full_name' in request.data:
            request.user.full_name = request.data['full_name']
            request.user.save(update_fields=['full_name'])
        return Response(UserSerializer(request.user).data)

    def delete(self, request):
        request.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
