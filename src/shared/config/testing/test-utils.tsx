import React, { PropsWithChildren } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeContext } from '@/shared/libs/theme/ui/ThemeContext'
import { ThemeMode } from '@shared/libs/theme'

interface ThemeProviderMockProps extends PropsWithChildren {
  isDarkMode?: boolean
  toggleTheme?: () => void
  mode?: ThemeMode
  setTheme?: () => void
}

function ThemeProviderMock({
  children,
  isDarkMode = false,
  toggleTheme = () => {},
  mode = 'dark',
  setTheme = () => {},
}: ThemeProviderMockProps) {
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, mode, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: { isDarkMode?: boolean; toggleTheme?: () => void }
}

function customRender(ui: React.ReactElement, { theme, ...options }: CustomRenderOptions = {}) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <ThemeProviderMock {...theme}>{children}</ThemeProviderMock>
  )
  return render(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { customRender as render }
