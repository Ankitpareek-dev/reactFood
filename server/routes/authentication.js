const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

//this function will help create jwt token based on the role of the login user
const createToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

authRouter.post("signup/customer", async (req, res) => {
  const { name, emailId, password } = req.body;
  const user = new UserModel({
    name,
    emailId,
    password,
    role: "customer",
  });
  try {
    await user.save();
  } catch (err) {
    console.error(err);
  }
});

authRouter.post("signup/restaurent", async (req, res) => {
  const { name, emailId, password, cuisine } = req.body;
  const user = new UserModel({
    name,
    emailId,
    password,
    role: "restaurent",
  });
  try {
    await user.save();
  } catch (err) {
    console.error(err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await UserModel.findOne({ emailId });
    if (!user) {
      return res.status(401).send("invalid email or password");
    }
    const token = createToken(user._id, user.role);
    // const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "none", // or "strict" for local testing
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
  } catch (err) {
    console.error(err.message);
  }
});
