import React, { useState } from 'react';
import axiosInstance from '../../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      if (profileImage) {
        formDataToSend.append('image', profileImage);
      }

      const response = await axiosInstance.post('/auth/signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Signup successful:', response.data);
      toast.success('Registered Successfully! Login Now.');
      navigate('/login');
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error('Error during signup:', err);
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 w-screen h-screen flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow border sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign up for an account
          </h1>
          {error && <div className="text-red-500">{error}</div>}
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter Your Name
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Enter Your Email
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
            <div>
              <label
                htmlFor="profileImage"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Upload Profile Image
              </label>
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign up
            </button>
            <p
              className="text-sm font-light text-gray-500"
              onClick={() => {
                navigate('/login');
              }}
            >
              Have an account?{' '}
              <a href="#" className="font-medium text-primary-600 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
