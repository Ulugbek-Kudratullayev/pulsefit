"""Workout dasturlar va sessiyalar."""
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class WorkoutPlan(models.Model):
    LEVEL = [
        ('beginner', _("Boshlang'ich")),
        ('intermediate', _("O'rta")),
        ('advanced', _("Yuqori")),
    ]
    GOAL = [
        ('lose', _("Vazn yo'qotish")),
        ('gain', _("Vazn oshirish")),
        ('maintain', _("Saqlash")),
        ('endurance', _("Chidamlilik")),
    ]

    slug = models.SlugField(max_length=100, unique=True)
    name_uz = models.CharField(max_length=200)
    name_ru = models.CharField(max_length=200, blank=True)
    name_en = models.CharField(max_length=200, blank=True)
    description_uz = models.TextField(blank=True)
    description_ru = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='plans/', blank=True, null=True)
    cover_url = models.URLField(blank=True)
    level = models.CharField(max_length=20, choices=LEVEL, default='beginner')
    total_days = models.PositiveSmallIntegerField()
    workouts_per_week = models.PositiveSmallIntegerField(default=3)
    target_goal = models.CharField(max_length=20, choices=GOAL, default='maintain')
    estimated_duration = models.PositiveSmallIntegerField(
        help_text="Bir kunlik mashq daqiqasi",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Dastur")
        verbose_name_plural = _("Dasturlar")
        ordering = ['level', 'name_uz']

    def __str__(self):
        return self.name_uz


class WorkoutDay(models.Model):
    plan = models.ForeignKey(
        WorkoutPlan,
        on_delete=models.CASCADE,
        related_name='days',
    )
    day_number = models.PositiveSmallIntegerField()
    title_uz = models.CharField(max_length=200)
    title_ru = models.CharField(max_length=200, blank=True)
    title_en = models.CharField(max_length=200, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        verbose_name = _("Kun")
        verbose_name_plural = _("Kunlar")
        ordering = ['plan', 'day_number']
        unique_together = (('plan', 'day_number'),)

    def __str__(self):
        return f"{self.plan.name_uz} — Kun {self.day_number}"


class WorkoutDayExercise(models.Model):
    day = models.ForeignKey(
        WorkoutDay,
        on_delete=models.CASCADE,
        related_name='exercises',
    )
    exercise = models.ForeignKey(
        'exercises.Exercise',
        on_delete=models.PROTECT,
        related_name='+',
    )
    sets = models.PositiveSmallIntegerField(default=3)
    reps = models.PositiveSmallIntegerField(default=10)
    rest_seconds = models.PositiveSmallIntegerField(default=60)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['day', 'order']

    def __str__(self):
        return f"{self.day} — {self.exercise.name_uz}"


class WorkoutSession(models.Model):
    MOOD = [
        ('great', _("Zo'r")),
        ('good', _("Yaxshi")),
        ('okay', _("O'rtacha")),
        ('tired', _("Charchadim")),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='workout_sessions',
    )
    plan = models.ForeignKey(
        WorkoutPlan,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='sessions',
    )
    plan_day_number = models.PositiveSmallIntegerField(null=True, blank=True)
    started_at = models.DateTimeField()
    completed_at = models.DateTimeField(null=True, blank=True)
    duration_seconds = models.PositiveIntegerField(default=0)
    calories_burned = models.PositiveIntegerField(default=0)
    mood = models.CharField(max_length=10, choices=MOOD, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        verbose_name = _("Sessiya")
        verbose_name_plural = _("Sessiyalar")
        ordering = ['-started_at']
        indexes = [
            models.Index(fields=['user', 'started_at']),
        ]

    def __str__(self):
        return f"{self.user.email} — {self.started_at:%Y-%m-%d}"

    @property
    def is_completed(self):
        return self.completed_at is not None


class SessionExercise(models.Model):
    session = models.ForeignKey(
        WorkoutSession,
        on_delete=models.CASCADE,
        related_name='exercises',
    )
    exercise = models.ForeignKey(
        'exercises.Exercise',
        on_delete=models.PROTECT,
        related_name='+',
    )
    sets_completed = models.PositiveSmallIntegerField(default=0)
    reps_per_set = models.JSONField(default=list, blank=True)  # [10,9,8]
    weight_kg = models.FloatField(null=True, blank=True)
    skipped = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['session', 'order']
