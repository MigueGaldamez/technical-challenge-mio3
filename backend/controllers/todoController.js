const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.userId , group:null});
  res.json(todos);
};

exports.getTodosGrupo = async (req, res) => {
  const todos = await Todo.find({ group:req.params.id});
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const todo = new Todo({ text: req.body.text, user: req.user.userId, group:req.body.group? req.body.group : null });
  await todo.save();
  res.status(201).json(todo);
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user.userId },
    req.body,
    { new: true }
  );
  if (!todo) return res.status(404).json({ message: 'Todo not found' });
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  const result = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
  if (!result) return res.status(404).json({ message: 'Todo not found' });
  res.status(204).end();
};

exports.completarTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user.userId });

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todo.completado = !todo.completado;
  if(todo.completado){
  todo.usuarioCompleta = req.user.userId;
  todo.fechaHoraCompletado = new Date();
  }else{
    todo.usuarioCompleta = null;
  todo.fechaHoraCompletado = null;
  }


  await todo.save();
  res.json(todo);
};
