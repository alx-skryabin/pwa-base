import React, { useState, useEffect, PropsWithChildren } from 'react'
import { ConfigProvider, App as AntdApp } from 'antd'
import { ThemeContext } from '@app/theme/ThemeContext.ts'
import { darkTheme, lightTheme } from '@app/theme/config.ts'
import { storeLogger } from '@shared/libs/logger'
import './index.css'

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const
const LOCALSTORAGE_NAME = 'theme'

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(LOCALSTORAGE_NAME)
    if (saved !== null) {
      return saved === THEME.DARK
    }
    return true
  })

  useEffect(() => {
    const theme = isDarkMode ? THEME.DARK : THEME.LIGHT
    storeLogger.info(`Set theme: ${theme}`)
    localStorage.setItem(LOCALSTORAGE_NAME, theme)
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  const currentTheme = isDarkMode ? darkTheme : lightTheme
  const themeClass = isDarkMode ? 'theme__dark' : 'theme__light'

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
