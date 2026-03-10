# IndexedDB в приложении

При первом заходе создаётся IndexedDB с именем из `package.json` (поле `name`). В ней создаются
объектные хранилища для справочников и для сессии; пока идёт инициализация, показывается splash,
затем — экран авторизации или home.

## Что изменилось / что добавлено

- **Store сессии:** при инициализации создаются пустые store `user` и `visits` (список в
  `SESSION_STORE_NAMES`, `entities/session`). При успешном логине в `user` пишется текущий
  пользователь, в `visits` — данные из `src/assets/data-user/visits.json`; при выходе оба store
  очищаются. Сессия хранится только в IDB, не в localStorage.
- **Версионирование:** версия задаётся `DB_VERSION` в `src/shared/libs/indexedDb/types.ts`. При
  увеличении версии в `onUpgradeNeeded` все store пересоздаются (справочники заново заполняются из
  JSON). Текущая версия — 4 (при необходимости добавляются недостающие store, в т.ч. `visits`).
- **Хук `useAppDb()`** (`@shared/hooks/useAppDb`): возвращает `{ dbName, version }` для вызовов
  `openDb` / `runWithDb` без повторения имени и версии.
- **`runWithDb(options, fn)`** (`@shared/libs/indexedDb`): открывает БД, выполняет `fn(db)`, в
  `finally` закрывает. Удобно для разовых операций.
- **`clearStores(db, storeNames)`** и **`clearStoresList(options, storeNames)`**: очистка одного или
  нескольких store. В `clearStoresList` очищаются только существующие store (если какого-то store
  нет — он пропускается, ошибки нет).
- **Обобщённые операции сессии:** `readCurrentUser(options)`, `writeToStores(options, data)`,
  `clearStoresList(options, storeNames)` в `entities/session/model/sessionStorage`. Все обращения к
  БД из сессии идут с полным списком `SESSION_STORE_NAMES`, чтобы при первом открытии создавались
  все нужные store.
- **Справочники:** данные лежат в `src/assets/data-guides/`; имена store — в едином файле (см.
  ниже).
- **Имена всех таблиц и ключ user:** в одном месте — `src/shared/libs/indexedDb/storeNames.ts`:
  `GUIDE_STORE_NAMES`, `SESSION_STORE_NAMES`, `ALL_STORE_NAMES`, `USER_STORE_KEY`. Импорт:
  `@shared/libs/indexedDb`.

---

## Имена таблиц (один файл)

Все имена объектных хранилищ и служебные константы заданы в *
*`src/shared/libs/indexedDb/storeNames.ts`**:

- **GUIDE_STORE_NAMES** — справочники (continents, countries, regionsRus).
- **SESSION_STORE_NAMES** — сессия (user, visits).
- **ALL_STORE_NAMES** — все store БД (справочники + сессия).
- **USER_STORE_KEY** — ключ единственной записи в store `user` (id = 1). Нужен для get/put текущего
  пользователя.

Типы **GuideStoreName**, **SessionStoreName** экспортируются оттуда же. Добавление новой таблицы:
изменить соответствующий массив в `storeNames.ts` и при необходимости логику инициализации/сессии.

---

## Версионирование БД

Версия задаётся константой `DB_VERSION` в `src/shared/libs/indexedDb/types.ts`. При увеличении
версии браузер вызывает `onUpgradeNeeded`: старые хранилища удаляются, создаются заново (пустые),
справочники заполняются из JSON. Таким образом, при смене версии таблицы и данные пересоздаются.

---

## Как добавить новый справочник

1. **Добавить JSON-файл** в `src/assets/data-guides/`, например `cities.json`. Каждая запись должна
   содержать поле **`id`** (число) — keyPath в IndexedDB.

2. **Зарегистрировать store:** в `src/shared/libs/indexedDb/storeNames.ts` добавить имя в
   `GUIDE_STORE_NAMES`. В `src/entities/guide/model/types.ts` добавить запись в `GUIDE_JSON_FILES`:
   `cities: 'cities.json'`.

3. **Подключить данные в app/init** (`src/app/init/initGuideDb.ts`):
  - импорт: `import citiesData from '@assets/data-guides/cities.json'`;
  - в объект `GUIDE_DATA`: `cities: citiesData as GuideRecord[]`.

После этого при первом запуске (или после повышения `DB_VERSION`) будет создано хранилище и
заполнено из JSON.

---

## Store сессии (user, visits)

- **Список:** `SESSION_STORE_NAMES` в `src/shared/libs/indexedDb/storeNames.ts` (
  `['user', 'visits']`). При добавлении новых таблиц сессии — расширить массив там и при
  необходимости данные для записи при логине.
- **Создание:** все store из `SESSION_STORE_NAMES` создаются при общей инициализации в
  `initGuideDb` (вместе со справочниками).
- **Заполнение:** при успешной авторизации в `user` записывается один объект (текущий пользователь),
  в `visits` — массив из `src/assets/data-user/visits.json`.
- **Очистка:** при выходе вызывается `clearStoresList(options, SESSION_STORE_NAMES)`; очищаются
  только существующие store, отсутствующие пропускаются без ошибки.

---

## Для чего функция `deleteDb`?

`deleteDb(name: string)` из `@shared/libs/indexedDb` полностью удаляет базу с указанным именем.
Используется для принудительного сброса (настройки, отладка). Перед вызовом нужно закрыть все
соединения с этой БД; иначе сработает `onblocked`. После удаления при следующем открытии БД
создаётся заново с актуальной версией.

---

## Для чего `GUIDE_JSON_FILES`?

В `src/entities/guide/model/types.ts` — маппинг «имя store → имя JSON-файла». Нужен как единый
справочник и основа для расширения (динамическая загрузка, скрипты). При добавлении справочника в
него добавляют соответствующую запись.

---

## Удобное использование IDB

- **`useAppDb()`** — в компонентах даёт `{ dbName, version }`, чтобы не повторять их в каждом
  вызове.
- **`runWithDb(options, fn)`** — открыть БД, выполнить `fn(db)`, закрыть в `finally`.
- **Обобщённые операции:** `writeToStores(options, data)`, `clearStoresList(options, storeNames)` и
  т.п.; список store сессии — `SESSION_STORE_NAMES`, при новых таблицах достаточно расширить массив
  и передавать данные в эти функции.

Подробнее по справочникам и путям к JSON см. также `docs/guide-db.md`.
