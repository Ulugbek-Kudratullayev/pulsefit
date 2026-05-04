#!/usr/bin/env bash
set -e

echo "===== PulseFit Backend Setup ====="

if [ ! -d "venv" ]; then
    echo "[1/5] Virtualenv yaratilmoqda..."
    python3 -m venv venv
fi

source venv/bin/activate

echo "[2/5] Paketlar o'rnatilmoqda..."
pip install --upgrade pip
pip install -r requirements.txt

if [ ! -f ".env" ]; then
    echo "[3/5] .env yaratilmoqda..."
    cp .env.example .env
fi

echo "[4/5] Migratsiyalar..."
python manage.py makemigrations users exercises workouts trackers meals notifications
python manage.py migrate

echo "[5/5] Demo ma'lumotlar yuklanmoqda..."
python manage.py seed

echo ""
echo "===== Tayyor! ====="
echo "Server: python manage.py runserver"
echo "Admin:  http://localhost:8000/admin/  (admin@pulsefit.uz / admin12345)"
echo "API:    http://localhost:8000/api/docs/"
echo "Demo:   demo@pulsefit.uz / demo12345"
