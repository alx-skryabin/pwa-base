/**
 * Тесты конфигурации тем Ant Design (app/theme/config).
 * Проверяют структуру darkTheme и lightTheme — наличие algorithm, token, components.
 */
import { describe, it, expect } from 'vitest'
import { darkTheme, lightTheme } from '@shared/libs/theme/config/antdTheme.ts'

describe('theme config', () => {
  describe('darkTheme', () => {
    it('has algorithm', () => {
      expect(darkTheme).toHaveProperty('algorithm')
    })
    it('has token with color tokens', () => {
      expect(darkTheme.token).toBeDefined()
      expect(darkTheme.token).toHaveProperty('colorPrimary')
      expect(darkTheme.token).toHaveProperty('colorBgBase')
    })
    it('has components', () => {
      expect(darkTheme.components).toBeDefined()
    })
  })

  describe('lightTheme', () => {
    it('has token', () => {
      expect(lightTheme.token).toBeDefined()
      expect(lightTheme.token).toHaveProperty('colorPrimary')
      expect(lightTheme.token).toHaveProperty('colorTextBase')
    })
    it('has components', () => {
      expect(lightTheme.components).toBeDefined()
    })
  })
})
