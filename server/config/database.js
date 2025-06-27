const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected successfully");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDb;
