const express = require('express');
const Certificate = require('../models/Certificate');

const { auth } = require('../middleware/auth');
const router = express.Router();

// Create certificate
router.post('/', auth, async (req, res) => {
  try {
    const certificate = new Certificate({ ...req.body, user: req.user._id });
    await certificate.save();
    res.status(201).json(certificate);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
    console.error(err);
  }
});

// Get user certificates
router.get('/my', auth, async (req, res) => {
  try {
    const certificates = await Certificate.find({ user: req.user._id }).populate('club');
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
    console.error(err);
  }
});

module.exports = router;



