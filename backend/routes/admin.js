const express = require('express');
const { auth, admin } = require('../middleware/auth');
const router = express.Router();

// Admin dashboard data
router.get('/dashboard', auth, admin, async (req, res) => {
  res.json({ message: 'Admin dashboard data' });
});

// Approve/reject applications
router.put('/applications/:id', auth, admin, async (req, res) => {
  res.json({ message: 'Application updated' });
});

module.exports = router;
