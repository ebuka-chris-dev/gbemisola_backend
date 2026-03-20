const mongoose = require("mongoose");

const SokotoRegistrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  schoolName: { type: String, required: true },
  classGrade: { type: String, required: true },
  guardianName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  competition: { type: String, required: true },
  zone: { type: String, required: true },
  schoolType: { type: String, required: true },
  educationLevel: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SokotoRegistration", SokotoRegistrationSchema);