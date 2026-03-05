import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { FullScreenLoader } from '@shared/ui/FullScreenLoader'
import { useSession } from '@entities/session'
import { ROUTES } from '@app/routes/path'

/**
 * Защищает маршруты: неавторизованных перенаправляет на /login.
 * Сохраняет returnUrl в state для редиректа после входа.
 */
export const RequireAuth: React.FC = () => {
  const { isAuthenticated, isInitialized } = useSession()
  const location = useLocation()

  if (!isInitialized) {
    return <FullScreenLoader size="large" />
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <Outlet />
}
