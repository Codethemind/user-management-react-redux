import './Home.css';
import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { handleInputValue } from '../../../redux/slices/userSlice';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    dispatch(handleInputValue(inputValue));
  }, [inputValue, dispatch]);

  useEffect(() => {
    console.log("User", user);
    console.log("Token", token);
    const userFromSession = sessionStorage.getItem('user');
    console.log('session', userFromSession);
  }, [user, token]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <Navbar inputStr={inputValue} />

      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <label
              htmlFor="input-box"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Enter Text:
            </label>
            <input
              id="input-box"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type something here..."
            />
          </div>

          {user ? (
            <div className="text-center space-y-6">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-300 shadow-md">
                <img
                  src={`http://localhost:5001/${user.image}`}
                  alt={`${user.name}'s profile`}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = '/placeholder-profile.png')}
                />
              </div>
              <p className="text-xl font-semibold">
                Welcome back, <span className="text-blue-600">{user.name}</span>!
              </p>
              <p>Email: <span className="font-medium">{user.email}</span></p>
            </div>
          ) : (
            <div className="text-center mt-12">
              <p className="text-2xl font-bold">Welcome to the Dashboard!</p>
              <p className="text-lg text-gray-600 mt-2">
                Please log in to view your information.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
