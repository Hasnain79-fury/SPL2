const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/forums/create', authMiddleware, forumController.showCreateForumForm);
router.post('/forums', authMiddleware, forumController.createPost);
router.get('/forums', forumController.getAllPosts);
router.get('/forums/:id', forumController.getPostById);
router.put('/forums/:id', authMiddleware, forumController.updatePost);
router.delete('/forums/:id', authMiddleware, forumController.deletePost);
router.post('/forums/:id/comments', authMiddleware, forumController.addComment); // Add this line

module.exports = router;