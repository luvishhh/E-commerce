const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    uniform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Uniform',
      required: true, // Each order item links to a specific uniform
    },
    quantity: {
      type: Number,
      required: true, // Quantity of this item in the order
      min: 1, // Minimum of 1 item per order
    },
    price: {
      type: Number,
      required: true, // Price of the item at the time of purchase
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
