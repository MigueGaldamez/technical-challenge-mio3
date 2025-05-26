const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completado: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fechaHoraCompletado:{ type:Date,default:null},
  usuarioCompleta:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Todo', todoSchema);