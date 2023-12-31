const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // userid: { type: int, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    mfaSecret: { type: String }, // Secret key used for TOTP-based MFA
    storedOTP: { type: String }, // Store the OTP temporarily for verification
    mfaEnable: {type: Boolean},
  },

  {
    strict: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
module.exports.Schema = userSchema;
