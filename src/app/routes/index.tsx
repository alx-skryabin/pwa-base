import { createBrowserRouter } from 'react-router'
import { SuspenseWrapper } from '@app/routes/libs/SuspenseWrapper.tsx'
import { RouteErrorFallback } from '@app/routes/libs/RouteErrorFallback.tsx'
import { RequireAuth } from '@app/routes/libs/RequireAuth.tsx'
import { AuthLayout } from '@widgets/layouts/auth'
import { UserLayout } from '@widgets/layouts/user'
import { NotFound } from '@widgets/layouts/not-found'
import HomePage from '@pages/home'
import DevPage from '@pages/dev'
import MapPage from '@pages/map'
import LoginPage from '@pages/login'
import { ROUTES } from '@app/routes/config/path.ts'

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <AuthLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        index: true,
        element: <SuspenseWrapper children={<LoginPage />} />,
      },
    ],
  },
  {
    path: ROUTES.HOME,
    element: <RequireAuth />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            index: true,
            element: <SuspenseWrapper children={<HomePage />} />,
          },
          {
            path: ROUTES.MAP,
            element: <SuspenseWrapper children={<MapPage />} />,
          },
          {
            path: ROUTES.DEV,
            element: <SuspenseWrapper children={<DevPage />} />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <SuspenseWrapper children={<NotFound />} />,
    errorElement: <RouteErrorFallback />,
  },
])
