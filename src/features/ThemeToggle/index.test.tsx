/**
 * Тесты фичи переключения темы (features/ThemeToggle).
 * Проверяют: рендер переключателя, отображение состояния isDarkMode,
 * вызов callback toggleTheme при клике (имитация пользователя через userEvent).
 */
import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@shared/config/testing/test-utils'
import ThemeToggle from './index'

describe('ThemeToggle', () => {
  it('renders switch and icons', () => {
    const toggleTheme = vi.fn()
    render(<ThemeToggle />, {
      theme: { isDarkMode: false, toggleTheme },
    })
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toBeInTheDocument()
    expect(switchEl).toHaveAttribute('aria-checked', 'false')
  })

  it('shows checked state when isDarkMode is true', () => {
    const toggleTheme = vi.fn()
    render(<ThemeToggle />, {
      theme: { isDarkMode: true, toggleTheme },
    })
    const switchEl = screen.getByRole('switch')
    expect(switchEl).toHaveAttribute('aria-checked', 'true')
  })

  it('calls toggleTheme when switch is clicked', async () => {
    const user = userEvent.setup()
    const toggleTheme = vi.fn()
    render(<ThemeToggle />, {
      theme: { isDarkMode: false, toggleTheme },
    })
    const switchEl = screen.getByRole('switch')
    await user.click(switchEl)
    expect(toggleTheme).toHaveBeenCalledTimes(1)
  })
})
