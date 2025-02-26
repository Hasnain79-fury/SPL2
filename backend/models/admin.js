const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Admin', adminSchema);
