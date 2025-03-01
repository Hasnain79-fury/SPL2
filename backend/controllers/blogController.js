const Blog = require('../models/Blog');
const RegisteredUser = require('../models/RegisteredUser');

// Show the form to create a new blog post
exports.showCreateBlogForm = (req, res) => {
  res.render('pages/create-blog');
};

// Handle blog post creation
exports.createBlog = async (req, res) => {
  const { title, blog_text, tags } = req.body;
  const authorId = req.user?.userId || req.user?._id; // Get the author ID from req.user
 

  if (!authorId) {
    return res.status(403).send('You must be logged in to create a blog post.');
  }

  try {
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    const newBlog = new Blog({
      blog_id: `BLOG-${Date.now()}`, // Generate unique blog ID
      title,
      blog_text,
      tags: tagsArray,
      author: authorId, // Assign the author ID
    });

    await newBlog.save(); // Save the blog post to the database
    res.redirect('/'); // Redirect to the blogs listing page
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).send('Server error while creating blog post.');
  }
};


/*// Fetch and display all blogs without comments
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username') 
   // console.log(blogs);

    res.render('pages/blogs', { blogs });  // Pass blogs to the template
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Server error while fetching blogs.');
  }
};*/

// Fetch and display all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', '_id username') // Populate author details
      .populate({
        path: 'comments',
        populate: { path: 'author', select: '_id username' }, // Populate comment author details
      });

    res.render('pages/blogs', { blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Server error while fetching blogs.');
  }
};

// Fetch and display details of a specific blog
exports.getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id)
      .populate('author', '_id username')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' },
      });

    res.render('pages/blog-details', { blog });
  } catch (error) {
    console.error('Error fetching blog details:', error);
    res.status(500).send('Server error while fetching blog details.');
  }
};

// Search blogs by title
exports.searchBlogsByTitle = async (req, res) => {
  const { title } = req.query;

  try {
    const blogs = await Blog.find({ title: new RegExp(title, 'i') })
      .populate('author', '_id username')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: '_id username' },
      });

    res.render('pages/blogs', { blogs });
  } catch (error) {
    console.error('Error searching blogs:', error);
    res.status(500).send('Server error while searching blogs.');
  }
};