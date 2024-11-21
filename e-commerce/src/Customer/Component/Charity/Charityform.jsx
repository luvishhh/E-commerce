import React, { useState } from 'react';

const CharityForm = () => {
  const [donorType, setDonorType] = useState('parent');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    donationType: '',
    studentDetails: '',
    institutionName: '',
    institutionType: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.fullName|| !formData.email || !formData.phone || !formData.address || !formData.donationType) {
      return 'Please fill in all required fields.';
    }

    if (donorType === 'parent' && !formData.studentDetails) {
      return 'Please provide student details.';
    }

    if (donorType === 'institution' && (!formData.institutionName || !formData.institutionType)) {
      return 'Please provide institution name and type.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      setSuccessMessage('');
      return;
    }

    setError('');
    try {
      // Backend API endpoint
      const apiUrl = 'http://localhost:3002/api/charity/submit'; 
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, donorType }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form. Please try again.');
      }

      setSuccessMessage('Thank you for your contribution! Your form has been submitted.');
      setError('');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        donationType: '',
        studentDetails: '',
        institutionName: '',
        institutionType: '',
      });
    } catch (err) {
      setError(err.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 lg:px-20 bg-[url('https://images.unsplash.com/photo-1524069290683-0457abfe42c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center relative">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Charity Contribution Form
        </h1>

        {/* Error and Success Messages */}
        {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}
        {successMessage && <div className="mb-4 text-green-600 font-medium">{successMessage}</div>}

        {/* Donor Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setDonorType('parent')}
              className={`py-2 px-4 rounded ${donorType === 'parent' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Parent
            </button>
            <button
              type="button"
              onClick={() => setDonorType('institution')}
              className={`py-2 px-4 rounded ${donorType === 'institution' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Institution
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Common Fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="fullName"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
              required
            />
          </div>

          {/* Conditional Fields for Parent or Institution */}
          {donorType === 'parent' && (
            <div>
              <label htmlFor="studentDetails" className="block text-sm font-medium text-gray-700">
                Student's Details
              </label>
              <input
                id="studentDetails"
                name="studentDetails"
                type="text"
                value={formData.studentDetails}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter details about your child (name, class, etc.)"
                required
              />
            </div>
          )}

          {donorType === 'institution' && (
            <>
              <div>
                <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700">
                  Institution Name
                </label>
                <input
                  id="institutionName"
                  name="institutionName"
                  type="text"
                  value={formData.institutionName}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the name of your institution"
                  required
                />
              </div>
              <div>
                <label htmlFor="institutionType" className="block text-sm font-medium text-gray-700">
                  Institution Type
                </label>
                <input
                  id="institutionType"
                  name="institutionType"
                  type="text"
                  value={formData.institutionType}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., School, College, NGO"
                  required
                />
              </div>
            </>
          )}

          {/* Donation Type */}
          <div>
            <label htmlFor="donationType" className="block text-sm font-medium text-gray-700">
              Donation Type
            </label>
            <select
              id="donationType"
              name="donationType"
              value={formData.donationType}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select type of donation
              </option>
              <option value="books">Books & Supplies</option>
              <option value="uniforms">Uniforms</option>
              <option value="scholarship">Scholarship Support</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-200"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CharityForm;
