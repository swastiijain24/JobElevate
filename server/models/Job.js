const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: String,
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Remote'],
    default: 'Full-time'
  },
  description: {
    type: String,
    required: true,
  },
  skills: [String],  // An array of required skills
  postedBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // linking documents getting the _id from user doc when a user is registered
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
module.exports = mongoose.model('Job', jobSchema);
