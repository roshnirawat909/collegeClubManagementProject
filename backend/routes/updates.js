const express = require('express');
const Update = require('../models/Update');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get updates
router.get('/', async (req, res) => {
  try {
    const updates = await Update.find().populate('author', 'name');
    res.json(updates);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create update
router.post('/', auth, async (req, res) => {
  try {
    const update = new Update({ ...req.body, author: req.user._id });
    await update.save();
    res.status(201).json(update);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

