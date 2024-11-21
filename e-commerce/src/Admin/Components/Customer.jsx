import React, { useState, useEffect } from 'react';

// Sample customer data for different user types
const customersData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Parent', city: 'New York', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Institution', city: 'Los Angeles', status: 'Inactive' },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Student', city: 'Chicago', status: 'Active' },
  { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', role: 'Parent', city: 'Miami', status: 'Active' },
  { id: 5, name: 'Charlie Green', email: 'charlie.green@example.com', role: 'Student', city: 'Houston', status: 'Inactive' },
  { id: 6, name: 'University XYZ', email: 'university.xyz@example.com', role: 'Institution', city: 'Dallas', status: 'Active' },
];

const CustomersPage = () => {
  const [customers, setCustomers] = useState(customersData);
  const [filteredCustomers, setFilteredCustomers] = useState(customersData);
  const [roleFilter, setRoleFilter] = useState('All'); // Default is 'All' to show all users

  // Filter customers by role
  const filterCustomersByRole = (role) => {
    if (role === 'All') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter((customer) => customer.role === role);
      setFilteredCustomers(filtered);
    }
  };

  useEffect(() => {
    filterCustomersByRole(roleFilter);
  }, [roleFilter]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Customers List</h2>

      {/* Role Filter */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`${
            roleFilter === 'All' ? 'bg-blue-600' : 'bg-blue-400'
          } text-white px-4 py-2 rounded-md hover:bg-blue-500`}
          onClick={() => setRoleFilter('All')}
        >
          All
        </button>
        <button
          className={`${
            roleFilter === 'Parent' ? 'bg-green-600' : 'bg-green-400'
          } text-white px-4 py-2 rounded-md hover:bg-green-500`}
          onClick={() => setRoleFilter('Parent')}
        >
          Parent
        </button>
        <button
          className={`${
            roleFilter === 'Student' ? 'bg-purple-600' : 'bg-purple-400'
          } text-white px-4 py-2 rounded-md hover:bg-purple-500`}
          onClick={() => setRoleFilter('Student')}
        >
          Student
        </button>
        <button
          className={`${
            roleFilter === 'Institution' ? 'bg-teal-600' : 'bg-teal-400'
          } text-white px-4 py-2 rounded-md hover:bg-teal-500`}
          onClick={() => setRoleFilter('Institution')}
        >
          Institution
        </button>
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">City</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-blue-50 transition duration-200 ease-in-out"
              >
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.role}</td>
                <td className="px-6 py-4">{customer.city}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      customer.status === 'Active'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-400 text-white'
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 focus:outline-none">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Customer Button */}
      <div className="mt-6 flex justify-center">
        <button className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 focus:outline-none transition duration-300 ease-in-out">
          Add New Customer
        </button>
      </div>
    </div>
  );
};

export default CustomersPage;
