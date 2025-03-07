const mongoose = require('mongoose');

const favoriteListSchema = new mongoose.Schema({
  fav_list_name: { type: String, required: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'RegisteredUser' }
}, { timestamps: true });

module.exports = mongoose.model('FavoriteList', favoriteListSchema);
