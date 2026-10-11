var mongoose = require('mongoose');

// Trip schema with validation - matches the Travlr Getaways wireframe fields
var tripSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Trip code is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  name: {
    type: String,
    required: [true, 'Trip name is required'],
    trim: true,
    minlength: [2, 'Trip name must be at least 2 characters']
  },
  length: {
    type: String,
    required: [true, 'Trip length is required'],
    trim: true
  },
  start: {
    type: Date,
    required: [true, 'Trip start date is required']
  },
  resort: {
    type: String,
    required: [true, 'Resort name is required'],
    trim: true
  },
  perPerson: {
    type: Number,
    required: [true, 'Per-person price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Trip image filename is required'],
    trim: true
  },
  alt: {
    type: String,
    trim: true,
    default: function () { return this.name; }
  },
  description: {
    type: [String],
    required: [true, 'At least one description paragraph is required'],
    validate: {
      validator: function (arr) { return arr.length > 0; },
      message: 'Description must contain at least one paragraph'
    }
  }
});

module.exports = mongoose.model('Trip', tripSchema);
