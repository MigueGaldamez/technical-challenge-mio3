const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const notificationSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  description: { type: String, default: 'Nueva Tarea Registrada' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const notificationDetailSchema = new mongoose.Schema({
  notificationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Notification', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  description: { type: String, required: true },
  completado: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', default: null },
  createdAt: { type: Date, default: Date.now },
  fechaHoraCompletado: { type: Date, default: null },
  usuarioCompleta: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const User = mongoose.model('User', userSchema);
const Group = mongoose.model('Group', groupSchema);
const Notification = mongoose.model('Notification', notificationSchema);
const NotificationDetail = mongoose.model('NotificationDetail', notificationDetailSchema);
const Todo = mongoose.model('Todo', todoSchema);

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/tododb', {
   
  });

  await User.deleteMany({});
  await Group.deleteMany({});
  await Notification.deleteMany({});
  await NotificationDetail.deleteMany({});
  await Todo.deleteMany({});

  const usuarios = await User.insertMany([
    { username: 'Miguel', password: '$2b$10$oWbI4tnoeg9lKJmlA4Oaeu5V2cCgtrWIWAIZhD3QYrD4snmTAr8iO' },
    { username: 'Admin', password: '$2b$10$5c2nkhaz5fFOnhBzaj1c5.TrUeCgtsSqiqe2SdiptwlqkV5BKAGRO' },
    { username: 'Test', password: '$2b$10$y7u2wFBUZq8jXtNCwVWae.YGThqJtJtadpK/5zLWPob7mwss06Etu' },
  ]);

  //tareas del usuario Miguel
  const todoUs1 = await Todo.create({
    text: 'Crear Diseño Inicial',
    description: 'Css, y estrucutra inicial',
    user: usuarios[0]._id,
    group:null,
    createdAt:new Date(),
    completado:true,
    fechaHoraCompletado: new Date(),
    usuarioCompleta:usuarios[0]._id
  },{
    text: 'Añadir Nav Bar',
    description: 'Para navegar detro de la app',
    user: usuarios[0]._id,
    group:null,
  },{
    text: 'Apartado de Notificaciones',
    description: 'Para las tareas de los grupos.',
    user: usuarios[0]._id,
    group:null,
  },{
    text: 'Crear Modelo de Grupos',
    description: 'Para manejar los grupos',
    user: usuarios[0]._id,
    group:null,
    createdAt:new Date(),
    completado:true,
    fechaHoraCompletado: new Date(),
    usuarioCompleta:usuarios[0]._id
  });
  

  const grupo1 = await Group.create({
    name: 'Equipo de Desarrollo',
    description: 'Grupo de programadores para el proyecto X',
    members: [usuarios[0]._id, usuarios[1]._id],
    owner: usuarios[0]._id,
  });

  const grupo2 = await Group.create({
    name: 'Marketing',
    description: 'Equipo de marketing y ventas',
    members: [usuarios[1]._id, usuarios[2]._id],
    owner: usuarios[1]._id,
  });

  // Crear tareas (todos)
  const todo1 = await Todo.create({
    text: 'Diseñar la interfaz de usuario',
    description: 'Crear el diseño inicial para la app móvil',
    user: usuarios[0]._id,
    group: grupo1._id,
  });

  const todo2 = await Todo.create({
    text: 'Preparar campaña de lanzamiento',
    description: 'Definir los canales y materiales para la campaña',
    user: usuarios[1]._id,
    group: grupo2._id,
  });

  // Crear notificaciones
  const notificacion1 = await Notification.create({
    groupId: grupo1._id,
    description: 'Nueva Tarea Registrada',
    userId: usuarios[0]._id,
  });

  // Crear detalles de notificación
  await NotificationDetail.create({
    notificationId: notificacion1._id,
    userId: usuarios[1]._id,
    read: false,
  });

  console.log('Datos iniciales insertados correctamente.');

  await mongoose.disconnect();
}

seed().catch(console.error);