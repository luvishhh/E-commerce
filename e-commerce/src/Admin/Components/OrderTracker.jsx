import React, { useState } from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';

const orderSteps = [
  "Placed",
  "Order Confirmed",
  "Order Shipped",
  "Order Delivered",
];

// Sample dynamic order data
const ordersData = [
  { id: 1, customerName: 'John Doe', activeStep: 1 },
  { id: 2, customerName: 'Jane Smith', activeStep: 2 },
  { id: 3, customerName: 'Alice Johnson', activeStep: 3 },
  { id: 4, customerName: 'Bob Brown', activeStep: 4 },
];

const AdminOrderTracker = () => {
  const [selectedOrder, setSelectedOrder] = useState(ordersData[0]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Admin Order Tracker</h2>

      {/* Order Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Select an Order to Track</h3>
        <select
          className="bg-white border border-gray-300 text-gray-700 rounded-md p-2 w-full"
          onChange={(e) => {
            const selectedOrderId = e.target.value;
            const order = ordersData.find(order => order.id === parseInt(selectedOrderId));
            setSelectedOrder(order);
          }}
        >
          {ordersData.map((order) => (
            <option key={order.id} value={order.id}>
              Order #{order.id} - {order.customerName}
            </option>
          ))}
        </select>
      </div>

      {/* Order Tracker */}
      <div className="w-full">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Tracking Order #{selectedOrder.id}</h3>
        </div>

        <Stepper
          activeStep={selectedOrder.activeStep}
          alternativeLabel
          sx={{
            '& .MuiStepLabel-root': {
              color: '#4C4C4C',
            },
            '& .MuiStepLabel-active': {
              color: '#9155FD',
            },
            '& .MuiStepLabel-completed': {
              color: '#4CAF50',
            },
          }}
        >
          {orderSteps.map((label, index) => (
            <Step key={index}>
              <StepLabel
                sx={{
                  color: "#9155FD",
                  fontSize: "16px",
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Order Details and Actions */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-medium text-gray-700">Order Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-gray-600">Customer Name: {selectedOrder.customerName}</p>
            <p className="text-gray-600">Order Status: {orderSteps[selectedOrder.activeStep]}</p>
          </div>
          <div>
            <p className="text-gray-600">Shipping Address: 123 Main Street, City, State</p>
            <p className="text-gray-600">Payment Status: Paid</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end">
          {selectedOrder.activeStep < orderSteps.length - 1 && (
            <button
              onClick={() => {
                setSelectedOrder((prevState) => ({
                  ...prevState,
                  activeStep: prevState.activeStep + 1,
                }));
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Mark as {orderSteps[selectedOrder.activeStep + 1]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderTracker;
