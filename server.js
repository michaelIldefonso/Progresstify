// // index.js
// const express = require('express');
// const path = require('path');
// const { connectDB } = require('./src/config/db'); // Import DB connection setup
// const userRoutes = require('./src/routes/userRoutes'); // Import user routes

// const app = express();
// const port = 3000;

// // Connect to the database
// connectDB();

// // Set up routes
// app.use('/api', userRoutes); // Mount user-related routes under /api

// app.use(express.static(path.join(__dirname, './src/public')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './src/public', 'login.html'));
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

//=============================================
// const express = require('express');
// const pool = require('./config/db');
// const path = require('path');

// const app = express();
// const PORT = 5000;

// app.use(express.static(path.join(__dirname, './src/public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './src/public', 'login.html'));
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


//==============================\
const express = require('express');
const session = require('express-session');
const passport = require('./src/config/auth');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
