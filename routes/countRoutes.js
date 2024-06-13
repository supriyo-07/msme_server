const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData');

// Endpoint to get count of blocked users
router.get('/api/blocked-users-count', async (req, res) => {
  try {
    const blockedUsersCount = await FormData.countDocuments({ status: 'blocked' });
    res.json({ count: blockedUsersCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to get count of active users
router.get('/api/active-users-count', async (req, res) => {
  try {
    const activeUsersCount = await FormData.countDocuments({ status: { $nin: ['blocked', 'not verified'] } });
    res.json({ count: activeUsersCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to get count of not verified users
router.get('/api/not-verified-users-count', async (req, res) => {
  try {
    const notVerifiedUsersCount = await FormData.countDocuments({ status: 'not verified' });
    res.json({ count: notVerifiedUsersCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
