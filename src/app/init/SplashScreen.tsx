import React from 'react'
import { FullScreenLoader } from '@shared/ui-kit/FullScreenLoader'

/** Экран загрузки приложения (splash) во время инициализации IndexedDB и справочников. */
export const SplashScreen: React.FC = () => (
  <FullScreenLoader size="large" text="Загрузка приложения..." />
)
