const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { requireAdmin } = require('../middleware/adminAuth');

const SERVICES = new Set(['Cleaning', 'Facility services', 'Winter maintenance', 'Other']);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(body = {}) {
  const values = {
    name: typeof body.name === 'string' ? body.name.trim() : '',
    email: typeof body.email === 'string' ? body.email.trim().toLowerCase() : '',
    phone: typeof body.phone === 'string' ? body.phone.trim() : '',
    service: typeof body.service === 'string' ? body.service.trim() : '',
    message: typeof body.message === 'string' ? body.message.trim() : '',
  };
  const errors = {};

  if (!values.name) errors.name = 'Please enter your name.';
  else if (values.name.length < 2) errors.name = 'Your name must contain at least 2 characters.';
  else if (values.name.length > 100) errors.name = 'Your name may contain no more than 100 characters.';

  if (!values.email) errors.email = 'Please enter your email address.';
  else if (!emailPattern.test(values.email)) errors.email = 'Please enter a valid email address.';

  if (values.phone && !/^[+\d][\d\s()\-/.]{5,29}$/.test(values.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (values.service && !SERVICES.has(values.service)) {
    errors.service = 'Please select a valid service.';
  }

  if (!values.message) errors.message = 'Please briefly describe your request.';
  else if (values.message.length < 10) errors.message = 'Your message must contain at least 10 characters.';
  else if (values.message.length > 2000) errors.message = 'Your message may contain no more than 2,000 characters.';

  return { values, errors };
}

// POST /api/contact  — save a quote request
router.post('/', async (req, res) => {
  try {
    const { values, errors } = validateContact(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Please check your entries.',
        fields: errors,
      });
    }

    const contact = new Contact(values);
    await contact.save();

    res.status(201).json({ success: true, message: 'Your request was sent successfully!' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const fields = Object.fromEntries(
        Object.entries(err.errors).map(([field, detail]) => [field, detail.message])
      );
      return res.status(400).json({ success: false, error: 'Please check your entries.', fields });
    }
    console.error('Contact save error:', err);
    res.status(500).json({ success: false, error: 'Server error. Please try again later.' });
  }
});

// GET /api/contact  — list submissions (admin use)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50).lean();
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Serverfehler.' });
  }
});

module.exports = router;
