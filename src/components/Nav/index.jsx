import './index.scss'
import { Button, Drawer } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const [open, setOpen] = useState(false)
  const router = useNavigate()

  const handleRoute = () => {
    router('/home/ocean')
  }
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const drawbody = {
    backgroundColor: '#eee',
    color: '#000'
  }
  const drawhead = {
    backgroundColor: '#ccc'
  }
  return (
    <>
      <Button
        className="nav"
        type="primary"
        onClick={showDrawer}
      >
        导航
      </Button>
      <Drawer
        bodyStyle={drawbody}
        headerStyle={drawhead}
        title="页面菜单"
        placement="left"
        onClose={onClose}
        open={open}
      >
        <p onClick={handleRoute}>海岛风情</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}

export default Index
