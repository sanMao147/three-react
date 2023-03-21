import React, { lazy } from 'react'
import { createHashRouter, Navigate } from 'react-router-dom'

const Home = lazy(() => import('../views/home'))
const Ocean = lazy(() => import('../views/ocean'))
const Nature = lazy(() => import('../views/nature'))
const Earth = lazy(() => import('../views/earth'))
const World = lazy(() => import('../views/world'))

export default createHashRouter([
  {
    path: '/',
    element: (
      <Navigate
        replace
        to="/home"
      />
    )
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: '/home/ocean',
        element: <Ocean />
      },
      {
        path: '/home/nature',
        element: <Nature />
      },
      {
        path: '/home/earth',
        element: <Earth />
      },
      {
        path: '/home/world',
        element: <World />
      }
    ]
  }
])
