const mongoose = require("mongoose");

const restaurentSchema = mongoose.createSchema({
  name: string,
  email: { type: string, required: true, unique: true },
  password: { type: string, required: true },
  cuisine: string,
});

module.exports = mongoose.model("RestaurentModel", restaurentSchema);
