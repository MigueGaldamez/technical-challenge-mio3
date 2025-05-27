const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const todoCtrl = require('../controllers/todoController');

router.get('/', auth, todoCtrl.getTodos);
router.post('/', auth, todoCtrl.createTodo);
router.put('/:id', auth, todoCtrl.updateTodo);
router.delete('/:id', auth, todoCtrl.deleteTodo);

router.post('/completar/:id', auth, todoCtrl.completarTodo);
router.get('/grupo/:id', auth, todoCtrl.getTodosGrupo);


module.exports = router;