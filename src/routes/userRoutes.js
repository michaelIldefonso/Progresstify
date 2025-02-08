// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers } = require('../models/user'); // Import model function to get users

// Route to fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await getUsers(); // Get users from the model
    res.json(users); // Send users as JSON response
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router; // Export the route for use in the app
