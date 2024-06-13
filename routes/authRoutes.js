const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await mongoose.connection.db.collection('admin_details').findOne({ username, password });
    
    if (admin) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
