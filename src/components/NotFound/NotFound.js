import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className='NotFound'>
      <h1 style={{ marginTop: '50px' }}>Page Not Found</h1>
      <Link to='/'><h2>Return Home</h2></Link>
    </div>
  )
}

export default NotFound
