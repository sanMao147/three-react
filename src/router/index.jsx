import { routes } from './routes'
import React, { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const Home = lazy(() => import('../views/home'))

export default createBrowserRouter(
  [
    {
      path: `/`,
      element: (
        <Navigate
          replace
          to={`/home/effect`}
        />
      )
    },
    {
      path: `/home`,
      element: <Home />,
      children: [...routes]
    }
  ],
  {
    basename: import.meta.env.BASE_URL
  }
)
