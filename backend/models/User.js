const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true },
  passwordHash: String,
  referralCode: { type: String, unique: true },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  balance: { type: Number, default: 0 },
  cumulative: { type: Number, default: 0 },
  lastLoginBonus: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
