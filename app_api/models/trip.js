var mongoose = require('mongoose');

// Trip schema with validation
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
