
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.env.DB_OFFLINE = 'true';
    console.warn('Running in offline demo mode without MongoDB.');
  }
};

module.exports = connectDB;
