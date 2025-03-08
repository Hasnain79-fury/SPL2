const Forum = require('../models/Forum');

// Show the form to create a new forum post
exports.showCreateForumForm = (req, res) => {
  res.render('pages/create-forum');
};

// Create a new forum post
exports.createPost = async (req, res) => {
  const { title, content, tags } = req.body;
  const authorId = req.user?.userId || req.user?._id; // Get the author ID from req.user

  if (!authorId) {
    return res.status(403).send('You must be logged in to create a forum post.');
  }

  try {
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
    const newForumPost = new Forum({
      title,
      content,
      tags: tagsArray,
      author: authorId,
    });

    await newForumPost.save(); // Save the forum post to the database
    res.redirect('/forums'); // Redirect to the forums listing page
  } catch (error) {
    console.error('Error creating forum post:', error);
    res.status(500).send('Server error while creating forum post.');
  }
};

// Get all forum posts
exports.getAllPosts = async (req, res) => {
  try {
    const forumPosts = await Forum.find().populate('author').populate('comments');
    res.render('pages/forums', { forumPosts });
  } catch (error) {
    console.error('Error fetching forum posts:', error);
    res.status(500).send('Server error while fetching forum posts.');
  }
};

// Get a single forum post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const forumPost = await Forum.findById(id).populate('author').populate('comments');
    if (!forumPost) {
      return res.status(404).send('Post not found');
    }
    res.render('pages/forum-details', { forumPost });
  } catch (error) {
    console.error('Error fetching forum post:', error);
    res.status(500).send('Server error while fetching forum post.');
  }
};

// Update a forum post
exports.updatePost = async (req, res) => {
  try {
    const forumPost = await Forum.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!forumPost) {
      return res.status(404).send('Post not found');
    }
    res.status(200).json(forumPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a forum post
exports.deletePost = async (req, res) => {
  try {
    const forumPost = await Forum.findByIdAndDelete(req.params.id);
    if (!forumPost) {
      return res.status(404).send('Post not found');
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};