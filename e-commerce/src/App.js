import React from 'react';
import './App.css';
import Footer from './Customer/Footer/Footer'; // Ensure this path is accurate
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerRoutes from './Customer/Component/Routes/CustomerRoutes';
import AdminRoutes from './Customer/Component/Routes/AdminRoutes';

// import AdminPanel from './Admin/Adminpanel';
// import AdminOrderTracker from './Admin/Adminorder';

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <Routes>
          <Route path='/*' element={<CustomerRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
        
      
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
