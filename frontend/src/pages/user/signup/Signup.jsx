import './Signup.css'

import React from 'react'

const Signup = () => {
  return (
    <div>
      <h1>Signup</h1>
      <form action="">
        <label htmlFor="userName"></label>
        <input type="text" />
        <label htmlFor="email">email:</label>
        <input type="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" />
      </form>
    </div>
  )
}

export default Signup
