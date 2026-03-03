# Storybook

Storybook используется для изолированной разработки и документации компонентов. Он запускается
отдельно и использует те же алиасы путей и темы (светлая/тёмная), что и приложение.

## Запуск

```bash
npm run storybook
```

По умолчанию открывается на порту **6006** (http://localhost:6006).

## Сборка статики

Сборка статического сайта Storybook для деплоя (результат в папке `storybook-static/`):

```bash
npm run storybook:build
```

## Настройка

- **Конфиг**: `.storybook/main.ts` — алиасы (`@app`, `@features`, `@shared` и т.д.), список историй.
  Тестирование через Storybook (addon-vitest, Playwright) в проекте не используется.
- **Preview**: `.storybook/preview.tsx` и `.storybook/preview.css` — глобальные стили (Ant Design,
  переменные, темы), обёртка `ThemeProvider`, переключатель **Тема** в тулбаре и полноширинный
  layout (на всю доступную ширину).

## Где лежат истории

Истории компонентов из **features** размещаются рядом с компонентом:

- `src/features/ThemeToggle/index.stories.tsx`
- `src/features/HamburgerToggle/index.stories.tsx`
- `src/features/PromptPWAInstall/index.stories.tsx`

Имена файлов: `*.stories.ts` или `*.stories.tsx`. Сборка подхватывает все
`../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`.

## Темы в Storybook

В тулбаре панели превью доступен переключатель **Тема** (Светлая / Тёмная). Все сторис по умолчанию
рендерятся внутри `ThemeProvider` приложения (layout на всю ширину), поэтому компоненты выглядят так
же, как в dev/production.
