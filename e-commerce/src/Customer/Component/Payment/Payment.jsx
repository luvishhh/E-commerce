import React, { useState } from "react";

const Payment = ({ data }) => {
  const [loading, setLoading] = useState(false);

  if (!data) {
    console.error("Payment data is missing");
    return <div>Error: Payment data not found.</div>;
  }

  const { orderId, totalAmount } = data;

  console.log("Order ID:", orderId);
  console.log("Total Amount:", totalAmount);

  const handlePayment = () => {
    setLoading(true);

    const options = {
      key: "rzp_test_GOrCEYisNgBF2q", // Replace with your Razorpay key
      amount: totalAmount * 100, // Convert to paise
      currency: "INR",
      name: "Your Company Name",
      description: `Payment for Order ID: ${orderId}`,
      image: "https://w7.pngwing.com/pngs/621/196/png-transparent-e-commerce-logo-logo-e-commerce-electronic-business-ecommerce-angle-text-service.png", // Replace with your logo URL
      order_id: orderId, // Use the dynamic orderId
      handler: function (response) {
        console.log("Payment successful response:", response);
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        setLoading(false);
       
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "1234567890",
      },
      theme: {
        color: "#4c51bf",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Complete Your Payment</h1>
          <p className="text-gray-600 mb-6">
            Please review your details and proceed with the payment to complete your order.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between text-gray-700 font-medium">
            <span>Order ID:</span>
            <span className="font-semibold">{orderId}</span>
          </div>
          <div className="flex justify-between text-gray-700 font-medium">
            <span>Amount:</span>
            <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 font-medium">
            <span>Payment Method:</span>
            <span className="font-semibold">Razorpay</span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handlePayment}
            className={`bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay ₹${totalAmount.toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
