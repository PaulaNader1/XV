const express = require('express');
const router = express.Router();
const agentController = require('../controller/agentController');
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

router.put('/tickets/:ticketId/close', authorizationMiddleware(['agent']), agentController.closeTicket);

router.get("/provideCwf", authorizationMiddleware(['agent']), agentController.provideCwf)


module.exports = router;