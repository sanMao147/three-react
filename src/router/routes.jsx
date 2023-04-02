import React, { lazy } from 'react'

const Ocean = lazy(() => import('../views/ocean'))
const Earth = lazy(() => import('../views/earth'))
const World = lazy(() => import('../views/world'))
const City = lazy(() => import('../views/city'))
const House = lazy(() => import('../views/viewHouse'))
const Effect = lazy(() => import('../views/effect'))
export const routes = [
  {
    path: `/home/ocean`,
    element: <Ocean />,
    meta: {
      key: 'ocean',
      title: '海岛风情'
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
    path: `/home/city`,
    element: <City />,
    meta: {
      key: 'city',
      title: '智慧城市'
    }
  },
  {
    path: `/home/house`,
    element: <House />,
    meta: {
      key: 'house',
      title: '全景看房'
    }
  }
  // {
  //   path: `/home/effect`,
  //   element: <Effect />,
  //   meta: {
  //     key: 'effect',
  //     title: '特效'
  //   }
  // }
]
