const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // optional: allows cookies/headers
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/authentication");
const feedRouter = require("./routes/feed");
const orderRouter = require("./routes/order");

app.use("/", authRouter);
app.use("/", feedRouter);
app.use("/", orderRouter);

connectDb()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
