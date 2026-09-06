const express = require("express");
const crypto = require("crypto");
const AdminUser = require("../models/AdminUser");
const {
  createAdminToken,
  requireAdmin,
} = require("../middleware/adminAuth");

const router = express.Router();

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left || "");
  const rightBuffer = Buffer.from(right || "");
  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  const [salt, expectedHash] = (storedHash || "").split(":");
  if (!salt || !expectedHash) return false;
  const actualHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return safeEqual(actualHash, expectedHash);
}

router.post("/login", async (req, res) => {
  const username =
    typeof req.body.username === "string" ? req.body.username.trim() : "";
  const password =
    typeof req.body.password === "string" ? req.body.password : "";
  const configuredUsername = process.env.ADMIN_USERNAME || "admin";
  const configuredEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const configuredPassword = process.env.ADMIN_PASSWORD;
  const isBootstrapLogin = configuredPassword &&
    safeEqual(username, configuredUsername) &&
    safeEqual(password, configuredPassword);
  const email = username.toLowerCase();
  const existingUser = await AdminUser.findOne({ email }).select("+passwordHash").lean();
  const isUserLogin = existingUser?.passwordHash && verifyPassword(password, existingUser.passwordHash);
  if (!isBootstrapLogin && !isUserLogin) {
    return res.status(401).json({ success: false, error: "The username or password is incorrect." });
  }

  const role = isBootstrapLogin ? "superadmin" : existingUser.role;
  const identityEmail = isBootstrapLogin && configuredEmail ? configuredEmail : email;
  if (isBootstrapLogin && configuredEmail)
    await AdminUser.updateOne(
      { email: configuredEmail },
      { $set: { email: configuredEmail, role: "superadmin" } },
      { upsert: true },
    );

  return res.json({
    success: true,
    token: createAdminToken({ username, email: identityEmail, role }),
    admin: { username, email: identityEmail, role },
  });
});

router.get("/me", requireAdmin, (req, res) => {
  res.json({ success: true, admin: req.admin });
});

router.get("/users", requireAdmin, async (_req, res) => {
  const users = await AdminUser.find()
    .sort({ email: 1 })
    .select("email role createdAt updatedAt")
    .lean();
  res.json({ success: true, data: users });
});

router.post("/users", requireAdmin, async (req, res) => {
  const email =
    typeof req.body.email === "string"
      ? req.body.email.trim().toLowerCase()
      : "";
  const requestedPassword = typeof req.body.password === "string" ? req.body.password : "";
  const role = req.body.role || "admin";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: "Enter a valid email address." });
  }
  if (!["admin", "superadmin"].includes(role)) {
    return res.status(400).json({ success: false, error: "Choose either admin or superadmin." });
  }
  if (role === "superadmin" && req.admin.role !== "superadmin") {
    return res.status(403).json({ success: false, error: "Only a super admin can grant the super admin role." });
  }
  const temporaryPassword = requestedPassword || crypto.randomBytes(9).toString("base64url");
  if (temporaryPassword.length < 8) {
    return res.status(400).json({ success: false, error: "The temporary password must be at least 8 characters." });
  }

  const user = await AdminUser.findOneAndUpdate(
    { email },
    { $set: { email, role, passwordHash: hashPassword(temporaryPassword) } },
    { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true },
  )
    .select("email role createdAt updatedAt")
    .lean();
  return res.status(201).json({ success: true, user, temporaryPassword });
});

router.put("/users/role", requireAdmin, async (req, res) => {
  const email =
    typeof req.body.email === "string"
      ? req.body.email.trim().toLowerCase()
      : "";
  const role = req.body.role;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res
      .status(400)
      .json({ success: false, error: "Enter a valid email address." });
  }
  if (!["admin", "superadmin"].includes(role)) {
    return res
      .status(400)
      .json({ success: false, error: "Choose either admin or superadmin." });
  }
  if (role === "superadmin" && req.admin.role !== "superadmin") {
    return res.status(403).json({ success: false, error: "Only a super admin can grant the super admin role." });
  }

  const user = await AdminUser.findOneAndUpdate(
    { email },
    { $set: { role } },
    { new: true, runValidators: true },
  )
    .select("email role createdAt updatedAt")
    .lean();
  if (!user) return res.status(404).json({ success: false, error: "No account exists for this email." });
  return res.json({ success: true, user });
});

module.exports = router;
