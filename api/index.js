require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('../server/src/config/db');

const app = express();
connectDB();

app.use(express.json({ limit: '5mb' }));
app.use(cors({ 
  origin: process.env.CLIENT_URL || 'https://smart-resume-maker-five.vercel.app', 
  credentials: true 
}));
app.use(morgan('dev'));

// routes
app.use('/auth', require('../server/src/routes/auth'));
app.use('/resumes', require('../server/src/routes/resumes'));
app.use('/feedback', require('../server/src/routes/feedback'));

module.exports = app;
