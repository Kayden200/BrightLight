const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('referrals', 'phone')
      .select('-passwordHash');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Daily login bonus
router.post('/daily-bonus', auth, async (req, res) => {
  try {
    const user = req.user;
    const today = new Date();
    const lastLogin = user.lastLoginBonus;
    
    // Check if user already claimed today's bonus
    if (lastLogin && lastLogin.toDateString() === today.toDateString()) {
      return res.status(400).json({ error: 'Daily bonus already claimed' });
    }

    // Award daily bonus
    const bonusAmount = 10;
    user.balance += bonusAmount;
    user.cumulative += bonusAmount;
    user.lastLoginBonus = today;
    await user.save();

    res.json({ 
      message: 'Daily bonus claimed!', 
      bonus: bonusAmount, 
      newBalance: user.balance 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;