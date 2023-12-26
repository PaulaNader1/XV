const userModel = require("../Models/userModel");
const ticketModel = require("../Models/ticketModel");
const agentModel = require("../Models/agentModel");
const knowledgeBaseModel = require("../Models/knowledgeBaseModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");


const managerController = {
    ticketAnalytics: async (req, res) => {
        try {
            const highPriorityCount = await ticketModel.countDocuments({ priority: "high" });
            const mediumPriorityCount = await ticketModel.countDocuments({ priority: "medium" });
            const lowPriorityCount = await ticketModel.countDocuments({ priority: "low" });

            const openStatusCount = await ticketModel.countDocuments({ status: "opened" });
            const closedStatusCount = await ticketModel.countDocuments({ status: "closed" });
            const inProgressStatusCount = await ticketModel.countDocuments({ status: "pending" });

            const softwareCategoryCount = await ticketModel.countDocuments({ category: "Software" });
            const hardwareCategoryCount = await ticketModel.countDocuments({ category: "Hardware" });
            const networkCategoryCount = await ticketModel.countDocuments({ category: "Network" });

            return res.status(200).json({
                priorityCounts: {
                    highPriorityCount,
                    mediumPriorityCount,
                    lowPriorityCount,
                },
                statusCounts: {
                    openStatusCount,
                    closedStatusCount,
                    inProgressStatusCount,
                },
                categoryCounts: {
                    softwareCategoryCount,
                    hardwareCategoryCount,
                    networkCategoryCount,
                },
            });
        } catch (error) {
            console.error('Error in ticket analytics:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },



    // generateReports: async (req, res) => {
    //     try {
    //         try {
    //             const { ticketid } = req.params;

    //             // Check if the ticket ID is valid
    //             if (!mongoose.Types.ObjectId.isValid(ticketid)) {
    //                 return res.status(400).json({ error: 'Invalid ticket ID' });
    //             }

    //             // Find the ticket by ID
    //             const ticket = await ticketModel.findById(ticketid);

    //             // Check if the ticket exists
    //             if (!ticket) {
    //                 return res.status(404).json({ error: 'Ticket not found' });
    //             }

    //             const ticketStatus = ticket.status;
    //             let report;

    //             if (ticketStatus === 'opened' || ticketStatus === 'pending') {
    //                 // Generate report for open or pending tickets
    //                 report = {
    //                     ticketStatus,
    //                     ticketdate: ticket.date,
    //                 };
    //             } else {
    //                 // Generate report for resolved/closed tickets
    //                 const agent = await agentModel.findById(ticket.agentid);

    //                 if (!agent) {
    //                     return res.status(404).json({ error: 'Agent not found' });
    //                 }

    //                 const agentemail = agent.email;

    //                 // Check if both ticket.responsedate and ticket.date are valid dates
    //                 const isValidDate =
    //                     ticket.responsedate instanceof Date && ticket.date instanceof Date;

    //                 // Perform the calculation only if both dates are valid
    //                 const responsetime = isValidDate
    //                     ? ticket.responsedate - ticket.date
    //                     : null;

    //                 report = {
    //                     ticketStatus,
    //                     responsetime,
    //                     rating: ticket.responserating,
    //                     agentemail,
    //                 };
    //             }

    //             // Send the generated report as JSON response
    //             return res.status(200).json(report);
    //      } catch (error) {
    //          console.error('Error in generating report:', error);
    //          return res.status(500).json({ error: 'Internal server error' });
    //         }
    //     }
    // },


    generateReports: async (req, res) => {
        // let responsetime, rating, agentemail;

        try {
            const { id: ticketId } = req.params;
            console.log(ticketId);
            const ticket = await ticketModel.findOne({ _id: ticketId });
            const ticketStatus = ticket.status;
            const responsedate = ticket.responsedate ? new Date(ticket.responsedate) : null;
            // console.log('Responsedate:', ticket.responsedate);
            console.log('Raw Ticketdate:', ticket.date);
            const ticketdate = new Date(ticket.date);
            console.log('Parsed Ticketdate:', ticketdate);

            // const responsedate = new Date(ticket.responsedate);
            // const ticketdate = new Date(ticket.date);
            if (ticketStatus == "opened" || ticketStatus == "pending") {
                console.log("welnabyyyyyyyy");
                const ticketdate = ticket.date;
                return res.status(200).json({
                    ticketdate,
                    ticketStatus
                });
            } else {
                const agentid = ticket.agentid;
                const agent = await agentModel.find({ _id: agentid });
                const agentemail = agent.email;
                const responsetime = ticket.responsedate - ticket.date;
                const rating = ticket.responserating;
                return res.status(200).json({
                    ticketStatus,
                    responsetime,
                    rating,
                    agentemail,
                });
            }

        } catch (error) {
            console.error('Error in generating reports:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },


    getAllTickets: async (req, res) => {
        try {
            const allTickets = await ticketModel.find();
            res.status(200).json(allTickets);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getTicketById: async (req, res) => {
        const { ticketId } = req.params;
        try {
            const ticket = await ticketModel.findById(ticketId);
            if (!ticket) {
                return res.status(404).json({ error: 'Ticket not found' });
            }
            res.status(200).json(ticket);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};

module.exports = managerController;
