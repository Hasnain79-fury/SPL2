const mongoose = require('mongoose');

const registeredUserSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  favoriteList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FavoriteList' }],
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('RegisteredUser', registeredUserSchema);
