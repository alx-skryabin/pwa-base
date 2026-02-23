import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import type { ThemeConfig } from 'antd'

interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Кастомные цвета для темной темы
const darkTheme: ThemeConfig = {
  // Основной алгоритм темной темы
  algorithm: theme.darkAlgorithm,
  token: {
    // Основные цвета
    colorPrimary: '#1890ff',
    colorPrimaryBg: '#111a2c',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    colorTextBase: '#e6f7ff',
    colorBgBase: '#141414',
  },
  components: {
    // Настройки конкретных компонентов
  },
}

// Светлая тема
const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
  },
  components: {},
}

export const ThemeProvider: React.FC = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme')
    if (saved !== null) {
      return saved === 'dark'
    }
    return true
  })

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')

    // Также добавляем класс к body для кастомных CSS стилей
    if (isDarkMode) {
      document.body.classList.add('dark-theme')
      document.body.classList.remove('light-theme')
    } else {
      document.body.classList.add('light-theme')
      document.body.classList.remove('dark-theme')
    }
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
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
