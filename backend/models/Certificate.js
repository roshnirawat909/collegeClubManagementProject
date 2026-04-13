const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  event: String,
  date: { type: Date, default: Date.now },
  proof: String // URL/path to certificate file
});

module.exports = mongoose.model('Certificate', certificateSchema);

