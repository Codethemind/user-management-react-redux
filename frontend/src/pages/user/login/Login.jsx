import './Login.css'

import React from 'react'

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form action="">
        <label htmlFor="email">email:</label>
        <input type="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" />
      </form>
    </div>
  )
}

export default Login
