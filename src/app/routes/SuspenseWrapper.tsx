import React, { Suspense } from 'react'
import { routerLogger } from '@shared/libs/logger'
import { useLocation } from 'react-router'

export const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()
  routerLogger.info('Load page:', location.pathname)
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
}
