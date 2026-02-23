# FSD

src/
├── app/                    # Инициализация приложения
│   ├── providers/          # Провайдеры (Theme, Router, Store, Auth)
│   ├── styles/             # Глобальные стили, переменные CSS
│   ├── types/              # Глобальные типы/интерфейсы приложения
│   ├── App.tsx             # Корневой компонент
│   ├── main.tsx            # Точка входа (рендер в DOM)
│   └── vite-env.d.ts       # Типы для Vite (если используется)
│
├── pages/                   # Страницы приложения (композиция)
│   ├── home/               # Страница "Главная"
│   │   ├── ui/             # Компоненты страницы
│   │   ├── index.tsx        # Публичный экспорт
│   │   └── types.ts        # Типы только для этой страницы (опционально)
│   ├── profile/            # Страница "Профиль"
│   │   ├── ui/
│   │   └── index.tsx
│   └── not-found/          # Страница 404
│       └── ui/
│
├── widgets/                 # Самостоятельные блоки (композиция фич)
│   ├── header/             # Шапка сайта
│   │   ├── ui/             # Компонент Header
│   │   ├── model/          # Логика виджета (store/slice)
│   │   ├── lib/            # Хелперы для виджета
│   │   └── index.tsx
│   └── sidebar/            # Сайдбар
│       ├── ui/
│       └── index.tsx
│
├── features/                # Фичи (действия пользователя)
│   ├── auth/               # Фича авторизации
│   │   ├── ui/             # Компоненты фичи (LoginForm, RegisterForm)
│   │   ├── model/          # Стор фичи (authSlice, thunks)
│   │   ├── api/            # API запросы фичи
│   │   ├── lib/            # Хелперы
│   │   └── index.tsx
│   ├── theme-toggle/       # Фича переключения темы
│   │   ├── ui/
│   │   └── index.tsx
│   └── add-to-cart/        # Фича добавления в корзину
│       ├── ui/
│       └── index.tsx
│
├── entities/                 # Бизнес-сущности
│   ├── user/                # Сущность пользователя
│   │   ├── ui/              # Компоненты (UserCard, UserAvatar)
│   │   ├── model/           # Стор сущности (userSlice, selectors)
│   │   ├── api/             # API для пользователя
│   │   ├── lib/             # Утилиты для пользователя
│   │   └── index.tsx
│   ├── product/             # Сущность товара
│   │   ├── ui/
│   │   ├── model/
│   │   ├── api/
│   │   └── index.tsx
│   └── order/               # Сущность заказа
│       └── ...
│
├── shared/                   # Переиспользуемый код
│   ├── api/                 # Базовая конфигурация API (axios instance)
│   │   └── base-api.ts
│   ├── ui/                  # UI-кит (переиспользуемые компоненты)
│   │   ├── button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── index.tsx
│   │   ├── input/
│   │   └── modal/
│   ├── lib/                  # Общие утилиты/хелперы
│   │   ├── hooks/            # Кастомные хуки (useDebounce, useLocalStorage)
│   │   ├── helpers/          # Функции-помощники (formatDate, validateEmail)
│   │   └── constants/        # Константы (routes, api endpoints)
│   ├── config/               # Конфигурация приложения
│   │   └── index.tsx
│   └── types/                # Общие типы (shared/types)
│
├── vite.config.ts            # Конфиг Vite (если используется)
├── package.json
└── tsconfig.json
