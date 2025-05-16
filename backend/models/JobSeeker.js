const mongoose = require("mongoose");

const JobSeekerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: String,
  email: String,
  experience: String,
  skills: [String],
  location: String,
  phoneNumber: String,
  resume: String,
  
  profilePicture: String,
});

module.exports = mongoose.model("JobSeeker", JobSeekerSchema);
