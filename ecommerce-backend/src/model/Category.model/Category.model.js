const mongoose = require('mongoose');

// Define the Category Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ['Boys', 'Girls', 'Schools', 'Colleges', 'Price Range'], // Enum for predefined categories
    },
    description: {
      type: String,
      required: false, // Description may not always be required
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Self-reference for hierarchical categories (for subcategories)
      required: false, // Not always required, depending on the category type
    },
    uniforms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Uniform', // Reference to the Uniform model
        required: false, // Optional, depending on whether uniforms belong to this category
      },
    ],
    priceRange: {
      type: String,
      enum: ['Low to High', 'High to Low'],
      required: function () {
        return this.name === 'Price Range'; // Only required if category is 'Price Range'
      },
    },
  },
  { timestamps: true }
);

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
