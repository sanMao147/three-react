
import 'module'
import React, { lazy } from 'react'
import { createHashRouter, Navigate } from 'react-router-dom'

const Home = lazy(() => import('../pages/home'))
const Ocean = lazy(() => import('../pages/ocean'))

export default createHashRouter([
  {
    path: '/',
    element: <Navigate replace to="/home" />
  },
  {
    path: '/home',
    element: <Home />,
    children:[
      {
        path: '/home/ocean',
        element: <Ocean />
      }
    ]
  },
  
])
