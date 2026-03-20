const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  competition: { type: String, required: true },
  zone: { type: String, required: true },
  schoolType: { type: String, required: true },
  educationLevel: { type: String, required: true },
  slotsUsed: { type: Number, default: 0 }
});

module.exports = mongoose.model("Slot", SlotSchema);