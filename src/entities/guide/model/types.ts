/** Запись справочника — все guide-таблицы используют keyPath id. */
export interface GuideRecord {
  id: number
  [key: string]: unknown
}
