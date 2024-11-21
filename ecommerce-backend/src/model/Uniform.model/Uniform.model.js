const mongoose = require('mongoose');

// Define the Uniform Schema
const uniformSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true, // Optimize for search
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to the Category model
      required: true,
      index: true, // Optimize for queries by category
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      set: (v) => Math.round(v * 100) / 100, // Round to 2 decimal places
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp))$/.test(v); // Allow only valid image URLs
        },
        message: props => `${props.value} is not a valid image URL!`,
      },
    },
    size: {
      type: [String], // Store available sizes as an array of strings
      enum: ['S', 'M', 'L', 'XL', 'XXL'], // Possible size options
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length > 0; // Ensure array is not empty
        },
        message: 'At least one size must be provided.',
      },
    },
    brand: {
      type: String,
      maxlength: 50, // Optional, limit to 50 characters
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Uniform model
const Uniform = mongoose.model('Uniform', uniformSchema);

module.exports = Uniform;
