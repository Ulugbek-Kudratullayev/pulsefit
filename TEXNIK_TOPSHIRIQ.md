# TEXNIK TOPSHIRIQ (TZ) VA IMPLEMENTATSIYA REJASI

## Loyiha: "PulseFit" — Shaxsiy Fitness Yordamchisi

**Hujjat versiyasi:** 1.0
**Sana:** 04.05.2026
**Muallif:** [Talabaning F.I.Sh.]
**Rahbar:** [Ilmiy rahbar F.I.Sh.]
**Universitet:** [Universitet nomi]
**Fakultet:** [Fakultet nomi]
**Yo'nalish:** Dasturiy injiniring / Axborot tizimlari

---

## MUNDARIJA

1. Umumiy ma'lumot
2. Funksional talablar
3. Nofunksional talablar
4. Texnologik stek
5. Arxitektura
6. Ma'lumotlar bazasi sxemasi
7. UI/UX dizayn
8. Implementatsiya rejasi (7 hafta)
9. Test rejasi
10. Deployment
11. Risklar va cheklovlar
12. Kurs ishi hujjati tarkibi
13. Murakkablik bahosi va vaqt

---

# 1. UMUMIY MA'LUMOT

## 1.1. Loyiha nomi va brendingi

**Loyiha nomi:** PulseFit

**Sloganlari:**
- "Sening puls — sening kuching"
- "Har kungi harakat — sog'lom hayot"

**Loyiha turi:** Mobil ilova (cross-platform — Android va iOS)

**Loyiha kategoriyasi:** Sog'liq va fitness (Health & Fitness)

**Variantlar (agar PulseFit yoqmasa):**
- FitLife — universal va sodda
- SportCard — o'zbekcha singan brend
- ActiveUz — milliy element bilan
- MyFit — qisqa va eslab qolinadigan

## 1.2. Loyiha maqsadi

**Asosiy maqsad:** Foydalanuvchilarga uy sharoitida yoki sport zalida mustaqil ravishda jismoniy mashqlar bilan shug'ullanish, kunlik faollikni kuzatish va sog'lom turmush tarzini olib borishga yordam beradigan zamonaviy mobil ilova yaratish.

**Akademik maqsad:** React Native va Expo platformasida zamonaviy mobil ilovalar ishlab chiqishning to'liq siklini (talab tahlili, dizayn, implementatsiya, testlash, deploy) o'rganish va amaliyotda qo'llash.

## 1.3. Loyiha vazifalari

1. Foydalanuvchilarning shaxsiy parametrlarini saqlash va tahlil qilish
2. 100+ mashqlardan iborat katalogni taqdim etish
3. Tayyor mashq dasturlarini (workout plans) tavsiya qilish
4. Kunlik aktivlikni avtomatik kuzatish (qadam, kaloriya)
5. Suv ichish, vazn o'zgarishini qo'lda kiritish imkoniyati
6. Statistik tahlil va vizual grafiklar ko'rsatish
7. Bildirishnomalar orqali foydalanuvchini motivatsiya qilish
8. Offline rejimda ham ishlash imkoniyati

## 1.4. Maqsadli auditoriya

| Segment | Yoshi | Ulushi | Ehtiyojlar |
|---------|-------|--------|-----------|
| Yoshlar (talabalar) | 18-25 | 40% | Tana shakli, mushaklar |
| Ish bilan band kishilar | 25-40 | 35% | Vaqtni tejovchi mashqlar, stress kamaytirish |
| Sog'liqni kuzatuvchilar | 40-55 | 20% | Vazn nazorati, kardio, sog'lik |
| Sportchilar | 16-35 | 5% | Professional dasturlar, tahlil |

**Asosiy persona — Aziz, 22 yosh:**
- Talaba, kuniga 1-2 soat bo'sh vaqti bor
- Uyda mashq qilishni xohlaydi (sport zaliga vaqt va pul yo'q)
- Telefoni — Android (mid-range, 4 GB RAM)
- O'zbek tilidagi kontentni afzal ko'radi
- Ijtimoiy tarmoqlarda faol

## 1.5. Asosiy muammo va yechim

**Muammo:**
1. O'zbek tilida sifatli fitness ilovalar deyarli yo'q
2. Xorijiy ilovalar (MyFitnessPal, Nike Training) — ingliz/rus tilida, premium funksiyalari pullik
3. Ko'p ilovalar offline ishlamaydi yoki internetni ko'p talab qiladi
4. Mahalliy taom kaloriyalari (osh, somsa, manti) hisoblanmaydi
5. Yangi boshlovchilar uchun aniq dastur tanlash qiyin

**Yechim — PulseFit:**
1. To'liq o'zbek tilida (kelajakda ru/en)
2. Bepul, asosiy funksiyalar reklamasiz
3. Offline rejim qo'llab-quvvatlanadi
4. Mahalliy taomlar bazasi bo'ladi
5. Daraja bo'yicha tayyor dasturlar (boshlang'ich/o'rta/yuqori)

## 1.6. Raqobatchilar tahlili

| Ilova | Plyus | Minus | PulseFit afzalligi |
|-------|-------|-------|-------------------|
| Nike Training Club | Sifatli video | Faqat ingliz | O'zbek tili |
| MyFitnessPal | Katta taom bazasi | Premium pullik | Bepul + mahalliy taom |
| Home Workout | Internet kerak emas | UI eski | Zamonaviy UI |
| Adidas Training | Yaxshi UX | Pullik dasturlar | Hammasi bepul |

---

# 2. FUNKSIONAL TALABLAR

## 2.1. Modul: Autentifikatsiya (Auth)

**Tavsif:** Foydalanuvchi ilovaga kirish, ro'yxatdan o'tish va parolini tiklash imkoniyatlari.

**Funksiyalar:**

### F-1.1. Ro'yxatdan o'tish (Sign Up)
- **Use case:** Yangi foydalanuvchi email va parol bilan akkaunt yaratadi
- **Kirish:** Ism, email, parol (min 8 ta belgi), parolni tasdiqlash
- **Chiqish:** Akkaunt yaratiladi, foydalanuvchi onboarding ekraniga o'tadi
- **Validatsiya:** Email formati, parol kuchliligi (kichik+katta+raqam)

### F-1.2. Tizimga kirish (Sign In)
- **Use case:** Mavjud foydalanuvchi email va parol bilan kiradi
- **Kirish:** Email, parol
- **Chiqish:** JWT token saqlanadi, dashboard ekraniga o'tadi

### F-1.3. Parolni tiklash
- **Use case:** Parolni unutgan foydalanuvchi emailga reset link oladi
- **Kirish:** Email
- **Chiqish:** Reset emaili yuboriladi

### F-1.4. Ijtimoiy autentifikatsiya (ixtiyoriy)
- Google orqali kirish
- Apple Sign In (iOS uchun)

### F-1.5. Tizimdan chiqish (Sign Out)
- Token o'chiriladi, login ekraniga qaytadi

## 2.2. Modul: Onboarding va Profil

### F-2.1. Onboarding (3-4 ekran)
- 1-ekran: Ilova haqida qisqacha
- 2-ekran: Asosiy funksiyalar tanishtirish
- 3-ekran: "Boshlash" tugmasi

### F-2.2. Profil sozlash (birinchi marta kirgan)
- **Kirish:** Yosh, jins, bo'y (sm), vazn (kg), maqsad
- **Maqsadlar:**
  - Vazn yo'qotish
  - Vazn oshirish (mushak)
  - Forma saqlash
  - Chidamlilikni oshirish
- **Hisoblanadi:** BMI, kunlik kaloriya normasi (Mifflin-St Jeor formulasi), suv normasi

### F-2.3. Profilni tahrirlash
- Avatar yuklash (kamera/galereya)
- Ma'lumotlarni o'zgartirish
- Maqsadni o'zgartirish

## 2.3. Modul: Dashboard (Bosh sahifa)

**Tavsif:** Foydalanuvchining kunlik holatini ko'rsatuvchi asosiy ekran.

**Komponentlar:**
- Salomlashish bloki ("Salom, Aziz! 👋")
- Bugungi qadam soni (progress ring bilan)
- Bugungi kaloriya (yangan/iste'mol qilingan)
- Suv miqdori (8 ta stakan ikonkasi)
- Bugungi mashq dasturi (tavsiya)
- Motivatsion iqtibos (kuniga yangi)
- Tezkor harakatlar: "Mashq boshlash", "Suv qo'shish", "Taom qo'shish"

## 2.4. Modul: Mashqlar katalogi

### F-4.1. Kategoriyalar bo'yicha ko'rish
- **Kategoriyalar:**
  - Ko'krak (Chest)
  - Orqa (Back)
  - Oyoq (Legs)
  - Yelka (Shoulders)
  - Bilak (Arms)
  - Qorin (Abs / Core)
  - Kardio (Cardio)
  - Cho'zilish (Stretching)
  - Yoga
  - HIIT

### F-4.2. Mashqni qidirish va filtrlash
- Qidirish bo'yicha (nom)
- Filtr: jihoz (jihozsiz/dumbbell/bar/kettlebell)
- Filtr: daraja (boshlang'ich/o'rta/yuqori)
- Filtr: vaqt (5/10/15/30 min)

### F-4.3. Mashq detallari
- **Ko'rsatiladi:**
  - Nom va tavsif
  - Animatsiya yoki video (GIF / MP4)
  - Texnika bo'yicha qadamma-qadam ko'rsatma (3-5 qadam)
  - Maslahatlar (Tips)
  - Tegishli mushak guruhi (vizual sxema)
  - Standart: 3 set × 12 takror
  - Dam olish: 60 sekund

## 2.5. Modul: Tayyor dasturlar (Workout Plans)

### F-5.1. Dasturlar ro'yxati
- **Boshlang'ich uchun (Beginner):**
  - "7 kunlik boshlanish" — uy sharoitida
  - "Yog'ni yoqish — 14 kun"
- **O'rta daraja (Intermediate):**
  - "Mushaklar uchun 30 kun"
  - "Tana shaklini berish — 21 kun"
- **Yuqori daraja (Advanced):**
  - "Kuchli press — 8 hafta"
  - "Marafonga tayyorgarlik"

### F-5.2. Dastur detallari
- Umumiy tavsif, davomiyligi
- Har bir kun uchun mashqlar ro'yxati
- Dastur jadvali (calendar view)
- "Boshlash" tugmasi

### F-5.3. Faol dastur kuzatuvi
- Joriy kun, qolgan kunlar
- Bajarilgan kunlar (✅ ikonka)
- Streak (ketma-ket kunlar)

## 2.6. Modul: Mashq sessiyasi

### F-6.1. Sessiya boshlash
- Mashqlar ro'yxati ko'rsatiladi
- "Boshlash" bosilgach — birinchi mashq ekrani

### F-6.2. Mashq bajarish ekrani
- Mashq nomi va animatsiya
- Joriy set / jami set (1/3)
- Takrorlar soni
- "Bajardim" tugmasi
- "O'tkazib yuborish" tugmasi

### F-6.3. Dam olish taymeri
- 60 sekund (yoki sozlangan vaqt)
- Audio signal (oxiriga 3 sekund qolganda)
- "+10 sek" / "-10 sek" tugmalari
- "O'tkazib yuborish" imkoniyati

### F-6.4. Sessiya yakuni
- Statistika ko'rsatiladi:
  - Umumiy vaqt
  - Yoqilgan kaloriya (taxminiy)
  - Bajarilgan mashqlar soni
- Hissiyot (mood) so'rash: 😍 / 🙂 / 😐 / 😩
- Saqlash va tarixiga qo'shish

## 2.7. Modul: Qadam sanagich (Pedometer)

### F-7.1. Avtomatik qadam sanash
- Expo Sensors (Pedometer API) yordamida
- Background da ham ishlaydi (cheklangan)
- Bugungi qadam soni dashboard'da

### F-7.2. Qadam tarixiga qarash
- Haftalik bar chart
- Oylik o'rtacha
- Maqsad: 10000 qadam (sozlanadi)
- Yutuqlar (achievements): "5K qadam", "10K qadam", "Marafon haftasi"

## 2.8. Modul: Suv ichish kuzatuvi

### F-8.1. Suv qo'shish
- Tezkor tugmalar: 200 ml, 300 ml, 500 ml
- Maxsus miqdor kiritish
- Bugungi jami: 1500 / 2500 ml

### F-8.2. Vizualizatsiya
- 8 ta stakan (yoki bottlecount)
- Dengiz to'lqini animatsiyasi (Reanimated)
- Tarix: oxirgi 7 kun grafigi

### F-8.3. Bildirishnomalar
- Har 2 soatda eslatma (sozlanadi)
- "Suv ichishni unutmang! 💧"

## 2.9. Modul: Kaloriya hisoblagich

### F-9.1. Taom qo'shish
- Qidirish bo'yicha taom topish
- Mahalliy taomlar bazasi (50+ ta):
  - Osh (1 porsiya — 700 kkal)
  - Lag'mon (550 kkal)
  - Manti (1 dona — 80 kkal)
  - Somsa (250 kkal)
  - Norin, sho'rva va h.k.
- Xalqaro taomlar (USDA ma'lumotlar)
- Porsiya o'lchami kiritish (g, dona)

### F-9.2. Kunlik kaloriya kuzatuvi
- Iste'mol qilingan / Norma (1800/2200 kkal)
- Macros: oqsil, yog', uglevodlar
- Pie chart vizualizatsiya

### F-9.3. Taom turlari bo'yicha
- Nonushta (Breakfast)
- Tushlik (Lunch)
- Kechki ovqat (Dinner)
- Yengil ovqat (Snack)

### F-9.4. Barkod skanerlash (ixtiyoriy)
- Open Food Facts API integratsiyasi

## 2.10. Modul: Vazn kuzatuvi

### F-10.1. Vazn kiritish
- Sana bo'yicha vazn yozish (kg)
- Eslatma kiritish (ixtiyoriy)
- Foto qo'shish (progress photo)

### F-10.2. Vazn grafigi
- Line chart (haftalik / oylik / yillik)
- Boshlang'ich vazn vs joriy
- Maqsadli vaznga necha kg qoldi

### F-10.3. BMI kalkulyatori
- Avtomatik hisoblash
- Indikator: kam vazn / norma / ortiqcha / semizlik

## 2.11. Modul: Statistika va progress

### F-11.1. Umumiy statistika
- Jami sessiyalar soni
- Jami sarflangan vaqt
- Jami yoqilgan kaloriya
- Eng uzun streak

### F-11.2. Haftalik hisobot
- Har hafta yakshanba — push notification
- Haftalik xulosa: "Bu hafta 4 marta mashq qildingiz!"

### F-11.3. Yutuqlar (Achievements)
- "Birinchi mashq" 🏃
- "7 kunlik streak" 🔥
- "10 kg yo'qotish" 💪
- "100 mashq" 🏆
- Boshqalar (15-20 ta)

## 2.12. Modul: Bildirishnomalar

### F-12.1. Push bildirishnomalar
- Kunlik mashq eslatmasi (vaqt sozlanadi)
- Suv ichish eslatmalari
- Streak xavfi: "Streakni yo'qotmang!"
- Yutuq olganda

### F-12.2. Sozlash
- Har bir bildirishnoma turini yoqish/o'chirish
- Vaqt diapazoni (08:00 — 22:00)
- "Tinch rejim" (Do Not Disturb)

## 2.13. Modul: Sozlamalar

- Til (uz / ru / en)
- Mavzu (Light / Dark / System)
- O'lchov birliklari (kg/lb, sm/ft)
- Bildirishnoma sozlamalari
- Profil ma'lumotlari
- Maxfiylik siyosati
- Ilova haqida (versiya, dasturchi)
- Akkauntni o'chirish
- Tizimdan chiqish

## 2.14. Modul: Offline rejim

- Mashqlar katalogi keshlanadi
- Sessiya ma'lumotlari lokal saqlanadi
- Internet paydo bo'lganda — server bilan sinxronlash
- "Offline" indikatori statusda ko'rsatiladi

---

# 3. NOFUNKSIONAL TALABLAR

## 3.1. Ishlash (Performance)

| Metrika | Maqsad | O'lchash usuli |
|---------|--------|----------------|
| FPS (animatsiya) | 60 FPS | React DevTools Profiler |
| Sahifa ochilish vaqti | < 2 sekund | Manual / Flipper |
| Splash → Dashboard | < 3 sekund | Stopwatch test |
| API javob vaqti | < 1 sekund | Network tab |
| Cold start | < 4 sekund | Logcat |

## 3.2. Xavfsizlik (Security)

- Parol Django'ning PBKDF2-SHA256 algoritmi bilan hash qilinadi (Argon2 ham mumkin)
- JWT token bilan API autentifikatsiya (`djangorestframework-simplejwt`)
- Access + Refresh token strategiyasi (15 daqiqa / 7 kun)
- Sezgir ma'lumotlar Expo SecureStore'da saqlanadi
- HTTPS faqat (production'da Let's Encrypt sertifikat)
- Input validatsiya — frontend (Zod) + backend (DRF Serializers)
- SQL Injection'dan himoya (Django ORM parametrlashtirilgan so'rovlar)
- XSS dan himoya (DRF JSONResponse va templating)
- CORS sozlash (`django-cors-headers`)
- Rate limiting (DRF Throttling — `AnonRateThrottle`, `UserRateThrottle`)
- CSRF himoyasi (sessiya autentifikatsiyasida)
- `DEBUG=False` production'da, `ALLOWED_HOSTS` cheklangan
- Maxfiy kalitlar `.env` faylida (`python-decouple` yoki `django-environ`)

## 3.3. Foydalanuvchanlik (Usability)

- Material Design 3 (Android) va iOS HIG (iOS) ga moslik
- Maksimum 3 tap orqali har qanday funksiyaga yetib borish
- Aniq xato xabarlari (o'zbek tilida)
- Bo'sh holatlar (empty states) uchun chiroyli illustratsiyalar
- Loading skeletons (Shimmer)
- Pull-to-refresh
- Haptic feedback (muhim harakatlarda)

## 3.4. Mosligi (Compatibility)

| Platform | Minimum versiya | Maqsadli |
|----------|-----------------|----------|
| Android | 8.0 (API 26) | 14 (API 34) |
| iOS | 14.0 | 17.0 |
| Ekran | 320 dp dan | Phone + Tablet |
| Orientatsiya | Portret (asosan) | + Landscape (videoda) |

## 3.5. Lokalizatsiya

- O'zbek (lotin) — birinchi
- Rus — ikkinchi navbat
- Ingliz — uchinchi navbat
- i18next + JSON resurs fayllari

## 3.6. Offline qo'llab-quvvatlash

- Mashqlar katalogi va dasturlar — keshda
- Sessiya ma'lumotlari — lokal SQLite/MMKV
- Online bo'lganda — automatic sync

## 3.7. Disk hajmi

- APK hajmi: < 50 MB (initial)
- Keshlangan ma'lumotlar bilan: < 200 MB
- Mashq videolari — server'dan stream

## 3.8. Kirish imkoniyati (Accessibility)

- Screen reader uchun accessibilityLabel
- Min font o'lchami 14 sp
- Kontrast nisbati ≥ 4.5:1
- Touch target ≥ 48 dp

---

# 4. TEXNOLOGIK STEK

## 4.1. Frontend (React Native)

### Asosiy framework
- **Expo SDK 51+** — eng tezkor development uchun
- **React Native 0.74+**
- **TypeScript 5.x** — type safety

### Navigatsiya
- **React Navigation v6**
  - Native Stack Navigator
  - Bottom Tab Navigator
  - Drawer Navigator (sozlamalar uchun)

### State Management
- **Zustand** — yengil va sodda (kurs ishi uchun ideal)
- **TanStack Query (React Query) v5** — server state, caching

### Formalar
- **React Hook Form** — performant formalar
- **Zod** — schema validatsiya

### Lokal saqlash
- **MMKV** — tez (AsyncStorage o'rniga)
- **Expo SecureStore** — tokenlar uchun
- **expo-sqlite** — strukturali offline data

### Animatsiyalar
- **React Native Reanimated 3** — 60 FPS animatsiyalar
- **React Native Skia** (ixtiyoriy — chiroyli grafiklar)
- **Lottie React Native** — vector animatsiyalar
- **Moti** — yengil API

### Grafiklar
- **Victory Native XL** yoki **react-native-chart-kit**
- **react-native-svg-charts** — alternativa

### Native funksiyalar
- **Expo Notifications** — push notifications
- **Expo Sensors** — pedometer (qadam)
- **Expo Camera** — barkod skanerlash
- **Expo Image Picker** — galereya
- **Expo Haptics** — vibratsiya

### Lokalizatsiya
- **i18next** + **react-i18next**
- **expo-localization** — qurilma tili aniqlash

### UI Kit (alternativalar)
- **Native Base** yoki **Tamagui** yoki **React Native Paper**
- Tavsiya: **custom komponentlar** (kurs ishi uchun ko'proq o'rganish)

### Yordamchi
- **date-fns** — sana operatsiyalari
- **lodash** — utilitar funksiyalar (faqat kerak qismlar)
- **react-native-toast-message** — toast notifications

## 4.2. Backend (TANLANGAN: Django + SQLite)

### Asosiy stek

**Backend platformasi:** Django 5.x + Django REST Framework + SQLite

**Tanlanishining sabablari (kurs ishi uchun):**
- ✅ **Sof, an'anaviy MVC arxitektura** — komissiyaga tushuntirish oson
- ✅ **Python tilida** — universitetda eng ko'p o'rganiladigan til
- ✅ **SQLite — file-based** — alohida DB server o'rnatish shart emas
- ✅ **Django Admin Panel** — bepul, mashqlar/dasturlarni qo'shish uchun ideal
- ✅ **ORM** — SQL yozish shart emas, modellar orqali ishlaymiz
- ✅ **Django REST Framework** — REST API yaratishning industriya standarti
- ✅ **JWT auth** — `djangorestframework-simplejwt` paketi bilan oson
- ✅ **Hujjatlash** — drf-spectacular (Swagger/OpenAPI avtomatik)
- ✅ **Demo uchun ideal** — `python manage.py runserver` bilan ishlatib bo'ladi

### Asosiy paketlar (`requirements.txt`)

```
Django==5.0.6
djangorestframework==3.15.1
djangorestframework-simplejwt==5.3.1
django-cors-headers==4.3.1
django-filter==24.2
drf-spectacular==0.27.2
Pillow==10.3.0                  # ImageField uchun
python-decouple==3.8            # .env
django-environ==0.11.2          # alternative .env
gunicorn==22.0.0                # production WSGI
whitenoise==6.6.0               # static fayllar
django-extensions==3.2.3        # qulay yordamchi vositalar
```

### Ma'lumotlar bazasi: SQLite

**Sabab:**
- Hech qanday alohida DB server o'rnatish shart emas
- `db.sqlite3` — bitta fayl, GitHub'ga commit qilish qulay
- 100K+ yozuvgacha kurs ishi uchun mukammal ishlaydi
- Backup oson — faylni nusxalash kifoya
- Production'da PostgreSQL'ga oson migratsiya (faqat `DATABASES` sozlash)

```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

### Loyiha tuzilishi (Django backend)

```
pulsefit_backend/
├── manage.py
├── db.sqlite3
├── requirements.txt
├── .env
├── .gitignore
├── pulsefit_backend/        (asosiy proyekt)
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   ├── users/               (user, profile, auth)
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── permissions.py
│   │   └── admin.py
│   ├── exercises/           (mashqlar)
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── workouts/            (dastur, sessiya)
│   ├── trackers/            (suv, qadam, vazn, kaloriya)
│   ├── meals/               (taomlar bazasi)
│   ├── notifications/       (push token, scheduling)
│   └── stats/               (statistika hisoblash)
├── media/                   (foydalanuvchi rasmlar — avatar, vazn foto)
└── static/                  (admin panel uchun)
```

### Servis komponentlari

| Komponent | Texnologiya | Vazifa |
|-----------|-------------|--------|
| Web Server | Django runserver (dev) / Gunicorn (prod) | HTTP serverlash |
| ORM | Django ORM | DB bilan ishlash |
| DB | SQLite | Ma'lumotlar saqlash |
| Auth | JWT (simplejwt) | Token-based authentication |
| API | Django REST Framework | REST endpoints |
| Hujjatlash | drf-spectacular | Swagger UI / OpenAPI 3 |
| Media | Django MEDIA + Pillow | Rasm/avatar saqlash |
| Push | Expo Push API | Mobil push notif (HTTP POST exp.host/api/v2/push/send) |
| Admin | Django Admin | Mashqlar/dasturlar boshqaruvi |
| CORS | django-cors-headers | Mobil ilova bilan ulanish |

### Hosting variantlari (kurs ishi uchun)

| Variant | Xarajat | Murakkablik | Tavsiya |
|---------|---------|-------------|---------|
| **Lokal** (`runserver`) | Bepul | Past | Demo uchun |
| **PythonAnywhere** | Bepul tier | Past | ⭐ TAVSIYA |
| **Render.com** | Bepul tier | O'rta | Yaxshi |
| **Railway.app** | $5 kredit | O'rta | Yaxshi |
| **VPS (Timeweb, RUVDS)** | $3-5/oy | Yuqori | Professional |

### Variant: O'qituvchi boshqa stek so'rasa

- **Variant B (alternativa):** Node.js + Express + Sequelize + SQLite
- **Variant C (alternativa):** FastAPI + SQLAlchemy + SQLite
- **Variant D (alternativa):** Flask + SQLAlchemy + SQLite

Lekin **Django + SQLite** — kurs ishi formatiga eng mos kelgan variant.

## 4.3. DevOps va vositalar

| Kategoriya | Vosita |
|-----------|--------|
| Versiya nazorati | Git + GitHub |
| IDE | VS Code (+ React Native, ESLint, Prettier) |
| Dizayn | Figma |
| Build | EAS Build (Expo) |
| Test qurilma | Android Studio Emulator + real qurilma |
| API testlash | Postman / Thunder Client |
| Hujjatlar | Notion / Markdown |
| Loyiha boshqaruvi | Trello / GitHub Projects |
| Linting | ESLint + Prettier + Husky |

## 4.4. Test stek

- **Jest** — unit testlar
- **React Native Testing Library** — komponent testlari
- **Maestro** yoki **Detox** — E2E testlar
- **MSW** — API mocking

---

# 5. ARXITEKTURA

## 5.1. Yuqori darajadagi arxitektura

```
┌─────────────────────────────────────────────────────────────┐
│                     MOBIL ILOVA (Client)                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              REACT NATIVE + EXPO LAYER                  │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │ │
│  │  │   UI     │  │  Hooks   │  │  Stores  │  │ Utils  │ │ │
│  │  │Komponent │  │  (Custom)│  │ (Zustand)│  │        │ │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────┘ │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │   DATA LAYER (TanStack Query + Axios + MMKV)     │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │     NATIVE MODULES (Sensors, Notifications)      │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS / REST API (JSON)
                           │ JWT Bearer Token
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              DJANGO BACKEND (REST API Server)                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              DJANGO REST FRAMEWORK LAYER                │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │ │
│  │  │  URLs    │  │  Views   │  │Serializer│  │ Perms  │ │ │
│  │  │ (router) │  │(ViewSet) │  │   (DRF)  │  │ (JWT)  │ │ │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  DJANGO ORM LAYER                       │ │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────┐│ │
│  │  │ users  │ │exercise│ │workout │ │tracker │ │ meal ││ │
│  │  │ models │ │ models │ │ models │ │ models │ │models││ │
│  │  └────────┘ └────────┘ └────────┘ └────────┘ └──────┘│ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │   AUTH (JWT)  │  MIDDLEWARE  │  ADMIN PANEL  │  CORS   │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  MA'LUMOTLAR QATLAMI                         │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │  SQLite (file)   │  │  /media (rasm)   │                 │
│  │   db.sqlite3     │  │  /static         │                 │
│  └──────────────────┘  └──────────────────┘                 │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    TASHQI XIZMATLAR                          │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐   │
│  │  Expo Push API │  │  Open Food     │  │  YouTube /   │   │
│  │  (notification)│  │  Facts API     │  │  CDN (video) │   │
│  └────────────────┘  └────────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 5.2. Papkalar tuzilishi (Folder Structure)

```
pulsefit/
├── .expo/
├── .vscode/
├── assets/
│   ├── fonts/
│   ├── images/
│   ├── animations/      (Lottie .json)
│   └── icons/
├── src/
│   ├── api/             (Django REST API klient funksiyalari)
│   │   ├── auth.ts          (login, register, refresh)
│   │   ├── exercises.ts
│   │   ├── workouts.ts
│   │   ├── trackers.ts
│   │   ├── meals.ts
│   │   └── client.ts        (Axios instance + JWT interceptor)
│   ├── components/      (Qayta foydalaniluvchi UI)
│   │   ├── ui/          (Button, Card, Input, Modal)
│   │   ├── forms/
│   │   ├── charts/
│   │   ├── exercise/
│   │   └── layout/
│   ├── screens/         (Ekranlar)
│   │   ├── auth/
│   │   │   ├── SignInScreen.tsx
│   │   │   ├── SignUpScreen.tsx
│   │   │   └── ForgotPasswordScreen.tsx
│   │   ├── onboarding/
│   │   ├── dashboard/
│   │   ├── exercises/
│   │   ├── workouts/
│   │   ├── trackers/
│   │   ├── stats/
│   │   ├── profile/
│   │   └── settings/
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainTabs.tsx
│   │   └── types.ts
│   ├── stores/          (Zustand)
│   │   ├── authStore.ts
│   │   ├── userStore.ts
│   │   ├── workoutStore.ts
│   │   └── settingsStore.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── usePedometer.ts
│   │   ├── useWaterTracker.ts
│   │   └── useTheme.ts
│   ├── lib/
│   │   ├── axios.ts          (HTTP klient sozlash, baseURL)
│   │   ├── tokenManager.ts   (JWT access/refresh)
│   │   ├── notifications.ts  (Expo Push)
│   │   ├── storage.ts        (MMKV wrapper)
│   │   └── i18n.ts
│   ├── utils/
│   │   ├── calculations.ts   (BMI, kaloriya)
│   │   ├── date.ts
│   │   ├── validators.ts
│   │   └── formatters.ts
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── theme.ts
│   │   ├── exercises.ts      (statik ma'lumotlar)
│   │   └── meals.ts          (mahalliy taomlar)
│   ├── types/
│   │   ├── user.ts
│   │   ├── exercise.ts
│   │   ├── workout.ts
│   │   └── api.ts
│   └── locales/
│       ├── uz.json
│       ├── ru.json
│       └── en.json
├── App.tsx
├── app.json             (Expo config)
├── eas.json             (EAS Build config)
├── package.json
├── tsconfig.json
├── babel.config.js
├── .env.example
├── .gitignore
└── README.md
```

## 5.3. Komponentlar ierarxiyasi

```
App.tsx
└── RootNavigator
    ├── AuthNavigator (login bo'lmagan foydalanuvchi)
    │   ├── OnboardingScreen
    │   ├── SignInScreen
    │   ├── SignUpScreen
    │   └── ForgotPasswordScreen
    │
    └── MainTabs (login qilingan foydalanuvchi)
        ├── DashboardStack
        │   ├── DashboardScreen
        │   ├── QuickActionsScreen
        │   └── NotificationsScreen
        ├── WorkoutStack
        │   ├── WorkoutPlansScreen
        │   ├── WorkoutDetailScreen
        │   ├── ExerciseCatalogScreen
        │   ├── ExerciseDetailScreen
        │   └── WorkoutSessionScreen
        ├── TrackersStack
        │   ├── WaterScreen
        │   ├── CalorieScreen
        │   ├── StepsScreen
        │   └── WeightScreen
        ├── StatsStack
        │   ├── OverviewScreen
        │   └── AchievementsScreen
        └── ProfileStack
            ├── ProfileScreen
            ├── EditProfileScreen
            └── SettingsScreen
```

## 5.4. Ma'lumotlar oqimi (Data Flow)

```
[Foydalanuvchi]
      │
      ▼
[UI komponent] ──── User action
      │
      ▼
[Custom Hook] (useWorkout, useWater)
      │
      ├──── [Zustand Store] (lokal state)
      │
      └──── [TanStack Query]
                  │
                  ├──── [Cache (memory + MMKV)]
                  │
                  └──── [API Layer (Axios)]
                              │
                              ▼
                  [JWT Interceptor — Bearer token qo'shadi]
                              │
                              ▼
                  [HTTPS so'rov: api.pulsefit.uz/api/v1/...]
                              │
                              ▼
                  [Django Middleware → URL Router]
                              │
                              ▼
                  [DRF View / ViewSet]
                              │
                              ▼
                  [Permission Class (IsAuthenticated)]
                              │
                              ▼
                  [Serializer (validate + transform)]
                              │
                              ▼
                  [Django ORM — SQLite query]
                              │
                              ▼
                  [JSON Response]
                              │
                              ▼
                  [TanStack Cache yangilanadi]
                              │
                              ▼
                  [UI re-render bo'ladi]
```

## 5.5. Django ilovalari (Apps) va modellari

```
apps/
├── users/
│   └── models.py:
│       ├── User (AbstractUser kengaytmasi)
│       └── UserProfile (OneToOne — qo'shimcha ma'lumotlar)
│
├── exercises/
│   └── models.py:
│       ├── ExerciseCategory
│       ├── Exercise
│       └── MuscleGroup
│
├── workouts/
│   └── models.py:
│       ├── WorkoutPlan
│       ├── WorkoutDay (ForeignKey → WorkoutPlan)
│       ├── WorkoutDayExercise (ForeignKey → WorkoutDay, Exercise)
│       └── WorkoutSession (ForeignKey → User, WorkoutPlan)
│
├── trackers/
│   └── models.py:
│       ├── WaterIntake
│       ├── WaterEntry (ForeignKey → WaterIntake)
│       ├── StepRecord
│       └── WeightLog
│
├── meals/
│   └── models.py:
│       ├── MealCategory
│       ├── FoodItem (mahalliy taomlar bazasi)
│       └── MealEntry (foydalanuvchi iste'moli)
│
└── notifications/
    └── models.py:
        ├── DeviceToken (Expo push token)
        └── NotificationLog
```

## 5.6. REST API endpoints (Django REST Framework)

**Base URL:** `https://api.pulsefit.uz/api/v1/`

### Autentifikatsiya
| Operatsiya | Endpoint | Method | Auth |
|-----------|----------|--------|------|
| Ro'yxatdan o'tish | `/auth/register/` | POST | Yo'q |
| Kirish | `/auth/login/` | POST | Yo'q |
| Token yangilash | `/auth/token/refresh/` | POST | Refresh token |
| Chiqish | `/auth/logout/` | POST | JWT |
| Parol tiklash | `/auth/password/reset/` | POST | Yo'q |
| Parol o'zgartirish | `/auth/password/change/` | POST | JWT |

### Foydalanuvchi (User)
| Operatsiya | Endpoint | Method | Auth |
|-----------|----------|--------|------|
| O'z profilim | `/users/me/` | GET | JWT |
| Profil yangilash | `/users/me/` | PATCH | JWT |
| Avatar yuklash | `/users/me/avatar/` | POST (multipart) | JWT |
| Akkauntni o'chirish | `/users/me/` | DELETE | JWT |

### Mashqlar (Exercises)
| Operatsiya | Endpoint | Method | Auth |
|-----------|----------|--------|------|
| Barcha mashqlar | `/exercises/` | GET | JWT |
| Filtr/qidiruv | `/exercises/?category=chest&difficulty=beginner` | GET | JWT |
| Mashq detali | `/exercises/{id}/` | GET | JWT |
| Kategoriyalar | `/exercises/categories/` | GET | JWT |

### Workout Plans
| Operatsiya | Endpoint | Method | Auth |
|-----------|----------|--------|------|
| Barcha dasturlar | `/workouts/plans/` | GET | JWT |
| Dastur detali | `/workouts/plans/{id}/` | GET | JWT |
| Dasturning kunlari | `/workouts/plans/{id}/days/` | GET | JWT |
| Sessiyani boshlash | `/workouts/sessions/` | POST | JWT |
| Sessiyani tugatish | `/workouts/sessions/{id}/complete/` | POST | JWT |
| Mening sessiyalarim | `/workouts/sessions/?user=me` | GET | JWT |

### Trackerlar
| Operatsiya | Endpoint | Method | Auth |
|-----------|----------|--------|------|
| Bugungi suv | `/trackers/water/today/` | GET | JWT |
| Suv qo'shish | `/trackers/water/add/` | POST | JWT |
| Suv tarixi | `/trackers/water/?from=2026-01-01` | GET | JWT |
| Qadam yozish | `/trackers/steps/` | POST | JWT |
| Qadam tarixi | `/trackers/steps/?days=7` | GET | JWT |
| Vazn yozish | `/trackers/weight/` | POST | JWT |
| Vazn tarixi | `/trackers/weight/?days=30` | GET | JWT |

### Taomlar (Meals)
| Operatsiya | Endpoint | Method | Auth |
|-----------|----------|--------|------|
| Mahalliy taomlar bazasi | `/meals/foods/` | GET | JWT |
| Taom qidirish | `/meals/foods/?search=osh` | GET | JWT |
| Taom qo'shish (kunlik) | `/meals/entries/` | POST | JWT |
| Bugungi kunlik xulosa | `/meals/entries/today/` | GET | JWT |
| Tarix | `/meals/entries/?date=2026-05-04` | GET | JWT |

### Statistika
| Operatsiya | Endpoint | Method | Auth |
|-----------|----------|--------|------|
| Umumiy statistika | `/stats/overview/` | GET | JWT |
| Haftalik xulosa | `/stats/weekly/` | GET | JWT |
| Yutuqlar | `/stats/achievements/` | GET | JWT |

### Notifications
| Operatsiya | Endpoint | Method | Auth |
|-----------|----------|--------|------|
| Push token ro'yxatdan o'tkazish | `/notifications/register/` | POST | JWT |
| Push token o'chirish | `/notifications/unregister/` | POST | JWT |

### Yordamchi
| Operatsiya | Endpoint | Method | Auth |
|-----------|----------|--------|------|
| API hujjatlari (Swagger) | `/api/docs/` | GET | Yo'q |
| OpenAPI sxema | `/api/schema/` | GET | Yo'q |
| Health check | `/api/health/` | GET | Yo'q |

### Standart javob formati

**Muvaffaqiyatli:**
```json
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "total": 100 }
}
```

**Xatolik:**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email yoki parol noto'g'ri",
    "details": { "email": ["Bu email mavjud emas"] }
  }
}
```

---

# 6. MA'LUMOTLAR BAZASI SXEMASI (Django Models / SQLite)

## 6.1. User (Foydalanuvchi) — `apps/users/models.py`

```
TABLE: users_user
─────────────────────────────────────
id              INTEGER PRIMARY KEY AUTOINCREMENT
email           VARCHAR(254) UNIQUE NOT NULL  (login uchun)
username        VARCHAR(150) UNIQUE
first_name      VARCHAR(150)
last_name       VARCHAR(150)
password        VARCHAR(128)  (PBKDF2 hash)
is_active       BOOLEAN DEFAULT TRUE
is_staff        BOOLEAN DEFAULT FALSE
date_joined     DATETIME
last_login      DATETIME NULL
```

## 6.2. UserProfile (Qo'shimcha ma'lumotlar) — `apps/users/models.py`

```
TABLE: users_userprofile
─────────────────────────────────────
id                  INTEGER PRIMARY KEY
user_id             INTEGER UNIQUE FK → users_user(id) ON DELETE CASCADE
avatar              VARCHAR(255) NULL          (media path)
age                 INTEGER NULL
gender              VARCHAR(10)  CHOICES: 'male','female'
height              FLOAT NULL                 (sm)
weight              FLOAT NULL                 (kg)
target_weight       FLOAT NULL
goal                VARCHAR(20)  CHOICES: 'lose','gain','maintain','endurance'
activity_level      VARCHAR(20)  CHOICES: 'sedentary','light','moderate','active'
daily_calorie_goal  INTEGER DEFAULT 2000
daily_water_goal    INTEGER DEFAULT 2500       (ml)
daily_step_goal     INTEGER DEFAULT 8000
language            VARCHAR(2)   CHOICES: 'uz','ru','en' DEFAULT 'uz'
theme               VARCHAR(10)  CHOICES: 'light','dark','system' DEFAULT 'system'
notif_workout       BOOLEAN DEFAULT TRUE
notif_water         BOOLEAN DEFAULT TRUE
notif_weekly_report BOOLEAN DEFAULT TRUE
notif_achievements  BOOLEAN DEFAULT TRUE
created_at          DATETIME
updated_at          DATETIME
```

## 6.3. ExerciseCategory — `apps/exercises/models.py`

```
TABLE: exercises_exercisecategory
─────────────────────────────────────
id          INTEGER PRIMARY KEY
slug        VARCHAR(50) UNIQUE         ('chest','back','legs',...)
name_uz     VARCHAR(100)
name_ru     VARCHAR(100)
name_en     VARCHAR(100)
icon        VARCHAR(50)                 (icon nomi)
color       VARCHAR(7)                  (#FF6B35)
order       INTEGER DEFAULT 0
```

## 6.4. Exercise (Mashq) — `apps/exercises/models.py`

```
TABLE: exercises_exercise
─────────────────────────────────────
id                   INTEGER PRIMARY KEY
slug                 VARCHAR(100) UNIQUE
category_id          INTEGER FK → exercises_exercisecategory(id)
name_uz              VARCHAR(200)
name_ru              VARCHAR(200)
name_en              VARCHAR(200)
description_uz       TEXT
description_ru       TEXT
description_en       TEXT
muscle_groups        VARCHAR(255)  (CSV: 'pectoralis,triceps')
equipment            VARCHAR(20)   CHOICES: 'none','dumbbell','barbell','kettlebell','band'
difficulty           VARCHAR(20)   CHOICES: 'beginner','intermediate','advanced'
instructions_uz      TEXT          (\n bilan ajratilgan qadamlar)
instructions_ru      TEXT
instructions_en      TEXT
tips_uz              TEXT NULL
tips_ru              TEXT NULL
tips_en              TEXT NULL
media_url            VARCHAR(500)  (GIF/MP4 URL)
thumbnail            VARCHAR(255)  (ImageField)
duration_seconds     INTEGER NULL
default_reps         INTEGER DEFAULT 10
default_sets         INTEGER DEFAULT 3
calories_per_minute  FLOAT DEFAULT 5.0
is_active            BOOLEAN DEFAULT TRUE
created_at           DATETIME
```

## 6.5. WorkoutPlan (Tayyor dastur) — `apps/workouts/models.py`

```
TABLE: workouts_workoutplan
─────────────────────────────────────
id                    INTEGER PRIMARY KEY
slug                  VARCHAR(100) UNIQUE
name_uz               VARCHAR(200)
name_ru               VARCHAR(200)
name_en               VARCHAR(200)
description_uz        TEXT
description_ru        TEXT
description_en        TEXT
cover_image           VARCHAR(255)  (ImageField)
level                 VARCHAR(20)   CHOICES: 'beginner','intermediate','advanced'
total_days            INTEGER
workouts_per_week     INTEGER DEFAULT 3
target_goal           VARCHAR(20)   CHOICES: 'lose','gain','maintain','endurance'
estimated_duration    INTEGER       (minut, har bir kun uchun)
is_active             BOOLEAN DEFAULT TRUE
created_at            DATETIME
```

## 6.6. WorkoutDay — `apps/workouts/models.py`

```
TABLE: workouts_workoutday
─────────────────────────────────────
id          INTEGER PRIMARY KEY
plan_id     INTEGER FK → workouts_workoutplan(id) ON DELETE CASCADE
day_number  INTEGER       (1, 2, 3, ...)
title_uz    VARCHAR(200)  ('Ko'krak va trisepslar')
title_ru    VARCHAR(200)
title_en    VARCHAR(200)
notes       TEXT NULL
─────────────────────────────────────
UNIQUE (plan_id, day_number)
```

## 6.7. WorkoutDayExercise — `apps/workouts/models.py`

```
TABLE: workouts_workoutdayexercise
─────────────────────────────────────
id              INTEGER PRIMARY KEY
day_id          INTEGER FK → workouts_workoutday(id) ON DELETE CASCADE
exercise_id     INTEGER FK → exercises_exercise(id)
sets            INTEGER
reps            INTEGER
rest_seconds    INTEGER DEFAULT 60
order           INTEGER DEFAULT 0
```

## 6.8. WorkoutSession (Sessiya) — `apps/workouts/models.py`

```
TABLE: workouts_workoutsession
─────────────────────────────────────
id                  INTEGER PRIMARY KEY
user_id             INTEGER FK → users_user(id) ON DELETE CASCADE
plan_id             INTEGER FK → workouts_workoutplan(id) NULL
plan_day_number     INTEGER NULL
started_at          DATETIME
completed_at        DATETIME NULL
duration_seconds    INTEGER DEFAULT 0
calories_burned     INTEGER DEFAULT 0
mood                VARCHAR(10)  CHOICES: 'great','good','okay','tired' NULL
notes               TEXT NULL
─────────────────────────────────────
INDEX: user_id, started_at
```

## 6.9. SessionExercise — `apps/workouts/models.py`

```
TABLE: workouts_sessionexercise
─────────────────────────────────────
id                INTEGER PRIMARY KEY
session_id        INTEGER FK → workouts_workoutsession(id) ON DELETE CASCADE
exercise_id       INTEGER FK → exercises_exercise(id)
sets_completed    INTEGER DEFAULT 0
reps_per_set      VARCHAR(255)  (JSON: '[10,9,8]')
weight_kg         FLOAT NULL
skipped           BOOLEAN DEFAULT FALSE
order             INTEGER
```

## 6.10. WaterIntake — `apps/trackers/models.py`

```
TABLE: trackers_waterintake
─────────────────────────────────────
id          INTEGER PRIMARY KEY
user_id     INTEGER FK → users_user(id) ON DELETE CASCADE
date        DATE
total_ml    INTEGER DEFAULT 0
goal_ml     INTEGER
updated_at  DATETIME
─────────────────────────────────────
UNIQUE (user_id, date)
INDEX: user_id, date
```

## 6.11. WaterEntry — `apps/trackers/models.py`

```
TABLE: trackers_waterentry
─────────────────────────────────────
id          INTEGER PRIMARY KEY
intake_id   INTEGER FK → trackers_waterintake(id) ON DELETE CASCADE
amount_ml   INTEGER         (200, 300, 500)
time        DATETIME
```

## 6.12. StepRecord — `apps/trackers/models.py`

```
TABLE: trackers_steprecord
─────────────────────────────────────
id              INTEGER PRIMARY KEY
user_id         INTEGER FK → users_user(id) ON DELETE CASCADE
date            DATE
count           INTEGER DEFAULT 0
distance_km     FLOAT DEFAULT 0
calories_burned INTEGER DEFAULT 0
goal            INTEGER
updated_at      DATETIME
─────────────────────────────────────
UNIQUE (user_id, date)
```

## 6.13. WeightLog — `apps/trackers/models.py`

```
TABLE: trackers_weightlog
─────────────────────────────────────
id          INTEGER PRIMARY KEY
user_id     INTEGER FK → users_user(id) ON DELETE CASCADE
date        DATE
weight_kg   FLOAT
note        TEXT NULL
photo       VARCHAR(255) NULL  (ImageField)
created_at  DATETIME
─────────────────────────────────────
INDEX: user_id, date
```

## 6.14. FoodItem (Mahalliy taomlar bazasi) — `apps/meals/models.py`

```
TABLE: meals_fooditem
─────────────────────────────────────
id              INTEGER PRIMARY KEY
slug            VARCHAR(100) UNIQUE
name_uz         VARCHAR(200)        ('Osh', 'Manti', 'Somsa')
name_ru         VARCHAR(200)
name_en         VARCHAR(200)
category        VARCHAR(50)         ('national','fast_food','fruit','meat',...)
calories        FLOAT               (100g uchun)
protein         FLOAT
carbs           FLOAT
fat             FLOAT
default_portion INTEGER             (gramm, masalan 250)
image           VARCHAR(255) NULL
is_active       BOOLEAN DEFAULT TRUE
```

## 6.15. MealEntry (Foydalanuvchi iste'moli) — `apps/meals/models.py`

```
TABLE: meals_mealentry
─────────────────────────────────────
id            INTEGER PRIMARY KEY
user_id       INTEGER FK → users_user(id) ON DELETE CASCADE
food_item_id  INTEGER FK → meals_fooditem(id) NULL  (manual bo'lsa NULL)
date          DATE
meal_type     VARCHAR(20)  CHOICES: 'breakfast','lunch','dinner','snack'
name          VARCHAR(200)         (manual yoki food_item.name)
portion_size  FLOAT                (gramm)
calories      FLOAT
protein       FLOAT
carbs         FLOAT
fat           FLOAT
source        VARCHAR(20)  CHOICES: 'manual','database','barcode'
created_at    DATETIME
─────────────────────────────────────
INDEX: user_id, date
```

## 6.16. DeviceToken (Push notif) — `apps/notifications/models.py`

```
TABLE: notifications_devicetoken
─────────────────────────────────────
id          INTEGER PRIMARY KEY
user_id     INTEGER FK → users_user(id) ON DELETE CASCADE
token       VARCHAR(255) UNIQUE  (Expo push token)
platform    VARCHAR(10)  CHOICES: 'ios','android'
device_name VARCHAR(100) NULL
is_active   BOOLEAN DEFAULT TRUE
created_at  DATETIME
```

## 6.17. ER-diagramma (Aloqalar)

```
┌──────────────┐ 1   1 ┌──────────────┐
│    User      │───────│ UserProfile  │
└──────┬───────┘       └──────────────┘
       │ 1
       │
       │ N
       ├──────────► WorkoutSession ────► WorkoutPlan
       │                  │                    │ 1
       │                  │ N                  │
       │                  ▼                    │ N
       │              SessionExercise          ▼
       │                  │ N            WorkoutDay
       │                  │                    │ 1
       │                  │                    │ N
       │                  ▼                    ▼
       │              Exercise ◄──────  WorkoutDayExercise
       │                  │ N
       │                  │ 1
       │                  ▼
       │           ExerciseCategory
       │
       ├──────────► WaterIntake ────► WaterEntry (N)
       │
       ├──────────► StepRecord
       │
       ├──────────► WeightLog
       │
       ├──────────► MealEntry ────────► FoodItem
       │
       └──────────► DeviceToken
```

## 6.18. Indexlar va optimizatsiya

```sql
-- Tez-tez ishlatiladigan querylar uchun
CREATE INDEX idx_session_user_date ON workouts_workoutsession(user_id, started_at);
CREATE INDEX idx_water_user_date   ON trackers_waterintake(user_id, date);
CREATE INDEX idx_steps_user_date   ON trackers_steprecord(user_id, date);
CREATE INDEX idx_weight_user_date  ON trackers_weightlog(user_id, date);
CREATE INDEX idx_meal_user_date    ON meals_mealentry(user_id, date);
CREATE INDEX idx_exercise_category ON exercises_exercise(category_id, difficulty);
```

## 6.19. Migratsiyalar (Django Migrations)

```bash
# Modellarni o'zgartirgandan keyin
python manage.py makemigrations
python manage.py migrate

# SQLite bazasini ko'rish
python manage.py dbshell

# Admin uchun superuser
python manage.py createsuperuser

# Seed data (dastlabki ma'lumotlar)
python manage.py loaddata fixtures/exercises.json
python manage.py loaddata fixtures/workout_plans.json
python manage.py loaddata fixtures/foods.json
```

---

# 7. UI/UX DIZAYN

## 7.1. Dizayn falsafasi

- **Modern Minimalism** — toza, ortiqcha narsa yo'q
- **Bold & Energetic** — fitness ruhini ko'rsatadi
- **Native feel** — har bir platformada o'zining
- **Bento layout** — kartochka asosli dashboard
- **Mikro-animatsiyalar** — interaktivlik

## 7.2. Rang palitrasi

### Yorug' rejim (Light)

```
Primary:        #FF6B35  (energetik to'q sariq)
Primary Dark:   #E55525
Secondary:      #2EC4B6  (yangi turkuaz)
Accent:         #FFD60A  (sariq — yutuqlar uchun)
Background:     #FAFAFA
Surface:        #FFFFFF
Text Primary:   #1A1A1A
Text Secondary: #6B7280
Border:         #E5E7EB
Success:        #10B981
Warning:        #F59E0B
Error:          #EF4444
```

### Qorong'i rejim (Dark)

```
Primary:        #FF7849
Background:     #0A0A0A
Surface:        #1A1A1A
Surface 2:      #2A2A2A
Text Primary:   #FAFAFA
Text Secondary: #9CA3AF
Border:         #2A2A2A
```

### Kategoriya ranglari

```
Ko'krak:    #EF4444  (qizil)
Orqa:       #3B82F6  (ko'k)
Oyoq:       #8B5CF6  (binafsha)
Qorin:      #F59E0B  (sariq)
Kardio:     #EC4899  (pushti)
Yoga:       #14B8A6  (yashil-ko'k)
```

## 7.3. Tipografiya

**Font oilasi:** Inter (asosiy) + Manrope (sarlavha)
**Alternativ:** SF Pro (iOS) / Roboto (Android) — system fontlar

| Ism | O'lcham | Vazn | Foydalanish |
|-----|---------|------|-------------|
| Display | 36 sp | Bold | Hero matn |
| H1 | 28 sp | Bold | Sahifa sarlavhasi |
| H2 | 24 sp | SemiBold | Sektsiya sarlavhasi |
| H3 | 20 sp | SemiBold | Card sarlavhasi |
| Body Large | 16 sp | Regular | Asosiy matn |
| Body | 14 sp | Regular | Standart matn |
| Caption | 12 sp | Medium | Yordamchi matn |
| Label | 11 sp | SemiBold | Yorliqlar |

## 7.4. Spacing tizimi

8-point grid: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64`

## 7.5. Border radius

- Tugmalar: 12 px
- Kartochkalar: 16 px
- Modal: 20 px (yuqori)
- Avatar: 50% (yumaloq)
- Pill tugmalari: 999 px

## 7.6. Komponent kutubxonasi

| Komponent | Variantlari | Holat |
|-----------|-------------|-------|
| Button | Primary, Secondary, Ghost, Icon | Default, Pressed, Disabled, Loading |
| Card | Default, Outlined, Elevated | Hover, Selected |
| Input | Text, Password, Number, Search | Default, Focus, Error |
| Modal | Center, Bottom Sheet, Full Screen | - |
| Toast | Success, Error, Info, Warning | - |
| Badge | Small, Medium, Large | - |
| Avatar | XS, S, M, L, XL | With/Without image |
| ProgressRing | Small, Medium, Large | - |
| ProgressBar | Linear | - |
| Chip | Default, Selected | - |
| TabBar | Bottom Tab | Active/Inactive |
| Skeleton | Card, Text, Avatar | Shimmer animation |
| Switch | Default | On/Off |
| Slider | Default | - |
| Calendar | Month view | Selected date, Today |
| Chart | Line, Bar, Pie, Ring | - |

## 7.7. Asosiy ekranlar ro'yxati

| # | Ekran | Tavsif |
|---|-------|--------|
| 1 | SplashScreen | Ilova logosi, 1.5 sek |
| 2 | OnboardingScreen | 3 ta slayd |
| 3 | SignInScreen | Email + parol |
| 4 | SignUpScreen | Ism, email, parol |
| 5 | ForgotPasswordScreen | Email |
| 6 | ProfileSetupScreen | 4 qadam (yosh, jins, parametrlar, maqsad) |
| 7 | DashboardScreen | Bosh sahifa |
| 8 | WorkoutPlansScreen | Dasturlar ro'yxati |
| 9 | WorkoutDetailScreen | Dastur detali |
| 10 | ExerciseCatalogScreen | Mashqlar katalogi |
| 11 | ExerciseDetailScreen | Mashq detali |
| 12 | WorkoutSessionScreen | Mashq bajarish |
| 13 | RestTimerScreen | Dam olish taymeri |
| 14 | WorkoutSummaryScreen | Sessiya yakuni |
| 15 | WaterTrackerScreen | Suv kuzatuvi |
| 16 | CalorieTrackerScreen | Kaloriya kuzatuvi |
| 17 | AddMealScreen | Taom qo'shish |
| 18 | StepsScreen | Qadam statistikasi |
| 19 | WeightTrackerScreen | Vazn kuzatuvi |
| 20 | StatsOverviewScreen | Umumiy statistika |
| 21 | AchievementsScreen | Yutuqlar |
| 22 | ProfileScreen | Profil |
| 23 | EditProfileScreen | Profilni tahrirlash |
| 24 | SettingsScreen | Sozlamalar |
| 25 | NotificationsScreen | Bildirishnomalar tarixi |

## 7.8. Navigation flow diagrammasi

```
[Splash]
    │
    ▼
[Onboarding] ◄─── (ilk marta)
    │
    ▼
[Sign In] ◄──► [Sign Up] ◄──► [Forgot Password]
    │
    ▼
[Profile Setup] ◄─── (yangi userlar)
    │
    ▼
┌────────────────────────────────────────────┐
│            BOTTOM TAB NAVIGATOR             │
│                                            │
│  [🏠 Dashboard]  [💪 Workout]  [📊 Track] │
│       [📈 Stats]      [👤 Profile]         │
└────────────────────────────────────────────┘
```

---

# 8. IMPLEMENTATSIYA REJASI (7 HAFTA)

## 8.1. Umumiy timeline

```
Hafta 1: Setup + Auth
Hafta 2: Profile + Navigation + UI Kit
Hafta 3: Mashqlar va Dasturlar
Hafta 4: Trackerlar (Suv, Qadam, Vazn, Kaloriya)
Hafta 5: Statistika + Grafiklar + Sessiya
Hafta 6: Notifications + Sozlamalar + Polish
Hafta 7: Test + Bug fix + Hujjat
```

## 8.2. Hafta 1: Backend (Django) + Frontend (Expo) Setup + Auth

### Backend qismi (Django):
1. Python virtualenv yaratish (`python -m venv venv`)
2. Django va kerakli paketlarni o'rnatish (`pip install -r requirements.txt`)
3. Django loyihasi yaratish (`django-admin startproject pulsefit_backend`)
4. Apps yaratish: `users`, `exercises`, `workouts`, `trackers`, `meals`, `notifications`
5. SQLite sozlash (`settings.py` — default)
6. Custom User model (AbstractUser kengaytmasi) — email asosida login
7. UserProfile modeli + signal (post_save uchun avtomatik yaratish)
8. DRF sozlash + JWT (simplejwt) sozlash
9. CORS sozlash (`django-cors-headers`)
10. Auth API endpoints:
    - `POST /api/v1/auth/register/`
    - `POST /api/v1/auth/login/` (JWT token qaytaradi)
    - `POST /api/v1/auth/token/refresh/`
    - `POST /api/v1/auth/logout/`
11. Django Admin panel sozlash (mashqlar/dasturlar uchun)
12. drf-spectacular bilan Swagger UI (`/api/docs/`)
13. Migratsiyalar va `createsuperuser`

### Frontend qismi (Expo):
1. Expo loyihasini yaratish (`npx create-expo-app pulsefit --template`)
2. TypeScript, ESLint, Prettier sozlash
3. Folder structure yaratish
4. Git repository (GitHub) — backend va frontend alohida repo
5. Asosiy navigation skeleton (React Navigation)
6. Axios klient sozlash (`baseURL`, JWT interceptor, refresh logic)
7. `tokenManager.ts` — Expo SecureStore'da access/refresh saqlash
8. Auth screens yaratish (SignIn, SignUp, ForgotPassword)
9. Auth API funksiyalari (`login`, `register`, `logout`, `refresh`)
10. Auth Zustand store
11. Form validatsiya (React Hook Form + Zod)
12. Auto-login (app start'da token tekshirish)

### Natijalar (Deliverables):
- Django backend ishlaydi (`python manage.py runserver` 8000-portda)
- SQLite bazasi yaratildi
- Swagger UI da API hujjatlari ko'rinadi (`localhost:8000/api/docs/`)
- Admin panelga kirish mumkin (`localhost:8000/admin/`)
- Mobil ilova backenddan token oladi
- Foydalanuvchi ro'yxatdan o'ta oladi va kira oladi
- JWT token saqlanadi, auto-login ishlaydi
- Refresh token avtomatik yangilanadi (401 javobida)
- 2 ta GitHub repo: `pulsefit-mobile`, `pulsefit-backend`

### Texnologiyalar:
**Backend:** Python 3.11+, Django 5, DRF, simplejwt, SQLite, django-cors-headers, drf-spectacular
**Frontend:** Expo, TypeScript, React Navigation, Axios, Zustand, React Hook Form, Zod, Expo SecureStore

### Vaqt: 35-40 soat (backend qo'shilgani uchun)

---

## 8.3. Hafta 2: Profil, Navigation va UI Kit

### Vazifalar:
1. Onboarding ekranlari (3 slayd, AppIntroSlider yoki custom)
2. Profile Setup wizard (4 qadam)
3. Bottom Tab Navigator (5 ta tab)
4. UI komponent kutubxonasi:
   - Button, Input, Card, Modal, Toast
   - Avatar, Badge, Chip
   - Skeleton, Loading indikatorlari
5. Theme tizimi (Light/Dark)
6. Theme Context + useTheme hook
7. Lokalizatsiya setup (i18next, uz.json)
8. Profile ekranni yaratish
9. EditProfile ekrani
10. Foydalanuvchi ma'lumotlarini Django backenddan olish/saqlash (`PATCH /users/me/`)
11. BMI va kunlik kaloriya hisoblash funksiyasi

### Natijalar:
- Onboarding ishlaydi
- Profil sozlash to'liq ishlaydi
- Bottom navigation tayyor
- 15+ UI komponent tayyor
- Light/Dark theme ishlaydi
- O'zbek tili tarjimasi

### Vaqt: 30-35 soat

---

## 8.4. Hafta 3: Mashqlar katalogi va Dasturlar

### Backend (Django):
1. `Exercise`, `ExerciseCategory` modellari
2. `WorkoutPlan`, `WorkoutDay`, `WorkoutDayExercise` modellari
3. Migratsiyalar
4. DRF Serializerlar (`ExerciseSerializer`, `WorkoutPlanSerializer`, nested)
5. ViewSets va `DjangoFilterBackend` bilan filtr/qidiruv
6. URL routing (`/api/v1/exercises/`, `/api/v1/workouts/plans/`)
7. Pagination sozlash (DRF `PageNumberPagination`)
8. Django Admin'ga modellarni ro'yxatdan o'tkazish (inline editing bilan)
9. Fixtures yaratish (`fixtures/exercises.json`, `fixtures/workout_plans.json`)
   - 50+ mashq + 6-8 dastur
10. Mashqlar uchun GIF/rasmlarni `media/exercises/` papkasiga joylash
11. `loaddata` orqali seed

### Frontend (Expo):
1. Mashqlar katalogi ekrani (FlatList, kategoriyalar)
2. Filtr va qidirish funksiyasi (`?category=...&search=...`)
3. Mashq detali ekrani (rasm, instruksiyalar)
4. WorkoutPlans ekrani
5. WorkoutDetail ekrani (kunlar bo'yicha)
6. "Boshlash" tugmasi va sessiyaga o'tish
7. TanStack Query bilan data fetching (`useExercises`, `useWorkoutPlans`)
8. Lokal cache (MMKV) — offline ko'rish uchun
9. Skeleton loading va empty states

### Natijalar:
- Mashqlar katalogi to'liq ishlaydi
- Filtr va qidirish ishlaydi
- 6+ tayyor dastur mavjud
- Offline da kataloga kirish mumkin

### Vaqt: 30-35 soat

---

## 8.5. Hafta 4: Trackerlar

### Backend (Django):
1. `WaterIntake`, `WaterEntry` modellari
2. `StepRecord`, `WeightLog` modellari
3. `FoodItem`, `MealEntry` modellari
4. Migratsiyalar
5. Serializerlar va ViewSet'lar
6. Custom actionlar:
   - `POST /trackers/water/add/` — kunlik totalga qo'shadi
   - `GET /trackers/water/today/` — bugungi xulosa
7. `FoodItem` uchun fixtures (50+ mahalliy taom: osh, manti, somsa, plov, lag'mon...)
8. Filterlash (`?from=2026-01-01&to=2026-05-04`)
9. Aggregation querylar (sum, avg) — kunlik/haftalik xulosa

### Frontend (Expo):
1. **Suv tracker:**
   - Quick add tugmalar (200/300/500 ml)
   - Daily progress (animated)
   - Tarix
2. **Kaloriya tracker:**
   - Mahalliy taomlar qidiruv (autocomplete)
   - Taom qo'shish ekrani
   - Macros hisoblash (pie chart)
   - Kunlik xulosa
3. **Qadam sanagich:**
   - Expo Pedometer integratsiya
   - Avtomatik kuzatish (background task)
   - Bar chart (haftalik)
   - Server bilan sinxronlash
4. **Vazn tracker:**
   - Vazn kiritish formasi
   - Line chart (vaqt bo'yicha)
   - BMI ko'rsatkichi
5. Custom hooks: `useWaterTracker`, `usePedometer`, `useWeightLog`, `useMealTracker`
6. Backend bilan sinxronlash (TanStack Query mutations)
7. Optimistic updates (yaxshi UX uchun)

### Natijalar:
- 4 ta tracker to'liq ishlaydi
- Ma'lumotlar Django backenddan saqlanadi/o'qiladi
- Offline ham ishlaydi (MMKV cache + queue)
- Internet paydo bo'lganda — avtomatik sync

### Vaqt: 35-40 soat

---

## 8.6. Hafta 5: Statistika, Grafiklar va Sessiya

### Vazifalar:
1. **Mashq sessiyasi:**
   - Sessiya boshlash ekrani
   - Mashq ekrani (set/reps tracker)
   - Rest timer (background da ham)
   - Audio signal (oxiriga 3 sek)
   - Sessiya yakuni ekrani
   - Mood selector
2. **Statistika:**
   - Overview ekrani (jami statistika)
   - Haftalik/oylik grafiklar (Victory Native)
   - Streak hisoblash
3. **Achievements:**
   - 15+ yutuqlar
   - Avtomatik tekshirish
   - Notification olganda
4. Dashboard ni yangilash (real ma'lumotlar bilan)
5. Animatsiyalar (Reanimated)

### Natijalar:
- Mashq sessiyasi to'liq ishlaydi
- Statistika va grafiklar
- Yutuqlar tizimi

### Vaqt: 35-40 soat

---

## 8.7. Hafta 6: Notifications, Sozlamalar va Polish

### Vazifalar:
1. **Push Notifications:**
   - Expo Notifications setup
   - Permission so'rash
   - Lokal notifications (water reminder, workout reminder)
   - Daily/weekly reports
2. **Sozlamalar:**
   - Til o'zgartirish (uz/ru/en)
   - Tema (Light/Dark/System)
   - O'lchov birliklari (kg/lb, cm/ft)
   - Notification sozlash
   - Akkauntni o'chirish
   - Tizimdan chiqish
3. **Polish:**
   - Splash screen (chiroyli)
   - App icon (1024x1024)
   - Loading skeletons
   - Error states (chiroyli illustratsiyalar)
   - Empty states
   - Pull-to-refresh hamma joyda
   - Haptic feedback

### Natifalar:
- Push notifications ishlaydi
- Sozlamalar to'liq
- UI/UX yaxshi polished

### Vaqt: 30-35 soat

---

## 8.8. Hafta 7: Testing, Bug fix va Hujjatlash

### Vazifalar:
1. **Unit testlar (Jest):**
   - Utility funksiyalar (BMI, calorie)
   - Custom hooks
   - Stores
2. **Komponent testlar (RN Testing Library):**
   - Auth formalari
   - Asosiy UI komponentlar
3. **E2E testlar (Maestro):**
   - Auth flow
   - Mashq sessiyasi flow
   - Trackerlar
4. **Manual testing:**
   - Android (real qurilma)
   - iOS (Expo Go)
   - Turli ekran o'lchamlari
5. **Bug fixing**
6. **Performance optimization:**
   - React Profiler
   - Bundle size analysis
7. **EAS Build:**
   - Android APK generatsiya
   - Internal testing
8. **Hujjat tayyorlash:**
   - README.md
   - Kurs ishi hujjati (Word/PDF)
   - Screenshot lar
   - Demo video

### Natijalar:
- 80%+ test coverage
- Production-ready APK
- To'liq hujjat tayyor
- Demo video tayyor

### Vaqt: 30-35 soat

---

## 8.9. Umumiy soatlar

| Hafta | Soat |
|-------|------|
| 1-hafta | 25-30 |
| 2-hafta | 30-35 |
| 3-hafta | 30-35 |
| 4-hafta | 35-40 |
| 5-hafta | 35-40 |
| 6-hafta | 30-35 |
| 7-hafta | 30-35 |
| **JAMI** | **215-250 soat** |

---

# 9. TEST REJASI

## 9.1. Test piramidasi

```
        ╱╲
       ╱E2E╲           5%   (Maestro — 5-7 ta flow)
      ╱──────╲
     ╱ Integ. ╲        15%  (API, navigation)
    ╱──────────╲
   ╱   Unit     ╲      80%  (utils, hooks, components)
  ╱──────────────╲
```

## 9.2. Unit testlar (Jest)

### Sinaladigan modullar:
- `utils/calculations.ts` — BMI, kaloriya formulalari
- `utils/date.ts` — sana operatsiyalari
- `utils/validators.ts` — Zod schemalar
- `utils/formatters.ts` — formatlar
- `stores/authStore.ts` — login/logout logikasi
- `stores/workoutStore.ts` — sessiya holati
- `hooks/useWaterTracker.ts`
- `hooks/usePedometer.ts`

### Misol test ssenariylari:
- "calculateBMI returns correct value for given height and weight"
- "calculateDailyCalories returns 2000 for moderate active female age 25"
- "addWater increments total correctly"
- "Zod validates email format correctly"

**Maqsad:** 80%+ coverage

## 9.3. Komponent testlar (React Native Testing Library)

### Sinaladigan komponentlar:
- Button (variantlar, disabled, loading)
- Input (validatsiya, error)
- SignInForm (submit, validation)
- WaterCard (qo'shish, ko'rinish)
- WorkoutCard

### Misol:
- "SignInForm shows error when email is invalid"
- "Button calls onPress when pressed"
- "WaterCard updates UI after adding water"

## 9.4. Integration testlar

### Ssenariylar:
- API call → Cache → UI yangilanadi
- Auth → Navigation → Dashboard
- Sessiya yakuni → Statistika yangilanadi

## 9.5. E2E testlar (Maestro)

### Asosiy flow lar:
1. **Auth Flow:** Sign Up → Profile Setup → Dashboard
2. **Workout Flow:** Catalog → Detail → Start Session → Complete → Summary
3. **Tracker Flow:** Add water → Add meal → Add weight → View stats
4. **Settings Flow:** Change language → Change theme → Sign out

### Maestro misol:
```yaml
appId: com.pulsefit.app
---
- launchApp
- tapOn: "Ro'yxatdan o'tish"
- inputText: "test@example.com"
- tapOn: "Davom etish"
- assertVisible: "Bosh sahifa"
```

## 9.6. Manual test ssenariylari

| # | Ssenariy | Kutilgan natija |
|---|----------|-----------------|
| 1 | Internet o'chgan holda mashq qilish | Ma'lumotlar lokal saqlanadi |
| 2 | Internet qaytganda | Ma'lumotlar serverga yuboriladi |
| 3 | Telefon orientatsiyasi o'zgarishi | UI to'g'ri ko'rsatiladi |
| 4 | Background da timer | Tugaganda notification |
| 5 | Past performance qurilma | 60 FPS saqlanadi |
| 6 | Kichik ekran (320 dp) | Ortiqcha scroll yo'q |
| 7 | Katta font (Accessibility) | Matn kesilmaydi |
| 8 | Push notification bosish | Tegishli ekran ochiladi |

## 9.7. Test qurilmalar

| Platforma | Qurilma | Versiya |
|-----------|---------|---------|
| Android | Pixel 4 (real) | Android 13 |
| Android | Samsung A30 (real) | Android 11 |
| Android | Emulator | Android 8 |
| iOS | iPhone 12 (Expo Go) | iOS 16 |
| iOS | iPhone SE simulator | iOS 14 |

## 9.8. Coverage maqsadi

- Umumiy: **80%+**
- Critical kod (auth, payments yo'q): **90%+**
- UI komponentlar: **70%+**

---

# 10. DEPLOYMENT

## 10.1. Backend (Django) — Development

```bash
# 1. Virtual muhit
python -m venv venv
venv\Scripts\activate          # Windows
source venv/bin/activate       # Linux/Mac

# 2. Paketlarni o'rnatish
pip install -r requirements.txt

# 3. .env faylini sozlash
cp .env.example .env
# SECRET_KEY, DEBUG=True, ALLOWED_HOSTS, JWT_SECRET to'ldirish

# 4. Migratsiyalar
python manage.py migrate

# 5. Seed data (mashqlar va dasturlar)
python manage.py loaddata fixtures/exercises.json
python manage.py loaddata fixtures/workout_plans.json
python manage.py loaddata fixtures/foods.json

# 6. Superuser (admin panel uchun)
python manage.py createsuperuser

# 7. Serverni ishga tushirish
python manage.py runserver 0.0.0.0:8000
# Endi: http://localhost:8000/admin/  va  http://localhost:8000/api/docs/
```

**Mobil ilova bilan lokal ulanish:**
- Telefon va kompyuter bir Wi-Fi tarmog'ida bo'lishi kerak
- Mobil ilovada `EXPO_PUBLIC_API_URL=http://192.168.X.X:8000/api/v1/` (kompyuter IP)
- Yoki `ngrok http 8000` orqali public URL olish

## 10.2. Backend Production deployment (PythonAnywhere)

**Bepul tier — kurs ishi uchun ideal:**
1. www.pythonanywhere.com — ro'yxatdan o'tish (bepul)
2. Bash console ochish
3. `git clone` orqali backendni klonlash
4. `mkvirtualenv` bilan virtualenv yaratish
5. `pip install -r requirements.txt`
6. Web tab'da yangi Web App yaratish (Manual config + Python 3.11)
7. WSGI faylini sozlash (Django'ni ko'rsatish)
8. `Static files` va `Media files` papkalarini sozlash
9. `migrate` va `collectstatic` ishga tushirish
10. URL: `username.pythonanywhere.com` (bepul)

**Alternativa — Render.com:**
1. github.com'dan repo'ni ulash
2. `render.yaml` qo'shish
3. Bepul SQLite + ephemeral disk (kurs uchun yetadi)
4. Avtomatik HTTPS

## 10.3. Frontend (Expo) — Development build

- **Expo Go orqali:** `npx expo start`
- QR kod orqali real qurilmada ko'rish
- Hot reload ishlatiladi

## 10.4. Frontend Preview build (EAS Build)

```bash
npx eas build --profile preview --platform android
```

- APK fayl yaratiladi (~30-50 MB)
- Internal testing uchun
- Backend URL'i `eas.json` da `production` ga sozlangan bo'ladi

## 10.5. Frontend Production build

### Android (APK / AAB):
```bash
npx eas build --profile production --platform android
```
- AAB fayl Google Play uchun

### iOS:
- Apple Developer Account kerak ($99/yil) — kurs ishi uchun ixtiyoriy
- TestFlight orqali tarqatish

## 10.6. Demo strategiyasi (kurs ishi uchun)

**Variant A — Lokal demo (eng oson):**
1. Noutbukda Django server ishlaydi (`runserver`)
2. Telefonda Expo Go orqali ulanasiz
3. Bir Wi-Fi tarmog'i kerak
4. Komissiyaga real qurilmada ko'rsatasiz

**Variant B — Online demo:**
1. Backend PythonAnywhere'da deploy qilingan
2. APK fayl tayyor (Telegram orqali tarqatish mumkin)
3. Ixtiyoriy joydan ishlaydi (internet kerak)

**Hujjat uchun:**
1. **APK fayl** — taqdimot uchun yuklab olish (Telegram'da)
2. **Expo Go QR kod** — komissiya o'z telefonida ko'rishi
3. **Demo video** (3-5 daqiqa) — barcha funksiyalar
4. **Screenshots** (15-20 ta) — taqdimot slaydlarida
5. **GitHub repository** — 2 ta repo (mobile + backend)
6. **Swagger UI link** — backend API hujjatlari
7. **Django Admin link** — komissiyaga jonli ma'lumot ko'rsatish

## 10.7. Google Play Store (ixtiyoriy)

- Developer Account ($25 bir martalik)
- Playstore Console'da ilova yaratish
- Screenshots, description, feature graphic
- Review (3-7 kun)

## 10.8. Backend xavfsizlik checklist (production)

- [ ] `DEBUG = False`
- [ ] `SECRET_KEY` — long random, `.env`da
- [ ] `ALLOWED_HOSTS` — aniq domenlar
- [ ] HTTPS (Let's Encrypt)
- [ ] `SECURE_SSL_REDIRECT = True`
- [ ] `SECURE_HSTS_SECONDS = 31536000`
- [ ] CORS — faqat ruxsat berilgan originlar
- [ ] DB backup (kuniga avtomatik)
- [ ] `media/` papkasi backup
- [ ] Rate limiting (DRF Throttling) yoqilgan

---

# 11. RISKLAR VA CHEKLOVLAR

## 11.1. Texnik risklar

| # | Risk | Ehtimol | Ta'sir | Yumshatish |
|---|------|---------|--------|-----------|
| 1 | Expo Pedometer barcha qurilmalarda ishlamasligi | O'rta | Yuqori | Manual qadam kiritish opsiyasi |
| 2 | Push notification background da kechikishi | Yuqori | O'rta | Lokal notification ishlatish |
| 3 | Offline sync conflict | O'rta | Yuqori | Last-write-wins strategiyasi |
| 4 | SQLite concurrent yozuvlar (ko'p user) | Past | O'rta | Kurs ishi miqyosida muammo emas, prod'da PostgreSQL'ga ko'chirish |
| 5 | Animatsiyalar past qurilmada lag | O'rta | O'rta | useNativeDriver: true, Reanimated |
| 6 | iOS uchun build muammolari | Yuqori | Past | Faqat Android'ga fokus |
| 7 | Mashq videolari hajmi katta | Yuqori | O'rta | GIF / lossy compression |
| 8 | TanStack Query cache invalidation | O'rta | Past | Aniq invalidation strategiyasi |

## 11.2. Vaqt risklari

- **Risk:** 7 hafta yetmasligi
  - **Yumshatish:** Birinchi 5 haftada MVP, qolgan 2 — polish/test
- **Risk:** Imtihon va boshqa fanlar
  - **Yumshatish:** Haftalik plan, kuniga 3-4 soat
- **Risk:** Texnik muammoda vaqt yo'qotish
  - **Yumshatish:** Stack Overflow, GitHub, AI yordamchilar

## 11.3. Loyiha cheklovlari

### Funksional:
- Sotsial funksiyalar yo'q (do'stlar, leaderboard) — kelajakda
- Maxsus mashqlar yaratish yo'q (predefined faqat)
- Wearable (Apple Watch, Mi Band) integratsiyasi yo'q
- Personal trainer chat yo'q
- AI-powered tavsiyalar yo'q

### Texnik:
- Faqat o'zbek tili (kelajakda ru, en)
- Faqat Android (asosiy), iOS — ixtiyoriy
- Video streaming yo'q (faqat GIF)
- Real-time multiplayer yo'q

### Resurs:
- Backend hosting — bepul tier (PythonAnywhere / Render)
- SQLite — bepul, faylga asoslangan
- Bepul mashq media (Pexels, Unsplash)
- Self-funded (talaba budjeti)

## 11.4. Akademik risklar

- **Risk:** Komissiya texnologiyani tushunmasligi
  - **Yumshatish:** Sodda til, demo asosiy
- **Risk:** Plagiat shubhasi
  - **Yumshatish:** GitHub commit history, original kod
- **Risk:** Hujjat sifatsiz
  - **Yumshatish:** Rahbar bilan har hafta uchrashish

---

# 12. KURS ISHI HUJJATI TARKIBI

## 12.1. Hujjat strukturasi (universitet talabiga ko'ra)

```
KURS ISHI HUJJATI
├── Titul varaq
├── Topshiriq (rahbar imzolagan)
├── Annotatsiya (uz, ru, en — har biri 1 sahifa)
├── Mundarija
├── Belgilar va qisqartmalar ro'yxati
├── KIRISH (3-5 sahifa)
│
├── 1-BOB: ADABIYOTLAR TAHLILI VA SOHANI O'RGANISH (12-15 sahifa)
│   ├── 1.1. Mobil ilovalar bozorining tahlili
│   ├── 1.2. Fitness ilovalarining mavjud holati
│   ├── 1.3. Raqobatchilar tahlili (Nike Training, MyFitnessPal va h.k.)
│   ├── 1.4. React Native va boshqa cross-platform texnologiyalar
│   ├── 1.5. Loyihaning aktualligi va yangiligi
│   └── 1-bob bo'yicha xulosa
│
├── 2-BOB: TEXNIK TOPSHIRIQ VA ARXITEKTURA (15-20 sahifa)
│   ├── 2.1. Loyihaning maqsadi va vazifalari
│   ├── 2.2. Funksional talablar
│   ├── 2.3. Nofunksional talablar
│   ├── 2.4. Texnologik stek tanlovi va asoslash
│   ├── 2.5. Tizim arxitekturasi
│   ├── 2.6. Ma'lumotlar bazasi loyihasi
│   ├── 2.7. UML diagrammalar (Use Case, Sequence, Class)
│   ├── 2.8. UI/UX dizayn
│   └── 2-bob bo'yicha xulosa
│
├── 3-BOB: ILOVANI ISHLAB CHIQISH (15-20 sahifa)
│   ├── 3.1. Ishchi muhitni sozlash
│   ├── 3.2. Loyiha tuzilishi
│   ├── 3.3. Autentifikatsiya moduli
│   ├── 3.4. Mashqlar va dasturlar moduli
│   ├── 3.5. Trackerlar moduli
│   ├── 3.6. Statistika va grafiklar
│   ├── 3.7. Push notifications
│   ├── 3.8. Asosiy kod fragmentlari
│   └── 3-bob bo'yicha xulosa
│
├── 4-BOB: TESTLASH VA NATIJALAR (8-10 sahifa)
│   ├── 4.1. Test metodologiyasi
│   ├── 4.2. Unit testlar natijasi
│   ├── 4.3. Manual testlar natijasi
│   ├── 4.4. Performance metrikalari
│   ├── 4.5. Foydalanuvchi tajribasini baholash
│   ├── 4.6. Aniqlangan kamchiliklar va ularni bartaraf qilish
│   └── 4-bob bo'yicha xulosa
│
├── XULOSA (2-3 sahifa)
│   ├── Bajarilgan ishlar yakuni
│   ├── Olingan natijalar
│   ├── Loyihaning ahamiyati
│   └── Kelgusi rivojlanish istiqbollari
│
├── FOYDALANILGAN ADABIYOTLAR (15-20 manba)
│   ├── Kitoblar
│   ├── Ilmiy maqolalar
│   └── Internet manbalari
│
└── ILOVALAR
    ├── A. Asosiy kod fragmentlari
    ├── B. UML diagrammalar
    ├── C. Foydalanuvchi qo'llanmasi
    ├── D. Screenshots (15-20 ta)
    └── E. Test natijalari jadval
```

## 12.2. Hujjat texnik talablari

- **Format:** A4 (210x297 mm)
- **Fontlar:** Times New Roman 14 pt (matn), 16 pt (sarlavha)
- **Interval:** 1.5 (qator orasi)
- **Marginlar:** Chap 30 mm, o'ng 15 mm, yuqori/pastki 20 mm
- **Sahifalar:** 60-80 sahifa
- **Til:** O'zbek tili (lotin)
- **Til standartlari:** Davlat tili to'g'risidagi qonun
- **Tasvirlar:** Yuqori sifatli (300 DPI)
- **Diagrammalar:** Draw.io / Lucidchart / Figma

## 12.3. Taqdimot (Defense) tayyorgarligi

- **Slaydlar:** 15-20 ta (PowerPoint/Keynote)
- **Vaqt:** 10-15 daqiqa taqdimot + savol-javob
- **Demo:** Live demo + video
- **Slaydlar tarkibi:**
  1. Titul
  2. Mavzuning aktualligi
  3. Maqsad va vazifalar
  4. Raqobatchilar tahlili
  5. Texnologik stek
  6. Arxitektura diagrammasi
  7. UI/UX (screenshots)
  8. Asosiy funksiyalar (3-5 slayd)
  9. Demo video
  10. Test natijalari
  11. Xulosa
  12. Rahmat

---

# 13. MURAKKABLIK BAHOSI VA VAQT

## 13.1. Umumiy ko'rsatkichlar

| Ko'rsatkich | Qiymat |
|-------------|--------|
| Umumiy soatlar | 215-250 soat |
| Davomiyligi | 7 hafta |
| Kuniga o'rtacha | 4-5 soat |
| Murakkablik darajasi | **MEDIUM-HIGH** |
| Kod qatori (taxminiy) | 12,000-18,000 LOC |
| Komponentlar soni | 50+ |
| Ekranlar soni | 25 |
| API endpointlar | 30+ |

## 13.2. Modul bo'yicha murakkablik

| Modul | Murakkablik | Soat |
|-------|-------------|------|
| Setup va konfiguratsiya | Low | 8-10 |
| Autentifikatsiya | Medium | 15-20 |
| UI Kit | Medium | 20-25 |
| Onboarding va Profile | Low-Medium | 12-15 |
| Mashqlar katalogi | Medium | 15-18 |
| Workout Plans | Medium | 12-15 |
| Mashq sessiyasi va Timer | High | 20-25 |
| Suv tracker | Low | 6-8 |
| Kaloriya tracker | Medium | 15-18 |
| Qadam tracker | Medium-High | 12-15 |
| Vazn tracker | Low-Medium | 8-10 |
| Statistika va grafiklar | High | 18-22 |
| Push notifications | Medium-High | 12-15 |
| Sozlamalar | Low | 8-10 |
| Lokalizatsiya | Medium | 8-10 |
| Offline rejim | High | 15-18 |
| Testing | Medium | 18-22 |
| Hujjat va deploy | Low-Medium | 12-15 |

## 13.3. Talab qilinadigan ko'nikmalar

### Asosiy (yetarli):
- JavaScript/TypeScript asoslari
- React asoslari (Hooks, State, Props)
- HTML/CSS (Flexbox, layout)
- Git/GitHub
- REST API tushuncha

### Loyiha davomida o'rganiladi:
- React Native xususiyatlari
- Expo platformasi
- React Navigation
- TanStack Query
- Zustand state management
- Django + DRF (REST API qurish)
- Django ORM va migratsiyalar
- JWT autentifikatsiya
- SQLite ma'lumotlar bazasi
- Django Admin panel
- React Hook Form + Zod
- Reanimated 3
- Native modules (Sensors, Notifications)
- TypeScript advanced
- Mobile UI/UX prinsiplari
- Testing (Jest, RNTL, Maestro)
- EAS Build

### Bonus ko'nikmalar:
- Figma (UI dizayn)
- Performance optimization
- Security best practices
- Accessibility (a11y)

## 13.4. Murakkablik baholash mezonlari

### LOW (oson):
- Standart formalar
- Statik ro'yxatlar
- Sodda navigatsiya

### MEDIUM (o'rta):
- API integratsiya
- State management
- Animatsiyalar
- Form validatsiya

### HIGH (qiyin):
- Background tasks (timer, pedometer)
- Offline sync va conflict resolution
- Push notifications scheduling
- Performance optimizatsiya
- Real-time updates

## 13.5. MVP vs To'liq versiya

### MVP (Minimum Viable Product) — 4 hafta:
- Auth
- Profil
- Mashqlar katalogi (kichik)
- 2-3 dastur
- Suv va kaloriya tracker
- Sodda statistika

### To'liq versiya (kurs ishi) — 7 hafta:
- MVP + qo'shimchalar:
- Push notifications
- Pedometer
- Vazn tracker
- Yutuqlar
- Lokalizatsiya
- Offline rejim
- Polish va animatsiyalar

---

# YAKUNIY MUHIM ESLATMALAR

## Muvaffaqiyat omillari:

1. **Erta boshlash** — kechiktirmang
2. **Haftalik plan** — har dushanba o'sha hafta vazifalarini ko'rib chiqing
3. **Git commit kuniga** — rahbar va komissiya uchun progress dalili
4. **Rahbarni xabardor qilib turish** — har hafta hisobot
5. **MVP avval** — keyin polish
6. **Refactor qilavering** — toza kod muhim
7. **Hujjatni parallel yozing** — oxirida emas, paralel
8. **Backup oling** — GitHub + lokal backup
9. **Real qurilmada test** — emulator yetmaydi
10. **Demo video oldindan tayyor** — internet tushib qolsa ham bo'ladi

## Foydali resurslar:

- React Native docs: reactnative.dev
- Expo docs: docs.expo.dev
- Django docs: docs.djangoproject.com
- Django REST Framework: www.django-rest-framework.org
- simplejwt: django-rest-framework-simplejwt.readthedocs.io
- drf-spectacular: drf-spectacular.readthedocs.io
- React Navigation: reactnavigation.org
- TanStack Query: tanstack.com/query
- Reanimated: docs.swmansion.com/react-native-reanimated
- YouTube: William Candillon, Catalin Miron, Simon Grimm

---

# TASDIQ SO'ROVI

Hurmatli foydalanuvchi!

Yuqorida **PulseFit** loyihasi uchun to'liq Texnik Topshiriq (TZ) va 7 haftalik implementatsiya rejasi keltirilgan.

## Reja qisqacha:

- **Loyiha:** PulseFit — fitness ilovasi
- **Frontend:** React Native + Expo SDK 51 + TypeScript
- **Backend:** Django 5 + Django REST Framework + JWT
- **Database:** SQLite (file-based)
- **Davomiyligi:** 7 hafta (235-275 soat — backend qo'shilgani uchun)
- **Murakkabligi:** Medium-High
- **Ekranlar:** 25 ta (mobil)
- **Modullar:** 14 ta katta modul
- **Backend apps:** 6 ta (users, exercises, workouts, trackers, meals, notifications)
- **API endpointlar:** 30+
- **Til:** O'zbek (lotin) — birinchi navbatda

## Iltimos, javob bering:

**Ushbu reja bilan davom etamizmi?**

- **HA** — Reja qabul qilindi, kod yozishga o'tamiz (1-haftadan boshlab)
- **YO'Q** — Rejani qaytadan ko'rib chiqamiz
- **O'ZGARTIRISH** — Quyidagi punktlarni o'zgartirish kerak: ___ (yozib bering)

### Mumkin bo'lgan o'zgartirishlar:

1. **Loyiha nomi** — PulseFit o'rniga FitLife / SportCard / boshqa
2. **Backend** — Django o'rniga FastAPI / Flask / Node.js Express
   yoki **DB** — SQLite o'rniga PostgreSQL / MySQL
3. **Modullar ro'yxati** — biror modul olib tashlash / qo'shish
4. **Vaqt** — 7 hafta o'rniga 5 / 10 hafta
5. **Murakkablik** — kamaytirish (MVP) yoki oshirish
6. **Til** — faqat o'zbek yoki ko'p til

Sizning tasdig'ingizdan so'ng:
- Implementatsiyani 1-haftadan (Setup + Auth) boshlaymiz
- **Birinchi:** Django backendni yaratamiz (`pulsefit_backend/`)
  - virtualenv → Django o'rnatish → loyiha yaratish
  - Custom User model + UserProfile
  - JWT auth endpoints
  - Migratsiyalar va superuser
  - Swagger UI ishga tushirish
- **Keyin:** Expo mobil ilovani yaratamiz (`pulsefit/`)
  - Folder structure
  - Axios + JWT klient
  - Auth screens (Login, Register)
  - Mobil ilova → Django backend bilan ulanish testi
- 1-hafta natijasi: ikkita ishlovchi servis (backend + mobile), JWT auth flow to'liq

**Javobingizni kutaman.**