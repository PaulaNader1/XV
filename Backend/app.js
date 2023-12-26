
const express = require("express");
const cookieParser=require('cookie-parser')
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const mongoose = require("mongoose");
const userRouter = require("./Routes/users");
const authRouter = require("./Routes/auth");
const adminRouter = require("./Routes/adminRoutes");
const chatController = require("./controller/chatController");
const chatRouter=require('../Backend/Routes/chat')
const managerRoutes = require("./Routes/managerRoutes");

require('dotenv').config();

const authenticationMiddleware = require("./Middleware/authenticationMiddleware");
const cors = require("cors");


// const server = http.createServer(app);


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


app.use("/api/v1", authRouter);
app.use(authenticationMiddleware);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admins",adminRouter);
app.use('/api/v1/chat',chatRouter)
app.use("/api/v1/manager",managerRoutes)


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


//han call routes hena 

// gehad



// app.js

// const express = require('express');
// const http = require('http');
// const mongoose = require('mongoose');
// const userRouter = require('./Routes/users');
// const authRouter = require('./Routes/auth');
// const adminRouter = require('./Routes/adminRoutes');
// const chatRouter = require('./Routes/chat'); // Add this line
// const chatController = require('./controllers/chatController'); // Add this line
// require('dotenv').config();

// const authenticationMiddleware = require('./Middleware/authenticationMiddleware');
// const cors = require('cors');

// Initialize Socket.io
// const io = socketIO(server)
// chatController.initializeSocketIO(server); // Add this line

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  })
);

app.use('/api/v1', authRouter);
// app.use(authenticationMiddleware);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/chats', chatRouter); // Add this line

// mongoose
//   .connect(db_url, connectionOptions)
//   .then(() => console.log('mongoDB connected'))
//   .catch((e) => {
//     console.log(e);
//   });

app.use(function (req, res, next) {
  return res.status(404).send('404');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});




// const io = socketIO(server);

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // // Handle new chat creation
//   // socket.on("createChat", async ({ userid, agentid, category, sub_category }) => {
//   //   const { newChat, updatedChats } = await chatController.createChat({
//   //     userid,
//   //     agentid,
//   //     category,
//   //     sub_category,
//   //   });

//   //   io.emit("chatCreated", newChat);
//   //   io.emit("chatsUpdated", updatedChats);
//   // });

//   // Handle new messages
//   socket.on("sendMessage", async ({ chatid, sender, receiver, message }) => {
//     const { newMessage, updatedChats } = await chatController.sendMessage({
//       chatid,
//       sender,
//       receiver,
//       message,
//     });

//     io.emit("messageReceived", newMessage);
//     io.emit("chatsUpdated", updatedChats);
//   });

//   // Handle disconnect
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });





// const http = require("http");
// const {Server} = require("socket.io")

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET" , "POST"],
//   }
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("start_chat", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${socket.id} chatid: ${data}`);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });


