/** Запись справочника — все guide-таблицы используют keyPath id. */
export interface GuideRecord {
  id: number

  [key: string]: unknown
}

/** Список имён объектных хранилищ (таблиц) справочников в IndexedDB.
 * При добавлении нового справочника — добавить сюда и в GUIDE_JSON_FILES. */
export const GUIDE_STORE_NAMES = ['continents', 'countries', 'regions'] as const
export type GuideStoreName = (typeof GUIDE_STORE_NAMES)[number]

/**
 * Соответствие «имя store → имя JSON-файла» (без пути) для первичной загрузки.
 * Нужен как единый справочник и для возможной динамической загрузки по имени файла.
 */
export const GUIDE_JSON_FILES: Record<GuideStoreName, string> = {
  continents: 'guide-continents.json',
  countries: 'guide-countries.json',
  regions: 'guide-regions.json',
}
