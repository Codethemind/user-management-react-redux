import './Home.css'
import React, { useEffect } from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer' 
import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    console.log("User", user);
    console.log("Token", token);
    const userFromSession = sessionStorage.getItem('user');
    console.log('session', userFromSession);
  }, [user, token])

  return (
    <div className="flex flex-col min-h-screen bg-off-white text-black">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-6">
          {user ? (
            <div className="text-3xl space-y-4 text-center">
              <p>Name: <span className="font-semibold text-lg">{user.name}</span></p>
              <p>Email: <span className="font-semibold text-lg">{user.email}</span></p>
            </div>
          ) : (
            <p className="text-xl text-center">Login to see Your info</p>
          )}
        </div>
        <Footer />
    </div>
  )
}

export default Home
