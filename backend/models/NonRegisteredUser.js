const mongoose = require('mongoose');

const nonRegisteredUserSchema = new mongoose.Schema({
  temporaryID: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('NonRegisteredUser', nonRegisteredUserSchema);
