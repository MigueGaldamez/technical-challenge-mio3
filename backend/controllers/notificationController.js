const Todo = require('../models/Todo');
const NotificationDetail = require('../models/NotificationDetail');

const { getIO } = require('../socket');

exports.getNotifications = async (req, res) => {
  const todos = await NotificationDetail.find({ userId: req.user.userId, read:false }).populate('notificationId');
  res.json(todos);
};