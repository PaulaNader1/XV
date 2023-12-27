const mongoose = require('mongoose');

const agentModel = new mongoose.Schema(
  {
    // agentId: {
    //   type: Number,
    // },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      minLength: 5,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    primaryCategory: {
      type: String, required: true
    },
    assignedTickets: {
      type: Array
    },
  },
  {
    strict: true,
    timestamps: true,
  }
);

 module.exports = mongoose.model('Agent', agentModel);
 module.exports.Schema = agentModel;   
