const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('./src/config/auth');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(path.join(__dirname, './src/public')));

// Default route to serve login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/public', 'login.html'));
});

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
