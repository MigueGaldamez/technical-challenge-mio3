const groupDetailSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, default: 'member' }, // e.g. admin, member
  notificationSettings: {
    receiveNotifications: { type: Boolean, default: true },
    // other prefs
  }
});

const GroupDetail = mongoose.model('GroupDetail', groupDetailSchema);