const express = require('express');
const { showCreateBlogForm, createBlog, getAllBlogs, getBlogById,searchBlogsByTitle, updateRating } = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');
const commentRoutes = require('./commentRoutes');

const router = express.Router();

// Show form to create a blog
router.get('/create', authMiddleware, showCreateBlogForm);

// Handle blog post submission
router.post('/', authMiddleware, createBlog);

// Route to display all blog posts
router.get('/show', getAllBlogs);// Add this route before the route to fetch a specific blog by ID
router.get('/search', searchBlogsByTitle);



// Route to fetch a specific blog by ID
router.get('/:id', getBlogById);


// Add a new route to handle rating updates

// Add a new route to handle rating updates
router.post('/update-rating', authMiddleware, updateRating);


// Mount comment routes for a specific blog
router.post('/:id/comments', commentRoutes);
router.use('/:id/comments', commentRoutes);

module.exports = router;
