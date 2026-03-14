# IndexedDB в приложении.

При первом заходе создаётся IndexedDB с именем из `package.json` (поле `name`). В ней создаются
объектные хранилища для справочников и для сессии; пока идёт инициализация, показывается splash,
затем — экран авторизации или home. Справочники заполняются из JSON в `@shared/assets/data-guides/`.
После успешной авторизации в store сессии записываются данные из `@shared/assets/data-user/` (user,
visits).

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

Версия задаётся константой **`DB_VERSION`** в `src/shared/libs/indexedDb/types.ts`. При увеличении
версии браузер вызывает `onUpgradeNeeded`: старые хранилища удаляются, создаются заново (пустые),
справочники заполняются из JSON. Таким образом, при смене версии таблицы и данные пересоздаются.

---

## Как добавить новый справочник

1. **Добавить JSON-файл** в `@shared/assets/data-guides/`, например `cities.json`. Каждая запись должна
   содержать поле **`id`** (число) — keyPath в IndexedDB.

2. **Зарегистрировать store:** в `src/shared/libs/indexedDb/storeNames.ts` добавить имя в *
   *`GUIDE_STORE_NAMES`**.

3. **Подключить данные в app/init** в `src/app/init/initDb.ts`:

- импорт: `import citiesData from '@shared/assets/data-guides/cities.json'`;
- в объект **`GUIDE_DATA`**: `cities: citiesData as GuideRecord[]`.

После этого при первом запуске (или после повышения `DB_VERSION`) будет создано хранилище и
заполнено из JSON.

---

## Store сессии (user, visits)

- **Список:** `SESSION_STORE_NAMES` в `src/shared/libs/indexedDb/storeNames.ts` (
  `['user', 'visits']`). При добавлении новых таблиц сессии — расширить массив там и при
  необходимости данные для записи при логине.
- **Создание:** все store из `SESSION_STORE_NAMES` создаются при общей инициализации в **`initDb`
  ** (вместе со справочниками).
- **Заполнение:** при успешной авторизации в `user` записывается один объект (текущий пользователь),
  в `visits` — массив из `@shared/assets/data-user/visits.json`.
- **Очистка:** при выходе вызывается `clearStoresList(options, SESSION_STORE_NAMES)`; очищаются
  только существующие store, отсутствующие пропускаются без ошибки.

---

## Функция deleteDb

`deleteDb(name: string)` из `@shared/libs/indexedDb` полностью удаляет базу с указанным именем.
Используется для принудительного сброса (настройки, отладка). Перед вызовом нужно закрыть все
соединения с этой БД; иначе сработает `onblocked`. После удаления при следующем открытии БД
создаётся заново с актуальной версией.

---

## Удобное использование IDB

- **`useAppDb()`** (`@shared/hooks/useAppDb`) — в компонентах даёт `{ dbName, version }`, чтобы не
  повторять их в каждом вызове.
- **`runWithDb(options, fn)`** (`@shared/libs/indexedDb`) — открыть БД, выполнить `fn(db)`, закрыть
  в `finally`. Подходит для разовых операций.
- **`get(db, storeName, key)`** — одна запись по ключу; **`getAll(db, storeName)`** — все записи из
  store; **`getAllByIndex(db, storeName, indexName, key)`** — выборка по индексу (на стороне БД).
- **Опции БД один раз:** при инициализации в `AppInitProvider` вызывается *
  *`setAppDbOptions({ name })`**. После этого **`runWithDb(fn)`** вызывается без аргумента options —
  опции берутся из `getAppDbOptions()`. Передавать `dbOptions` в каждый вызов не нужно.
- **`runWithDb(fn)`** — один аргумент, callback; опции БД подставляются автоматически. *
  *`runWithDb(options, fn)`** — для init и особых случаев с явными options.
- Обобщённые операции сессии: **`writeToStores(data)`**, **`clearStoresList(storeNames)`** без
  options (внутри используют `runWithDb(fn)`).

---

## Интерфейсы данных (JSON)

Полные типы по содержимому `data-guides` заданы в **`src/entities/guide/model/types.ts`**:

- **Continent** — континенты: id, name, square, population, countries, religions[], climate[],
  description и др.
- **Country** — страны: id, name, nameEn, capital, continentId, flag, religions[], timezones[],
  established, government и др.
- **RegionRus** — регионы РФ: id, name, center, regionCode, searchCodes, type, population,
  populationCenter.

Типы по **data-user** в **`src/entities/user/model/types.ts`**: **UserFromJson** (login, name,
role), **UsersMap** (Record<string, UserFromJson> для users.json), **Visit** (id, isMagnet,
regionId, countryId, continentId для visits.json).

**Индексы** заданы в **`src/shared/libs/indexedDb/storeIndexes.ts`** (константа **STORE_INDEXES**):
для каждого store — массив `{ name, keyPath, unique?, multiEntry? }`. При создании таблиц в `initDb`
по этому конфигу создаются индексы. Сейчас: **countries** — `continentId`; **regionsRus** —
`searchCodes` (multiEntry для поиска по элементу массива); **visits** — `regionId`, `countryId`,
`continentId`, `isMagnet` (поиск по любому полю).

---

## Паттерны

- **Опции БД один раз:** при старте приложения в `AppInitProvider` вызывается
  `setAppDbOptions({ name })`. Дальше все вызовы **`runWithDb(fn)`**, **`readCurrentUser()`**, *
  *`writeToStores(data)`**, **`getContinents()`** и т.п. не принимают options — опции берутся
  внутри.

