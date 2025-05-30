const mongoose = require('mongoose');

const groupDetailSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, default: 'member' }, 
  notificationSettings: {
    receiveNotifications: { type: Boolean, default: true },
  }
});

const GroupDetail = mongoose.model('GroupDetail', groupDetailSchema);