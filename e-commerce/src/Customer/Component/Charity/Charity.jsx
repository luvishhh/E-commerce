import React from 'react'
import { useNavigate } from 'react-router-dom'

const Charity = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/764681/pexels-photo-764681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Charity for Education"
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-2xl lg:text-3xl font-semibold">Support a Child's Education</h1>
              <p className="text-sm lg:text-base mt-2">Your contribution can help students in need reach their dreams.</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">Why Your Support Matters</h2>
            <p className="text-gray-600 leading-relaxed">
              Many students face financial hardships, preventing them from accessing quality education and essential resources. With the help of charitable donations, we aim to bridge this gap and provide these students with the support they need. Together, we can make education accessible for every child.
            </p>

            {/* Donation Highlights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-100 p-5 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Books & Supplies</h3>
                <p className="text-sm text-gray-600">Provide essential books and learning supplies to students in need.</p>
              </div>
              <div className="bg-gray-100 p-5 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Uniforms</h3>
                <p className="text-sm text-gray-600">Help students with uniforms to ensure they have proper attire for school.</p>
              </div>
              <div className="bg-gray-100 p-5 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Scholarships</h3>
                <p className="text-sm text-gray-600">Offer scholarship support for promising students who lack financial means.</p>
              </div>
            </div>

            {/* Call-to-Action Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => navigate('/charity/charityform')}
                className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 transition duration-200"
              >
                Get Involved 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Charity
