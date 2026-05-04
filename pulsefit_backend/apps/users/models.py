"""Foydalanuvchi va profil modellari."""
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    """Email asosida login qilish uchun custom user manager."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email majburiy")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser uchun is_staff=True bo'lishi shart")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser uchun is_superuser=True bo'lishi shart")
        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    """Email asosida login qiluvchi foydalanuvchi modeli."""

    username = None
    email = models.EmailField(_("Email"), unique=True)
    full_name = models.CharField(_("Ismi"), max_length=150, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        verbose_name = _("Foydalanuvchi")
        verbose_name_plural = _("Foydalanuvchilar")
        ordering = ['-date_joined']

    def __str__(self):
        return self.email


class UserProfile(models.Model):
    """Foydalanuvchining qo'shimcha fitness ma'lumotlari."""

    GENDER_CHOICES = [
        ('male', _("Erkak")),
        ('female', _("Ayol")),
    ]
    GOAL_CHOICES = [
        ('lose', _("Vazn yo'qotish")),
        ('gain', _("Vazn oshirish")),
        ('maintain', _("Vaznni saqlash")),
        ('endurance', _("Chidamlilik")),
    ]
    ACTIVITY_CHOICES = [
        ('sedentary', _("Past (kam harakat)")),
        ('light', _("Engil (haftada 1-3)")),
        ('moderate', _("O'rtacha (haftada 3-5)")),
        ('active', _("Yuqori (har kuni)")),
    ]
    LANG_CHOICES = [('uz', "O'zbek"), ('ru', "Русский"), ('en', "English")]
    THEME_CHOICES = [('light', "Light"), ('dark', "Dark"), ('system', "System")]

    user = models.OneToOneField(
        'users.User',
        on_delete=models.CASCADE,
        related_name='profile',
    )
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True)
    height = models.FloatField(_("Bo'y (sm)"), null=True, blank=True)
    weight = models.FloatField(_("Vazn (kg)"), null=True, blank=True)
    target_weight = models.FloatField(null=True, blank=True)
    goal = models.CharField(max_length=20, choices=GOAL_CHOICES, blank=True)
    activity_level = models.CharField(max_length=20, choices=ACTIVITY_CHOICES, blank=True)
    daily_calorie_goal = models.PositiveIntegerField(default=2000)
    daily_water_goal = models.PositiveIntegerField(default=2500)
    daily_step_goal = models.PositiveIntegerField(default=8000)
    language = models.CharField(max_length=2, choices=LANG_CHOICES, default='uz')
    theme = models.CharField(max_length=10, choices=THEME_CHOICES, default='system')
    notif_workout = models.BooleanField(default=True)
    notif_water = models.BooleanField(default=True)
    notif_weekly_report = models.BooleanField(default=True)
    notif_achievements = models.BooleanField(default=True)
    onboarding_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Profil")
        verbose_name_plural = _("Profillar")

    def __str__(self):
        return f"Profile of {self.user.email}"

    @property
    def bmi(self):
        if self.height and self.weight and self.height > 0:
            h_m = self.height / 100
            return round(self.weight / (h_m * h_m), 1)
        return None

    def calculate_daily_calories(self):
        """Mifflin-St Jeor formulasi bo'yicha kunlik kaloriya normasi."""
        if not all([self.age, self.height, self.weight, self.gender, self.activity_level]):
            return self.daily_calorie_goal
        if self.gender == 'male':
            bmr = 10 * self.weight + 6.25 * self.height - 5 * self.age + 5
        else:
            bmr = 10 * self.weight + 6.25 * self.height - 5 * self.age - 161
        multipliers = {
            'sedentary': 1.2,
            'light': 1.375,
            'moderate': 1.55,
            'active': 1.725,
        }
        tdee = bmr * multipliers.get(self.activity_level, 1.2)
        if self.goal == 'lose':
            tdee -= 400
        elif self.goal == 'gain':
            tdee += 400
        return int(tdee)
