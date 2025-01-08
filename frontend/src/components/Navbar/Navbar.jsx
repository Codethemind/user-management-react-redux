import './Navbar.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateName } from '../../redux/slices/userSlice';
import { asynEditUserName } from '../../redux/slices/userSlice';
const Navbar = (prop) => {
  const user = useSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showChangeName, setShowChangeName] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const dispatch = useDispatch();
  const inputStr = useSelector((state) => state.user.inputValue);

  console.log('input str value from nav bar',inputStr);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    dispatch(logout());
    location.reload();
  };

  const handleNameChange = () => {
    if(newName.trim() === '') {
      alert('Name cannot be empty!');
      return;
    }
    console.log('new name', newName)
    dispatch(asynEditUserName({email: user.email, name: newName})).then(() => {
      setShowChangeName(false);
    })
    console.log(showChangeName);
    console.log('Updated name:', newName);
  };

  return (
    <nav className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} p-4`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">
          {`${user.name}'s Website`}
        </div>
        <h1> Name from input field: {prop.inputStr} </h1>
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
          <div
            className="relative"
            onMouseLeave={() => setShowChangeName(false)}
            onClick={() => setShowChangeName(true)}
          >
            <a
              href="#services"
              className="hover:text-gray-500 dark:hover:text-gray-300"
            >
              Change Name
            </a>
            {showChangeName && (
              <div className="text-black absolute top-8 left-0 bg-white border border-gray-300 shadow-lg p-4 rounded-lg">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                <button
                  onClick={handleNameChange}
                  className="mt-2 w-full bg-black text-white p-2 rounded-md hover:bg-gray-800"
                >
                  Update
                </button>
              </div>
            )}
          </div>
          <a href="#contact" className="hover:text-gray-500 dark:hover:text-gray-300">
            Contact
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="hidden sm:block bg-red-600 text-white hover:bg-red-700 p-2 rounded-lg transition duration-300"
          >
            Logout
          </button>
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
  );
};

export default Navbar;
