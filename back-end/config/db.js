// backend/config/db.js
// This file handles the connection to your MongoDB Atlas database.
require('dotenv').config(); // Load environment variables from .env
const mongoose = require('mongoose'); // Import Mongoose library

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // The following options are deprecated in newer Mongoose versions (8.x+)
      // and are often no longer needed, but can be left for compatibility.
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    // Log a success message including the host connected to
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log any connection errors
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit the process with a failure code if connection fails
    process.exit(1);
  }
};

module.exports = connectDB; // Export the connection function