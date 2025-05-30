const Todo = require('../models/Todo');
const Group = require('../models/Group');
const User = require('../models/User');
const NotificationDetail = require('../models/NotificationDetail')
const Notification = require('../models/Notification');

const { getIO } = require('../socket');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.userId , group:null});
  res.json(todos);
};

exports.getTodosGrupo = async (req, res) => {
  const todos = await Todo.find({ group:req.params.id}).populate('user').populate('usuarioCompleta');
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const todo = new Todo({ text: req.body.text, user: req.user.userId, group:req.body.group? req.body.group : null,description:req.body.description });

  await todo.save();
  if(req.body.group!='' && req.body.group != null){
     const grupo = await Group.findOne({ _id: req.body.group });
     const user = await User.findOne({ _id: req.user.userId });
     const noti = new Notification({ groupId: req.body.group, description: "Nueva Tarea en " +grupo.name + " por "+user.username, userId:req.user.userId});
    await noti.save();

      for (const x of grupo.members) {
        const us = await User.findOne({ _id: x });
        if(us._id != req.user.userId){
          const notificationDet = new NotificationDetail({ notificationId:noti._id, userId:us._id,read:false});
          await notificationDet.save();
        }
      }
    getIO().emit('notification', { message: 'Lista actualizada!' });
  }
  res.status(201).json(todo);
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user.userId },
    req.body,
    { new: true, runValidators: true } 
  );

  if (!todo) return res.status(404).json({ message: 'Tarea No encontrada' });
  const resp = todo.populate('user').populate('usuarioCompleta');
  res.json(resp);
};

exports.deleteTodo = async (req, res) => {
  const result = await Todo.findOneAndDelete({ _id: req.params.id });
  if (!result) return res.status(404).json({ message: 'Tarea no encontrada' });
  res.status(204).end();
};

exports.completarTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id });

  if (!todo) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }

  todo.completado = !todo.completado;
  if(todo.completado){
  todo.usuarioCompleta = req.user.userId;
  todo.fechaHoraCompletado = new Date();
  }else{
    todo.usuarioCompleta = null;
  todo.fechaHoraCompletado = null;
  }
  if(todo.group!=null){
    const grupo = await Group.findOne({ _id: todo.group });
    const user = await User.findOne({ _id: req.user.userId });
     const noti = new Notification(
      { 
        groupId:  todo.group, 
        description: user.username + " marcó como " + (todo.completado? 'Completada':'Pendiente')+ " una tarea en "+grupo.name, 
        userId:req.user.userId
      });
    await noti.save();

      for (const x of grupo.members) {
        const us = await User.findOne({ _id: x });
        if(us._id != req.user.userId){
          const notificationDet = new NotificationDetail({ notificationId:noti._id, userId:us._id,read:false});
          await notificationDet.save();
        }
      }
    getIO().emit('notification', { message: 'Lista Actualzada!' });
  }

  await todo.save();
  await todo.populate(['user', 'usuarioCompleta']);

  res.json(todo);
};
