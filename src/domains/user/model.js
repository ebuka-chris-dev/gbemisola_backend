const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: { type: String, required: false, unique: true },
  password: { type: String, required: true, select:false },
  emailVerification: { type: Boolean, default: true },
  email: { type: String, required: true, unique: true },
  userType: { type: String, default: "Admin" },
  dateCreated: { type: Date, default: Date.now() },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
