const express = require("express");
const agentController = require("../controller/agentController");
const authorizationMiddleware = require('../Middleware/authorizationMiddleware')
const router = express.Router();

router.put('/closeTicket/:ticketId', authorizationMiddleware(['manager', 'admin', 'agent']), agentController.closeTicket);

router.get("/getOpenedTickets", authorizationMiddleware(['manager', 'admin', 'agent']), agentController.getAllOpenedTickets);
router.put("/changeTicketPriority/:id/:priority", authorizationMiddleware(['manager', 'admin', 'agent']), agentController.changeTicketPriority);

router.get("/provideCwf", agentController.provideCwf);

module.exports = router;