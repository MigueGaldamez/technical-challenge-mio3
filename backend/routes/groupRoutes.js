const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/groupController');

router.get('/', auth, ctrl.getGroups);
router.post('/', auth, ctrl.createGroup);

module.exports = router;