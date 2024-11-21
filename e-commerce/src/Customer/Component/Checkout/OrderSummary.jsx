import React from "react";
import { useNavigate } from "react-router-dom";
// import AddressCard from "../AddressCard/AddressCard";
import Cartitem from "../Cart/Cartitem";
import { Divider } from "@mui/material";

const OrderSummary = ({setStep,  setPaymentData}) => {
  const navigate = useNavigate();

  // Fetch cart items and orderId from localStorage or backend
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const orderId = "order123456"; // Example order ID, replace with your actual logic

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Discount logic (example: 100 off)
  const discount = 100;

  // Delivery charge logic (example: free if totalPrice > 300)
  const deliveryCharge = totalPrice > 300 ? 0 : 50;

  // Final amount
  const finalAmount = totalPrice - discount + deliveryCharge;

  const proceedToPayment = () => {
    console.log("Order ID:", orderId);
    console.log("Total Amount:", finalAmount);
    // Save payment data in shared state
    setPaymentData({ totalAmount: finalAmount, orderId: orderId });

    // Move to payment step
    setStep(3);
  };

  return (
    <div>
      <div className="lg:grid grid-cols-3 lg:px-16 relative mt-3">
        <div className="col-span-2">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => <Cartitem key={index} item={item} />)
          ) : (
            <div>Your cart is empty!</div>
          )}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 right-0">
          <div className="border p-5">
            <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
            <Divider />
            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>Rs {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Discount</span>
                <span className="text-green-600">- Rs {discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span>Delivery Charge</span>
                <span
                  className={deliveryCharge === 0 ? "text-green-600" : "text-black"}
                >
                  {deliveryCharge === 0 ? "Free" : `Rs ${deliveryCharge.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 font-bold">
                <span>Total Amount</span>
                <span className="text-green-600">Rs {finalAmount.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={proceedToPayment}
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-9 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              PAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
