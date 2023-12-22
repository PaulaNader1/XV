// routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController'); ////PATHHHHH

// API route for sending messages
router.post('/send-message', chatController.sendMessage);

module.exports = router;
