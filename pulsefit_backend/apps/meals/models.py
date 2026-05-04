"""Taomlar (mahalliy bazasi) va kunlik iste'mol modellari."""
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class FoodItem(models.Model):
    """Taomlar bazasi (mahalliy + universal)."""
    CATEGORY = [
        ('national', _("Milliy taomlar")),
        ('fast_food', _("Fast food")),
        ('fruit', _("Mevalar")),
        ('vegetable', _("Sabzavotlar")),
        ('meat', _("Go'sht")),
        ('dairy', _("Sutli mahsulotlar")),
        ('grain', _("Don mahsulotlari")),
        ('drink', _("Ichimliklar")),
        ('other', _("Boshqa")),
    ]

    slug = models.SlugField(max_length=120, unique=True)
    name_uz = models.CharField(max_length=200)
    name_ru = models.CharField(max_length=200, blank=True)
    name_en = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY)
    calories = models.FloatField(help_text="100g uchun (kkal)")
    protein = models.FloatField(default=0)
    carbs = models.FloatField(default=0)
    fat = models.FloatField(default=0)
    default_portion = models.PositiveIntegerField(default=100, help_text="gramm")
    image = models.ImageField(upload_to='foods/', blank=True, null=True)
    image_url = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("Taom (baza)")
        verbose_name_plural = _("Taomlar bazasi")
        ordering = ['name_uz']

    def __str__(self):
        return self.name_uz


class MealEntry(models.Model):
    MEAL_TYPE = [
        ('breakfast', _("Nonushta")),
        ('lunch', _("Tushlik")),
        ('dinner', _("Kechki ovqat")),
        ('snack', _("Yengil ovqat")),
    ]
    SOURCE = [
        ('manual', _("Qo'lda")),
        ('database', _("Bazadan")),
        ('barcode', _("Barkod")),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='meal_entries',
    )
    food_item = models.ForeignKey(
        FoodItem,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name='entries',
    )
    date = models.DateField()
    meal_type = models.CharField(max_length=20, choices=MEAL_TYPE)
    name = models.CharField(max_length=200)
    portion_size = models.FloatField(help_text="gramm")
    calories = models.FloatField()
    protein = models.FloatField(default=0)
    carbs = models.FloatField(default=0)
    fat = models.FloatField(default=0)
    source = models.CharField(max_length=20, choices=SOURCE, default='manual')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _("Iste'mol qilingan taom")
        verbose_name_plural = _("Kundalik taomlar")
        ordering = ['-date', '-created_at']
        indexes = [models.Index(fields=['user', 'date'])]

    def __str__(self):
        return f"{self.user.email} — {self.date} {self.name}"
