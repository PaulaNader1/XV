const mongoose = require('mongoose');

const agentModel = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            minLength: 5,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        primary_category: {
            type: String,
            required: true,
        },
      //   sub_category: {
      //     type: String,
      //     required: true,
      // },
        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    {
        strict: true,
        timestamps: true,
    }
);

module.exports = mongoose.model('Agent', agentModel);
module.exports.Schema = agentModel;
