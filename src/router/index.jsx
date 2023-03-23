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
const baseUrl = '/three-react'
export default createBrowserRouter([
  {
    path: `${baseUrl}`,
    element: (
      <Navigate
        replace
        to={`${baseUrl}/home`}
      />
    )
  },
  {
    path: `${baseUrl}/home`,
    element: <Home />,
    children: [
      {
        path: `${baseUrl}/home/ocean`,
        element: <Ocean />,
        meta: {
          key: 'ocean',
          title: '海岛风情'
        }
      },
      {
        path: `${baseUrl}/home/nature`,
        element: <Nature />,
        meta: {
          key: 'nature',
          title: '自然风光'
        }
      },
      {
        path: `${baseUrl}/home/earth`,
        element: <Earth />,
        meta: {
          key: 'earth',
          title: '数字地球'
        }
      },
      {
        path: `${baseUrl}/home/world`,
        element: <World />,
        meta: {
          key: 'world',
          title: '中国地图'
        }
      },
      {
        path: `${baseUrl}/home/test`,
        element: <Test />,
        meta: {
          key: 'test',
          title: '测试'
        }
      }
    ]
  }
])
