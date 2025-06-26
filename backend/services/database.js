
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log(process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
  }
};

module.exports = { connectDB };