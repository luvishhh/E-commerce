import { useTheme } from '@emotion/react';
import { Box, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'; // No need for BrowserRouter here
import Dashboard from './Dashboard';
import ProductAdminPage from './ProductAdminpage';
import AddNewProductPage from './CreateProduct';
import CustomersPage from './Customer';
import Ordertracker from '../../Customer/Component/Order/Ordertracker';
import AdminOrderTracker from './OrderTracker';

const menu = [
  { name: "Dashboard", path: "/admin" },
  { name: "Products", path: "/admin/products" },
  { name: "Customers", path: "/admin/customers" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Add Product", path: "/admin/product/CreateProduct" },
];

const AdminMainPanel = () => {
  const theme = useTheme();
    
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();

  // Function to toggle sidebar visibility on smaller screens
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex h-screen mb-[7rem]">
      {/* Sidebar */}
      <div
        className={`${
          sidebarVisible ? 'block' : 'hidden'
        } lg:block w-64 bg-gray-800 text-white p-4 space-y-6`}
      >
        <h2 className="text-xl font-semibold">Admin Panel</h2>
        <ul className="space-y-4">
          {menu.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.path)}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded-md"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-gray-100 p-6">
        {/* Toggle button for small screens */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-4 bg-gray-800 text-white rounded-md"
        >
          Toggle Sidebar
        </button>

        {/* Routes Rendering */}
        <Box>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductAdminPage />} />
            <Route path="/product/CreateProduct" element={<AddNewProductPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/orders" element={<AdminOrderTracker />} />
            
          </Routes>
        </Box>

      </div>
    </div>
  );
};

export default AdminMainPanel;
