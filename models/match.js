const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  date: { type: Date },
  teams: { type: Array },
  matchCode: String
});

module.exports = mongoose.model('Match', matchSchema);
