const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  type: String,
  salary: String,
  description: String,
  experience: String,
  postedBy: String,
  postedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', jobSchema);
