const User = require('../models/User');
const crypto = require('crypto');

function generateCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

async function buildReferral(user, inviter) {
  user.invitedBy = inviter._id;
  await user.save();

  inviter.referrals.push(user._id);
  await inviter.save();
}

module.exports = { generateCode, buildReferral };
