import compose from 'compose-function'
import { withErrorBoundary } from './withErrorBoundary'
import { withTheme } from './withTheme'
import { withAppInit } from './withAppInit'
import { withPWA } from './withPWA'
import { withSession } from './withSession'

// Порядок важен! Снизу вверх:
// ErrorBoundary (самый внешний) -> Session (самый внутренний)
export const withProviders = compose(
  withErrorBoundary,
  withTheme,
  withAppInit,
  withPWA,
  withSession
)
