const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  semester: { type: Number, required: true },
  sgpa: { type: Number, required: true },
  totalCredits: { type: Number, required: true },
  courses: [
    {
      code: String,
      name: String,
      credits: Number,
      grade: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema); 