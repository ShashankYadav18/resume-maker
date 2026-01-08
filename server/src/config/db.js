const mongoose = require('mongoose');

async function connectDB() {
  try {
    // Skip database connection if no MONGO_URI is provided
    if (!process.env.MONGO_URI) {
      console.log('No MONGO_URI provided - running without database');
      return;
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Database connection error:', err);
    // Don't exit - allow app to run without DB
    console.log('Running without database');
  }
}

module.exports = connectDB;
