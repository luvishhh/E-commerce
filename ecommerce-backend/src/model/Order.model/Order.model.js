const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Each order is linked to a user
    },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem', // Reference to the OrderItem model
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true, // Total cost of the order
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address', // Reference to the Address model
      required: true, // Shipping address is required
    },
    paymentInfo: {
      paymentMethod: { type: String, required: true }, // e.g., Credit Card, Razorpay
      transactionId: { type: String, required: true }, // Payment transaction ID
    },
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending', // Default status is Pending
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
