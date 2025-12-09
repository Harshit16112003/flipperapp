const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

router.get('/', async (req, res) => {
  try {
    const newsletters = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json(newsletters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const newsletter = new Newsletter({
    email: req.body.email
  });

  try {
    const newSubscription = await newsletter.save();
    res.status(201).json(newSubscription);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
