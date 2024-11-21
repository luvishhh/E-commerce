import React, { useState } from 'react';
import axios from 'axios'; // Add axios for sending requests
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const RegisterPage = () => {
  const [userType, setUserType] = useState('Student'); // default to 'student'
  
  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    gradeOrClass: '',
    childStudentId: '',
    institutionName: '',
    contactPerson: '',
    address: '',
  });

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!formData.fullName || !formData.phoneNumber || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all required fields!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error('Please enter a valid email address!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  
    // Password validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  
    // Include the userType (role) in the form data
    const submitData = { ...formData, role: userType }; // Add the role here
  
    try {
      // Send the form data to the backend
      const response = await axios.post('http://localhost:3002/api/auth/register/submit', submitData);
      toast.success('Registration successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error registering user:', error.response?.data || error);
      toast.error('Error registering user! Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-lg sm:max-w-3xl bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 text-center mb-4">
          Register as {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </h2>

        {/* User Type Selector */}
        <div className="flex justify-center mt-4 space-x-2 sm:space-x-4">
          {['Student', 'parent', 'Institution'].map((type) => (
            <button
              key={type}
              className={`py-2 px-3 sm:px-4 rounded-lg font-semibold ${
                userType === type ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleUserTypeChange(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Full Name and Phone Number (common for all) */}
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          {userType === 'Student' && (
            <>
              <div>
                <label className="block text-sm text-gray-600">Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Enter your student ID"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-600">Grade / Class</label>
                <input
                  type="text"
                  name="gradeOrClass"
                  value={formData.gradeOrClass}
                  onChange={handleChange}
                  placeholder="Enter your grade or class"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </>
          )}

          {userType === 'parent' && (
            <>
              <div>
                <label className="block text-sm text-gray-600">Child’s Student ID</label>
                <input
                  type="text"
                  name="childStudentId"
                  value={formData.childStudentId}
                  onChange={handleChange}
                  placeholder="Enter your child's student ID"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </>
          )}

          {userType === 'Institution' && (
            <>
              <div>
                <label className="block text-sm text-gray-600">Institution Name</label>
                <input
                  type="text"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  placeholder="Enter institution name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  placeholder="Enter contact person's name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm text-gray-600">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="sm:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Register
            </button>
          </div>
      <p className="text-center mt-4 text-sm text-gray-600 sm:col-span-2">
        Already have an account?{' '}
        <a href="/login" className="text-indigo-600 font-medium hover:underline">
          Login
        </a>
      </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegisterPage;
