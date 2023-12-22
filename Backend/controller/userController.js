const userModel = require("../Models/userModel");
const ticketModel = require("../Models/ticketModel");
const knowledgeBaseModel = require("../Models/knowledgeBaseModel");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = async (email, otp) => {

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
    subject: 'Your One-Time Password (OTP)',
    text: `Your OTP for login is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};
const userController = {
  register: async (req, res) => {
    try {
      const { email, password, username, role } = req.body;

      // Check if the user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new userModel({
        email,
        password: hashedPassword,
        username,
        role
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(405).json({ message: "Incorrect password" });
      }


      const currentDateTime = new Date();
      const expiresAt = new Date(+currentDateTime + 1800000); // expire in 3 minutes
      // Generate a JWT token
      const token = jwt.sign(
        { user: { userid: user._id, role: user.role } },
        secretKey,
        {
          expiresIn: 3 * 60 * 60,
        }
      );

      return res
        .cookie("token", token, {
          expires: expiresAt,
          withCredentials: true,
          httpOnly: false,
          SameSite: 'none'
        })
        .status(200)
        .json({ message: "login successfully", user });

    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Server error" });
    }
  },


  // getAllUsers: async (req, res) => {
  //   try {
  //     const users = await userModel.find();
  //     return res.status(200).json(users);
  //   } catch (e) {
  //     return res.status(500).json({ message: e.message });
  //   }
  // },
  // getUser: async (req, res) => {
  //   try {
  //     const user = await userModel.findById(req.params.id);
  //     return res.status(200).json(user);
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // },
  updateUserName: async (req, res) => {
    try {
      const user = await userModel.findByIdAndUpdate(
        req.params.id,
        { username: req.body.username },
        {
          new: true,
        }
      );
      return res.status(200).json({ user, msg: "Username updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updatePassword: async (req, res) => {
    try {

      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.findByIdAndUpdate(
        req.params.id,
        { password: hashedPassword },
        {
          new: true,
        }
      );
      return res.status(200).json({ user, msg: "Password updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createTicket: async (req, res) => {
    try {
      const {
        issueinfo,
        category,
        subCategory,
        priority,
      } = req.body;

      const userid = req.params.id;

      // Create a new ticket
      const newTicket = new ticketModel({
        userid,
        issueinfo,
        category,
        subCategory,
        priority,
        date: new Date(),
        // responserating: null,
        status: "false", // Assuming a new ticket is initially not resolved
      });

      // Save the ticket to the database
      await newTicket.save();

      res.status(201).json({ message: "Ticket created successfully" });
    } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  getAllKnowledgeBase: async (req, res) => {
    try {
      const knowledgeBaseEntries = await knowledgeBaseModel.find();

      res.status(200).json({ knowledgeBaseEntries });
    } catch (error) {
      console.error("Error getting Knowledge Base entries:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getKnowledgeBaseByCategory: async (req, res) => {
    try {
      const { category } = req.body;
      const knowledgeBaseEntries = await knowledgeBaseModel.find({ category });

      res.status(200).json({ knowledgeBaseEntries });
    } catch (error) {
      console.error("Error getting Knowledge Base entries by category:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getKnowledgeBaseBySubCategory: async (req, res) => {
    try {
      const { subcategory } = req.body;
      const knowledgeBaseEntries = await knowledgeBaseModel.find({ subCategory: subcategory });

      res.status(200).json({ knowledgeBaseEntries });
    } catch (error) {
      console.error("Error getting Knowledge Base entries by subcategory:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getKnowledgeBaseBytitle: async (req, res) => {
    try {
      const { title } = req.body;
      const knowledgeBaseEntries = await knowledgeBaseModel.find({ title: title });

      res.status(200).json({ knowledgeBaseEntries });
    } catch (error) {
      console.error("Error getting Knowledge Base entries by subcategory:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  rateTicket: async (req, res) => {

    try {
      const { ticketId } = req.params;
      const { responserating } = req.body;

      // Validate the rating (assuming a rating between 1 and 5)
      if (responserating < 1 || responserating > 5) {
        return res.status(400).json({ message: "Invalid rating. Please provide a rating between 0 and 5" });
      }

      const ticket = await ticketModel.findById(ticketId);

      // Check if the ticket exists
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      // Check if the ticket has already been rated
      if (ticket.responserating !== 0) {
        return res.status(400).json({ message: "Ticket has already been rated" });
      }
      ticket.responserating = responserating;
      await ticket.save();

      // Update the ticket with the rating using findByIdAndUpdate
      /*const updatedTicket = await ticketModel.findByIdAndUpdate(
        ticketId,
        { responserating: { responserating } },
        { new: true } // Returns the updated document
      );*/

      res.status(200).json({ message: "Ticket rated successfully", ticket });
    } catch (error) {
      console.error("Error rating ticket:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};
module.exports = userController;
