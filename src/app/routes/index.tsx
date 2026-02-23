import React, { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { Layout } from '@widgets/layout'
import Home from '@pages/home'
import Dev from '@pages/dev'
import Map from '@pages/map'
import NotFound from '@pages/not-found'

/*Настроить кеширование чанков в оффлайн режиме*/
// const Home = lazy(() => import('@pages/home'))
// const Map = lazy(() => import('@/pages/map'))
// const Dev = lazy(() => import('@/pages/dev'))
// const NotFound = lazy(() => import('@/pages/not-found'))

export const ROUTES = {
  HOME: '/',
  MAP: '/map',
  DEV: '/dev',
} as const

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Wrapper children={<Home />} />,
      },
      {
        path: ROUTES.MAP,
        element: <Wrapper children={<Map />} />,
      },
      {
        path: ROUTES.DEV,
        element: <Wrapper children={<Dev />} />,
      },
      {
        path: '*',
        element: <Wrapper children={<NotFound />} />,
      },
    ],
  },
])
