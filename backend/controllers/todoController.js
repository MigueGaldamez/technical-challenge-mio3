const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.userId });
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const todo = new Todo({ text: req.body.text, user: req.userId });
  await todo.save();
  res.status(201).json(todo);
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  const result = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!result) return res.status(404).json({ message: 'Todo not found' });
  res.status(204).end();
};
