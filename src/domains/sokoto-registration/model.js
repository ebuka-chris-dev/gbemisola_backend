const mongoose = require("mongoose");

const SokotoRegistrationSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  schoolName: { type: String, required: true },
  classGrade: { type: String, required: true },
  lga: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  schoolEmail: { type: String, required: true },
  competition: { type: String, required: true },
  zone: { type: String, required: true },
  schoolType: { type: String, required: true },
  educationLevel: { type: String, required: true },
  teacherName: { type: String, required: true },
  teacherPhone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SokotoRegistration", SokotoRegistrationSchema);