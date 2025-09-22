const express = require('express');
const router = express.Router();
const { createFeedback, getAllFeedback, updateFeedbackStatus } = require('../controllers/feedback');

// @route   POST /api/feedback
// @desc    Create new feedback
// @access  Public
router.post('/', createFeedback);

// @route   GET /api/feedback
// @desc    Get all feedback (admin only - for future use)
// @access  Private (would need auth middleware)
router.get('/', getAllFeedback);

// @route   PUT /api/feedback/:id/status
// @desc    Update feedback status (admin only - for future use)
// @access  Private (would need auth middleware)
router.put('/:id/status', updateFeedbackStatus);

module.exports = router;