import { createBrowserRouter } from 'react-router'
import { SuspenseWrapper } from '@app/routes/SuspenseWrapper.tsx'
import { Layout } from '@widgets/layout'
import Home from '@pages/home'
import Dev from '@pages/dev'
import Map from '@pages/map'
import NotFound from '@pages/not-found'
import { ROUTES } from '@app/routes/path.ts'

/*Настроить кеширование чанков в оффлайн режиме*/
// const Home = lazy(() => import('@pages/home'))
// const Map = lazy(() => import('@/pages/map'))
// const Dev = lazy(() => import('@/pages/dev'))
// const NotFound = lazy(() => import('@/pages/not-found'))

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
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
      {
        path: '*',
        element: <SuspenseWrapper children={<NotFound />} />,
      },
    ],
  },
])
