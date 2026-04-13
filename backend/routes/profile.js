const express = require('express');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get profile (handled in auth routes)
router.get('/', auth, (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
});

module.exports = router;

