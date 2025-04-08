const mongoose = require("mongoose")
const emailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },

  createdAt: { type: Date, default: Date.now },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
