const mongoose = require('mongoose');

// Define the address schema
const addressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  institutionName: { type: String },
  notes: { type: String },
}, { timestamps: true }); // `timestamps` will add createdAt and updatedAt fields

// Create the model
const Address = mongoose.model('Address', addressSchema);

// Export the model
module.exports = Address;
