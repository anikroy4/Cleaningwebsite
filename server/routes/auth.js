const express = require('express');
const crypto = require('crypto');
const { createAdminToken } = require('../middleware/adminAuth');

const router = express.Router();

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left || '');
  const rightBuffer = Buffer.from(right || '');
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

router.post('/login', (req, res) => {
  const username = typeof req.body.username === 'string' ? req.body.username.trim() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';
  const configuredUsername = process.env.ADMIN_USERNAME || 'admin';
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword) return res.status(503).json({ success: false, error: 'Admin-Anmeldung ist nicht konfiguriert.' });
  if (!safeEqual(username, configuredUsername) || !safeEqual(password, configuredPassword)) return res.status(401).json({ success: false, error: 'Benutzername oder Passwort ist falsch.' });
  return res.json({ success: true, token: createAdminToken(username) });
});

module.exports = router;
