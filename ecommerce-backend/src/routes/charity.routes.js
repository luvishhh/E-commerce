const express = require('express');
const CharityForm = require('../model/Charity.model/Charity.forme.model.js'); // Import the Charity model

const router = express.Router();

// Route to handle charity form submission
router.post('/submit', async (req, res) => {
  try {
    // Destructure the request body
    const {
      fullName,
      email,
      phone,
      address,
      donationType,
      studentDetails,
      institutionName,
      institutionType,
      donorType,
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !address || !donationType) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    // Conditional validation based on donorType
    if (donorType === 'parent' && !studentDetails) {
      return res.status(400).json({ message: 'Student details are required for parent donors.' });
    }
    if (donorType === 'institution' && (!institutionName || !institutionType)) {
      return res.status(400).json({ message: 'Institution name and type are required for institution donors.' });
    }

    // Create a new charity form document
    const charityForm = new CharityForm({
      fullName,
      email,
      phone,
      address,
      donationType,
      studentDetails,
      institutionName,
      institutionType,
      donorType,
    });

    // Save the document to the database
    await charityForm.save();

    // Respond to the client
    res.status(201).json({
      message: 'Charity form submitted successfully',
      charityForm,
    });
  } catch (error) {
    console.error('Error submitting charity form:', error);
    res.status(500).json({
      message: 'Failed to submit charity form',
      error: error.message,
    });
  }
});

module.exports = router;
