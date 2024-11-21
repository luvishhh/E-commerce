const express = require('express');
const ContactForm = require('../model/Contact.model/Contact.forme.model.js'); // Import the Contact model

const router = express.Router();

// Route to handle contact form submission
router.post('/submit', async (req, res) => {
  console.log("Form submission",req.body);  
  try {
    const {
      fullName,
      email,
      phoneNumber,
      institutionName,
      schoolOrCollegeName,
      rollNumber,
      message,
      role,
    } = req.body;

    // Create a new ContactForm document
    const contactForm = new ContactForm({
      fullName,
      email,
      phoneNumber,
      institutionName,
      schoolOrCollegeName,
      rollNumber,
      message,
      role,
    });

    // Save to the database
    await contactForm.save();

    // Respond to the client
    res.status(201).json({ message: 'Contact form submitted successfully!', contactForm });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Failed to submit contact form', error });
  }
});

module.exports = router;
