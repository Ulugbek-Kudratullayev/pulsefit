#!/usr/bin/env bash
# PulseFit avtomatik deploy: Railway (backend) + Vercel (web)
set -e

echo "============================================"
echo "  PulseFit Deploy: Railway + Vercel"
echo "============================================"
echo ""

# ===== BACKEND -> RAILWAY =====
echo "[1/2] Backend Railway'ga deploy qilinmoqda..."
echo ""

cd pulsefit_backend

if ! command -v railway &> /dev/null; then
    echo "[XATO] Railway CLI o'rnatilmagan!"
    echo "O'rnatish: npm i -g @railway/cli"
    exit 1
fi

if ! railway whoami &> /dev/null; then
    echo "Railway'ga kirish kerak..."
    railway login
fi

if [ ! -d ".railway" ]; then
    echo "Yangi Railway loyihasi yaratilmoqda..."
    railway init
fi

echo "Deploy boshlandi..."
railway up --detach

echo ""
echo "Public domen o'rnatilmoqda..."
railway domain

echo ""
echo "Environment variables o'rnatilmoqda..."
railway variables --set "DEBUG=False"
railway variables --set "ALLOWED_HOSTS=*"
railway variables --set "CORS_ALLOW_ALL_ORIGINS=True"
railway variables --set "PYTHONUNBUFFERED=1"

echo ""
echo "[OK] Backend deploy yakunlandi!"
echo ""
read -p "Railway backend URL'ini kiriting (https://...): " RAILWAY_URL

cd ..

# ===== WEB -> VERCEL =====
echo ""
echo "[2/2] Web Vercel'ga deploy qilinmoqda..."
echo ""

cd pulsefit_mobile

echo "EXPO_PUBLIC_API_URL=$RAILWAY_URL/api/v1" > .env
echo ".env yangilandi."

if ! command -v vercel &> /dev/null; then
    echo "[XATO] Vercel CLI o'rnatilmagan!"
    echo "O'rnatish: npm i -g vercel"
    exit 1
fi

if ! vercel whoami &> /dev/null; then
    echo "Vercel'ga kirish kerak..."
    vercel login
fi

echo "Vercel'ga production deploy..."
vercel --prod --yes

cd ..

echo ""
echo "============================================"
echo "  DEPLOY YAKUNLANDI!"
echo "============================================"
echo ""
echo "Backend: $RAILWAY_URL"
echo "API docs: $RAILWAY_URL/api/docs/"
echo ""
