/**
 * Тесты хука useTheme (app/theme/useTheme).
 * Проверяют: выброс ошибки при использовании вне ThemeProvider,
 * корректное возвращение контекста (isDarkMode, toggleTheme) внутри провайдера.
 * Используется renderHook из Testing Library.
 */
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import React from 'react'
import { ThemeContext } from '@app/theme/ThemeContext'
import { useTheme } from './useTheme'

describe('useTheme', () => {
  it('throws when used outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within a ThemeProvider'
    )
  })

  it('returns context when used inside ThemeProvider', () => {
    const toggleTheme = () => {}
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={{ isDarkMode: true, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    )
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current).toEqual({ isDarkMode: true, toggleTheme })
    expect(result.current.isDarkMode).toBe(true)
    expect(typeof result.current.toggleTheme).toBe('function')
  })
})
