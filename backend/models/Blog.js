const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  blog_id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  blog_text: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],  // Reference to Comment model
  rating_point: { type: Number, default: 0 },
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'RegisteredUser' }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);