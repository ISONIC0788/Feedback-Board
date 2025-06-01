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
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/feedback', feedbackRoutes);

// Basic test route
app.get('/', (req, res) => {
    res.send('Feedback Board API is running!');
});

// Always start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
        console.log(`Access backend at http://localhost:${PORT}`);
});

module.exports = app;
