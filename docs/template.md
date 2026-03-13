# Использование pwa-base как шаблона

Репозиторий **pwa-base** можно использовать как шаблон для новых проектов. Дочерний проект получает свой репозиторий и при этом может подтягивать обновления из базового шаблона.

---

## 1. Создание нового проекта из шаблона

### Вариант A: через GitHub «Use this template»

1. На странице репозитория **pwa-base** на GitHub нажмите **Use this template** → **Create a new repository**.
2. Задайте имя и владельца нового репозитория, при необходимости выберите **Include all branches** (если нужна история и ветка `dev`).
3. Создайте репозиторий и склонируйте его локально:
   ```bash
   git clone https://github.com/<your-org>/<your-project>.git
   cd <your-project>
   ```
4. В дочернем проекте `origin` уже указывает на **ваш** новый репозиторий. Пуш и клонирование — только в него.

### Вариант B: клонирование и смена remote

1. Клонируйте базовый шаблон:
   ```bash
   git clone https://github.com/alx-skryabin/pwa-base.git my-new-project
   cd my-new-project
   ```
2. Удалите привязку к старому репозиторию и привяжите свой:
   ```bash
   git remote remove origin
   git remote add origin https://github.com/<your-org>/<your-project>.git
   ```
3. Запушьте ветки в свой репозиторий:
   ```bash
   git push -u origin master
   git push origin dev
   ```

После этого **дочерний проект** имеет один remote — `origin` (ваш репозиторий). Весь обычный workflow (коммиты, пуш, PR) идёт только в него.

---

## 2. Настройка получения обновлений из базового шаблона

Чтобы подтягивать изменения из **pwa-base** в дочерний проект, добавьте базовый репозиторий как второй remote — обычно его называют **upstream**.

### Однократная настройка (в дочернем проекте)

```bash
git remote add upstream https://github.com/alx-skryabin/pwa-base.git
```

Проверка:

```bash
git remote -v
# origin    https://github.com/<your-org>/<your-project>.git (fetch)
# origin    https://github.com/<your-org>/<your-project>.git (push)
# upstream  https://github.com/alx-skryabin/pwa-base.git (fetch)
# upstream  https://github.com/alx-skryabin/pwa-base.git (push)
```

- **origin** — ваш проект (сюда вы пушите).
- **upstream** — базовый шаблон (отсюда только забираете обновления, пушить в него не нужно).

---

## 3. Как получать обновления из базового шаблона

### Обновление ветки master

Находясь в дочернем проекте, в ветке `master`:

```bash
git fetch upstream
git merge upstream/master
```

При конфликтах — разрешите их, затем:

```bash
git add .
git commit -m "chore: merge upstream pwa-base"
git push origin master
```

### Обновление через отдельную ветку (рекомендуется)

Чтобы не смешивать обновления шаблона с текущей работой:

```bash
git fetch upstream
git checkout -b update-from-base
git merge upstream/master
# разрешите конфликты при необходимости
git add .
git commit -m "chore: merge upstream pwa-base"
git checkout master
git merge update-from-base
git push origin master
# при желании удалите ветку: git branch -d update-from-base
```

### Обновление ветки dev (если используете)

```bash
git fetch upstream
git checkout dev
git merge upstream/dev
# разрешите конфликты, затем
git push origin dev
```

---

## 4. Управление пушем из дочернего проекта

- **Пуш** делается только в **ваш** репозиторий:
  ```bash
  git push origin master
  git push origin dev
  ```
- В **upstream** (pwa-base) вы не пушите — это репозиторий шаблона. Все коммиты и пуш — только в **origin**.

Итого:

| Действие              | Remote    | Команда / смысл                          |
|-----------------------|-----------|------------------------------------------|
| Пушить свой код      | origin    | `git push origin <branch>`               |
| Забирать обновления  | upstream  | `git fetch upstream` + `git merge ...`   |
| Не пушить в шаблон   | upstream  | В upstream не делаем `git push`          |

---

## 5. Удобные команды (опционально)

В дочернем проекте можно добавить в `package.json` скрипты:

```json
{
  "scripts": {
    "template:fetch": "git fetch upstream",
    "template:merge-master": "git merge upstream/master",
    "template:update": "git fetch upstream && git merge upstream/master"
  }
}
```

Использование:

- `npm run template:fetch` — только подтянуть изменения из базового репозитория.
- `npm run template:merge-master` — слить `upstream/master` в текущую ветку (после fetch).
- `npm run template:update` — подтянуть и сразу слить обновления в текущую ветку.

Перед слиянием убедитесь, что вы на нужной ветке (например, `master` или `update-from-base`).

---

## 6. Что делать после клонирования дочернего проекта

1. Переименовать проект в `package.json`: поле `name`, при необходимости `author`.
2. Обновить метаданные PWA в `public/manifest.json`, заголовки в `index.html`.
3. Настроить окружение (например, `.env.development`) под новый проект.
4. Добавить remote `upstream` (см. раздел 2), чтобы потом подтягивать обновления из pwa-base.

---

## Краткая шпаргалка

| Задача                         | Команды |
|--------------------------------|--------|
| Создать проект из шаблона      | GitHub «Use this template» или `git clone` + сменить `origin` |
| Один раз настроить upstream   | `git remote add upstream https://github.com/alx-skryabin/pwa-base.git` |
| Получить обновления           | `git fetch upstream` затем `git merge upstream/master` (на нужной ветке) |
| Пушить свой код               | `git push origin master` (или ваша ветка) |
| Не пушить в шаблон            | Не использовать `git push upstream` |
