@echo off
REM PulseFit backend setup (Windows)

echo ===== PulseFit Backend Setup =====

REM Virtualenv yaratish
if not exist venv (
    echo [1/5] Virtualenv yaratilmoqda...
    python -m venv venv
)

REM Faollashtirish
call venv\Scripts\activate

REM Paketlarni o'rnatish
echo [2/5] Paketlar o'rnatilmoqda...
pip install --upgrade pip
pip install -r requirements.txt

REM .env nusxalash
if not exist .env (
    echo [3/5] .env yaratilmoqda...
    copy .env.example .env
)

REM Migratsiyalar
echo [4/5] Migratsiyalar...
python manage.py makemigrations users exercises workouts trackers meals notifications
python manage.py migrate

REM Seed (kategoriya, mashq, dastur, taom + demo user)
echo [5/5] Demo ma'lumotlar yuklanmoqda...
python manage.py seed

echo.
echo ===== Tayyor! =====
echo Server ishga tushirish: python manage.py runserver
echo Admin: http://localhost:8000/admin/  (admin@pulsefit.uz / admin12345)
echo API:   http://localhost:8000/api/docs/
echo Demo:  demo@pulsefit.uz / demo12345
pause
