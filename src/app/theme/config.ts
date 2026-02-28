import { theme, ThemeConfig } from 'antd'

// Кастомные цвета для темной темы
export const darkTheme: ThemeConfig = {
  // Основной алгоритм темной темы
  algorithm: theme.darkAlgorithm,
  token: {
    // Основные цвета
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    colorTextBase: '#e6f7ff',
    colorBgBase: '#1b2734',
  },
  components: {
    // Настройки конкретных компонентов
  },
}

// Светлая тема
export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    colorTextBase: '#333333',
    colorBgBase: '#eeeeee',
  },
  components: {},
}
