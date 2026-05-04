"""Mashqlar modellari."""
from django.db import models
from django.utils.translation import gettext_lazy as _


class ExerciseCategory(models.Model):
    """Mashqlar kategoriyasi (ko'krak, oyoq, ...)."""
    slug = models.SlugField(max_length=50, unique=True)
    name_uz = models.CharField(max_length=100)
    name_ru = models.CharField(max_length=100, blank=True)
    name_en = models.CharField(max_length=100, blank=True)
    icon = models.CharField(max_length=50, default='fitness')
    color = models.CharField(max_length=7, default='#FF6B35')
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        verbose_name = _("Kategoriya")
        verbose_name_plural = _("Kategoriyalar")
        ordering = ['order', 'name_uz']

    def __str__(self):
        return self.name_uz


class Exercise(models.Model):
    DIFFICULTY = [
        ('beginner', _("Boshlang'ich")),
        ('intermediate', _("O'rta")),
        ('advanced', _("Yuqori")),
    ]
    EQUIPMENT = [
        ('none', _("Yo'q")),
        ('dumbbell', _("Gantel")),
        ('barbell', _("Shtanga")),
        ('kettlebell', _("Girya")),
        ('band', _("Rezina")),
        ('machine', _("Trenajor")),
    ]

    slug = models.SlugField(max_length=120, unique=True)
    category = models.ForeignKey(
        ExerciseCategory,
        on_delete=models.PROTECT,
        related_name='exercises',
    )
    name_uz = models.CharField(max_length=200)
    name_ru = models.CharField(max_length=200, blank=True)
    name_en = models.CharField(max_length=200, blank=True)
    description_uz = models.TextField(blank=True)
    description_ru = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    muscle_groups = models.CharField(
        max_length=255,
        blank=True,
        help_text="Vergul bilan: 'pectoralis,triceps'",
    )
    equipment = models.CharField(max_length=20, choices=EQUIPMENT, default='none')
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY, default='beginner')
    instructions_uz = models.TextField(
        blank=True,
        help_text="Har bir qadam yangi qator (\\n)",
    )
    instructions_ru = models.TextField(blank=True)
    instructions_en = models.TextField(blank=True)
    tips_uz = models.TextField(blank=True)
    tips_ru = models.TextField(blank=True)
    tips_en = models.TextField(blank=True)
    media_url = models.URLField(max_length=500, blank=True)
    thumbnail = models.ImageField(upload_to='exercises/thumbs/', blank=True, null=True)
    duration_seconds = models.PositiveIntegerField(null=True, blank=True)
    default_reps = models.PositiveIntegerField(default=10)
    default_sets = models.PositiveIntegerField(default=3)
    calories_per_minute = models.FloatField(default=5.0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Mashq")
        verbose_name_plural = _("Mashqlar")
        ordering = ['category', 'name_uz']
        indexes = [
            models.Index(fields=['category', 'difficulty']),
            models.Index(fields=['is_active']),
        ]

    def __str__(self):
        return self.name_uz
