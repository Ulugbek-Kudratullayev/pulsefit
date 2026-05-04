"""Barcha fixturelarni bir komandada yuklash."""
from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = "PulseFit ma'lumotlarini SQLite'ga yuklash (kategoriya, mashq, dastur, taom)"

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Migratsiyalar yaratilmoqda..."))
        call_command('makemigrations', verbosity=0)
        self.stdout.write(self.style.NOTICE("Migratsiyalar qo'llanmoqda..."))
        call_command('migrate', verbosity=0)

        files = [
            'fixtures/01_categories.json',
            'fixtures/02_exercises.json',
            'fixtures/03_workout_plans.json',
            'fixtures/04_foods.json',
        ]
        for f in files:
            self.stdout.write(f"Yuklanmoqda: {f}")
            try:
                call_command('loaddata', f, verbosity=1)
            except Exception as exc:
                self.stdout.write(self.style.ERROR(f"  Xato: {exc}"))

        # Demo superuser yaratish
        if not User.objects.filter(email='admin@pulsefit.uz').exists():
            User.objects.create_superuser(
                email='admin@pulsefit.uz',
                password='admin12345',
                full_name='Admin',
            )
            self.stdout.write(self.style.SUCCESS(
                "Admin yaratildi: admin@pulsefit.uz / admin12345"
            ))

        # Demo foydalanuvchi
        if not User.objects.filter(email='demo@pulsefit.uz').exists():
            user = User.objects.create_user(
                email='demo@pulsefit.uz',
                password='demo12345',
                full_name='Demo Foydalanuvchi',
            )
            profile = user.profile
            profile.age = 22
            profile.gender = 'male'
            profile.height = 178
            profile.weight = 75
            profile.target_weight = 72
            profile.goal = 'lose'
            profile.activity_level = 'moderate'
            profile.onboarding_completed = True
            profile.save()
            self.stdout.write(self.style.SUCCESS(
                "Demo user yaratildi: demo@pulsefit.uz / demo12345"
            ))

        self.stdout.write(self.style.SUCCESS("\n[OK] Seed yakunlandi!"))
        self.stdout.write("Endi: python manage.py runserver")
        self.stdout.write("Admin: http://localhost:8000/admin/")
        self.stdout.write("API: http://localhost:8000/api/docs/")
