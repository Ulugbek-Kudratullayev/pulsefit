"""Push notif modellari."""
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class DeviceToken(models.Model):
    PLATFORM = [('ios', 'iOS'), ('android', 'Android'), ('web', 'Web')]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='device_tokens',
    )
    token = models.CharField(max_length=255, unique=True)
    platform = models.CharField(max_length=10, choices=PLATFORM, default='android')
    device_name = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_used = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Push token")
        verbose_name_plural = _("Push tokenlar")
        ordering = ['-last_used']

    def __str__(self):
        return f"{self.user.email} ({self.platform})"


class NotificationLog(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notif_logs',
    )
    title = models.CharField(max_length=200)
    body = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    success = models.BooleanField(default=True)
    error = models.TextField(blank=True)

    class Meta:
        ordering = ['-sent_at']

    def __str__(self):
        return f"{self.user.email}: {self.title}"
