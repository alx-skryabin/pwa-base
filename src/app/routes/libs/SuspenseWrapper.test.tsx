/**
 * Тесты обёртки Suspense для страниц (app/routes/SuspenseWrapper).
 * Проверяют: рендер переданных children внутри Suspense без падения.
 */
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@testing-library/react'
import { SuspenseWrapper } from './SuspenseWrapper.tsx'

describe('SuspenseWrapper', () => {
  it('renders children when provided', () => {
    render(
      <SuspenseWrapper>
        <div data-testid="child">Content</div>
      </SuspenseWrapper>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders without crashing with empty-looking content', () => {
    const { container } = render(
      <SuspenseWrapper>
        <span>Page</span>
      </SuspenseWrapper>
    )
    expect(container).toBeInTheDocument()
    expect(screen.getByText('Page')).toBeInTheDocument()
  })
})
