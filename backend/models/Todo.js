const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  description: { type: String, required: true },
  completado: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' , default:null},
  createdAt:{type:Date, default: Date.now},
  fechaHoraCompletado:{ type:Date,default:null},
  usuarioCompleta:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Todo', todoSchema);