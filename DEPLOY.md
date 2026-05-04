# 🚀 PulseFit Deploy Qo'llanmasi (Railway + Vercel)

## 📋 Umumiy reja

```
┌─────────────────┐         ┌──────────────────┐
│  GitHub Repo    │ ──────> │  Railway         │  → backend.up.railway.app
│  (backend)      │         │  (Django)        │     /api/docs/
└─────────────────┘         └──────────────────┘
                                    ▲
                                    │ HTTPS
┌─────────────────┐         ┌───────┴──────────┐
│  GitHub Repo    │ ──────> │  Vercel          │  → pulsefit.vercel.app
│  (mobile/web)   │         │  (Static React)  │
└─────────────────┘         └──────────────────┘
                                    ▲
                                    │
                                ┌───┴───┐
                                │ User  │
                                └───────┘
```

---

## 🐍 1-QADAM: Backend → Railway

### 1.1. GitHub'ga push qiling

```bash
cd pulsefit_backend
git init
git add .
git commit -m "feat: pulsefit backend"
gh repo create pulsefit-backend --public --source=. --push
# yoki: github.com'da yangi repo yaratib qo'lda push qiling
```

### 1.2. Railway'ga deploy

#### Variant A: Railway CLI orqali (TAVSIYA)

```bash
# 1. CLI o'rnatish
npm i -g @railway/cli

# 2. Login (brauzer ochiladi)
railway login

# 3. Loyihani yaratish va deploy
cd pulsefit_backend
railway init    # Yangi loyiha yarating: pulsefit-backend
railway up      # Deploy boshlash

# 4. Public URL ulash
railway domain  # https://pulsefit-backend-production.up.railway.app

# 5. Environment variables (Dashboardda yoki CLI'da)
railway variables --set "DEBUG=False"
railway variables --set "SECRET_KEY=$(python -c 'import secrets; print(secrets.token_urlsafe(50))')"
railway variables --set "ALLOWED_HOSTS=*"
railway variables --set "CORS_ALLOW_ALL_ORIGINS=True"
```

#### Variant B: Railway Dashboard orqali

1. https://railway.app → "New Project" → "Deploy from GitHub repo"
2. `pulsefit-backend` repo'sini tanlang
3. **Variables** tab → quyidagilarni qo'shing:
   ```
   DEBUG = False
   SECRET_KEY = <50 belgili random string>
   ALLOWED_HOSTS = *
   CORS_ALLOW_ALL_ORIGINS = True
   PYTHONUNBUFFERED = 1
   ```
4. **Settings** tab → "Generate Domain" tugmasini bosing
5. Deploy avtomatik boshlanadi (3-5 daqiqa)

### 1.3. SQLite uchun Volume qo'shish (MUHIM!)

**Sababi:** Railway containerlari ephemeral — qayta deploy qilganda fayllar yo'qoladi.
SQLite faylni saqlash uchun **persistent volume** kerak.

1. Railway Dashboard → loyihangiz → **+ New** → **Volume**
2. Mount path: `/data`
3. Service'ga ulang
4. Variables'ga qo'shing: `SQLITE_DIR=/data`
5. Re-deploy

### 1.4. Backend tayyor!

```bash
curl https://YOUR-APP.up.railway.app/api/health/
# → {"status":"ok","service":"pulsefit-api"}

# Swagger UI
open https://YOUR-APP.up.railway.app/api/docs/

# Demo login
curl -X POST https://YOUR-APP.up.railway.app/api/v1/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@pulsefit.uz","password":"demo12345"}'
```

---

## 🌐 2-QADAM: Web → Vercel

### 2.1. Backend URL'ini frontend'ga ulang

```bash
cd pulsefit_mobile

# .env faylini yangilang:
echo "EXPO_PUBLIC_API_URL=https://YOUR-APP.up.railway.app/api/v1" > .env
```

### 2.2. GitHub'ga push qiling

```bash
git init
git add .
git commit -m "feat: pulsefit mobile/web"
gh repo create pulsefit-mobile --public --source=. --push
```

### 2.3. Vercel'ga deploy

#### Variant A: Vercel CLI

```bash
# 1. CLI o'rnatish
npm i -g vercel

# 2. Login (brauzer ochiladi)
vercel login

# 3. Deploy
cd pulsefit_mobile
vercel
# Savollarga javob bering:
#   Set up and deploy? Y
#   Which scope? <hisobingiz>
#   Link to existing project? N
#   Project name? pulsefit
#   Directory? ./
#   Override settings? N

# 4. Production deploy
vercel --prod
```

#### Variant B: Vercel Dashboard

1. https://vercel.com → "Add New" → "Project"
2. GitHub'dan `pulsefit-mobile` repo'sini import qiling
3. **Build settings** (avtomatik aniqlanadi `vercel.json`'dan):
   - Framework Preset: Other
   - Build Command: `npx expo export --platform web`
   - Output Directory: `dist`
   - Install Command: `npm install --legacy-peer-deps`
4. **Environment Variables**:
   ```
   EXPO_PUBLIC_API_URL = https://YOUR-APP.up.railway.app/api/v1
   ```
5. **Deploy** tugmasini bosing (3-5 daqiqa)

### 2.4. Web tayyor!

URL: `https://pulsefit.vercel.app` 🎉

---

## 🔄 3-QADAM: Backend CORS'ni yangilash

Frontend Vercel domeni paydo bo'lgach, backendga qaytib CORS'ni cheklang:

```bash
railway variables --set "CORS_ALLOW_ALL_ORIGINS=False"
railway variables --set "CORS_ALLOWED_ORIGINS=https://pulsefit.vercel.app"
railway variables --set "CSRF_TRUSTED_ORIGINS=https://pulsefit.vercel.app"
```

Yoki Railway Dashboard'da xuddi shu o'zgaruvchilarni tahrirlang.

---

## ✅ Tekshirish

| Servis | URL | Test |
|--------|-----|------|
| Backend root | `https://YOUR-APP.up.railway.app/` | JSON javob |
| Health | `/api/health/` | `{"status":"ok"}` |
| Swagger | `/api/docs/` | API hujjatlari |
| Admin | `/admin/` | `admin@pulsefit.uz` / `admin12345` |
| Web | `https://pulsefit.vercel.app` | Login ekran |

---

## 🐛 Tez-tez muammolar

### "DisallowedHost" xato
- Railway Dashboard → Variables → `ALLOWED_HOSTS=*` qo'shing

### Vercel build crashed
- Dashboard → Deployments → bosib log'larni o'qing
- Eng ko'p sabab: `EXPO_PUBLIC_API_URL` o'rnatilmagan

### CORS xato (Web → API)
- Backend'da: `CORS_ALLOWED_ORIGINS` Vercel URL'ini o'z ichiga olishi kerak
- Yoki muvaqqat: `CORS_ALLOW_ALL_ORIGINS=True`

### SQLite ma'lumotlar yo'qolyapti
- **Volume qo'shganmisiz?** (1.3 qadam)
- `SQLITE_DIR=/data` env var bormi?

---

## 💰 Xarajatlar

| Servis | Plan | Bepul limit |
|--------|------|-------------|
| Railway | Trial | $5 kredit (~500 soat) |
| Railway | Hobby | $5/oy + $0.000231/GB-soat |
| Vercel | Hobby | 100 GB bandwidth/oy |

**Talaba uchun:** Bepul tier yetadi (kunlik kam trafik).

---

## 🎓 Kurs ishi taqdimoti uchun

Quyidagi linklarni hujjatga kiritib qo'ying:

```
🐍 Backend API:    https://pulsefit-api.up.railway.app
   Swagger UI:     https://pulsefit-api.up.railway.app/api/docs/
   Admin Panel:    https://pulsefit-api.up.railway.app/admin/

🌐 Web ilova:      https://pulsefit.vercel.app

🔑 Demo akkaunt:   demo@pulsefit.uz / demo12345
🔑 Admin akkaunt:  admin@pulsefit.uz / admin12345

📦 GitHub:         https://github.com/USERNAME/pulsefit-backend
                   https://github.com/USERNAME/pulsefit-mobile
```

Komissiyaga jonli demo: brauzerda `pulsefit.vercel.app` ochib ko'rsatasiz!
