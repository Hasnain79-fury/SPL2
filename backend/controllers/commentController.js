const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const userId = req.user?._id;

  console.log('Blog ID:', id);
  console.log('Comment Text:', text);
  console.log('User ID:', userId);


  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Comment text cannot be empty.' });
  }

  try {
    const newComment = new Comment({
      text: text.trim(),
      author: userId,
      blog: id,
    });

    const savedComment = await newComment.save();

    await Blog.findByIdAndUpdate(id, { $push: { comments: savedComment._id } });

    res.status(201).json({ message: 'Comment added successfully.', comment: savedComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Server error while adding comment.' });
  }
};
