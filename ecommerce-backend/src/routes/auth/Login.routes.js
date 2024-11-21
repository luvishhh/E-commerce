const express = require('express');
const users = require('../../model/User.model/User.model.js');
const router = express.Router();

// Login Route
router.post('/submit', async (req, res) => {
  const { email, password } = req.body;

  // Validate the input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' });
  }

  try {
    // Check if the user exists
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password!' });
    }

    // Validate the password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password!' });
    }

    // Respond with success and user data (excluding password)
    res.status(200).json({
      message: 'Login successful!',
      user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error });
  }
});

module.exports = router;
