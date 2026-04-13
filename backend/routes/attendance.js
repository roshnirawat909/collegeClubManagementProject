const express = require('express');
const Attendance = require('../models/Attendance');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Mark attendance
router.post('/', auth, async (req, res) => {
  try {
    const attendance = new Attendance({ ...req.body, user: req.user._id });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user attendance
router.get('/my', auth, async (req, res) => {
  try {
    const attendance = await Attendance.find({ user: req.user._id }).populate('club');
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

