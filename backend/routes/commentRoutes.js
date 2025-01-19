const express = require('express');
const { addComment, getBlogComments } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to fetch comments for a blog
//router.get('/:id/comments', getBlogComments);

// Route to add a comment to a blog
router.post('/:id/comments', authMiddleware, addComment);

module.exports = router;
