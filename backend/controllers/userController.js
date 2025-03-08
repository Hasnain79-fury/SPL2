// controllers/userController.js
const RegisteredUser = require('../models/RegisteredUser');
const Blog = require('../models/Blog');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');  // Use for sending emails
const mongoose = require('mongoose');
const FavoriteList = require('../models/FavoriteList');

// Signup Handler
exports.signup = async (req, res) => {
  const { user_id, username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await RegisteredUser.findOne({ email });
    if (existingUser) return res.status(400).render('pages/signup', { error: 'User already exists!' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new RegisteredUser({ user_id, username, email, password: hashedPassword });
    await newUser.save();

    res.redirect('/'); // Redirect to login after successful signup
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).send('Server error during signup.');
  }
};

// Login Handler
// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await RegisteredUser.findOne({ email });
    if (!user) return res.status(400).render('pages/login', { error: 'Invalid email or password!' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).render('pages/login', { error: 'Invalid email or password!' });

    // Generate JWT token with the username
    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in the cookie
    res.cookie('token', token, { httpOnly: true }).redirect('/');
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).send('Server error during login.');
  }
};

// Logout Handler
exports.logout = (req, res, next) => {
  try {
    res.clearCookie('token');
    return res.redirect('/');  // Use `return` to ensure only one response is sent
  } catch (error) {
    next(error);  // Pass errors to an error handler if needed
  }
};

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send reset email
exports.sendPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await RegisteredUser.findOne({ email });
    if (!user) return res.status(404).send('User not found.');

    // Generate a reset token
    const token = crypto.randomBytes(32).toString('hex');

    // Set token and expiration
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email with the reset link
    const resetUrl = `http://localhost:5000/auth/reset-password/${token}`;
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You requested a password reset. Please click the link to reset your password: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);
    res.send('Password reset email sent.');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).send('Server error.');
  }
};

// 2. Display Reset Password Form
exports.resetPasswordForm = async (req, res) => {
  const { token } = req.params;

  try {
    // Find user by reset token and ensure token is still valid
    const user = await RegisteredUser.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).render('pages/error', { message: 'Invalid or expired token.' });
    }

    // Pass the token to the view so it can be used in the form
    res.render('pages/reset-password', { token });
  } catch (error) {
    console.error('Error displaying reset form:', error);
    res.status(500).render('pages/error', { message: 'Server error. Please try again later.' });
  }
};

// 3. Handle New Password Submission
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await RegisteredUser.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).send('Invalid or expired token.');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.send('Password reset successful. You can now log in with your new password.');
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Server error.');
  }
};

exports.getUserProfile = async (req, res) => {
  const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid user ID format');
  }


  try {
   
   console.log('Request Params:', req.params); 
       const userId = req.params.id; // Correctly retrieve userId from req.params.id
       console.log('User ID:', userId); // Debugging line to check userId
   
       // Find the user by the default _id field
       const user = await RegisteredUser.findById(userId);
       if (!user) {
         return res.status(404).json({ error: 'User not found' });
       }
   
       // Find favorite lists by the user's ObjectId
       const favoriteLists = await FavoriteList.find({ user: user._id }).populate('blogs');

    res.render('pages/user-profile', { favoriteLists, user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).send('Server error while fetching user profile.');
  }
};