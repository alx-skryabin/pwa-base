import { DB_VERSION } from './types'

export interface AppDbOptions {
  name: string
  version: number
}

let appDbOptions: AppDbOptions | null = null

/**
 * Задать опции БД приложения один раз (вызывается из AppInitProvider при инициализации).
 * После этого runWithDb(fn) и openAppDb() используют эти опции без передачи в каждый вызов.
 */
export function setAppDbOptions(options: { name: string; version?: number }): void {
  appDbOptions = {
    name: options.name,
    version: options.version ?? DB_VERSION,
  }
}

/**
 * Получить опции БД приложения. Вызывать после setAppDbOptions (после инициализации).
 * @throws если опции ещё не заданы
 */
export function getAppDbOptions(): AppDbOptions {
  if (!appDbOptions) {
    throw new Error(
      'App DB options not set. Call setAppDbOptions() during app init (e.g. in AppInitProvider).'
    )
  }
  return appDbOptions
}
