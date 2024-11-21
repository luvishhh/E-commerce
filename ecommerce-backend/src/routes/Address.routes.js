const express = require('express');
const router = express.Router();
const Address = require('../model/Address model/Address.model.js'); // Import the Address model

// Route to save the address
router.post('/submit', async (req, res) => {
  try {
    const addressData = req.body;

    // Create and save the new address
    const newAddress = new Address(addressData);
    await newAddress.save();

    // Send response
    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error saving address:', error);
    res.status(500).json({ message: 'Failed to save the address. Please try again.' });
  }
});

// Route to get the most recent address
router.get('/address', async (req, res) => {
  try {
    // Fetch the most recent address (or modify as needed)
    const address = await Address.findOne().sort({ createdAt: -1 });

    if (!address) {
      return res.status(404).json({ message: 'No address found' });
    }

    res.status(200).json(address);
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ message: 'Error fetching address' });
  }
});

module.exports = router;
