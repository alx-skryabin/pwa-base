import React from 'react'
import { AppInitProvider } from '@processes/appInit'

export const withAppInit = (component: () => React.ReactNode) => () => (
  <AppInitProvider>{component()}</AppInitProvider>
)
