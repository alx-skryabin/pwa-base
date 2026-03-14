import React from 'react'
import { useAppInit } from '../libs/useAppInit'
import { useMetaApp } from '@shared/hooks/useMetaApp/useMetaApp.ts'
import { SplashScreen } from './SplashScreen'
import { ErrorScreen } from './ErrorScreen'

interface AppInitProviderProps {
  children: React.ReactNode
}

/**
 * Провайдер инициализации приложения
 * Показывает splash до завершения загрузки, затем рендерит children
 */
export const AppInitProvider: React.FC<AppInitProviderProps> = ({ children }) => {
  const { name } = useMetaApp()
  const { isReady, error } = useAppInit(name)

  if (error) {
    return <ErrorScreen />
  }

  if (!isReady) {
    return <SplashScreen />
  }

  return children
}
