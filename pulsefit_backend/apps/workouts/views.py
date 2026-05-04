"""Workouts API views."""
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import WorkoutPlan, WorkoutSession
from .serializers import (
    WorkoutPlanListSerializer,
    WorkoutPlanDetailSerializer,
    WorkoutSessionSerializer,
    StartSessionSerializer,
    CompleteSessionSerializer,
)


class WorkoutPlanViewSet(viewsets.ReadOnlyModelViewSet):
    """Tayyor mashq dasturlari (admin paneldan qo'shiladi)."""
    queryset = (
        WorkoutPlan.objects.filter(is_active=True)
        .prefetch_related('days__exercises__exercise__category')
    )
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['level', 'target_goal']
    search_fields = ['name_uz', 'name_ru', 'name_en']

    def get_serializer_class(self):
        if self.action == 'list':
            return WorkoutPlanListSerializer
        return WorkoutPlanDetailSerializer


class WorkoutSessionViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    """Foydalanuvchining mashq sessiyalari."""
    serializer_class = WorkoutSessionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return (
            WorkoutSession.objects.filter(user=self.request.user)
            .select_related('plan')
            .prefetch_related('exercises__exercise')
        )

    def create(self, request, *args, **kwargs):
        """Yangi sessiyani boshlash."""
        serializer = StartSessionSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        session = serializer.save()
        return Response(
            WorkoutSessionSerializer(session).data,
            status=status.HTTP_201_CREATED,
        )

    @action(detail=True, methods=['post'], url_path='complete')
    def complete(self, request, pk=None):
        """Sessiyani tugatish."""
        session = self.get_object()
        if session.completed_at:
            return Response(
                {'detail': "Sessiya allaqachon tugatilgan"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = CompleteSessionSerializer(session, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        session = serializer.save()
        return Response(WorkoutSessionSerializer(session).data)
