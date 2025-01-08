import './Home.css'
import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer' 
import { useDispatch, useSelector } from 'react-redux'
import { handleInputValue } from '../../../redux/slices/userSlice';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  useEffect(()=> {
    dispatch(handleInputValue(inputValue));
  },[inputValue])


  console.log('Input value',inputValue)

  console.log('user data',user);

  useEffect(() => {
    console.log("User", user);
    console.log("Token", token);
    const userFromSession = sessionStorage.getItem('user');
    console.log('session', userFromSession);
  }, [user, token])

  return (
    <div className="flex flex-col min-h-screen bg-off-white text-black">
        <Navbar inputStr={inputValue} />

        <h1>input box</h1>
        <input type="text" onChange={handleInputChange}/>

        <div className="flex-grow flex items-center justify-center p-6">
          {user ? (
            <div className="text-3xl space-y-4 text-center">
               <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-gray-300">
                  <img 
                    src={`http://localhost:5001/${user.image}`} 
                    alt={`${user.name}'s profile`} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
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
