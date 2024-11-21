import React, { useState } from 'react';

const ContactPage = () => {
  const [userType, setUserType] = useState('Parent'); // Default to Parent
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institutionName: '',
    schoolOrCollegeName: '',
    phoneNumber: '',
    rollNumber: '',
    message: '',
    role: 'Parent', // Default role
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle role change (User Type)
  const handleUserTypeChange = (event) => {
    const selectedRole = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);  // Capitalize first letter
    setUserType(selectedRole);  // Set the userType value
    setFormData({ ...formData, role: selectedRole });  // Update the role in formData
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Phone number validation (10-digit phone number)
    const phoneNumberRegex = /^[0-9]{10}$/;
    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    // Ensure all required fields are filled out
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Sending form data as JSON
      });

      const result = await response.json();
      console.log(result);  // Log the response from the backend

      if (response.ok) {
        alert('Contact form submitted successfully!');
        setFormData({ 
          fullName: '', 
          email: '', 
          message: '', 
          institutionName: '', 
          schoolOrCollegeName: '', 
          rollNumber: '', 
          role: 'Parent' 
        }); // Reset form
      } else {
        alert('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-blue-600 text-white text-center py-6">
        <h1 className="text-3xl font-semibold">Contact Us</h1>
        <p className="mt-2">Please fill out the form based on your role.</p>
      </header>

      {/* Main Content Section */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Form Section */}
          <section className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800">Contact Form</h2>
            
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* User Type Selector */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 text-lg font-semibold mb-2">Select Your Role</label>
                <select
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={userType}
                    onChange={handleUserTypeChange}
                  >
                    <option value="Parent">Parent</option>
                    <option value="Student">Student</option>
                    <option value="Institution">Institution (School/College)</option>
                </select>
              </div>

              {/* Common Fields */}
              <div className="col-span-1">
                <label className="block text-gray-700 text-lg font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 text-lg font-semibold mb-2">Phone no</label>
                <input
                  type="text"
                  placeholder="Enter Your Phone Number"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              
              <div className="col-span-1">
                <label className="block text-gray-700 text-lg font-semibold mb-2">Your Email</label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Conditional Fields Based on User Type */}
              {userType === 'Institution' && (
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-700 text-lg font-semibold mb-2">Institution Name</label>
                  <input
                    type="text"
                    placeholder="Enter Institution Name"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleChange}
                  />
                </div>
              )}

              {userType === 'Student' && (
                <>
                  <div className="col-span-1">
                    <label className="block text-gray-700 text-lg font-semibold mb-2">School/College Name</label>
                    <input
                      type="text"
                      placeholder="Enter School/College Name"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      name="schoolOrCollegeName"
                      value={formData.schoolOrCollegeName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-gray-700 text-lg font-semibold mb-2">Student Roll Number</label>
                    <input
                      type="text"
                      placeholder="Enter Roll Number"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              {/* Message Field */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-gray-700 text-lg font-semibold mb-2">Message</label>
                <textarea
                  placeholder="Enter Your Message"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-lg font-semibold transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </section>

          {/* Optional Video Section */}
          <section className="space-y-14">
            <video src='https://cdnl.iconscout.com/lottie/free/thumb/free-social-media-influencer-animation-download-in-lottie-json-gif-static-svg-file-formats--twitter-logo-instagram-facebook-people-animations-3821579.mp4' type='video/webm' autoPlay loop className='w-full'></video>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
