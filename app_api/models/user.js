var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var JWT_SECRET = process.env.JWT_SECRET || 'travlr-secret-key';

// User schema
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  hash: {
    type: String,
    required: true
  }
});

// Hash a password and store it
userSchema.methods.setPassword = function (password) {
  this.hash = bcrypt.hashSync(password, 10);
};

// Validate a password against the stored hash
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hash);
};

// Generate a signed JWT for this user
userSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: Math.floor(expiry.getTime() / 1000)
    },
    JWT_SECRET
  );
};

module.exports = mongoose.model('User', userSchema);
