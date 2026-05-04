# PulseFit Backend (Django + DRF + SQLite)

## ⚡ Tez ishga tushirish

### Windows:
```cmd
setup.bat
python manage.py runserver
```

### Linux/Mac:
```bash
chmod +x setup.sh && ./setup.sh
python manage.py runserver
```

### Qo'lda:
```bash
python -m venv venv
venv\Scripts\activate           # yoki: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed           # mashqlar, dasturlar, taomlar + demo user
python manage.py runserver 0.0.0.0:8000
```

## 🌐 URLlar

- **Admin:** http://localhost:8000/admin/  (admin@pulsefit.uz / admin12345)
- **API:** http://localhost:8000/api/v1/
- **Swagger UI:** http://localhost:8000/api/docs/
- **OpenAPI schema:** http://localhost:8000/api/schema/

## 👤 Demo akkauntlar

| Email | Parol | Rol |
|-------|-------|-----|
| admin@pulsefit.uz | admin12345 | Superuser |
| demo@pulsefit.uz | demo12345 | Oddiy user (profil to'ldirilgan) |

## 📦 Apps

| App | Vazifasi | Modellari |
|-----|----------|-----------|
| `users` | Foydalanuvchi va profil | User, UserProfile |
| `exercises` | Mashqlar | Exercise, ExerciseCategory |
| `workouts` | Dastur va sessiyalar | WorkoutPlan, WorkoutDay, WorkoutDayExercise, WorkoutSession, SessionExercise |
| `trackers` | Suv, qadam, vazn | WaterIntake, WaterEntry, StepRecord, WeightLog |
| `meals` | Taomlar | FoodItem, MealEntry |
| `notifications` | Push tokenlar | DeviceToken, NotificationLog |
| `stats` | Statistika hisoblash | (modellar yo'q, faqat endpoints) |

## 🔑 JWT Auth

```bash
# Login
curl -X POST http://localhost:8000/api/v1/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@pulsefit.uz","password":"demo12345"}'

# Javob:
# {"access":"...","refresh":"...","user":{...}}

# Himoyalangan endpoint
curl http://localhost:8000/api/v1/users/me/ \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

## 🗄️ Database

- **Engine:** SQLite (`db.sqlite3` fayl)
- **Backup:** Faylni nusxa olish kifoya
- **Production'da:** PostgreSQL'ga oson ko'chirish (`settings.py` -> `DATABASES`)

## 🚀 Production deploy (PythonAnywhere — bepul)

1. www.pythonanywhere.com da ro'yxatdan o'ting
2. Bash console: `git clone <repo>`
3. `mkvirtualenv venv --python=3.11`
4. `pip install -r requirements.txt`
5. Web tab: yangi Manual Web App (Python 3.11)
6. WSGI faylini sozlang (Django)
7. `.env` da `DEBUG=False`, `ALLOWED_HOSTS=username.pythonanywhere.com`
8. `python manage.py migrate && python manage.py collectstatic`
9. URL: `username.pythonanywhere.com`
