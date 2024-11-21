const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true, // Ensures no extra spaces are stored
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      index: true, // Optimized for querying
      lowercase: true, // Store email in lowercase
      trim: true, // Ensures no extra spaces are stored
      match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please fill a valid email address'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'], // Now required for all roles
      unique: true, // Ensure phone number is unique
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Regex for 10-digit phone number
        },
        message: props => `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['Parent', 'Student', 'Institution'], // Enum for roles
      required: [true, 'Role is required'],
      default: 'Parent',
    },
    studentId: {
      type: String,
      required: function () {
        return this.role === 'Student'; // Only required for students
      },
    },
    institutionName: {
      type: String,
      required: function () {
        return this.role === 'Institution'; // Only required for institutions
      },
    },
    contactPerson: {
      type: String,
      required: function () {
        return this.role === 'Institution'; // Only required for institutions
      },
    },
    address: {
      type: String, // Reference to Address model
      ref: 'Address',
      required: function () {
        return this.role === 'Institution'; // Only required for institutions
      },
    },
    gradeOrClass: {
      type: String,
      required: function () {
        return this.role === 'Student'; // Only required for students
      },
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip hashing if password not modified
  try {
    this.password = await bcrypt.hash(this.password, 10); // Hash password with bcrypt
    next(); // Continue with saving
  } catch (err) {
    next(err); // Handle any errors in password hashing
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare provided password with stored hash
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
