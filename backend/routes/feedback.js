const express = require('express');
const Feedback = require('../models/Feedback');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Create feedback
router.post('/', auth, async (req, res) => {
  try {
    const feedback = new Feedback({ ...req.body, user: req.user._id });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get feedback
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find().populate('user', 'name');
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

