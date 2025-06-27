const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: string,
  email: { type: string, required: true, unique: true },
  password: { type: string, required: true },
});

module.exports = mongoose.model("CustomerModel", customerSchema);
