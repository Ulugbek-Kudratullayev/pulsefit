"""Tracker modellari."""
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class WaterIntake(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='water_intakes',
    )
    date = models.DateField()
    total_ml = models.PositiveIntegerField(default=0)
    goal_ml = models.PositiveIntegerField(default=2500)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Suv (kunlik)")
        verbose_name_plural = _("Suv (kunlik)")
        unique_together = (('user', 'date'),)
        indexes = [models.Index(fields=['user', 'date'])]
        ordering = ['-date']

    def __str__(self):
        return f"{self.user.email} — {self.date} ({self.total_ml}/{self.goal_ml} ml)"

    @property
    def progress_percent(self):
        if self.goal_ml > 0:
            return min(100, round(self.total_ml / self.goal_ml * 100))
        return 0


class WaterEntry(models.Model):
    intake = models.ForeignKey(
        WaterIntake,
        on_delete=models.CASCADE,
        related_name='entries',
    )
    amount_ml = models.PositiveIntegerField()
    time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-time']


class StepRecord(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='steps',
    )
    date = models.DateField()
    count = models.PositiveIntegerField(default=0)
    distance_km = models.FloatField(default=0)
    calories_burned = models.PositiveIntegerField(default=0)
    goal = models.PositiveIntegerField(default=8000)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Qadam")
        verbose_name_plural = _("Qadamlar")
        unique_together = (('user', 'date'),)
        indexes = [models.Index(fields=['user', 'date'])]
        ordering = ['-date']

    def __str__(self):
        return f"{self.user.email} — {self.date} ({self.count} qadam)"

    @property
    def progress_percent(self):
        if self.goal > 0:
            return min(100, round(self.count / self.goal * 100))
        return 0


class WeightLog(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='weight_logs',
    )
    date = models.DateField()
    weight_kg = models.FloatField()
    note = models.TextField(blank=True)
    photo = models.ImageField(upload_to='weight/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Vazn")
        verbose_name_plural = _("Vazn yozuvlari")
        ordering = ['-date']
        indexes = [models.Index(fields=['user', 'date'])]

    def __str__(self):
        return f"{self.user.email} — {self.date}: {self.weight_kg} kg"
