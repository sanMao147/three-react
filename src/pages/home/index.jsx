import Nav from '@/components/Nav'
import React, { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

const Index = () => {
  return (
    <>
      <Nav />

      <Outlet></Outlet>
    </>
  )
}

export default Index
