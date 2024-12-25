import './Navbar.css'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/userSlice'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const dispatch = useDispatch()

  const toggleMenu = () => setIsOpen(!isOpen)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleLogout = () => {
    dispatch(logout());
    location.reload();
  }

  return (
    <nav className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} p-4`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">
          MyWebsite
        </div>
        <button
          className="lg:hidden text-black dark:text-white"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className={`lg:flex space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
          <a href="#home" className="hover:text-gray-500 dark:hover:text-gray-300">
            Home
          </a>
          <a href="#about" className="hover:text-gray-500 dark:hover:text-gray-300">
            About
          </a>
          <a href="#services" className="hover:text-gray-500 dark:hover:text-gray-300">
            Services
          </a>
          <a href="#contact" className="hover:text-gray-500 dark:hover:text-gray-300">
            Contact
          </a>
        </div>
        <div className="flex items-center space-x-4">
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="hidden sm:block bg-red-600 text-white hover:bg-red-700 p-2 rounded-lg transition duration-300"
          >
            Logout
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 rounded-full border"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v3m0 12v3m9-9h-3m-12 0H3m7.5-7.5l-2.121 2.121M16.5 16.5l-2.121-2.121M7.5 16.5l2.121-2.121M16.5 7.5l2.121 2.121" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v3m0 12v3m9-9h-3m-12 0H3m7.5-7.5l-2.121 2.121M16.5 16.5l-2.121-2.121M7.5 16.5l2.121-2.121M16.5 7.5l2.121 2.121" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
