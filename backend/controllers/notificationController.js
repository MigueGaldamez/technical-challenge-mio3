const Todo = require('../models/Todo');
const NotificationDetail = require('../models/NotificationDetail');

const { getIO } = require('../socket');

exports.getNotifications = async (req, res) => {
  const todos = await NotificationDetail.find({ userId: req.user.userId, read:false }).populate('notificationId').sort({ createdAt: -1 });
  res.json(todos);
};

exports.readNotification = async (req, res) => {
  const todos = await NotificationDetail.findOne(
    { userId: req.user.userId,_id:req.params.id })
    ;
  todos.read = true;
  await todos.save();
  res.json(todos);
};