const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const { protect } = require('../middleware/auth');

// @route GET /api/progress - Get all progress for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id });
    const progressMap = {};
    progress.forEach(p => { progressMap[p.problemId] = p.completed; });
    res.json({ success: true, progress: progressMap });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route POST /api/progress/toggle - Toggle a problem's completion
router.post('/toggle', protect, async (req, res) => {
  try {
    const { problemId } = req.body;
    if (!problemId) return res.status(400).json({ success: false, message: 'problemId required' });

    const existing = await Progress.findOne({ user: req.user._id, problemId });

    if (existing) {
      existing.completed = !existing.completed;
      existing.completedAt = existing.completed ? new Date() : null;
      await existing.save();
      return res.json({ success: true, completed: existing.completed });
    }

    const newProgress = await Progress.create({
      user: req.user._id,
      problemId,
      completed: true,
      completedAt: new Date()
    });

    res.json({ success: true, completed: newProgress.completed });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route GET /api/progress/stats - Get progress stats
router.get('/stats', protect, async (req, res) => {
  try {
    const total = await Progress.countDocuments({ user: req.user._id });
    const completed = await Progress.countDocuments({ user: req.user._id, completed: true });
    res.json({ success: true, stats: { total, completed } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
