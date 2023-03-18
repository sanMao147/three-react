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
          backgroundColor: '#eee',
          color: '#000'
        }}
        headerStyle={{
          backgroundColor: '#ccc'
        }}
        title="页面菜单"
        placement="left"
        onClose={() => {
          setOpen(false)
        }}
        open={open}
      >
        {visible ? <p onClick={() => handleRoute('home')}>返回首页</p> : ''}
        <p onClick={() => handleRoute('sea')}>海岛风情</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}

export default Index
