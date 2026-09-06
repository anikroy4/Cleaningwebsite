const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name.'],
      trim: true,
      minlength: [2, 'Your name must contain at least 2 characters.'],
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address.'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    service: {
      type: String,
      enum: ['Cleaning', 'Facility services', 'Winter maintenance', 'Other'],
      default: 'Other',
    },
    message: {
      type: String,
      required: [true, 'Please briefly describe your request.'],
      trim: true,
      minlength: [10, 'Your message must contain at least 10 characters.'],
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
