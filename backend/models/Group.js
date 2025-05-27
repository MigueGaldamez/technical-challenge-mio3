const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // array of user IDs
});

module.exports = mongoose.model('Group', groupSchema);


