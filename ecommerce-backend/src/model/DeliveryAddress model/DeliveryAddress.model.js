const mongoose = require('mongoose');

const deliveryAddressSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],  // Optional email validation
    },
    contactNumber: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      default: '',  // Optional second address line
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    institutionName: {
      type: String,
      default: '',  // Optional field for institution or school name
    },
    notes: {
      type: String,
      default: '',  // Optional field for additional notes
    },
  },
  { timestamps: true } // This will automatically create `createdAt` and `updatedAt` fields
);

const DeliveryAddress = mongoose.model('DeliveryAddress', deliveryAddressSchema);

module.exports = DeliveryAddress;
