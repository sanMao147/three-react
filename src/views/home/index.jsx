import Dashboard from '@/components/Dashboard'
import Nav from '@/components/Nav'
import router from '@/router'
import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const Index = () => {
  const { pathname } = useLocation()

  return (
    <>
      <Nav />
      {pathname === router.routes[1].path ? <Dashboard /> : ''}

      <Outlet></Outlet>
    </>
  )
}

export default Index
