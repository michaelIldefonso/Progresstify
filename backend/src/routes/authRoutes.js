const express = require('express');
const passport = require('passport');
const path = require('path');

const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);


router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.sendFile(path.join(__dirname, '../public/home.html')); // Serve home.html after login
    }
);


module.exports = router;
