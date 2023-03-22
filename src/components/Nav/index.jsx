import './index.scss'
import router from '@/router'
import { Button, Drawer } from 'antd'
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Index = () => {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname !== router.routes[1].path) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [pathname])

  const handleRoute = e => {
    if (e === 'home') {
      navigate(router.routes[1].path)
    } else {
      navigate(e)
    }
    setOpen(false)
  }

  return (
    <>
      <Button
        className="nav"
        type="primary"
        onClick={() => {
          setOpen(true)
        }}
      >
        导航
      </Button>
      <Drawer
        bodyStyle={{
          backgroundColor: '#3F51B6',
          color: '#fff'
        }}
        headerStyle={{
          backgroundColor: '#3F51B6',
          color: '#fff'
        }}
        title="页面菜单"
        placement="left"
        onClose={() => {
          setOpen(false)
        }}
        open={open}
      >
        {visible ? (
          <p
            className="drawItem"
            onClick={() => handleRoute('home')}
          >
            返回首页
          </p>
        ) : (
          ''
        )}
        {router.routes[1].children.map(item => {
          return (
            <p
              className="drawItem"
              key={item.meta.key}
              onClick={() => handleRoute(item.path)}
            >
              {item.meta.title}
            </p>
          )
        })}
      </Drawer>
    </>
  )
}

export default Index
