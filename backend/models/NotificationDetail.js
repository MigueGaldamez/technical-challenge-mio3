const mongoose = require('mongoose');

const NotificationDetailSchema = new mongoose.Schema({
  notificationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Notification', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  read: { type: Boolean, default: false }, // e.g. admin, member
  notificationSettings: {
    receiveNotifications: { type: Boolean, default: true },
    // other prefs
  }
});
module.exports = mongoose.model('NotificationDetail', NotificationDetailSchema);