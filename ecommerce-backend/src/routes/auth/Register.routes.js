const express = require('express');
const User = require('../../model/User.model/User.model.js');
const router = express.Router();

// Register Route
router.post('/submit', async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    role,
    studentId,
    institutionName,
    contactPerson,
    address,
    gradeOrClass,
    childStudentId,
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password,
      role:req.body.role  ,
      studentId: role === 'Student' ? studentId : undefined,
      institutionName: role === 'Institution' ? institutionName : undefined,
      contactPerson: role === 'Institution' ? contactPerson : undefined,
      address: role === 'Institution' ? address : undefined,
      gradeOrClass: role === 'Student' ? gradeOrClass : undefined,
      childStudentId: role === 'Parent' ? childStudentId : undefined,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with the success message and user details
    return res.status(201).json({ message: 'User registered successfully!', user: newUser });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error registering user', error });
  }
});

module.exports = router;
