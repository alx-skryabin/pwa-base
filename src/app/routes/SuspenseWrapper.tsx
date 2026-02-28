import React, { Suspense } from 'react'

export const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
}
