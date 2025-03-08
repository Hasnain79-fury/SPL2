const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'RegisteredUser', required: true },
  rating: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Rating', ratingSchema);