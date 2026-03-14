/**
 * Форматирует время для логов
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ru-RU', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
