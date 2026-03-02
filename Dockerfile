# =============================================================================
# Production-образ: сборка приложения (Vite) + раздача через nginx.
# Переменные VITE_* берутся из .env.production при сборке (файл копируется
# через COPY . .). Новые переменные в .env.production подхватываются автоматически.
# =============================================================================

# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Сначала только package.json — чтобы слой с зависимостями кэшировался
# при изменении только исходного кода.
COPY package.json package-lock.json ./
RUN npm ci

# Копируем весь проект (в т.ч. .env.production — не исключён в .dockerignore).
# Vite при npm run build читает все VITE_* из .env.production.
COPY . .

RUN npm run build

# ---------- Stage 2: Serve ----------
FROM nginx:alpine

# Статика приложения из стадии сборки.
COPY --from=builder /app/dist /usr/share/nginx/html

# Конфиг nginx: SPA fallback, кэш статики, ослабленный кэш для PWA (sw, manifest).
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
