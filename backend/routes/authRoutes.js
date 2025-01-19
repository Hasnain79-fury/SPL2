const express = require('express');
const { signup, login, logout } = require('../controllers/userController');
const { sendPasswordReset, resetPasswordForm, resetPassword } = require('../controllers/userController');
const router = express.Router();

// GET Login page (render login form)
router.get('/login', (req, res) => res.render('pages/login', { error: null }));

// POST Login request (process login form)
router.post('/login', login);  // This handles the form submission

// GET Signup page (render signup form)
router.get('/signup', (req, res) => res.render('pages/signup', { error: null }));

// POST Signup request (process signup form)
router.post('/signup', signup);

// GET Logout route
router.get('/logout', logout);


// Route to display the password reset request page
router.get('/request-reset', (req, res) => res.render('pages/request-reset'));

// Route to handle password reset request form submission
router.post('/request-reset', sendPasswordReset);

// Route to display reset password form with token
router.get('/reset-password/:token', resetPasswordForm);

// Route to handle new password submission
router.post('/reset-password/:token', resetPassword);

module.exports = router;
