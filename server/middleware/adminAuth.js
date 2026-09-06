const crypto = require('crypto');

const TOKEN_TTL_SECONDS = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET must be set and contain at least 32 characters.');
  }
  return secret;
}

function sign(value) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('base64url');
}

function createAdminToken({ username, email, role }) {
  const payload = Buffer.from(JSON.stringify({
    sub: username,
    email,
    role,
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function verifyAdminToken(token) {
  if (!token || typeof token !== 'string') return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const signaturesMatch = signature.length === expected.length && crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
  if (!signaturesMatch) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (typeof data.sub !== 'string' || typeof data.email !== 'string' || !['admin', 'superadmin'].includes(data.role)) return false;
    if (!Number.isInteger(data.exp) || data.exp <= Math.floor(Date.now() / 1000)) return false;
    return data;
  } catch {
    return false;
  }
}

function requireAdmin(req, res, next) {
  const authorization = req.get('authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  const admin = verifyAdminToken(token);
  if (!admin) {
    return res.status(401).json({ success: false, error: 'Admin login required.' });
  }
  req.admin = admin;
  return next();
}

function requireSuperAdmin(req, res, next) {
  if (req.admin?.role !== 'superadmin') {
    return res.status(403).json({ success: false, error: 'Only super admins may manage users.' });
  }
  return next();
}

module.exports = { createAdminToken, requireAdmin, requireSuperAdmin };
