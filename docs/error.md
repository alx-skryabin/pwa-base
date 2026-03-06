# Перехватчик ошибок

Централизованная обработка ошибок: вывод в консоль через **systemLogger** и отправка на сервер
(только если указан url в .env).

## Что перехватывается

| Источник                 | Где настраивается                        | Что ловит                                                          |
|--------------------------|------------------------------------------|--------------------------------------------------------------------|
| **window.onerror**       | `main.tsx` → `initGlobalErrorHandlers()` | Синхронные ошибки, ошибки в скриптах                               |
| **unhandledrejection**   | `main.tsx` → `initGlobalErrorHandlers()` | Необработанные отклонённые промисы                                 |
| **Ошибки в маршрутах**   | `app/routes` → `errorElement`            | Ошибки в страницах и layout'ах маршрутов (RouteErrorFallback)      |
| **React Error Boundary** | `App.tsx` → `<ErrorBoundary>`            | Ошибки в провайдерах (ThemeProvider, SessionProvider, PWAProvider) |

**Почему два перехватчика:** React Router перехватывает ошибки только **внутри** дерева маршрута (
страницы, их layout'ы). Всё, что выше `RouterProvider` — ThemeProvider, SessionProvider,
PWAProvider — в дерево маршрута не входит. Ошибка там попадёт в **ErrorBoundary** в App, а не в
`errorElement`. В типичном сценарии падают страницы → обрабатывает RouteErrorFallback.
ErrorBoundary — страховка на случай падения провайдеров.

## Настройки

### 1. Включить отправку на сервер

**Вариант A — отдельный URL для логов ошибок**

В `.env.production` (или `.env.development` для проверки):

```env
VITE_ERROR_REPORT_URL=https://api.example.com/logs/errors
```

Отправка выполняется **только если** задан `VITE_ERROR_REPORT_URL` или `VITE_API_URL`.

**Вариант B — через общий API**

Если задан только `VITE_API_URL`, запросы уходят на `{VITE_API_URL}/logs/errors`:

```env
VITE_API_URL=https://api.example.com
```

Сервер должен принимать **POST** с JSON такого вида:

```json
{
  "type": "react",
  "message": "Моя ошибка",
  "stack": "Error: Моя ошибка\n    at ...",
  "componentStack": "    in SomeComponent ...",
  "timestamp": "2026-03-05T12:00:00.000Z",
  "url": "https://...",
  "userAgent": "...",
  "context": {}
}
```

Поля `type`: `"window.onerror"` | `"unhandledrejection"` | `"react:app"` | `"react:route"`.
Остальные поля опциональны в
зависимости от типа.

### 2. Проверить обработку ошибок локально

**Ошибка в странице (useEffect / render):**

В любом компоненте-странице (например, `Dev`):

```tsx
useEffect(() => {
  throw new Error('Моя ошибка')
}, [])
```

Ожидание:

- В консоли: сообщение от **systemLogger** (секция SYSTEM):
  `[SYSTEM] [ERROR] ... [react] Моя ошибка`.
- На экране: блок «Что-то пошло не так», текст ошибки и кнопка «Попробовать снова» (это рисует
  `RouteErrorFallback` из `errorElement` роутера).
- Если задан `VITE_ERROR_REPORT_URL` или `VITE_API_URL` — в Network будет POST на URL логов ошибок.

**Необработанный промис:**

В том же компоненте (временно):

```tsx
useEffect(() => {
  Promise.reject(new Error('Ошибка в промисе'))
}, [])
```

Ожидание: в консоли systemLogger с типом `unhandledrejection` и при заданном URL — отправка на
сервер.

**Синхронная ошибка (window.onerror):**

В обработчике или по кнопке:

```tsx
<button type="button" onClick={() => {
  throw new Error('Синхронная ошибка')
}}>
  Выбросить
</button>
```

Ожидание: консоль systemLogger с типом `window.onerror` и при заданном URL — отправка на сервер.

**Когда срабатывает ErrorBoundary (а не RouteErrorFallback):**

ErrorBoundary в App ловит ошибки только в **провайдерах** (ThemeProvider, SessionProvider,
PWAProvider), т.е. до того, как роутер отрисует страницу. Чтобы проверить его fallback и лог:

1. Открой любой файл провайдера, например `src/app/theme/ThemeProvider.tsx` (или тот, где определён
   `ThemeProvider`).
2. В начале рендера (в самом верху тела компонента) временно добавь:
   `throw new Error('Ошибка в провайдере')`.
3. Перезагрузи приложение.

Ожидание: на экране будет fallback **ErrorBoundary** (тот, что задан в `App.tsx`: кастомный
`fallback` или стандартный «Что-то пошло не так»), в консоли — systemLogger с типом `react`.
RouteErrorFallback при этом не вызывается, т.к. ошибка произошла выше роутера. После проверки убери
`throw`.

Если отдельный fallback для провайдеров не нужен (провайдеры стабильны), **ErrorBoundary в App можно
удалить**: оберни в `App.tsx` только провайдеры без ErrorBoundary. Ошибки в провайдерах тогда уйдут
в `window.onerror` (или unhandledrejection) и будут залогированы через `initGlobalErrorHandlers`, но
без своего React-UI.

## Ручной вызов

Из любого места приложения:

```ts
import {reportError} from '@shared/libs/errorReporting'

try {
  // ...
} catch (e) {
  reportError('window.onerror', e, {context: {feature: 'checkout'}})
}
```

После вызова: лог в консоль через systemLogger и при заданном URL — отправка на сервер.

## Файлы

| Путь                                    | Назначение                                                                |
|-----------------------------------------|---------------------------------------------------------------------------|
| `src/shared/libs/errorReporting/`       | Сервис: `reportError`, `sendErrorToServer`, `initGlobalErrorHandlers`     |
| `src/app/error/`                        | Компонент Error Boundary (ошибки вне роутера)                             |
| `src/app/routes/RouteErrorFallback.tsx` | Fallback для ошибок в маршрутах (errorElement), вызывает reportError      |
| `src/app/routes/index.tsx`              | Роутер: у каждого маршрута задан `errorElement: <RouteErrorFallback />`   |
| `src/main.tsx`                          | Вызов `initGlobalErrorHandlers()` до рендера                              |
| `src/app/App.tsx`                       | Оборачивание приложения в `<ErrorBoundary>` (ошибки в провайдерах и т.п.) |

## Переменные окружения

| Переменная                                                                   | Описание                                                                                       |
|------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| `VITE_ERROR_REPORT_URL`                                                      | URL для POST-запроса с логом ошибки. Если не задан, используется `VITE_API_URL + /logs/errors` |
| `VITE_API_URL`                                                               | Базовый URL API; для ошибок используется только если `VITE_ERROR_REPORT_URL` не задан          |
| `VITE_LOGGER_ENABLED`, `VITE_LOGGER_ALWAYS_SHOW`, `VITE_LOGGER_FORCE_ERRORS` | Влияют на вывод systemLogger в консоль (см. раздел про логгер)                                 |
