// backend/routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Correctly import the database connection pool

// Route to get all feedback items (with category, sort, and search filters)
router.get('/', async (req, res) => {
    const { category, sort, search } = req.query; // Destructure all query parameters

    let query = `
        SELECT
            f.*,
            COUNT(u.feedback_id) AS upvotes
        FROM
            feedback f
        LEFT JOIN
            upvotes_log u ON f.id = u.feedback_id
    `;
    const queryParams = [];
    const conditions = [];

    // Add category filter condition
    if (category && category !== 'all') {
        conditions.push('f.category = ?');
        queryParams.push(category);
    }

    // Add search condition (case-insensitive search on title or description)
    if (search) {
        conditions.push('(f.title LIKE ? OR f.description LIKE ?)');
        queryParams.push(`%${search}%`, `%${search}%`);
    }

    // Apply WHERE clause if any conditions exist
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    // Group by feedback ID to count upvotes for each unique feedback
    query += ' GROUP BY f.id';

    // Add sorting logic
    if (sort === 'upvotes') {
        query += ' ORDER BY upvotes DESC';
    } else { // Default to 'recent' (created_at)
        query += ' ORDER BY f.created_at DESC';
    }

    try {
        // Use db.execute for prepared statements with placeholders
        const [rows] = await db.execute(query, queryParams);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching feedback:', err);
        res.status(500).json({ message: 'Server error fetching feedback.' });
    }
});

// Route to submit new feedback
router.post('/', async (req, res) => {
    const { title, description, category } = req.body; // Extract data from request body

    // Basic validation
    if (!title || !description || !category) {
        return res.status(400).json({ message: 'Please provide title, description, and category.' });
    }

    try {
        const sql = 'INSERT INTO feedback (title, description, category, upvotes) VALUES (?, ?, ?, 0)';
        const [result] = await db.execute(sql, [title, description, category]); // Use db.execute
        res.status(201).json({ message: 'Feedback submitted successfully', id: result.insertId });
    } catch (err) {
        console.error('Error submitting feedback:', err);
        res.status(500).json({ message: 'Server error during feedback submission.' });
    }
});

// Route to handle upvoting feedback
router.post('/:id/upvote', async (req, res) => {
    const { id } = req.params; // Feedback ID from URL
    const { voterId } = req.body; // Unique identifier from the client (e.g., stored in localStorage)

    if (!voterId) {
        return res.status(400).json({ message: 'Voter ID is required.' });
    }

    let connection;
    try {
        connection = await db.getConnection(); // Get a connection from the pool
        await connection.beginTransaction(); // Start a transaction

        // 1. Check if this voter has already upvoted this feedback
        const [existingVote] = await connection.execute( // Use connection.execute
            'SELECT id FROM upvotes_log WHERE feedback_id = ? AND voter_identifier = ?',
            [id, voterId]
        );

        if (existingVote.length > 0) {
            await connection.rollback(); // Rollback if already voted
            return res.status(409).json({ message: 'You have already upvoted this item.' });
        }

        // 2. Record the upvote in the upvotes_log table
        await connection.execute( // Use connection.execute
            'INSERT INTO upvotes_log (feedback_id, voter_identifier) VALUES (?, ?)',
            [id, voterId]
        );

        // 3. Increment the upvotes count in the feedback table
        await connection.execute( // Use connection.execute
            'UPDATE feedback SET upvotes = upvotes + 1 WHERE id = ?',
            [id]
        );

        await connection.commit(); // Commit the transaction
        res.status(200).json({ message: 'Feedback upvoted successfully' });

    } catch (err) {
        if (connection) {
            await connection.rollback(); // Rollback on error
        }
        console.error('Error upvoting feedback:', err);
        // Specifically check for duplicate entry error if UNIQUE constraint on upvotes_log somehow fails
        if (err.code === 'ER_DUP_ENTRY') {
             return res.status(409).json({ message: 'You have already upvoted this item (duplicate entry caught).' });
        }
        res.status(500).json({ message: 'Server error during upvote' });
    } finally {
        if (connection) {
            connection.release(); // Release the connection back to the pool
        }
    }
});

module.exports = router;