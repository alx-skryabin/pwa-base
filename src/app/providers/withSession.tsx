import React from 'react'
import { SessionProvider } from '@entities/session'

export const withSession = (component: () => React.ReactNode) => () => (
  <SessionProvider>{component()}</SessionProvider>
)
