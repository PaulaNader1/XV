const express = require('express');
const router = express.Router();
const managerController = require('../controller/managerController');
const adminController = require('../controller/adminController');
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

router.get('/tickets', authorizationMiddleware(['manager']), managerController.getAllTickets);

router.get('/tickets/:ticketId',  authorizationMiddleware(['manager']), managerController.getTicketById);

router.get("/ticket-Analytics",  authorizationMiddleware(['manager']), managerController.ticketAnalytics);

router.get("/generateReports/:id", authorizationMiddleware(['manager']), managerController.generateReports);


module.exports = router;