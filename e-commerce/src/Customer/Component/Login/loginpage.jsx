import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [userType, setUserType] = useState('student'); // default to 'student'
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear form fields whenever user type changes
    setEmail('');
    setPassword('');
    setError('');
  }, [userType]);

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleToggleLoginRegister = () => {
    setIsLogin(!isLogin);
    navigate(isLogin ? '/register' : '/login');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    navigate("/product")
    // Trim whitespace before validation
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
  
    if (!trimmedEmail || !trimmedPassword) {
      setError('Email and password are required.');
      return;
    }
  
    try {
      let apiUrl = 'http://localhost:3002/api/auth/login/submit'; // Adjust according to your backend API URL
  
      const response = await axios.post(apiUrl, {
        email: trimmedEmail,
        password: trimmedPassword,
        userType,
      });
  
      if (response.data.success) {
        // Redirect to the home page after successful login
        navigate('/home'); // Home page after login
      } else {
        setError(response.data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Error: Unable to login. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8 lg:p-12">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 text-center mb-4">
          {isLogin ? 'Login' : 'Register'} as {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </h2>

        {/* User Type Selector */}
        <div className="flex justify-center mt-4 space-x-2 sm:space-x-4">
          {['student', 'parent', 'institution', 'admin'].map((type) => (
            <button
              key={type}
              className={`py-2 px-4 rounded-lg font-semibold ${userType === type ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleUserTypeChange(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
          {/* Common Email and Password Fields */}
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </form>

        {/* Toggle Login/Register */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={handleToggleLoginRegister}
              className="text-indigo-600 font-medium hover:underline"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
