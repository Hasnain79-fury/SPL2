const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
  rating_point: { type: Number, required: true },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'RegisteredUser' }
});

module.exports = mongoose.model('Ranking', rankingSchema);
