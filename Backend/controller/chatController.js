const Chat = require('./Models/chatModel');

// Async function to handle sending a message
async function sendMessage(req, res) {
  try {
    // Extract sender, receiver, and message from the request body
    const { sender, receiver, message } = req.body;

    // Create a new message instance using the Chat model
    const newMessage = new Chat({
      sender,
      receiver,
      message,
    });

    // Save the new message to MongoDB
    await newMessage.save();

    // Emit the message to the receiver via WebSocket
    io.to(receiver).emit('newMessage', newMessage);

    // Send a success response to the client
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    // Handle errors and send an error response to the client
    console.error('Error saving message to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Export the sendMessage function for use in other files
module.exports = { sendMessage };







// const Chat = require('../Models/chatModel');
// const io = require('../app'); // Import the Socket.io instance

// const chatController = {
//     sendMessage: async (req, res) => {
//         try {
//             const { sender, receiver, message } = req.body;

//             // Save message to MongoDB
//             const newMessage = new Chat({ sender, receiver, message });
//             await newMessage.save(); // save to mongodb

//             // Emit the message to the receiver via WebSocket
//             io.to(receiver).emit('newMessage', newMessage);

//             res.status(200).send('Message sent successfully');
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Internal Server Error');
//         }
//     },

//     // create chat and add to chat (with id)
//     //send w recieve to update chat
//     // for each msg save in db

//     receiveMessage: async (req, res) => {
//         try {
//             const { chatid, userid, agentid, category, sub_category, date, sender, receiver, message } = req.body;

//             // Save the received message to MongoDB 
//             const receivedMessage = new Chat({
//                 chatid, userid, agentid, category, sub_category, date, sender, receiver, message
//             });
//             await receivedMessage.save();

//             // Respond with a success message 
//             res.status(200).send('Message received successfully');

//             // io.emit('newReceivedMessage', receivedMessage);
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Internal Server Error');
//         }
//     },
// };

// module.exports = chatController;
