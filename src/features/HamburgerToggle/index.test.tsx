/**
 * Тесты фичи HamburgerToggle (кнопка открытия/закрытия сайдбара).
 * Проверяют: рендер кнопки с aria-label и aria-expanded, наличие класса active
 * при isSidebarOpen, вызов toggleSidebar при клике (vi.fn, userEvent).
 */
import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import HamburgerToggle from './index'

describe('HamburgerToggle', () => {
  it('renders button with accessible label', () => {
    const toggleSidebar = vi.fn()
    render(<HamburgerToggle isSidebarOpen={false} toggleSidebar={toggleSidebar} />)
    const btn = screen.getByRole('button', { name: /открыть меню/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('sets aria-expanded true when sidebar is open', () => {
    const toggleSidebar = vi.fn()
    render(<HamburgerToggle isSidebarOpen={true} toggleSidebar={toggleSidebar} />)
    const btn = screen.getByRole('button', { name: /открыть меню/i })
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    expect(btn.className).toContain('active')
  })

  it('calls toggleSidebar when clicked', async () => {
    const user = userEvent.setup()
    const toggleSidebar = vi.fn()
    render(<HamburgerToggle isSidebarOpen={false} toggleSidebar={toggleSidebar} />)
    const btn = screen.getByRole('button', { name: /открыть меню/i })
    await user.click(btn)
    expect(toggleSidebar).toHaveBeenCalledTimes(1)
  })
})
