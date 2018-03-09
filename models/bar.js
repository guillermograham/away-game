const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const reviewSchema = new mongoose.Schema({
  content: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
},{
  timestamps: true
});

const barSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  image: String,
  addressLine1: { type: String },
  addressLine2: String,
  city: { type: String },
  postcode: { type: String },
  location: {
    lat: Number,
    lng: Number
  },
  description: String,
  fixtures: [{ type: mongoose.Schema.ObjectId, ref: 'Match' }],
  reviews: [ reviewSchema ]
});

barSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

barSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

barSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

barSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Bar', barSchema);
