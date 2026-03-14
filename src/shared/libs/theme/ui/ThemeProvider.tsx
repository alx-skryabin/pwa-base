import React, { useState, useEffect, useCallback, PropsWithChildren } from 'react'
import { ConfigProvider, App as AntdApp } from 'antd'
import { ThemeContext } from './ThemeContext'
import { darkTheme, lightTheme } from '../config/antdTheme'
import { themeModel } from '../model/themeModel'
import { themeHelpers } from '../libs/helpers'
import { themeStorage } from '../libs/storage'
import { storeLogger } from '@shared/libs/logger'
import { ThemeMode } from '@shared/libs/theme'
import '../style/theme.css'

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const initialState = themeModel.getInitialState(themeStorage)
    return initialState.mode
  })

  const isDarkMode = themeModel.isDarkMode(mode)

  useEffect(() => {
    themeModel.persist(themeStorage, mode)
    storeLogger.info(`Theme set to: ${mode}`)
  }, [mode])

  const toggleTheme = useCallback(() => {
    setMode(prev => themeModel.toggle(prev))
  }, [])

  const setTheme = useCallback((newMode: ThemeMode) => {
    setMode(newMode)
  }, [])

  const currentTheme = isDarkMode ? darkTheme : lightTheme
  const themeClass = themeHelpers.getThemeClass(mode)

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        mode,
        toggleTheme,
        setTheme,
      }}
    >
      <ConfigProvider theme={currentTheme}>
        <AntdApp className={`theme ${themeClass}`}>{children}</AntdApp>
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
