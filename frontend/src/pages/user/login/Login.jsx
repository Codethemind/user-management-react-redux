import React, { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', formData);
      console.log(response)
      const user = {
        image:response.data.image,
        name: response.data.name,
        email: response.data.email,
      };
      const token = response.data.token;

      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);

      dispatch(loginSuccess({ user, token }));
      toast.success('Login successfull')
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Error during login:', err);
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 w-screen h-screen flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow border sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Login to your account
          </h1>
          {error && <div className="text-red-500">{error}</div>}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter Your Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400" onClick={()=>{navigate('/signup')}}>
                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
