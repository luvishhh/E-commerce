const express = require('express');
const router = express.Router();
const DeliveryAddress = require('../model/DeliveryAddress model/DeliveryAddress.model.js');

// POST route to save a new delivery address
router.post('/submit', async (req, res) => {
  try {
    const newAddress = new DeliveryAddress(req.body); // Assuming the address data is passed in the request body
    await newAddress.save();
    res.status(201).json({ message: 'Delivery address saved successfully!', newAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, try again later.' });
  }
});

module.exports = router;
