import React, { useState, useEffect } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import Cartitem from '../Cart/Cartitem';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart items from localStorage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  // Update localStorage when cart changes
  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Handle increment
  const handleIncrement = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartInLocalStorage(updatedCart);
  };

  // Handle decrement
  const handleDecrement = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCartInLocalStorage(updatedCart);
  };

  // Handle remove
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCartInLocalStorage(updatedCart);
  };

  // Calculate price details
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // const discount = totalPrice > 500 ? 100 : 0; // Example discount logic
  const deliveryCharge = totalPrice > 500 ? 0 : 50; // Free delivery above 500
  const finalAmount = totalPrice - 100 + deliveryCharge;

  // Handle checkout
  const handleCheckout = () => {
    navigate('/Checkout');
  };

  return (
    <div>
      

      {/* Cart and Price Details */}
      <div>
        <div className="lg:grid grid-cols-3 lg:px-16 relative mt-3">
          {/* Cart Items */}
          <div className="col-span-2">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Cartitem
                  key={item.id}
                  item={item}
                  onIncrement={() => handleIncrement(item.id)}
                  onDecrement={() => handleDecrement(item.id)}
                  onRemove={() => handleRemove(item.id)}
                />
              ))
            ) : (
              <p className="text-center mt-5">Your cart is empty!</p>
            )}
          </div>

          {/* Price Summary */}
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 right-0">
            <div className="border p-5">
              <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
              <Divider />
              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price</span>
                  <span>Rs{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Discount</span>
                  <span className="text-green-600">Rs 100</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Delivery Charge</span>
                  <span className="text-green-600">
                    {deliveryCharge > 0 ? `Rs${deliveryCharge}` : 'Free'}
                  </span>
                </div>
                <div className="flex justify-between pt-3 font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-600">${finalAmount.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-9 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
