const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Problems data is served statically from backend
// In production, this could come from MongoDB
const dsaData = require('../data/dsaProblems');

router.get('/', protect, (req, res) => {
  res.json({ success: true, data: dsaData });
});

module.exports = router;
