@echo off
REM PulseFit avtomatik deploy: Railway (backend) + Vercel (web)
setlocal enabledelayedexpansion

echo ============================================
echo   PulseFit Deploy: Railway + Vercel
echo ============================================
echo.

REM ===== BACKEND -> RAILWAY =====
echo [1/2] Backend Railway'ga deploy qilinmoqda...
echo.

cd pulsefit_backend

REM Railway CLI tekshirish
where railway >nul 2>&1
if errorlevel 1 (
    echo [XATO] Railway CLI o'rnatilmagan!
    echo O'rnatish: npm i -g @railway/cli
    pause
    exit /b 1
)

REM Login tekshirish
railway whoami >nul 2>&1
if errorlevel 1 (
    echo Railway'ga kirish kerak...
    railway login
)

REM Yangi loyiha (agar yo'q bo'lsa)
if not exist ".railway" (
    echo Yangi Railway loyihasi yaratilmoqda...
    railway init
)

REM Deploy
echo Deploy boshlandi...
railway up --detach

REM Public domen
echo.
echo Public domen o'rnatilmoqda...
railway domain

REM Env vars
echo.
echo Environment variables o'rnatilmoqda...
railway variables --set "DEBUG=False"
railway variables --set "ALLOWED_HOSTS=*"
railway variables --set "CORS_ALLOW_ALL_ORIGINS=True"
railway variables --set "PYTHONUNBUFFERED=1"

echo.
echo [OK] Backend deploy yakunlandi!
echo Domeningizni Railway dashboard'dan ko'ring va keyingi qadam uchun saqlang.
echo.
set /p RAILWAY_URL="Railway backend URL'ini kiriting (https://...): "

cd ..

REM ===== WEB -> VERCEL =====
echo.
echo [2/2] Web Vercel'ga deploy qilinmoqda...
echo.

cd pulsefit_mobile

REM .env yangilash
echo EXPO_PUBLIC_API_URL=%RAILWAY_URL%/api/v1 > .env
echo .env yangilandi.

REM Vercel CLI
where vercel >nul 2>&1
if errorlevel 1 (
    echo [XATO] Vercel CLI o'rnatilmagan!
    echo O'rnatish: npm i -g vercel
    pause
    exit /b 1
)

REM Login tekshirish
vercel whoami >nul 2>&1
if errorlevel 1 (
    echo Vercel'ga kirish kerak...
    vercel login
)

REM Production deploy
echo Vercel'ga production deploy...
vercel --prod --yes

cd ..

echo.
echo ============================================
echo   DEPLOY YAKUNLANDI!
echo ============================================
echo.
echo Backend: %RAILWAY_URL%
echo API docs: %RAILWAY_URL%/api/docs/
echo.
echo Web URL'ni Vercel chiqishidan oling
echo.
pause
