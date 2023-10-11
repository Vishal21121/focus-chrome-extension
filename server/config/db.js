const mongoose = require('mongoose');

// Replace 'your_database_name' with your actual database name
const DB_URL = 'mongodb://0.0.0.0/focus';

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
