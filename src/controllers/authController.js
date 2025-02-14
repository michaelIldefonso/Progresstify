const passport = require('passport');

const authController = {
    googleLogin: passport.authenticate('google', { scope: ['profile', 'email'] }),

    googleCallback: passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/dashboard'
    })
}