import React, { Suspense } from 'react'
import { routerLogger } from '@shared/libs/logger'
import { FullScreenLoader } from '@shared/ui/FullScreenLoader'

export const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
  routerLogger.info('Load page:', window.location.pathname)
  return <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>
}
