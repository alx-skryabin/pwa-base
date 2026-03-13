import { createBrowserRouter } from 'react-router'
import { SuspenseWrapper } from '@app/routes/SuspenseWrapper.tsx'
import { RouteErrorFallback } from '@app/routes/RouteErrorFallback.tsx'
import { RequireAuth } from '@app/routes/RequireAuth.tsx'
import { AuthLayout } from '@widgets/layouts/auth'
import { UserLayout } from '@widgets/layouts/user'
import { NotFound } from '@widgets/layouts/not-found'
import Home from '@pages/home'
import Dev from '@pages/dev'
import Map from '@pages/map'
import Login from '@pages/login'
import { ROUTES } from '@app/routes/path.ts'

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: <AuthLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        index: true,
        element: <SuspenseWrapper children={<Login />} />,
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
            element: <SuspenseWrapper children={<Home />} />,
          },
          {
            path: ROUTES.MAP,
            element: <SuspenseWrapper children={<Map />} />,
          },
          {
            path: ROUTES.DEV,
            element: <SuspenseWrapper children={<Dev />} />,
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
