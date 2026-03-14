/**
 * Тесты хука useTheme (app/theme/useTheme).
 * Проверяют: выброс ошибки при использовании вне ThemeProvider,
 * корректное возвращение контекста (isDarkMode, toggleTheme) внутри провайдера.
 * Используется renderHook из Testing Library.
 */
import React from 'react'
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTheme } from './useTheme.ts'
import { ThemeContext } from '../ui/ThemeContext.ts'

describe('useTheme', () => {
  it('throws when used outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within a ThemeProvider'
    )
  })

  it('returns context when used inside ThemeProvider', () => {
    const toggleTheme = () => {}
    const setTheme = () => {}
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={{ isDarkMode: true, toggleTheme, mode: 'dark', setTheme }}>
        {children}
      </ThemeContext.Provider>
    )
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current).toEqual({ isDarkMode: true, toggleTheme, mode: 'dark', setTheme })
    expect(result.current.isDarkMode).toBe(true)
    expect(typeof result.current.toggleTheme).toBe('function')
  })
})
