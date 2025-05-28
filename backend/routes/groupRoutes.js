const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/groupController');

router.get('/', auth, ctrl.getGroups);
router.post('/', auth, ctrl.createGroup);
router.post('/join/:id', auth, ctrl.joinGroup);


module.exports = router;