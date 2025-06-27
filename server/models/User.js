const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: string,
  email: { type: string, required: true, unique: true },
  password: { type: string, required: true },
  role: { type: string, enum: ["customer", "restaurent"], required: true },
});

module.exports = mongoose.model("UserModel", userSchema);
