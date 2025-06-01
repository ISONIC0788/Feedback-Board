// backend/server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Connect to MongoDB Atlas
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/feedback', feedbackRoutes);

// Basic root route for testing API availability
app.get('/', (req, res) => {
    res.send('Feedback Board API is running!');
});

// Start the server (only if not in a production/serverless environment)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Access backend at http://localhost:${PORT}`);
    });
}

module.exports = app; // Export app for potential serverless deployment