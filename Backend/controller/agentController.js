const userModel = require("../Models/userModel");
const ticketModel = require("../Models/ticketModel");
const AgentModel = require("../Models/agentModel")
const knowledgeBaseModel = require("../Models/knowledgeBaseModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");


const sendOTPEmail = async (email) => {

  // Create a transporter using Outlook's SMTP server
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Your Outlook password or an App Password if two-factor authentication is enabled
    },
  });


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your ticket Response',
    text:'An agent viewed your ticket and has responded.',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('ticket response mail sent successfully');
  } catch (error) {
    console.error('Error sending ticket response email:', error);
  }
};

const agentController = {

  closeTicket: async (req, res) => {
    try {
      const { ticketId } = req.params.id;

      const response = req.body;

      if (!ticketId) {
        return res.status(400).json({ error: 'Ticket ID is required' });
      }

      const ticket = await ticketModel.findOne({ _id: ticketId });
      const agentId = ticket.agentid;
      const agent = await AgentModel.findOne({ agentId });

      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found' });
      } else if (!(ticket.status) == "pending") {
        return res.status(404).json({ error: "Cannot close open or closed ticket" });
      } else {
        ticket.status = "closed";
        ticket.agentResponse = response;
        ticket.responsedate = new Date();
        await ticket.save();
      }

      const TicketAssignedToAgent = agent.assignedTickets.find(t => t._id === ticketId);

      if (TicketAssignedToAgent) {
        agent.assignedTickets = agent.assignedTickets.filter(t => t._id !== ticketId);
        await agent.save();
      }

      /*const oldestStaleTicket = TicketModel.aggregate([
        {
          $match: {
            status: 'open'
          }
        },
        {
          $addFields: {
            priorityOrderIndex: {
              $indexOfArray: [['high', 'medium', 'low'], '$priority']
            }
          }
        },
        {
          $sort: {
            priorityOrderIndex: 1,
            createdAt: 1
          }
        },
        {
          $limit: 1
        },
      ]);

      let tickets = [
        { name: 'software', assignedAgents: [agentOne, agentTwo, agentThree] },

        { name: 'hardware', assignedAgents: [agentTwo, agentThree, agentOne] },

        { name: 'network', assignedAgents: [agentThree, agentOne, agentTwo] }

      ];
      if (oldestStaleTicket) {
        assignTicket(oldestStaleTicket, tickets)
      }*/

      await sendOTPEmail(email);

      res.status(200).json({ message: "ticket response email sent successfull" });

      const ticketCreationDate = new Date(ticketId.date);
      const currentDate = new Date(); // Get the current date

      // Calculate the time difference in milliseconds
      const timeDifferenceMs = currentDate - ticketCreationDate;

      // Convert the time difference to days (you can use hours, minutes, etc., as needed)
      const agentResponse = timeDifferenceMs / (1000 * 60 * 60 * 24);

      res.status(200).json({ message: 'Ticket closed successfully', ticket });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  provideCwf: async (req, res) => {
    try {
      const { Category, subCategory } = req.body;


      // Use Mongoose to find documents based on the specified category
      const result = await knowledgeBaseModel.find({ category: Category, subCategory: subCategory });

      // Return the result
      return res.status(200).json({ data: result.answer });
    } catch (error) {
      // Handle other errors if necessary
      console.error('Error in provideCwf:', error.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = agentController;