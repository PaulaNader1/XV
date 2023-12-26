const chatModel = require("../Models/chatModel");
const messageModel = require("../Models/messageModel");
const agentModel = require("../Models/agentModel");

const chatController = {
  determineAgent: async (req, res) => {
    try {
      const { primary_category} = req.body;
      const agent = await agentModel.findOne({ primary_category});

      if (!agent) {
        return res.status(404).json({ error: "No agent found for the specified category and sub-category" });
      }

      return agent;
    } catch (error) {
      res.status(500).json({ error: `Error determining agent: ${error.message}` });
      return null; // Or throw an error if you want to handle it differently
    }
  },

  createChat: async (req, res) => {
    try {
      const { category } = req.body;

      // Check if an available agent exists for the given category 
      const agent = await agentModel.findOne({
        primary_category,
        isAvailable: true,
      });

      if (!agent) {
        return res.status(404).json({
          error: "No available agent for the specified category",
        });
      }

      // Create a new chat
      const newChat = await chatModel.create({
        userid,
        category,
        agent: agent.id,
        messages: [],
      });

      // Notify the user and agent about the new chat through WebSocket
      io.emit('newChat', newChat);

      // Optionally, send the updated list of chats to all clients
      const updatedChats = await chatModel.find();

      return res.status(200).json({ newChat, updatedChats });
    } catch (error) {
      console.error(`Error creating chat: ${error.message}`);
      return res.status(500).json({ error: "Error creating chat" });
    }
  },

  sendMessage: async (req, res) => {
    try {
      const { chatid, sender, message } = req.body;

      // Add the message to the chat
      await chatModel.findByIdAndUpdate(chatid, {
        $push: { messages: { sender, message } },
      });

      // Notify the user and agent about the new message through WebSocket
      io.emit('newMessage', { chatid, sender, message });

      // Optionally, you can also send the updated chat to all clients
      const updatedChat = await chatModel.findById(chatid);

      return res.status(200).json({ message: "Message sent successfully", updatedChat });
    } catch (error) {
      console.error(`Error sending message: ${error.message}`);
      return res.status(500).json({ error: "Error sending message" });
    }
  },

  readMessage: async (req, res) => {
    try {
      const { chatid, messageid, sessionExpirationTimestamp } = req.body;

      // Check if the session is still valid
      const currentTimestamp = Date.now();
      if (currentTimestamp > sessionExpirationTimestamp) {
        throw new Error("Session expired. Please log in again.");
      }

      // Find and update the specific message in the chat
      const updatedChat = await chatModel.updateOne(
        { _id: chatid, 'messages._id': messageid },
        { $set: { 'messages.$.isRead': true } }
      );

      // Check if the message was found and updated
      if (updatedChat.nModified === 0) {
        throw new Error("Message not found");
      }

      // Notify clients about the read message through WebSocket
      io.emit('messageRead', { chatid, messageid, isRead: true });

      // Optionally, you can return the updated chat or just a success message
      return res.status(200).json({ messageRead: { _id: messageid, isRead: true }, updatedChat });
    } catch (error) {
      console.error(`Error reading message: ${error.message}`);
      return res.status(500).json({ error: "Error reading message" });
    }
  },
};

module.exports = chatController;
