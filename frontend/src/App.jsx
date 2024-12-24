import React from 'react'
import Home from './pages/user/home/Home'
import Login from './pages/user/login/Login'
import Signup from "./pages/user/signup/Signup"
import AdminLogin from './pages/admin/login/Login'
import AdminDashboard from './pages/admin/dashboard/Dashboard'
import { Routes,Route, BrowserRouter, Router } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
    <BrowserRouter>
      <ToastContainer theme='light'/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/admin/login' element={<AdminLogin/>}></Route>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
