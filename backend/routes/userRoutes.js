const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to get user profile
router.get('/profile/:id', authMiddleware, getUserProfile);

module.exports = router;
