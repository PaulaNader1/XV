// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userid: { type: Number, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
  },

  {
    strict: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
module.exports.Schema = userModel;
