"""Notifications API views."""
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers

from .models import DeviceToken


class DeviceTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviceToken
        fields = ('token', 'platform', 'device_name')


class RegisterDeviceView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = DeviceTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data['token']
        device, created = DeviceToken.objects.update_or_create(
            token=token,
            defaults={
                'user': request.user,
                'platform': serializer.validated_data.get('platform', 'android'),
                'device_name': serializer.validated_data.get('device_name', ''),
                'is_active': True,
            },
        )
        return Response(
            {'token': device.token, 'created': created},
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )


class UnregisterDeviceView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        token = request.data.get('token')
        if not token:
            return Response({'detail': "token majburiy"}, status=400)
        DeviceToken.objects.filter(user=request.user, token=token).update(is_active=False)
        return Response(status=204)
