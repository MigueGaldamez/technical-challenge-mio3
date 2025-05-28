const Todo = require('../models/Todo');
const Notification = require('../models/Notification');

const { getIO } = require('../socket');

exports.createNotification = async (req, res) => {
  const todo = new Notification({ groupId: req.body.text, description: req.body.description, userId:req.user.userId});
  await todo.save();
  res.status(201).json(todo);
};