const mongoose = require('mongoose');

// Define the contact form schema
const contactFormSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true, // Full name of the person submitting the contact form
      trim: true, // Removes leading and trailing spaces
    },
    email: {
      type: String,
      required: true, // Email of the person submitting the form
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Email format validation
    },
    phoneNumber: {
      type: String,
      required: true, // Phone number of the person submitting the form
      match: [/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number'], // Validates phone number format
    },
    institutionName: {
      type: String,
      trim: true, // Removes leading and trailing spaces
      required: function () {
        return this.role === 'Institution'; // Only required for institutions
      },
    },
    schoolOrCollegeName: {
      type: String,
      trim: true, // Removes leading and trailing spaces
      required: function () {
        return this.role === 'Student'; // Only required for students
      },  
    },
    rollNumber: {
      type: String,
      trim: true, // Removes leading and trailing spaces
      required: function () {
        return this.role === 'Student'; // Only required for students
      },
    },
    message: {
      type: String,
      required: true, // Message entered in the contact form
      minlength: 10, // Minimum length for the message
      maxlength: 500, // Maximum length for the message
      trim: true, // Removes leading and trailing spaces
    },
    role: {
      type: String,
      enum: ['Parent', 'Student', 'Institution'], // Enum for roles
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the ContactForm model
const ContactForm = mongoose.model('ContactForm', contactFormSchema);

module.exports = ContactForm;
