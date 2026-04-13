const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      name: 'SAC Council Member',
      role: 'President',
      contact: 'sac@example.com'
    }
  ]);
});

module.exports = router;
