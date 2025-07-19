const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateCode, buildReferral } = require('../utils/referral');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { phone, password, code } = req.body;
  const exists = await User.findOne({ phone });
  if (exists) return res.status(400).json({ error: 'Phone already registered' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ phone, passwordHash, referralCode: generateCode() });

  if (code) {
    const inviter = await User.findOne({ referralCode: code });
    if (inviter) await buildReferral(user, inviter);
  }

  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

router.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ phone });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid login credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
