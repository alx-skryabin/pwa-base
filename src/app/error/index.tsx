import React, { type ErrorInfo, type ReactNode } from 'react'
import { reportError } from '@shared/libs/errorReporting'
import { ErrorLayout } from '@widgets/layouts/error'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

/**
 * Error Boundary: перехватывает ошибки рендера и в lifecycle-методах дочернего дерева.
 * При перехвате вызывает reportError (лог в консоль + отправка на сервер) и показывает fallback.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    reportError('react:app', error, {
      componentStack: errorInfo.componentStack ?? undefined,
    })
  }

  render(): ReactNode {
    const { error } = this.state
    const { children } = this.props

    if (error) {
      return <ErrorLayout message={error.message} isHomeBtn={false} />
    }

    return children
  }
}
