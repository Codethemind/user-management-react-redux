import React from 'react';
import Home from './pages/user/home/Home';
import Login from './pages/user/login/Login';
import Signup from "./pages/user/signup/Signup";
import AdminLogin from './pages/admin/login/Login';
import AdminDashboard from './pages/admin/dashboard/Dashboard';
import { Routes,Route, BrowserRouter, Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProtectedAuthRoutes from './components/ProtectedRoute/ProtectedAuthRoutes';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <ToastContainer theme='light'/>
      <Routes>
        <Route path='/' element={<ProtectedRoute element={<Home/>} requiredRole={'normal'}/>}/>
        <Route path='/login' element={<ProtectedAuthRoutes element={<Login/>}/>}/>
        <Route path='/signup' element={<ProtectedAuthRoutes element={<Signup/>}/>}/>
        <Route path='/admin/login' element={<ProtectedAuthRoutes element={<AdminLogin/>}/>}/>
        <Route path='/admin/dashboard' element={<ProtectedRoute element={<AdminDashboard/>} requiredRole={'admin'}/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
