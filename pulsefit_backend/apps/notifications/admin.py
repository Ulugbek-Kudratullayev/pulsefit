from django.contrib import admin
from .models import DeviceToken, NotificationLog


@admin.register(DeviceToken)
class DeviceTokenAdmin(admin.ModelAdmin):
    list_display = ('user', 'platform', 'device_name', 'is_active', 'last_used')
    list_filter = ('platform', 'is_active')
    search_fields = ('user__email', 'token')


@admin.register(NotificationLog)
class NotificationLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'sent_at', 'success')
    list_filter = ('success', 'sent_at')
    search_fields = ('user__email', 'title')
