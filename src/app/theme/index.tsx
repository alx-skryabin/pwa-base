import React, { useState, useEffect, ReactNode } from 'react'
import { ConfigProvider, App as AntdApp } from 'antd'
import { ThemeContext } from '@app/theme/ThemeContext.ts'
import { darkTheme, lightTheme } from '@app/theme/config.ts'
import './index.css'

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const
const THEME_DEFAULT = THEME.DARK
const LOCALSTORAGE_NAME = 'theme'

export const ThemeProvider: React.FC = ({ children }: { children: ReactNode }) => {
  const [themeClass, setThemeClass] = useState(`theme__${THEME_DEFAULT}`)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(LOCALSTORAGE_NAME)
    if (saved !== null) {
      return saved === THEME.DARK
    }
    return true
  })

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_NAME, isDarkMode ? THEME.DARK : THEME.LIGHT)
    setThemeClass(isDarkMode ? 'theme__dark' : 'theme__light')
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  const currentTheme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
      }}
    >
      <ConfigProvider
        theme={currentTheme}
        // Локализация (можно добавить русскую)
        // locale={ruRU}
      >
        <AntdApp className={`theme ${themeClass}`}>{children}</AntdApp>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
