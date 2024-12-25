import React, { useState } from 'react'
import './Footer.css'

const Footer = () => {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <footer className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} py-6`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          &copy; 2024 MyWebsite
        </div>
        <div className="flex space-x-6">
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
    </footer>
  )
}

export default Footer
