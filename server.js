
const express = require('express');
const { connectDB } = require('./config/db'); // Import DB connection setup
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();
const port = 3000;

// Connect to the database
connectDB();

// Set up routes
app.use('/api', userRoutes); // Mount user-related routes under /api

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
