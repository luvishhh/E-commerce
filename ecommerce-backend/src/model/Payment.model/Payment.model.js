const mongoose = require('mongoose');

// Define the payment schema
const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true, // Payment must be linked to a user
    },
    amount: {
      type: Number,
      required: true, // Amount is required
      min: 0, // Amount cannot be negative
    },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Debit Card', 'PayPal', 'Razorpay', 'Cash'], // Supported payment methods
      required: true, // Payment method is required
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'], // Payment status options
      default: 'Pending', // Default status is 'Pending'
    },
    transactionId: {
      type: String,
      unique: true, // Ensure unique transaction ID
      required: true, // Transaction ID is required
    },
    paymentDate: {
      type: Date,
      default: Date.now, // Set default date to the current time
    },
    orderId: {
      type: String,  // Treat orderId as a string (not an ObjectId)
      required: true, // Link to the order for which the payment was made
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
