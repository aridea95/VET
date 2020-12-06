const { Router } = require('express');
const router = Router();
const ChatController = require('../controllers/Chat');

const { Authentication } = require('../middlewares/auth');

router.get('/', Authentication, ChatController.getChatRoomByUserId)
router.get('/:roomId', Authentication, ChatController.getConversationByRoomId);
router.post('/initiate/:user2', Authentication, ChatController.initiateChat);
router.post('/message/:roomId', Authentication, ChatController.postMessage);

module.exports = router;