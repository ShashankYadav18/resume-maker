const express = require('express');
const router = express.Router();
const Resume = require('../models/resume');

// Create Resume
router.post('/', async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Resumes
router.get('/', async (req, res) => {
  const resumes = await Resume.find();
  res.json(resumes);
});

module.exports = router;
