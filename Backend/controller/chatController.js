// controllers/chatController.js

const Chat = require('../Models/chatModel');

const chatController = {
    sendMessage : async (req, res) => {
        try {
            const { sender, receiver, message } = req.body;

            // Save message to MongoDB
            const newMessage = new Chat({ sender, receiver, message });
            await newMessage.save();

            // Emit the message to the receiver via WebSocket (to be implemented)

            res.status(200).send('Message sent successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    recieveMessage : async (req, res) =>{

    },
}

module.exports = {
  sendMessage,
};
