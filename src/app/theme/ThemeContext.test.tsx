/**
 * Тесты контекста темы (app/theme/ThemeContext).
 * Проверяют: начальное значение контекста — undefined (до обёртки в ThemeProvider).
 */
import { describe, it, expect } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeContext } from './context.ts'

describe('ThemeContext', () => {
  it('default value is undefined', () => {
    const Consumer = () => {
      const value = React.useContext(ThemeContext)
      return <span data-testid="value">{value === undefined ? 'undefined' : 'defined'}</span>
    }
    render(<Consumer />)
    expect(screen.getByTestId('value')).toHaveTextContent('undefined')
  })
})
