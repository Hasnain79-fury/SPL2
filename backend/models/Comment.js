const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'RegisteredUser' },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
