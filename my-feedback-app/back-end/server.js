// backend/server.js
require('dotenv').config(); // Load .env file at the very top

const express = require('express');
const cors = require('cors');
const feedbackRoutes = require('./routes/feedbackRoutes'); // Import your feedback routes

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies of incoming requests

// Routes
// This line correctly mounts all routes defined in feedbackRoutes.js
// under the /api/feedback base path.
app.use('/api/feedback', feedbackRoutes);

// Basic route for testing (this one is fine as it's a different path)
app.get('/', (req, res) => {
    res.send('Feedback Board API is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access backend at http://localhost:${PORT}`);
});