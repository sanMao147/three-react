import './index.scss'
import { Button, Drawer } from 'antd'
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Index = () => {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname !== '/home') {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [pathname])
  const handleRoute = e => {
    switch (e) {
      case 'sea':
        navigate('/home/ocean')
        break
      case 'nature':
        navigate('/home/nature')
        break
      case 'earth':
        navigate('/home/earth')
        break

      case 'world':
        navigate('/home/world')
        break
      default:
        navigate('/home')
        break
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
        <p
          className="drawItem"
          onClick={() => handleRoute('sea')}
        >
          海岛风情
        </p>
        <p
          className="drawItem"
          onClick={() => handleRoute('nature')}
        >
          自然风光
        </p>
        <p
          className="drawItem"
          onClick={() => handleRoute('earth')}
        >
          数字地球
        </p>
        <p
          className="drawItem"
          onClick={() => handleRoute('world')}
        >
          世界地图
        </p>
      </Drawer>
    </>
  )
}

export default Index
