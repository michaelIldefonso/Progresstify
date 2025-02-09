// index.js
const express = require('express');
const path = require('path');
const { connectDB } = require('./src/config/db'); // Import DB connection setup
const userRoutes = require('./src/routes/userRoutes'); // Import user routes

const app = express();
const port = 3000;

// Connect to the database
connectDB();

// Set up routes
app.use('/api', userRoutes); // Mount user-related routes under /api

app.use(express.static(path.join(__dirname, './src/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './src/public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
