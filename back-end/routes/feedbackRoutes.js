// backend/routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel'); // Import your Mongoose Feedback model

// @route   GET /api/feedback
// @desc    Get all feedback items with optional category, sort, and search filters
// @access  Public
router.get('/', async (req, res) => {
    // Destructure query parameters from the request
    const { category, sort, search } = req.query;
    let query = {}; // Initialize an empty Mongoose query object

    // 1. Apply Category Filter (if provided and not 'all'):
    if (category && category !== 'all') {
        query.category = category;
    }

    // 2. Apply Search Filter (if 'search' query parameter is provided):
    if (search) {
        // Use MongoDB's $or operator to search across multiple fields (title and description)
        // $regex provides pattern matching, and $options: 'i' makes the search case-insensitive
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    // 3. Apply Sorting Logic:
    let sortOptions = { createdAt: -1 }; // Default sort: most recent first (descending by creation date)
    if (sort === 'upvotes') {
        sortOptions = { upvotes: -1 }; // Sort by 'upvotes' in descending order
    }

    try {
        // Find documents based on the constructed 'query' object, then apply 'sortOptions'
        const feedbacks = await Feedback.find(query).sort(sortOptions);
        res.json(feedbacks); // Send the retrieved feedbacks as JSON
    } catch (err) {
        console.error('Error fetching feedback:', err.message);
        res.status(500).json({ message: 'Server error fetching feedback.' });
    }
});

// @route   POST /api/feedback
// @desc    Submit new feedback item
// @access  Public
router.post('/', async (req, res) => {
    const { title, description, category } = req.body;

    // Basic validation for required fields
    if (!title || !description || !category) {
        return res.status(400).json({ message: 'Please provide title, description, and category.' });
    }

    try {
        // Create a new feedback document in the MongoDB collection
        const feedback = await Feedback.create({
            title,
            description,
            category,
            upvotes: 0,   // Initialize upvotes count to 0
            voters: []    // Initialize an empty array to track voters (by their unique ID)
        });
        // Send a success response with the virtual 'id' of the newly created feedback
        res.status(201).json({ message: 'Feedback submitted successfully', id: feedback.id });
    } catch (err) {
        console.error('Error submitting feedback:', err.message);
        res.status(500).json({ message: 'Server error during feedback submission.' });
    }
});

// @route   POST /api/feedback/:id/upvote
// @desc    Toggle upvote for a feedback item (add vote if not voted, remove vote if already voted)
// @access  Public
router.post('/:id/upvote', async (req, res) => {
    const { id } = req.params;     // Feedback item ID (MongoDB _id or virtual id) from URL
    const { voterId } = req.body; // Unique ID from the frontend to identify the voter

    // Validate that voterId is provided
    if (!voterId) {
        return res.status(400).json({ message: 'Voter ID is required.' });
    }

    try {
        // Find the feedback item by its MongoDB _id
        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found.' });
        }

        let message;         // Message to send back to frontend
        let updateOperation; // MongoDB update operation object

        // Check if this voterId already exists in the feedback's 'voters' array
        if (feedback.voters.includes(voterId)) {
            // Voter has already upvoted, so decrement upvotes and remove voterId
            message = 'Upvote removed successfully';
            updateOperation = {
                $inc: { upvotes: -1 },       // Decrement upvotes by 1
                $pull: { voters: voterId }   // Remove voterId from the 'voters' array
            };
        } else {
            // Voter has not upvoted, so increment upvotes and add voterId
            message = 'Feedback upvoted successfully';
            updateOperation = {
                $inc: { upvotes: 1 },         // Increment upvotes by 1
                $addToSet: { voters: voterId } // Add voterId to 'voters' array if not already present
            };
        }

        // Perform the atomic update operation on the feedback document
        const updatedFeedback = await Feedback.findByIdAndUpdate(
          id,             // Document ID
          updateOperation, // The update to apply
          { new: true }   // Return the updated document after the operation
        );

        // Send a success response with a message and the new upvote count
        res.status(200).json({
            message: message,
            newUpvotes: updatedFeedback.upvotes
        });

    } catch (err) {
        console.error('Error toggling upvote:', err.message);
        // Handle specific Mongoose CastError if the provided ID is not a valid MongoDB ObjectId
        if (err.name === 'CastError') {
          return res.status(400).json({ message: 'Invalid feedback ID format.' });
        }
        res.status(500).json({ message: 'Server error during upvote toggle.' });
    }
});

module.exports = router;