const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // specify the folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // use a timestamp for unique filenames
  }
});

const upload = multer({ storage: storage });

// Update Profile Route with file uploads
router.post('/details', authenticateToken, upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'profilePicture', maxCount: 1 }]), async (req, res) => {
  const { userId, name, email, experience, skills, location, phoneNumber } = req.body;
  const resume = req.files['resume'] ? req.files['resume'][0].path : null;
  const profilePicture = req.files['profilePicture'] ? req.files['profilePicture'][0].path : null;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update user profile
    user.userName = name || user.userName;
    user.email = email || user.email;
    user.experience = experience || user.experience;
    user.skills = JSON.parse(skills) || user.skills;
    user.location = location || user.location;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    if (resume) user.resume = resume;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();

    res.status(200).json({ success: true, message: 'Profile updated successfully', jobSeeker: user });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
