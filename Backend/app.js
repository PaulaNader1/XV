const express = require("express");
const cookieParser=require('cookie-parser')
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./Routes/products");
const userRouter = require("./Routes/users");
const authRouter = require("./Routes/auth");
require('dotenv').config();

const authenticationMiddleware = require("./Middleware/authenticationMiddleware");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser())

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS,HEAD");
//   res.setHeader(
//     "Access-Control-Expose-Headers",
//     "*"
//   );

//   next();
// });

app.use("/api/v1", authRouter);
app.use(authenticationMiddleware);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

const db_name = process.env.DB_NAME;
// * Cloud Connection
// const db_url = `mongodb+srv://TestUser:TestPassword@cluster0.lfqod.mongodb.net/${db_name}?retryWrites=true&w=majority`;
// * Local connection
const db_url = `${process.env.DB_URL}/${db_name}`; // if it gives error try to change the localhost to 127.0.0.1

// ! Mongoose Driver Connection

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(db_url, connectionOptions)
  .then(() => console.log("mongoDB connected"))
  .catch((e) => {
    console.log(e);
  });

app.use(function (req, res, next) {
  return res.status(404).send("404");
});
app.listen(process.env.PORT, () => console.log("server started"));



const socketIO = require('socket.io');  // Import the Socket.io library
const chatRoutes = require('./routes/chatRoutes');

const server = http.createServer(app);  // Create an HTTP server using the express app
const io = socketIO(server);  // Attach Socket.io to the server

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chatapp', { useNewUrlParser: true, useUnifiedTopology: true });

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('User connected');

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle custom events, e.g., receiving a message
  socket.on('sendMessage', async (data) => {
    console.log('Received message:', data);

    // Implement logic to save the message to MongoDB if needed
    try {
      // Save the message to MongoDB
      const newMessage = new chat({    /// kanet new CombinedChat
        chatid: data.chatid,
        userid: data.userid,
        agentid: data.agentid,
        category: data.category,
        sub_category: data.sub_category,
        date: data.date,
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
      });

      await newMessage.save();

      // Broadcast the message to the intended recipient
      io.to(data.receiver).emit('newMessage', data);
    } catch (error) {
      console.error('Error saving message to MongoDB:', error);
    }
  });
});


    // Broadcast the message to the intended recipient (to be implemented)
    io.to(data.receiver).emit('newMessage', data);
  


// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
