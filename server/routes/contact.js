const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { requireAdmin } = require('../middleware/adminAuth');

const SERVICES = new Set(['Reinigung', 'Hausmeisterdienst', 'Winterdienst', 'Sonstiges']);
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

  if (!values.name) errors.name = 'Bitte geben Sie Ihren Namen ein.';
  else if (values.name.length < 2) errors.name = 'Der Name muss mindestens 2 Zeichen enthalten.';
  else if (values.name.length > 100) errors.name = 'Der Name darf höchstens 100 Zeichen enthalten.';

  if (!values.email) errors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
  else if (!emailPattern.test(values.email)) errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';

  if (values.phone && !/^[+\d][\d\s()\-/.]{5,29}$/.test(values.phone)) {
    errors.phone = 'Bitte geben Sie eine gültige Telefonnummer ein.';
  }

  if (values.service && !SERVICES.has(values.service)) {
    errors.service = 'Bitte wählen Sie eine gültige Leistung aus.';
  }

  if (!values.message) errors.message = 'Bitte beschreiben Sie kurz Ihr Anliegen.';
  else if (values.message.length < 10) errors.message = 'Ihre Nachricht muss mindestens 10 Zeichen enthalten.';
  else if (values.message.length > 2000) errors.message = 'Ihre Nachricht darf höchstens 2.000 Zeichen enthalten.';

  return { values, errors };
}

// POST /api/contact  — save a quote request
router.post('/', async (req, res) => {
  try {
    const { values, errors } = validateContact(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Bitte prüfen Sie Ihre Eingaben.',
        fields: errors,
      });
    }

    const contact = new Contact(values);
    await contact.save();

    res.status(201).json({ success: true, message: 'Ihre Anfrage wurde erfolgreich gesendet!' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const fields = Object.fromEntries(
        Object.entries(err.errors).map(([field, detail]) => [field, detail.message])
      );
      return res.status(400).json({ success: false, error: 'Bitte prüfen Sie Ihre Eingaben.', fields });
    }
    console.error('Contact save error:', err);
    res.status(500).json({ success: false, error: 'Serverfehler. Bitte versuchen Sie es später erneut.' });
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
