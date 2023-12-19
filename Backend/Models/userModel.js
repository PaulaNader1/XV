const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // userid: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
