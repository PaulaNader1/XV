const userModel = require("../Models/userModel");
const TicketModel = require("../Models/ticketModel");
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
    text: 'An agent viewed your ticket and has responded.',
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
      const { ticketId } = req.params;
      const { agentResponse } = req.body;
      if (!ticketId) {
        return res.status(400).json({ error: 'ticketId is required' });
      };

      if (!agentResponse) {
        return res.status(400).json({ error: 'agentResponse is required' });
      };
      const ticketToBeClosed = await TicketModel.findOne({ _id: ticketId });
      if (!ticketToBeClosed) {
        return res.status(400).json({ error: 'Ticket is not found in our system or it has been already closed' });
      };
      const assignedAgentForTicket = await AgentModel.findById(ticketToBeClosed.agentId);
      if (!assignedAgentForTicket) {
        return res.status(400).json({ error: 'Agent is not found in our system' });
      };
      const ticketCreationDate = new Date(ticketToBeClosed.createdAt);
      const currentDate = new Date();
      const timeDifferenceMs = currentDate - ticketCreationDate;
      const resolutionTime = timeDifferenceMs / (1000 * 60);
      ticketToBeClosed.resolutionTime = resolutionTime;
      ticketToBeClosed.status = 'closed';
      ticketToBeClosed.agentResponse = agentResponse;
      await ticketToBeClosed.save();
      assignedAgentForTicket.assignedTickets = assignedAgentForTicket.assignedTickets.filter(t => t !== ticketId);
      await assignedAgentForTicket.save();
      let oldestStaleTicket = await findOldestHigherPriorityStaleTicket();
      if (oldestStaleTicket) {
        oldestStaleTicket = await TicketModel.findOne({ _id: oldestStaleTicket[0]._id });
        await agentController.assignTicket(oldestStaleTicket);
      };
      const user = await userModel.findById(ticketToBeClosed.userid);
      if (!user)
        throw new Error('User not found');
      await sendOTPEmail(user.email);
      res.status(200).json({ message: 'Ticket closed successfully', ticketToBeClosed });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  provideCwf: async (req, res) => {
    try {
      const { Category, subCategory } = req.body;

      const lowercaseSubCategory = subCategory?.trim().toLowerCase();

      const lowercaseCategory = Category?.trim().toLowerCase();

      // Use Mongoose to find documents based on the specified category
      const result = await knowledgeBaseModel.find({ category: lowercaseCategory, subCategory: lowercaseSubCategory });

      // Return the result
      return res.status(200).json({ data: result.answer });
    } catch (error) {
      // Handle other errors if necessary
      console.error('Error in provideCwf:', error.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getAllOpenedTickets: async (_, res) => {
    try {
      const allOpenedTickets = await TicketModel.find({ status: { $in: ['opened', 'pending'] } });
      res.status(200).json(allOpenedTickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  changeTicketPriority: async (req, res) => {
    try {
      const ticketId = req.params.id;
      const priority = req.params.priority;
      if (!ticketId || !priority) {
        throw new Error('Please provide the ticket that you want to update and the priority option');
      };

      const ticket = await TicketModel.findOne({ _id: ticketId });
      if (!ticket) {
        throw new Error('Ticket not found in our system');
      };

      ticket.priority = priority;
      await ticket.save();

      res.status(201).json(ticket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  assignTicket: async (ticketToBeAssigned) => {
    const agentOne = await AgentModel.findOne({ primaryCategory: "software" });
    const agentTwo = await AgentModel.findOne({ primaryCategory: "hardware" });
    const agentThree = await AgentModel.findOne({ primaryCategory: "network" });

    if (!agentOne || !agentTwo || !agentThree) {
      throw new Error('some or all agents are missing from our system');
    };

    if (ticketToBeAssigned.status !== 'opened') {
      throw new Error('ticket is not opened');
    };

    let ticketsCategoryWithItsResponsibleAgents = [
      { name: 'software', assignedAgents: [agentOne, agentTwo, agentThree] },

      { name: 'hardware', assignedAgents: [agentTwo, agentThree, agentOne] },

      { name: 'network', assignedAgents: [agentThree, agentOne, agentTwo] }

    ];
    let ticketCategoryWithItsResponsibleAgents = ticketsCategoryWithItsResponsibleAgents.find(t => t.name === ticketToBeAssigned.category);
    if (ticketCategoryWithItsResponsibleAgents) {
      for (let i = 0; i < ticketCategoryWithItsResponsibleAgents.assignedAgents.length; i++) {
        let agent = ticketCategoryWithItsResponsibleAgents.assignedAgents[i];
        if (agent.assignedTickets.length < 5) {
          agent.assignedTickets.push(ticketToBeAssigned._id.toString());
          await agent.save();
          ticketToBeAssigned.status = 'pending';
          ticketToBeAssigned.agentId = agent._id;
          await ticketToBeAssigned.save();
          break;
        }
      }
    }
  }
};

module.exports = agentController;


const findOldestHigherPriorityStaleTicket = async () => {
  return await TicketModel.aggregate([
    {
      $match: {
        status: 'opened'
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
}









