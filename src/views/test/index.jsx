import React, { useState } from 'react'

const Test = () => {
  let [add, setAdd] = useState('')
  const handleAdd = () => {
    setAdd('123')
  }
  return (
    <>
      <div
        style={{ color: '#FFF', backgroundColor: 'red', width: '100px' }}
        onClick={handleAdd}
      >
        456 {add}
      </div>
    </>
  )
}
export default Test
