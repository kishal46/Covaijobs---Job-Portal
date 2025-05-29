const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// POST /signup
router.post('/signup', async (req, res) => {
  const { userName, email, phoneNumber, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res.json({ success: false, message: 'User already exists' });
    }

    const newUser = new User({ userName, email, phoneNumber, password, role });
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { userName: identifier }]
    });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid password' });
    }

    const userData = {
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
    };

    res.json({ success: true, message: 'Login successful', user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});
// In your Express backend
router.post("/google-login", async (req, res) => {
  const { email, name, picture } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = new User({ userName: name, email, profilePic: picture, role: "candidate" });
      await user.save();
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Google login failed" });
  }
});


module.exports = router;
