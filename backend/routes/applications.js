const express = require('express');
const Application = require('../models/Application');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Submit application
router.post('/', auth, async (req, res) => {
  try {
    const application = new Application({ ...req.body, user: req.user._id });
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user applications
router.get('/my', auth, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).populate('club');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

