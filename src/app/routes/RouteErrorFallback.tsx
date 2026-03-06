import { useRef, useEffect } from 'react'
import { useRouteError } from 'react-router'
import { reportError } from '@shared/libs/errorReporting'
import { ErrorLayout } from '@widgets/error-layout'

export function RouteErrorFallback() {
  const error = useRouteError()
  const reported = useRef(false)

  useEffect(() => {
    if (reported.current) return
    reported.current = true
    const err = error instanceof Error ? error : new Error(String(error))
    reportError('react:route', err, {})
  }, [error])

  const message = error instanceof Error ? error.message : String(error)

  return <ErrorLayout message={message} isHomeBtn={true} />
}
