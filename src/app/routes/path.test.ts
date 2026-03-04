/**
 * Тесты констант маршрутов приложения (app/routes/path).
 * Проверяют, что ROUTES содержит все нужные ключи и валидные значения для роутера.
 */
import { describe, it, expect } from 'vitest'
import { ROUTES } from './path'

describe('ROUTES', () => {
  // Проверяем наличие обязательных ключей — без них роутинг сломается
  it('contains required route keys', () => {
    expect(ROUTES).toHaveProperty('HOME')
    expect(ROUTES).toHaveProperty('MAP')
    expect(ROUTES).toHaveProperty('DEV')
    expect(ROUTES).toHaveProperty('LOGIN')
  })

  // Главная страница должна быть по корневому пути
  it('HOME is root path', () => {
    expect(ROUTES.HOME).toBe('/')
  })

  // Все значения — непустые строки, пригодные для path
  it('all routes are non-empty strings', () => {
    Object.values(ROUTES).forEach(path => {
      expect(typeof path).toBe('string')
      expect(path.length).toBeGreaterThan(0)
    })
  })

  // Нет дублирующихся путей — иначе неоднозначность в роутинге
  it('routes are unique', () => {
    const values = Object.values(ROUTES)
    const unique = new Set(values)
    expect(unique.size).toBe(values.length)
  })
})
