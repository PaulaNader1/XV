const express = require('express');
const router = express.Router();
const managerController = require('../controller/managerController');
const adminController = require('../controller/adminController');
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

// Route to get all tickets
router.get('/tickets', managerController.getAllTickets);

// Route to get a specific ticket by ticketId
router.get('/tickets/:ticketId',  authorizationMiddleware(['manager']), managerController.getTicketById);

router.get("/ticket-Analytics",  authorizationMiddleware(['manager']), managerController.ticketAnalytics);

router.get("/generateReports/:id", authorizationMiddleware(['manager']), managerController.generateReports);
// router.get("/ticket/:id/generate-Reports",  authorizationMiddleware(['manager']), managerController.generateReports);
// router.get('/generateReports/:ticketid', managerController.generateReports);


module.exports = router;