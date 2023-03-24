import React, { lazy } from 'react'
import {
  createBrowserRouter,
  createHashRouter,
  Navigate
} from 'react-router-dom'

const Home = lazy(() => import('../views/home'))
const Ocean = lazy(() => import('../views/ocean'))
const Nature = lazy(() => import('../views/nature'))
const Earth = lazy(() => import('../views/earth'))
const World = lazy(() => import('../views/world'))
const Test = lazy(() => import('../views/test'))

export default createBrowserRouter(
  [
    {
      path: `/`,
      element: (
        <Navigate
          replace
          to={`/home`}
        />
      )
    },
    {
      path: `/home`,
      element: <Home />,
      children: [
        {
          path: `/home/ocean`,
          element: <Ocean />,
          meta: {
            key: 'ocean',
            title: '海岛风情'
          }
        },
        {
          path: `/home/nature`,
          element: <Nature />,
          meta: {
            key: 'nature',
            title: '自然风光'
          }
        },
        {
          path: `/home/earth`,
          element: <Earth />,
          meta: {
            key: 'earth',
            title: '数字地球'
          }
        },
        {
          path: `/home/world`,
          element: <World />,
          meta: {
            key: 'world',
            title: '中国地图'
          }
        },
        {
          path: `/home/test`,
          element: <Test />,
          meta: {
            key: 'test',
            title: '测试'
          }
        }
      ]
    }
  ],
  {
    basename: import.meta.env.BASE_URL
  }
)
