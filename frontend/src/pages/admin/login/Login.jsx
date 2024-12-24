import './Login.css'

import React from 'react'

const Login = () => {
  return (
    <div>
      <h1>Admin login</h1>
      <label htmlFor="email">email</label>
      <input type="email" />
      <label htmlFor="password"></label>
      <input type="password" />
    </div>
  )
}

export default Login
