## 📋 Легенда слоев

| Слой         | Назначение                                             | Зависимости                                                           |
|--------------|--------------------------------------------------------|-----------------------------------------------------------------------|
| **app**      | Инициализация приложения, провайдеры, глобальные стили | Ни от кого не зависит                                                 |
| **pages**    | Страницы, композиция виджетов и фич                    | Могут зависеть от **widgets**, **features**, **entities**, **shared** |
| **widgets**  | Крупные блоки интерфейса (композиция фич)              | Могут зависеть от **features**, **entities**, **shared**              |
| **features** | Функциональные модули (действия пользователя)          | Могут зависеть от **entities**, **shared**                            |
| **entities** | Бизнес-сущности                                        | Могут зависеть только от **shared**                                   |
| **shared**   | Переиспользуемый код (UI-кит, утилиты, API)            | Ни от кого не зависит                                                 |

## FSD

src/
├── app/ # Инициализация приложения
│ ├── providers/ # Провайдеры (Theme, Router, PWA, Logger)
│ ├── styles/ # Глобальные стили, CSS-переменные
│ ├── types/ # Глобальные типы/интерфейсы
│ ├── App.tsx # Корневой компонент
│ ├── main.tsx # Точка входа
│ └── vite-env.d.ts # Типы для Vite
│
├── pages/ # Страницы приложения
│ ├── home/ # Главная страница
│ │ ├── ui/ # Компоненты страницы
│ │ ├── index.ts # Публичный экспорт
│ │ └── types.ts # Типы для страницы
│ ├── dashboard/ # Панель управления
│ │ ├── ui/
│ │ └── index.ts
│ ├── settings/ # Настройки
│ │ ├── ui/
│ │ └── index.ts
│ └── not-found/ # 404 страница
│ └── ui/
│
├── widgets/ # Самостоятельные блоки интерфейса
│ ├── header/ # Шапка приложения
│ │ ├── ui/ # Компоненты
│ │ ├── model/ # Логика (store/slice)
│ │ ├── lib/ # Хелперы
│ │ └── index.ts
│ ├── sidebar/ # Боковая панель
│ │ ├── ui/
│ │ └── index.ts
│ └── footer/ # Подвал
│ ├── ui/
│ └── index.ts
│
├── features/ # Функциональные модули
│ ├── auth/ # Авторизация
│ │ ├── ui/ # Формы входа/регистрации
│ │ ├── model/ # Стор, actions
│ │ ├── api/ # API запросы
│ │ ├── lib/ # Валидация, хелперы
│ │ └── index.ts
│ ├── theme-switcher/ # Переключение темы
│ │ ├── ui/
│ │ ├── model/
│ │ └── index.ts
│ ├── notifications/ # Уведомления
│ │ ├── ui/
│ │ ├── model/
│ │ └── index.ts
│ └── data-export/ # Экспорт данных
│ ├── ui/
│ ├── model/
│ └── index.ts
│
├── entities/ # Бизнес-сущности
│ ├── user/ # Пользователь
│ │ ├── ui/ # Аватар, карточка пользователя
│ │ ├── model/ # Стор, selectors
│ │ ├── api/ # Запросы к API
│ │ ├── lib/ # Утилиты
│ │ └── index.ts
│ ├── session/ # Сессия
│ │ ├── ui/
│ │ ├── model/
│ │ ├── api/
│ │ └── index.ts
│ ├── document/ # Документ
│ │ ├── ui/
│ │ ├── model/
│ │ ├── api/
│ │ └── index.ts
│ └── settings/ # Настройки
│ ├── ui/
│ ├── model/
│ └── index.ts
│
├── shared/ # Переиспользуемый код
│ ├── api/ # Базовая конфигурация API
│ │ ├── client.ts # HTTP клиент (axios/fetch)
│ │ └── interceptors.ts # Интерцепторы
│ ├── ui/ # UI-компоненты
│ │ ├── button/
│ │ │ ├── Button.tsx
│ │ │ ├── Button.module.css
│ │ │ └── index.ts
│ │ ├── input/
│ │ ├── modal/
│ │ ├── loader/
│ │ └── tooltip/
│ ├── lib/ # Утилиты и хуки
│ │ ├── hooks/ # Кастомные хуки
│ │ │ ├── useDebounce.ts
│ │ │ ├── useLocalStorage.ts
│ │ │ └── useClickOutside.ts
│ │ ├── helpers/ # Функции-помощники
│ │ │ ├── formatDate.ts
│ │ │ ├── validate.ts
│ │ │ └── cn.ts # Утилита для классов
│ │ └── constants/ # Константы
│ │ ├── routes.ts
│ │ └── config.ts
│ ├── config/ # Конфигурация
│ │ └── index.ts
│ └── types/ # Общие типы
│ ├── common.ts
│ └── api.ts
│
├── .env # Переменные окружения
├── .env.example # Пример переменных
├── index.html # HTML шаблон
├── vite.config.ts # Конфигурация Vite
├── package.json
└── tsconfig.json
