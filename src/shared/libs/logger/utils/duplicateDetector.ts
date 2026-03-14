/**
 * Детектор дублирующихся логов для защиты от StrictMode
 */
export class DuplicateDetector {
  private history: Map<string, number> = new Map()
  private maxSize: number
  private timeWindow: number

  constructor(maxSize: number = 100, timeWindow: number = 50) {
    this.maxSize = maxSize
    this.timeWindow = timeWindow
  }

  /**
   * Проверяет, является ли лог дубликатом
   */
  isDuplicate(section: string, level: string, message: string): boolean {
    // В production не проверяем дубли
    if (import.meta.env.PROD) return false

    const key = `${section}-${level}-${message}`
    const now = Date.now()
    const lastLog = this.history.get(key) || 0

    // Если лог был менее 50мс назад - считаем дублем
    if (now - lastLog < this.timeWindow) {
      return true
    }

    this.history.set(key, now)
    this.cleanup(now)

    return false
  }

  /**
   * Очищает старые записи
   */
  private cleanup(now: number): void {
    if (this.history.size > this.maxSize) {
      const oneSecondAgo = now - 1000
      for (const [key, time] of this.history.entries()) {
        if (time < oneSecondAgo) {
          this.history.delete(key)
        }
      }
    }
  }

  /**
   * Очищает всю историю
   */
  clear(): void {
    this.history.clear()
  }
}
