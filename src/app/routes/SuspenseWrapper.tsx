import React, { Suspense } from 'react'
import { routerLogger } from '@shared/libs/logger'

export const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
  routerLogger.info('Load page')
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
}
