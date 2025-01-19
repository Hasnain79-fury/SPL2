const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  forum_id: { type: String, required: true, unique: true },
  forum_tag: [String],
  forum_view: { type: Number, default: 0 },
  forum_post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

module.exports = mongoose.model('Forum', forumSchema);
