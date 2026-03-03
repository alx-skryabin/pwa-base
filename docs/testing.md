# Тестирование

В проекте используется **Vitest** и **React Testing Library** для модульных и компонентных тестов.

## Запуск тестов

```bash
# Режим watch (перезапуск при изменении файлов)
npm test

# Однократный прогон
npm run test:run

# С отчётом покрытия
npm run test:coverage
```

## Где размещать тесты (FSD)

В **Feature-Sliced Design** тесты размещаются **рядом с кодом** (colocated), в том же слайсе/фиче,
что и тестируемый модуль.

### Рекомендуемая структура

| Слой / место | Где тесты                                        | Пример                                |
|--------------|--------------------------------------------------|---------------------------------------|
| **app**      | В той же папке, суффикс `.test.ts` / `.test.tsx` | `app/routes/path.test.ts`             |
| **pages**    | В папке страницы или в подпапке `__tests__`      | `pages/home/index.test.tsx`           |
| **widgets**  | Рядом с виджетом                                 | `widgets/header/index.test.tsx`       |
| **features** | Рядом с фичей                                    | `features/ThemeToggle/index.test.tsx` |
| **entities** | Рядом с сущностью                                | `entities/user/model/user.test.ts`    |
| **shared**   | Рядом с модулем                                  | `shared/libs/logger/index.test.ts`    |

### Именование файлов

- **`*.test.ts`** / **`*.test.tsx`** — стандарт проекта (подхватывается Vitest по `include`).
- Альтернатива: `*.spec.ts` / `*.spec.tsx` (также включены в конфиг).

### Общая конфигурация тестов

- **Setup**: `src/shared/config/testing/setup.ts` — подключает matchers из
  `@testing-library/jest-dom`.
- **Утилиты**: `src/shared/config/testing/test-utils.tsx` — кастомный `render` с провайдерами (
  например, тема). Импорт:
  `import { render, screen, ... } from '@shared/config/testing/test-utils'`.

## Что принято покрывать тестами

### Минимум (базовый уровень)

1. **shared** — утилиты, хуки, константы, конфиги, логгеры

- Чистые функции и объекты конфигурации.
- Примеры: `path.test.ts`, `config.test.ts`, `logger/index.test.ts`.

2. **app** — конфигурация приложения

- Роуты, константы путей, конфиг темы и т.п.
- Примеры: `app/routes/path.test.ts`, `app/theme/config.test.ts`.

3. **Критичные фичи и виджеты**

- Хотя бы один компонентный тест на фичу/виджет с пользовательским сценарием (клик, ввод,
  отображение).
- Пример: `features/ThemeToggle/index.test.tsx`.

### Расширенный уровень

- **entities** — модель, селекторы, маппинг данных.
- **features** — все публичные UI и хуки фичи.
- **widgets** — сценарии использования виджета (с моками зависимостей).
- **pages** — рендер страницы и ключевые элементы (при необходимости с моками роутинга/API).

### Что обычно не покрывают

- Точка входа `main.tsx`.
- Стили и статика.
- Сложные E2E-сценарии (для них лучше отдельный инструмент, например Playwright).

## Структура теста

- **Один файл тестов на один модуль/компонент** — `ModuleName.test.ts(x)` рядом с
  `ModuleName.ts(x)`.
- **describe** — по имени модуля или группы сценариев.
- **it** — один чёткий сценарий на тест.
- Для компонентов: **render → поиск по роли/тексту → действие пользователя → проверка результата**.

## Покрытие

Отчёт покрытия генерируется по `src/**/*.{ts,tsx}` с исключениями:

- `*.d.ts`, `*.test.*`, `*.spec.*`, `main.tsx`, папка `shared/config/testing`.

Запуск: `npm run test:coverage`. Результаты: в консоли и в `coverage/` (в т.ч. HTML).

## Зависимости

- **vitest** — раннер и ассерты.
- **@testing-library/react** — рендер и поиск по DOM.
- **@testing-library/jest-dom** — матчеры (`toBeInTheDocument`, `toHaveBeenCalled` и т.д.).
- **@testing-library/user-event** — имитация действий пользователя.
- **jsdom** — окружение DOM для Vitest.

Конфигурация тестов задаётся в `vite.config.ts` (блок `test`).

## Исключение артефактов тестов из репозитория и сборки

### .gitignore

В репозиторий не попадают:

- **`coverage/`** — отчёты покрытия (генерируются по `npm run test:coverage`).
- **`.vitest/`** — кэш Vitest.
- **`**/vitest.config._.timestamp-_`\*\* — служебные файлы Vitest.

### .dockerignore

В контекст сборки Docker не включаются:

- **`coverage/`**, **`.vitest/`** — артефакты тестов.
- **`**/_.test.ts`**, **`\*\*/_.test.tsx`**, **`**/\*.spec.ts`**, **`**/\*.spec.tsx`\*\* — тестовые
  файлы (для образа нужна только production-сборка).

## ESLint и Prettier для тестов

- **ESLint**: тестовые файлы (`*.test.*`, `*.spec.*`) и папка `src/shared/config/testing/**`
  обрабатываются общими правилами; для них отключено правило `react-refresh/only-export-components`.
  Глобальные переменные Vitest (`describe`, `it`, `expect`, `vi` и т.д.) объявлены в
  `eslint.config.js`.
- **Prettier**: скрипты `prettier` и `prettier:fix` проверяют/форматируют
  `src/**/*.{ts,tsx,css,json}`, в том числе все тесты. Дополнительная настройка не требуется.
