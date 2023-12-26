const express = require('express');
const router = express.Router();

// Assuming chatController is properly defined and exported
const chatController = require('../controller/chatController');

// Assuming authorizationMiddleware is properly defined and exported
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

router.post('/send-message', authorizationMiddleware(['agent', 'user']), chatController.sendMessage);
router.post('/start-chat',  authorizationMiddleware(['user']), chatController.createChat);
router.post('/read-message', authorizationMiddleware(['user', 'agent']), chatController.readMessage);
router.post('/determine-agent', authorizationMiddleware(['admin']), chatController.determineAgent);


// router.post('/send-message', chatController.sendMessage);

module.exports = router;
