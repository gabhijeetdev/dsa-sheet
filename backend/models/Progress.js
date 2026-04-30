const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true });

// Compound index: one progress entry per user per problem
progressSchema.index({ user: 1, problemId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
