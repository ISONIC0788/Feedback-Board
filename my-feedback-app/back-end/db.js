// backend/db.js
require('dotenv').config(); // Load environment variables from .env

const mysql = require('mysql2/promise'); // Use the promise-based version

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Max number of connections in the pool
    queueLimit: 0        // No limit on connection requests queue
});

module.exports = pool;