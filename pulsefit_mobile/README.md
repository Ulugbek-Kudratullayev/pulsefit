# PulseFit Mobile (Expo + React Native + TypeScript)

## ⚡ Tez ishga tushirish

```bash
# 1) Paketlarni o'rnating
npm install
# yoki: yarn install / pnpm install

# 2) .env yarating
cp .env.example .env

# 3) Backend URL'ini sozlang (.env faylida)
#    Android emulator: http://10.0.2.2:8000/api/v1
#    iOS simulator:    http://localhost:8000/api/v1
#    Real qurilma:     http://192.168.X.X:8000/api/v1

# 4) Serverni ishga tushiring
npx expo start
```

## 📱 Qurilmada sinash

| Variant | Qadamlar |
|---------|----------|
| **Telefoningiz (eng oson)** | App Store/Play Store: "Expo Go" → QR kodni skanerlang |
| **Android emulator** | Android Studio → AVD → `npx expo start --android` |
| **iOS simulator** (Mac) | Xcode → Simulator → `npx expo start --ios` |
| **Web** | `npx expo start --web` |

> **Eslatma:** Telefon va kompyuter bir Wi-Fi tarmog'ida bo'lishi kerak.
> Backend `0.0.0.0:8000` da ishlasin (mobil ulana olishi uchun).

## 📂 Folder structure

```
src/
├── api/              # Backend API klient (auth, exercises, workouts, ...)
├── components/ui/    # Button, Input, Card, Screen, ProgressBar
├── screens/          # Ekranlar (auth, dashboard, exercises, ...)
├── stores/           # Zustand: authStore
├── lib/              # axios, i18n, MMKV, tokenManager
├── hooks/            # useTheme
├── constants/        # theme.ts (colors, spacing)
├── types/            # TypeScript types
└── locales/          # uz.json (translation)
app/                  # expo-router fayllari
├── _layout.tsx       # Root navigator (auth flow)
├── (tabs)/           # Bottom tabs (index, exercises, workouts, trackers, profile)
├── login.tsx
├── register.tsx
├── onboarding.tsx
├── profile-setup.tsx
├── exercise/[id].tsx
├── workout/[id].tsx
└── session/[id].tsx
```

## 🎨 Dizayn tizimi

`src/constants/theme.ts` — barcha ranglar, spacing, fontlar, soyalar.

- **Primary:** `#FF6B35` (energetik to'q sariq)
- **Secondary:** `#2EC4B6` (turkuaz)
- **Light/Dark theme:** avtomatik tizim asosida + qo'lda almashtirish

## 🌐 Lokalizatsiya

- O'zbek (lotin) — birlamchi
- Tarjimalar: `src/locales/uz.json`
- Hookdan ishlatish:
  ```tsx
  import { useTranslation } from 'react-i18next';
  const { t } = useTranslation();
  <Text>{t('dashboard.greeting')}</Text>
  ```

## 🔧 Buyruqlar

```bash
npx expo start              # Dev server
npx expo start --tunnel     # ngrok orqali (real qurilma uchun)
npx expo start --clear      # Cache tozalab
npm run type-check          # TypeScript tekshirish
```

## 🏗️ Production build (APK)

```bash
# EAS CLI o'rnatish
npm install -g eas-cli
eas login

# Build (bulutda)
eas build --profile preview --platform android
# 10-15 daqiqa kutib turing, APK link keladi
```

## 🧱 Asosiy paketlar

| Paket | Vazifa |
|-------|--------|
| `expo-router` | File-based navigation |
| `@tanstack/react-query` | Server state, cache |
| `zustand` | Client state |
| `axios` | HTTP klient (JWT interceptor bilan) |
| `react-hook-form` + `zod` | Formalar va validatsiya |
| `expo-secure-store` | JWT tokenlarini xavfsiz saqlash |
| `react-native-mmkv` | Tezkor lokal key-value |
| `expo-sensors` | Pedometer (qadam) |
| `expo-notifications` | Push notif |
| `i18next` + `react-i18next` | Lokalizatsiya |
| `@expo/vector-icons` | Ikonkalar |

## 🐛 Tez-tez uchraydigan muammolar

### "Network Error"
- Backend ishlayotganini tekshiring
- `.env` da to'g'ri URL borligini tekshiring
- Real qurilma uchun: ngrok yoki Wi-Fi IP

### "Property 'X' does not exist on type"
```bash
npx expo install --fix
```

### Reanimated xatosi
- `babel.config.js` da `react-native-reanimated/plugin` borligini tekshiring
- Cache tozalang: `npx expo start --clear`
