const Group = require('../models/Group');


exports.getGroups = async (req, res) => {
  const todos = await Group.find({ members: req.user.userId });
  res.json(todos);
};

exports.createGroup = async (req, res) => {
  const todo = new Group({ name: req.body.text, description: req.body.description, members:[req.user.userId] });
  await todo.save();
  res.status(201).json(todo);
};

