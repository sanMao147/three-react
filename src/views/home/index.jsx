import Dashboard from '@/components/Dashboard'
import Nav from '@/components/Nav'
import React, { useState } from 'react'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

const Index = () => {
  const { pathname } = useLocation()

  return (
    <>
      <Nav />
      {pathname == '/home' ? <Dashboard /> : ''}

      <Outlet></Outlet>
    </>
  )
}

export default Index
