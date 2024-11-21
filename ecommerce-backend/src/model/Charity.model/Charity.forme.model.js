const mongoose = require('mongoose');

// Define the charity form schema
const charityFormSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true, // Full name of the donor
      trim: true, // Removes leading and trailing spaces
    },
    email: {
      type: String,
      required: true, // Email of the donor
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Email format validation
    },
    phone: {
      type: String,
      required: true, // Phone number of the donor
      match: [/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number'], // Validates phone number format
    },
    address: {
      type: String,
      required: true, // Address of the donor
      trim: true, // Removes leading and trailing spaces
    },
    donationType: {
      type: String,
      enum: ['books', 'uniforms', 'scholarship'], // Enum for donation types
      required: true,
    },
    studentDetails: {
      type: String,
      required: function () {
        return this.donorType === 'parent'; // Required only if donor is a parent
      },
      trim: true, // Removes leading and trailing spaces
    },
    institutionName: {
      type: String,
      required: function () {
        return this.donorType === 'institution'; // Required only if donor is an institution
      },
      trim: true, // Removes leading and trailing spaces
    },
    institutionType: {
      type: String,
      required: function () {
        return this.donorType === 'institution'; // Required only if donor is an institution
      },
      trim: true, // Removes leading and trailing spaces
    },
    donorType: {
      type: String,
      enum: ['parent', 'institution'], // Enum for donor types (parent or institution)
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the CharityForm model
const CharityForm = mongoose.model('CharityForm', charityFormSchema);
  
module.exports = CharityForm;
