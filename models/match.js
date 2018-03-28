const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  date: { type: Date },
  teams: { type: Array },
  matchCode: String
});

matchSchema.virtual('screenings', {
  ref: 'Bar',
  localField: '_id',
  foreignField: 'fixtures'
});

// modifying the JSON output:
matchSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform(obj, json) {
    // delete json._id;
    delete json.__v;
  }
});

module.exports = mongoose.model('Match', matchSchema);
