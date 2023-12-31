const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./Routes/users");
const authRouter = require("./Routes/auth");
const adminRouter = require("./Routes/adminRoutes");
const managerRouter = require("./Routes/managerRoutes");
const agentRouter = require("./Routes/agentRoutes");
require('dotenv').config();

// Remove the duplicate declaration of authenticationMiddleware
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

app.use("/api/v1", authRouter);
app.use(authenticationMiddleware);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admins",adminRouter);
app.use("/api/v1/manager",managerRouter);
app.use("/api/v1/agents", agentRouter);

const db_name = process.env.DB_NAME;
// * Cloud Connection
// const db_url = `mongodb+srv://TestUser:TestPassword@cluster0.lfqod.mongodb.net/${db_name}?retryWrites=true&w=majority`;
// * Local connection
const db_url = `${process.env.DB_URL}/${db_name}`; // if it gives error try to change the localhost to 127.0.0.1

// ! Mongoose Driver Connection

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  family: 4,
};

mongoose
  .connect(db_url, connectionOptions)
  .then(async () => {
    console.log("mongoDB connected");

  })
  .catch((e) => {
    console.log(e);
  });

app.use(function (req, res, next) {
  return res.status(404).send("404");
});

app.listen(process.env.PORT, () => console.log("server started"));
