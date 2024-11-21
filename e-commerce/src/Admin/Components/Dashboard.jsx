import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const Navigate = useNavigate()
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
      
      {/* Dashboard Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Card for Total Products */}
        <div className="bg-white p-6 rounded-lg shadow-xl flex items-center justify-between hover:shadow-2xl transition-shadow duration-300">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
            <p className="text-4xl font-bold text-blue-600">120</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-full">
            <svg className="w-12 h-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 12h6m-3-3v6" />
            </svg>
          </div>
        </div>
        
        {/* Card for Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-xl flex items-center justify-between hover:shadow-2xl transition-shadow duration-300">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
            <p className="text-4xl font-bold text-green-600">50</p>
          </div>
          <div className="bg-green-100 p-4 rounded-full">
            <svg className="w-12 h-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6H6m6 0h6" />
            </svg>
          </div>
        </div>
        
        {/* Card for Total Customers */}
        <div className="bg-white p-6 rounded-lg shadow-xl flex items-center justify-between hover:shadow-2xl transition-shadow duration-300">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Customers</h3>
            <p className="text-4xl font-bold text-purple-600">30</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-full">
            <svg className="w-12 h-12 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>

      </div>

      {/* Add More Statistics or Information Below */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card for Latest Orders */}
        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-700">Latest Orders</h3>
          <p className="text-xl text-gray-600">View the most recent orders placed by customers.</p>
          <div className="mt-4 text-center">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"onClick={() => Navigate('/admin/orders')}>View Orders</button>
          </div>
        </div>
        
        {/* Card for Recent Customers */}
        <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-gray-700">Recent Customers</h3>
          <p className="text-xl text-gray-600">See the most recent customers who registered on the platform.</p>
          <div className="mt-4 text-center">
            <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300" onClick={() => Navigate('/admin/customers')}>View Customers</button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
