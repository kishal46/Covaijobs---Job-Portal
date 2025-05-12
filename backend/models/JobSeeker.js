// models/Profile.js (or models/jobSeeker.js)
const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  experience: { type: Number, required: true },
  skills: { type: [String], required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  resumePath: { type: String }, // Path to resume file
  profilePicturePath: { type: String }, // Path to profile picture
});

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);

module.exports = JobSeeker;
