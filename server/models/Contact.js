const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Bitte geben Sie Ihren Namen ein.'],
      trim: true,
      minlength: [2, 'Der Name muss mindestens 2 Zeichen enthalten.'],
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Bitte geben Sie Ihre E-Mail-Adresse ein.'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    service: {
      type: String,
      enum: ['Reinigung', 'Hausmeisterdienst', 'Winterdienst', 'Sonstiges'],
      default: 'Sonstiges',
    },
    message: {
      type: String,
      required: [true, 'Bitte beschreiben Sie kurz Ihr Anliegen.'],
      trim: true,
      minlength: [10, 'Ihre Nachricht muss mindestens 10 Zeichen enthalten.'],
      maxlength: 2000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
