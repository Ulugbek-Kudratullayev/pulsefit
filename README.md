# PulseFit — React Native Fitness Ilovasi (Kurs ishi)

> Universitet kurs ishi loyihasi.
> **Stack:** React Native (Expo) + Django REST Framework + SQLite + JWT

---

## 📁 Loyiha tuzilishi

```
React nativeda kurs ishi/
├── TEXNIK_TOPSHIRIQ.md       # To'liq TZ va implementatsiya rejasi
├── README.md                  # Bu fayl
├── pulsefit_backend/          # Django REST API + SQLite
│   ├── config/
│   ├── apps/                  # users, exercises, workouts, trackers, meals, notifications, stats
│   ├── fixtures/              # Demo ma'lumotlar (mashqlar, dasturlar, taomlar)
│   ├── manage.py
│   ├── requirements.txt
│   ├── setup.bat              # Windows uchun avtomatik o'rnatish
│   └── setup.sh               # Linux/Mac uchun
└── pulsefit_mobile/           # Expo + TypeScript mobil ilova
    ├── app/                   # expo-router ekranlari
    ├── src/
    │   ├── api/               # Backend API klient
    │   ├── components/ui/     # Button, Input, Card, Screen
    │   ├── screens/           # Ekranlar
    │   ├── stores/            # Zustand
    │   ├── lib/               # Axios, i18n, MMKV, tokenManager
    │   ├── hooks/             # useTheme, va h.k.
    │   ├── constants/         # theme.ts
    │   └── types/             # TypeScript types
    ├── package.json
    └── app.json
```

---

## 🚀 Tezkor boshlash (Quick Start)

### 1) Backend (Django + SQLite) — 1-terminal

```bash
cd pulsefit_backend

# Avtomatik (Windows):
setup.bat

# Yoki avtomatik (Linux/Mac):
chmod +x setup.sh && ./setup.sh

# Yoki qo'lda:
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Linux/Mac
pip install -r requirements.txt
copy .env.example .env         # Linux: cp .env.example .env
python manage.py migrate
python manage.py seed          # mashqlar, dasturlar, taomlar + demo user yaratadi
python manage.py runserver 0.0.0.0:8000
```

**Backend tayyor:**
- API: http://localhost:8000/api/v1/
- Swagger UI: http://localhost:8000/api/docs/
- Admin: http://localhost:8000/admin/ (admin@pulsefit.uz / admin12345)
- Demo user: demo@pulsefit.uz / demo12345

---

### 2) Frontend (Expo) — 2-terminal

```bash
cd pulsefit_mobile

# Paketlarni o'rnatish
npm install
# yoki: yarn install
# yoki: pnpm install

# .env yaratish
copy .env.example .env         # Linux: cp .env.example .env
```

**MUHIM:** `.env` faylida backend URL'ini to'g'ri sozlang:

| Holat | URL |
|-------|-----|
| Android emulator | `http://10.0.2.2:8000/api/v1` |
| iOS simulator | `http://localhost:8000/api/v1` |
| Real qurilma (USB) | `http://192.168.X.X:8000/api/v1` (kompyuter Wi-Fi IP) |
| Web | `http://localhost:8000/api/v1` |

```bash
# Serverni ishga tushirish
npx expo start

# Telefoningizda Expo Go ilovasi orqali QR kodni skanerlang
# Yoki: a (Android emulator), i (iOS simulator), w (web)
```

---

## ✅ Demo flow (komissiyaga ko'rsatish)

1. Backend va frontend serverlari ishlab turibdi
2. Telefonda Expo Go orqali ilovani oching
3. **Onboarding** → 3 ta slayd
4. **Login**: demo@pulsefit.uz / demo12345 (yoki yangi akkaunt yarating)
5. **Dashboard** → bugungi natijalar (suv, qadam, kaloriya, vazn)
6. **Mashqlar** tab → 30+ mashq, kategoriya bo'yicha filtrlash
7. **Mashq detali** → ko'rsatmalar, mushak guruhlari, kaloriya
8. **Dasturlar** tab → 4 ta tayyor dastur
9. **Dastur detali** → kunlar, mashqlar
10. **"Mashqni boshlash"** → sessiya, timer, set tracker, rest timer
11. **Trackerlar** tab → Suv qo'shish, vazn yozish, taom qo'shish (mahalliy bazadan)
12. **Profil** tab → statistika, yutuqlar, mavzu (light/dark), chiqish

---

## 📋 Backend API endpointlar

To'liq ro'yxat: `http://localhost:8000/api/docs/` (Swagger UI)

### Asosiy:
```
POST   /api/v1/auth/register/      Ro'yxatdan o'tish
POST   /api/v1/auth/login/         Kirish (JWT qaytaradi)
POST   /api/v1/auth/token/refresh/ Token yangilash
GET    /api/v1/users/me/           Joriy foydalanuvchi
PATCH  /api/v1/users/me/           Profil yangilash

GET    /api/v1/exercises/          Mashqlar ro'yxati
GET    /api/v1/exercises/{id}/     Mashq detali
GET    /api/v1/workouts/plans/     Tayyor dasturlar
POST   /api/v1/workouts/sessions/  Sessiyani boshlash
POST   /api/v1/workouts/sessions/{id}/complete/  Sessiyani tugatish

GET    /api/v1/trackers/water/today/    Bugungi suv
POST   /api/v1/trackers/water/add/      Suv qo'shish
POST   /api/v1/trackers/steps/sync/     Pedometer sync
POST   /api/v1/trackers/weight/         Vazn yozish

GET    /api/v1/meals/foods/?search=osh  Taom qidirish
POST   /api/v1/meals/entries/           Taom qo'shish
GET    /api/v1/meals/entries/today/     Bugungi xulosa

GET    /api/v1/stats/overview/          Umumiy statistika
GET    /api/v1/stats/weekly/            Haftalik
GET    /api/v1/stats/achievements/      Yutuqlar
```

---

## 🧱 Texnologik stek

### Backend
- **Python 3.11+**
- **Django 5.0** — web framework
- **Django REST Framework** — REST API
- **djangorestframework-simplejwt** — JWT autentifikatsiya
- **SQLite** — file-based database
- **drf-spectacular** — Swagger/OpenAPI hujjatlash
- **django-cors-headers** — CORS
- **Pillow** — rasm bilan ishlash

### Frontend
- **Expo SDK 51** + **React Native 0.74**
- **TypeScript 5.x**
- **expo-router** — file-based navigation
- **TanStack Query v5** — server state
- **Zustand** — client state
- **Axios** — HTTP klient (JWT auto-refresh bilan)
- **React Hook Form + Zod** — formalar
- **Expo SecureStore** — JWT saqlash
- **MMKV** — tezkor lokal cache
- **i18next** — lokalizatsiya
- **Expo Sensors** — pedometer (qadam)
- **Expo Notifications** — push
- **@expo/vector-icons** — Ionicons

---

## 📊 Loyiha statistikasi

| Element | Soni |
|---------|------|
| Django apps | 7 (users, exercises, workouts, trackers, meals, notifications, stats) |
| Modellar | 18 |
| API endpointlar | 30+ |
| Mashqlar (fixture) | 30+ |
| Tayyor dasturlar | 4 |
| Mahalliy taomlar | 40+ |
| Mobil ekranlar | 15+ |
| TypeScript LOC | ~3000 |
| Python LOC | ~2000 |

---

## 🎓 Kurs ishi hujjati uchun

To'liq Texnik Topshiriq (TZ) hujjati: **`TEXNIK_TOPSHIRIQ.md`**
- 1900+ qator
- 13 ta katta bo'lim
- Funksional/nofunksional talablar
- Arxitektura diagrammasi
- DB sxemasi
- 7 haftalik implementatsiya rejasi
- Test rejasi, deployment

---

## 🔧 Foydali buyruqlar

### Backend
```bash
python manage.py makemigrations    # Yangi modeldan migration yaratish
python manage.py migrate           # Migrationlarni qo'llash
python manage.py createsuperuser   # Admin yaratish
python manage.py seed              # Hammasini bir komandada
python manage.py shell             # Django shell
python manage.py dbshell           # SQLite shell
```

### Frontend
```bash
npx expo start                     # Dev server
npx expo start --android           # Android emulator
npx expo start --tunnel            # ngrok tunnel (real qurilma uchun)
npm run type-check                 # TypeScript tekshirish
```

---

## 🐛 Tez-tez uchraydigan muammolar

### "Network Error" mobil ilovada
- Backend ishlayotganini tekshiring (`http://localhost:8000/api/docs/` ochilishi kerak)
- `pulsefit_mobile/.env` da to'g'ri URL borligini tekshiring
- Real qurilma uchun: kompyuter Wi-Fi IP'sini ishlating va `0.0.0.0:8000` da serverni ishga tushiring
- Telefon va kompyuter bir Wi-Fi tarmog'ida bo'lishi kerak

### Migrations xatosi
```bash
# Hammasini tozalab qaytadan
del db.sqlite3
del apps\*\migrations\0*.py
python manage.py makemigrations users exercises workouts trackers meals notifications
python manage.py migrate
python manage.py seed
```

### Pedometer ishlamayapti
- Real qurilmada (emulatorlarda yo'q) ishlaydi
- Android: ACTIVITY_RECOGNITION ruxsati kerak
- iOS: Motion permission kerak

---

## 📝 Litsenziya

Kurs ishi loyihasi — ta'lim maqsadida ishlatish uchun.

## 👤 Muallif

**Talaba:** [Sizning ismingiz]
**Universitet:** [Universitet nomi]
**Yo'nalish:** Dasturiy injiniring
**Sana:** 2026-yil

---

**Omad! 💪🔥**
