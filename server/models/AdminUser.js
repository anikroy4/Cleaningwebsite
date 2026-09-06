const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    role: {
      type: String,
      enum: ['admin', 'superadmin'],
      default: 'admin',
    },
    passwordHash: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminUser', adminUserSchema);
