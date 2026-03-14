import React from 'react'
import { ErrorBoundary } from '@shared/libs/errorBoundary'

export const withErrorBoundary = (component: () => React.ReactNode) => () => (
  <ErrorBoundary>{component()}</ErrorBoundary>
)
