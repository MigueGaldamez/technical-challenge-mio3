const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/notificationController');

router.get('/', auth, ctrl.getNotifications);
router.get('/:id', auth, ctrl.readNotification);


module.exports = router;