const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDb = require("./config/database");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRouter = require("./routes/authentication");

app.use("/", authRouter);

connectDb()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
