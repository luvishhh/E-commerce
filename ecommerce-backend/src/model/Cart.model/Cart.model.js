const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem',  // Reference to the CartItem model
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Middleware to calculate the total price before saving
cartSchema.pre('save', async function (next) {
  // Calculate total price by summing the prices of all cart items
  const cartItems = await CartItem.find({ cart: this._id });
  this.totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
